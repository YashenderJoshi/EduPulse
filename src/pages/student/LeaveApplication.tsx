
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, FileText, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

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

type Leave = {
    _id?: string;
    reason: string;
    fromDate: string;
    toDate: string;
    description?: string;
    status?: string;
    remarks?: string;
};

export default function LeaveApplication() {

    const [showForm, setShowForm] = useState(false);
    const [leaves, setLeaves] = useState<Leave[]>([]);

    const [formData, setFormData] = useState({
        reason: '',
        fromDate: '',
        toDate: '',
        description: '',
    });

    // ✅ LOAD LEAVES
    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {

            // ⭐ DO NOT ADD /api
            const res = await api.get("/students/leaves");

            if (Array.isArray(res.data)) {
                setLeaves(res.data);
            } else {
                setLeaves([]);
            }

        } catch (err) {

            console.error("Leaves fetch failed:", err);

            // Never allow crash
            setLeaves([]);
        }
    };

    // ✅ SUBMIT LEAVE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            await api.post("/students/leaves", formData);

            setShowForm(false);

            setFormData({
                reason: '',
                fromDate: '',
                toDate: '',
                description: '',
            });

            // 🔥 reload instantly
            fetchLeaves();

        } catch (err) {
            console.error("Leave submit failed:", err);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Approved':
                return <Check className="h-4 w-4" />;
            case 'Rejected':
                return <X className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'success';
            case 'Rejected':
                return 'destructive';
            default:
                return 'warning';
        }
    };

    // ✅ SUMMARY COUNTS (LIVE)
    const approved = leaves.filter(l => l.status === "Approved").length;
    const pending = leaves.filter(l => l.status === "Pending").length;
    const rejected = leaves.filter(l => l.status === "Rejected").length;

    return (
        <Layout title="Leave Application">
            <div className="space-y-8">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-2xl font-bold mb-2">
                            Leave Applications
                        </h1>
                        <p className="text-gray-500">
                            Submit and track your leave requests
                        </p>
                    </div>

                    <Dialog open={showForm} onOpenChange={setShowForm}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Apply for Leave
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Leave Application</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">

                                <Input
                                    placeholder="Reason"
                                    value={formData.reason}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            reason: e.target.value,
                                        })
                                    }
                                    required
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="date"
                                        value={formData.fromDate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                fromDate: e.target.value,
                                            })
                                        }
                                        required
                                    />

                                    <Input
                                        type="date"
                                        value={formData.toDate}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                toDate: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <textarea
                                    className="w-full p-3 border rounded-lg h-24"
                                    placeholder="Additional details..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                />

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>

                                    <Button type="submit" className="flex-1">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-2xl font-bold">{leaves.length}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 text-green-600">
                            <p className="text-sm">Approved</p>
                            <p className="text-2xl font-bold">{approved}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 text-yellow-600">
                            <p className="text-sm">Pending</p>
                            <p className="text-2xl font-bold">{pending}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 text-red-600">
                            <p className="text-sm">Rejected</p>
                            <p className="text-2xl font-bold">{rejected}</p>
                        </CardContent>
                    </Card>

                </div>

                {/* HISTORY */}
                <Card>
                    <CardHeader>
                        <CardTitle>Leave History</CardTitle>
                        <CardDescription>
                            Track all submitted leaves
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {leaves.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                No leave applications yet.
                            </div>
                        )}

                        {leaves.map((leave, i) => (
                            <div
                                key={i}
                                className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {leave.reason}
                                    </h3>

                                    <div className="flex gap-2 text-sm text-gray-500 mt-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(leave.fromDate).toLocaleDateString()}
                                        {" - "}
                                        {new Date(leave.toDate).toLocaleDateString()}
                                    </div>

                                    {leave.remarks && (
                                        <p className="text-sm mt-2">
                                            <strong>Remarks:</strong> {leave.remarks}
                                        </p>
                                    )}
                                </div>

                                <Badge
                                    variant={getStatusColor(leave.status || "Pending")}
                                    className="flex items-center gap-1 mt-3 md:mt-0"
                                >
                                    {getStatusIcon(leave.status || "Pending")}
                                    {leave.status || "Pending"}
                                </Badge>
                            </div>
                        ))}

                    </CardContent>
                </Card>

            </div>
        </Layout>
    );
}
