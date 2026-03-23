import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ReactionCard } from "./components/ReactionCard";
import { cationTests, anionTests } from "./data/saltAnalysisData";
import { FlaskConical, TestTube2, Atom, BookOpen } from "lucide-react";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { organicReactions } from "./data/organicReactions";
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
<div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 dark:bg-none dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
<div className="flex items-center justify-between">

  {/* LEFT: Logo + Title */}
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
      <FlaskConical className="w-6 h-6 text-white" />
    </div>
    <div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ChemLab Interactive
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Interactive Chemistry Learning for JEE Students
      </p>
    </div>
  </div>

  {/* RIGHT: Dark Mode Toggle */}
  <button
    onClick={toggleDarkMode}
    className="px-4 py-2 rounded-lg border text-sm 
               bg-white text-black 
               dark:bg-gray-800 dark:text-white dark:border-gray-600"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>

</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid-cols-none justify-start gap-2 overflow-x-auto lg:grid lg:grid-cols-9 lg:justify-center lg:overflow-visible">
            <TabsTrigger value="overview" className="flex-none lg:flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="group1" className="flex-none lg:flex-1">Group I</TabsTrigger>
            <TabsTrigger value="group2" className="flex-none lg:flex-1">Group II</TabsTrigger>
            <TabsTrigger value="group3" className="flex-none lg:flex-1">Group III</TabsTrigger>
            <TabsTrigger value="group4" className="flex-none lg:flex-1">Group IV</TabsTrigger>
            <TabsTrigger value="group5" className="flex-none lg:flex-1">Group V</TabsTrigger>
            <TabsTrigger value="group6" className="flex-none lg:flex-1">Group VI</TabsTrigger>
            <TabsTrigger value="anions" className="flex-none lg:flex-1">
              <Atom className="w-4 h-4 mr-2" />
              Anions
            </TabsTrigger>
            <TabsTrigger value="organic" className="flex-none lg:flex-1">
              <TestTube2 className="w-4 h-4 mr-2" />
              Organic
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex-none lg:flex-1">Tips</TabsTrigger>
          </TabsList>
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
<Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600">           <h2 className="text-2xl font-bold mb-4">Welcome to Chemistry Lab</h2>
              <p className="text-lg opacity-90 mb-4">
                Master Chemical Reactions through interactive visualizations and step-by-step learning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab("group1")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveTab("group1");
                  }}
                >
  <TestTube2 className="w-8 h-8 mb-2" />
  <h3 className="font-semibold mb-2">Inorganic Analysis</h3>
  <p className="text-sm opacity-90">
    Learn systematic salt analysis and qualitative tests.
  </p>
</div>

<div
  className="bg-white dark:bg-gray-800 rounded-lg p-4 border cursor-pointer"
  role="button"
  tabIndex={0}
  onClick={() => setActiveTab("organic")}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") setActiveTab("organic");
  }}
>
  <Atom className="w-8 h-8 mb-2" />
  <h3 className="font-semibold mb-2">Organic Reactions</h3>
  <p className="text-sm opacity-90">
    Visualize key JEE organic reactions and mechanisms.
  </p>
</div>
              </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group1")}>              <Badge className="mb-3">Group I</Badge>
                <h3 className="font-semibold mb-2">Silver & Lead Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Precipitated by dilute HCl</p>
                <p className="text-xs text-gray-500 mt-2">Ag⁺, Pb²⁺, Hg₂²⁺</p>
              </Card>
<Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group2")}>            <Badge className="mb-3">Group II</Badge>
                <h3 className="font-semibold mb-2">Copper & Arsenic Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Precipitated by H₂S in acidic medium</p>
                <p className="text-xs text-gray-500 mt-2">Pb²⁺, Cu²⁺, Bi³⁺, Cd²⁺, Hg²⁺, As³⁺, Sb³⁺, Sn²⁺</p>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group3")}>
                <Badge className="mb-3">Group III</Badge>
                <h3 className="font-semibold mb-2">Iron & Aluminium Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Precipitated by NH₄OH in presence of NH₄Cl</p>
                <p className="text-xs text-gray-500 mt-2">Fe³⁺, Al³⁺, Cr³⁺</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
					border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group4")}>
  <Badge className="mb-3">Group IV</Badge>
  <h3 className="font-semibold mb-2">Zinc Group</h3>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Precipitated as sulfides in alkaline medium
  </p>
  <p className="text-xs text-gray-500 mt-2">
    Zn²⁺, Ni²⁺, Co²⁺, Mn²⁺
  </p>
