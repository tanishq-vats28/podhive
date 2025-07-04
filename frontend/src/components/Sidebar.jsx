import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Mic,
  Calendar,
  User,
  LogOut,
  Settings,
  PlusCircle,
  List,
} from "lucide-react";
import useAuth from "../context/useAuth";

const Sidebar = () => {
  const { role, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-indigo-700" : "";
  };

  const renderCustomerLinks = () => (
    <>
      <Link
        to="/studios"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/studios"
        )}`}
      >
        <Mic className="h-5 w-5 mr-3" />
        <span>Browse Studios</span>
      </Link>
      <Link
        to="/bookings/customer"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/bookings/customer"
        )}`}
      >
        <Calendar className="h-5 w-5 mr-3" />
        <span>My Bookings</span>
      </Link>
    </>
  );

  const renderOwnerLinks = () => (
    <>
      <Link
        to="/owner/studios"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/owner/studios"
        )}`}
      >
        <Mic className="h-5 w-5 mr-3" />
        <span>My Studios</span>
      </Link>
      <Link
        to="/owner/studios/new"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/owner/studios/new"
        )}`}
      >
        <PlusCircle className="h-5 w-5 mr-3" />
        <span>Add New Studio</span>
      </Link>
      <Link
        to="/owner/bookings"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/owner/bookings"
        )}`}
      >
        <Calendar className="h-5 w-5 mr-3" />
        <span>Bookings Received</span>
      </Link>
      {renderCustomerLinks()}
    </>
  );

  const renderAdminLinks = () => (
    <>
      <Link
        to="/admin/studios/pending"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/admin/studios/pending"
        )}`}
      >
        <List className="h-5 w-5 mr-3" />
        <span>Pending Studios</span>
      </Link>
      <Link
        to="/admin/bookings"
        className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
          "/admin/bookings"
        )}`}
      >
        <Calendar className="h-5 w-5 mr-3" />
        <span>All Bookings</span>
      </Link>
      {renderOwnerLinks()}
    </>
  );

  return (
    <div className="bg-indigo-800 text-white h-full min-h-screen w-64 p-4">
      <Link
        to="/"
        className="flex items-center justify-center mb-8 pt-4 hover:opacity-80 transition-opacity"
      >
        <Mic className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">PodHive</h1>
      </Link>

      <div className="space-y-2">
        <Link
          to={`/dashboard/${role}`}
          className={`flex items-center p-3 rounded-md hover:bg-indigo-700 ${isActive(
            `/dashboard/${role}`
          )}`}
        >
          <Home className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </Link>

        {role === "customer" && renderCustomerLinks()}
        {role === "owner" && renderOwnerLinks()}
        {role === "admin" && renderAdminLinks()}

        <button
          onClick={logout}
          className="flex items-center p-3 rounded-md hover:bg-indigo-700 w-full text-left"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
