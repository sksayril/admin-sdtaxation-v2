import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme, type ColorTheme } from '../context/ThemeContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Theme class mappings
const themeClasses = {
  sky: {
    gradient: 'from-sky-600 via-sky-700 to-slate-900',
    textActive: 'text-sky-700',
    bgDot: 'bg-sky-600',
    borderAvatar: 'border-sky-200',
  },
  blue: {
    gradient: 'from-blue-600 via-blue-700 to-slate-900',
    textActive: 'text-blue-700',
    bgDot: 'bg-blue-600',
    borderAvatar: 'border-blue-200',
  },
  green: {
    gradient: 'from-green-600 via-green-700 to-slate-900',
    textActive: 'text-green-700',
    bgDot: 'bg-green-600',
    borderAvatar: 'border-green-200',
  },
  purple: {
    gradient: 'from-purple-600 via-purple-700 to-slate-900',
    textActive: 'text-purple-700',
    bgDot: 'bg-purple-600',
    borderAvatar: 'border-purple-200',
  },
  orange: {
    gradient: 'from-orange-600 via-orange-700 to-slate-900',
    textActive: 'text-orange-700',
    bgDot: 'bg-orange-600',
    borderAvatar: 'border-orange-200',
  },
  rose: {
    gradient: 'from-rose-600 via-rose-700 to-slate-900',
    textActive: 'text-rose-700',
    bgDot: 'bg-rose-600',
    borderAvatar: 'border-rose-200',
  },
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const { colorTheme } = useTheme();
  const theme = themeClasses[colorTheme];

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setSidebarOpen(false)} />

      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-b ${theme.gradient} border-r border-slate-900/40 transform duration-200 ease-in-out transition-[width,transform] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          width: sidebarCollapsed ? 80 : 256,
        }}
      >
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-lg">
                {user?.company?.company_name
                  ? user.company.company_name.charAt(0).toUpperCase()
                  : 'A'}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="transition-opacity duration-200">
                <h1 className="font-bold text-white truncate">
                  {user?.company?.company_name ?? 'Admin'}
                </h1>
                <p className="text-xs text-sky-100 truncate">
                  {user?.adminArea
                    ? `Area: ${user.adminArea}`
                    : 'Management Panel'}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sky-50 hover:bg-white/20 transition"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sky-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-3 lg:p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? `bg-white ${theme.textActive} shadow-lg`
                    : 'text-sky-50 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
                {isActive && (
                  <div className={`ml-auto w-2 h-2 ${theme.bgDot} rounded-full`} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl font-medium text-red-100 hover:bg-white/10 hover:text-red-50 w-full transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && (loggingOut ? 'Logging out...' : 'Logout')}
          </button>
        </div>
      </aside>

      <div
        className={`transition-[padding] duration-200 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for employee/project"
                  className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-64 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt={user?.fullname ?? 'User avatar'}
                  className={`w-10 h-10 rounded-full object-cover border-2 ${theme.borderAvatar}`}
                />
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {user?.fullname ?? user?.username ?? 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.role ?? 'Admin'}
                    {user?.company?.company_name ? ` • ${user.company.company_name}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
