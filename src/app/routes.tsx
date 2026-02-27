import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LandingPage } from "./pages/LandingPage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SearchResults } from "./pages/SearchResults";
import { VehicleDetails } from "./pages/VehicleDetails";
import { VehicleListing } from "./pages/VehicleListing";
import { BookingPage } from "./pages/BookingPage";
import { MyBookings } from "./pages/MyBookings";
import { Profile } from "./pages/Profile";
import { MyVehicles } from "./pages/MyVehicles";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "search", Component: SearchResults },
      { path: "vehicle/:id", Component: VehicleDetails },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "my-bookings", Component: MyBookings },
      { path: "my-vehicles", Component: MyVehicles },
      { path: "list-vehicle", Component: VehicleListing },
      { path: "profile", Component: Profile },
      { path: "admin", Component: Admin },
    ],
  },
  {
    path: "/book/:id",
    Component: PublicLayout,
    children: [
      { index: true, Component: BookingPage },
    ],
  },
]);