</Card>

              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group5")}>
                <Badge className="mb-3">Group V</Badge>
                <h3 className="font-semibold mb-2">Calcium & Barium Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Precipitated by (NH₄)₂CO₃</p>
                <p className="text-xs text-gray-500 mt-2">Ca²⁺, Ba²⁺, Sr²⁺</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("group6")}>
  <Badge className="mb-3">Group VI</Badge>
  <h3 className="font-semibold mb-2">Magnesium & Ammonium</h3>
  <p className="text-sm text-gray-600 dark:text-gray-300">
    Identified by specific confirmatory tests
  </p>
  <p className="text-xs text-gray-500 mt-2">
    Mg²⁺, NH₄⁺
  </p>
</Card>

              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("anions")}>
                <h3 className="font-semibold mb-2">Anion Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Confirmatory tests for common anions</p>
                <p className="text-xs text-gray-500 mt-2">Cl⁻, SO₄²⁻, CO₃²⁻, NO₃⁻, S²⁻</p>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("organic")}>
            <Badge className="mb-3 bg-green-100 text-green-700">Organic Chemistry</Badge>
            <h3 className="font-semibold mb-2">Organic Reactions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Important reactions and mechanisms for JEE
            </p>
</Card>
<Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600" onClick={() => setActiveTab("tips")}>                <Badge className="mb-3 bg-green-600">Pro Tip</Badge>
                <h3 className="font-semibold mb-2">Interactive Learning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Click "Run Reaction" to see animated visualizations of each test!
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* Group I Cations */}
          <TabsContent value="group1" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group I - Silver Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations precipitated by dilute HCl as chlorides. These chlorides are sparingly soluble in water.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Pb²⁺</Badge>
                <Badge>Ag⁺</Badge>
                <Badge>Hg₂²⁺</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group1.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>

          {/* Group II Cations */}
          <TabsContent value="group2" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group II - Copper & Arsenic Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations precipitated by H₂S in acidic medium (dil. HCl). Divided into subgroups based on solubility in yellow ammonium sulfide.
              </p>
<div className="flex gap-2 flex-wrap">
  <Badge>IIA</Badge>
  <Badge>Pb²⁺</Badge>
  <Badge>Cu²⁺</Badge>
  <Badge>Bi³⁺</Badge>
  <Badge>Cd²⁺</Badge>
  <Badge>Hg²⁺</Badge>
</div>

<div className="flex gap-2 flex-wrap mt-2">
  <Badge>IIB</Badge>
  <Badge>As³⁺</Badge>
  <Badge>Sb³⁺</Badge>
  <Badge>Sn²⁺</Badge>
  <Badge>Sn⁴⁺</Badge>
</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group2.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>

          {/* Group III Cations */}
          <TabsContent value="group3" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group III - Iron & Aluminium Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations precipitated by NH₄OH in presence of NH₄Cl. The chloride prevents precipitation of Group V cations.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Fe³⁺</Badge>
                <Badge>Al³⁺</Badge>
                <Badge>Cr³⁺</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group3.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="group4" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group IV - Zinc Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations precipitated as sulfides in alkaline medium using H₂S.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Zn²⁺</Badge>
                <Badge>Ni²⁺</Badge>
                <Badge>Co²⁺</Badge>
                <Badge>Mn²⁺</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group4.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>
          {/* Group V Cations */}
          <TabsContent value="group5" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group V - Calcium & Barium Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations precipitated by ammonium carbonate in neutral or slightly alkaline medium.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Ca²⁺</Badge>
                <Badge>Ba²⁺</Badge>
                <Badge>Sr²⁺</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group5.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="group6" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Group VI - Magnesium & Ammonium Group</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cations that do not precipitate in earlier groups. Identified by specific tests.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge>Mg²⁺</Badge>
                <Badge>NH₄⁺</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cationTests.group6.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
          </TabsContent>
          {/* Anions */}
          <TabsContent value="anions" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Anion Analysis</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Anions are identified through specific confirmatory tests. There is no systematic group separation like cations.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-purple-100 text-purple-700">Cl⁻</Badge>
                <Badge className="bg-purple-100 text-purple-700">SO₄²⁻</Badge>
                <Badge className="bg-purple-100 text-purple-700">CO₃²⁻</Badge>
                <Badge className="bg-purple-100 text-purple-700">NO₃⁻</Badge>
                <Badge className="bg-purple-100 text-purple-700">S²⁻</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {anionTests.map((test, index) => (
                <ReactionCard key={index} {...test} />
              ))}
            </div>
            </TabsContent>
            <TabsContent value="organic" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                <h2 className="text-xl font-bold mb-2">Organic Chemistry</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All major JEE Organic reactions including substitution, elimination,
                  oxidation, reduction and named reactions.
                </p>
              </div>
