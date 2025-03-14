import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
  // ToDo:Get isAdmin Value From The Database.
  const [isAdmin] = useAdmin();

  return (
    <div className="flex w-full">
      <div className="w-3/12 min-h-screen bg-cyan-950">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li className="text-white">
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils>
                  Add Items
                </NavLink>
              </li>
              <li className="text-white bg-blue-500 rounded hover:bg-emerald-300">
                <NavLink to="/dashboard/manageItems">
                  <FaList></FaList>
                  Manage Items
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook>
                  Manage Bookings
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="text-white">
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li className="text-white bg-blue-500 rounded hover:bg-emerald-300">
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd>
                  Add a Review
                </NavLink>
              </li>
              <li className="text-white">
                <NavLink to="/dashboard/paymentHistory">
                  <FaList></FaList>
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li className="text-white">
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li className="text-white">
            <NavLink to="/menu">
              <FaSearch></FaSearch>
              Our Menu
            </NavLink>
          </li>
          <li className="text-white">
            <NavLink to="/menu">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard Main Content */}
      <div className="w-9/12 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
