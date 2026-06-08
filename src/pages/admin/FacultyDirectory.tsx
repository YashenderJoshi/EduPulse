import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Plus, Search, Mail, Phone, Filter } from 'lucide-react'

import api from '../../api/axios'

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Badge } from '../../components/ui/badge'
import { Layout } from '../../components/common/Layout'

export function FacultyDirectory() {

  const [facultyList, setFacultyList] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    specialization: ''
  })

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/admin/faculty")
      setFacultyList(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post("/admin/faculty", formData)

      setShowAddModal(false)

      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        specialization: ''
      })

      fetchFaculty()

    } catch (err) {
      console.error(err)
    }
  }

  const filteredFaculty = facultyList.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout title="Faculty Directory">
      <div className="space-y-6">

        <div className="flex justify-between">
          <Input
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Faculty
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Faculty</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddFaculty} className="space-y-3">

                <Input placeholder="Name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                <Input placeholder="Email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <Input placeholder="Phone" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

                <Input placeholder="Department" value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })} />

                <Input placeholder="Designation" value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />

                <Input placeholder="Specialization" value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />

                <Button type="submit" className="w-full">
                  Save Faculty
                </Button>

              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {filteredFaculty.map((f, i) => (
            <Card key={i}>
              <CardContent className="p-4">

                <h3 className="font-semibold">{f.name}</h3>
                <p className="text-sm">{f.department}</p>

                <div className="text-sm mt-2">
                  {f.email} | {f.phone}
                </div>

                <Badge className="mt-2">
                  {f.designation}
                </Badge>

              </CardContent>
            </Card>
          ))}

        </div>

      </div>
    </Layout>
  )
}