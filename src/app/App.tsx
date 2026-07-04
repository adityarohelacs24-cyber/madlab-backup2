import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ReactionCard } from "./components/ReactionCard";
import { cationTests, anionTests } from "./data/saltAnalysisData";
import { FlaskConical, TestTube2, Atom, BookOpen, LogOut, User, Heart, CheckCircle2, Database, RefreshCw } from "lucide-react";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { organicReactions } from "./data/organicReactions";
import { useUserProgress } from "../hooks/useUserProgress";
import { useReactions } from "../hooks/useReactions";
import { seedReactions } from "../lib/seedReactions";
import type { ReactionContent } from "./types/chemistry";
// Custom state-based dropdown menu replaces Radix dropdown to ensure compatibility inside WebView

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dailyGoal, setDailyGoal] = useState("5");
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
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

  // ── Database-first loading ───────────────────────────────────────────────
  const { reactions: dbReactions, loading: dbLoading, error: dbError, getByCategory } = useReactions();

  /**
   * Normalize a raw Supabase row into the shape ReactionCard expects.
   * The `products` JSONB column holds the full ReactionContent object;
   * the `observations` JSONB column holds the ReactionStep array.
   */
  const normalizeRow = (row: ReturnType<typeof getByCategory>[number]) => ({
    id: row.id,
    title: row.title,
    cation: row.reactants ?? undefined,
    anion: row.reactants ?? undefined,
    theory: row.description ?? undefined,
    equation: row.equations ?? undefined,
    // JSONB arrays come back as parsed objects; cast to known types
    steps: (Array.isArray(row.observations) ? row.observations : []) as any[],
    confirmatoryTests: undefined as any,
    category: row.category,
    group: row.group_number != null ? `Group ${row.group_number}` : undefined,
    // Rich ReactionContent object stored in `products`
    content: (row.products && !Array.isArray(row.products)
      ? row.products
      : undefined) as ReactionContent | undefined,
  });

  // Local fallback arrays (used when DB is empty or errored)
  const localGroup1 = useMemo(() => cationTests.group1.map((r, i) => ({ ...r, id: `cation_group1_${i + 1}` })), []);
  const localGroup2 = useMemo(() => cationTests.group2.map((r, i) => ({ ...r, id: `cation_group2_${i + 1}` })), []);
  const localGroup3 = useMemo(() => cationTests.group3.map((r, i) => ({ ...r, id: `cation_group3_${i + 1}` })), []);
  const localGroup4 = useMemo(() => cationTests.group4.map((r, i) => ({ ...r, id: `cation_group4_${i + 1}` })), []);
  const localGroup5 = useMemo(() => cationTests.group5.map((r, i) => ({ ...r, id: `cation_group5_${i + 1}` })), []);
  const localGroup6 = useMemo(() => cationTests.group6.map((r, i) => ({ ...r, id: `cation_group6_${i + 1}` })), []);
  const localAnions = useMemo(() => anionTests.map((r, i) => ({ ...r, id: `anion_${i + 1}` })), []);
  const localOrganics = useMemo(() => organicReactions.map((r, i) => ({
    ...r,
    id: `organic_${r.category.replace(/\s+/g, '_').toLowerCase()}_${i + 1}`
  })), []);

  // Use DB data when available, else fall back to local files
  const usingDB = !dbLoading && !dbError && dbReactions.length > 0;

  const group1Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 1).map(normalizeRow) : localGroup1;
  const group2Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 2).map(normalizeRow) : localGroup2;
  const group3Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 3).map(normalizeRow) : localGroup3;
  const group4Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 4).map(normalizeRow) : localGroup4;
  const group5Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 5).map(normalizeRow) : localGroup5;
  const group6Mapped = usingDB ? getByCategory('cation').filter(r => r.group_number === 6).map(normalizeRow) : localGroup6;
  const anionsMapped = usingDB ? getByCategory('anion').map(normalizeRow) : localAnions;
  const organicsMapped = usingDB ? getByCategory('organic').map(normalizeRow) : localOrganics;

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

  // ── Seed handler ─────────────────────────────────────────────────────────
  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const result = await seedReactions();
      if (result.success) {
        setSeedResult(`✅ Seeded ${result.count} reactions to Supabase! Refreshing…`);
        // Reload page after short delay so useReactions re-fetches
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setSeedResult('❌ Seeding failed. Check console for details.');
      }
    } finally {
      setSeeding(false);
    }
  };

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

  // Show a full-page loading spinner while Supabase is fetching
  if (dbLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900">
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl animate-pulse">
          <FlaskConical className="w-10 h-10 text-white" />
        </div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 animate-pulse">Loading reactions from Supabase…</p>
        <p className="text-sm text-gray-400">Connecting to database</p>
      </div>
    );
  }

  return (
<div className="min-h-screen transition-colors duration-500 text-gray-900 dark:text-gray-100 font-sans">
      {/* DB Status Banner */}
      {!usingDB && !dbLoading && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm font-medium">
              <Database className="w-4 h-4 shrink-0" />
              {dbError
                ? `Database error: ${dbError} — using local data`
                : 'Database is empty — using local data. Seed Supabase to enable backend-first mode.'}
            </div>
            <div className="flex items-center gap-2">
              {seedResult && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{seedResult}</span>
              )}
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {seeding ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Database className="w-3.5 h-3.5" />
                )}
                {seeding ? 'Seeding…' : 'Seed Database'}
              </button>
            </div>
          </div>
        </div>
      )}
      {usingDB && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800/50 px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
            <Database className="w-3.5 h-3.5" />
            Live data from Supabase ({dbReactions.length} reactions loaded)
          </div>
        </div>
      )}
      {/* Header */}
      <header className="glass sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
