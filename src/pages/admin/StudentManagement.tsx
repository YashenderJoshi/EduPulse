import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit , Eye } from "lucide-react";

import { Layout } from "../../components/common/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

import api from "../../api/axios";

export function StudentManagement() {

  const [students, setStudents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
  });

  /* ================= FETCH ================= */

  const fetchStudents = async () => {
    try {

      const res = await api.get("/admin/students");

      setStudents(res.data || []);

    } catch (err) {

      console.error("Fetch students failed:", err);

    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= ADD ================= */

  const addStudent = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      await api.post("/admin/students", formData);

      await fetchStudents();

      setFormData({
        name: "",
        email: "",
        studentId: "",
      });

    } catch (err) {

      console.error("Add failed:", err);

    }

  };

  /* ================= UPDATE ================= */

  const updateStudent = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!editingId) return;

    try {

      await api.put("/admin/students/" + editingId, formData);

      await fetchStudents();

      setEditingId(null);

      setFormData({
        name: "",
        email: "",
        studentId: "",
      });

    } catch (err) {

      console.error("Update failed:", err);

    }

  };

  /* ================= DELETE ================= */

  const deleteStudent = async (id: string) => {

    const confirmDelete = window.confirm("Delete this student?");

    if (!confirmDelete) return;

    try {

      await api.delete("/admin/students/" + id);

      await fetchStudents();

    } catch (err) {

      console.error("Delete failed:", err);

    }

  };

  return (

    <Layout title="Student Management">

      <div className="space-y-6">

        {/* FORM */}

        <Card>

          <CardHeader>

            <CardTitle>
              {editingId ? "Edit Student" : "Add Student"}
            </CardTitle>

          </CardHeader>

          <CardContent>

            <form
              onSubmit={editingId ? updateStudent : addStudent}
              className="flex gap-3"
            >

              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Input
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
              />

              <Button type="submit">
                {editingId ? "Update" : "Add"}
              </Button>

            </form>

          </CardContent>

        </Card>

        {/* TABLE */}

        <Card>

          <CardHeader>

            <CardTitle>Students</CardTitle>

            <CardDescription>
              All registered students
            </CardDescription>

          </CardHeader>

          <CardContent>

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th>Name</th>

                  <th>Email</th>

                  <th>ID</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {students.map((s: any) => (

                  <tr key={s.id} className="border-b">

                    <td>{s.name}</td>

                    <td>{s.email}</td>

                    <td>{s.studentId}</td>

                    <td className="flex gap-2">

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {

                          setEditingId(s.id);

                          setFormData({
                            name: s.name,
                            email: s.email,
                            studentId: s.studentId,
                          });

                        }}
                      >
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteStudent(s.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </CardContent>

        </Card>

      </div>

    </Layout>

  );

}