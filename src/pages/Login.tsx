import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, Check, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Function to generate random captcha
const generateCaptcha = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Add spaces randomly for better readability
  return result.split('').join(' ');
};

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: '',
  });
  const [captchaText, setCaptchaText] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const captchaCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate initial captcha
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
  }, []);

  useEffect(() => {
    // Draw captcha on canvas
    if (captchaCanvasRef.current && captchaText) {
      const canvas = captchaCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set background
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw captcha text with some distortion
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add some random rotation and position variation
        const chars = captchaText.split(' ');
        chars.forEach((char, index) => {
          ctx.save();
          ctx.translate((index + 1) * (canvas.width / (chars.length + 1)), canvas.height / 2);
          ctx.rotate((Math.random() - 0.5) * 0.3);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        });
      }
    }
  }, [captchaText]);

  if (isAuthenticated) {
    // If already logged in, go straight to dashboard
    navigate('/dashboard');
  }

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      captcha: '',
    });
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      return;
    }

    // Validate captcha on frontend (remove spaces for comparison)
    const enteredCaptcha = formData.captcha.replace(/\s/g, '').toUpperCase();
    const expectedCaptcha = captchaText.replace(/\s/g, '').toUpperCase();
    
    if (enteredCaptcha !== expectedCaptcha) {
      setError('Invalid captcha. Please try again.');
      const newCaptcha = generateCaptcha();
      setCaptchaText(newCaptcha);
      setFormData({ ...formData, captcha: '' });
      return;
    }

    setSubmitting(true);
    try {
      // Send username (as email), password, and verified captcha to backend
      await login(formData.username.trim(), formData.password, enteredCaptcha, false);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to login. Please try again.';
      setError(message);
      // Regenerate captcha on error
      const newCaptcha = generateCaptcha();
      setCaptchaText(newCaptcha);
      setFormData({ ...formData, captcha: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
    setFormData({ ...formData, captcha: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-green-50">
      <div className="w-full max-w-md">
        <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-green-600 text-white py-4 px-6 text-center">
            <h1 className="text-xl font-bold">S.D. Taxation Associate</h1>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Username Field */}
              <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Captcha Display */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Captcha
                </label>
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <div className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-center">
                    <canvas
                      ref={captchaCanvasRef}
                      width={200}
                      height={40}
                      className="cursor-pointer"
                      onClick={refreshCaptcha}
                      title="Click to refresh captcha"
                    />
                  </div>
                </div>
              </div>

              {/* Enter Captcha Field */}
              <div className="space-y-1">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                  Enter Captcha
                </label>
                <input
                  id="captcha"
                  type="text"
                  value={formData.captcha}
                  onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                  placeholder="Enter captcha"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Check className="w-5 h-5" />
                  {submitting ? 'Signing In...' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>

              {/* Links */}
              <div className="text-center pt-2">
                <div className="text-sm text-gray-600">
                  <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                    Forgot Password
                  </button>
                  <span className="mx-2">|</span>
                  <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                    Unlock Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
