"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import {supabase} from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

type ApplyRequest = {
  id: number;
  client_name: string;
  email: string;
  message: string;
  project_id: number | null;
  status: "pending" | "reviewed" | "done";
  created_at: string;
};

export default function RequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ApplyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveStatus, setLiveStatus] = useState<"disconnected" | "connected">(
    "disconnected"
  );
  const [selected, setSelected] = useState<ApplyRequest | null>(null);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed" | "done">(
    "all"
  );
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ ambil user login dari Supabase
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          // Reattach token ke Realtime
          supabase.realtime.setAuth(session.access_token);
        }
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ✅ ambil request awal
  useEffect(() => {
    const fetchRequests = async () => {
      const start = Date.now();
      try {
        const res = await fetch(`${window.location.origin}/api/apply`);
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        const elapsed = Date.now() - start;
        const minDelay = 500;
        const delay = Math.max(0, minDelay - elapsed);
        setTimeout(() => setLoading(false), delay);
      }
    };
    const timer = setTimeout(fetchRequests, 250);
    return () => clearTimeout(timer);
  }, []);

  // ✅ realtime Supabase
  useEffect(() => {
    const channel = supabase
      .channel("apply_requests_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "apply_requests" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newReq = payload.new as ApplyRequest;
            toast.success(`🆕 New request from ${newReq.client_name}`);
            setRequests((prev) => [newReq, ...prev]);
          }

          if (payload.eventType === "UPDATE") {
            const updatedReq = payload.new as ApplyRequest;
            toast(
              `🔄 ${updatedReq.client_name} updated → ${updatedReq.status}`,
              { icon: "⚙️" }
            );
            setRequests((prev) =>
              prev.map((r) => (r.id === updatedReq.id ? updatedReq : r))
            );
          }

          if (payload.eventType === "DELETE") {
            toast.error(`🗑️ ${payload.old.client_name} deleted`);
            setRequests((prev) => prev.filter((r) => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    setLiveStatus("connected");
    return () => {
      supabase.removeChannel(channel);
      setLiveStatus("disconnected");
    };
  }, []);

  // ✅ UPDATE STATUS + kirim email notifikasi
  const handleStatusChange = async (newStatus: ApplyRequest["status"]) => {
    if (!selected) return;
    setUpdating(true);

    try {
      // update status di Supabase
      const { error } = await supabase
        .from("apply_requests")
        .update({ status: newStatus })
        .eq("id", selected.id);

      if (error) throw error;

      // update state lokal
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selected.id ? { ...r, status: newStatus } : r
        )
      );
      setSelected((prev) => (prev ? { ...prev, status: newStatus } : null));

      // kirim email notifikasi via /api/notify
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selected.email,
          subject: `Your request status updated to "${newStatus}"`,
          message: `
            <h3>Hi ${selected.client_name},</h3>
            <p>Your project request status has been updated by the admin.</p>
            <p><strong>Message:</strong> ${selected.message}</p>
            <p><strong>New Status:</strong> <span style="color:teal">${newStatus}</span></p>
            <br/>
            <p>Best regards,<br/>Ryzze Team</p>
          `,
        }),
      });

      toast.success(`📩 Notification sent to ${selected.email}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update or send email");
    } finally {
      setUpdating(false);
    }
  };

  const filteredRequests = useMemo(() => {
    const q = search.toLowerCase();
    return requests
      .filter((r) => (filter === "all" ? true : r.status === filter))
      .filter(
        (r) =>
          r.client_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.message.toLowerCase().includes(q)
      );
  }, [requests, filter, search]);

  // 🌀 better loading UX
  if (loading)
    return (
      <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-400"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 blur-md bg-cyan-500/30 rounded-full animate-pulse" />
          </div>
          <p className="text-sm">Loading client requests...</p>
        </div>
      </motion.div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Toaster position="top-right" />
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <h1 className="text-lg font-semibold text-cyan-400">Client Requests</h1>
        {user && (
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
          >
            Logout
          </Button>
        )}
      </header>

      <main className="p-6 space-y-6">
        <motion.div
          layout
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <h2 className="text-xl font-semibold text-cyan-400">Request List</h2>
          <span
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
              liveStatus === "connected"
                ? "bg-green-600/20 text-green-400"
                : "bg-gray-700/40 text-gray-400"
            }`}
          >
            {liveStatus === "connected"
              ? "🟢 Live Updates"
              : "⚪ Connecting..."}
          </span>
        </motion.div>

        {/* Filter & Search */}
        <div className="sticky top-[60px] z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
          <div className="flex gap-2 flex-wrap">
            {(["all", "pending", "reviewed", "done"] as const).map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                className={`text-sm capitalize transition-all ${
                  filter === status
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                {status}
              </Button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg outline-none w-full md:w-80 border border-gray-700 focus:border-cyan-500 transition"
          />
        </div>

        {/* Request Cards */}
        <AnimatePresence mode="popLayout">
          {filteredRequests.length > 0 ? (
            <motion.div layout className="grid gap-4">
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="bg-gray-900 border border-gray-800 hover:border-cyan-700 transition-all duration-200 hover:shadow-cyan-500/10 cursor-pointer">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      {req.client_name}
                    </h3>
                    <p className="text-sm text-gray-400">{req.email}</p>
                    <p className="mt-2 text-gray-300 line-clamp-2">
                      {req.message}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          req.status === "pending"
                            ? "bg-yellow-600/20 text-yellow-400"
                            : req.status === "reviewed"
                            ? "bg-blue-600/20 text-blue-400"
                            : "bg-green-600/20 text-green-400"
                        }`}
                      >
                        {req.status}
                      </span>
                      <Button
                        onClick={() => setSelected(req)}
                        className="text-sm bg-cyan-700 hover:bg-cyan-600"
                      >
                        View
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              layout
              className="text-gray-500 text-sm italic text-center py-10"
            >
              No {filter} requests found.
            </motion.p>
          )}
        </AnimatePresence>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <Modal
            isOpen={!!selected}
            onClose={() => setSelected(null)}
            title="Request Detail"
          >
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {selected.client_name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Message:</strong> {selected.message}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-cyan-400">{selected.status}</span>
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  disabled={updating}
                  onClick={() => handleStatusChange("reviewed")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Mark as Reviewed
                </Button>
                <Button
                  disabled={updating}
                  onClick={() => handleStatusChange("done")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark as Done
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
