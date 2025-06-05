
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export const Signup = ({ onSwitchToLogin }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'host' | 'attendee'>('attendee');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name, role);
    
    if (error) {
      toast.error(error.message || 'Failed to create account');
    } else {
      toast.success('Account created successfully! Please check your email to verify your account.');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast.error(error.message || 'Failed to sign up with Google');
    }
    setGoogleLoading(false);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-xl w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl">Create account</CardTitle>
        <CardDescription>Join EventPulse to start managing events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Button 
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? 'Signing up...' : 'Continue with Google'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-10"
                required
                disabled={loading || googleLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-10"
                required
                disabled={loading || googleLoading}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-10"
                required
                disabled={loading || googleLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-10"
                required
                disabled={loading || googleLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role" className="text-sm">I want to</Label>
              <Select value={role} onValueChange={(value: 'host' | 'attendee') => setRole(value)} disabled={loading || googleLoading}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendee">Attend Events</SelectItem>
                  <SelectItem value="host">Host Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 h-10"
              disabled={loading || googleLoading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              disabled={loading || googleLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
