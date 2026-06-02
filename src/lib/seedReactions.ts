import { supabase } from '../lib/supabase';
import { cationTests, anionTests } from '../app/data/saltAnalysisData';
import { organicReactions } from '../app/data/organicReactions';

/**
 * This script seeds the Supabase reactions table with all reactions from the frontend data.
 * Run this after authentication to populate the database.
 */

export async function seedReactions() {
  try {
    console.log('🌱 Starting to seed reactions...');

    const reactionsToInsert: any[] = [];
    let id = 1;

    // ========== CATION TESTS ==========
    // Group 1
    cationTests.group1.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `cation_group1_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: 1,
        category: 'cation',
        reactants: reaction.cation,
        products: JSON.stringify(reaction.confirmatoryTests),
        observations: JSON.stringify(reaction.steps),
        equations: reaction.equation,
        precautions: `Flame test: ${reaction.flameTest}`,
      });
    });

    // Group 2
    id = 1;
    cationTests.group2.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `cation_group2_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: 2,
        category: 'cation',
        reactants: reaction.cation,
        products: JSON.stringify(reaction.confirmatoryTests),
        observations: JSON.stringify(reaction.steps),
        equations: reaction.equation,
        precautions: `Flame test: ${reaction.flameTest}`,
      });
    });

    // Group 3
    id = 1;
    cationTests.group3.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `cation_group3_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: 3,
        category: 'cation',
        reactants: reaction.cation,
        products: JSON.stringify(reaction.confirmatoryTests),
        observations: JSON.stringify(reaction.steps),
        equations: reaction.equation,
        precautions: `Flame test: ${reaction.flameTest}`,
      });
    });

    // Group 4
    id = 1;
    cationTests.group4.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `cation_group4_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: 4,
        category: 'cation',
        reactants: reaction.cation,
        products: JSON.stringify(reaction.confirmatoryTests),
        observations: JSON.stringify(reaction.steps),
        equations: reaction.equation,
        precautions: `Flame test: ${reaction.flameTest}`,
      });
    });

    // Group 5
    id = 1;
    cationTests.group5.forEach((reaction: any) => {
      reactionsToInsert.push({
        id: `cation_group5_${id++}`,
        title: reaction.title,
        description: reaction.theory,
        group_number: 5,
        category: 'cation',
        reactants: reaction.cation,
        products: JSON.stringify(reaction.confirmatoryTests),
        observations: JSON.stringify(reaction.steps),
        equations: reaction.equation,
        precautions: `Flame test: ${reaction.flameTest}`,
      });
    });

    // Group 6
    if (cationTests.group6) {
      id = 1;
      cationTests.group6.forEach((reaction: any) => {
        reactionsToInsert.push({
          id: `cation_group6_${id++}`,
          title: reaction.title,
          description: reaction.theory,
          group_number: 6,
          category: 'cation',
          reactants: reaction.cation,
          products: JSON.stringify(reaction.confirmatoryTests),
          observations: JSON.stringify(reaction.steps),
          equations: reaction.equation,
          precautions: `Flame test: ${reaction.flameTest}`,
        });
      });
    }

    // ========== ANION TESTS ==========
    if (anionTests) {
      id = 1;
      anionTests.forEach((reaction: any) => {
        reactionsToInsert.push({
          id: `anion_${id++}`,
          title: reaction.title || reaction.anion,
          description: reaction.theory || 'Anion identification test',
          group_number: null,
          category: 'anion',
          reactants: reaction.anion,
          products: JSON.stringify(reaction.confirmatoryTests || []),
          observations: JSON.stringify(reaction.steps || []),
          equations: reaction.equation || '',
          precautions: reaction.precautions || '',
        });
      });
    }

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
        products: JSON.stringify(reaction.steps || []),
        observations: JSON.stringify(reaction.steps || []),
        equations: reaction.equation,
        precautions: reaction.theory,
      });
    });

    console.log(`📝 Prepared ${reactionsToInsert.length} reactions to insert...`);

    // Insert in batches of 100 to avoid payload size limits
    const batchSize = 100;
    for (let i = 0; i < reactionsToInsert.length; i += batchSize) {
      const batch = reactionsToInsert.slice(i, i + batchSize);
      const { error } = await supabase.from('reactions').insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
        // Continue with next batch even if one fails
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
