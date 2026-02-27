import { Link } from "react-router";
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-primary">RentRide</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted peer-to-peer vehicle rental platform.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/search">Browse Vehicles</FooterLink>
              <FooterLink to="/dashboard/list-vehicle">List Your Vehicle</FooterLink>
              <FooterLink to="/register">Sign Up</FooterLink>
              <FooterLink to="/login">Login</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink to="/">About Us</FooterLink>
              <FooterLink to="/">How It Works</FooterLink>
              <FooterLink to="/">Terms of Service</FooterLink>
              <FooterLink to="/">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">support@rentride.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2026 RentRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-gray-600 hover:text-primary transition-colors text-sm">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
      {icon}
    </button>
  );
}
