
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Get pending emails that are ready to be sent
    const { data: pendingEmails, error: fetchError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(10); // Process 10 emails at a time

    if (fetchError) {
      throw new Error(`Failed to fetch emails: ${fetchError.message}`);
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(JSON.stringify({ message: 'No emails to process' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const results = [];

    for (const email of pendingEmails) {
      try {
        // Mark as processing
        await supabase
          .from('email_queue')
          .update({ status: 'processing' })
          .eq('id', email.id);

        // Send the email
        const emailResult = await resend.emails.send({
          from: "Events Platform <notifications@yourdomain.com>",
          to: [email.recipient_email],
          subject: email.subject,
          html: email.html_content,
        });

        if (emailResult.error) {
          throw new Error(emailResult.error.message);
        }

        // Mark as sent
        await supabase
          .from('email_queue')
          .update({ 
            status: 'sent',
            sent_at: new Date().toISOString()
          })
          .eq('id', email.id);

        results.push({ id: email.id, status: 'sent' });
        
      } catch (emailError) {
        console.error(`Failed to send email ${email.id}:`, emailError);
        
        // Update attempts and error message
        const newAttempts = email.attempts + 1;
        const maxAttempts = 3;
        
        await supabase
          .from('email_queue')
          .update({ 
            status: newAttempts >= maxAttempts ? 'failed' : 'pending',
            attempts: newAttempts,
            error_message: emailError.message,
            scheduled_for: newAttempts < maxAttempts 
              ? new Date(Date.now() + Math.pow(2, newAttempts) * 60000).toISOString() // Exponential backoff
              : null
          })
          .eq('id', email.id);

        results.push({ 
          id: email.id, 
          status: newAttempts >= maxAttempts ? 'failed' : 'retrying',
          attempts: newAttempts 
        });
      }
    }

    return new Response(JSON.stringify({ 
      processed: results.length,
      results 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error processing email queue:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