<div className="flex flex-col md:flex-row gap-4">
  
  {/* Search */}
  <input
    type="text"
    placeholder="Search reactions..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border rounded-lg px-4 py-2 w-full"
  />

  {/* Filter */}
  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="all">All</option>
    <option value="Haloalkanes">Haloalkanes</option>
    <option value="Alcohols">Alcohols</option>
    <option value="Aldehydes/Ketones">Aldehydes/Ketones</option>
    <option value="Carboxylic Acids">Carboxylic Acids</option>
    <option value="Amines">Amines</option>
    <option value="Aromatic">Aromatic</option>
  </select>

</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {organicReactions
                  .filter((reaction) => {
                    const matchesSearch = reaction.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());

                    const matchesFilter =
                      filter === "all" || reaction.category === filter || !reaction.category;

                    return matchesSearch && matchesFilter;
                  })
                  .map((reaction, index) => (
                          <ReactionCard key={index} {...reaction} />
))}

                </div>
          </TabsContent>
          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                 bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-bold mb-4">JEE Exam Tips for Salt Analysis</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">⚗️ Systematic Approach</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Always follow the group-wise separation sequence. Don't skip groups even if you "think" you know the answer.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-2">🎨 Color Memory</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Memorize precipitate colors: White (AgCl, PbCl₂, BaSO₄), Black (PbS, CuS), Yellow (PbCrO₄, BaCrO₄), 
                    Reddish-brown (Fe(OH)₃), Blue ([Cu(NH₃)₄]²⁺)
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold mb-2">📝 Important Equations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Focus on confirmatory tests. For JEE, know brown ring test (NO₃⁻), Prussian blue (Fe³⁺), 
                    flame tests (Ca²⁺ - brick red, Ba²⁺ - apple green)
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold mb-2">⚠️ Common Mistakes</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Confusing white precipitates - check solubility in hot water (PbCl₂) or NH₃ (AgCl)</li>
                    <li>Missing the importance of NH₄Cl in Group III - it prevents Group V precipitation</li>
                    <li>Forgetting amphoteric nature of Al(OH)₃ and Zn(OH)₂</li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold mb-2">🔬 Practical Exam Tips</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
                    <li>Use clean test tubes and wash thoroughly between tests</li>
                    <li>Add reagents drop by drop - excess can reverse reactions</li>
                    <li>Note all color changes immediately</li>
                    <li>Perform confirmatory tests even if preliminary tests are positive</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    ⭐ High-Yield Topics for JEE
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Brown ring test mechanism and equation</li>
                    <li>• Amphoteric hydroxides (Al, Zn, Pb, Sn)</li>
                    <li>• Complex formation (Cu-NH₃, Ag-NH₃, Fe-CN)</li>
                    <li>• Solubility products and their applications</li>
                    <li>• Flame test colors and their origin</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
<footer className="bg-white dark:bg-gray-900 
                   border-t dark:border-gray-700 
                   mt-12 py-6">        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>💡 Practice regularly and visualize each reaction for better retention</p>
          <p className="mt-2">Best of luck with your JEE preparation!</p>
        </div>
      </footer>
    </div>
  );
}