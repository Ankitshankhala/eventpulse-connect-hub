
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useUserConnections = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get users the current user is following
  const { data: following = [], isLoading: followingLoading } = useQuery({
    queryKey: ['user-following', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_connections')
        .select(`
          following_id,
          users!user_connections_following_id_fkey(id, name, email)
        `)
        .eq('follower_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Get users following the current user
  const { data: followers = [], isLoading: followersLoading } = useQuery({
    queryKey: ['user-followers', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_connections')
        .select(`
          follower_id,
          users!user_connections_follower_id_fkey(id, name, email)
        `)
        .eq('following_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const followUserMutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_connections')
        .insert({
          follower_id: user.id,
          following_id: targetUserId
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "User followed",
        description: "You are now following this user"
      });
      queryClient.invalidateQueries({ queryKey: ['user-following'] });
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        toast({
          title: "Already following",
          description: "You are already following this user",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Follow failed",
          description: "There was an error following this user",
          variant: "destructive"
        });
      }
    }
  });

  const unfollowUserMutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_connections')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "User unfollowed",
        description: "You are no longer following this user"
      });
      queryClient.invalidateQueries({ queryKey: ['user-following'] });
    },
    onError: () => {
      toast({
        title: "Unfollow failed",
        description: "There was an error unfollowing this user",
        variant: "destructive"
      });
    }
  });

  const isFollowing = (targetUserId: string) => {
    return following.some(f => f.following_id === targetUserId);
  };

  return {
    following,
    followers,
    followingLoading,
    followersLoading,
    followUser: followUserMutation.mutate,
    unfollowUser: unfollowUserMutation.mutate,
    isFollowing,
    isFollowLoading: followUserMutation.isPending,
    isUnfollowLoading: unfollowUserMutation.isPending
  };
};
