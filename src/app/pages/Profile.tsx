import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { User, Mail, Phone, FileText, Edit2, Lock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { get, put } from "../api";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({
    fullName: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    bio: user.bio || ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user.id && !user._id) {
        setLoading(false);
        return;
      }
      try {
        const resp = await get(`/auth/profile/${user.id || user._id}`);
        if (resp.user) {
          setFormData({
            fullName: resp.user.name || "",
            email: resp.user.email || "",
            phone: resp.user.phone || "",
            address: resp.user.address || "",
            bio: resp.user.bio || ""
          });
          // sync localStorage
          localStorage.setItem("user", JSON.stringify(resp.user));
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      const resp = await put("/auth/profile", {
        id: user.id || user._id,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio
      });

      if (resp.error) {
        setError(resp.error);
        return;
      }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(resp.user));
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              {(formData.fullName || "?").split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{formData.fullName}</h3>
            <p className="text-gray-600 mb-4">{formData.email}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">Jan 2026</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-medium text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-b border-gray-200">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium text-gray-900">4.9 ⭐</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}
            {success && <p className="mb-4 text-green-600 text-sm">{success}</p>}

            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                icon={<User className="w-5 h-5" />}
                className={!isEditing ? "pointer-events-none opacity-75" : ""}
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                icon={<Mail className="w-5 h-5" />}
                className={!isEditing ? "pointer-events-none opacity-75" : ""}
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                icon={<Phone className="w-5 h-5" />}
                placeholder="No phone added"
                className={!isEditing ? "pointer-events-none opacity-75" : ""}
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                icon={<MapPin className="w-5 h-5" />}
                placeholder="No address added"
                className={!isEditing ? "pointer-events-none opacity-75" : ""}
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-75"
                />
              </div>
            </div>
          </Card>



          {/* Security */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="outline">
                  Change
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Not enabled</p>
                  </div>
                </div>
                <Button variant="outline">
                  Enable
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
