import { motion } from 'framer-motion';
import {
    Calendar,
    Download,
    Edit,
    Plus,
    Trash2,
    Upload,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { Layout } from '../../components/common/Layout';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';

type Timetable = {
    id: number
    department: string
    year: number
    semester: string
    lastUpdated: string
    status: 'Active' | 'Draft'
}

type ScheduleEntry = {
    id: number
    day: string
    time: string
    subject: string
    faculty: string
    room: string
    department: string
    year: number
}

const initialTimetable: Timetable[] = [
    {
        id: 1,
        department: 'Computer Science',
        year: 3,
        semester: 'Odd 2024',
        lastUpdated: '2024-01-20',
        status: 'Active',
    },
    {
        id: 2,
        department: 'Electrical Engineering',
        year: 2,
        semester: 'Odd 2024',
        lastUpdated: '2024-01-18',
        status: 'Active',
    },
];

const initialEntries: ScheduleEntry[] = [
    {
        id: 1,
        day: 'Monday',
        time: '9:00-10:00',
        subject: 'Data Structures',
        faculty: 'Dr. Smith',
        room: 'CS-101',
        department: 'CSE',
        year: 3,
    },
    {
        id: 2,
        day: 'Monday',
        time: '10:00-11:00',
        subject: 'Operating Systems',
        faculty: 'Prof. Johnson',
        room: 'CS-102',
        department: 'CSE',
        year: 3,
    },
];

export function TimetableManagement() {

    const [timetableData, setTimetableData] = useState(initialTimetable)
    const [scheduleEntries, setScheduleEntries] = useState(initialEntries)

    const [selectedDepartment, setSelectedDepartment] = useState('All')

    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [selectedEntry, setSelectedEntry] = useState<ScheduleEntry | null>(null)

    const handleDeleteEntry = (id:number)=>{
        setScheduleEntries(prev => prev.filter(e=>e.id !== id))
    }

    const handleDeleteTimetable = (id:number)=>{
        setTimetableData(prev => prev.filter(t=>t.id !== id))
    }

    const handleDownload = (t:Timetable)=>{
        const data = JSON.stringify(t,null,2)
        const blob = new Blob([data],{type:'application/json'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${t.department}-timetable.json`
        a.click()
    }

    const handleEdit = (entry:ScheduleEntry)=>{
        setSelectedEntry(entry)
        setShowEditModal(true)
    }

    const filteredTimetables = timetableData.filter(t =>
        selectedDepartment === 'All' || t.department.includes(selectedDepartment)
    )

    return (
        <Layout title="Timetable Management">
            <div className="space-y-8">

                {/* HEADER */}
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Timetable Management</h1>
                    <div className="flex gap-3">
                        <Button onClick={()=>setShowUploadModal(true)}>
                            <Upload className="h-4 w-4 mr-2"/>
                            Upload Timetable
                        </Button>

                        <Button onClick={()=>alert("Add Schedule Entry Form")}>
                            <Plus className="h-4 w-4 mr-2"/>
                            Add Schedule Entry
                        </Button>
                    </div>
                </div>

                {/* FILTER */}
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Departments</SelectItem>
                        <SelectItem value="Computer">Computer Science</SelectItem>
                        <SelectItem value="Electrical">Electrical Engineering</SelectItem>
                    </SelectContent>
                </Select>

                {/* TABLE */}
                <Card>
                    <CardContent>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Semester</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTimetables.map(t=>(
                                    <tr key={t.id} className="border-b">
                                        <td>{t.department}</td>
                                        <td>{t.year}</td>
                                        <td>{t.semester}</td>
                                        <td>
                                            <Badge>{t.status}</Badge>
                                        </td>
                                        <td className="text-right">
                                            <Button size="sm" variant="ghost" onClick={()=>handleDownload(t)}>
                                                <Download className="h-4 w-4"/>
                                            </Button>

                                            <Button size="sm" variant="ghost" onClick={()=>alert("Edit timetable")}>
                                                <Edit className="h-4 w-4"/>
                                            </Button>

                                            <Button size="sm" variant="ghost" onClick={()=>handleDeleteTimetable(t.id)}>
                                                <Trash2 className="h-4 w-4 text-red-600"/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* SCHEDULE ENTRIES */}
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule Entries</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {scheduleEntries.map(entry=>(
                            <div key={entry.id} className="flex justify-between border p-4 rounded-lg">

                                <div>
                                    <h3 className="font-semibold">{entry.subject}</h3>
                                    <p className="text-sm">{entry.day} | {entry.time}</p>
                                    <p className="text-sm">{entry.faculty} | {entry.room}</p>
                                </div>

                                <div className="flex gap-2">

                                    <Button size="sm" variant="outline" onClick={()=>handleEdit(entry)}>
                                        <Edit className="h-3 w-3 mr-1"/>Edit
                                    </Button>

                                    <Button size="sm" variant="ghost" onClick={()=>handleDeleteEntry(entry.id)}>
                                        <Trash2 className="h-3 w-3 mr-1 text-red-600"/>Delete
                                    </Button>

                                </div>

                            </div>
                        ))}
                    </CardContent>
                </Card>

            </div>
        </Layout>
    )
}