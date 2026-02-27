import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { StatusBadge } from "../components/StatusBadge";
import { Button } from "../components/Button";
import { Calendar, MapPin, DollarSign, Filter } from "lucide-react";

export function MyBookings() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Ongoing" | "Completed" | "Cancelled">("Upcoming");
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return;
        const list = await get(`/bookings?userId=${user.id}`);
        setBookings(list);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const now = new Date();
  const categorized: Record<string, any[]> = {
    Upcoming: [],
    Ongoing: [],
    Completed: [],
    Cancelled: []
  };
  bookings.forEach(b => {
    const pickup = new Date(b.pickupDate);
    const ret = new Date(b.returnDate);
    if (ret < now) {
      b.status = "Completed";
      categorized.Completed.push(b);
    } else if (pickup > now) {
      b.status = "Upcoming";
      categorized.Upcoming.push(b);
    } else {
      b.status = "Ongoing";
      categorized.Ongoing.push(b);
    }
  });

  const currentBookings = categorized[activeTab];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage and view all your vehicle bookings</p>
      </div>

      {/* Tabs */}
      <Card className="p-2 mb-6">
        <div className="flex flex-wrap gap-2">
          {(["Upcoming", "Ongoing", "Completed", "Cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
              <span className="ml-2 text-sm">({(categorized as any)[tab]?.length || 0})</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {currentBookings.length > 0 ? (
          currentBookings.map((booking) => (
            <Card key={booking.id} hover className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Image */}
                <div className="md:col-span-3 h-48 md:h-auto">
                  <img 
                    src={booking.vehicle?.image || ''} 
                    alt={booking.vehicle?.name || ''}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-9 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.vehicle?.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{booking.vehicle?.location || booking.location}</span>
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup Date</p>
                        <p className="font-medium text-gray-900">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-5 h-5 text-secondary mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Return Date</p>
                        <p className="font-medium text-gray-900">{new Date(booking.returnDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-medium text-gray-900">${booking.totalAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <Button variant="outline" onClick={() => navigate(`/vehicle/${booking.id}`)}>
                      View Details
                    </Button>
                    {booking.status === "Upcoming" && (
                      <>
                        <Button variant="outline">
                          Modify Booking
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Cancel Booking
                        </Button>
                      </>
                    )}
                    {booking.status === "Completed" && (
                      <Button variant="secondary">
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No {activeTab.toLowerCase()} bookings</h3>
            <p className="text-gray-600 mb-6">You don't have any {activeTab.toLowerCase()} bookings at the moment.</p>
            <Button onClick={() => navigate("/search")}>
              Browse Vehicles
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
