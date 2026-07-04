import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { FlaskConical, AlertCircle, CheckCircle } from 'lucide-react';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200', textClass: 'text-gray-400' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) {
      return { score, label: 'Weak 🔴', color: 'bg-red-500 w-1/3', textClass: 'text-red-500' };
    } else if (score <= 4) {
      return { score, label: 'Medium 🟡', color: 'bg-yellow-500 w-2/3', textClass: 'text-yellow-600 dark:text-yellow-400' };
    } else {
      return { score, label: 'Strong 🟢', color: 'bg-green-500 w-full', textClass: 'text-green-600 dark:text-green-400' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !password || !fullName || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const strengthObj = getPasswordStrength(password);
    if (strengthObj.score <= 2) {
      setError('Password is too weak! Please choose a medium or strong password containing uppercase, numbers, and symbols.');
      return;
    }

    setLoading(true);

    const result = await signUp(email, password, fullName);

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="glass-card w-full max-w-md p-10 border-0">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 mb-4">
            <FlaskConical className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-gradient tracking-tight">
            Reacto
          </h1>
        </div>

        <h2 className="text-2xl font-heading font-bold text-center mb-2 text-gray-900 dark:text-white">Create Account</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 font-medium">Join us to start mastering chemistry</p>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Account created! Redirecting to sign in...
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>

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
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Password Strength:</span>
                  <span className={`font-semibold ${strength.textClass}`}>{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color}`}></div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Tip: Use at least 8 characters, numbers, uppercase letters, and symbols.
                </p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold rounded-xl h-11"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-8 font-medium">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
