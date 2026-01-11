import { FileText, Download, TrendingUp, TrendingDown } from 'lucide-react';

export default function Reports() {
  const reports = [
    {
      id: 1,
      name: 'Employee Performance Report',
      date: '2024-12-15',
      type: 'Performance',
      size: '2.4 MB',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Monthly Attendance Summary',
      date: '2024-12-01',
      type: 'Attendance',
      size: '1.8 MB',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Project Completion Analysis',
      date: '2024-11-28',
      type: 'Projects',
      size: '3.2 MB',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Salary Disbursement Report',
      date: '2024-11-15',
      type: 'Finance',
      size: '4.1 MB',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and download various reports and analytics</p>
        </div>
        <button className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition shadow-lg hover:shadow-xl">
          <FileText className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Reports</h3>
            <FileText className="w-5 h-5 text-sky-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">48</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">This Month</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-sm text-green-600 mt-2">+8% increase</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Downloads</h3>
            <Download className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-600 mt-2">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Storage Used</h3>
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">24 GB</p>
          <p className="text-sm text-gray-600 mt-2">of 100 GB</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 hover:bg-gray-50 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">{report.date}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">{report.type}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {report.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
