import { useAuth } from '../../contexts/AuthContext';
import { ReactionSeeder } from '../components/ReactionSeeder';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database } from 'lucide-react';

export function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Simple admin check - you can add proper role-based access later
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-red-600">Access denied. Please sign in.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="w-8 h-8 text-blue-600" />
            Admin Panel
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seeder Card */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Database Setup</h2>
            <p className="text-gray-600 mb-6">
              Initialize the reactions database with all JEE syllabus reactions. This loads
              <strong> 100+ reactions</strong> from salt analysis and organic chemistry into Supabase.
            </p>
            <ReactionSeeder />
          </Card>

          {/* Info Card */}
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h2 className="text-2xl font-semibold mb-4">What Gets Seeded?</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-semibold text-blue-600">▪</span>
                <span>
                  <strong>Cation Tests:</strong> All 6 groups (Pb, Ag, Hg₂, Cu, Cd, Bi, As, Fe, Al, Cr,
                  Zn, Ni, Co, Mn, Ca, Ba, Sr)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-purple-600">▪</span>
                <span>
                  <strong>Anion Tests:</strong> All anion groups (Cl⁻, Br⁻, I⁻, SO₄²⁻, CO₃²⁻, etc.)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-green-600">▪</span>
                <span>
                  <strong>Organic Reactions:</strong> All reaction types (Haloalkanes, Alcohols,
                  Aldehydes, Ketones, Carboxylic Acids, Amines, Aromatic)
                </span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Note:</p>
              <p className="text-sm text-yellow-800">
                This operation only needs to be done once. After seeding, all reactions are available
                to all logged-in users.
              </p>
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8 p-8 bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-900">🎯 Quick Start</h2>
          <ol className="space-y-3 text-sm text-green-900 list-decimal list-inside">
            <li>Make sure Supabase tables are created (see SUPABASE_SETUP.md)</li>
            <li>Click the "Seed Now" button to populate the reactions table</li>
            <li>Wait for the success message (should take 10-30 seconds)</li>
            <li>Go back to the app - reactions will now load from database</li>
            <li>Users can now bookmark, mark complete, and view their progress</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
