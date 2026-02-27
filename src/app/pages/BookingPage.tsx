import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Calendar, MapPin, CreditCard, Wallet, Shield, CheckCircle } from "lucide-react";
import { get, post } from "../api";

export function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    pickup: "",
    return: ""
  });

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center">Loading vehicle...</div>;
  }
  const [vehicle, setVehicle] = useState<any>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

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

  const calculateDays = () => {
    if (dates.pickup && dates.return) {
      const from = new Date(dates.pickup);
      const to = new Date(dates.return);
      const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 3; // Default
  };

  const days = calculateDays();
  const subtotal = vehicle ? vehicle.pricePerDay * days : 0;
  const serviceFee = 15;
  const securityDeposit = 200;
  const total = subtotal + serviceFee;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dates.pickup || !dates.return) {
      alert("Please select pickup and return dates");
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const resp = await post("/bookings", {
        user: user?.id,
        vehicle: vehicle._id || id,
        pickupDate: dates.pickup,
        returnDate: dates.return,
        totalAmount: total
      });
      if (resp.error) {
        alert(resp.error);
        return;
      }
      alert("Booking confirmed! Redirecting to dashboard...");
      navigate("/dashboard/my-bookings");
    } catch (err: any) {
      alert(err.message || "Failed to create booking");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Review details and confirm your reservation</p>
        </div>

        <form onSubmit={handleBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Summary */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Summary</h3>
                <div className="flex gap-4">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{vehicle.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle.location}</span>
                    </div>
                    {available !== null && (
                      <div className={`text-sm font-medium ${available ? 'text-green-600' : 'text-red-600'} mb-2`}>
                        {available ? 'Available' : 'Not available'}
                      </div>
                    )}
                    <div className="text-primary font-semibold">
                      ${vehicle.pricePerDay}/day
                    </div>
                  </div>
                </div>
              </Card>

              {/* Booking Dates */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Dates
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Pickup Date & Time"
                    type="datetime-local"
                    value={dates.pickup}
                    onChange={(e) => setDates({ ...dates, pickup: e.target.value })}
                    required
                  />
                  <Input
                    label="Return Date & Time"
                    type="datetime-local"
                    value={dates.return}
                    onChange={(e) => setDates({ ...dates, return: e.target.value })}
                    required
                  />
                </div>
                {dates.pickup && dates.return && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                    Total duration: {days} day{days !== 1 ? 's' : ''}
                  </div>
                )}
              </Card>

              {/* Renter Information */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Renter Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <Input
                    label="Driving License Number"
                    placeholder="D1234567"
                    required
                  />
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h3>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <Wallet className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">UPI</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <Wallet className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Wallet</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <Input
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        label="CVV"
                        placeholder="123"
                        required
                      />
                    </div>
                    <Input
                      label="Cardholder Name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <Input
                    label="UPI ID"
                    placeholder="yourname@upi"
                    required
                  />
                )}
              </Card>

              {/* Terms */}
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <span className="text-primary hover:underline cursor-pointer">Terms and Conditions</span>, <span className="text-primary hover:underline cursor-pointer">Cancellation Policy</span>, and understand that a security deposit of ${securityDeposit} will be held and returned after vehicle inspection.
                  </label>
                </div>
              </Card>
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Price Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>${vehicle.pricePerDay} × {days} day{days !== 1 ? 's' : ''}</span>
                    <span className="font-medium text-gray-900">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Service Fee</span>
                    <span className="font-medium text-gray-900">${serviceFee}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 mb-2">
                      <span>Total</span>
                      <span className="text-primary">${total}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Security Deposit</span>
                      <span>${securityDeposit}</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full mb-4">
                  Confirm Booking
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Your payment is secure and protected</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Free cancellation up to 24 hours before pickup</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Full insurance coverage included</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
