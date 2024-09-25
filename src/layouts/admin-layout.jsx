import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaAddressBook, FaHome } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { useEffect } from "react";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log("isAdmin", user?.isAdmin); // Add optional chaining to avoid errors
  }, [user]);

  // Show a loading spinner or a loading message while user data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is not an admin, redirect them to the home page
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/admin/users">
              <FaUser /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts">
              <FaAddressBook /> Contacts
            </NavLink>
          </li>
       
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
