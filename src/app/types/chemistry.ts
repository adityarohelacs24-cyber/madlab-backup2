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

export interface DetailedTheory {
  principle: string;
  mechanism: string;
  observationReason: string;
  examPoints: string[];
  commonMistakes: string[];
  mnemonic?: string;
}

export interface ReactionContent {
  observations: {
    observation: string;
    inference: string;
    explanation: string;
  };

  confirmatoryTest: {
    procedure: string[];
    observation: string;
    conclusion: string;
  };

  equation: {
    molecular: string;
    ionic?: string;
  };

  theory: DetailedTheory;
}
