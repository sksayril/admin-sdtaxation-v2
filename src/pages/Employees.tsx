import { useState } from 'react';
import { Search, Filter, UserPlus, Mail, Phone, Users } from 'lucide-react';
import { mockEmployees } from '../data/mockData';

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['all', ...Array.from(new Set(mockEmployees.map(emp => emp.department)))];

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'vacation':
        return 'bg-amber-100 text-amber-700';
      case 'on-leave':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage your team members and their information</p>
        </div>
        <button className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition shadow-lg hover:shadow-xl">
          <UserPlus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition bg-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-gradient-to-br from-white to-sky-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-sky-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(employee.status)}`}>
                  {employee.status.replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">{employee.position}</p>
                  <p className="text-xs text-gray-600">{employee.department}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <span className="truncate">{employee.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <span>{employee.phone}</span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Salary</p>
                    <p className="font-bold text-gray-900">${employee.salary.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Joined</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(employee.joinDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg font-medium hover:bg-sky-600 transition text-sm">
                  View Details
                </button>
                <button className="flex-1 bg-white text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition border border-gray-300 text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600">No employees found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Department Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {departments.filter(d => d !== 'all').map(dept => {
            const count = mockEmployees.filter(emp => emp.department === dept).length;
            return (
              <div key={dept} className="bg-gradient-to-br from-sky-50 to-white p-4 rounded-lg border border-sky-100">
                <p className="text-sm text-gray-600 mb-1">{dept}</p>
                <p className="text-2xl font-bold text-sky-600">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
