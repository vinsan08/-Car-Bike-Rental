import { Card } from "../components/Card";
import { Calendar, Car, Wallet, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function Dashboard() {
  const stats = [
    { icon: <Calendar className="w-6 h-6" />, label: "Total Bookings", value: "12", color: "bg-blue-500" },
    { icon: <Clock className="w-6 h-6" />, label: "Active Bookings", value: "2", color: "bg-green-500" },
    { icon: <Car className="w-6 h-6" />, label: "My Vehicles", value: "3", color: "bg-purple-500" },
    { icon: <Wallet className="w-6 h-6" />, label: "Earnings", value: "$2,450", color: "bg-orange-500" }
  ];

  const upcomingTrips = [
    {
      id: 1,
      vehicle: "Tesla Model 3",
      pickup: "2026-03-15",
      return: "2026-03-18",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1754489818285-4c6eded78ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhciUyMHNpZGV8ZW58MXx8fHwxNzcyMTc2ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      vehicle: "Honda CBR 600RR",
      pickup: "2026-03-20",
      return: "2026-03-22",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1609142297440-7ab128d4a5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMG1vdG9yY3ljbGUlMjBibGFja3xlbnwxfHx8fDE3NzIxNjYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const recentActivity = [
    { action: "Booking Confirmed", vehicle: "Tesla Model 3", time: "2 hours ago" },
    { action: "Payment Received", vehicle: "Range Rover Sport", time: "1 day ago" },
    { action: "New Review", vehicle: "Yamaha MT-07", time: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, John! Here's what's happening with your rentals.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
              <button className="text-primary text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <img 
                    src={trip.image} 
                    alt={trip.vehicle}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{trip.vehicle}</h3>
                    <p className="text-sm text-gray-600">
                      {trip.pickup} to {trip.return}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    trip.status === "Confirmed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {trip.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.vehicle}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors">
            <Car className="w-8 h-8 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">List a Vehicle</p>
              <p className="text-sm text-gray-600">Start earning today</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">View Earnings</p>
              <p className="text-sm text-gray-600">Track your income</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-8 h-8 text-blue-500" />
            <div className="text-left">
              <p className="font-semibold text-gray-900">Complete Profile</p>
              <p className="text-sm text-gray-600">85% complete</p>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
}
