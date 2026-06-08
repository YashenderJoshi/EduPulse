export const mockStudents = [
  {
    id: 'STU001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    department: 'Computer Science',
    branch: 'CSE',
    year: 3,
    phone: '+91 9876543210',
    attendance: 87,
    feesStatus: 'Paid'
  },
  {
    id: 'STU002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    department: 'Electrical',
    branch: 'EE',
    year: 2,
    phone: '+91 9876543211',
    attendance: 92,
    feesStatus: 'Pending'
  },
  {
    id: 'STU003',
    name: 'Amit Kumar',
    email: 'amit@example.com',
    department: 'Mechanical',
    branch: 'ME',
    year: 4,
    phone: '+91 9876543212',
    attendance: 78,
    feesStatus: 'Paid'
  }
]

export const mockAttendanceData = [
  { date: '2024-01-15', subject: 'Data Structures', status: 'Present' },
  { date: '2024-01-15', subject: 'Operating Systems', status: 'Present' },
  { date: '2024-01-16', subject: 'Database Systems', status: 'Absent' },
  { date: '2024-01-16', subject: 'Computer Networks', status: 'Present' },
  { date: '2024-01-17', subject: 'Software Engineering', status: 'Present' },
]

export const mockFeesData = [
  { id: 1, type: 'Semester Fee', amount: 45000, status: 'Paid', dueDate: '2024-01-15' },
  { id: 2, type: 'Exam Fee', amount: 1500, status: 'Pending', dueDate: '2024-02-01' },
  { id: 3, type: 'Transport Fee', amount: 3000, status: 'Paid', dueDate: '2024-01-10' },
  { id: 4, type: 'Library Fee', amount: 500, status: 'Pending', dueDate: '2024-02-15' },
]

export const mockLeaveApplications = [
  {
    id: 1,
    reason: 'Medical Emergency',
    fromDate: '2024-01-20',
    toDate: '2024-01-22',
    status: 'Approved',
    remarks: 'Approved by HOD'
  },
  {
    id: 2,
    reason: 'Family Function',
    fromDate: '2024-02-05',
    toDate: '2024-02-06',
    status: 'Pending',
    remarks: ''
  }
]

export const mockNotifications = [
  {
    id: 1,
    title: 'Mid-term Exam Schedule Released',
    content: 'Mid-term examinations will commence from February 15th, 2024.',
    type: 'Exam',
    priority: 'High',
    date: '2024-01-25'
  },
  {
    id: 2,
    title: 'Library Renovation Notice',
    content: 'The central library will be closed for renovation from Feb 1-10.',
    type: 'Admin',
    priority: 'Medium',
    date: '2024-01-23'
  }
]

export const mockTimetable = [
  {
    day: 'Monday',
    periods: [
      { time: '9:00-10:00', subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101' },
      { time: '10:00-11:00', subject: 'Operating Systems', faculty: 'Prof. Johnson', room: 'CS-102' },
      { time: '11:15-12:15', subject: 'Database Systems', faculty: 'Dr. Brown', room: 'CS-103' },
      { time: '1:15-2:15', subject: 'Computer Networks', faculty: 'Prof. Davis', room: 'CS-104' },
    ]
  },
  {
    day: 'Tuesday',
    periods: [
      { time: '9:00-10:00', subject: 'Software Engineering', faculty: 'Dr. Wilson', room: 'CS-105' },
      { time: '10:00-11:00', subject: 'Web Development Lab', faculty: 'Prof. Miller', room: 'Lab-1' },
      { time: '11:15-12:15', subject: 'Algorithm Analysis', faculty: 'Dr. Taylor', room: 'CS-106' },
    ]
  }
]

export const mockFacultyData = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science',
    email: 'rajesh@edupulse.edu',
    phone: '+91 9876543213',
    designation: 'Professor',
    specialization: 'Data Science'
  },
  {
    id: 2,
    name: 'Prof. Sunita Sharma',
    department: 'Computer Science',
    email: 'sunita@edupulse.edu',
    phone: '+91 9876543214',
    designation: 'Associate Professor',
    specialization: 'Software Engineering'
  }
]

export const mockTransportRoutes = [
  {
    id: 'RT001',
    routeName: 'Sector 15 - College',
    driver: 'Ramesh Singh',
    stops: ['Sector 15', 'Metro Station', 'Market', 'College Gate'],
    timing: '7:30 AM - 8:15 AM',
    fare: 1200
  },
  {
    id: 'RT002',
    routeName: 'Railway Station - College',
    driver: 'Suresh Kumar',
    stops: ['Railway Station', 'Bus Stand', 'Hospital', 'College Gate'],
    timing: '7:45 AM - 8:30 AM',
    fare: 1500
  }
]

export const chartData = {
  attendance: [
    { month: 'Jan', percentage: 85 },
    { month: 'Feb', percentage: 78 },
    { month: 'Mar', percentage: 92 },
    { month: 'Apr', percentage: 88 },
    { month: 'May', percentage: 95 },
  ],
  fees: [
    { month: 'Jan', paid: 45000, pending: 5000 },
    { month: 'Feb', paid: 30000, pending: 15000 },
    { month: 'Mar', paid: 42000, pending: 3000 },
  ]
}