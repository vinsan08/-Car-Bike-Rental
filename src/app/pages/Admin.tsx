import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { get, put } from "../api";

export function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const bList = await get("/bookings");
      setBookings(bList);
      const vList = await get("/vehicles");
      setVehicles(vList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await put(`/vehicles/${id}`, { available: !currentStatus });
      // reload vehicles
      const vList = await get("/vehicles");
      setVehicles(vList);
    } catch (e) {
      console.error("Failed to toggle availability", e);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 rounded-tl-lg">User</th>
                    <th className="px-4 py-2">Vehicle</th>
                    <th className="px-4 py-2">Pickup</th>
                    <th className="px-4 py-2">Return</th>
                    <th className="px-4 py-2 rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id} className="border-b last:border-b-0">
                      <td className="px-4 py-2">{b.user?.name || "-"}</td>
                      <td className="px-4 py-2">{b.vehicle?.name || "-"}</td>
                      <td className="px-4 py-2">{new Date(b.pickupDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{new Date(b.returnDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2">${b.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Vehicles</h2>
          {vehicles.length === 0 ? (
            <p className="text-gray-600">No vehicles found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 rounded-tl-lg">Name</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2 rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v._id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 font-medium">{v.name}</td>
                      <td className="px-4 py-2 capitalize">{v.type}</td>
                      <td className="px-4 py-2">{v.location}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {v.available ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => toggleAvailability(v._id, v.available)}
                          className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
