import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastFail, toastSuccess } from "@services/service-toast";
import URL from "../../constants/apiurl";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await axios.post(`${URL}api/auth/register`, data);
      toastSuccess(
        "Signed Up Successfully. Please check email for verification",
      );
      navigate("/login");
    } catch (e) {
      toastFail(e.response?.data?.message ?? "Sorry, couldn't sign up");
    }
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="rounded border border-gray-300 p-2 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="rounded border border-gray-300 p-2 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 font-medium hover:underline"
            >
              Log in here
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