<div className="flex items-center justify-between">

  {/* LEFT: Logo + Title */}
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
      <FlaskConical className="w-6 h-6 text-white" />
    </div>
    <div>
      <h1 className="text-2xl font-bold text-gradient font-heading tracking-tight">
        Reacto Interactive
      </h1>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
        PREMIUM CHEMISTRY LEARNING
      </p>
    </div>
  </div>

  {/* RIGHT: Dark Mode Toggle + User Menu */}
  <div className="flex items-center gap-3">
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all
                 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm
                 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
      title="Toggle Theme"
    >
      {darkMode ? "☀️" : "🌙"}
      <span className="hidden sm:inline font-medium">{darkMode ? "Light" : "Dark"}</span>
    </button>

    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 transition-all
                 hover:bg-red-50 hover:border-red-300 hover:shadow-sm
                 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:border-red-800"
      title="Sign Out"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline font-medium">Sign Out</span>
    </button>

    <div className="relative ml-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full w-10 h-10 p-0 overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all duration-300"
        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-inner">
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
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 z-50 py-2 text-sm text-gray-700 dark:text-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
              <p className="font-medium truncate text-gray-800 dark:text-gray-100">
                {user?.email}
              </p>
            </div>
            <button
              onClick={() => {
                setProfileDropdownOpen(false);
                setSettingsOpen(true);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 cursor-pointer transition-colors"
            >
              <User className="w-4 h-4 text-gray-400" />
              Profile & Settings
            </button>
            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
            <button
              onClick={() => {
                setProfileDropdownOpen(false);
                handleSignOut();
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 flex items-center gap-3 cursor-pointer font-medium transition-colors"
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
          <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Progress stats card */}
            <Card className="glass-card p-8 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-heading font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Your Learning Journey</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 font-medium">
                  Keep practicing reactions to master JEE Chemistry.
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/40 dark:border-gray-700/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{totalReactions}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2 uppercase tracking-wider">Total</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/40 dark:border-gray-700/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">{completedCount}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2 uppercase tracking-wider">Completed</div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/40 dark:border-gray-700/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-4xl font-extrabold text-pink-500 dark:text-pink-400">{bookmarkedCount}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-2 uppercase tracking-wider">Saved</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-200">
                    <span className="uppercase tracking-widest text-xs">Syllabus Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <h2 className="text-2xl font-heading font-bold mb-4">Welcome to Reacto</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-medium">
                Master Chemical Reactions through interactive visualizations and step-by-step learning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 border border-white/50 dark:border-gray-700/50 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all duration-300 group"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab("group1")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveTab("group1");
                  }}
                >
                  <TestTube2 className="w-10 h-10 mb-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2">Inorganic Analysis</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Learn systematic salt analysis and qualitative tests.
                  </p>
                </div>

                <div
                  className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-6 border border-white/50 dark:border-gray-700/50 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-300 group"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab("organic")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveTab("organic");
                  }}
                >
                  <Atom className="w-10 h-10 mb-4 text-purple-500 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2">Organic Reactions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
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