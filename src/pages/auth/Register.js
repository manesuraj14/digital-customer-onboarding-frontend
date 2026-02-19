import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import LoadingButton from "../../components/ui/LoadingButton";
import AuthLayout from "../../components/ui/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  const [form,setForm]=useState({
    fullName:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
  });

  const [msg,setMsg]=useState("");
  const [loading,setLoading]=useState(false);
  const [showPassword,setShowPassword]=useState(false);

  const submit = async (e)=>{
    e.preventDefault();

    if(form.password!==form.confirmPassword){
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    try{
      await API.post("/auth/register",{
        ...form,
        phone:form.phone.startsWith("+91")?form.phone:`+91${form.phone}`
      });
      setMsg("Registration successful! Redirecting...");
      setTimeout(()=>navigate("/login"),2000);
    }catch(err){
      setMsg(err.response?.data?.message||"Registration failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <AuthLayout title="Create Your Account">

      {msg && (
        <div className={`px-4 py-2 rounded ${
          msg.includes("successful")
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
        }`}>
          {msg}
        </div>
      )}

      <form onSubmit={submit} className="space-y-3">

        <input placeholder="Full Name"
          className="input"
          onChange={(e)=>setForm({...form,fullName:e.target.value})}
        />

        <input placeholder="Email"
          className="input"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input placeholder="Phone"
          className="input"
          onChange={(e)=>setForm({...form,phone:e.target.value})}
        />

        <div className="relative">
          <input
            type={showPassword?"text":"password"}
            placeholder="Password"
            className="input pr-12"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
          <button type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-3">
            {showPassword?"🙈":"👁️"}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
        />

        <LoadingButton loading={loading} type="submit">
          Register
        </LoadingButton>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-semibold">
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}
