export const organicReactions = [

  // 🔴 HALOALKANES
  {
    title: "SN1 Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Polar solvent", observation: "Carbocation formation", color: "#ffe6e6" },
      { reagent: "Nucleophile attack", observation: "Substitution product", color: "#ffcccc" }
    ],
    equation: "R-Cl → R⁺ → R-OH",
    theory: "Unimolecular nucleophilic substitution"
  },

  {
    title: "SN2 Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Strong nucleophile", observation: "Backside attack", color: "#e6f2ff" }
    ],
    equation: "R-Cl + OH⁻ → R-OH",
    theory: "Bimolecular substitution"
  },

  {
    title: "Elimination (E1/E2)",
    category: "Haloalkanes",
    steps: [
      { reagent: "Strong base", observation: "Alkene formation", color: "#fff2cc" }
    ],
    equation: "R-CH2-CH2Cl → R-CH=CH2",
    theory: "Elimination reaction"
  },

  {
    title: "Wurtz Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Na / dry ether", observation: "Alkane formation", color: "#e6ffe6" }
    ],
    equation: "2R-Cl → R-R",
    theory: "Coupling reaction"
  },

  {
    title: "Sandmeyer Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "CuCl / CuBr", observation: "Halide substitution", color: "#f0f8ff" }
    ],
    equation: "ArN2+ → ArCl",
    theory: "Diazonium substitution"
  },

  // 🔵 ALCOHOLS
  {
    title: "Alcohol Oxidation",
    category: "Alcohols",
    steps: [
      { reagent: "[O]", observation: "1° → aldehyde → acid", color: "#ffe6cc" }
    ],
    equation: "R-CH2OH → R-COOH",
    theory: "Oxidation reaction"
  },

  {
    title: "Alcohol Dehydration",
    category: "Alcohols",
    steps: [
      { reagent: "Conc. H2SO4", observation: "Alkene formation", color: "#ffcccc" }
    ],
    equation: "R-CH2OH → Alkene",
    theory: "Elimination"
  },

  {
    title: "Lucas Test",
    category: "Alcohols",
    steps: [
      { reagent: "ZnCl2 + HCl", observation: "Turbidity", color: "#f0f8ff" }
    ],
    equation: "ROH → RCl",
    theory: "Distinguishes alcohols"
  },

  // 🟢 ALDEHYDES & KETONES
  {
    title: "Tollens Test",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "[Ag(NH3)2]+", observation: "Silver mirror", color: "#f5f5f5" }
    ],
    equation: "RCHO → Ag",
    theory: "Aldehyde test"
  },

  {
    title: "Fehling Test",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Fehling solution", observation: "Red ppt", color: "#ff9999" }
    ],
    equation: "RCHO → Cu2O",
    theory: "Aldehyde oxidation"
  },

  {
    title: "Aldol Condensation",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Dil. NaOH", observation: "β-product", color: "#e6ccff" }
    ],
    equation: "2RCHO → Product",
    theory: "Condensation reaction"
  },

  {
    title: "Cannizzaro Reaction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Conc. NaOH", observation: "Alcohol + salt", color: "#e6ffe6" }
    ],
    equation: "2RCHO → RCH2OH + RCOONa",
    theory: "No alpha H"
  },

  {
    title: "Clemmensen Reduction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Zn/Hg", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOR → RCH2R",
    theory: "Reduction"
  },

  {
    title: "Wolff-Kishner Reduction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "NH2NH2", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOR → RCH2R",
    theory: "Basic reduction"
  },

  // 🟡 CARBOXYLIC ACIDS
  {
    title: "Esterification",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "Alcohol + Acid", observation: "Fruity smell", color: "#fff0f5" }
    ],
    equation: "RCOOH + R'OH → Ester",
    theory: "Ester formation"
  },

  {
    title: "Decarboxylation",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "NaOH + CaO", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOONa → RH",
    theory: "CO2 removal"
  },

  {
    title: "Kolbe Reaction",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "Electrolysis", observation: "Alkane formed", color: "#e6ffe6" }
    ],
    equation: "2RCOO⁻ → R-R",
    theory: "Electrolysis"
  },

  // 🟣 AMINES
  {
    title: "Hinsberg Test",
    category: "Amines",
    steps: [
      { reagent: "Hinsberg reagent", observation: "Solubility difference", color: "#f0f8ff" }
    ],
    equation: "Amine classification",
    theory: "1°,2°,3° distinction"
  },

  {
    title: "Carbylamine Test",
    category: "Amines",
    steps: [
      { reagent: "CHCl3 + KOH", observation: "Foul smell", color: "#ffe6e6" }
    ],
    equation: "RNH2 → RNC",
    theory: "Primary amine"
  },

  {
    title: "Hoffmann Bromamide",
    category: "Amines",
    steps: [
      { reagent: "Br2 + NaOH", observation: "Amine formed", color: "#e6ffe6" }
    ],
    equation: "RCONH2 → RNH2",
    theory: "Chain shortening"
  },

  // ⚫ AROMATIC
  {
    title: "Friedel-Crafts Alkylation",
    category: "Aromatic",
    steps: [
      { reagent: "AlCl3", observation: "Alkyl benzene", color: "#e6f2ff" }
    ],
    equation: "C6H6 → substituted",
    theory: "Electrophilic substitution"
  },

  {
    title: "Nitration",
    category: "Aromatic",
    steps: [
      { reagent: "HNO3 + H2SO4", observation: "Nitrobenzene", color: "#fff2cc" }
    ],
    equation: "C6H6 → C6H5NO2",
    theory: "Electrophilic substitution"
  },

  {
    title: "Sulfonation",
    category: "Aromatic",
    steps: [
      { reagent: "H2SO4", observation: "Sulfonic acid", color: "#ffe6cc" }
    ],
    equation: "C6H6 → C6H5SO3H",
    theory: "Reversible"
  }
];