import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
} from '../../components/ui/dialog';
import { formatCurrency } from '../../lib/utils';

import jsPDF from "jspdf";

type FeeData = {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending';
  paidDate?: string;
  transactionId?: string;
};

export default function FeeManagement() {

  const [fees, setFees] = useState<FeeData[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedFee, setSelectedFee] = useState<FeeData | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch Fees
  const fetchFees = async () => {
    try {
      const res = await api.get('/students/fees');

      if (Array.isArray(res.data)) {
        setFees(res.data);
      } else {
        setFees([]);
      }

    } catch (err) {
      console.error('Fees fetch failed:', err);
      setFees([]);
    }
  };

  // 🔥 Fetch Payment History
  const fetchPayments = async () => {
    try {
      const res = await api.get('/students/payments');
      setPayments(res.data || []);
    } catch (err) {
      console.error("Payments fetch failed:", err);
      setPayments([]);
    }
  };

  useEffect(() => {
    fetchFees();
    fetchPayments();
  }, []);

  // 💰 Calculations
  const totalDue = fees
    .filter((fee) => fee.status === 'Pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPaid = fees
    .filter((fee) => fee.status === 'Paid')
    .reduce((sum, fee) => sum + fee.amount, 0);

  // 💳 Open Payment Modal
  const handlePayNow = (fee: FeeData) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  // 💳 Real Payment API Call
  const handlePaymentSuccess = async () => {

    if (!selectedFee?.id) return;

    try {

      setLoading(true);

      const res = await api.post(`/students/fees/pay/${selectedFee.id}`);

      const txnId = res.data?.transactionId;

      await fetchFees();
      await fetchPayments();

      setSelectedFee(prev =>
        prev ? { ...prev, transactionId: txnId } : null
      );

      setShowPaymentModal(false);
      setShowReceiptModal(true);

    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📄 Generate Receipt PDF
  const generateReceipt = (fee: FeeData) => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("EduPulse Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${fee.transactionId || "N/A"}`, 20, 40);
    doc.text(`Fee Type: ${fee.type}`, 20, 50);
    doc.text(`Amount Paid: ₹${fee.amount}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text(`Status: Paid`, 20, 80);

    doc.save(`Receipt-${fee.transactionId || fee.id}.pdf`);
  };

  return (
    <Layout title="Fee Management">
      <div className="space-y-8">

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(totalPaid)}
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Up to date</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Amount Due
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {formatCurrency(totalDue)}
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Payment required</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Due Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {fees.find(f => f.status === 'Pending')
                    ? new Date(
                        fees.find(f => f.status === 'Pending')!.dueDate
                      ).toLocaleDateString()
                    : '—'}
                </div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Upcoming fee</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Fee List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Fee Details
            </CardTitle>
            <CardDescription>
              Your semester fee breakdown
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {fees.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                No fee records found.
              </div>
            )}

            {fees.map((fee) => (
              <div
                key={fee.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{fee.type}</h3>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(fee.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="font-bold">
                  {formatCurrency(fee.amount)}
                </div>

                <div className="flex items-center gap-2">

                  <Badge
                    variant={fee.status === 'Paid'
                      ? 'success'
                      : 'destructive'}
                  >
                    {fee.status}
                  </Badge>

                  {fee.status === 'Pending' && (
                    <Button
                      size="sm"
                      onClick={() => handlePayNow(fee)}
                    >
                      Pay Now
                    </Button>
                  )}

                  {fee.status === 'Paid' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateReceipt(fee)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  )}

                </div>
              </div>
            ))}

          </CardContent>
        </Card>

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Confirmation</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-center">
              <h3 className="font-semibold">
                {selectedFee?.type}
              </h3>

              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(selectedFee?.amount || 0)}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handlePaymentSuccess}
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Receipt Modal */}
        <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Successful</DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-4">
              <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
              <p className="text-sm text-gray-500">
                Transaction completed successfully
              </p>

              <Button onClick={() => setShowReceiptModal(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
}