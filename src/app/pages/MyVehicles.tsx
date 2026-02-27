import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Edit2, Eye, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { get } from "../api";

export function MyVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const list = await get("/vehicles");
        setVehicles(list);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);


  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Vehicles</h1>
          <p className="text-gray-600">Manage your listed vehicles and track performance</p>
        </div>
        <Button onClick={() => navigate("/dashboard/list-vehicle")}>
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-gray-600 mb-1">Total Vehicles</p>
          <p className="text-3xl font-bold text-gray-900">{vehicles.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-600 mb-1">Available Now</p>
          <p className="text-3xl font-bold text-gray-900">
            {vehicles.filter(v => v.available).length}
          </p>
        </Card>
      </div>

      {/* Vehicles List */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} hover className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Image */}
              <div className="md:col-span-3 h-48 md:h-auto">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-9 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                    <p className="text-gray-600 capitalize">{vehicle.type} • {vehicle.year || ''}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    vehicle.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {vehicle.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Price/Day</p>
                    <p className="font-semibold text-gray-900">${vehicle.pricePerDay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{vehicle.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold text-gray-900">{new Date(vehicle.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => navigate(`/vehicle/${vehicle.id}`)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline">
                    View Bookings
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles listed yet</h3>
          <p className="text-gray-600 mb-6">Start earning by listing your first vehicle</p>
          <Button onClick={() => navigate("/dashboard/list-vehicle")}>
            <Plus className="w-5 h-5 mr-2" />
            List Your First Vehicle
          </Button>
        </Card>
      )}
    </div>
  );
}
