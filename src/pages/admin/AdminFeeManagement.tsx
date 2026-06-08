import { motion } from 'framer-motion'
import {
Check,
DollarSign,
Download,
Search,
TrendingUp,
X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../api/axios'

import { Layout } from '../../components/common/Layout'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from '../../components/ui/card'
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '../../components/ui/select'
import { formatCurrency } from '../../lib/utils'

export function AdminFeeManagement() {


const [payments, setPayments] = useState<any[]>([])
const [searchTerm, setSearchTerm] = useState('')
const [statusFilter, setStatusFilter] = useState('All')
const [selectedPayment, setSelectedPayment] = useState<any>(null)
const [showApprovalModal, setShowApprovalModal] = useState(false)

useEffect(() => {
    fetchPayments()
}, [])

const fetchPayments = async () => {
    try {

        const res = await api.get("/students/admin/payments")

        if (Array.isArray(res.data)) {
            setPayments(res.data)
        } else {
            setPayments([])
        }

    } catch (err) {
        console.error("Payments fetch failed:", err)
        setPayments([])
    }
}

const approvePayment = async () => {

    if (!selectedPayment) return

    try {

        await api.put(`/students/admin/payments/${selectedPayment.id}/approve`)

        setShowApprovalModal(false)

        fetchPayments()

    } catch (err) {

        console.error("Approval failed:", err)

    }

}

const rejectPayment = async (paymentId: string) => {

    try {

        await api.put(`/students/admin/payments/${paymentId}/reject`)

        fetchPayments()

    } catch (err) {

        console.error("Reject failed:", err)

    }

}

const exportReport = async () => {

    try {

        const res = await api.get(
            "/students/admin/payments/export",
            { responseType: "blob" }
        )

        const url = window.URL.createObjectURL(new Blob([res.data]))

        const link = document.createElement("a")

        link.href = url
        link.setAttribute("download", "fees_report.csv")

        document.body.appendChild(link)

        link.click()

    } catch (err) {

        console.error("Export failed:", err)

    }

}

const filteredPayments = payments.filter((payment) => {

    const matchesSearch =
        payment.studentId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())

    const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter

    return matchesSearch && matchesStatus

})

const totalPending = payments
    .filter(p => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0)

return (
    <Layout title="Fee Management">

        <div className="space-y-8">

            {/* Header */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >

                <div>

                    <h1 className="text-2xl font-bold mb-2">
                        Fee Management
                    </h1>

                    <p className="text-gray-500">
                        Monitor fee payments and approvals
                    </p>

                </div>

                <div className="flex gap-3">

                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={exportReport}
                    >
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>

                    <Button className="gap-2">
                        <DollarSign className="h-4 w-4" />
                        Generate Invoice
                    </Button>

                </div>

            </motion.div>

            {/* Stats */}

            <div className="grid grid-cols-4 gap-6">

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                            Total Collected
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(
                                payments
                                    .filter(p => p.status === "Approved")
                                    .reduce((s, p) => s + p.amount, 0)
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                            Pending Approval
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(totalPending)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                            Approved Payments
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {
                                payments.filter(
                                    p => p.status === "Approved"
                                ).length
                            }
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                            Rejected
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {
                                payments.filter(
                                    p => p.status === "Rejected"
                                ).length
                            }
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Search */}

            <Card>

                <CardContent className="p-6">

                    <div className="flex gap-4">

                        <div className="relative flex-1">

                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                            <Input
                                placeholder="Search student ID..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                                className="pl-10"
                            />

                        </div>

                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >

                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                </CardContent>

            </Card>

            {/* Payments */}

            <Card>

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Payment Requests
                    </CardTitle>

                    <CardDescription>
                        Review student payments
                    </CardDescription>

                </CardHeader>

                <CardContent className="space-y-4">

                    {filteredPayments.map((payment) => (

                        <div
                            key={payment.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {payment.studentId}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {payment.type} • {formatCurrency(payment.amount)}
                                </p>

                            </div>

                            <div className="flex items-center gap-3">

                                <Badge
                                    variant={
                                        payment.status === "Approved"
                                            ? "success"
                                            : payment.status === "Rejected"
                                            ? "destructive"
                                            : "warning"
                                    }
                                >
                                    {payment.status}
                                </Badge>

                                {payment.status === "Pending" && (

                                    <div className="flex gap-2">

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="gap-1"
                                            onClick={() =>
                                                rejectPayment(payment.id)
                                            }
                                        >
                                            <X className="h-3 w-3" />
                                            Reject
                                        </Button>

                                        <Button
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => {
                                                setSelectedPayment(payment)
                                                setShowApprovalModal(true)
                                            }}
                                        >
                                            <Check className="h-3 w-3" />
                                            Approve
                                        </Button>

                                    </div>

                                )}

                            </div>

                        </div>

                    ))}

                </CardContent>

            </Card>

            {/* Approval Modal */}

            <Dialog
                open={showApprovalModal}
                onOpenChange={setShowApprovalModal}
            >

                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>
                            Approve Payment
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">

                        <p>
                            Approve payment from{" "}
                            <strong>
                                {selectedPayment?.studentId}
                            </strong>
                            ?
                        </p>

                        <div className="flex gap-3">

                            <Button
                                variant="outline"
                                onClick={() =>
                                    setShowApprovalModal(false)
                                }
                                className="flex-1"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={approvePayment}
                                className="flex-1"
                            >
                                Confirm
                            </Button>

                        </div>

                    </div>

                </DialogContent>

            </Dialog>

        </div>

    </Layout>
)


}
