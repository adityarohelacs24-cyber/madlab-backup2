import { ReactionContent } from '../types/chemistry';

export interface ReactionStep {
  reagent: string;
  observation: string;
  color?: string;
  precipitate?: boolean;
  precipitateColor?: string;
  gasEvolution?: boolean;
}

export interface ConfirmatoryTest {
  reagent: string;
  observation: string;
  color?: string;
}

export interface CationReaction {
  title: string;
  cation: string;
  group: string;
  flameTest: string;
  steps: ReactionStep[];
  confirmatoryTests: ConfirmatoryTest[];
  equation: string;
  theory: string;
  content: ReactionContent;
}

export interface AnionReaction {
  title: string;
  anion: string;
  steps: ReactionStep[];
  confirmatoryTests: ConfirmatoryTest[];
  equation: string;
  theory: string;
  content: ReactionContent;
}

export const cationTests: { [key: string]: CationReaction[] } = {
  group1: [
    {
      title: "Lead (Pb²⁺)",
      cation: "Pb²⁺",
      group: "Group I",
      flameTest: "Bluish white",
      steps: [
        { reagent: "Dil. HCl", observation: "White ppt (PbCl₂)", color: "#f2f2f2", precipitate: true, precipitateColor: "#ffffff" },
        { reagent: "Hot Water", observation: "Dissolves", color: "#e6f7ff", precipitate: false },
        { reagent: "K₂CrO₄", observation: "Yellow ppt", color: "#fff9e6", precipitate: true, precipitateColor: "#ffd700" }
      ],
      confirmatoryTests: [
        { reagent: "KI", observation: "Yellow ppt (PbI₂)", color: "#fff2cc" },
        { reagent: "H₂SO₄", observation: "White ppt (PbSO₄)", color: "#f2f2f2" }
      ],
      equation: "Pb²⁺ + 2Cl⁻ → PbCl₂↓\nPb²⁺ + CrO₄²⁻ → PbCrO₄↓",
      theory: "Lead forms insoluble chloride, sulfate and chromate salts.",
      content: {
        observations: {
          observation: "White crystalline precipitate of PbCl₂ appears which dissolves in hot water.",
          inference: "Group I cation Pb²⁺ may be present.",
          explanation: "Pb²⁺ ions react with dilute HCl to form lead(II) chloride precipitate, which has a relatively high solubility product (Ksp = 1.6 x 10⁻⁵) and thus dissolves in hot water."
        },
        confirmatoryTest: {
          procedure: [
            "Take the chloride precipitate and add distilled water.",
            "Heat to dissolve the precipitate.",
            "Divide into two parts: to the first, add potassium chromate (K₂CrO₄) solution.",
            "To the second, add potassium iodide (KI) solution."
          ],
          observation: "Yellow precipitate of PbCrO₄ with potassium chromate, and yellow precipitate of PbI₂ with potassium iodide (which dissolves on heating and recrystallizes as golden spangles on cooling).",
          conclusion: "Pb²⁺ is confirmed."
        },
        equation: {
          molecular: "PbCl₂ + K₂CrO₄ → PbCrO₄↓ (Yellow) + 2KCl\nPbCl₂ + 2KI → PbI₂↓ (Golden Yellow) + 2KCl",
          ionic: "Pb²⁺ + CrO₄²⁻ → PbCrO₄↓\nPb²⁺ + 2I⁻ → PbI₂↓"
        },
        theory: {
          principle: "Qualitative separation based on solubility product. PbCl₂ has a low solubility product in cold water but dissolves readily in hot water due to positive enthalpy of solution.",
          mechanism: "Metathesis / Double displacement precipitation. The Ksp of PbCrO₄ is 1.8 x 10⁻¹⁴, making it highly insoluble and driving the precipitation.",
          observationReason: "The yellow color of lead chromate and lead iodide is due to charge-transfer transitions from ligand to metal.",
          examPoints: [
            "PbCl₂ dissolves in hot water but reprecipitates as needles on cooling.",
            "Lead chromate dissolves in NaOH forming sodium tetrahydroxoplumbate(II) due to amphoteric nature.",
            "PbI₂ dissolves in hot water to give a colorless solution, which yields 'golden spangles' on cooling."
          ],
          commonMistakes: [
            "Confusing BaCrO₄ (yellow) with PbCrO₄. BaCrO₄ is insoluble in NaOH, whereas PbCrO₄ is soluble.",
            "Forgetting to perform the test in hot water since PbCl₂ is insoluble in cold water."
          ],
          mnemonic: "Pb Chromate is Yellow like a Banana (Ba)"
        }
      }
    },
    {
      title: "Silver (Ag⁺)",
      cation: "Ag⁺",
      group: "Group I",
      flameTest: "No characteristic color",
      steps: [
        { reagent: "Dil. HCl", observation: "Curdy white ppt (AgCl)", color: "#f2f2f2", precipitate: true, precipitateColor: "#ffffff" },
        { reagent: "NH₄OH", observation: "Dissolves forming complex", color: "#e6f7ff", precipitate: false },
        { reagent: "HNO₃", observation: "White ppt reappears", color: "#f2f2f2", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "Sunlight", observation: "Turns grey (Ag reduction)", color: "#cccccc" }
      ],
      equation: "AgCl + 2NH₃ → [Ag(NH₃)₂]⁺",
      theory: "Silver chloride dissolves in ammonia forming complex ion.",
      content: {
        observations: {
          observation: "Curdy white precipitate appears upon adding dil. HCl, which is insoluble in hot water but dissolves in NH₄OH.",
          inference: "Ag⁺ ion is indicated.",
          explanation: "Silver ions react with chloride ions to form highly insoluble silver chloride (AgCl, Ksp = 1.8 x 10⁻¹⁰)."
        },
        confirmatoryTest: {
          procedure: [
            "Filter the white precipitate and wash it.",
            "Add dilute ammonium hydroxide (NH₄OH) to the precipitate.",
            "Divide the resulting solution into two portions: to one, add dilute HNO₃.",
            "Expose the other to sunlight."
          ],
          observation: "The precipitate dissolves completely in ammonia. Upon adding HNO₃, the white precipitate reappears. Exposing to sunlight turns the precipitate grey-purple.",
          conclusion: "Ag⁺ is confirmed."
        },
        equation: {
          molecular: "AgCl + 2NH₄OH → [Ag(NH₃)₂]Cl + 2H₂O\n[Ag(NH₃)₂]Cl + 2HNO₃ → AgCl↓ + 2NH₄NO₃",
          ionic: "Ag⁺ + Cl⁻ → AgCl↓\nAgCl + 2NH₃ → [Ag(NH₃)₂]⁺ + Cl⁻\n[Ag(NH₃)₂]⁺ + Cl⁻ + 2H⁺ → AgCl↓ + 2NH₄⁺"
        },
        theory: {
          principle: "Reversible coordination complex formation. Ammonia acts as a strong ligand for Ag⁺, forming a stable diammine complex. Adding acid protonates ammonia to NH₄⁺, destroying the ligand and releasing Ag⁺ to reprecipitate AgCl.",
          mechanism: "Ligand exchange reaction followed by neutralization.",
          observationReason: "Curdy white color of AgCl. Grey-purple under sunlight is due to photochemical reduction to metallic silver nanoparticles.",
          examPoints: [
            "AgCl is insoluble in nitric acid but soluble in ammonia, potassium cyanide, and sodium thiosulfate.",
            "Formation of [Ag(NH₃)₂]⁺ is a classic coordination chemistry example.",
            "Photolysis of AgCl is the basis of black-and-white photography."
          ],
          commonMistakes: [
            "Confusing AgCl with PbCl₂. AgCl dissolves in NH₄OH but not in hot water; PbCl₂ dissolves in hot water but not in NH₄OH."
          ],
          mnemonic: "Silver is Curdy white like Milk."
        }
      }
    },
    {
      title: "Mercurous (Hg₂²⁺)",
      cation: "Hg₂²⁺",
      group: "Group I",
      flameTest: "No color",
      steps: [
        { reagent: "Dil. HCl", observation: "White ppt (Hg₂Cl₂)", color: "#f2f2f2", precipitate: true },
        { reagent: "NH₄OH", observation: "Black ppt", color: "#cccccc", precipitate: true, precipitateColor: "#000000" }
      ],
      confirmatoryTests: [
        { reagent: "Heating", observation: "Blackens due to decomposition", color: "#000000" }
      ],
      equation: "Hg₂Cl₂ + NH₃ → Hg + HgNH₂Cl",
      theory: "Forms black mixture of mercury and amido compound.",
      content: {
        observations: {
          observation: "White precipitate formed with dil. HCl, which turns jet black upon adding ammonium hydroxide.",
          inference: "Hg₂²⁺ ion is indicated.",
          explanation: "Mercurous chloride (Hg₂Cl₂) precipitates, which then disproportionates in the presence of ammonia to form metallic mercury (black) and amino-mercuric chloride (white)."
        },
        confirmatoryTest: {
          procedure: [
            "Treat the white precipitate on the filter paper with dilute ammonium hydroxide (NH₄OH) solution.",
            "Observe the color change."
          ],
          observation: "The precipitate immediately turns black.",
          conclusion: "Hg₂²⁺ is confirmed."
        },
        equation: {
          molecular: "Hg₂Cl₂ + 2NH₄OH → Hg↓ (Black) + Hg(NH₂)Cl↓ (White) + NH₄Cl + 2H₂O",
          ionic: "Hg₂Cl₂ + 2NH₃ → Hg↓ + Hg(NH₂)Cl↓ + NH₄⁺ + Cl⁻"
        },
        theory: {
          principle: "Disproportionation reaction. Mercurous ion (oxidation state +1) is unstable in basic ammonia medium and auto-oxidizes/reduces to Hg(0) and Hg(II).",
          mechanism: "Redox disproportionation: Hg₂²⁺ → Hg(0) + Hg(II).",
          observationReason: "The black color is due to highly dispersed elemental mercury.",
          examPoints: [
            "Hg(NH₂)Cl is amido-mercuric chloride, also known as 'infusible white precipitate'.",
            "This reaction separates Hg₂²⁺ from Ag⁺ and Pb²⁺ in qualitative group separation."
          ],
          commonMistakes: [
            "Confusing Hg₂²⁺ (mercurous, dimer) with Hg²⁺ (mercuric, monomer). Only mercurous chloride is insoluble in water and precipitates in Group I."
          ],
          mnemonic: "Mercury turns Black in Ammonia."
        }
      }
    }
  ],
  group2: [
    {
      title: "Copper (Cu²⁺)",
      cation: "Cu²⁺",
      group: "Group II",
      flameTest: "Blue-green",
      steps: [
        { reagent: "H₂S", observation: "Black ppt (CuS)", color: "#e6f2ff", precipitate: true, precipitateColor: "#000000" },
        { reagent: "NH₄OH", observation: "Deep blue solution", color: "#003366", precipitate: false },
        { reagent: "NaOH", observation: "Blue ppt Cu(OH)₂", color: "#cce6ff", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "K₄[Fe(CN)₆]", observation: "Brown ppt", color: "#8b4513" }
      ],
      equation: "Cu²⁺ + H₂S → CuS↓",
      theory: "Forms sulfide and ammine complex.",
      content: {
        observations: {
          observation: "Black precipitate of CuS is formed when H₂S is passed in acidic medium.",
          inference: "Group II cation Cu²⁺ may be present.",
          explanation: "Copper(II) sulfide has a very low solubility product (Ksp = 6.3 x 10⁻³⁶), allowing it to precipitate even in the low sulfide concentration of an acidic H₂S solution."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the black precipitate in warm dilute HNO₃.",
            "Add excess NH₄OH to get a deep blue solution.",
            "Acidify with acetic acid and add potassium ferrocyanide [K₄Fe(CN)₆]."
          ],
          observation: "Deep blue solution forms with ammonia, and a chocolate-brown precipitate forms with potassium ferrocyanide.",
          conclusion: "Cu²⁺ is confirmed."
        },
        equation: {
          molecular: "CuS + 2HNO₃ → Cu(NO₃)₂ + H₂S↑\nCu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺\n2Cu²⁺ + K₄[Fe(CN)₆] → Cu₂[Fe(CN)₆]↓ + 4K⁺",
          ionic: "Cu²⁺ + H₂S → CuS↓ + 2H⁺\nCu²⁺ + 4NH₃ → [Cu(NH₃)₄]²⁺ (Deep Blue)\n2Cu²⁺ + [Fe(CN)₆]⁴⁻ → Cu₂[Fe(CN)₆]↓ (Chocolate Brown)"
        },
        theory: {
          principle: "Formation of coordination complexes and highly insoluble salts. Copper ferrocyanide is a highly characteristic chocolate-brown precipitate.",
          mechanism: "Ligand substitution and coordination precipitation.",
          observationReason: "The deep blue color of [Cu(NH₃)₄]²⁺ is due to d-d transitions stabilized by the strong field amine ligands.",
          examPoints: [
            "CuS is insoluble in yellow ammonium sulfide (separates IIA from IIB).",
            "The chocolate-brown precipitate is copper hexacyanoferrate(II).",
            "Flame test shows characteristic green/blue-green color."
          ],
          commonMistakes: [
            "Forgetting that the ferrocyanide test requires an acidic medium (adjusted with acetic acid), as strong bases decompose the ferrocyanide complex."
          ],
          mnemonic: "Copper gives Chocolate Brown."
        }
      }
    },
    {
      title: "Cadmium (Cd²⁺)",
      cation: "Cd²⁺",
      group: "Group II",
      flameTest: "No color",
      steps: [
        { reagent: "H₂S", observation: "Yellow ppt (CdS)", color: "#fff9e6", precipitate: true, precipitateColor: "#ffd700" }
      ],
      confirmatoryTests: [
        { reagent: "Na₂S", observation: "Yellow ppt", color: "#fff9e6" }
      ],
      equation: "Cd²⁺ + H₂S → CdS↓",
      theory: "Cadmium forms yellow sulfide.",
      content: {
        observations: {
          observation: "Yellow precipitate of CdS appears on passing H₂S in acidic medium.",
          inference: "Cd²⁺ ion may be present.",
          explanation: "CdS is precipitated in acidic medium, but because its Ksp (8.0 x 10⁻²⁷) is higher than CuS, high acid concentration (dilute HCl > 0.3M) may prevent its precipitation due to common ion effect suppressing sulfide concentration."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the yellow sulfide precipitate in warm dilute HCl.",
            "Neutralize, then add H₂S or sodium sulfide solution."
          ],
          observation: "A yellow precipitate of CdS reappears.",
          conclusion: "Cd²⁺ is confirmed."
        },
        equation: {
          molecular: "CdCl₂ + H₂S → CdS↓ + 2HCl",
          ionic: "Cd²⁺ + H₂S → CdS↓ (Yellow) + 2H⁺"
        },
        theory: {
          principle: "Sulfide precipitation. Adjusting pH is crucial because CdS has an intermediate solubility product.",
          mechanism: "Metathesis precipitation.",
          observationReason: "Yellow color due to band gap absorption in CdS (a direct bandgap semiconductor).",
          examPoints: [
            "In presence of both Cu²⁺ and Cd²⁺, addition of KCN forms soluble complex [Cu(CN)₄]³⁻ (very stable) and [Cd(CN)₄]²⁻ (less stable). Passing H₂S precipitates only CdS (yellow), allowing separation.",
            "CdS is soluble in hot dilute H₂SO₄, unlike CuS."
          ],
          commonMistakes: [
            "Using concentrated HCl, which completely suppresses sulfide concentration and prevents CdS from precipitating."
          ],
          mnemonic: "Cadmium is Canary yellow."
        }
      }
    },
    {
      title: "Bismuth (Bi³⁺)",
      cation: "Bi³⁺",
      group: "Group II",
      flameTest: "No color",
      steps: [
        { reagent: "H₂S", observation: "Brown ppt", color: "#fff5e6", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "NaOH", observation: "White ppt", color: "#f2f2f2" }
      ],
      equation: "Bi³⁺ + H₂S → Bi₂S₃↓",
      theory: "Forms brown sulfide.",
      content: {
        observations: {
          observation: "Dark brown/black precipitate of Bi₂S₃ forms with H₂S in acidic medium.",
          inference: "Bi³⁺ ion may be present.",
          explanation: "Bismuth ions react with H₂S to form highly insoluble bismuth sulfide (Bi₂S₃)."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the brown precipitate in hot dilute HNO₃.",
            "Concentrate the solution, then pour it into a large volume of water."
          ],
          observation: "White turbidity / precipitate of bismuth oxychloride (BiOCl) forms.",
          conclusion: "Bi³⁺ is confirmed."
        },
        equation: {
          molecular: "Bi₂S₃ + 6HNO₃ → 2Bi(NO₃)₃ + 3H₂S↑\nBi(NO₃)₃ + H₂O + NaCl → BiOCl↓ + NaNO₃ + 2HNO₃",
          ionic: "2Bi³⁺ + 3H₂S → Bi₂S₃↓ + 6H⁺\nBi³⁺ + H₂O + Cl⁻ → BiOCl↓ (White) + 2H⁺"
        },
        theory: {
          principle: "Hydrolysis of bismuth salts. Bismuth(III) ions undergo rapid hydrolysis in water to yield bismuthyl ions (BiO⁺) which form white insoluble oxy-salts with halides.",
          mechanism: "Nucleophilic attack of water on bismuth metal center followed by precipitation.",
          observationReason: "White crystalline bismuthyl chloride precipitate.",
          examPoints: [
            "BiOCl is known as pearl white and is used in cosmetics.",
            "Bismuth hydroxide is white and insoluble in excess NaOH (distinguishing it from Al³⁺ and Pb²⁺)."
          ],
          commonMistakes: [
            "Forgetting to dilute the bismuth solution heavily, as hydrolysis requires high water concentration to shift the equilibrium."
          ]
        }
      }
    },
    {
      title: "Arsenic (As³⁺)",
      cation: "As³⁺",
      group: "Group II",
      flameTest: "Garlic odor on heating",
      steps: [
        { reagent: "H₂S", observation: "Yellow ppt", color: "#fff9e6", precipitate: true },
        { reagent: "(NH₄)₂S", observation: "Dissolves", color: "#e6f7ff", precipitate: false },
        { reagent: "HCl", observation: "Reappears", color: "#fff9e6", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "AgNO₃", observation: "Yellow ppt", color: "#fff9e6" }
      ],
      equation: "As₂S₃ formation",
      theory: "Forms soluble thio salts.",
      content: {
        observations: {
          observation: "Yellow precipitate of As₂S₃ forms with H₂S in acidic medium, which dissolves in yellow ammonium sulfide.",
          inference: "As³⁺ ion is indicated (Group IIB).",
          explanation: "Arsenic forms stable sulfide As₂S₃, which behaves as an acidic sulfide and dissolves in alkaline yellow ammonium sulfide to form soluble thioarsenate complexes."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the yellow precipitate in concentrated HNO₃ and heat.",
            "Add ammonium molybdate solution and heat."
          ],
          observation: "A canary-yellow precipitate of ammonium arsenomolybdate forms.",
          conclusion: "As³⁺ is confirmed."
        },
        equation: {
          molecular: "As₂S₃ + 10HNO₃ → 2H₃AsO₄ + 3S↓ + 10NO₂ + 2H₂O\nH₃AsO₄ + 12(NH₄)₂MoO₄ + 21HNO₃ → (NH₄)₃[As(Mo₃O₁₀)₄]↓ + 21NH₄NO₃ + 12H₂O",
          ionic: "As₂S₃ + ammonium sulfide → [AsS₄]³⁻ (soluble complex)\nH₃AsO₄ + 12MoO₄²⁻ + 24NH₄⁺ + 21H⁺ → (NH₄)₃[As(Mo₃O₁₀)₄]↓ + 12H₂O"
        },
        theory: {
          principle: "Heteropoly acid precipitation. Arsenate ion behaves analogously to phosphate and forms a highly insoluble yellow complex with molybdate.",
          mechanism: "Coordination polymerization to form heteropoly molybdate complexes.",
          observationReason: "Canary-yellow color of ammonium arsenomolybdate.",
          examPoints: [
            "This test is identical in appearance to the phosphate test, but arsenic is in Group II and must be separated first.",
            "As₂S₃ is soluble in ammonium carbonate solution, which distinguishes it from Sb₂S₃."
          ],
          commonMistakes: [
            "Not heating the molybdate solution, which is necessary for the complex to form and precipitate."
          ]
        }
      }
    }
  ],
  group3: [
    {
      title: "Iron (Fe³⁺)",
      cation: "Fe³⁺",
      group: "Group III",
      flameTest: "Golden sparks (on heating)",
      steps: [
        { reagent: "NH₄OH", observation: "Reddish brown ppt (Fe(OH)₃)", color: "#ffe6e6", precipitate: true, precipitateColor: "#8b0000" },
        { reagent: "HCl", observation: "Dissolves forming yellow solution", color: "#ffffcc", precipitate: false }
      ],
      confirmatoryTests: [
        { reagent: "KCNS", observation: "Blood red color", color: "#8b0000" },
        { reagent: "K₄[Fe(CN)₆]", observation: "Prussian blue ppt", color: "#000080" }
      ],
      equation: "Fe³⁺ + 3OH⁻ → Fe(OH)₃↓",
      theory: "Ferric hydroxide forms reddish brown ppt and gives characteristic complexes.",
      content: {
        observations: {
          observation: "Reddish-brown gelatinous precipitate of Fe(OH)₃ forms with NH₄OH in the presence of NH₄Cl.",
          inference: "Group III cation Fe³⁺ may be present.",
          explanation: "In Group III, NH₄Cl suppresses the dissociation of NH₄OH (common ion effect) so that the OH⁻ concentration is only high enough to precipitate Fe³⁺, Al³⁺, and Cr³⁺ (which have very low Ksp values), but not Group IV, V, or VI cations."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the reddish-brown precipitate in dilute HCl.",
            "Divide into two parts: to the first, add potassium thiocyanate (KSCN).",
            "To the second, add potassium ferrocyanide [K₄Fe(CN)₆] solution."
          ],
          observation: "Blood-red color with KSCN, and Prussian blue precipitate with potassium ferrocyanide.",
          conclusion: "Fe³⁺ is confirmed."
        },
        equation: {
          molecular: "Fe(OH)₃ + 3HCl → FeCl₃ + 3H₂O\nFeCl₃ + 3KSCN → [Fe(SCN)]Cl₂ + 3KCl\n4FeCl₃ + 3K₄[Fe(CN)₆] → Fe₄[Fe(CN)₆]₃↓ + 12KCl",
          ionic: "Fe³⁺ + 3OH⁻ → Fe(OH)₃↓\nFe³⁺ + SCN⁻ → [Fe(SCN)]²⁺ (Blood Red)\n4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃↓ (Prussian Blue)"
        },
        theory: {
          principle: "Selective hydroxide precipitation under controlled pH, followed by coordination complexation yielding intensely colored products.",
          mechanism: "Ligand exchange and outer-sphere charge transfer.",
          observationReason: "The Prussian blue color arises from intervalence charge transfer (IVCT) between Fe(II) and Fe(III) metal centers in the crystal lattice.",
          examPoints: [
            "NH₄Cl is added to suppress OH⁻ concentration (common ion effect).",
            "Prussian blue is iron(III) hexacyanoferrate(II). It dissolves in excess NaOH to form Fe(OH)₃.",
            "Fe²⁺ must be oxidized to Fe³⁺ by boiling with concentrated HNO₃ before Group III analysis."
          ],
          commonMistakes: [
            "Forgetting to boil with HNO₃. If Fe²⁺ remains, it will not precipitate completely in Group III because Fe(OH)₂ has a much higher Ksp than Fe(OH)₃."
          ],
          mnemonic: "Fe + Ferro = Prussian Blue."
        }
      }
    },
    {
      title: "Aluminium (Al³⁺)",
      cation: "Al³⁺",
      group: "Group III",
      flameTest: "No color",
      steps: [
        { reagent: "NH₄OH", observation: "White gelatinous ppt", color: "#f2f2f2", precipitate: true },
        { reagent: "NaOH (excess)", observation: "Dissolves forming sodium aluminate", color: "#e6f7ff", precipitate: false }
      ],
      confirmatoryTests: [
        { reagent: "Aluminon", observation: "Red lake formation", color: "#ff4d4d" }
      ],
      equation: "Al(OH)₃ + NaOH → NaAlO₂",
      theory: "Aluminium hydroxide is amphoteric.",
      content: {
        observations: {
          observation: "Gelatinous white precipitate of Al(OH)₃ forms with NH₄OH in the presence of NH₄Cl.",
          inference: "Al³⁺ ion is indicated.",
          explanation: "Aluminium precipitates as a white amphoteric hydroxide. It dissolves in excess NaOH due to the formation of soluble aluminate ions."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the white precipitate in dilute HCl.",
            "Add blue litmus solution, then add NH₄OH dropwise until alkaline."
          ],
          observation: "A blue floating precipitate (blue lake) forms in a colorless solution.",
          conclusion: "Al³⁺ is confirmed."
        },
        equation: {
          molecular: "AlCl₃ + 3NH₄OH → Al(OH)₃↓ + 3NH₄Cl\nAl(OH)₃ + NaOH → NaAlO₂ (soluble) + 2H₂O",
          ionic: "Al³⁺ + 3OH⁻ → Al(OH)₃↓\nAl(OH)₃ + OH⁻ → [Al(OH)₄]⁻ (soluble)"
        },
        theory: {
          principle: "Adsorption chromatography in test tube. Gelatinous Al(OH)₃ acts as a mordant, physically adsorbing the litmus dye molecule inside its hydrated structure.",
          mechanism: "Physical adsorption on high surface area colloidal hydroxide precipitate.",
          observationReason: "Adsorption of blue dye yields a blue precipitate, while the rest of the solution becomes colorless.",
          examPoints: [
            "Al(OH)₃ is amphoteric, dissolving in both acids and bases.",
            "The lake test is highly specific for Al³⁺.",
            "Aluminon reagent (triammonium aurintricarboxylate) can be used instead of litmus."
          ],
          commonMistakes: [
            "Adding excess ammonium hydroxide in the lake test, which can dissolve the lake or dilute the color."
          ],
          mnemonic: "Aluminium forms a Blue Lake."
        }
      }
    },
    {
      title: "Chromium (Cr³⁺)",
      cation: "Cr³⁺",
      group: "Group III",
      flameTest: "Green",
      steps: [
        { reagent: "NH₄OH", observation: "Green ppt (Cr(OH)₃)", color: "#ccffcc", precipitate: true },
        { reagent: "H₂O₂ + NaOH", observation: "Yellow solution (chromate)", color: "#ffff66", precipitate: false }
      ],
      confirmatoryTests: [
        { reagent: "Pb(CH₃COO)₂", observation: "Yellow ppt (PbCrO₄)", color: "#ffd700" }
      ],
      equation: "Cr³⁺ → CrO₄²⁻",
      theory: "Chromium oxidizes to chromate.",
      content: {
        observations: {
          observation: "Dull green precipitate of Cr(OH)₃ forms with Group III reagents.",
          inference: "Cr³⁺ ion is indicated.",
          explanation: "Chromium precipitates as a green hydroxide, which is amphoteric and dissolves in NaOH. Heating with sodium peroxide or alkaline H₂O₂ oxidizes Cr(III) to yellow chromate CrO₄²⁻."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the green precipitate in NaOH and add H₂O₂. Boil to get a yellow solution.",
            "Acidify with acetic acid and add lead acetate solution."
          ],
          observation: "The green solution turns bright yellow upon oxidation. Adding lead acetate yields a yellow precipitate of lead chromate.",
          conclusion: "Cr³⁺ is confirmed."
        },
        equation: {
          molecular: "2Cr(OH)₃ + 3H₂O₂ + 4NaOH → 2Na₂CrO₄ + 8H₂O\nNa₂CrO₄ + Pb(CH₃COO)₂ → PbCrO₄↓ + 2CH₃COONa",
          ionic: "Cr³⁺ + 3OH⁻ → Cr(OH)₃↓\n2Cr(OH)₃ + 3H₂O₂ + 4OH⁻ → 2CrO₄²⁻ (Yellow) + 8H₂O\nPb²⁺ + CrO₄²⁻ → PbCrO₄↓ (Yellow)"
        },
        theory: {
          principle: "Redox oxidation followed by selective precipitation. Chromium is oxidized from +3 (green) to +6 (yellow, chromate) by hydrogen peroxide in basic medium.",
          mechanism: "Alkaline hydrogen peroxide redox oxidation followed by ionic metathesis.",
          observationReason: "The yellow color is due to chromate ions, and the yellow ppt is lead chromate.",
          examPoints: [
            "Cr(OH)₃ is amphoteric and forms sodium chromite in excess cold NaOH.",
            "Chromate (CrO₄²⁻) turns to dichromate (Cr₂O₇²⁻) in acidic medium, changing color from yellow to orange."
          ],
          commonMistakes: [
            "Not boiling off excess H₂O₂ before adding lead acetate. Residual H₂O₂ will reduce chromate back to green Cr³⁺ in acidic medium, ruining the test."
          ]
        }
      }
    }
  ],
  group4: [
    {
      title: "Zinc (Zn²⁺)",
      cation: "Zn²⁺",
      group: "Group IV",
      flameTest: "Bluish green",
      steps: [
        { reagent: "NaOH", observation: "White ppt Zn(OH)₂", color: "#f2f2f2", precipitate: true },
        { reagent: "Excess NaOH", observation: "Dissolves", color: "#e6f7ff", precipitate: false }
      ],
      confirmatoryTests: [
        { reagent: "Co(NO₃)₂ + heat", observation: "Green residue", color: "#66cc66" }
      ],
      equation: "Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄]",
      theory: "Zinc hydroxide is amphoteric.",
      content: {
        observations: {
          observation: "Dirty white/grey precipitate of ZnS forms when H₂S is passed in alkaline medium (NH₄OH/NH₄Cl).",
          inference: "Group IV cation Zn²⁺ may be present.",
          explanation: "Zinc sulfide has a relatively high Ksp (1.6 x 10⁻²⁴), so it requires a higher sulfide concentration than Group II. This is achieved in alkaline medium where H⁺ is neutralized, shifting H₂S ⇌ 2H⁺ + S²⁻ forward."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the white ZnS precipitate in dilute HCl.",
            "Add a drop of cobalt nitrate [Co(NO₃)₂] solution.",
            "Soak a filter paper in the solution and burn it to ash."
          ],
          observation: "The ash of the filter paper is green (Rinmann's green).",
          conclusion: "Zn²⁺ is confirmed."
        },
        equation: {
          molecular: "ZnS + 2HCl → ZnCl₂ + H₂S↑\nZn(NO₃)₂ + Co(NO₃)₂ + heat → CoZnO₂ + 4NO₂ + O₂",
          ionic: "Zn²⁺ + S²⁻ → ZnS↓\nCo²⁺ + Zn²⁺ + 2O²⁻ → CoZnO₂ (Green)"
        },
        theory: {
          principle: "Solid state thermal oxidation. Cobalt(II) ions replace zinc ions in the zinc oxide crystal lattice during heating, creating a mixed metal oxide (cobalt zincate) with characteristic green color.",
          mechanism: "Solid state lattice doping.",
          observationReason: "Green color of cobalt zincate (CoZnO₂).",
          examPoints: [
            "Zinc hydroxide is amphoteric and dissolves in excess NaOH to form soluble sodium tetrahydroxozincate(II).",
            "ZnS is the only white sulfide among common heavy metal sulfides."
          ],
          commonMistakes: [
            "Adding too much cobalt nitrate. Excess cobalt nitrate decomposes to black cobalt oxide (CoO), which masks the green color of Rinmann's green."
          ],
          mnemonic: "Zinc gives Rinmann's Green."
        }
      }
    },
    {
      title: "Nickel (Ni²⁺)",
      cation: "Ni²⁺",
      group: "Group IV",
      flameTest: "No color",
      steps: [
        { reagent: "NH₄OH", observation: "Green ppt", color: "#ccffcc", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "DMG", observation: "Bright red ppt", color: "#ff3333" }
      ],
      equation: "Ni²⁺ + DMG → red complex",
      theory: "Nickel forms dimethylglyoxime complex.",
      content: {
        observations: {
          observation: "Black precipitate of NiS forms with H₂S in alkaline medium.",
          inference: "Ni²⁺ ion may be present.",
          explanation: "Nickel precipitates as NiS under alkaline conditions."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the black precipitate in aqua regia (3 HCl : 1 HNO₃).",
            "Make the solution alkaline with NH₄OH.",
            "Add Dimethylglyoxime (DMG) reagent."
          ],
          observation: "A brilliant cherry-red precipitate forms immediately.",
          conclusion: "Ni²⁺ is confirmed."
        },
        equation: {
          molecular: "Ni²⁺ + 2C₄H₈N₂O₂ (DMG) + 2NH₃ → Ni(C₄H₇N₂O₂)₂↓ + 2NH₄⁺",
          ionic: "Ni²⁺ + 2HDMG + 2NH₃ → [Ni(DMG)₂]↓ (Cherry Red) + 2NH₄⁺"
        },
        theory: {
          principle: "Chelation chemistry. Nickel(II) coordinate bonds with two dimethylglyoximate anions in a square planar geometry, stabilized by strong intramolecular hydrogen bonding.",
          mechanism: "Chelation complexation.",
          observationReason: "Cherry-red color of the bis(dimethylglyoximato)nickel(II) complex.",
          examPoints: [
            "The nickel-DMG complex is square planar and diamagnetic.",
            "Intramolecular hydrogen bonding makes the complex highly stable and insoluble in water.",
            "The reaction must be performed in slightly alkaline medium (NH₄OH); in highly acidic medium, the DMG anion is protonated and cannot coordinate."
          ],
          commonMistakes: [
            "Making the solution too acidic. Acid destroys the complex by protonating the oxime oxygens."
          ],
          mnemonic: "Nickel + DMG = Cherry Red."
        }
      }
    },
    {
      title: "Cobalt (Co²⁺)",
      cation: "Co²⁺",
      group: "Group IV",
      flameTest: "Blue",
      steps: [
        { reagent: "NH₄OH", observation: "Bluish solution", color: "#cce6ff", precipitate: false }
      ],
      confirmatoryTests: [
        { reagent: "NaNO₂ + CH₃COOH", observation: "Yellow ppt", color: "#ffd700" }
      ],
      equation: "Cobaltinitrite formation",
      theory: "Forms complex ppt.",
      content: {
        observations: {
          observation: "Black precipitate of CoS forms with Group IV reagents.",
          inference: "Co²⁺ is indicated.",
          explanation: "Cobalt forms black sulfide in basic medium."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the black precipitate in aqua regia.",
            "Neutralize with NaOH, acidify with acetic acid.",
            "Add excess solid potassium nitrite (KNO₂) and warm."
          ],
          observation: "A yellow crystalline precipitate of potassium cobaltinitrite forms.",
          conclusion: "Co²⁺ is confirmed."
        },
        equation: {
          molecular: "CoCl₂ + 7KNO₂ + 2CH₃COOH → K₃[Co(NO₂)₆]↓ + NO↑ + 2KCl + 2CH₃COOK + H₂O",
          ionic: "Co²⁺ + 6NO₂⁻ + 3K⁺ + 2H⁺ → K₃[Co(NO₂)₆]↓ (Yellow) + NO↑ + H₂O"
        },
        theory: {
          principle: "Redox oxidation followed by complexation. Nitrite ions in acidic medium oxidize Co(II) to Co(III) (itself being reduced to NO gas), which then coordinates with excess nitrite to form a stable octahedral complex.",
          mechanism: "Oxidation and coordination substitution.",
          observationReason: "Yellow color of the potassium hexanitrocobaltate(III) complex.",
          examPoints: [
            "The complex K₃[Co(NO₂)₆] contains Co in the +3 oxidation state, which is low-spin and highly stable.",
            "This reaction is a rare example where nitrite acts as an oxidizing agent and a ligand simultaneously."
          ],
          commonMistakes: [
            "Using a mineral acid like HCl instead of acetic acid. Strong acids decompose the nitrite ion into nitrogen oxides."
          ]
        }
      }
    },
    {
      title: "Manganese (Mn²⁺)",
      cation: "Mn²⁺",
      group: "Group IV",
      flameTest: "No color",
      steps: [
        { reagent: "H₂S", observation: "Flesh colored ppt", color: "#ffe0cc", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "NaBiO₃", observation: "Purple solution", color: "#800080" }
      ],
      equation: "Mn²⁺ → MnO₄⁻",
      theory: "Oxidation to permanganate.",
      content: {
        observations: {
          observation: "Flesh/buff-colored precipitate of MnS forms with alkaline H₂S.",
          inference: "Mn²⁺ is indicated.",
          explanation: "MnS is a characteristic flesh-colored sulfide (Ksp = 2.5 x 10⁻¹³), soluble in dilute mineral acids."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the buff precipitate in dilute HNO₃.",
            "Add solid sodium bismuthate (NaBiO₃) and shake."
          ],
          observation: "The solution turns a beautiful purple color.",
          conclusion: "Mn²⁺ is confirmed."
        },
        equation: {
          molecular: "2Mn(NO₃)₂ + 5NaBiO₃ + 14HNO₃ → 2NaMnO₄ + 5Bi(NO₃)₃ + 3NaNO₃ + 7H₂O",
          ionic: "2Mn²⁺ + 5BiO₃⁻ + 14H⁺ → 2MnO₄⁻ (Purple) + 5Bi³⁺ + 7H₂O"
        },
        theory: {
          principle: "Powerful redox oxidation. Bismuthate in strongly acidic medium acts as a very strong oxidizing agent, capable of oxidizing manganese from the +2 state to the +7 state (permanganate).",
          mechanism: "Electron transfer from Mn(II) to Bi(V).",
          observationReason: "The intense purple color of permanganate is due to ligand-to-metal charge transfer (LMCT) transitions.",
          examPoints: [
            "NaBiO₃ is insoluble in water; the reaction occurs on the solid surface.",
            "Chlorides must be absent, as bismuthate will oxidize chloride to chlorine gas instead of manganese."
          ],
          commonMistakes: [
            "Heating the mixture. High temperatures decompose permanganate to brown MnO₂."
          ]
        }
      }
    }
  ],
  group5: [
    {
      title: "Calcium (Ca²⁺)",
      cation: "Ca²⁺",
      group: "Group V",
      flameTest: "Brick red",
      steps: [
        { reagent: "(NH₄)₂CO₃", observation: "White ppt", color: "#f2f2f2", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "Ammonium oxalate", observation: "White ppt", color: "#f2f2f2" }
      ],
      equation: "Ca²⁺ + CO₃²⁻ → CaCO₃↓",
      theory: "Calcium forms carbonate and oxalate.",
      content: {
        observations: {
          observation: "White precipitate of CaCO₃ forms upon adding the Group V reagent (NH₄)₂CO₃ in the presence of NH₄OH.",
          inference: "Group V cation Ca²⁺ may be present.",
          explanation: "Group V cations precipitate as carbonates in weakly alkaline medium. Magnesium does not precipitate because its carbonate is soluble in the presence of ammonium salts."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the white carbonate precipitate in dilute acetic acid.",
            "Add ammonium oxalate [(NH₄)₂C₂O₄] solution."
          ],
          observation: "A white precipitate of calcium oxalate forms immediately, which is insoluble in acetic acid.",
          conclusion: "Ca²⁺ is confirmed."
        },
        equation: {
          molecular: "CaCO₃ + 2CH₃COOH → (CH₃COO)₂Ca + CO₂↑ + H₂O\n(CH₃COO)₂Ca + (NH₄)₂C₂O₄ → CaC₂O₄↓ + 2CH₃COONH₄",
          ionic: "Ca²⁺ + C₂O₄²⁻ → CaC₂O₄↓ (White)"
        },
        theory: {
          principle: "Selective precipitation based on pH. Calcium oxalate is highly insoluble (Ksp = 2.3 x 10⁻⁹) and precipitates in acetic acid medium, separating it from strontium chromate and barium chromate.",
          mechanism: "Ionic precipitation.",
          observationReason: "White crystalline calcium oxalate precipitate.",
          examPoints: [
            "Calcium gives a brick-red flame test, which appears green when viewed through cobalt glass.",
            "Calcium oxalate dissolves in dilute mineral acids (HCl, HNO₃) but not in acetic acid."
          ],
          commonMistakes: [
            "Confusing the brick-red flame color of Ca²⁺ with the crimson-red color of Sr²⁺."
          ],
          mnemonic: "Calcium Oxalate is Brick Red in Flame."
        }
      }
    },
    {
      title: "Barium (Ba²⁺)",
      cation: "Ba²⁺",
      group: "Group V",
      flameTest: "Apple green",
      steps: [
        { reagent: "K₂CrO₄", observation: "Yellow ppt", color: "#ffd700", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "H₂SO₄", observation: "White ppt", color: "#f2f2f2" }
      ],
      equation: "Ba²⁺ + SO₄²⁻ → BaSO₄↓",
      theory: "Barium forms insoluble sulfate.",
      content: {
        observations: {
          observation: "White precipitate of BaCO₃ forms with Group V reagent.",
          inference: "Ba²⁺ is indicated.",
          explanation: "Precipitated as carbonate, which dissolves in acetic acid."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the carbonate precipitate in hot dilute acetic acid.",
            "Add potassium chromate (K₂CrO₄) solution."
          ],
          observation: "A yellow precipitate of barium chromate forms, which is insoluble in acetic acid.",
          conclusion: "Ba²⁺ is confirmed."
        },
        equation: {
          molecular: "BaCO₃ + 2CH₃COOH → (CH₃COO)₂Ba + CO₂↑ + H₂O\n(CH₃COO)₂Ba + K₂CrO₄ → BaCrO₄↓ + 2CH₃COOK",
          ionic: "Ba²⁺ + CrO₄²⁻ → BaCrO₄↓ (Yellow)"
        },
        theory: {
          principle: "Fractional precipitation based on Ksp. BaCrO₄ has a much lower solubility product (Ksp = 1.2 x 10⁻¹⁰) than SrCrO₄ (3.6 x 10⁻⁵) and CaCrO₄ (2.3 x 10⁻²), allowing it to precipitate selectively in acetic acid.",
          mechanism: "Metathesis precipitation.",
          observationReason: "Yellow BaCrO₄ precipitate.",
          examPoints: [
            "Barium gives a characteristic apple-green flame test.",
            "BaCrO₄ is soluble in dilute mineral acids (HCl) but insoluble in acetic acid."
          ],
          commonMistakes: [
            "Using mineral acids to dissolve the carbonate before the chromate test, which will prevent BaCrO₄ precipitation by protonating the chromate ion."
          ]
        }
      }
    },
    {
      title: "Strontium (Sr²⁺)",
      cation: "Sr²⁺",
      group: "Group V",
      flameTest: "Crimson red",
      steps: [
        { reagent: "SO₄²⁻", observation: "White ppt", color: "#f2f2f2", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "Ammonium sulfate", observation: "White ppt", color: "#f2f2f2" }
      ],
      equation: "SrSO₄ formation",
      theory: "Strontium forms sulfate.",
      content: {
        observations: {
          observation: "White precipitate of SrCO₃ forms with Group V reagent.",
          inference: "Sr²⁺ ion is indicated.",
          explanation: "Precipitated as carbonate, which is soluble in acetic acid."
        },
        confirmatoryTest: {
          procedure: [
            "Dissolve the carbonate precipitate in dilute acetic acid.",
            "Add ammonium sulfate [(NH₄)₂SO₄] solution and boil."
          ],
          observation: "A white precipitate of strontium sulfate (SrSO₄) forms.",
          conclusion: "Sr²⁺ is confirmed."
        },
        equation: {
          molecular: "(CH₃COO)₂Sr + (NH₄)₂SO₄ → SrSO₄↓ + 2CH₃COONH₄",
          ionic: "Sr²⁺ + SO₄²⁻ → SrSO₄↓ (White)"
        },
        theory: {
          principle: "Precipitation using sulfate. SrSO₄ (Ksp = 3.2 x 10⁻⁷) is less soluble than CaSO₄ (soluble) but more soluble than BaSO₄ (extremely insoluble). Boiling helps SrSO₄ precipitate faster.",
          mechanism: "Precipitation.",
          observationReason: "White SrSO₄ precipitate.",
          examPoints: [
            "Strontium gives a crimson-red flame test.",
            "SrSO₄ is insoluble in ammonium sulfate solution, separating it from calcium (which forms soluble complex)."
          ],
          commonMistakes: [
            "Confusing the crimson-red flame of strontium with the brick-red flame of calcium."
          ]
        }
      }
    }
  ],
  group6: [
    {
      title: "Ammonium (NH₄⁺)",
      cation: "NH₄⁺",
      group: "Group VI",
      flameTest: "No color",
      steps: [
        { reagent: "NaOH + heat", observation: "Ammonia gas evolved", color: "#e6f7ff", precipitate: false, gasEvolution: true }
      ],
      confirmatoryTests: [
        { reagent: "Red litmus", observation: "Turns blue", color: "#ff6666" }
      ],
      equation: "NH₄⁺ + OH⁻ → NH₃↑",
      theory: "Ammonia gas evolved.",
      content: {
        observations: {
          observation: "Pungent smelling gas (ammonia) is evolved when heated with sodium hydroxide.",
          inference: "NH₄⁺ ion may be present.",
          explanation: "Ammonium ion reacts with hydroxide ions to form weak base ammonium hydroxide, which decomposes on heating to release gaseous ammonia."
        },
        confirmatoryTest: {
          procedure: [
            "Heat the salt with NaOH solution.",
            "Pass the evolved gas through Nessler's reagent."
          ],
          observation: "A reddish-brown precipitate is formed in Nessler's reagent.",
          conclusion: "NH₄⁺ is confirmed."
        },
        equation: {
          molecular: "NH₄Cl + NaOH → NaCl + NH₃↑ + H₂O\nNH₃ + 2K₂[HgI₄] + 3KOH → NH₂.HgO.HgI↓ + 7KI + 2H₂O",
          ionic: "NH₄⁺ + OH⁻ → NH₃↑ + H₂O\nNH₄⁺ + 2[HgI₄]²⁻ + 4OH⁻ → NH₂.HgO.HgI↓ (Brown) + 7I⁻ + 3H₂O"
        },
        theory: {
          principle: "Complexation with Nessler's reagent. Ammonia reacts with alkaline potassium tetraiodomercurate(II) to form a complex known as iodide of Millon's base.",
          mechanism: "Amine substitution followed by oxide-bridging condensation.",
          observationReason: "The reddish-brown precipitate is the iodide of Millon's base.",
          examPoints: [
            "Nessler's reagent is K₂[HgI₄] in KOH.",
            "Ammonia gas turns red litmus paper blue and gives dense white fumes of NH₄Cl with a glass rod dipped in conc. HCl."
          ],
          commonMistakes: [
            "Adding Nessler's reagent to an acidic solution. The reaction requires alkaline medium."
          ],
          mnemonic: "Ammonia makes Nessler Brown."
        }
      }
    },
    {
      title: "Magnesium (Mg²⁺)",
      cation: "Mg²⁺",
      group: "Group VI",
      flameTest: "No color",
      steps: [
        { reagent: "Na₂HPO₄", observation: "White crystalline ppt", color: "#f2f2f2", precipitate: true }
      ],
      confirmatoryTests: [
        { reagent: "NH₄OH", observation: "White ppt", color: "#f2f2f2" }
      ],
      equation: "MgNH₄PO₄ formation",
      theory: "Magnesium ammonium phosphate forms.",
      content: {
        observations: {
          observation: "White crystalline precipitate of magnesium ammonium phosphate forms when sodium hydrogen phosphate is added in the presence of NH₄OH and NH₄Cl.",
          inference: "Mg²⁺ ion may be present.",
          explanation: "Phosphate ions in the presence of ammonium ions react with magnesium to form highly insoluble double salt magnesium ammonium phosphate (MgNH₄PO₄)."
        },
        confirmatoryTest: {
          procedure: [
            "To the filtrate of Group V, add NH₄Cl and NH₄OH.",
            "Add disodium hydrogen phosphate (Na₂HPO₄) and scratch the sides of the test tube."
          ],
          observation: "A white crystalline precipitate of MgNH₄PO₄ forms, accelerated by scratching the glass surface.",
          conclusion: "Mg²⁺ is confirmed."
        },
        equation: {
          molecular: "MgCl₂ + NH₄OH + Na₂HPO₄ → MgNH₄PO₄↓ + 2NaCl + H₂O",
          ionic: "Mg²⁺ + NH₄⁺ + PO₄³⁻ → MgNH₄PO₄↓ (White)"
        },
        theory: {
          principle: "Precipitation of double phosphate salt. Scratching the test tube creates micro-abrasions that act as nucleation sites, accelerating crystallization.",
          mechanism: "Ionic precipitation and crystallization.",
          observationReason: "White crystalline MgNH₄PO₄ precipitate.",
          examPoints: [
            "NH₄Cl is added to suppress NH₄OH ionization, preventing the precipitation of Mg(OH)₂.",
            "This is the standard confirmatory test for magnesium in salt analysis."
          ],
          commonMistakes: [
            "Forgetting to add NH₄Cl/NH₄OH. Without them, Mg(OH)₂ or other phosphates might precipitate in amorphous form instead of the characteristic crystalline MgNH₄PO₄."
          ],
          mnemonic: "Magnesium needs Scratching to precipitate."
        }
      }
    }
  ]
};

