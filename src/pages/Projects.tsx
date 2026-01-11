import { Briefcase, Plus } from 'lucide-react';
import { mockProjects, mockEmployees } from '../data/mockData';

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your ongoing projects</p>
        </div>
        <button className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-2">Team Members</p>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 4).map((empId) => {
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
                  {project.team.length > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      +{project.team.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="font-bold text-gray-900">${project.cost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.payment === 'Done'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {project.payment}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-sky-50 text-sky-600 py-2 rounded-lg font-medium hover:bg-sky-100 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
