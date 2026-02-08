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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Black Bar */}
      <div className="bg-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <div>All - in -One Software CRM, ERP, HR, PAYROLL</div>
          <div>Technical Support : 9993556791  sdtaxtion@gmail.com</div>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="bg-white py-4 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">S.D.Taxation Associate</h1>
        </div>
      </div>

      {/* Main Content Area - Three Column Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Column - What's New */}
        <div className="flex-1 bg-white border-r border-gray-200">
          <div className="bg-teal-600 text-white py-3 px-4">
            <h2 className="font-semibold">What's New</h2>
          </div>
          <div className="p-6 min-h-[500px] bg-white">
            {/* Black Card Section */}
            <div className="bg-black rounded-lg shadow-lg p-6 mb-4">
              <h3 className="text-white text-lg font-semibold mb-3">Latest Updates</h3>
              <div className="space-y-3 text-white text-sm">
                <p className="text-gray-300">• System maintenance scheduled for this weekend</p>
                <p className="text-gray-300">• New features added to the dashboard</p>
                <p className="text-gray-300">• Updated user guidelines available</p>
              </div>
            </div>
            {/* Additional content area */}
            <div className="text-gray-600">
              <p className="text-sm">Latest updates and announcements will appear here.</p>
            </div>
          </div>
        </div>

        {/* Middle Column - Separator */}
        <div className="w-64 bg-gray-200 relative flex flex-col border-l border-r border-gray-300">
          {/* Red Bar at Top */}
          <div className="h-12 bg-red-600 flex-shrink-0 border-b-2 border-red-700">
          </div>
          
          {/* Empty Content Area */}
          <div className="flex-1 bg-gray-200">
          </div>
        </div>

        {/* Right Column - Establishment Login */}
        <div className="flex-1 bg-white">
          <div className="bg-teal-600 text-white py-3 px-4">
            <h2 className="font-semibold">Establishment Login</h2>
          </div>
          <div className="p-6 bg-white">
            {/* Login Form Card Container */}
            <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 max-w-md mx-auto">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-4">
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
                <div className="flex items-center gap-2">
                  <div 
                    className="cursor-pointer"
                    onClick={refreshCaptcha}
                    title="Click to refresh captcha"
                  >
                    <Eye className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-lg bg-white flex items-center justify-center p-2">
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
                <div className="relative">
                  <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="captcha"
                    type="text"
                    value={formData.captcha}
                    onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                    placeholder="Enter captcha"
                    required
                  />
                </div>
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
                  <button type="button" className="hover:text-gray-800 font-medium">
                    Forgot Password
                  </button>
                  <span className="mx-2">|</span>
                  <button type="button" className="hover:text-gray-800 font-medium">
                    Unlock Account
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with S.D. Taxation Associate and Contact Info Marquee */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* S.D. Taxation Associate */}
            <div className="text-xl md:text-2xl font-bold">
              S.D. Taxation Associate
            </div>
            
            {/* Contact Info Marquee */}
            <div className="flex-1 overflow-hidden">
              <div className="marquee-container">
                <div className="marquee-content">
                  <span className="inline-block whitespace-nowrap">
                    Technical Support: 9993556791 | Email:  sdtaxtion@gmail.com | All-in-One Software CRM, ERP, HR, PAYROLL
                  </span>
                  <span className="inline-block whitespace-nowrap ml-8">
                    Technical Support: 9993556791 | Email:  sdtaxtion@gmail.com | All-in-One Software CRM, ERP, HR, PAYROLL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
