import { supabase } from '../lib/supabase';
import { cationTests, anionTests } from '../app/data/saltAnalysisData';
import { organicReactions } from '../app/data/organicReactions';

/**
 * This script seeds the Supabase reactions table with all reactions from the frontend data.
 * Run this after authentication to populate the database.
 * 
 * Column mapping:
 *   products    -> ReactionContent object (JSONB) — the rich educational module
 *   observations -> ReactionStep[]  (JSONB)       — animation steps
 *   equations   -> legacy equation string
 *   description -> theory text
 *   precautions -> flame test / category info
 */

export async function seedReactions() {
  try {
    console.log('🌱 Starting to seed reactions...');

    const reactionsToInsert: any[] = [];
    let id = 1;

    // ========== CATION TESTS ==========
    const cationGroups = [
      { key: 'group1', num: 1 },
      { key: 'group2', num: 2 },
      { key: 'group3', num: 3 },
      { key: 'group4', num: 4 },
      { key: 'group5', num: 5 },
      { key: 'group6', num: 6 },
    ];

    for (const grp of cationGroups) {
      id = 1;
      const reactions = (cationTests as any)[grp.key] as any[];
      reactions.forEach((reaction: any) => {
        reactionsToInsert.push({
          id: `cation_group${grp.num}_${id++}`,
          title: reaction.title,
          description: reaction.theory,
          group_number: grp.num,
          category: 'cation',
          reactants: reaction.cation,
          // Store the full rich content as JSONB (explicitly pass object, Supabase will serialize)
          products: reaction.content ? JSON.parse(JSON.stringify(reaction.content)) : null,
          // Store animation steps as JSONB (ensure proper serialization)
          observations: reaction.steps ? JSON.parse(JSON.stringify(reaction.steps)) : [],
          equations: reaction.equation,
          precautions: `Flame test: ${reaction.flameTest ?? 'N/A'}`,
        });
      });
    }

    // ========== ANION TESTS ==========
    id = 1;
    anionTests.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `anion_${id++}`,
        title: reaction.title || reaction.anion,
        description: reaction.theory || 'Anion identification test',
        group_number: null,
        category: 'anion',
        reactants: reaction.anion,
        // Store the full rich content as JSONB (explicitly serialize)
        products: reaction.content ? JSON.parse(JSON.stringify(reaction.content)) : null,
        // Store animation steps as JSONB (ensure proper serialization)
        observations: reaction.steps ? JSON.parse(JSON.stringify(reaction.steps)) : [],
        equations: reaction.equation || '',
        precautions: reaction.precautions || '',
      });
    });

    // ========== ORGANIC REACTIONS ==========
    id = 1;
    organicReactions.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `organic_${reaction.category.replace(/\s+/g, '_').toLowerCase()}_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: null,
        category: 'organic',
        reactants: reaction.category,
        // Store the full rich content as JSONB (explicitly serialize)
        products: reaction.content ? JSON.parse(JSON.stringify(reaction.content)) : null,
        // Store animation steps as JSONB (ensure proper serialization)
        observations: reaction.steps ? JSON.parse(JSON.stringify(reaction.steps)) : [],
        equations: reaction.equation,
        precautions: reaction.theory,
      });
    });

    console.log(`📝 Prepared ${reactionsToInsert.length} reactions to insert...`);

    // Insert in batches of 100 to avoid payload size limits
    const batchSize = 100;
    for (let i = 0; i < reactionsToInsert.length; i += batchSize) {
      const batch = reactionsToInsert.slice(i, i + batchSize);
      const { error } = await supabase
        .from('reactions')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(reactionsToInsert.length / batchSize)}`);
      }
    }

    console.log('✨ Seeding complete!');
    return { success: true, count: reactionsToInsert.length };
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    return { success: false, error };
  }
}

// Export for use in components
export const seedReactionsScript = seedReactions;
