export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar: string;
  status: 'active' | 'on-leave' | 'vacation';
  salary: number;
  joinDate: string;
  phone: string;
}

export interface Project {
  id: string;
  name: string;
  team: string[];
  cost: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  payment: 'Done' | 'Pending';
}

export const mockEmployees: Employee[] = [
  {
    id: 'E001',
    name: 'Eliza Hart',
    email: 'eliza.hart@company.com',
    position: 'Senior Manager',
    department: 'Management',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 95000,
    joinDate: '2020-01-15',
    phone: '+1 234-567-8901'
  },
  {
    id: 'E002',
    name: 'Jennie Duncan',
    email: 'jennie.duncan@company.com',
    position: 'Product Designer',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 75000,
    joinDate: '2021-03-20',
    phone: '+1 234-567-8902'
  },
  {
    id: 'E003',
    name: 'Francis Trim',
    email: 'francis.trim@company.com',
    position: 'Full Stack Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'vacation',
    salary: 85000,
    joinDate: '2019-11-10',
    phone: '+1 234-567-8903'
  },
  {
    id: 'E004',
    name: 'Katherine Webster',
    email: 'katherine.webster@company.com',
    position: 'Frontend Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'on-leave',
    salary: 72000,
    joinDate: '2021-06-01',
    phone: '+1 234-567-8904'
  },
  {
    id: 'E005',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    position: 'Backend Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 82000,
    joinDate: '2020-08-15',
    phone: '+1 234-567-8905'
  },
  {
    id: 'E006',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'UX Designer',
    department: 'Design',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 70000,
    joinDate: '2021-02-10',
    phone: '+1 234-567-8906'
  },
  {
    id: 'E007',
    name: 'David Martinez',
    email: 'david.martinez@company.com',
    position: 'DevOps Engineer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 88000,
    joinDate: '2020-04-22',
    phone: '+1 234-567-8907'
  },
  {
    id: 'E008',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 68000,
    joinDate: '2019-09-05',
    phone: '+1 234-567-8908'
  },
  {
    id: 'E009',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    position: 'QA Engineer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 65000,
    joinDate: '2021-07-18',
    phone: '+1 234-567-8909'
  },
  {
    id: 'E010',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    status: 'active',
    salary: 72000,
    joinDate: '2020-12-01',
    phone: '+1 234-567-8910'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'A012',
    name: 'Paytm bank app',
    team: ['E001', 'E002', 'E003', 'E005'],
    cost: 34220,
    status: 'Completed',
    payment: 'Done'
  },
  {
    id: 'D372',
    name: 'Canva Dashboard',
    team: ['E002', 'E004', 'E006'],
    cost: 58000,
    status: 'In Progress',
    payment: 'Pending'
  },
  {
    id: 'Z931',
    name: 'Amazon website',
    team: ['E003', 'E005', 'E007'],
    cost: 5000,
    status: 'Completed',
    payment: 'Done'
  },
  {
    id: 'B445',
    name: 'Tesla Redesign',
    team: ['E001', 'E002', 'E006'],
    cost: 42000,
    status: 'In Progress',
    payment: 'Pending'
  },
  {
    id: 'C678',
    name: 'Spotify Mobile',
    team: ['E004', 'E005', 'E009'],
    cost: 28500,
    status: 'Completed',
    payment: 'Done'
  }
];

export const dashboardStats = {
  totalEmployees: 375,
  maleEmployees: 267,
  femaleEmployees: 108,
  totalProjects: 90,
  attendance: 359,
  lateArrivals: 12,
  absent: 4,
  currentlyRunningProjects: 13,
  projectData: [
    { month: 'Jan', upcoming: 8, inProgress: 12, completed: 15 },
    { month: 'Feb', upcoming: 6, inProgress: 14, completed: 18 },
    { month: 'Mar', upcoming: 10, inProgress: 16, completed: 12 },
    { month: 'Apr', upcoming: 7, inProgress: 11, completed: 20 },
    { month: 'May', upcoming: 9, inProgress: 15, completed: 14 },
    { month: 'Jun', upcoming: 5, inProgress: 13, completed: 22 },
    { month: 'Jul', upcoming: 11, inProgress: 17, completed: 16 },
    { month: 'Aug', upcoming: 8, inProgress: 14, completed: 19 },
  ]
};
