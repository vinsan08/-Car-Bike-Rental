import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Upload, Plus, Calendar as CalendarIcon } from "lucide-react";
import { post } from "../api";

export function VehicleListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleName: "",
    type: "",
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    location: "",
    fuelType: "",
    transmission: "",
    description: "",
    images: [] as File[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: formData.vehicleName,
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        pricePerDay: Number(formData.pricePerDay),
        location: formData.location,
        fuel: formData.fuelType,
        transmission: formData.transmission,
        description: formData.description,
        available: true
      };
      const resp = await post("/vehicles", payload);
      if (resp.error) {
        alert(resp.error);
        return;
      }
      alert("Vehicle listed successfully!");
      navigate("/dashboard/my-vehicles");
    } catch (err: any) {
      alert(err.message || "Failed to list vehicle");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Vehicle</h1>
        <p className="text-gray-600">Fill in the details to list your vehicle for rent</p>
      </div>

      <Card className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Images */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Images <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Upload</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">Upload at least 4 high-quality images of your vehicle</p>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Vehicle Name"
                placeholder="e.g., Tesla Model 3 Performance"
                value={formData.vehicleName}
                onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                required
              />

              <Select
                label="Vehicle Type"
                placeholder="Select type"
                options={[
                  { value: "car", label: "Car" },
                  { value: "bike", label: "Bike" }
                ]}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />

              <Input
                label="Brand"
                placeholder="e.g., Tesla, Honda"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              />

              <Input
                label="Model"
                placeholder="e.g., Model 3, CBR 600RR"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
              />

              <Input
                label="Year"
                type="number"
                placeholder="2024"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />

              <Input
                label="Price Per Day"
                type="number"
                placeholder="89"
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Vehicle Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="Fuel Type"
                placeholder="Select fuel type"
                options={[
                  { value: "petrol", label: "Petrol" },
                  { value: "diesel", label: "Diesel" },
                  { value: "electric", label: "Electric" },
                  { value: "hybrid", label: "Hybrid" }
                ]}
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                required
              />

              <Select
                label="Transmission"
                placeholder="Select transmission"
                options={[
                  { value: "automatic", label: "Automatic" },
                  { value: "manual", label: "Manual" }
                ]}
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                required
              />

              <Input
                label="Location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe your vehicle, its features, and any special instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Availability Calendar */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="border border-gray-300 rounded-lg p-6">
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <CalendarIcon className="w-5 h-5" />
                <span>Set your vehicle's availability dates</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Available From"
                  type="date"
                  required
                />
                <Input
                  label="Available Until"
                  type="date"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard/my-vehicles")} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Plus className="w-5 h-5 mr-2" />
              List Vehicle
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
