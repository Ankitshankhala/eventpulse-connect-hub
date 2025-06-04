
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Users, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface WalkInManagerProps {
  eventId: string;
  onWalkInAdded: () => void;
}

export const WalkInManager = ({ eventId, onWalkInAdded }: WalkInManagerProps) => {
  const { user } = useAuth();
  const [walkInEmail, setWalkInEmail] = useState('');
  const [walkInName, setWalkInName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddWalkIn = async () => {
    if (!walkInEmail || !walkInName) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and email for the walk-in attendee",
        variant: "destructive"
      });
      return;
    }

    setIsAdding(true);
    try {
      // First check if user exists
      let userId: string;
      
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', walkInEmail)
        .single();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create a user record for walk-ins using upsert to handle conflicts
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .upsert({
            id: crypto.randomUUID(), // Generate a UUID for the user
            email: walkInEmail,
            name: walkInName,
            role: 'attendee'
          })
          .select('id')
          .single();

        if (userError) throw userError;
        userId = newUser.id;
      }

      // Create RSVP with walk-in status
      const { error: rsvpError } = await supabase
        .from('rsvps')
        .insert({
          event_id: eventId,
          user_id: userId,
          status: 'confirmed',
          checkin_time: new Date().toISOString(),
          rsvp_time: new Date().toISOString()
        });

      if (rsvpError) throw rsvpError;

      toast({
        title: "Walk-in Added",
        description: `${walkInName} has been checked in as a walk-in attendee`,
      });

      setWalkInEmail('');
      setWalkInName('');
      onWalkInAdded();
    } catch (error) {
      console.error('Error adding walk-in:', error);
      toast({
        title: "Error",
        description: "Failed to add walk-in attendee",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Walk-in Attendee
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="walkInName">Name</Label>
            <Input
              id="walkInName"
              placeholder="Attendee name"
              value={walkInName}
              onChange={(e) => setWalkInName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="walkInEmail">Email</Label>
            <Input
              id="walkInEmail"
              type="email"
              placeholder="attendee@example.com"
              value={walkInEmail}
              onChange={(e) => setWalkInEmail(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleAddWalkIn}
          disabled={isAdding || !walkInEmail || !walkInName}
          className="w-full"
        >
          <Users className="w-4 h-4 mr-2" />
          {isAdding ? 'Adding...' : 'Check In Walk-in'}
        </Button>
        
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Mail className="w-3 h-3" />
          Walk-in attendees will be automatically marked as checked in
        </div>
      </CardContent>
    </Card>
  );
};
