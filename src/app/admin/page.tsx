"use client";

import { useState } from "react";
import {
  Users,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase, type RSVP, type Blessing } from "@/lib/supabase";

interface RSVPStats {
  total_responses: number;
  total_guests: number;
  attending_responses: number;
  attending_guests: number;
  not_attending_responses: number;
  not_attending_guests: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === "uchamail2025") {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert("Invalid password");
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load RSVPs
      const { data: rsvpData, error: rsvpError } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (rsvpError) throw rsvpError;
      setRsvps(rsvpData || []);

      // Load Blessings (including unapproved ones for admin)
      const { data: blessingData, error: blessingError } = await supabase
        .from("blessings")
        .select("*")
        .order("created_at", { ascending: false });

      if (blessingError) throw blessingError;
      setBlessings(blessingData || []);

      // Calculate stats
      const totalResponses = rsvpData?.length || 0;
      const totalGuests =
        rsvpData?.reduce((sum, rsvp) => sum + rsvp.guest_count, 0) || 0;
      const attendingRsvps =
        rsvpData?.filter((rsvp) => rsvp.attendance === "hadir") || [];
      const attendingGuests = attendingRsvps.reduce(
        (sum, rsvp) => sum + rsvp.guest_count,
        0
      );
      const notAttendingRsvps =
        rsvpData?.filter((rsvp) => rsvp.attendance === "tidak") || [];
      const notAttendingGuests = notAttendingRsvps.reduce(
        (sum, rsvp) => sum + rsvp.guest_count,
        0
      );

      setStats({
        total_responses: totalResponses,
        total_guests: totalGuests,
        attending_responses: attendingRsvps.length,
        attending_guests: attendingGuests,
        not_attending_responses: notAttendingRsvps.length,
        not_attending_guests: notAttendingGuests,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map(
            (header) => `"${(row as Record<string, unknown>)[header] || ""}"`
          )
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleBlessingApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error, data } = await supabase
        .from("blessings")
        .update({ is_approved: !currentStatus })
        .eq("id", id);
      console.log("data", data);
      if (error) throw error;

      setBlessings((current) =>
        current.map((blessing) =>
          blessing.id === id
            ? { ...blessing, is_approved: !currentStatus }
            : blessing
        )
      );
    } catch (error) {
      console.error("Error updating blessing:", error);
      alert("Failed to update blessing");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wedding Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={loadData} disabled={isLoading} size="sm">
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold">{stats.total_responses}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Guests</p>
                  <p className="text-2xl font-bold">{stats.total_guests}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <UserCheck className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Attending</p>
                  <p className="text-2xl font-bold">{stats.attending_guests}</p>
                  <p className="text-xs text-gray-500">
                    ({stats.attending_responses} responses)
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <UserX className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Not Attending</p>
                  <p className="text-2xl font-bold">
                    {stats.not_attending_guests}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({stats.not_attending_responses} responses)
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RSVP Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                RSVP Responses ({rsvps.length})
              </h2>
              <Button
                onClick={() => exportCSV(rsvps, "rsvp_responses")}
                size="sm"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {rsvps.map((rsvp) => (
                <div key={rsvp.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{rsvp.name}</h3>
                      <p className="text-sm text-gray-600">
                        {rsvp.guest_count} guest
                        {rsvp.guest_count > 1 ? "s" : ""} •
                        <span
                          className={`ml-1 ${
                            rsvp.attendance === "hadir"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {rsvp.attendance === "hadir"
                            ? "Attending"
                            : "Not Attending"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(rsvp.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Blessings Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Blessings ({blessings.length})
              </h2>
              <Button
                onClick={() => exportCSV(blessings, "blessings")}
                size="sm"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {blessings.map((blessing) => (
                <div key={blessing.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{blessing.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {blessing.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(blessing.created_at)}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        toggleBlessingApproval(
                          blessing.id,
                          blessing.is_approved
                        )
                      }
                      size="sm"
                      variant={blessing.is_approved ? "default" : "outline"}
                    >
                      {blessing.is_approved ? (
                        <>
                          <Eye className="h-4 w-4 mr-1" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" /> Hidden
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
