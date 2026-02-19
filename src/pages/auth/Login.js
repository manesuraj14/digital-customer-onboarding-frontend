  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import API from "../../services/api";
  import useAuth from "../../services/useAuth";
  import LoadingButton from "../../components/ui/LoadingButton";
  import AuthLayout from "../../components/ui/AuthLayout";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const submit = async (e) => {
      e.preventDefault();
      setMsg("");

      if (!emailRegex.test(form.email)) {
        setMsg("Please enter a valid email address");
        return;
      }
      if (!form.password) {
        setMsg("Password is required");
        return;
      }

      setLoading(true);
      try {
        const res = await API.post("/auth/login", {
          email: form.email.toLowerCase(),
          password: form.password,
        });

        if (res.data?.jwt) {

  const token = res.data.jwt;

  // 1️⃣ save token first so API can use it
  login({ token, email: form.email });

  // 2️⃣ fetch full profile after login
  const profile = await API.get("/user/me");

  // 3️⃣ store full session
  localStorage.setItem("user", JSON.stringify({
    token,
    email: profile.data.email,
    name: profile.data.fullName,
    phone: profile.data.phone   // REQUIRED for OTP change
  }));

  navigate("/home");
}
 else {
          setMsg("Login failed. Please try again.");
        }
      } catch {
        setMsg("Invalid email or password");
      } finally {
        setLoading(false);
      }
    };

    return (
      <AuthLayout title="Welcome Back">

        {msg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
            {msg}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text":"password"}
              placeholder="Password"
              value={form.password}
              onChange={(e)=>setForm({...form,password:e.target.value})}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="button"
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <LoadingButton loading={loading} type="submit">
            Sign In
          </LoadingButton>
        </form>

        <div className="text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
          <br/>
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold">
            Sign Up
          </Link>
        </div>

      </AuthLayout>
    );
  }
