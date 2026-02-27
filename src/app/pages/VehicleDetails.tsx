import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import {
  Star,
  MapPin,
  Fuel,
  Gauge,
  Users,
  Briefcase,
  Shield,
  CheckCircle,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { get } from "../api";

export function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [vehicle, setVehicle] = useState<any>(null);
  const [available, setAvailable] = useState<boolean | null>(null);

  const fetchVehicle = async () => {
    try {
      const v = await get(`/vehicles/${id}`);
      setVehicle(v);
      setAvailable(v.available);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const images = vehicle.images || (vehicle.image ? [vehicle.image] : []);
  const reviews = vehicle.reviews || [];
  const features = vehicle.features || [];
  const specs = vehicle.specs || {
    fuelType: vehicle.fuel || "N/A",
    transmission: vehicle.transmission || "N/A",
    seats: "N/A",
    luggage: "N/A"
  };
  const owner = vehicle.owner || {
    name: "Owner",
    rating: "4.8",
    trips: "10+",
    joinedYear: "2024"
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                {images.length > 0 ? (
                  <img
                    src={images[currentImage]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentImage ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Vehicle Info */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{vehicle.rating || "N/A"}</span>
                      <span>({reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{vehicle.location}</span>
                    </div>
                    {available !== null && (
                      <div className={`text-sm font-medium ${available ? 'text-green-600' : 'text-red-600'}`}>
                        {available ? 'Available' : 'Not available'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">${vehicle.pricePerDay}</div>
                  <div className="text-gray-600">per day</div>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel</p>
                    <p className="font-medium text-gray-900">{specs.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-medium text-gray-900">{specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-medium text-gray-900">{specs.seats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Luggage</p>
                    <p className="font-medium text-gray-900">{specs.luggage}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{vehicle.description || "No description available."}</p>
              </div>
            </Card>

            {/* Features */}
            {features.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Owner Info */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Meet Your Host</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {owner.name.split(' ').map((n: any) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{owner.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>⭐ {owner.rating}</span>
                    <span>•</span>
                    <span>{owner.trips} trips</span>
                    <span>•</span>
                    <span>Joined {owner.joinedYear}</span>
                  </div>
                </div>
                <Button variant="outline">
                  Contact Host
                </Button>
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Reviews ({reviews.length})
                </h3>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{vehicle.rating || "N/A"}</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 italic">No reviews yet.</p>
                )}
              </div>
            </Card>
          </div>


          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-1">${vehicle.pricePerDay || vehicle.price}</div>
                <div className="text-gray-600">per day</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6 py-4 border-y border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>${vehicle.pricePerDay || vehicle.price} × 3 days</span>
                  <span>${(vehicle.pricePerDay || vehicle.price || 0) * 3}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${((vehicle.pricePerDay || vehicle.price || 0) * 3) + 15}</span>
                </div>
              </div>

              <Button className="w-full mb-4" onClick={() => navigate(`/book/${vehicle._id || vehicle.id}`)}>
                Book Now
              </Button>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Protected by insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24h</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
