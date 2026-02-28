import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/Button";
import { Car, Bike, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { get } from "../api";

export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get("location")?.toLowerCase() || "";

  const [filters, setFilters] = useState({
    type: "all",
    priceMin: 0,
    priceMax: 500,
    fuelType: "all",
    transmission: "all",
    availableOnly: true
  });
  const [showFilters, setShowFilters] = useState(false);
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

  const filteredVehicles = vehicles.filter(v => {
    if (searchLocation && !v.location.toLowerCase().includes(searchLocation)) return false;
    if (filters.type !== "all" && v.type.toLowerCase() !== filters.type) return false;
    if (v.pricePerDay < filters.priceMin || v.pricePerDay > filters.priceMax) return false;
    if (filters.fuelType !== "all" && v.fuel?.toLowerCase() !== filters.fuelType) return false;
    if (filters.transmission !== "all" && v.transmission?.toLowerCase() !== filters.transmission) return false;
    if (filters.availableOnly && !v.available) return false;
    return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
            <p className="text-gray-600">{filteredVehicles.length} vehicles available</p>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "car", label: "Car" },
                    { value: "bike", label: "Bike" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={option.value}
                        checked={filters.type === option.value}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="text-primary"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.availableOnly}
                    onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
                    className="text-primary"
                  />
                  <span className="text-sm text-gray-700">Only show available vehicles</span>
                </label>
              </div>

              {/* Fuel Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              {/* Transmission */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFilters({
                  type: "all",
                  priceMin: 0,
                  priceMax: 500,
                  fuelType: "all",
                  transmission: "all",
                  availableOnly: true
                })}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                >
                  <div
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        {vehicle.type === "car" || vehicle.type === "Car" ? (
                          <Car className="w-4 h-4 text-primary" />
                        ) : (
                          <Bike className="w-4 h-4 text-secondary" />
                        )}
                        <span className="text-sm font-medium capitalize">{vehicle.type}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{vehicle.name}</h3>
                      {vehicle.available !== undefined && (
                        <div className={`text-sm font-medium ${vehicle.available ? 'text-green-600' : 'text-red-600'}`}>
                          {vehicle.available ? 'Available' : 'Not Available'}
                        </div>
                      )}

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{vehicle.rating}</span>
                        <span className="text-sm text-gray-500">({vehicle.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{vehicle.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span className="px-2 py-1 bg-gray-100 rounded">{vehicle.fuel}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded">{vehicle.transmission}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div>
                          <span className="text-2xl font-bold text-primary">${vehicle.pricePerDay}</span>
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                        <Button onClick={(e) => { e.stopPropagation(); navigate(`/book/${vehicle.id}`); }}>
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <p className="text-gray-600 text-lg">No vehicles found matching your filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({
                    type: "all",
                    priceMin: 0,
                    priceMax: 500,
                    fuelType: "all",
                    transmission: "all",
                    availableOnly: true
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
