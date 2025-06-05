
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const HostDashboardHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    </div>
  );
};
