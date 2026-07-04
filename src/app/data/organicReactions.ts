import { ReactionContent } from '../types/chemistry';

export interface ReactionStep {
  reagent: string;
  observation: string;
  color?: string;
  precipitate?: boolean;
  precipitateColor?: string;
  gasEvolution?: boolean;
}

export interface OrganicReaction {
  title: string;
  category: string;
  steps: ReactionStep[];
  equation: string;
  theory: string;
  content: ReactionContent;
}

export const organicReactions: OrganicReaction[] = [
  // 🔴 HALOALKANES
  {
    title: "SN1 Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Polar solvent", observation: "Carbocation formation", color: "#ffe6e6" },
      { reagent: "Nucleophile attack", observation: "Substitution product", color: "#ffcccc" }
    ],
    equation: "R-Cl → R⁺ → R-OH",
    theory: "Unimolecular nucleophilic substitution",
    content: {
      observations: {
        observation: "Formation of substitution product. Reaction rate depends only on alkyl halide concentration.",
        inference: "SN1 pathway is active.",
        explanation: "The reaction occurs in two steps. The slow rate-determining step is the formation of a planar carbocation intermediate, followed by rapid attack of the nucleophile."
      },
      confirmatoryTest: {
        procedure: [
          "Take t-butyl chloride in a test tube.",
          "Add aqueous silver nitrate (AgNO₃) in ethanol."
        ],
        observation: "Immediate white precipitate of silver chloride (AgCl) forms.",
        conclusion: "Tertiary carbocation formation facilitates rapid SN1 substitution."
      },
      equation: {
        molecular: "(CH₃)₃C-Cl + H₂O → (CH₃)₃C-OH + HCl",
        ionic: "(CH₃)₃C-Cl + Ag⁺ + H₂O → (CH₃)₃C-OH + AgCl↓ + H⁺"
      },
      theory: {
        principle: "Unimolecular nucleophilic substitution. It is a first-order reaction with rate = k[R-X]. Stability of carbocation intermediate governs the reaction rate.",
        mechanism: "Step 1: Heterolytic cleavage of C-X bond (slow, rate-determining) to form planar carbocation. Step 2: Nucleophilic attack (fast) from either face of the planar carbocation.",
        observationReason: "Photolytic precipitation of AgCl with AgNO₃ confirms immediate release of chloride ions due to stable tertiary carbocation formation.",
        examPoints: [
          "Reactivity order of alkyl halides: 3° > 2° > 1° > Methyl.",
          "Accompanied by racemization of chiral centers (with slight inversion due to ion pairs).",
          "Rearrangements (hydride or alkyl shifts) occur to form more stable carbocations.",
          "Polar protic solvents (H₂O, alcohols) accelerate the rate by solvating both cation and anion."
        ],
        commonMistakes: [
          "Expecting complete inversion of configuration (that is SN2; SN1 yields racemization).",
          "Forgetting that carbocation rearrangement can occur before nucleophilic attack."
        ],
        mnemonic: "SN1 = Single reactant in rate law, 1st order, carbocation intermediate."
      }
    }
  },
  {
    title: "SN2 Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Strong nucleophile", observation: "Backside attack", color: "#e6f2ff" }
    ],
    equation: "R-Cl + OH⁻ → R-OH",
    theory: "Bimolecular substitution",
    content: {
      observations: {
        observation: "Direct substitution without carbocation intermediates. Rate depends on both substrate and nucleophile.",
        inference: "SN2 pathway is active.",
        explanation: "Concerted single-step reaction where nucleophile attacks from the backside of the leaving group, passing through a pentacoordinate transition state."
      },
      confirmatoryTest: {
        procedure: [
          "React optically active (R)-2-bromooctane with aqueous NaOH.",
          "Measure the optical rotation of the isolated product."
        ],
        observation: "The product is purely (S)-2-octanol, showing complete inversion of configuration.",
        conclusion: "Backside nucleophilic attack causes Walden Inversion."
      },
      equation: {
        molecular: "CH₃CH₂Cl + NaOH → CH₃CH₂OH + NaCl",
        ionic: "R-Cl + OH⁻ → [HO---R---Cl]‡ → R-OH + Cl⁻"
      },
      theory: {
        principle: "Bimolecular nucleophilic substitution. Second-order reaction with rate = k[R-X][Nu⁻]. Steric hindrance at the electrophilic carbon controls the reaction rate.",
        mechanism: "Concerted backside attack of nucleophile. As the nucleophile forms a bond, the carbon-leaving group bond breaks simultaneously. Passes through a pentacoordinate transition state.",
        observationReason: "Inversion of optical rotation due to Walden inversion.",
        examPoints: [
          "Reactivity order: Methyl > 1° > 2° > 3°.",
          "Walden inversion occurs at chiral centers.",
          "Accelerated by polar aprotic solvents (acetone, DMSO, DMF) which solvate cations but leave nucleophiles naked and highly active.",
          "No rearrangement possible since no carbocation is formed."
        ],
        commonMistakes: [
          "Trying to perform SN2 on tertiary alkyl halides (they do not react via SN2 due to severe steric clash).",
          "Using polar protic solvents (like ethanol or water) which slow down SN2 by solvating the nucleophile."
        ],
        mnemonic: "SN2 = Backside attack, Inversion, 2 reactants in rate law."
      }
    }
  },
  {
    title: "Elimination (E1/E2)",
    category: "Haloalkanes",
    steps: [
      { reagent: "Strong base", observation: "Alkene formation", color: "#fff2cc" }
    ],
    equation: "R-CH2-CH2Cl → R-CH=CH2",
    theory: "Elimination reaction",
    content: {
      observations: {
        observation: "Formation of gaseous/liquid alkene which decolorizes bromine water.",
        inference: "Elimination (dehydrohalogenation) has occurred.",
        explanation: "Alkyl halides undergo elimination of HX in the presence of strong bases. E2 is a concerted elimination requiring anti-periplanar geometry; E1 proceeds via a carbocation."
      },
      confirmatoryTest: {
        procedure: [
          "Heat 2-bromobutane with alcoholic KOH.",
          "Pass the evolved gas through a solution of bromine in CCl₄."
        ],
        observation: "The reddish-brown bromine solution is immediately decolorized.",
        conclusion: "Butene alkene formation confirmed by addition reaction."
      },
      equation: {
        molecular: "CH₃-CH₂-CH(Br)-CH₃ + KOH (alc) → CH₃-CH=CH-CH₃ (major) + KBr + H₂O",
        ionic: "R-CH₂-CH(X)-R' + Base⁻ → R-CH=CH-R' + HX-Base"
      },
      theory: {
        principle: "Dehydrohalogenation of alkyl halides. Regioselectivity is governed by Saytzeff's Rule (the more substituted, thermodynamically stable alkene is the major product).",
        mechanism: "E2: Concerted base abstraction of beta-proton and leaving group departure (requires anti-periplanar transition state). E1: Stepwise formation of carbocation intermediate followed by proton loss.",
        observationReason: "Decolorization of bromine water confirms the presence of unsaturation (C=C double bond).",
        examPoints: [
          "Saytzeff major product: trans-alkene is preferred over cis-alkene due to lower steric strain.",
          "Hofmann elimination (less substituted alkene) is preferred if bulky bases (t-BuOK) or poor leaving groups (fluoride) are used.",
          "E2 is stereospecific (requires anti-coplanar alignment of H and leaving group)."
        ],
        commonMistakes: [
          "Using aqueous KOH instead of alcoholic KOH. Aqueous KOH favors substitution (alcohol formation) whereas alcoholic KOH favors elimination."
        ],
        mnemonic: "Saytzeff = Highly substituted alkene is king."
      }
    }
  },
  {
    title: "Wurtz Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "Na / dry ether", observation: "Alkane formation", color: "#e6ffe6" }
    ],
    equation: "2R-Cl → R-R",
    theory: "Coupling reaction",
    content: {
      observations: {
        observation: "Dissolution of sodium metal with evolution of heat, forming a symmetrical higher alkane.",
        inference: "Wurtz carbon-carbon coupling has occurred.",
        explanation: "Alkyl halides react with sodium metal in dry ether to form symmetrical alkanes containing twice the number of carbon atoms."
      },
      confirmatoryTest: {
        procedure: [
          "Add sodium metal to methyl iodide dissolved in dry ether.",
          "Pass the evolved gas (ethane) through bromine water."
        ],
        observation: "Ethane gas is evolved. The reaction requires strictly anhydrous conditions; otherwise, sodium reacts violently.",
        conclusion: "Symmetrical alkane formation is achieved."
      },
      equation: {
        molecular: "2CH₃I + 2Na + dry ether → CH₃-CH₃ + 2NaI",
        ionic: "2R-X + 2Na → R-R + 2Na⁺ + 2X⁻"
      },
      theory: {
        principle: "Organometallic carbon-carbon coupling reaction. The reaction proceeds via an organosodium intermediate (R⁻Na⁺) which acts as a nucleophile, or via free radicals (R•) that dimerize.",
        mechanism: "Radical Mechanism: R-X + Na → R• + NaX; 2R• → R-R. Ionic Mechanism: R-X + 2Na → R⁻Na⁺ + NaX; R⁻Na⁺ + R-X → R-R + NaX.",
        observationReason: "Vigorous reaction with sodium dissolution and alkane gas evolution.",
        examPoints: [
          "Only suitable for preparing symmetrical alkanes (R-R).",
          "If two different alkyl halides (R-X and R'-X) are used, a mixture of three alkanes (R-R, R'-R', R-R') is formed, which is difficult to separate.",
          "Methane cannot be prepared by this method.",
          "Dry ether must be anhydrous to prevent sodium from decomposing water violently."
        ],
        commonMistakes: [
          "Using wet ether, which leads to sodium decomposition to NaOH and hydrogen gas, causing a fire hazard.",
          "Expecting high yields of unsymmetrical alkanes."
        ],
        mnemonic: "Wurtz = Double the carbons, symmetrical alkane."
      }
    }
  },
  {
    title: "Sandmeyer Reaction",
    category: "Haloalkanes",
    steps: [
      { reagent: "CuCl / CuBr", observation: "Halide substitution", color: "#f0f8ff" }
    ],
    equation: "ArN2+ → ArCl",
    theory: "Diazonium substitution",
    content: {
      observations: {
        observation: "Evolution of nitrogen gas upon adding cuprous halide to diazonium salt, followed by separation of aryl halide layer.",
        inference: "Substitution of diazonium group by halide.",
        explanation: "Benzenediazonium chloride decomposes in the presence of copper(I) catalysts (CuCl or CuBr) to form chlorobenzene or bromobenzene."
      },
      confirmatoryTest: {
        procedure: [
          "Perform diazotization of aniline with NaNO₂/HCl below 5°C.",
          "Add cuprous chloride (CuCl) in HCl and warm."
        ],
        observation: "Vigorous effervescence of nitrogen gas occurs, and a heavy oil (chlorobenzene) separates at the bottom.",
        conclusion: "Aryl chloride formation confirmed."
      },
      equation: {
        molecular: "C₆H₅NH₂ + NaNO₂ + 2HCl (0-5°C) → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O\nC₆H₅N₂⁺Cl⁻ + CuCl/HCl → C₆H₅Cl + N₂↑ + CuCl",
        ionic: "ArN₂⁺ + CuX → ArX + N₂↑ + Cu⁺"
      },
      theory: {
        principle: "Nucleophilic aromatic substitution via aryl radical intermediates. Copper(I) acts as a single-electron transfer catalyst to decompose the diazonium cation.",
        mechanism: "ArN₂⁺ + Cu⁺ → Ar• + N₂ + Cu²⁺; Ar• + Cu²⁺-X → Ar-X + Cu⁺.",
        observationReason: "Effervescence of nitrogen gas and appearance of characteristic aromatic halo-oil.",
        examPoints: [
          "Diazotization must be kept at 0-5°C. At higher temperatures, diazonium salts hydrolyze to form phenol.",
          "Sandmeyer reaction is used for chlorination and bromination. Iodination is done by simple heating with KI (no Cu catalyst needed).",
          "Fluorination is done via Balz-Schiemann reaction (heating diazonium fluoroborate)."
        ],
        commonMistakes: [
          "Letting the temperature rise above 5°C during diazonium preparation, resulting in phenol as the main product.",
          "Assuming CuI is used for iodination."
        ],
        mnemonic: "Sandmeyer uses Copper (Cuprous) to sand nitrogen off diazonium."
      }
    }
  },

  // 🔵 ALCOHOLS
  {
    title: "Alcohol Oxidation",
    category: "Alcohols",
    steps: [
      { reagent: "[O]", observation: "1° → aldehyde → acid", color: "#ffe6cc" }
    ],
    equation: "R-CH2OH → R-COOH",
    theory: "Oxidation reaction",
    content: {
      observations: {
        observation: "Orange acidified potassium dichromate turns green, or purple KMnO₄ turns colorless, during oxidation.",
        inference: "Oxidation of alcohol to carbonyl/carboxylic acid.",
        explanation: "Primary alcohols oxidize to aldehydes and then to carboxylic acids; secondary alcohols oxidize to ketones; tertiary alcohols resist oxidation but undergo dehydration under acidic conditions."
      },
      confirmatoryTest: {
        procedure: [
          "Take ethanol in a test tube, add acidified K₂Cr₂O₇ and warm.",
          "Observe color change and check odor."
        ],
        observation: "The orange solution turns green, and a sharp vinegary smell (acetic acid) or fruity smell (acetaldehyde) is detected.",
        conclusion: "Oxidation of primary alcohol confirmed."
      },
      equation: {
        molecular: "CH₃CH₂OH + [O] (K₂Cr₂O₇/H⁺) → CH₃CHO + H₂O\nCH₃CHO + [O] → CH₃COOH",
        ionic: "CH₃CH₂OH + Cr₂O₇²⁻ + 8H⁺ → CH₃CHO + 2Cr³⁺ (Green) + 7H₂O"
      },
      theory: {
        principle: "Loss of hydrogen atoms (dehydrogenation) at the alpha-carbon. Controlled by strength of oxidizing agent.",
        mechanism: "Formation of chromate ester intermediate followed by base-assisted elimination of alpha-proton.",
        observationReason: "Reduction of Cr(VI) (orange) to Cr(III) (green).",
        examPoints: [
          "To stop oxidation of 1° alcohols at the aldehyde stage, use PCC (Pyridinium Chlorochromate) or Collins reagent in anhydrous medium.",
          "Jones reagent (CrO₃ in aq. H₂SO₄/acetone) oxidizes 1° alcohols directly to carboxylic acids.",
          "Dehydrogenation over Cu catalyst at 300°C: 1° yields aldehyde, 2° yields ketone, 3° yields alkene (dehydration)."
        ],
        commonMistakes: [
          "Assuming 3° alcohols oxidize to ketones. They do not have an alpha-hydrogen, so they resist oxidation and only dehydrate to alkenes under acidic conditions."
        ]
      }
    }
  },
  {
    title: "Alcohol Dehydration",
    category: "Alcohols",
    steps: [
      { reagent: "Conc. H2SO4", observation: "Alkene formation", color: "#ffcccc" }
    ],
    equation: "R-CH2OH → Alkene",
    theory: "Elimination",
    content: {
      observations: {
        observation: "Formation of gaseous/liquid alkene which decolorizes alkaline KMnO₄.",
        inference: "Dehydration of alcohol (acid-catalyzed elimination).",
        explanation: "Alcohols undergo dehydration in the presence of protic acids (conc. H₂SO₄, H₃PO₄) to yield alkenes via carbocation intermediates."
      },
      confirmatoryTest: {
        procedure: [
          "Heat ethanol with concentrated H₂SO₄ at 170°C.",
          "Pass the evolved gas (ethene) through bromine water."
        ],
        observation: "Bromine water is decolorized.",
        conclusion: "Alkene formation confirmed."
      },
      equation: {
        molecular: "CH₃CH₂OH + H₂SO₄ (170°C) → CH₂=CH₂ + H₂O",
        ionic: "R-CH₂-CH(OH)-R' + H⁺ → R-CH=CH-R' + H₂O"
      },
      theory: {
        principle: "Acid-catalyzed E1 elimination. Ease of dehydration order: 3° > 2° > 1° alcohols, corresponding to the stability of the intermediate carbocations.",
        mechanism: "Step 1: Protonation of -OH to form alkyloxonium ion. Step 2: Loss of H₂O (slow) to form carbocation. Step 3: Deprotonation by base (H₂O) from beta-carbon to form alkene.",
        observationReason: "Decolorization of bromine confirms the double bond of the alkene.",
        examPoints: [
          "Reaction temperature is critical: ethanol + conc. H₂SO₄ at 140°C yields diethyl ether (nucleophilic substitution), whereas at 170°C it yields ethene (elimination).",
          "Carbocation rearrangements (hydride/alkyl shifts) can occur.",
          "Saytzeff's rule dictates the major product for unsymmetrical alcohols."
        ],
        commonMistakes: [
          "Forgetting the temperature dependence of ethanol dehydration (140°C vs 170°C).",
          "Not considering carbocation rearrangements."
        ]
      }
    }
  },
  {
    title: "Lucas Test",
    category: "Alcohols",
    steps: [
      { reagent: "ZnCl2 + HCl", observation: "Turbidity", color: "#f0f8ff" }
    ],
    equation: "ROH → RCl",
    theory: "Distinguishes alcohols",
    content: {
      observations: {
        observation: "Appearance of turbidity (cloudiness) at different times depending on the class of alcohol.",
        inference: "Classification of alcohol (1°, 2°, or 3°).",
        explanation: "Lucas reagent (anhydrous ZnCl₂ + conc. HCl) converts alcohols to alkyl chlorides. Since alkyl chlorides are insoluble in water, they form turbidity."
      },
      confirmatoryTest: {
        procedure: [
          "To 1 mL of alcohol, add 2 mL of Lucas reagent at room temperature.",
          "Shake and note the time taken for turbidity to appear."
        ],
        observation: "3° alcohol gives turbidity immediately. 2° alcohol gives turbidity in 5 minutes. 1° alcohol does not give turbidity at room temperature (only on heating).",
        conclusion: "Alcohol type identified."
      },
      equation: {
        molecular: "R-OH + HCl + ZnCl₂ → R-Cl↓ (turbidity) + H₂O",
        ionic: "R-OH + H⁺ → R⁺ + H₂O → R-Cl↓"
      },
      theory: {
        principle: "Nucleophilic substitution (SN1 pathway favored by ZnCl₂ acting as a Lewis acid catalyst). The rate depends on carbocation stability.",
        mechanism: "Protonated alcohol coordinates with ZnCl₂ to form a good leaving group [O-ZnCl₂]⁻. Leaving group departs to form carbocation, which is attacked by Cl⁻.",
        observationReason: "Turbidity is due to the formation of insoluble alkyl chloride droplets.",
        examPoints: [
          "Lucas reagent is a mixture of equimolar anhydrous ZnCl₂ and concentrated HCl.",
          "Allyl and benzyl alcohols are 1° but give immediate turbidity because their carbocations are resonance-stabilized."
        ],
        commonMistakes: [
          "Misidentifying allyl alcohol as 3° because it gives immediate turbidity (remember it gives immediate turbidity due to resonance stabilization, not tertiary structure)."
        ],
        mnemonic: "3-2-1: Immediate, Five, Never."
      }
    }
  },

  // 🟢 ALDEHYDES & KETONES
  {
    title: "Tollens Test",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "[Ag(NH3)2]+", observation: "Silver mirror", color: "#f5f5f5" }
    ],
    equation: "RCHO → Ag",
    theory: "Aldehyde test",
    content: {
      observations: {
        observation: "Formation of a brilliant silver mirror on the inner walls of the test tube, or a black precipitate of silver.",
        inference: "Reducing sugar or aldehyde (R-CHO) is present.",
        explanation: "Aldehydes are easily oxidized to carboxylic acids, reducing the diammine-silver(I) complex to metallic silver. Ketones generally do not respond."
      },
      confirmatoryTest: {
        procedure: [
          "To 1 mL of aldehyde, add 1 mL of freshly prepared Tollens' reagent.",
          "Heat the mixture in a hot water bath for 5 minutes."
        ],
        observation: "A shiny silver mirror forms on the glass wall.",
        conclusion: "Aldehyde confirmed."
      },
      equation: {
        molecular: "RCHO + 2[Ag(NH₃)₂]OH → RCOONH₄ + 2Ag↓ + 3NH₃ + H₂O",
        ionic: "RCHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → RCOO⁻ + 2Ag↓ (Silver Mirror) + 4NH₃ + 2H₂O"
      },
      theory: {
        principle: "Mild redox reaction. Aldehydes are strong reducing agents due to the presence of an oxidizable hydrogen atom on the carbonyl carbon.",
        mechanism: "Nucleophilic addition of hydroxide to carbonyl followed by hydride transfer to silver complex.",
        observationReason: "Reduction of Ag(I) complex to metallic Ag(0) which deposits on clean glass.",
        examPoints: [
          "Tollens' reagent is ammoniacal silver nitrate: [Ag(NH₃)₂]⁺.",
          "Both aliphatic and aromatic aldehydes give this test.",
          "Formic acid (HCOOH) and alpha-hydroxy ketones (like fructose) also give a positive Tollens' test.",
          "Tollens' reagent must be freshly prepared; old reagent forms explosive silver nitride."
        ],
        commonMistakes: [
          "Heating directly over a burner instead of a water bath, which can cause the silver mirror to flake off as black carbon-like silver.",
          "Assuming fructose (a ketone) is negative (it isomerizes to glucose in basic Tollens' medium and gives a positive test)."
        ],
        mnemonic: "Tollens = Silver Mirror."
      }
    }
  },
  {
    title: "Fehling Test",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Fehling solution", observation: "Red ppt", color: "#ff9999" }
    ],
    equation: "RCHO → Cu2O",
    theory: "Aldehyde oxidation",
    content: {
      observations: {
        observation: "Deep blue solution turns green, then orange-yellow, and finally forms a red precipitate of cuprous oxide.",
        inference: "Aliphatic aldehyde is present.",
        explanation: "Aliphatic aldehydes reduce alkaline Cu(II) complexed with tartrate ions to red insoluble copper(I) oxide (Cu₂O). Aromatic aldehydes generally fail this test."
      },
      confirmatoryTest: {
        procedure: [
          "Mix equal volumes of Fehling A (aq. CuSO₄) and Fehling B (alkaline sodium potassium tartrate).",
          "Add aldehyde and heat in a water bath."
        ],
        observation: "A brick-red precipitate forms.",
        conclusion: "Aliphatic aldehyde confirmed."
      },
      equation: {
        molecular: "RCHO + 2Cu²⁺ + 5OH⁻ → RCOO⁻ + Cu₂O↓ (Red) + 3H₂O",
        ionic: "RCHO + 2Cu(tartrate)₂²⁻ + 5OH⁻ → RCOO⁻ + Cu₂O↓ + 4tartrate²⁻ + 3H₂O"
      },
      theory: {
        principle: "Redox reaction under basic conditions. Tartrate acts as a chelating ligand (Rochelle salt) to prevent the precipitation of Cu(OH)₂ in highly alkaline medium.",
        mechanism: "Hydride transfer and reduction of Cu(II) to Cu(I).",
        observationReason: "Formation of insoluble copper(I) oxide (Cu₂O) which has a characteristic brick-red color.",
        examPoints: [
          "Fehling A: Aqueous copper sulfate. Fehling B: Sodium potassium tartrate (Rochelle salt) + NaOH.",
          "Aromatic aldehydes (like benzaldehyde) do not respond because they lack alpha-hydrogens and have resonance stabilization that decreases carbonyl electrophilicity, making oxidation slower.",
          "Formic acid and reducing sugars give positive test."
        ],
        commonMistakes: [
          "Expecting benzaldehyde (aromatic) to give a positive Fehling test. It is negative."
        ],
        mnemonic: "Fehling = Aliphatic only, Brick Red."
      }
    }
  },
  {
    title: "Aldol Condensation",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Dil. NaOH", observation: "β-product", color: "#e6ccff" }
    ],
    equation: "2RCHO → Product",
    theory: "Condensation reaction",
    content: {
      observations: {
        observation: "Formation of a viscous product with a sweet odor, which on heating yields a pungent alpha,beta-unsaturated carbonyl compound.",
        inference: "Aldol condensation has occurred.",
        explanation: "Aldehydes or ketones containing at least one alpha-hydrogen undergo dimerization in the presence of dilute base to form beta-hydroxycarbonyl compounds (aldols)."
      },
      confirmatoryTest: {
        procedure: [
          "Take acetaldehyde in a test tube and add dilute NaOH solution.",
          "Warm gently and observe odor. Add a drop of iodine to verify the double bond of dehydrated product."
        ],
        observation: "Yellowish oily product forms with a characteristic crotonaldehyde odor upon heating.",
        conclusion: "Aldol condensation and dehydration confirmed."
      },
      equation: {
        molecular: "2CH₃CHO + NaOH (dil) → CH₃-CH(OH)-CH₂-CHO (Aldol) → CH₃-CH=CH-CHO (Crotonaldehyde) + H₂O",
        ionic: "CH₃CHO + OH⁻ ⇌ [⁻CH₂CHO] + H₂O; [⁻CH₂CHO] + CH₃CHO ⇌ CH₃-CH(O⁻)-CH₂CHO"
      },
      theory: {
        principle: "Nucleophilic addition to carbonyl. The alpha-hydrogens of aldehydes/ketones are acidic due to resonance stabilization of the resulting enolate ion by the carbonyl group.",
        mechanism: "Step 1: Enolate formation by base. Step 2: Nucleophilic attack of enolate on another carbonyl molecule. Step 3: Protonation to form aldol. Step 4: Dehydration (E1cB) to form conjugated enone.",
        observationReason: "Viscous oil formation and characteristic pungent smell of dehydrated conjugated product.",
        examPoints: [
          "Requires at least one alpha-hydrogen. Cannizzaro reaction occurs if no alpha-hydrogens are present.",
          "Dehydration of aldol happens readily because the product is stabilized by conjugation (extended pi system).",
          "Crossed Aldol occurs between two different carbonyls."
        ],
        commonMistakes: [
          "Attempting aldol condensation with benzaldehyde or formaldehyde alone (they have no alpha-hydrogens; they will undergo Cannizzaro reaction instead)."
        ],
        mnemonic: "Aldol needs Alpha-hydrogens."
      }
    }
  },
  {
    title: "Cannizzaro Reaction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Conc. NaOH", observation: "Alcohol + salt", color: "#e6ffe6" }
    ],
    equation: "2RCHO → RCH2OH + RCOONa",
    theory: "No alpha H",
    content: {
      observations: {
        observation: "Disappearance of aldehyde smell and formation of a mixture of alcohol and carboxylic acid salt in concentrated alkali.",
        inference: "Cannizzaro disproportionation has occurred.",
        explanation: "Aldehydes with no alpha-hydrogen undergo self-redox (disproportionation) in concentrated base, where one molecule is reduced to an alcohol and the other is oxidized to a carboxylate salt."
      },
      confirmatoryTest: {
        procedure: [
          "Shake benzaldehyde with 50% NaOH solution.",
          "Let stand, then acidify with HCl."
        ],
        observation: "White precipitate of benzoic acid forms on acidification, and benzyl alcohol is extracted.",
        conclusion: "Disproportionation confirmed."
      },
      equation: {
        molecular: "2C₆H₅CHO + NaOH (50%) → C₆H₅CH₂OH + C₆H₅COONa\nC₆H₅COONa + HCl → C₆H₅COOH↓ + NaCl",
        ionic: "2ArCHO + OH⁻ → ArCH₂OH + ArCOO⁻"
      },
      theory: {
        principle: "Hydride transfer reaction. In the absence of acidic alpha-hydrogens, the base attacks the carbonyl carbon to form a tetrahedral intermediate, which expels a hydride ion to a second aldehyde molecule.",
        mechanism: "Step 1: OH⁻ addition to carbonyl carbon. Step 2: Rate-determining intermolecular transfer of hydride (H⁻) from the dianion/monoanion to another aldehyde molecule.",
        observationReason: "Precipitation of benzoic acid on acidifying confirms the formation of sodium benzoate.",
        examPoints: [
          "Applies only to aldehydes with NO alpha-hydrogens (e.g., benzaldehyde, formaldehyde, trimethylacetaldehyde).",
          "Crossed Cannizzaro: Formaldehyde is always oxidized to formic acid because of its high reactivity toward nucleophilic attack by OH⁻, leaving the other aldehyde to be reduced."
        ],
        commonMistakes: [
          "Using dilute NaOH (dilute base leads to nothing or aldol if impurities exist; Cannizzaro requires concentrated 50% alkali)."
        ],
        mnemonic: "Cannizzaro = Carbonyl disproportionation, zero alpha-hydrogens."
      }
    }
  },
  {
    title: "Clemmensen Reduction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "Zn/Hg", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOR → RCH2R",
    theory: "Reduction",
    content: {
      observations: {
        observation: "Reduction of carbonyl group (C=O) to methylene group (CH₂) using zinc amalgam and concentrated HCl.",
        inference: "Clemmensen reduction of ketone/aldehyde to alkane.",
        explanation: "Carbonyl compounds are reduced to alkanes under highly acidic conditions."
      },
      confirmatoryTest: {
        procedure: [
          "Reflux acetophenone with zinc amalgam (Zn-Hg) and concentrated HCl.",
          "Separate and analyze the hydrocarbon product."
        ],
        observation: "Acetophenone is converted to ethylbenzene.",
        conclusion: "Carbonyl reduction confirmed."
      },
      equation: {
        molecular: "C₆H₅COCH₃ + 4HCl + 2Zn(Hg) → C₆H₅CH₂CH₃ + 2ZnCl₂ + H₂O",
        ionic: "R-CO-R' + 4H⁺ + 4e⁻ → R-CH₂-R' + H₂O"
      },
      theory: {
        principle: "Acidic reduction of carbonyls. Zinc amalgam serves as the electron source, transferring electrons to the protonated carbonyl group on the metal surface.",
        mechanism: "Surface-catalyzed transfer of electrons and protons to coordinate oxygen and carbon, bypassing free carbocation/alcohol intermediates.",
        observationReason: "Formation of liquid hydrocarbon product from carbonyl precursor.",
        examPoints: [
          "Not suitable for compounds containing acid-sensitive groups (like esters, acetals, or alcohols which dehydrate).",
          "Zinc is amalgamated with mercury to control its reactivity and prevent rapid hydrogen evolution with HCl."
        ],
        commonMistakes: [
          "Using Clemmensen reduction on a substrate containing a beta-hydroxy group, as it will undergo dehydration under the strongly acidic conditions."
        ],
        mnemonic: "Clemmensen uses HCl (Acidic)."
      }
    }
  },
  {
    title: "Wolff-Kishner Reduction",
    category: "Aldehydes/Ketones",
    steps: [
      { reagent: "NH2NH2", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOR → RCH2R",
    theory: "Basic reduction",
    content: {
      observations: {
        observation: "Carbonyl compound is reduced to alkane using hydrazine, strong base, and high-boiling solvent, with evolution of nitrogen gas.",
        inference: "Wolff-Kishner reduction has occurred.",
        explanation: "Carbonyl compounds react with hydrazine to form hydrazones, which decompose in the presence of base at high temperatures to release nitrogen gas and yield alkanes."
      },
      confirmatoryTest: {
        procedure: [
          "Heat benzophenone with hydrazine hydrate (NH₂NH₂•H₂O), KOH, and ethylene glycol.",
          "Observe nitrogen gas evolution."
        ],
        observation: "Effervescence of N₂ gas occurs, and diphenylmethane is formed.",
        conclusion: "Carbonyl to alkane conversion under basic conditions confirmed."
      },
      equation: {
        molecular: "C₆H₅COC₆H₅ + NH₂NH₂ → C₆H₅C(=NNH₂)C₆H₅ + H₂O\nC₆H₅C(=NNH₂)C₆H₅ + 2KOH (glycol, Δ) → C₆H₅CH₂C₆H₅ + N₂↑ + 2H₂O",
        ionic: "R-C(=NNH₂)-R' + 2OH⁻ → R-CH₂-R' + N₂↑ + 2H₂O"
      },
      theory: {
        principle: "Basic reduction of carbonyls. Hydrazone intermediate decomposes thermally via carbanion intermediates with the driving force being the thermodynamic stability of nitrogen gas.",
        mechanism: "Step 1: Hydrazone formation. Step 2: Base abstracts proton from nitrogen. Step 3: Proton transfer to carbon. Step 4: Base abstracts second proton, expelling N₂ gas to form carbanion, which is protonated to alkane.",
        observationReason: "Evolution of nitrogen gas bubbles.",
        examPoints: [
          "Complementary to Clemmensen: Wolff-Kishner is basic, and thus ideal for acid-sensitive substrates.",
          "High-boiling solvent like ethylene glycol or diethylene glycol is required to reach the necessary reaction temperature (approx. 180-200°C)."
        ],
        commonMistakes: [
          "Using this method on base-sensitive compounds (like those with halogen substituents, which undergo elimination or substitution)."
        ],
        mnemonic: "Wolff-Kishner uses KOH (Basic)."
      }
    }
  },

  // 🟡 CARBOXYLIC ACIDS
  {
    title: "Esterification",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "Alcohol + Acid", observation: "Fruity smell", color: "#fff0f5" }
    ],
    equation: "RCOOH + R'OH → Ester",
    theory: "Ester formation",
    content: {
      observations: {
        observation: "Disappearance of sharp acid odor and appearance of a sweet, fruity fragrance.",
        inference: "Esterification has occurred.",
        explanation: "Carboxylic acids react with alcohols in the presence of strong acid catalyst to form esters and water."
      },
      confirmatoryTest: {
        procedure: [
          "Mix acetic acid and ethanol in a test tube.",
          "Add 3-4 drops of concentrated H₂SO₄ and heat in a water bath.",
          "Pour the mixture into a beaker containing sodium carbonate solution."
        ],
        observation: "A distinct fruity smell (ethyl acetate) is released.",
        conclusion: "Ester formation confirmed."
      },
      equation: {
        molecular: "CH₃COOH + C₂H₅OH + H₂SO₄ ⇌ CH₃COOC₂H₅ + H₂O",
        ionic: "R-COOH + R'-OH + H⁺ ⇌ R-COOR' + H₂O"
      },
      theory: {
        principle: "Acid-catalyzed nucleophilic acyl substitution. The reaction is reversible and reaches an equilibrium; water removal or excess reactant shifts it forward (Le Chatelier's principle).",
        mechanism: "Step 1: Protonation of carbonyl oxygen. Step 2: Nucleophilic addition of alcohol. Step 3: Proton transfer. Step 4: Elimination of water. Step 5: Deprotonation.",
        observationReason: "Fruity smell of volatile esters.",
        examPoints: [
          "The oxygen in the ester linkage comes from the ALCOHOL, not the carboxylic acid (proven by isotopic labeling with O-18).",
          "Concentrated H₂SO₄ acts as both catalyst and dehydrating agent.",
          "Steric hindrance in either the acid or alcohol decreases the rate of esterification."
        ],
        commonMistakes: [
          "Adding too much water or not using concentrated acid, which reverses the reaction to acid and alcohol."
        ],
        mnemonic: "Acid + Alcohol = Sweet Ester."
      }
    }
  },
  {
    title: "Decarboxylation",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "NaOH + CaO", observation: "Alkane formed", color: "#e6f2ff" }
    ],
    equation: "RCOONa → RH",
    theory: "CO2 removal",
    content: {
      observations: {
        observation: "Evolution of an alkane gas upon heating a sodium carboxylate salt with soda lime.",
        inference: "Decarboxylation (loss of carbon dioxide) has occurred.",
        explanation: "Sodium salts of carboxylic acids undergo loss of carbon dioxide when heated with soda lime (NaOH + CaO) to yield alkanes with one less carbon atom."
      },
      confirmatoryTest: {
        procedure: [
          "Mix dry sodium acetate and soda lime in a test tube.",
          "Heat strongly and pass the evolved gas (methane) through bromine water."
        ],
        observation: "A gas is evolved which burns with a pale blue flame but does not decolorize bromine water (saturated alkane).",
        conclusion: "Methane formation confirmed."
      },
      equation: {
        molecular: "CH₃COONa + NaOH (CaO) → CH₄↑ + Na₂CO₃",
        ionic: "R-COO⁻ + OH⁻ → R-H + CO₃²⁻"
      },
      theory: {
        principle: "Base-catalyzed decarboxylation. Soda lime provides a highly alkaline solid medium. Calcium oxide keeps the sodium hydroxide dry and free-flowing (decreases hygroscopicity).",
        mechanism: "Nucleophilic attack of OH⁻ on carbonyl carbon, forming a carbanion intermediate (R⁻) which rapidly abstracts a proton from water/hydroxide.",
        observationReason: "Evolution of flammable alkane gas.",
        examPoints: [
          "The alkane formed has one less carbon atom than the parent carboxylic acid salt (chain shortening method).",
          "Beta-keto acids undergo decarboxylation very easily upon simple heating (via a cyclic transition state, no base needed)."
        ],
        commonMistakes: [
          "Not using dry reactants. Water will cause NaOH to melt and attack the glass tube."
        ],
        mnemonic: "Soda lime cuts one carbon off."
      }
    }
  },
  {
    title: "Kolbe Reaction",
    category: "Carboxylic Acids",
    steps: [
      { reagent: "Electrolysis", observation: "Alkane formed", color: "#e6ffe6" }
    ],
    equation: "2RCOO⁻ → R-R",
    theory: "Electrolysis",
    content: {
      observations: {
        observation: "Evolution of gases at both anode and cathode during electrolysis of an aqueous solution of sodium/potassium carboxylate.",
        inference: "Kolbe's electrolytic decarboxylation.",
        explanation: "Electrolysis of carboxylate salts yields symmetrical alkanes at the anode along with carbon dioxide, and hydrogen gas at the cathode."
      },
      confirmatoryTest: {
        procedure: [
          "Electrolyze a concentrated solution of potassium acetate.",
          "Collect gases at the anode and test for CO₂ (limewater) and ethane."
        ],
        observation: "Anode gas turns limewater milky (CO₂) and contains flammable ethane.",
        conclusion: "Dimerized alkane synthesis confirmed."
      },
      equation: {
        molecular: "2CH₃COOK + 2H₂O → CH₃-CH₃ (Anode) + 2CO₂ (Anode) + H₂ (Cathode) + 2KOH",
        ionic: "Anode: 2RCOO⁻ - 2e⁻ → 2RCOO• → 2R• + 2CO₂ → R-R\nCathode: 2H₂O + 2e⁻ → H₂↑ + 2OH⁻"
      },
      theory: {
        principle: "Free radical dimerization. Carboxylate ions are oxidized at the anode to form unstable carboxyl radicals, which decarboxylate to yield alkyl radicals. These radicals then dimerize.",
        mechanism: "Electrochemical oxidation at anode followed by homolytic cleavage and coupling.",
        observationReason: "Simultaneous evolution of alkane and carbon dioxide at the anode.",
        examPoints: [
          "Yields symmetrical alkanes containing 2(n-1) carbons where n is the number of carbons in the acid.",
          "The pH of the solution increases during electrolysis due to the accumulation of KOH/NaOH.",
          "Side products include alkenes, esters, and alcohols due to radical disproportionation and oxidation."
        ],
        commonMistakes: [
          "Expecting to prepare methane by Kolbe's electrolysis (methyl radicals dimerize to ethane, so ethane is the smallest alkane obtainable)."
        ]
      }
    }
  },

  // 📁 AMINES
  {
    title: "Hinsberg Test",
    category: "Amines",
    steps: [
      { reagent: "Hinsberg reagent", observation: "Solubility difference", color: "#f0f8ff" }
    ],
    equation: "Amine classification",
    theory: "1°,2°,3° distinction",
    content: {
      observations: {
        observation: "Primary, secondary, and tertiary amines show distinct reaction and solubility behaviors with benzenesulfonyl chloride (Hinsberg reagent).",
        inference: "Amine class identified (1°, 2°, or 3°).",
        explanation: "Primary amines form sulfonamides that are soluble in alkali. Secondary amines form sulfonamides that are insoluble in alkali. Tertiary amines do not react and remain insoluble in alkali but dissolve in acid."
      },
      confirmatoryTest: {
        procedure: [
          "To the amine, add benzenesulfonyl chloride and excess NaOH solution.",
          "Shake and observe. Acidify the mixture with HCl."
        ],
        observation: "1° Amine: Clear solution in NaOH, precipitates upon adding HCl. 2° Amine: Insoluble solid in NaOH, remains insoluble in HCl. 3° Amine: Does not react, insoluble in NaOH, dissolves upon adding HCl.",
        conclusion: "Amine class confirmed."
      },
      equation: {
        molecular: "RNH₂ + C₆H₅SO₂Cl + NaOH → C₆H₅SO₂N(Na)R (soluble) + NaCl + H₂O\nR₂NH + C₆H₅SO₂Cl + NaOH → C₆H₅SO₂NR₂↓ (insoluble) + NaCl + H₂O\nR₃N + C₆H₅SO₂Cl → No reaction",
        ionic: "RNH-SO₂Ph + OH⁻ → [RN-SO₂Ph]⁻ (soluble) + H₂O"
      },
      theory: {
        principle: "Nucleophilic acyl substitution on sulfonyl sulfur, followed by acid-base chemistry. Primary sulfonamide has an acidic N-H proton (due to strong electron-withdrawing sulfonyl group) which reacts with NaOH to form a soluble salt. Secondary sulfonamide has no acidic N-H proton.",
        mechanism: "Nucleophilic attack of amine nitrogen on sulfonyl chloride with loss of chloride ion.",
        observationReason: "Solubility differences in basic (NaOH) and acidic (HCl) media.",
        examPoints: [
          "Hinsberg reagent is benzenesulfonyl chloride (C₆H₅SO₂Cl). p-Toluenesulfonyl chloride is also used.",
          "Tertiary amines do not react because they lack an N-H hydrogen to lose in the final stabilization step."
        ],
        commonMistakes: [
          "Confusing the solubility of 3° amines. They do not react, so they are insoluble in the basic NaOH solution, but they dissolve in HCl because they form soluble ammonium salts."
        ],
        mnemonic: "1° dissolves in base, 2° stays ppt, 3° doesn't react."
      }
    }
  },
  {
    title: "Carbylamine Test",
    category: "Amines",
    steps: [
      { reagent: "CHCl3 + KOH", observation: "Foul smell", color: "#ffe6e6" }
    ],
    equation: "RNH2 → RNC",
    theory: "Primary amine",
    content: {
      observations: {
        observation: "Evolution of an extremely offensive, foul smell of alkyl isocyanide (carbylamine).",
        inference: "Primary amine (aliphatic or aromatic) is present.",
        explanation: "Primary amines react with chloroform and alcoholic KOH to yield highly toxic and foul-smelling isocyanides."
      },
      confirmatoryTest: {
        procedure: [
          "Take aniline/ethylamine in a test tube.",
          "Add chloroform (CHCl₃) and alcoholic KOH.",
          "Heat gently and carefully note the odor."
        ],
        observation: "An intolerable, nauseating foul odor of phenyl/ethyl isocyanide is produced.",
        conclusion: "Primary amine confirmed."
      },
      equation: {
        molecular: "R-NH₂ + CHCl₃ + 3KOH (alc) → R-NC (Isocyanide) + 3KCl + 3H₂O",
        ionic: "R-NH₂ + :CCl₂ (Dichlorocarbene) → R-N⁺≡C⁻ + 2H⁺ + 2Cl⁻"
      },
      theory: {
        principle: "Electrophilic addition of dichlorocarbene intermediate. Chloroform reacts with base to undergo alpha-elimination, forming highly reactive, neutral divalent carbon species :CCl₂ (dichlorocarbene).",
        mechanism: "Step 1: CHCl₃ + OH⁻ ⇌ :CCl₃⁻ → :CCl₂. Step 2: Nucleophilic attack of R-NH₂ on :CCl₂. Step 3: Successive base-promoted eliminations of HCl to form C≡N triple bond.",
        observationReason: "Offensive smell of carbylamine (isocyanide).",
        examPoints: [
          "Specific for primary amines (both aliphatic and aromatic).",
          "Secondary and tertiary amines do not show this test because they cannot undergo loss of two protons to form the triple-bonded isocyanide.",
          "Isocyanides are toxic; the test tube must be destroyed with dilute HCl after the test."
        ],
        commonMistakes: [
          "Performing this test on secondary or tertiary amines (they are negative).",
          "Inhaling the vapors deeply, as isocyanides are highly toxic."
        ],
        mnemonic: "Primary amine + Chloroform = Terrible smell."
      }
    }
  },
  {
    title: "Hoffmann Bromamide",
    category: "Amines",
    steps: [
      { reagent: "Br2 + NaOH", observation: "Amine formed", color: "#e6ffe6" }
    ],
    equation: "RCONH2 → RNH2",
    theory: "Chain shortening",
    content: {
      observations: {
        observation: "Conversion of an amide to a primary amine with one less carbon atom using bromine and sodium hydroxide.",
        inference: "Hoffmann bromamide degradation has occurred.",
        explanation: "Amides react with bromine in alkaline medium to yield primary amines through a molecular rearrangement involving a nitrene-like intermediate."
      },
      confirmatoryTest: {
        procedure: [
          "Heat benzamide with bromine and NaOH solution.",
          "Extract the product and perform the carbylamine test on it."
        ],
        observation: "Aniline is formed, which gives a positive carbylamine test.",
        conclusion: "Amide degraded to primary amine confirmed."
      },
      equation: {
        molecular: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O",
        ionic: "RCONH₂ + Br₂ + 4OH⁻ → RNH₂ + CO₃²⁻ + 2Br⁻ + 2H₂O"
      },
      theory: {
        principle: "Intramolecular molecular rearrangement. The alkyl/aryl group migrates from carbonyl carbon to nitrogen, forming an isocyanate intermediate which is subsequently hydrolyzed to amine and carbonate.",
        mechanism: "Step 1: N-bromination of amide. Step 2: Base abstracts proton from N-bromoamide to form conjugate base. Step 3: Expulsion of Br⁻ and migration of R group (concerted) to form alkyl isocyanate (R-N=C=O). Step 4: Hydrolysis of isocyanate to yield amine and carbonate.",
        observationReason: "Conversion of solid amide to liquid amine and carbonate.",
        examPoints: [
          "The amine formed has one carbon less than the starting amide.",
          "Migration of the R group occurs with retention of configuration.",
          "Intermediate isocyanate can be isolated under anhydrous conditions."
        ],
        commonMistakes: [
          "Assuming that secondary amides (RCONHR') can undergo this reaction. It requires primary amides with NH₂ group."
        ],
        mnemonic: "Hoffmann Bromamide = Carbonyl is chopped off."
      }
    }
  },

  // 🔵 AROMATIC
  {
    title: "Friedel-Crafts Alkylation",
    category: "Aromatic",
    steps: [
      { reagent: "AlCl3", observation: "Alkyl benzene", color: "#e6f2ff" }
    ],
    equation: "C6H6 → substituted",
    theory: "Electrophilic substitution",
    content: {
      observations: {
        observation: "Exothermic reaction with evolution of HCl gas and formation of alkylbenzene from benzene and alkyl halide.",
        inference: "Friedel-Crafts electrophilic aromatic substitution.",
        explanation: "Benzene reacts with alkyl halides in the presence of anhydrous aluminium chloride (Lewis acid catalyst) to yield alkylbenzenes."
      },
      confirmatoryTest: {
        procedure: [
          "Mix benzene and t-butyl chloride.",
          "Add anhydrous AlCl₃ catalyst under dry conditions."
        ],
        observation: "Vigorous evolution of HCl gas occurs, and t-butylbenzene is formed.",
        conclusion: "Alkylation confirmed."
      },
      equation: {
        molecular: "C₆H₆ + (CH₃)₃C-Cl + AlCl₃ → C₆H₅-C(CH₃)₃ + HCl + AlCl₃",
        ionic: "C₆H₆ + R⁺ (carbocation) → C₆H₅(H)R⁺ (sigma complex) → C₆H₅R + H⁺"
      },
      theory: {
        principle: "Electrophilic aromatic substitution (EArS). Lewis acid AlCl₃ generates a strong carbocation electrophile from the alkyl halide. The benzene ring acts as a nucleophile.",
        mechanism: "Step 1: R-Cl + AlCl₃ ⇌ R⁺ + AlCl₄⁻. Step 2: Nucleophilic attack of benzene on R⁺ to form resonance-stabilized arenium ion (sigma complex). Step 3: AlCl₄⁻ abstracts proton, restoring aromaticity.",
        observationReason: "Evolution of acidic HCl gas which gives dense white fumes with ammonia.",
        examPoints: [
          "Primary alkyl halides undergo rearrangement (e.g., propyl chloride yields isopropylbenzene/cumene due to hydride shift).",
          "Aromatic rings with strong deactivating groups (like nitrobenzene) do not undergo Friedel-Crafts reactions.",
          "Aniline does not undergo this reaction because the amino group forms a salt with Lewis acid AlCl₃, deactivating the ring."
        ],
        commonMistakes: [
          "Attempting Friedel-Crafts alkylation on aniline or nitrobenzene (fails for both).",
          "Forgetting carbocation rearrangements."
        ],
        mnemonic: "Friedel-Crafts = Benzene meets carbocation."
      }
    }
  },
  {
    title: "Nitration",
    category: "Aromatic",
    steps: [
      { reagent: "HNO3 + H2SO4", observation: "Nitrobenzene", color: "#fff2cc" }
    ],
    equation: "C6H6 → C6H5NO2",
    theory: "Electrophilic substitution",
    content: {
      observations: {
        observation: "Formation of a pale yellow oily liquid with a bitter almond smell (nitrobenzene).",
        inference: "Electrophilic nitration of benzene.",
        explanation: "Benzene reacts with a nitrating mixture (concentrated HNO₃ + concentrated H₂SO₄) to form nitrobenzene."
      },
      confirmatoryTest: {
        procedure: [
          "Add nitrating mixture slowly to benzene.",
          "Warm in a water bath at 50-60°C.",
          "Pour the mixture into cold water."
        ],
        observation: "A yellow oil settles at the bottom of the water beaker, emitting a bitter almond odor.",
        conclusion: "Nitrobenzene formation confirmed."
      },
      equation: {
        molecular: "C₆H₆ + HNO₃ + H₂SO₄ → C₆H₅NO₂ + H₂SO₄ + H₂O",
        ionic: "HNO₃ + 2H₂SO₄ ⇌ NO₂⁺ (Nitronium) + H₃O⁺ + 2HSO₄⁻\nC₆H₆ + NO₂⁺ → C₆H₅(H)NO₂⁺ → C₆H₅NO₂ + H⁺"
      },
      theory: {
        principle: "Electrophilic aromatic substitution. Sulfuric acid, being a stronger acid, protonates nitric acid to generate the highly electrophilic nitronium ion (NO₂⁺).",
        mechanism: "Step 1: Nitronium ion generation. Step 2: Electrophilic attack of nitronium ion on benzene ring to form sigma complex. Step 3: Deprotonation by HSO₄⁻ to restore aromaticity.",
        observationReason: "Bitter almond smell and pale yellow color of nitrobenzene.",
        examPoints: [
          "The temperature must be kept below 60°C. Higher temperatures lead to further nitration yielding m-dinitrobenzene.",
          "HNO₃ acts as a base in the presence of H₂SO₄ during nitronium ion generation.",
          "Nitro group is meta-directing and strongly deactivating."
        ],
        commonMistakes: [
          "Allowing the temperature to exceed 60°C, which yields m-dinitrobenzene instead of nitrobenzene."
        ],
        mnemonic: "Nitrating mixture makes Nitronium (NO₂⁺)."
      }
    }
  },
  {
    title: "Sulfonation",
    category: "Aromatic",
    steps: [
      { reagent: "H2SO4", observation: "Sulfonic acid", color: "#ffe6cc" }
    ],
    equation: "C6H6 → C6H5SO3H",
    theory: "Reversible",
    content: {
      observations: {
        observation: "Benzene dissolves slowly in fuming sulfuric acid (oleum) to yield a water-soluble sulfonic acid.",
        inference: "Electrophilic sulfonation of benzene.",
        explanation: "Benzene reacts with fuming sulfuric acid to form benzenesulfonic acid. Unlike alkylation or nitration, sulfonation is highly reversible."
      },
      confirmatoryTest: {
        procedure: [
          "Heat benzene with fuming H₂SO₄ (oleum).",
          "Pour the product into saturated NaCl solution to salt out the sodium salt."
        ],
        observation: "White crystalline sodium benzenesulfonate precipitates.",
        conclusion: "Benzenesulfonic acid formation confirmed."
      },
      equation: {
        molecular: "C₆H₆ + H₂SO₄ (SO₃) → C₆H₅SO₃H + H₂O",
        ionic: "2H₂SO₄ ⇌ SO₃ (Electrophile) + H₃O⁺ + HSO₄⁻\nC₆H₆ + SO₃ ⇌ C₆H₅(H)SO₃⁻ → C₆H₅SO₃⁻ + H⁺ ⇌ C₆H₅SO₃H"
      },
      theory: {
        principle: "Reversible electrophilic aromatic substitution. The active electrophile is neutral sulfur trioxide (SO₃) which has a highly electrophilic sulfur atom due to three polar S=O bonds.",
        mechanism: "Electrophilic attack of SO₃ on benzene to form anionic sigma complex, followed by proton transfer to yield benzenesulfonic acid.",
        observationReason: "Crystalline sodium salt precipitates due to salting-out effect in NaCl solution.",
        examPoints: [
          "Sulfonation is reversible. Heating benzenesulfonic acid with superheated steam at 150°C regenerates benzene (desulfonation).",
          "Used as a blocking group in organic synthesis to direct other substitutions before being removed."
        ],
        commonMistakes: [
          "Forgetting that sulfonation is highly reversible and can be reversed by dilute acid and heat (steam)."
        ],
        mnemonic: "SO₃ is the neutral electrophile in Sulfonation."
      }
    }
  }
];