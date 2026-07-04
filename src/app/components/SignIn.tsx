import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { FlaskConical, AlertCircle } from 'lucide-react';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="glass-card w-full max-w-md p-10 border-0">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 mb-4">
            <FlaskConical className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-gradient tracking-tight">
            Reacto
          </h1>
        </div>

        <h2 className="text-2xl font-heading font-bold text-center mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 font-medium">Sign in to continue your learning journey</p>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold rounded-xl h-11"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}
