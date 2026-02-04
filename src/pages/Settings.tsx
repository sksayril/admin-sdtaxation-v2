import { User, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useTheme, type ColorTheme } from '../context/ThemeContext';

const themeButtonClasses = {
  sky: 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-500',
  blue: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
  green: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
  purple: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500',
  orange: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500',
  rose: 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-500',
};

const themeIconClasses = {
  sky: 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400',
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  rose: 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400',
};

const themeInputClasses = {
  sky: 'focus:ring-sky-500',
  blue: 'focus:ring-blue-500',
  green: 'focus:ring-green-500',
  purple: 'focus:ring-purple-500',
  orange: 'focus:ring-orange-500',
  rose: 'focus:ring-rose-500',
};

const themeToggleClasses = {
  sky: 'peer-focus:ring-sky-300 peer-checked:bg-sky-500',
  blue: 'peer-focus:ring-blue-300 peer-checked:bg-blue-500',
  green: 'peer-focus:ring-green-300 peer-checked:bg-green-500',
  purple: 'peer-focus:ring-purple-300 peer-checked:bg-purple-500',
  orange: 'peer-focus:ring-orange-300 peer-checked:bg-orange-500',
  rose: 'peer-focus:ring-rose-300 peer-checked:bg-rose-500',
};

export default function Settings() {
  const { themeMode, colorTheme, setThemeMode, setColorTheme } = useTheme();

  const colorOptions: { value: ColorTheme; name: string; preview: string }[] = [
    { value: 'sky', name: 'Sky Blue', preview: 'bg-sky-500' },
    { value: 'blue', name: 'Blue', preview: 'bg-blue-500' },
    { value: 'green', name: 'Green', preview: 'bg-green-500' },
    { value: 'purple', name: 'Purple', preview: 'bg-purple-500' },
    { value: 'orange', name: 'Orange', preview: 'bg-orange-500' },
    { value: 'rose', name: 'Rose', preview: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${themeIconClasses[colorTheme]} rounded-lg flex items-center justify-center`}>
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="Eliza"
                    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Hart"
                    className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="eliza.hart@company.com"
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                <input
                  type="text"
                  defaultValue="Senior Manager"
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                />
              </div>

              <button className={`${themeButtonClasses[colorTheme]} text-white px-6 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2`}>
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${themeIconClasses[colorTheme]} rounded-lg flex items-center justify-center`}>
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Email Notifications', description: 'Receive email updates about your account' },
                { label: 'Push Notifications', description: 'Receive push notifications on your device' },
                { label: 'SMS Notifications', description: 'Receive SMS updates for important events' },
                { label: 'Weekly Reports', description: 'Get weekly summary reports via email' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                    <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 ${themeToggleClasses[colorTheme]} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${themeIconClasses[colorTheme]} rounded-lg flex items-center justify-center`}>
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}
                />
              </div>

              <button className={`${themeButtonClasses[colorTheme]} text-white px-6 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2`}>
                Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${themeIconClasses[colorTheme]} rounded-lg flex items-center justify-center`}>
                <Palette className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                <div className="space-y-2">
                  {(['Light', 'Dark', 'Auto'] as const).map((theme) => {
                    const themeValue = theme.toLowerCase() as 'light' | 'dark' | 'auto';
                    const isSelected = themeMode === themeValue;
                    return (
                      <label
                        key={theme}
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition ${
                          isSelected
                            ? 'bg-sky-50 dark:bg-sky-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                      <input
                        type="radio"
                        name="theme"
                          checked={isSelected}
                          onChange={() => setThemeMode(themeValue)}
                        className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                      />
                        <span className="text-gray-700 dark:text-gray-300">{theme}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Theme
                    </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((option) => {
                    const isSelected = colorTheme === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setColorTheme(option.value)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? `${option.preview.replace('bg-', 'border-')} ring-2 ring-offset-2 ${option.preview}`
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full ${option.preview} ${
                              isSelected ? 'ring-2 ring-offset-2 ring-sky-500 dark:ring-sky-400' : ''
                            }`}
                          />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {option.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className={`absolute top-1 right-1 w-4 h-4 ${option.preview} rounded-full flex items-center justify-center`}>
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 ${themeIconClasses[colorTheme]} rounded-lg flex items-center justify-center`}>
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Language</h2>
            </div>

            <select className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 ${themeInputClasses[colorTheme]} focus:border-transparent outline-none`}>
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
