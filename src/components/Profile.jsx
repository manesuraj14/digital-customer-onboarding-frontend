import { useEffect, useState } from "react";
import API from "../services/api";
import Input, { PasswordInput } from "./ui/Input";
import Button from "./ui/Button";

export default function Profile() {

  const [form,setForm]=useState({fullName:"",email:"",phone:""});
  const [loading,setLoading]=useState(true);

  const [popup,setPopup]=useState({msg:"",success:false});
  const [showPasswordBox,setShowPasswordBox]=useState(false);

  const [step,setStep]=useState(1);

  const [data,setData]=useState({
    phone:"",
    oldPassword:"",
    newPassword:"",
    confirmPassword:"",
    otp:""
  });

  const [otpSent,setOtpSent]=useState(false);
  const [timer,setTimer]=useState(0);

  const [showOld,setShowOld]=useState(false);
  const [showNew,setShowNew]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);

  // ✅ PHONE OTP STATES
  const [phoneChanged,setPhoneChanged]=useState(false);
  const [phoneOtpSent,setPhoneOtpSent]=useState(false);
  const [phoneOtp,setPhoneOtp]=useState("");

  // ================= PASSWORD RULES =================
  const rules=[
    {label:"Min 8 characters",test:p=>p.length>=8},
    {label:"Uppercase letter",test:p=>/[A-Z]/.test(p)},
    {label:"Lowercase letter",test:p=>/[a-z]/.test(p)},
    {label:"Number",test:p=>/\d/.test(p)},
    {label:"Special char",test:p=>/[@$!%*?&]/.test(p)},
  ];

  const passwordsMatch =
    data.newPassword===data.confirmPassword &&
    data.newPassword.length>0;

  const isOtpValid=data.otp.trim().length===6;

  // ================= TIMER =================
  useEffect(()=>{
    if(timer<=0) return;
    const t=setInterval(()=>setTimer(s=>s-1),1000);
    return ()=>clearInterval(t);
  },[timer]);

  // ================= LOAD PROFILE =================
  useEffect(()=>{
    const load=async()=>{
      try{
        const res=await API.get("/user/me");

        setForm({
          fullName:res.data.fullName||"",
          email:res.data.email||"",
          phone:res.data.phone||""
        });

        setData(d=>({...d,phone:res.data.phone}));

      }finally{setLoading(false);}
    };
    load();
  },[]);

  // ================= PROFILE UPDATE =================
  const updateProfile=async(e)=>{
  e.preventDefault();   // keep this

  if(phoneChanged){
    setPopup({msg:"Please verify new phone via OTP before saving",success:false});
    return;
  }

  try{
    const res=await API.put("/user/me",form);

    localStorage.setItem("user",JSON.stringify({
      token:res.data.token,
      email:res.data.user.email,
      name:res.data.user.fullName,
      phone:res.data.user.phone
    }));

    API.defaults.headers.common["Authorization"] =
      "Bearer "+res.data.token;

    setPopup({msg:"Profile updated successfully",success:true});

  }catch(err){
    console.log(err.response?.data);
    setPopup({msg:"Update failed",success:false});
  }
};


  // ================= PHONE OTP =================
  const sendPhoneOtp=async()=>{
    try{
      await API.post("/user/request-phone-change",{phone:form.phone});
      setPhoneOtpSent(true);
      setPopup({msg:"OTP sent to new phone",success:true});
    }catch{
      setPopup({msg:"Failed to send OTP",success:false});
    }
  };

  const verifyPhoneOtp=async()=>{
    try{
      await API.post("/user/confirm-phone-change",{otp:phoneOtp});
      setPhoneChanged(false);
      setPhoneOtpSent(false);
      setPopup({msg:"Phone verified successfully",success:true});
    }catch{
      setPopup({msg:"OTP invalid or expired",success:false});
    }
  };

  // ================= VERIFY OLD PASSWORD =================
  const verifyOld=async()=>{
    try{
      await API.post("/user/verify-old-password",
        {oldPassword:data.oldPassword}
      );
      setStep(2);
    }catch{
      setPopup({msg:"Old password incorrect",success:false});
    }
  };

  // ================= SEND PASSWORD OTP =================
  const sendOtp=async()=>{

    if(!passwordsMatch){
      setPopup({msg:"Passwords do not match",success:false});
      return;
    }

    if(data.oldPassword===data.newPassword){
      setPopup({msg:"New password must be different from old password",success:false});
      return;
    }

    try{
      // ✅ using existing backend endpoint
      await API.post("/auth/forgot-password",{phone:data.phone});
      setOtpSent(true);
      setTimer(59);
      setPopup({msg:"OTP sent to your mobile",success:true});
    }catch{
      setPopup({msg:"Failed to send OTP",success:false});
    }
  };

  // ================= CHANGE PASSWORD =================
  const changePassword=async()=>{
    try{
      await API.post("/user/change-password",{
        phone:data.phone,
        otp:data.otp,
        newPassword:data.newPassword
      });

      setPopup({msg:"Password updated successfully",success:true});

      setShowPasswordBox(false);
      setStep(1);
      setOtpSent(false);
      setData({
        phone:form.phone,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
        otp:""
      });

    }catch{
      setPopup({msg:"Password update failed",success:false});
    }
  };

  if(loading) return <p className="text-center mt-20">Loading...</p>;

  return(
    <div className="max-w-xl mx-auto mt-24 bg-white shadow-lg rounded-xl p-8 space-y-6">

      {popup.msg && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
            {popup.success && (
              <div className="text-green-500 text-5xl animate-bounce">✔</div>
            )}
            <p className="font-semibold">{popup.msg}</p>
            <button
              className="px-5 py-2 bg-indigo-600 text-white rounded"
              onClick={()=>setPopup({msg:"",success:false})}>
              OK
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center">My Profile</h2>

      {/* PROFILE FORM */}
      <form onSubmit={updateProfile} className="space-y-5">

        <Input
          label="Full Name"
          value={form.fullName}
          onChange={e=>setForm({...form,fullName:e.target.value})}
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
          placeholder="Enter your email"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={e=>{
            setForm({...form,phone:e.target.value});
            setPhoneChanged(true);
          }}
          placeholder="Enter your phone number"
        />

        {phoneChanged && !phoneOtpSent && (
          <button type="button"
            onClick={sendPhoneOtp}
            className="text-sm text-indigo-600 underline">
            Verify phone via OTP
          </button>
        )}

        {phoneOtpSent && (
          <>
            <Input 
              placeholder="Enter phone OTP"
              value={phoneOtp}
              onChange={e=>setPhoneOtp(e.target.value)}
            />

            <Button 
              onClick={verifyPhoneOtp}
              className="w-full"
            >
              Verify Phone
            </Button>
          </>
        )}

        <Button className="w-full">
          Save Changes
        </Button>
      </form>

      {/* PASSWORD SECTION */}
      <button type="button"
        onClick={()=>setShowPasswordBox(!showPasswordBox)}
        className="w-full bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition">
        Change Password
      </button>

      {showPasswordBox && (
        <div className="border p-6 rounded-xl space-y-5">

          {step===1 && (
            <>
              <Input
                label="Phone Number"
                value={data.phone}
                onChange={e=>setData({...data,phone:e.target.value})}
                placeholder="Enter your phone number"
              />

              <PasswordInput
                label="Old Password"
                value={data.oldPassword}
                onChange={e=>setData({...data,oldPassword:e.target.value})}
                showPassword={showOld}
                onTogglePassword={()=>setShowOld(!showOld)}
                placeholder="Enter old password"
              />

              <Button onClick={verifyOld} className="w-full">
                Verify Old Password
              </Button>
            </>
          )}

          {step===2 && (
            <>
              <PasswordInput
                label="New Password"
                value={data.newPassword}
                onChange={e=>setData({...data,newPassword:e.target.value})}
                showPassword={showNew}
                onTogglePassword={()=>setShowNew(!showNew)}
                placeholder="Enter new password"
              />

              <div className="text-xs space-y-1">
                {rules.map(r=>(
                  <p key={r.label}
                    className={r.test(data.newPassword)
                      ?"text-green-600":"text-gray-400"}>
                    ✔ {r.label}
                  </p>
                ))}
              </div>

              <PasswordInput
                label="Confirm Password"
                value={data.confirmPassword}
                onChange={e=>setData({...data,confirmPassword:e.target.value})}
                showPassword={showConfirm}
                onTogglePassword={()=>setShowConfirm(!showConfirm)}
                placeholder="Confirm new password"
              />

              {!otpSent ? (
                <Button
                  disabled={!passwordsMatch}
                  onClick={sendOtp}
                  className="w-full"
                >
                  Send OTP
                </Button>
              ):(
                <>
                  <Input 
                    placeholder="Enter OTP"
                    value={data.otp}
                    onChange={e=>setData({...data,otp:e.target.value})}
                  />

                  {timer>0 ? (
                    <p className="text-xs text-gray-500">
                      Resend OTP in {timer}s
                    </p>
                  ):(
                    <button type="button"
                      onClick={sendOtp}
                      className="text-sm text-indigo-600 underline">
                      Resend OTP
                    </button>
                  )}

                  <Button
                    disabled={!isOtpValid}
                    onClick={changePassword}
                    className="w-full"
                  >
                    Verify & Update Password
                  </Button>
                </>
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}
