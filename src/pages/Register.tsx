import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearErrorMessages } from "../redux/userSlice";
import { RootState } from "../redux/store";

function Register() {
  // Local state for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clientErrorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);
  const serverErrorMessage = useSelector((state: RootState) => state.users.registerErrorMessage);

  // Redirect if the user is already logged in
  useEffect(() => {
    if (loggedInUser) {
      navigate("/wallet");
    }
  }, [loggedInUser, navigate]);

  // Clear errors when the component unmounts or when navigating away
  useEffect(() => {
    return () => {
      dispatch(clearErrorMessages());
    };
  }, [dispatch]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(null); // Clear local errors
    // Dispatch register action
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex items-center justify-center h-full mx-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-6 text-2xl font-bold">Sign Up</h2>
        <form onSubmit={handleRegister}>
          {/* Name input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name here"
              required
            />
          </div>
          {/* Email input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email here"
              required
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set your password"
              required
            />
          </div>
          {/* Confirm password input */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-400" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-gradient-to-r from-gradientfrom to-gradientto rounded-3xl hover:opacity-80"
          >
            Create Account
          </button>
        </form>
        {/* Display error messages */}
        {clientErrorMessage && <p className="mt-4 text-red-500">{clientErrorMessage}</p>}
        {serverErrorMessage && <p className="mt-4 text-red-500">{serverErrorMessage}</p>}
        <p className="mt-4 text-sm text-center">
          Already registered?{" "}
          <Link to="/login" className="text-main hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
