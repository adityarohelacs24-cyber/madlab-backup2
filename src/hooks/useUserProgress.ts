import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProgress {
  id: string;
  user_id: string;
  reaction_id: string;
  completed: boolean;
  bookmarked: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useUserProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Map<string, UserProgress>>(new Map());
  const [loading, setLoading] = useState(false);

  // Fetch all user progress
  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        const progressMap = new Map(
          data?.map((item) => [item.reaction_id, item]) || []
        );
        setProgress(progressMap);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const updateProgress = async (reactionId: string, updates: Partial<UserProgress>) => {
    if (!user) return;

    try {
      const existing = progress.get(reactionId);

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('user_progress')
          .update(updates)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase.from('user_progress').insert({
          user_id: user.id,
          reaction_id: reactionId,
          ...updates,
        });

        if (error) throw error;
      }

      // Update local state
      const updated = existing
        ? { ...existing, ...updates }
        : {
            id: Math.random().toString(),
            user_id: user.id,
            reaction_id: reactionId,
            completed: false,
            bookmarked: false,
            notes: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...updates,
          };

      const newProgress = new Map(progress);
      newProgress.set(reactionId, updated);
      setProgress(newProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const toggleBookmark = (reactionId: string) => {
    const current = progress.get(reactionId);
    const bookmarked = !current?.bookmarked;
    updateProgress(reactionId, { bookmarked });
  };

  const markAsCompleted = (reactionId: string) => {
    const current = progress.get(reactionId);
    const completed = !current?.completed;
    updateProgress(reactionId, { completed });
  };

  const isBookmarked = (reactionId: string) => {
    return progress.get(reactionId)?.bookmarked || false;
  };

  const isCompleted = (reactionId: string) => {
    return progress.get(reactionId)?.completed || false;
  };

  return {
    progress,
    loading,
    updateProgress,
    toggleBookmark,
    markAsCompleted,
    isBookmarked,
    isCompleted,
  };
}
