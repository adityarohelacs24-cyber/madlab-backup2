import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { TestTube } from "./TestTube";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Play, RotateCcw, Heart, CheckCircle2, Eye, BookOpen, FlaskConical, FileCode, Sparkles, Award, XCircle, Zap } from "lucide-react";
import { useState } from "react";
import { ReactionContent } from "../types/chemistry";

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
  id: string;
  title: string;
  cation?: string;
  anion?: string;
  group?: string;
  steps: ReactionStep[];
  confirmatoryTests?: ConfirmatoryTest[];
  equation?: string;
  theory?: string;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  onToggleBookmark?: () => void;
  onToggleCompleted?: () => void;
  content?: ReactionContent;
}

export function ReactionCard({
  id,
  title,
  cation,
  anion,
  group,
  steps,
  confirmatoryTests,
  equation,
  theory,
  isBookmarked = false,
  isCompleted = false,
  onToggleBookmark,
  onToggleCompleted,
  content,
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
    <Card className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0">
      <div className="space-y-4 p-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-gray-50">{title}</h3>
            <div className="flex gap-2 mt-3 flex-wrap">
              {group && <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">{group}</Badge>}
              {cation && <Badge className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium">{cation}</Badge>}
              {anion && <Badge className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium">{anion}</Badge>}
            </div>
          </div>
          {onToggleBookmark && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleBookmark}
              className="text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 p-2 h-10 w-10 rounded-full shrink-0 transition-colors"
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Reaction"}
            >
              <Heart className={`w-5 h-5 transition-transform ${isBookmarked ? "fill-pink-500 text-pink-500 scale-110" : "hover:scale-110"}`} />
            </Button>
          )}
        </div>

        {/* Visualization */}
        <div className="bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50
                dark:from-indigo-950/20 dark:via-gray-900/20 dark:to-purple-950/20
                rounded-2xl p-8 min-h-[240px] border border-white/40 dark:border-gray-800/40 shadow-inner relative overflow-hidden">
          {/* Subtle grid pattern inside visualization */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="relative z-10 flex justify-center items-end gap-6 h-full mt-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  currentStep === index ? "scale-125 -translate-y-4" : "opacity-40 scale-90"
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
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handlePlay}
            disabled={isAnimating}
            size="default"
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold rounded-xl"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Reaction
          </Button>
          {onToggleCompleted && (
            <Button
              onClick={onToggleCompleted}
              size="default"
              className={`rounded-xl transition-all duration-300 font-medium border-2 ${isCompleted 
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50" 
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"}`}
              variant="outline"
            >
              <CheckCircle2 className={`w-4 h-4 transition-transform ${isCompleted ? "fill-emerald-600/20 text-emerald-600 dark:text-emerald-400 scale-110 mr-1.5" : "mr-2"}`} />
              {isCompleted ? "Completed" : "Mark Done"}
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" size="icon"
            className="rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm bg-white dark:bg-gray-800 w-10 h-10">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Details */}
        <Accordion type="single" collapsible className="w-full space-y-2 mt-4 border-0">
          {content && content.observations ? (
            <>
              {/* Observation & Inference */}
              <AccordionItem value="observation_inference" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-sm">Observation & Inference</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="space-y-3">
                    <div className="bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-sm shrink-0">OBSERVATION</span>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{content.observations?.observation}</p>
                      </div>
                      <div className="flex items-start gap-2 text-xs border-t border-indigo-100/30 dark:border-indigo-900/20 pt-2.5">
                        <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-sm shrink-0">INFERENCE</span>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{content.observations?.inference}</p>
                      </div>
                    </div>
                    <div className="flex gap-2.5 p-3.5 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
                      <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-0.5">Explanation</span>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content.observations?.explanation}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Confirmatory Test */}
              <AccordionItem value="confirmatory_test" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold text-sm">Confirmatory Test</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="space-y-3.5">
                    <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30 rounded-xl p-3.5">
                      <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider block mb-2">Procedure</span>
                      <ol className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 pl-4 list-decimal">
                        {content.confirmatoryTest?.procedure?.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-900/20 rounded-xl p-3">
                        <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">OBSERVATION</span>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{content.confirmatoryTest?.observation}</p>
                      </div>
                      <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/30 dark:border-emerald-900/20 rounded-xl p-3">
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">CONCLUSION</span>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{content.confirmatoryTest?.conclusion}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Chemical Equation */}
              <AccordionItem value="chemical_equation" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-sm">Chemical Equation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="space-y-3">
                    <div className="bg-slate-900 text-slate-100 dark:bg-black/40 border border-slate-800 dark:border-gray-800 rounded-xl p-3.5 font-mono text-xs whitespace-pre-wrap leading-relaxed relative overflow-hidden shadow-inner">
                      <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-bold font-sans select-none tracking-widest uppercase">Molecular Equation</div>
                      {content.equation?.molecular}
                    </div>
                    {content.equation?.ionic && (
                      <div className="bg-slate-900 text-slate-100 dark:bg-black/40 border border-slate-800 dark:border-gray-800 rounded-xl p-3.5 font-mono text-xs whitespace-pre-wrap leading-relaxed relative overflow-hidden shadow-inner">
                        <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-bold font-sans select-none tracking-widest uppercase">Net Ionic Equation</div>
                        {content.equation.ionic}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Detailed Theory */}
              <AccordionItem value="detailed_theory" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-sm">Detailed Theory</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="space-y-3">
                    <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/20 rounded-xl p-3.5 text-xs">
                      <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">Principle</span>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content.theory?.principle}</p>
                    </div>
                    <div className="bg-purple-50/30 dark:bg-purple-950/10 border border-purple-100/30 dark:border-purple-900/20 rounded-xl p-3.5 text-xs">
                      <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">Mechanism</span>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content.theory?.mechanism}</p>
                    </div>
                    <div className="bg-pink-50/30 dark:bg-pink-950/10 border border-pink-100/30 dark:border-pink-900/20 rounded-xl p-3.5 text-xs">
                      <span className="font-bold text-pink-700 dark:text-pink-300 block mb-1">Reason for Observation</span>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content.theory?.observationReason}</p>
                    </div>
                    {content.theory?.mnemonic && (
                      <div className="bg-amber-50/30 dark:bg-amber-950/10 border border-amber-100/30 dark:border-amber-900/20 rounded-xl p-3.5 text-xs">
                        <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">Mnemonic</span>
                        <p className="text-gray-600 dark:text-gray-400 italic">"{content.theory.mnemonic}"</p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* JEE Exam Notes */}
              <AccordionItem value="jee_notes" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-sm">JEE Exam Notes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="bg-amber-50/60 dark:bg-amber-950/10 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-xl p-4 text-xs">
                    <ul className="list-disc pl-4 space-y-1.5 text-gray-700 dark:text-gray-300 font-medium">
                      {content.theory?.examPoints?.map((pt, idx) => (
                        <li key={idx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Common Mistakes */}
              <AccordionItem value="common_mistakes" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-2">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold text-sm">Common Mistakes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="bg-rose-50/70 dark:bg-rose-950/10 border-l-4 border-rose-400 dark:border-rose-600 rounded-r-xl p-4 space-y-2 text-xs">
                    {content.theory?.commonMistakes?.map((mistake, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        <span className="shrink-0 text-rose-500">❌</span>
                        <p>{mistake}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Quick Revision */}
              <AccordionItem value="quick_revision" className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900/30 mb-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-sm">Quick Revision</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="bg-emerald-50/60 dark:bg-emerald-950/15 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl p-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-0.5">Observation</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{content.observations.observation}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-0.5">Inference</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{content.observations.inference}</span>
                      </div>
                      <div className="pt-2 border-t border-emerald-100/30 dark:border-emerald-900/20">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-0.5">Confirmatory Reagent</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{content.confirmatoryTest.procedure[content.confirmatoryTest.procedure.length - 1] || 'Specific reagent'}</span>
                      </div>
                      <div className="pt-2 border-t border-emerald-100/30 dark:border-emerald-900/20">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-0.5">Key Concept</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{content.theory.principle.split('.')[0] || 'Qualitative test'}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </>
          ) : (
            <>
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
            </>
          )}
        </Accordion>
      </div>
    </Card>
  );
}