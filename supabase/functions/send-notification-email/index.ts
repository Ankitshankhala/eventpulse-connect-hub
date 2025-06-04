
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface NotificationEmailRequest {
  userId: string;
  type: string;
  title: string;
  message: string;
  eventId?: string;
  metadata?: any;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { userId, type, title, message, eventId, metadata }: NotificationEmailRequest = await req.json();

    // Get user email
    const { data: user, error: userError } = await supabase.auth.admin.getUserById(userId);
    if (userError || !user.user?.email) {
      throw new Error("User not found or email not available");
    }

    // Create notification in database
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        event_id: eventId,
        metadata: { ...metadata, email_sent: true }
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    // Send email notification
    const emailTemplate = getEmailTemplate(type, title, message, metadata);
    
    await resend.emails.send({
      from: "Events Platform <notifications@yourdomain.com>",
      to: [user.user.email],
      subject: title,
      html: emailTemplate,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error sending notification email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function getEmailTemplate(type: string, title: string, message: string, metadata: any): string {
  const baseTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">${title}</h2>
      <p style="color: #666; line-height: 1.6;">${message}</p>
      ${getTypeSpecificContent(type, metadata)}
    </div>
  `;
  
  return baseTemplate;
}

function getTypeSpecificContent(type: string, metadata: any): string {
  switch (type) {
    case 'payment_confirmation':
      return `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #28a745;">Payment Confirmed</h3>
          <p>Amount: $${(metadata?.amount / 100).toFixed(2)}</p>
          <p>Transaction ID: ${metadata?.transaction_id}</p>
        </div>
      `;
    case 'event_reminder':
      return `
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #856404;">Event Reminder</h3>
          <p>Don't forget about your upcoming event!</p>
          ${metadata?.event_date ? `<p>Date: ${new Date(metadata.event_date).toLocaleDateString()}</p>` : ''}
        </div>
      `;
    case 'rsvp_confirmation':
      return `
        <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #155724;">RSVP Confirmed</h3>
          <p>Your attendance has been confirmed.</p>
        </div>
      `;
    default:
      return '';
  }
}
