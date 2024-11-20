import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, clearErrorMessages } from "../redux/userSlice";
import { RootState } from "../redux/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);
  const serverErrorMessage = useSelector((state: RootState) => state.users.loginErrorMessage);

  useEffect(() => {
    // Limpiar errores al desmontar o cambiar de página
    return () => {
      dispatch(clearErrorMessages());
    };
  }, [dispatch]);

  if (loggedInUser) {
    navigate("/wallet");
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center h-full mx-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-6 text-2xl font-bold">Log In</h2>
        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-gradient-to-r from-gradientfrom to-gradientto rounded-3xl hover:opacity-80"
          >
            Log In
          </button>
        </form>
        {serverErrorMessage && <p className="mt-4 text-red-500">{serverErrorMessage}</p>}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-main hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
