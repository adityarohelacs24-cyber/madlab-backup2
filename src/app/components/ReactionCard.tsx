import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TestTube } from "./TestTube";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ReactionStep {
  reagent: string;
  observation: string;
  color?: string;
  precipitate?: boolean;
  precipitateColor?: string;
  gasEvolution?: boolean;
}

interface ConfirmatoryTest {
  reagent: string;
  observation: string;
  color?: string;
}

interface ReactionCardProps {
  title: string;
  cation?: string;
  anion?: string;
  group?: string;
  steps: ReactionStep[];
  confirmatoryTests?: ConfirmatoryTest[];
  equation?: string;
  theory?: string;
}

export function ReactionCard({
  title,
  cation,
  anion,
  group,
  steps,
  confirmatoryTests,
  equation,
  theory,
}: ReactionCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handlePlay = () => {
    setIsAnimating(true);
    setCurrentStep(0);

    steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, index * 2000);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, steps.length * 2000);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700
                 text-gray-900 dark:text-gray-100">
      <div className="space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex gap-2 mt-2">
              {group && <Badge variant="secondary">{group}</Badge>}
              {cation && <Badge className="bg-blue-100 text-blue-700">{cation}</Badge>}
              {anion && <Badge className="bg-purple-100 text-purple-700">{anion}</Badge>}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-gradient-to-b from-blue-50 to-white
                dark:from-gray-700 dark:to-gray-800
                rounded-lg p-6 min-h-[200px]">
          <div className="flex justify-center items-end gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentStep === index ? "scale-110" : "opacity-60"
                }`}
              >
                <TestTube
                  label={step.reagent}
                  color={step.color}
                  precipitate={step.precipitate}
                  precipitateColor={step.precipitateColor}
                  gasEvolution={step.gasEvolution}
                  isAnimating={isAnimating && currentStep >= index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            onClick={handlePlay}
            disabled={isAnimating}
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Reaction
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm"
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Details */}
        <Accordion type="single" collapsible>

          {/* Observations */}
          <AccordionItem value="observations">
            <AccordionTrigger className="text-gray-700 dark:text-gray-300">Observations</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`text-sm p-2 rounded ${
                      currentStep === index ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">{step.reagent}:</span>{" "}
                    <span className="text-gray-600 dark:text-gray-400">{step.observation}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Confirmatory Tests */}
          {confirmatoryTests && (
            <AccordionItem value="confirmatory">
              <AccordionTrigger className="text-gray-700 dark:text-gray-300">Confirmatory Tests</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {confirmatoryTests.map((test, index) => (
                    <div key={index} className="text-sm p-2 rounded bg-purple-50 dark:bg-purple-900/20">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{test.reagent}:</span>{" "}
                      <span className="text-gray-600 dark:text-gray-400">{test.observation}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Equation */}
          {equation && (
            <AccordionItem value="equation">
              <AccordionTrigger className="text-gray-700 dark:text-gray-300">Chemical Equation</AccordionTrigger>
              <AccordionContent>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded font-mono text-sm whitespace-pre-line text-gray-800 dark:text-gray-300">
                  {equation}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Theory */}
          {theory && (
            <AccordionItem value="theory">
              <AccordionTrigger className="text-gray-700 dark:text-gray-300">Theory</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{theory}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </Card>
  );
}