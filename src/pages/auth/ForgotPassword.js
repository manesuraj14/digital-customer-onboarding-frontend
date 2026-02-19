import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import LoadingButton from "../../components/ui/LoadingButton";
import AuthLayout from "../../components/ui/AuthLayout";

export default function ForgotPassword(){

  const navigate = useNavigate();
  const otpRef = useRef(null);

  const [step,setStep]=useState(1);
  const [phone,setPhone]=useState("");
  const [otp,setOtp]=useState("");
  const [newPass,setNewPass]=useState("");
  const [confirmPass,setConfirmPass]=useState("");

  const [loading,setLoading]=useState(false);
  const [timer,setTimer]=useState(0);
  const [showPass,setShowPass]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const [popup,setPopup]=useState("");

  // ================= HELPERS =================

  const normalizePhone=(num)=>{
    let p=num.trim();
    if(!p.startsWith("+")) p="+91"+p;
    return p;
  };

  const maskPhone=(num)=>{
    if(!num) return "";
    return "+91******"+num.slice(-2);
  };

  const getStrength=(password)=>{
    let score=0;
    if(password.length>=8) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/\d/.test(password)) score++;
    if(/[@$!%*?&]/.test(password)) score++;
    return score;
  };

  const strength=getStrength(newPass);
  const strengthPercent=(strength/5)*100;

  const passwordsMatch=newPass===confirmPass && newPass.length>0;
  const isOtpValid=otp.trim().length===6;

  // ================= OTP TIMER =================

  useEffect(()=>{
    if(timer<=0) return;
    const t=setTimeout(()=>setTimer(timer-1),1000);
    return ()=>clearTimeout(t);
  },[timer]);

  // ================= AUTO FOCUS OTP =================

  useEffect(()=>{
    if(step===2 && otpRef.current){
      otpRef.current.focus();
    }
  },[step]);

  // ================= REQUEST OTP =================

  const requestOtp=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      await API.post("/auth/forgot-password",{phone:normalizePhone(phone)});
      setStep(2);
      setTimer(59);
    }catch{
      setPopup("Failed to send OTP");
    }finally{setLoading(false);}
  };

  const resendOtp=async()=>{
    try{
      await API.post("/auth/forgot-password",{phone:normalizePhone(phone)});
      setTimer(59);
    }catch{
      setPopup("Failed to resend OTP");
    }
  };

  // ================= RESET PASSWORD =================

  const resetPassword=async(e)=>{
    e.preventDefault();
    if(!passwordsMatch) return;

    setLoading(true);
    try{
      await API.post("/auth/reset-password",{
        phone:normalizePhone(phone),
        otp:otp.trim(),
        newPassword:newPass.trim()
      });

      setPopup("Password reset successful");

      setTimeout(()=>navigate("/login"),2000);

    }catch{
      setPopup("Reset failed");
    }finally{setLoading(false);}
  };

  // ================= UI =================

  return(
    <AuthLayout title="Reset Your Password">

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-3">
            <p className="font-semibold">{popup}</p>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={()=>setPopup("")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 */}
      {step===1 && (
        <form onSubmit={requestOtp} className="space-y-4">
          <input
            placeholder="Phone Number"
            className="input"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <LoadingButton loading={loading}>
            Request OTP
          </LoadingButton>
        </form>
      )}

      {/* STEP 2 */}
      {step===2 && (
        <>
          <p className="text-sm text-gray-500 text-center mb-2">
            OTP sent to {maskPhone(phone)}
          </p>

          {/* TIMER */}
          <div className="text-center text-sm mb-3">
            {timer>0
              ? `Resend OTP in ${timer}s`
              : <button onClick={resendOtp}
                  className="text-indigo-600 font-semibold">
                  Resend OTP
                </button>}
          </div>

          <form onSubmit={resetPassword} className="space-y-4">

            <input
              ref={otpRef}
              placeholder="OTP"
              className="input"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
            />

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showPass?"text":"password"}
                placeholder="New Password"
                className="input"
                value={newPass}
                onChange={(e)=>setNewPass(e.target.value)}
              />
              <button
                type="button"
                onClick={()=>setShowPass(!showPass)}
                className="absolute right-3 top-2"
              >
                👁
              </button>
            </div>

            {/* STRENGTH BAR */}
            {newPass && (
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className={`h-2 rounded transition-all duration-300 ${
                    strength<=2?"bg-red-500":
                    strength<=4?"bg-yellow-500":
                    "bg-green-600"
                  }`}
                  style={{width:`${strengthPercent}%`}}
                />
              </div>
            )}

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm?"text":"password"}
                placeholder="Confirm Password"
                className="input"
                value={confirmPass}
                onChange={(e)=>setConfirmPass(e.target.value)}
              />
              <button
                type="button"
                onClick={()=>setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2"
              >
                👁
              </button>
            </div>

            <LoadingButton
              loading={loading}
              disabled={!isOtpValid || !passwordsMatch}
            >
              Reset Password
            </LoadingButton>

          </form>
        </>
      )}

      <div className="text-center text-sm mt-3">
        <Link to="/login" className="text-indigo-600 font-semibold">
          Back to Login
        </Link>
      </div>

    </AuthLayout>
  );
}
