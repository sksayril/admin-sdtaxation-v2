import { Users, Calendar, Clock } from 'lucide-react';
import { dashboardStats, mockProjects, mockEmployees } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const themeIconClasses = {
  sky: 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400',
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
  rose: 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400',
};

export default function Dashboard() {
  const { colorTheme } = useTheme();
  const malePercentage = Math.round((dashboardStats.maleEmployees / dashboardStats.totalEmployees) * 100);
  const femalePercentage = Math.round((dashboardStats.femaleEmployees / dashboardStats.totalEmployees) * 100);

  const onVacationEmployees = mockEmployees.filter(emp => emp.status === 'vacation');
  const onLeaveEmployees = mockEmployees.filter(emp => emp.status === 'on-leave');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Eliza Hart!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          The salary of Kathryn Webster is pending since 15 December.{' '}
          <button className={`font-medium ${
            colorTheme === 'sky' ? 'text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300' :
            colorTheme === 'blue' ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300' :
            colorTheme === 'green' ? 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300' :
            colorTheme === 'purple' ? 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300' :
            colorTheme === 'orange' ? 'text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300' :
            'text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300'
          }`}>Learn More</button>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Attendance</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.attendance}</p>
            </div>
            <div className={`${themeIconClasses[colorTheme]} p-3 rounded-lg`}>
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Late</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.lateArrivals}</p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Absent</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.absent}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Total Employees</h2>
              <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalEmployees}</span>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="24"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#0ea5e9"
                    strokeWidth="24"
                    fill="transparent"
                    strokeDasharray={`${malePercentage * 5.024} ${100 * 5.024}`}
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#f472b6"
                    strokeWidth="24"
                    fill="transparent"
                    strokeDasharray={`${femalePercentage * 5.024} ${100 * 5.024}`}
                    strokeDashoffset={`-${malePercentage * 5.024}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{dashboardStats.femaleEmployees}</span>
                  <span className="text-sm text-gray-600">Female</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-sky-500"></div>
                <div>
                  <p className="text-sm text-gray-600">Male</p>
                  <p className="font-semibold text-gray-900">{dashboardStats.maleEmployees}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                <div>
                  <p className="text-sm text-gray-600">Female</p>
                  <p className="font-semibold text-gray-900">{dashboardStats.femaleEmployees}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Total Projects</h2>
                <p className="text-sm text-gray-600">
                  Currently running {dashboardStats.currentlyRunningProjects} projects
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalProjects}</span>
            </div>

            <div className="flex items-end justify-between h-48 gap-2">
              {dashboardStats.projectData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gray-200 rounded-t"
                      style={{ height: `${data.upcoming * 2}px` }}
                    ></div>
                    <div
                      className="w-full bg-amber-400 rounded-t"
                      style={{ height: `${data.inProgress * 2}px` }}
                    ></div>
                    <div
                      className="w-full bg-sky-500 rounded-t"
                      style={{ height: `${data.completed * 2}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <span className="text-sm text-gray-600">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm opacity-90 mb-1">Happy Birthday</p>
                <p className="font-semibold">Jennie Duncan</p>
                <p className="text-xs opacity-90">It's birthday today</p>
              </div>
              <div className="text-3xl">🎉</div>
            </div>
            <button className="w-full bg-white text-sky-600 py-2 rounded-lg font-semibold hover:bg-sky-50 transition">
              Wish Her
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 mb-4">Employees on Holiday</h3>
            <div className="space-y-4">
              {onVacationEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{emp.name}</p>
                    <p className="text-sm text-gray-600">Month is not good</p>
                  </div>
                  <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                    Only Today
                  </span>
                </div>
              ))}
              {onLeaveEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{emp.name}</p>
                    <p className="text-sm text-gray-600">Going for trip with family</p>
                  </div>
                  <span className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                    14° to 18°
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-sky-50 rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-center mb-4">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Help"
                className="w-48 h-48 object-contain"
              />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-center">Need help?</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Do you have any problem while using the Admin Management panel?
            </p>
            <button className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition">
              Contact Now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Project Summary</h2>
            <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Project Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Team</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Project Cost</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Project Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{project.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((empId) => {
                        const emp = mockEmployees.find(e => e.id === empId);
                        return emp ? (
                          <img
                            key={empId}
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            title={emp.name}
                          />
                        ) : null;
                      })}
                      {project.team.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">${project.cost.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      project.status === 'Completed' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      project.payment === 'Done'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {project.payment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
