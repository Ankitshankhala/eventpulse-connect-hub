
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Megaphone, CheckCircle } from 'lucide-react';

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Walk-ins
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <Megaphone className="w-4 h-4 mr-2" />
          Send Announcement
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <CheckCircle className="w-4 h-4 mr-2" />
          End Event
        </Button>
      </CardContent>
    </Card>
  );
};
