import { useState } from 'react';
import { seedReactions } from '../../lib/seedReactions';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export function ReactionSeeder() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  const handleSeed = async () => {
    setLoading(true);
    setStatus('idle');
    const result = await seedReactions();

    if (result.success) {
      setStatus('success');
      setCount(result.count || 0);
      setMessage(`✨ Successfully seeded ${result.count} reactions into Supabase!`);
    } else {
      setStatus('error');
      setMessage(`❌ Error: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2">Seed Reactions Database</h3>
      <p className="text-sm text-gray-600 mb-4">
        Load all JEE syllabus reactions into Supabase. This only needs to be done once.
      </p>

      {status === 'success' && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{message}</AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSeed} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Seeding...
          </>
        ) : (
          '🌱 Seed Now'
        )}
      </Button>

      {count > 0 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Total reactions seeded: <strong>{count}</strong>
        </p>
      )}
    </Card>
  );
}
