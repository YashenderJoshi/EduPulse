import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import api from '../../api/client';

export function StudentRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    department: '',
    branch: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
  ];

  const branches: Record<string, string[]> = {
    'Computer Science': ['CSE', 'IT'],
    'Electrical Engineering': ['EE'],
    'Mechanical Engineering': ['ME'],
    'Civil Engineering': ['CE'],
    'Electronics & Communication': ['ECE'],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/auth/student/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        studentId: formData.studentId,
        department: formData.department,
        branch: formData.branch,
      });

      setStep('success');
    } catch (err) {
      setError('Registration failed. Email may already exist.');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CheckCircle className="mx-auto text-green-600 h-12 w-12 mb-4" />
          <h2 className="text-xl font-bold mb-2">Registration Successful</h2>
          <p className="mb-6">You can now log in with your credentials</p>
          <Button onClick={() => navigate('/student/login')} className="w-full">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create Student Account</CardTitle>
            <CardDescription>Register with real data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input placeholder="Full Name" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

              <Input placeholder="Student ID" value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} />

              <Select onValueChange={(v) => setFormData({ ...formData, department: v, branch: '' })}>
                <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select disabled={!formData.department}
                onValueChange={(v) => setFormData({ ...formData, branch: v })}>
                <SelectTrigger><SelectValue placeholder="Branch" /></SelectTrigger>
                <SelectContent>
                  {branches[formData.department]?.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input type="email" placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

              <Input type="password" placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

              <Input type="password" placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