export const anionTests: AnionReaction[] = [
  {
    title: "Carbonate (CO₃²⁻)",
    anion: "CO₃²⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "Brisk effervescence (CO₂)", color: "#e6f7ff", gasEvolution: true },
      { reagent: "Limewater", observation: "Turns milky", color: "#f2f2f2", precipitate: true }
    ],
    confirmatoryTests: [
      { reagent: "MgSO₄", observation: "White ppt", color: "#f2f2f2" }
    ],
    equation: "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O",
    theory: "Carbonates release CO₂ with acids.",
    content: {
      observations: {
        observation: "Brisk effervescence with evolution of a colorless, odorless gas which turns limewater milky.",
        inference: "Carbonate ion (CO₃²⁻) is indicated.",
        explanation: "Carbonates react with dilute acids to release carbon dioxide gas. The gas reacts with calcium hydroxide (limewater) to form insoluble calcium carbonate."
      },
      confirmatoryTest: {
        procedure: [
          "Prepare an aqueous extract of the salt.",
          "Add magnesium sulfate (MgSO₄) solution."
        ],
        observation: "A white precipitate of magnesium carbonate forms immediately in the cold.",
        conclusion: "CO₃²⁻ is confirmed."
      },
      equation: {
        molecular: "Na₂CO₃ + MgSO₄ → MgCO₃↓ (White) + Na₂SO₄\nCO₂ + Ca(OH)₂ → CaCO₃↓ (Milky) + H₂O",
        ionic: "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O\nMg²⁺ + CO₃²⁻ → MgCO₃↓"
      },
      theory: {
        principle: "Acid-base neutralization releasing volatile acid anhydride, followed by precipitation of calcium carbonate (Ksp = 4.8 x 10⁻⁹). Prolonged CO₂ turns the solution clear due to soluble bicarbonate formation.",
        mechanism: "Protonation followed by decomposition: CO₃²⁻ + H⁺ → HCO₃⁻ + H⁺ → H₂CO₃ → H₂O + CO₂↑.",
        observationReason: "Milkiness is due to CaCO₃. Soluble bicarbonate is Ca(HCO₃)₂.",
        examPoints: [
          "Bicarbonates do not form a precipitate with MgSO₄ in the cold (only on heating). This distinguishes carbonate from bicarbonate.",
          "Excess CO₂ dissolves the milkiness: CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (soluble)."
        ],
        commonMistakes: [
          "Passing CO₂ gas for too long, which dissolves the precipitate and makes the test appear negative."
        ],
        mnemonic: "Carbonate precipitates with Magnesium in the Cold."
      }
    }
  },
  {
    title: "Bicarbonate (HCO₃⁻)",
    anion: "HCO₃⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "Mild effervescence", color: "#e6f7ff", gasEvolution: true }
    ],
    confirmatoryTests: [
      { reagent: "Heating", observation: "CO₂ evolved", color: "#e6f7ff" }
    ],
    equation: "2HCO₃⁻ → CO₂ + H₂O + CO₃²⁻",
    theory: "Decomposes on heating.",
    content: {
      observations: {
        observation: "Brisk effervescence with dilute acids releasing CO₂ gas.",
        inference: "Bicarbonate ion (HCO₃⁻) is indicated.",
        explanation: "Bicarbonates react with acids to form carbonic acid which decomposes to release CO₂."
      },
      confirmatoryTest: {
        procedure: [
          "To the aqueous solution of the salt, add MgSO₄ solution.",
          "Observe that no precipitate forms in the cold.",
          "Boil/heat the mixture."
        ],
        observation: "No precipitate forms initially. Upon boiling, a white precipitate of MgCO₃ forms.",
        conclusion: "HCO₃⁻ is confirmed."
      },
      equation: {
        molecular: "Mg(HCO₃)₂ + heat → MgCO₃↓ + CO₂↑ + H₂O",
        ionic: "2HCO₃⁻ + Mg²⁺ + heat → MgCO₃↓ + CO₂↑ + H₂O"
      },
      theory: {
        principle: "Thermal decomposition. Magnesium bicarbonate is soluble in water, but heating decomposes it to insoluble magnesium carbonate, releasing CO₂ gas.",
        mechanism: "Thermal dehydration and decarboxylation.",
        observationReason: "White MgCO₃ precipitate appears only upon heating.",
        examPoints: [
          "This test separates CO₃²⁻ from HCO₃⁻: carbonate precipitates MgSO₄ in the cold, bicarbonate only on heating.",
          "All bicarbonates are water-soluble."
        ],
        commonMistakes: [
          "Assuming no precipitate in the cold means the test is negative. Boiling is mandatory."
        ]
      }
    }
  },
  {
    title: "Sulfide (S²⁻)",
    anion: "S²⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "Rotten egg smell (H₂S)", color: "#e6f7ff", gasEvolution: true }
    ],
    confirmatoryTests: [
      { reagent: "Lead acetate paper", observation: "Turns black", color: "#000000" }
    ],
    equation: "S²⁻ + 2H⁺ → H₂S↑",
    theory: "Hydrogen sulfide gas evolved.",
    content: {
      observations: {
        observation: "Evolution of a gas with rotten egg smell which turns lead acetate paper black.",
        inference: "Sulfide ion (S²⁻) is indicated.",
        explanation: "Sulfides react with dilute acids to release hydrogen sulfide gas, which reacts with lead acetate to form black lead sulfide (PbS)."
      },
      confirmatoryTest: {
        procedure: [
          "To the sodium carbonate extract of the salt, add a few drops of freshly prepared sodium nitroprusside solution."
        ],
        observation: "A beautiful purple/violet color appears.",
        conclusion: "S2⁻ is confirmed."
      },
      equation: {
        molecular: "Na₂S + Na₂[Fe(CN)₅NO] → Na₄[Fe(CN)₅NOS]",
        ionic: "S²⁻ + [Fe(CN)₅NO]²⁻ → [Fe(CN)₅NOS]⁴⁻ (Purple/Violet)"
      },
      theory: {
        principle: "Coordination chemistry color reaction. Sulfide ion coordinates to the nitrosyl ligand of nitroprusside forming a thionitrosyl complex with high molar absorptivity.",
        mechanism: "Nucleophilic addition of S²⁻ to the coordinated NO⁺ ligand.",
        observationReason: "The violet/purple color is due to intense charge transfer transitions in the thionitrosyl complex.",
        examPoints: [
          "The sodium nitroprusside test must be performed in alkaline medium.",
          "H₂S gas turns lead acetate paper black due to PbS formation: Pb(CH₃COO)₂ + H₂S → PbS↓ (Black) + 2CH₃COOH."
        ],
        commonMistakes: [
          "Using an acidic solution for the nitroprusside test. Acid prevents the formation of the purple complex."
        ],
        mnemonic: "Sulfide turns Nitroprusside Violet."
      }
    }
  },
  {
    title: "Sulfite (SO₃²⁻)",
    anion: "SO₃²⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "SO₂ gas (pungent smell)", color: "#e6f7ff", gasEvolution: true }
    ],
    confirmatoryTests: [
      { reagent: "K₂Cr₂O₇", observation: "Orange to green", color: "#66cc66" }
    ],
    equation: "SO₃²⁻ + 2H⁺ → SO₂↑ + H₂O",
    theory: "Sulfur dioxide reduces dichromate.",
    content: {
      observations: {
        observation: "Evolution of sulfur dioxide gas (burning sulfur smell) which turns acidified potassium dichromate paper green.",
        inference: "Sulfite ion (SO₃²⁻) is indicated.",
        explanation: "Sulfite reacts with dil. HCl to release SO₂ gas, which reduces orange dichromate Cr₂O₇²⁻ to green Cr³⁺ ions."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt solution, add barium chloride (BaCl₂) solution.",
          "Observe precipitate, then add dilute HCl."
        ],
        observation: "A white precipitate of barium sulfite forms, which dissolves in dilute HCl with evolution of SO₂ gas.",
        conclusion: "SO₃²⁻ is confirmed."
      },
      equation: {
        molecular: "Na₂SO₃ + BaCl₂ → BaSO₃↓ (White) + 2NaCl\nBaSO₃ + 2HCl → BaCl₂ + SO₂↑ + H₂O\nCr₂O₇²⁻ + 3SO₂ + 2H⁺ → 2Cr³⁺ (Green) + 3SO₄²⁻ + H₂O",
        ionic: "SO₃²⁻ + Ba²⁺ → BaSO₃↓\nBaSO₃ + 2H⁺ → Ba²⁺ + SO₂↑ + H₂O"
      },
      theory: {
        principle: "Redox reaction. SO₂ is a reducing agent. It reduces chromium from +6 state (orange dichromate) to +3 state (green chromium ion).",
        mechanism: "Redox electron transfer.",
        observationReason: "Orange to green color change represents reduction of Cr(VI) to Cr(III).",
        examPoints: [
          "Barium sulfite is soluble in HCl, which distinguishes it from barium sulfate (which is completely insoluble).",
          "SO₂ gas also decolorizes acidified KMnO₄ solution."
        ],
        commonMistakes: [
          "Confusing sulfite (SO₃²⁻) with sulfate (SO₄²⁻). Barium sulfate does not dissolve in HCl, while barium sulfite does."
        ]
      }
    }
  },
  {
    title: "Sulfate (SO₄²⁻)",
    anion: "SO₄²⁻",
    steps: [
      { reagent: "BaCl₂", observation: "White ppt", color: "#f2f2f2", precipitate: true },
      { reagent: "Dil. HCl", observation: "Insoluble", color: "#f2f2f2" }
    ],
    confirmatoryTests: [
      { reagent: "Pb(NO₃)₂", observation: "White ppt", color: "#f2f2f2" }
    ],
    equation: "Ba²⁺ + SO₄²⁻ → BaSO₄↓",
    theory: "Forms insoluble barium sulfate.",
    content: {
      observations: {
        observation: "A thick white precipitate of BaSO₄ forms upon adding BaCl₂, which is completely insoluble in concentrated mineral acids.",
        inference: "Sulfate ion (SO₄²⁻) is indicated.",
        explanation: "Barium sulfate has an extremely low solubility product (Ksp = 1.1 x 10⁻¹⁰) and is not decomposed by mineral acids since sulfuric acid is a strong, non-volatile acid."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt solution, add lead acetate or lead nitrate solution."
        ],
        observation: "A white precipitate of lead sulfate (PbSO₄) forms, which is soluble in hot ammonium acetate.",
        conclusion: "SO₄²⁻ is confirmed."
      },
      equation: {
        molecular: "Na₂SO₄ + BaCl₂ → BaSO₄↓ (White) + 2NaCl\nNa₂SO₄ + Pb(CH₃COO)₂ → PbSO₄↓ (White) + 2CH₃COONa",
        ionic: "Ba²⁺ + SO₄²⁻ → BaSO₄↓\nPb²⁺ + SO₄²⁻ → PbSO₄↓"
      },
      theory: {
        principle: "Sulfate precipitation. Sulfates of barium and lead are highly insoluble. Lead sulfate dissolves in ammonium acetate due to the formation of a weakly ionized lead acetate complex.",
        mechanism: "Ionic precipitation and complexation.",
        observationReason: "White crystalline precipitate of BaSO₄ and PbSO₄.",
        examPoints: [
          "BaSO₄ is insoluble in all concentrated mineral acids (HCl, HNO₃, H₂SO₄).",
          "This is a dry/wet method for sulfate determination."
        ],
        commonMistakes: [
          "Confusing barium sulfate with barium sulfite. Barium sulfate is insoluble in HCl, whereas barium sulfite dissolves in HCl with SO₂ gas evolution."
        ],
        mnemonic: "Sulfate stays White in Acid."
      }
    }
  },
  {
    title: "Chloride (Cl⁻)",
    anion: "Cl⁻",
    steps: [
      { reagent: "AgNO₃", observation: "White curdy ppt", color: "#f2f2f2", precipitate: true },
      { reagent: "NH₄OH", observation: "Dissolves", color: "#e6f7ff" }
    ],
    confirmatoryTests: [
      { reagent: "HNO₃", observation: "Reappears", color: "#f2f2f2" }
    ],
    equation: "Ag⁺ + Cl⁻ → AgCl↓",
    theory: "Silver chloride dissolves in ammonia.",
    content: {
      observations: {
        observation: "White curdy precipitate of AgCl forms with AgNO₃, which is soluble in ammonium hydroxide but insoluble in HNO₃.",
        inference: "Chloride ion (Cl⁻) is indicated.",
        explanation: "Chloride ions form AgCl. It dissolves in NH₄OH due to soluble diammine complex formation."
      },
      confirmatoryTest: {
        procedure: [
          "Mix the solid chloride salt with solid K₂Cr₂O₇ in a dry test tube.",
          "Add concentrated H₂SO₄ and heat.",
          "Pass the red vapours into NaOH solution.",
          "Acidify the yellow solution with acetic acid and add lead acetate."
        ],
        observation: "Deep red vapours (chromyl chloride) evolve. They dissolve in NaOH to give a yellow solution, which yields a yellow precipitate with lead acetate.",
        conclusion: "Cl⁻ is confirmed (Chromyl Chloride Test)."
      },
      equation: {
        molecular: "4NaCl + K₂Cr₂O₇ + 6H₂SO₄ → 2CrO₂Cl₂↑ (Red) + 2KHSO₄ + 4NaHSO₄ + 3H₂O\nCrO₂Cl₂ + 4NaOH → Na₂CrO₄ (Yellow) + 2NaCl + 2H₂O\nNa₂CrO₄ + Pb(CH₃COO)₂ → PbCrO₄↓ (Yellow) + 2CH₃COONa",
        ionic: "Cl⁻ + K₂Cr₂O₇ + H⁺ → CrO₂Cl₂↑\nCrO₂Cl₂ + OH⁻ → CrO₄²⁻ (Yellow)\nPb²⁺ + CrO₄²⁻ → PbCrO₄↓"
      },
      theory: {
        principle: "Formation of volatile oxyhalide chromyl chloride. Only chlorides form this volatile covalent liquid (bp 117°C). Bromides and iodides are oxidized to free halogens which do not yield chromates with NaOH.",
        mechanism: "Acid-catalyzed condensation/Redox esterification.",
        observationReason: "Red gas of CrO₂Cl₂, yellow Na₂CrO₄ solution, yellow PbCrO₄ precipitate.",
        examPoints: [
          "Chromyl chloride test is highly specific for chloride and distinguishes it from bromide and iodide.",
          "Chlorides of Hg²⁺, Ag⁺, Pb²⁺, and Sb³⁺ do not respond to this test because they are covalent and do not easily release Cl⁻ ions."
        ],
        commonMistakes: [
          "Using wet test tubes. Chromyl chloride decomposes instantly in water: CrO₂Cl₂ + 2H₂O → H₂CrO₄ + 2HCl."
        ],
        mnemonic: "Chloride = Chromyl = Red."
      }
    }
  },
  {
    title: "Bromide (Br⁻)",
    anion: "Br⁻",
    steps: [
      { reagent: "AgNO₃", observation: "Cream ppt", color: "#fff2cc", precipitate: true }
    ],
    confirmatoryTests: [
      { reagent: "Cl₂ water", observation: "Orange color in organic layer", color: "#ff9933" }
    ],
    equation: "Ag⁺ + Br⁻ → AgBr↓",
    theory: "Forms cream silver bromide.",
    content: {
      observations: {
        observation: "Pale yellow/cream precipitate of AgBr forms with AgNO₃, which is sparingly soluble in NH₄OH.",
        inference: "Bromide ion (Br⁻) is indicated.",
        explanation: "Bromide forms silver bromide (AgBr) which has lower solubility than AgCl, so it dissolves only in concentrated NH₄OH."
      },
      confirmatoryTest: {
        procedure: [
          "To the sodium carbonate extract of the salt, add dilute HCl.",
          "Add chloroform (CHCl₃) or carbon tetrachloride (CCl₄) and chlorine water.",
          "Shake vigorously and allow the layers to settle."
        ],
        observation: "The lower organic layer turns orange-brown.",
        conclusion: "Br⁻ is confirmed (Organic Layer Test)."
      },
      equation: {
        molecular: "2NaBr + Cl₂ → 2NaCl + Br₂ (dissolves in organic layer)",
        ionic: "2Br⁻ + Cl₂ → 2Cl⁻ + Br₂"
      },
      theory: {
        principle: "Halogen displacement and solvent extraction. Chlorine is a stronger oxidizing agent than bromine (E° Cl₂/Cl⁻ = 1.36V, Br₂/Br⁻ = 1.09V) and oxidizes Br⁻ to elemental bromine, which is non-polar and dissolves in the organic layer.",
        mechanism: "Redox displacement.",
        observationReason: "Orange-brown color of free bromine dissolved in non-polar organic solvent.",
        examPoints: [
          "Chlorine water must be added dropwise. Excess chlorine water will oxidize bromine further to colorless bromic acid (HBrO₃).",
          "AgBr is partially soluble in ammonia."
        ],
        commonMistakes: [
          "Adding too much chlorine water, which decolorizes the layer by forming HBrO₃."
        ],
        mnemonic: "Bromine turns Chloroform Brown."
      }
    }
  },
  {
    title: "Iodide (I⁻)",
    anion: "I⁻",
    steps: [
      { reagent: "AgNO₃", observation: "Yellow ppt", color: "#ffd700", precipitate: true }
    ],
    confirmatoryTests: [
      { reagent: "Cl₂ water", observation: "Violet color in organic layer", color: "#800080" }
    ],
    equation: "Ag⁺ + I⁻ → AgI↓",
    theory: "Forms yellow silver iodide.",
    content: {
      observations: {
        observation: "Bright yellow precipitate of AgI forms with AgNO₃, which is completely insoluble in NH₄OH.",
        inference: "Iodide ion (I⁻) is indicated.",
        explanation: "Silver iodide has a very low solubility product (Ksp = 8.3 x 10⁻¹⁷) and cannot be dissolved by ammonium hydroxide."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt extract, add dilute HCl, chloroform (CHCl₃), and chlorine water.",
          "Shake vigorously and allow to settle."
        ],
        observation: "The lower organic layer turns violet.",
        conclusion: "I⁻ is confirmed."
      },
      equation: {
        molecular: "2NaI + Cl₂ → 2NaCl + I₂ (dissolves in organic layer)",
        ionic: "2I⁻ + Cl₂ → 2Cl⁻ + I₂"
      },
      theory: {
        principle: "Displacement and extraction. Chlorine oxidizes iodide to iodine (E° I₂/I⁻ = 0.54V). Iodine dissolves in non-polar solvents giving a violet color due to solvatochromic effects.",
        mechanism: "Redox reaction.",
        observationReason: "Violet color of molecular iodine in non-polar solvent.",
        examPoints: [
          "Excess chlorine water oxidizes violet iodine to colorless iodate (IO₃⁻).",
          "AgI is yellow and insoluble in ammonia."
        ],
        commonMistakes: [
          "Adding excess chlorine water, which turns the violet layer colorless by forming HIO₃."
        ],
        mnemonic: "Iodine in Chloroform is Violet."
      }
    }
  },
  {
    title: "Nitrate (NO₃⁻)",
    anion: "NO₃⁻",
    steps: [
      { reagent: "Conc. H₂SO₄ + FeSO₄", observation: "Brown ring", color: "#8b4513" }
    ],
    confirmatoryTests: [
      { reagent: "Heating", observation: "Brown fumes (NO₂)", color: "#a52a2a" }
    ],
    equation: "NO₃⁻ → NO₂",
    theory: "Brown ring test confirms nitrate.",
    content: {
      observations: {
        observation: "Evolution of brown fumes of NO₂ when heated with conc. H₂SO₄ and copper turnings.",
        inference: "Nitrate ion (NO₃⁻) is indicated.",
        explanation: "Concentrated H₂SO₄ decomposes nitrates to nitric acid, which oxidizes copper to yield brown nitrogen dioxide gas."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt solution, add freshly prepared ferrous sulfate (FeSO₄) solution.",
          "Add concentrated sulfuric acid slowly along the sides of the tilted test tube without shaking."
        ],
        observation: "A dark brown ring forms at the junction of the two liquid layers.",
        conclusion: "NO₃⁻ is confirmed (Brown Ring Test)."
      },
      equation: {
        molecular: "2NaNO₃ + 4H₂SO₄ + 6FeSO₄ → 3Fe₂(SO₄)₃ + Na₂SO₄ + 4H₂O + 2NO\n[Fe(H₂O)₆]SO₄ + NO → [Fe(H₂O)₅(NO)]SO₄ + H₂O",
        ionic: "NO₃⁻ + 3Fe²⁺ + 4H⁺ → NO + 3Fe³⁺ + 2H₂O\n[Fe(H₂O)₆]²⁺ + NO → [Fe(H₂O)₅(NO)]²⁺ (Brown Ring) + H₂O"
      },
      theory: {
        principle: "Redox reaction followed by coordination. Nitrate is reduced to nitric oxide (NO) by Fe²⁺ in acidic medium. The NO coordinates with excess Fe²⁺ to form a brown nitrosyl complex.",
        mechanism: "Acidic reduction and ligand substitution.",
        observationReason: "Brown color of the pentaaquanitrosyliron(II) complex.",
        examPoints: [
          "Iron is in +1 oxidation state in the brown ring complex [Fe(H₂O)₅(NO)]²⁺ (charge transfer makes it formally Fe(I) and NO+).",
          "The test tube must not be shaken or heated, as the brown ring complex decomposes on heating: [Fe(H₂O)₅(NO)]²⁺ → [Fe(H₂O)₆]²⁺ + NO↑."
        ],
        commonMistakes: [
          "Using old FeSO₄ solution. Atmospheric oxygen oxidizes Fe²⁺ to Fe³⁺, making old solution ineffective.",
          "Shaking the test tube, which mixes the layers and destroys the ring."
        ],
        mnemonic: "Nitrate gives a Brown Ring."
      }
    }
  },
  {
    title: "Nitrite (NO₂⁻)",
    anion: "NO₂⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "Brown fumes", color: "#a52a2a", gasEvolution: true }
    ],
    confirmatoryTests: [
      { reagent: "KI + starch", observation: "Blue color", color: "#0000ff" }
    ],
    equation: "NO₂⁻ → NO + NO₂",
    theory: "Nitrites oxidize iodide.",
    content: {
      observations: {
        observation: "Evolution of pale brown fumes in the cold with dilute HCl.",
        inference: "Nitrite ion (NO₂⁻) is indicated.",
        explanation: "Nitrites are unstable in dilute acid and decompose to yield nitric oxide (colorless) which is oxidized by air to brown nitrogen dioxide (NO₂)."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt solution, add dilute H₂SO₄, potassium iodide (KI) solution, and starch solution."
        ],
        observation: "The solution immediately turns deep blue.",
        conclusion: "NO₂⁻ is confirmed."
      },
      equation: {
        molecular: "2KNO₂ + 2KI + 2H₂SO₄ → 2K₂SO₄ + I₂ + 2NO↑ + 2H₂O\nI₂ + starch → blue complex",
        ionic: "2NO₂⁻ + 2I⁻ + 4H⁺ → I₂ + 2NO↑ + 2H₂O"
      },
      theory: {
        principle: "Redox reaction. Nitrite acts as an oxidizing agent in acidic medium, oxidizing iodide to iodine, which forms a blue adsorption complex with starch amylose.",
        mechanism: "Redox electron transfer.",
        observationReason: "Deep blue color of the starch-iodine complex.",
        examPoints: [
          "Nitrites release brown fumes with dilute HCl, whereas nitrates require concentrated H₂SO₄ and heating.",
          "Nitrite also decolorizes acidified KMnO₄."
        ],
        commonMistakes: [
          "Confusing nitrite (NO₂⁻) with nitrate (NO₃⁻). Nitrite reacts with dilute acids, nitrate does not."
        ]
      }
    }
  },
  {
    title: "Acetate (CH₃COO⁻)",
    anion: "CH₃COO⁻",
    steps: [
      { reagent: "Dil. HCl", observation: "Vinegar smell", color: "#e6f7ff" }
    ],
    confirmatoryTests: [
      { reagent: "Ethanol + H₂SO₄", observation: "Fruity smell (ester)", color: "#fff2cc" }
    ],
    equation: "CH₃COO⁻ + H⁺ → CH₃COOH",
    theory: "Esterification confirms acetate.",
    content: {
      observations: {
        observation: "Smell of vinegar is evolved when heated with dilute HCl or oxalic acid.",
        inference: "Acetate ion (CH₃COO⁻) is indicated.",
        explanation: "Acetate is protonated to volatile acetic acid, which has a characteristic vinegar odor."
      },
      confirmatoryTest: {
        procedure: [
          "Mix the solid salt with ethanol and concentrated H₂SO₄ in a test tube.",
          "Warm the mixture and pour it into a beaker containing sodium carbonate solution."
        ],
        observation: "A pleasant, fruity smell of ethyl acetate is detected.",
        conclusion: "CH₃COO⁻ is confirmed."
      },
      equation: {
        molecular: "CH₃COONa + H₂SO₄ → CH₃COOH + NaHSO₄\nCH₃COOH + C₂H₅OH → CH₃COOC₂H₅ (Ethyl Acetate) + H₂O",
        ionic: "CH₃COO⁻ + H⁺ → CH₃COOH\nCH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O"
      },
      theory: {
        principle: "Fischer Esterification. Condensation of carboxylic acid with an alcohol in the presence of strong acid catalyst (dehydrating agent) to yield volatile sweet-smelling ester.",
        mechanism: "Nucleophilic acyl substitution.",
        observationReason: "Fruity smell of ethyl acetate.",
        examPoints: [
          "Concentrated sulfuric acid acts as both a catalyst and a dehydrating agent (absorbs water to shift equilibrium forward).",
          "Pouring into Na₂CO₃ neutralizes excess acid so the fruity smell can be clearly observed."
        ],
        commonMistakes: [
          "Sniffing directly from the hot concentrated sulfuric acid tube. Always pour into water/carbonate first."
        ],
        mnemonic: "Acetate makes Sweet Fruity Esters."
      }
    }
  },
  {
    title: "Phosphate (PO₄³⁻)",
    anion: "PO₄³⁻",
    steps: [
      { reagent: "Ammonium molybdate", observation: "Yellow ppt", color: "#ffd700", precipitate: true }
    ],
    confirmatoryTests: [
      { reagent: "Magnesia mixture", observation: "White ppt", color: "#f2f2f2" }
    ],
    equation: "PO₄³⁻ + ammonium molybdate → yellow ppt",
    theory: "Forms molybdate complex.",
    content: {
      observations: {
        observation: "Deep canary-yellow precipitate forms upon adding ammonium molybdate in the presence of concentrated HNO₃.",
        inference: "Phosphate ion (PO₄³⁻) is indicated.",
        explanation: "Phosphate ions react with molybdate ions in strongly acidic nitric acid medium to form insoluble heteropoly acid ammonium phosphomolybdate."
      },
      confirmatoryTest: {
        procedure: [
          "To the salt solution, add magnesia mixture (MgCl₂ + NH₄Cl + NH₄OH)."
        ],
        observation: "A white crystalline precipitate of magnesium ammonium phosphate forms.",
        conclusion: "PO₄³⁻ is confirmed."
      },
      equation: {
        molecular: "H₃PO₄ + 12(NH₄)₂MoO₄ + 21HNO₃ → (NH₄)₃[P(Mo₃O₁₀)₄]↓ (Yellow) + 21NH₄NO₃ + 12H₂O\nNa₂HPO₄ + MgCl₂ + NH₄OH → MgNH₄PO₄↓ (White) + 2NaCl + H₂O",
        ionic: "PO₄³⁻ + 12MoO₄²⁻ + 3NH₄⁺ + 24H⁺ → (NH₄)₃[P(Mo₃O₁₀)₄]↓ + 12H₂O\nMg²⁺ + NH₄⁺ + PO₄³⁻ → MgNH₄PO₄↓"
      },
      theory: {
        principle: "Heteropoly acid precipitation. Highly charged phosphate ion coordinates with molybdenum atoms to form an inorganic polymer complex of high molecular weight and low solubility.",
        mechanism: "Coordination precipitation.",
        observationReason: "Canary-yellow precipitate of ammonium phosphomolybdate.",
        examPoints: [
          "The ammonium molybdate test must be performed in strongly acidic medium (concentrated HNO₃) to generate the reactive molybdic acid species.",
          "Arsenate (AsO₄³⁻) gives an identical test in Group II, so arsenic must be removed first."
        ],
        commonMistakes: [
          "Not adding HNO₃. The yellow precipitate will not form in neutral or basic solutions."
        ],
        mnemonic: "Phosphate turns Yellow like a Canary."
      }
    }
  }
];