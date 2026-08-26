import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';
import muleLogo from '@/data/ucm_mule_logo.png';
import { apiFetch, ApiError } from '@/lib/api';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('This reset link is missing a token. Request a new one from the sign-in page.');
      return;
    }

    setLoading(true);
    try {
      const data = await apiFetch<{ message?: string }>('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      });
      setSuccess(data.message || 'Password updated. You can sign in now.');
      setTimeout(() => navigate('/auth'), 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md relative">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/auth')}
          className="text-white/80 hover:text-white flex items-center gap-2 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(0,0,0,0.8)] ring-2 ring-white/15">
              <img src={muleLogo} alt="MuleHacks" className="w-16 h-16 object-contain" />
            </div>
            <h2 className="text-3xl text-white mb-2">Set a new password</h2>
            <p className="text-white/80">Choose a password for your Mule Hacks account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/90 mb-2">New password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-black/30 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/90 mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-black/30 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-black/30 border border-white/20 rounded-lg p-3 text-white text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-black/30 border border-white/20 rounded-lg p-3 text-white text-sm">
                {success}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#6b0000] hover:bg-[#8b0000] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(107,0,0,0.5)]"
            >
              {loading ? 'Please wait...' : 'Update password'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
