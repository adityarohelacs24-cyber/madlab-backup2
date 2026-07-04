import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ReactionContent, ReactionStep, ConfirmatoryTest } from '../app/types/chemistry';

export interface ReactionData {
  id: string;
  title: string;
  description: string | null;
  group_number: number | null;
  category: string;
  reactants: string | null;
  // products column stores the ReactionContent object (or legacy JSON array) as JSONB
  products: ReactionContent | ConfirmatoryTest[] | null;
  // observations column stores the ReactionStep array as JSONB
  observations: ReactionStep[] | null;
  equations: string | null;
  precautions: string | null;
  created_at: string;
}

export function useReactions() {
  const [reactions, setReactions] = useState<ReactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('reactions')
          .select('*')
          .order('created_at', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setReactions(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching reactions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReactions();
  }, []);

  // Get reactions by category
  const getByCategory = (category: string) => {
    return reactions.filter((r) => r.category === category);
  };

  // Get reactions by group number
  const getByGroup = (group: number) => {
    return reactions.filter((r) => r.group_number === group);
  };

  // Get reactions by category and group
  const getByCategoryAndGroup = (category: string, group: number) => {
    return reactions.filter((r) => r.category === category && r.group_number === group);
  };

  // Get single reaction by ID
  const getById = (id: string) => {
    return reactions.find((r) => r.id === id);
  };

  // Search reactions
  const search = (query: string) => {
    const q = query.toLowerCase();
    return reactions.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.reactants?.toLowerCase().includes(q)
    );
  };

  return {
    reactions,
    loading,
    error,
    getByCategory,
    getByGroup,
    getByCategoryAndGroup,
    getById,
    search,
  };
}
