import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ReactionCard } from "./components/ReactionCard";
import { cationTests, anionTests } from "./data/saltAnalysisData";
import { FlaskConical, TestTube2, Atom, BookOpen, LogOut, User, Heart, CheckCircle2 } from "lucide-react";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { organicReactions } from "./data/organicReactions";
import { useUserProgress } from "../hooks/useUserProgress";
// Custom state-based dropdown menu replaces Radix dropdown to ensure compatibility inside WebView

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dailyGoal, setDailyGoal] = useState("5");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const {
    progress,
    loading: progressLoading,
    toggleBookmark,
    markAsCompleted,
    isBookmarked,
    isCompleted
  } = useUserProgress();

  // Mapped reactions with consistent IDs
  const group1Mapped = cationTests.group1.map((r, i) => ({ ...r, id: `cation_group1_${i + 1}` }));
  const group2Mapped = cationTests.group2.map((r, i) => ({ ...r, id: `cation_group2_${i + 1}` }));
  const group3Mapped = cationTests.group3.map((r, i) => ({ ...r, id: `cation_group3_${i + 1}` }));
  const group4Mapped = cationTests.group4.map((r, i) => ({ ...r, id: `cation_group4_${i + 1}` }));
  const group5Mapped = cationTests.group5.map((r, i) => ({ ...r, id: `cation_group5_${i + 1}` }));
  const group6Mapped = cationTests.group6.map((r, i) => ({ ...r, id: `cation_group6_${i + 1}` }));
  const anionsMapped = anionTests.map((r, i) => ({ ...r, id: `anion_${i + 1}` }));
  const organicsMapped = organicReactions.map((r, i) => ({
    ...r,
    id: `organic_${r.category.replace(/\s+/g, '_').toLowerCase()}_${i + 1}`
  }));

  const allReactions = [
    ...group1Mapped,
    ...group2Mapped,
    ...group3Mapped,
    ...group4Mapped,
    ...group5Mapped,
    ...group6Mapped,
    ...anionsMapped,
    ...organicsMapped
  ];

  const totalReactions = allReactions.length;
  const completedCount = Array.from(progress.values()).filter(p => p.completed).length;
  const bookmarkedCount = Array.from(progress.values()).filter(p => p.bookmarked).length;
  const completionPercentage = totalReactions > 0 ? Math.round((completedCount / totalReactions) * 100) : 0;

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
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
        Reacto Interactive
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Interactive Chemistry Learning for JEE Students
      </p>
    </div>
  </div>

  {/* RIGHT: Dark Mode Toggle + User Menu */}
  <div className="flex items-center gap-3">
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-lg border text-sm 
                 bg-white text-black 
                 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>

    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full w-10 h-10 p-0 overflow-hidden"
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
      </Button>
      
      {profileDropdownOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-40 cursor-default" 
            onClick={() => setProfileDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 py-1 text-sm text-gray-700 dark:text-gray-200 animate-in fade-in slide-in-from-top-1 duration-100">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 font-medium truncate text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
            <button
              onClick={() => {
                setProfileDropdownOpen(false);
                setSettingsOpen(true);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-400" />
              Profile & Settings
            </button>
            <hr className="border-gray-100 dark:border-gray-700" />
            <button
              onClick={() => {
                setProfileDropdownOpen(false);
                handleSignOut();
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 flex items-center gap-2 cursor-pointer font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  </div>

</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start gap-2 overflow-x-auto lg:flex lg:flex-wrap lg:justify-center">
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
            <TabsTrigger value="bookmarks" className="flex-none lg:flex-1 text-red-500 dark:text-red-400 font-semibold">
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Bookmarks ({bookmarkedCount})
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex-none lg:flex-1">Tips</TabsTrigger>
          </TabsList>
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Progress stats card */}
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg border-0">
              <h2 className="text-2xl font-bold mb-2">Your Learning Progress</h2>
              <p className="text-blue-100 mb-6">
                Keep practicing reactions to master JEE Chemistry.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-3xl font-extrabold">{totalReactions}</div>
                  <div className="text-xs text-blue-100 font-medium mt-1">Total Reactions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-3xl font-extrabold">{completedCount}</div>
                  <div className="text-xs text-blue-100 font-medium mt-1">Completed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div className="text-3xl font-extrabold">{bookmarkedCount}</div>
                  <div className="text-xs text-blue-100 font-medium mt-1">Bookmarked</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Syllabus Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500 ease-out" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer 
                             bg-white dark:bg-gray-800 
                             border border-gray-200 dark:border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Welcome to Reacto</h2>
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
              {group1Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
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
              {group2Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
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
              {group3Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Group IV Cations */}
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
              {group4Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
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
              {group5Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Group VI Cations */}
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
              {group6Mapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
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
              {anionsMapped.map((test) => (
                <ReactionCard 
                  key={test.id} 
                  {...test} 
                  isBookmarked={isBookmarked(test.id)}
                  isCompleted={isCompleted(test.id)}
                  onToggleBookmark={() => toggleBookmark(test.id)}
                  onToggleCompleted={() => markAsCompleted(test.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Organic Chemistry */}
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
              {organicsMapped
                .filter((reaction) => {
                  const matchesSearch = reaction.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                  const matchesFilter =
                    filter === "all" || reaction.category === filter || !reaction.category;

                  return matchesSearch && matchesFilter;
                })
                .map((reaction) => (
                  <ReactionCard 
                    key={reaction.id} 
                    {...reaction} 
                    isBookmarked={isBookmarked(reaction.id)}
                    isCompleted={isCompleted(reaction.id)}
                    onToggleBookmark={() => toggleBookmark(reaction.id)}
                    onToggleCompleted={() => markAsCompleted(reaction.id)}
                  />
                ))}
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-2">Bookmarked Reactions</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your saved reactions for quick revision and review.
              </p>
            </div>
            {allReactions.filter((r) => isBookmarked(r.id)).length === 0 ? (
              <Card className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-lg font-medium">No bookmarked reactions yet</p>
                <p className="text-sm mt-1">Click the heart icon on any reaction card to save it here.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allReactions
                  .filter((reaction) => isBookmarked(reaction.id))
                  .map((reaction) => (
                    <ReactionCard 
                      key={reaction.id} 
                      {...reaction} 
                      isBookmarked={true}
                      isCompleted={isCompleted(reaction.id)}
                      onToggleBookmark={() => toggleBookmark(reaction.id)}
                      onToggleCompleted={() => markAsCompleted(reaction.id)}
                    />
                  ))}
              </div>
            )}
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

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Profile & Settings
              </h2>
              <button 
                onClick={() => setSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* User Details */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User Account</h3>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800 space-y-1.5">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Email:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">User ID:</span>
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{user?.id}</span>
                  </div>
                </div>
              </div>

              {/* Daily Goal Settings */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Study Goal</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-300">Daily Practice Target:</label>
                  <select
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="3">3 reactions / day (Casual)</option>
                    <option value="5">5 reactions / day (Standard)</option>
                    <option value="10">10 reactions / day (Serious)</option>
                    <option value="20">20 reactions / day (JEE Prep Mode!)</option>
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your current daily target is <strong className="text-blue-500">{dailyGoal}</strong> reactions.
                  </p>
                </div>
              </div>

              {/* Theme Mode Option */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Appearance</h3>
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Dark Interface Theme</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {darkMode ? "🌙 Dark Theme Enabled" : "☀️ Light Theme Enabled"}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
              <Button 
                onClick={() => setSettingsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save & Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}