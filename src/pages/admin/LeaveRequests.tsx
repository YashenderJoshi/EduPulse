import { useEffect, useState } from "react";
import api from "../../api/axios";

import { Layout } from "../../components/common/Layout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export function LeaveRequests() {

  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {

      const res = await api.get("/admin/leaves");

      setLeaves(res.data);

    } catch (err) {
      console.error("Admin leaves fetch failed", err);
    }
  };

  const updateStatus = async (id: string, status: string) => {

    try {

      await api.put(`/admin/leaves/${id}`, {
        status: status,
        remarks: ""
      });

      fetchLeaves();

    } catch (err) {

      console.error("Leave update failed", err);

    }

  };

  return (

    <Layout title="Leave Requests">

      <div className="space-y-6">

        <h1 className="text-2xl font-bold">
          Student Leave Requests
        </h1>

        {leaves.length === 0 && (
          <p className="text-gray-500">
            No leave requests found
          </p>
        )}

        {leaves.map((leave) => (

          <div
            key={leave.id}
            className="p-5 border rounded-lg flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">
                {leave.studentName}
              </p>

              <p className="text-sm text-gray-500">
                {leave.reason}
              </p>

              <p className="text-sm">
                {leave.fromDate} → {leave.toDate}
              </p>

              {leave.remarks && (
                <p className="text-sm mt-2">
                  Remarks: {leave.remarks}
                </p>
              )}

            </div>

            <div className="flex items-center gap-3">

              <Badge>
                {leave.status}
              </Badge>

              {leave.status === "Pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() =>
                      updateStatus(leave.id, "Approved")
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      updateStatus(leave.id, "Rejected")
                    }
                  >
                    Reject
                  </Button>
                </>
              )}

            </div>

          </div>

        ))}

      </div>

    </Layout>

  );

}