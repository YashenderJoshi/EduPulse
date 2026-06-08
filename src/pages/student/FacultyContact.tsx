import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Mail, Phone, MapPin, Filter } from 'lucide-react'

import api from '../../api/axios'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Layout } from '../../components/common/Layout'

type Faculty = {
  id?: string
  name: string
  department: string
  email: string
  phone: string
  designation: string
  specialization: string
}

export default function FacultyContact() {

  const [facultyData, setFacultyData] = useState<Faculty[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {

      const res = await api.get("/students/faculty")   // ✅ FIXED FINAL

      if (Array.isArray(res.data)) {
        setFacultyData(res.data)
      } else {
        setFacultyData([])
      }

    } catch (err) {
      console.error("Faculty fetch failed:", err)
      setFacultyData([])
    }
  }

  const departments = ['All', ...Array.from(new Set(facultyData.map(f => f.department)))]

  const filteredFaculty = facultyData.filter(faculty => {

    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      departmentFilter === 'All' || faculty.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  return (
    <Layout title="Faculty Contacts">
      <div className="space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Faculty Directory
            </h1>

            <p className="text-gray-500">
              Connect with faculty members across departments
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>

              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {facultyData.length}
              </div>
              <p className="text-sm text-gray-600">Total Faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {departments.length - 1}
              </div>
              <p className="text-sm text-gray-600">Departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {facultyData.filter(f => f.designation?.includes('Professor')).length}
              </div>
              <p className="text-sm text-gray-600">Professors</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {filteredFaculty.length}
              </div>
              <p className="text-sm text-gray-600">Showing</p>
            </CardContent>
          </Card>

        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Users className="h-5 w-5" />
              Faculty Members
            </CardTitle>

            <CardDescription>
              Contact information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {filteredFaculty.map((faculty, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
                >

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <span className="font-semibold text-blue-600">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>

                    <div className="flex-1">

                      <h3 className="font-semibold mb-1">
                        {faculty.name}
                      </h3>

                      <Badge variant="outline" className="mb-3">
                        {faculty.designation}
                      </Badge>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">

                        <div className="flex gap-2">
                          <MapPin className="h-4 w-4" />
                          {faculty.department}
                        </div>

                        <div className="flex gap-2">
                          <Mail className="h-4 w-4" />
                          {faculty.email}
                        </div>

                        <div className="flex gap-2">
                          <Phone className="h-4 w-4" />
                          {faculty.phone}
                        </div>

                      </div>

                      <p className="text-xs text-gray-500 mb-4">
                        Specialization: {faculty.specialization}
                      </p>

                      <div className="flex gap-2">

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(`mailto:${faculty.email}`)}
                        >
                          Email
                        </Button>

                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => window.open(`tel:${faculty.phone}`)}
                        >
                          Call
                        </Button>

                      </div>

                    </div>
                  </div>

                </motion.div>
              ))}

              {filteredFaculty.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">
                    No faculty found
                  </h3>
                </div>
              )}

            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  )
}