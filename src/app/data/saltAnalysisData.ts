export const cationTests = {
  group1: [
    {
      title: "Lead (Pb²⁺)",
      cation: "Pb²⁺",
      group: "Group I",
      flameTest: "Bluish white",
      steps: [
        {
          reagent: "Dil. HCl",
          observation: "White ppt (PbCl₂)",
          color: "#f2f2f2",
          precipitate: true,
          precipitateColor: "#ffffff"
        },
        {
          reagent: "Hot Water",
          observation: "Dissolves",
          color: "#e6f7ff",
          precipitate: false
        },
        {
          reagent: "K₂CrO₄",
          observation: "Yellow ppt",
          color: "#fff9e6",
          precipitate: true,
          precipitateColor: "#ffd700"
        }
      ],
      confirmatoryTests: [
        {
          reagent: "KI",
          observation: "Yellow ppt (PbI₂)",
          color: "#fff2cc"
        },
        {
          reagent: "H₂SO₄",
          observation: "White ppt (PbSO₄)",
          color: "#f2f2f2"
        }
      ],
      equation: "Pb²⁺ + 2Cl⁻ → PbCl₂↓\nPb²⁺ + CrO₄²⁻ → PbCrO₄↓",
      theory: "Lead forms insoluble chloride, sulfate and chromate salts."
    },

    {
      title: "Silver (Ag⁺)",
      cation: "Ag⁺",
      group: "Group I",
      flameTest: "No characteristic color",
      steps: [
        {
          reagent: "Dil. HCl",
          observation: "Curdy white ppt (AgCl)",
          color: "#f2f2f2",
          precipitate: true,
          precipitateColor: "#ffffff"
        },
        {
          reagent: "NH₄OH",
          observation: "Dissolves forming complex",
          color: "#e6f7ff",
          precipitate: false
        },
        {
          reagent: "HNO₃",
          observation: "White ppt reappears",
          color: "#f2f2f2",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Sunlight",
          observation: "Turns grey (Ag reduction)",
          color: "#cccccc"
        }
      ],
      equation: "AgCl + 2NH₃ → [Ag(NH₃)₂]⁺",
      theory: "Silver chloride dissolves in ammonia forming complex ion."
    },

    {
      title: "Mercurous (Hg₂²⁺)",
      cation: "Hg₂²⁺",
      group: "Group I",
      flameTest: "No color",
      steps: [
        {
          reagent: "Dil. HCl",
          observation: "White ppt (Hg₂Cl₂)",
          color: "#f2f2f2",
          precipitate: true
        },
        {
          reagent: "NH₄OH",
          observation: "Black ppt",
          color: "#cccccc",
          precipitate: true,
          precipitateColor: "#000000"
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Heating",
          observation: "Blackens due to decomposition",
          color: "#000000"
        }
      ],
      equation: "Hg₂Cl₂ + NH₃ → Hg + HgNH₂Cl",
      theory: "Forms black mixture of mercury and amido compound."
    }
  ],

  group2: [
    {
      title: "Copper (Cu²⁺)",
      cation: "Cu²⁺",
      group: "Group II",
      flameTest: "Blue-green",
      steps: [
        {
          reagent: "H₂S",
          observation: "Black ppt (CuS)",
          color: "#e6f2ff",
          precipitate: true,
          precipitateColor: "#000000"
        },
        {
          reagent: "NH₄OH",
          observation: "Deep blue solution",
          color: "#003366",
          precipitate: false
        },
        {
          reagent: "NaOH",
          observation: "Blue ppt Cu(OH)₂",
          color: "#cce6ff",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "K₄[Fe(CN)₆]",
          observation: "Brown ppt",
          color: "#8b4513"
        }
      ],
      equation: "Cu²⁺ + H₂S → CuS↓",
      theory: "Forms sulfide and ammine complex."
    },

    {
      title: "Cadmium (Cd²⁺)",
      cation: "Cd²⁺",
      group: "Group II",
      flameTest: "No color",
      steps: [
        {
          reagent: "H₂S",
          observation: "Yellow ppt (CdS)",
          color: "#fff9e6",
          precipitate: true,
          precipitateColor: "#ffd700"
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Na₂S",
          observation: "Yellow ppt",
          color: "#fff9e6"
        }
      ],
      equation: "Cd²⁺ + H₂S → CdS↓",
      theory: "Cadmium forms yellow sulfide."
    },

    {
      title: "Bismuth (Bi³⁺)",
      cation: "Bi³⁺",
      group: "Group II",
      flameTest: "No color",
      steps: [
        {
          reagent: "H₂S",
          observation: "Brown ppt",
          color: "#fff5e6",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "NaOH",
          observation: "White ppt",
          color: "#f2f2f2"
        }
      ],
      equation: "Bi³⁺ + H₂S → Bi₂S₃↓",
      theory: "Forms brown sulfide."
    },

    {
      title: "Arsenic (As³⁺)",
      cation: "As³⁺",
      group: "Group II",
      flameTest: "Garlic odor on heating",
      steps: [
        {
          reagent: "H₂S",
          observation: "Yellow ppt",
          color: "#fff9e6",
          precipitate: true
        },
        {
          reagent: "(NH₄)₂S",
          observation: "Dissolves",
          color: "#e6f7ff",
          precipitate: false
        },
        {
          reagent: "HCl",
          observation: "Reappears",
          color: "#fff9e6",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "AgNO₃",
          observation: "Yellow ppt",
          color: "#fff9e6"
        }
      ],
      equation: "As₂S₃ formation",
      theory: "Forms soluble thio salts."
    }
  ],
    group3: [
    {
      title: "Iron (Fe³⁺)",
      cation: "Fe³⁺",
      group: "Group III",
      flameTest: "Golden sparks (on heating)",
      steps: [
        {
          reagent: "NH₄OH",
          observation: "Reddish brown ppt (Fe(OH)₃)",
          color: "#ffe6e6",
          precipitate: true,
          precipitateColor: "#8b0000"
        },
        {
          reagent: "HCl",
          observation: "Dissolves forming yellow solution",
          color: "#ffffcc",
          precipitate: false
        }
      ],
      confirmatoryTests: [
        {
          reagent: "KCNS",
          observation: "Blood red color",
          color: "#8b0000"
        },
        {
          reagent: "K₄[Fe(CN)₆]",
          observation: "Prussian blue ppt",
          color: "#000080"
        }
      ],
      equation: "Fe³⁺ + 3OH⁻ → Fe(OH)₃↓",
      theory: "Ferric hydroxide forms reddish brown ppt and gives characteristic complexes."
    },

    {
      title: "Aluminium (Al³⁺)",
      cation: "Al³⁺",
      group: "Group III",
      flameTest: "No color",
      steps: [
        {
          reagent: "NH₄OH",
          observation: "White gelatinous ppt",
          color: "#f2f2f2",
          precipitate: true
        },
        {
          reagent: "NaOH (excess)",
          observation: "Dissolves forming sodium aluminate",
          color: "#e6f7ff",
          precipitate: false
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Aluminon",
          observation: "Red lake formation",
          color: "#ff4d4d"
        }
      ],
      equation: "Al(OH)₃ + NaOH → NaAlO₂",
      theory: "Aluminium hydroxide is amphoteric."
    },

    {
      title: "Chromium (Cr³⁺)",
      cation: "Cr³⁺",
      group: "Group III",
      flameTest: "Green",
      steps: [
        {
          reagent: "NH₄OH",
          observation: "Green ppt (Cr(OH)₃)",
          color: "#ccffcc",
          precipitate: true
        },
        {
          reagent: "H₂O₂ + NaOH",
          observation: "Yellow solution (chromate)",
          color: "#ffff66",
          precipitate: false
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Pb(CH₃COO)₂",
          observation: "Yellow ppt (PbCrO₄)",
          color: "#ffd700"
        }
      ],
      equation: "Cr³⁺ → CrO₄²⁻",
      theory: "Chromium oxidizes to chromate."
    }
  ],

  group4: [
    {
      title: "Zinc (Zn²⁺)",
      cation: "Zn²⁺",
      group: "Group IV",
      flameTest: "Bluish green",
      steps: [
        {
          reagent: "NaOH",
          observation: "White ppt Zn(OH)₂",
          color: "#f2f2f2",
          precipitate: true
        },
        {
          reagent: "Excess NaOH",
          observation: "Dissolves",
          color: "#e6f7ff",
          precipitate: false
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Co(NO₃)₂ + heat",
          observation: "Green residue",
          color: "#66cc66"
        }
      ],
      equation: "Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄]",
      theory: "Zinc hydroxide is amphoteric."
    },

    {
      title: "Nickel (Ni²⁺)",
      cation: "Ni²⁺",
      group: "Group IV",
      flameTest: "No color",
      steps: [
        {
          reagent: "NH₄OH",
          observation: "Green ppt",
          color: "#ccffcc",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "DMG",
          observation: "Bright red ppt",
          color: "#ff3333"
        }
      ],
      equation: "Ni²⁺ + DMG → red complex",
      theory: "Nickel forms dimethylglyoxime complex."
    },

    {
      title: "Cobalt (Co²⁺)",
      cation: "Co²⁺",
      group: "Group IV",
      flameTest: "Blue",
      steps: [
        {
          reagent: "NH₄OH",
          observation: "Bluish solution",
          color: "#cce6ff",
          precipitate: false
        }
      ],
      confirmatoryTests: [
        {
          reagent: "NaNO₂ + CH₃COOH",
          observation: "Yellow ppt",
          color: "#ffd700"
        }
      ],
      equation: "Cobaltinitrite formation",
      theory: "Forms complex ppt."
    },

    {
      title: "Manganese (Mn²⁺)",
      cation: "Mn²⁺",
      group: "Group IV",
      flameTest: "No color",
      steps: [
        {
          reagent: "H₂S",
          observation: "Flesh colored ppt",
          color: "#ffe0cc",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "NaBiO₃",
          observation: "Purple solution",
          color: "#800080"
        }
      ],
      equation: "Mn²⁺ → MnO₄⁻",
      theory: "Oxidation to permanganate."
    }
  ],

  group5: [
    {
      title: "Calcium (Ca²⁺)",
      cation: "Ca²⁺",
      group: "Group V",
      flameTest: "Brick red",
      steps: [
        {
          reagent: "(NH₄)₂CO₃",
          observation: "White ppt",
          color: "#f2f2f2",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Ammonium oxalate",
          observation: "White ppt",
          color: "#f2f2f2"
        }
      ],
      equation: "Ca²⁺ + CO₃²⁻ → CaCO₃↓",
      theory: "Calcium forms carbonate and oxalate."
    },

    {
      title: "Barium (Ba²⁺)",
      cation: "Ba²⁺",
      group: "Group V",
      flameTest: "Apple green",
      steps: [
        {
          reagent: "K₂CrO₄",
          observation: "Yellow ppt",
          color: "#ffd700",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "H₂SO₄",
          observation: "White ppt",
          color: "#f2f2f2"
        }
      ],
      equation: "Ba²⁺ + SO₄²⁻ → BaSO₄↓",
      theory: "Barium forms insoluble sulfate."
    },

    {
      title: "Strontium (Sr²⁺)",
      cation: "Sr²⁺",
      group: "Group V",
      flameTest: "Crimson red",
      steps: [
        {
          reagent: "SO₄²⁻",
          observation: "White ppt",
          color: "#f2f2f2",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Ammonium sulfate",
          observation: "White ppt",
          color: "#f2f2f2"
        }
      ],
      equation: "SrSO₄ formation",
      theory: "Strontium forms sulfate."
    }
  ],

  group6: [
    {
      title: "Ammonium (NH₄⁺)",
      cation: "NH₄⁺",
      group: "Group VI",
      flameTest: "No color",
      steps: [
        {
          reagent: "NaOH + heat",
          observation: "Ammonia gas evolved",
          color: "#e6f7ff",
          precipitate: false,
          gasEvolution: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "Red litmus",
          observation: "Turns blue",
          color: "#ff6666"
        }
      ],
      equation: "NH₄⁺ + OH⁻ → NH₃↑",
      theory: "Ammonia gas evolved."
    },

    {
      title: "Magnesium (Mg²⁺)",
      cation: "Mg²⁺",
      group: "Group VI",
      flameTest: "No color",
      steps: [
        {
          reagent: "Na₂HPO₄",
          observation: "White crystalline ppt",
          color: "#f2f2f2",
          precipitate: true
        }
      ],
      confirmatoryTests: [
        {
          reagent: "NH₄OH",
          observation: "White ppt",
          color: "#f2f2f2"
        }
      ],
      equation: "MgNH₄PO₄ formation",
      theory: "Magnesium ammonium phosphate forms."
    }
  ]
};
export const anionTests = [
  {
    title: "Carbonate (CO₃²⁻)",
    anion: "CO₃²⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "Brisk effervescence (CO₂)",
        color: "#e6f7ff",
        gasEvolution: true
      },
      {
        reagent: "Limewater",
        observation: "Turns milky",
        color: "#f2f2f2",
        precipitate: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "MgSO₄",
        observation: "White ppt",
        color: "#f2f2f2"
      }
    ],
    equation: "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O",
    theory: "Carbonates release CO₂ with acids."
  },

  {
    title: "Bicarbonate (HCO₃⁻)",
    anion: "HCO₃⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "Mild effervescence",
        color: "#e6f7ff",
        gasEvolution: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Heating",
        observation: "CO₂ evolved",
        color: "#e6f7ff"
      }
    ],
    equation: "2HCO₃⁻ → CO₂ + H₂O + CO₃²⁻",
    theory: "Decomposes on heating."
  },

  {
    title: "Sulfide (S²⁻)",
    anion: "S²⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "Rotten egg smell (H₂S)",
        color: "#e6f7ff",
        gasEvolution: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Lead acetate paper",
        observation: "Turns black",
        color: "#000000"
      }
    ],
    equation: "S²⁻ + 2H⁺ → H₂S↑",
    theory: "Hydrogen sulfide gas evolved."
  },

  {
    title: "Sulfite (SO₃²⁻)",
    anion: "SO₃²⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "SO₂ gas (pungent smell)",
        color: "#e6f7ff",
        gasEvolution: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "K₂Cr₂O₇",
        observation: "Orange to green",
        color: "#66cc66"
      }
    ],
    equation: "SO₃²⁻ + 2H⁺ → SO₂↑ + H₂O",
    theory: "Sulfur dioxide reduces dichromate."
  },

  {
    title: "Sulfate (SO₄²⁻)",
    anion: "SO₄²⁻",
    steps: [
      {
        reagent: "BaCl₂",
        observation: "White ppt",
        color: "#f2f2f2",
        precipitate: true
      },
      {
        reagent: "Dil. HCl",
        observation: "Insoluble",
        color: "#f2f2f2"
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Pb(NO₃)₂",
        observation: "White ppt",
        color: "#f2f2f2"
      }
    ],
    equation: "Ba²⁺ + SO₄²⁻ → BaSO₄↓",
    theory: "Forms insoluble barium sulfate."
  },

  {
    title: "Chloride (Cl⁻)",
    anion: "Cl⁻",
    steps: [
      {
        reagent: "AgNO₃",
        observation: "White curdy ppt",
        color: "#f2f2f2",
        precipitate: true
      },
      {
        reagent: "NH₄OH",
        observation: "Dissolves",
        color: "#e6f7ff"
      }
    ],
    confirmatoryTests: [
      {
        reagent: "HNO₃",
        observation: "Reappears",
        color: "#f2f2f2"
      }
    ],
    equation: "Ag⁺ + Cl⁻ → AgCl↓",
    theory: "Silver chloride dissolves in ammonia."
  },

  {
    title: "Bromide (Br⁻)",
    anion: "Br⁻",
    steps: [
      {
        reagent: "AgNO₃",
        observation: "Cream ppt",
        color: "#fff2cc",
        precipitate: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Cl₂ water",
        observation: "Orange color in organic layer",
        color: "#ff9933"
      }
    ],
    equation: "Ag⁺ + Br⁻ → AgBr↓",
    theory: "Forms cream silver bromide."
  },

  {
    title: "Iodide (I⁻)",
    anion: "I⁻",
    steps: [
      {
        reagent: "AgNO₃",
        observation: "Yellow ppt",
        color: "#ffd700",
        precipitate: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Cl₂ water",
        observation: "Violet color in organic layer",
        color: "#800080"
      }
    ],
    equation: "Ag⁺ + I⁻ → AgI↓",
    theory: "Forms yellow silver iodide."
  },

  {
    title: "Nitrate (NO₃⁻)",
    anion: "NO₃⁻",
    steps: [
      {
        reagent: "Conc. H₂SO₄ + FeSO₄",
        observation: "Brown ring",
        color: "#8b4513"
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Heating",
        observation: "Brown fumes (NO₂)",
        color: "#a52a2a"
      }
    ],
    equation: "NO₃⁻ → NO₂",
    theory: "Brown ring test confirms nitrate."
  },

  {
    title: "Nitrite (NO₂⁻)",
    anion: "NO₂⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "Brown fumes",
        color: "#a52a2a",
        gasEvolution: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "KI + starch",
        observation: "Blue color",
        color: "#0000ff"
      }
    ],
    equation: "NO₂⁻ → NO + NO₂",
    theory: "Nitrites oxidize iodide."
  },

  {
    title: "Acetate (CH₃COO⁻)",
    anion: "CH₃COO⁻",
    steps: [
      {
        reagent: "Dil. HCl",
        observation: "Vinegar smell",
        color: "#e6f7ff"
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Ethanol + H₂SO₄",
        observation: "Fruity smell (ester)",
        color: "#fff2cc"
      }
    ],
    equation: "CH₃COO⁻ + H⁺ → CH₃COOH",
    theory: "Esterification confirms acetate."
  },

  {
    title: "Phosphate (PO₄³⁻)",
    anion: "PO₄³⁻",
    steps: [
      {
        reagent: "Ammonium molybdate",
        observation: "Yellow ppt",
        color: "#ffd700",
        precipitate: true
      }
    ],
    confirmatoryTests: [
      {
        reagent: "Magnesia mixture",
        observation: "White ppt",
        color: "#f2f2f2"
      }
    ],
    equation: "PO₄³⁻ + ammonium molybdate → yellow ppt",
    theory: "Forms molybdate complex."
  }
];