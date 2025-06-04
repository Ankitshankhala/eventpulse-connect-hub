
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Settings, X } from 'lucide-react';

interface LiveEventHeaderProps {
  event: any;
  onClose: () => void;
}

export const LiveEventHeader = ({ event, onClose }: LiveEventHeaderProps) => {
  return (
    <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <DialogTitle className="text-2xl flex items-center text-gray-900">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            {event.title}
            <Badge className="ml-3 bg-green-100 text-green-800 border-green-200">
              LIVE CONTROL
            </Badge>
          </DialogTitle>
          <p className="text-gray-600 mt-2">Real-time event monitoring and management dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DialogHeader>
  );
};
