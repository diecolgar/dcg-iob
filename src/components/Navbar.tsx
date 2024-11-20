import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import LogOutIcon from "../icons/LogOutIcon";

function Navbar() {
  // Access logged-in user from Redux state
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle user logout and redirect to login page
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-gradientfrom to-gradientto text-white py-4 h-20 flex items-center mt-4 w-[1280px] max-w-full md:rounded-full px-4">
      <div className="container flex items-center justify-between mx-auto">
        {/* Dynamic link based on authentication status */}
        <h1 className="px-4 text-2xl font-bold">
          <Link to={loggedInUser ? "/wallet" : "/login"}>IoB MoneyApp</Link>
        </h1>
        {/* Show user options if logged in */}
        {loggedInUser && (
          <div className="flex items-center gap-8">
            <span>Welcome, {loggedInUser.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-2 bg-white rounded-full text-main"
            >
              <span className="hidden md:flex">Logout</span>
              <LogOutIcon width={20} height={20} classnamepath="stroke-main stroke-2" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
