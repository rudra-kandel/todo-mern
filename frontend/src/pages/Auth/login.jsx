// import httpClient from "@services/service-axios";
import { toastFail, toastSuccess } from "@services/service-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tokenService from "@services/service-token";
import URL from "../../constants/apiurl";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      console.log(URL);
      const res = await axios.post(URL + "api/auth/login", data);
      tokenService.setToken(res?.data?.data?.accessToken);
      toastSuccess("Loged In Sucessfully");
      navigate("/");
    } catch (e) {
      toastFail(e.response?.data?.message ?? "Sorry couldnt login");
    }
  }
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Log In
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
            Log In
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 font-medium hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
