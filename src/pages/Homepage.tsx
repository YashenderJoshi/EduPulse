import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Bell, 
  Bus,
  BarChart3,
  CheckCircle,
  Users,
  Shield
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const features = [
  {
    icon: UserCheck,
    title: 'Smart Attendance',
    description: 'Real-time attendance tracking with automated reports and alerts for low attendance.'
  },
  {
    icon: CreditCard,
    title: 'Fee Management',
    description: 'Streamlined fee collection, payment tracking, and automated receipt generation.'
  },
  {
    icon: FileText,
    title: 'Leave Management',
    description: 'Digital leave applications with approval workflows and status tracking.'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Instant notifications for important updates, announcements, and deadlines.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive insights and reports for better academic management.'
  },
  {
    icon: Bus,
    title: 'Transport System',
    description: 'Route management, tracking, and seamless transportation coordination.'
  }
]

const stats = [
  { label: 'Active Students', value: '2,500+', icon: Users },
  { label: 'Faculty Members', value: '150+', icon: GraduationCap },
  { label: 'Attendance Rate', value: '94%', icon: CheckCircle },
  { label: 'System Uptime', value: '99.9%', icon: Shield }
]

export function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edu Pulse x DRDO</h1>
              <p className="text-xs text-gray-500">College Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/student/login">
              <Button variant="outline" size="sm">
                Student Login
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button size="sm">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionizing <span className="text-blue-600">Education</span> Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Streamline your college operations with our comprehensive management system. 
            From attendance tracking to fee management, everything in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Admin Portal
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sincere thanks to DRDO for giving me the opportunity to build the EduPulse Student Portal and College Management System
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools designed to enhance the educational experience for both students and administrators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your College Management?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using Edu Pulse to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50">
                  Register as Student
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50">
                  Access Admin Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Edu Pulse</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 Edu Pulse X DRDO. Empowering education through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}