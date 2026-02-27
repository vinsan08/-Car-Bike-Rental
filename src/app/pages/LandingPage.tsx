import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Calendar, Car, Bike, Shield, CreditCard, CheckCircle, Star } from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export function LandingPage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    returnDate: ""
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${searchData.location}&from=${searchData.pickupDate}&to=${searchData.returnDate}`);
  };

  const featuredVehicles = [
    {
      id: 1,
      name: "Tesla Model 3",
      type: "Car",
      price: 89,
      location: "San Francisco",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1754489818285-4c6eded78ddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbiUyMGNhciUyMHNpZGV8ZW58MXx8fHwxNzcyMTc2ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "Honda CBR 600RR",
      type: "Bike",
      price: 45,
      location: "Los Angeles",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1609142297440-7ab128d4a5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydCUyMG1vdG9yY3ljbGUlMjBibGFja3xlbnwxfHx8fDE3NzIxNjYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "Range Rover Sport",
      type: "Car",
      price: 129,
      location: "New York",
      rating: 5.0,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1649296303096-38245976e01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXIlMjB3aGl0ZXxlbnwxfHx8fDE3NzIxNzY4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "Yamaha MT-07",
      type: "Bike",
      price: 39,
      location: "Seattle",
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1692668696893-d8e5fb0fadad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGJpa2UlMjB1cmJhbnxlbnwxfHx8fDE3NzIxMjI0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1673358439695-b510aa803391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJzJTIwYmlrZXMlMjByb2FkJTIwdXJiYW58ZW58MXx8fHwxNzcyMTc2ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Rent. Ride. Earn.
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Your trusted peer-to-peer vehicle rental platform. Find the perfect ride or earn money by renting out your vehicle.
          </p>

          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Pickup Date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    placeholder="Return Date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Button type="submit" className="w-full h-full">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 text-lg">Discover our most popular rentals</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <Card key={vehicle.id} hover className="overflow-hidden cursor-pointer" onClick={() => navigate(`/vehicle/${vehicle.id}`)}>
                <div className="relative h-48">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    {vehicle.type === "Car" ? <Car className="w-4 h-4 text-primary" /> : <Bike className="w-4 h-4 text-secondary" />}
                    <span className="text-sm font-medium">{vehicle.type}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{vehicle.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{vehicle.rating}</span>
                    <span className="text-sm text-gray-500">({vehicle.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{vehicle.location}</span>
                    </div>
                    <div>
                      <span className="text-xl font-bold text-primary">${vehicle.price}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button onClick={() => navigate("/search")}>
              View All Vehicles
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">Simple steps to get you on the road</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Vehicle</h3>
              <p className="text-gray-600">Browse through our wide selection of cars and bikes available in your area</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <CreditCard className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book & Pay</h3>
              <p className="text-gray-600">Select your dates, review the details, and complete your secure booking</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ride & Return</h3>
              <p className="text-gray-600">Pick up your vehicle, enjoy your trip, and return it on time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Become a Host & Earn Extra Income
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            List your vehicle on RentRide and start earning money when you're not using it. Safe, secure, and hassle-free.
          </p>
          <Button variant="secondary" onClick={() => navigate("/dashboard/list-vehicle")} className="text-lg px-8 py-4">
            Start Earning Today
          </Button>
        </div>
      </section>
    </div>
  );
}
