import { useEffect, useState } from "react";
import API from "../services/api";

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
    <div className="max-w-xl mx-auto mt-24 bg-white shadow-lg rounded-xl p-8 space-y-4">

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
      <form onSubmit={updateProfile} className="space-y-4">

        <input value={form.fullName}
          onChange={e=>setForm({...form,fullName:e.target.value})}
          className="w-full border rounded px-4 py-2"/>

        <input value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})}
          className="w-full border rounded px-4 py-2"/>

        <input value={form.phone}
          onChange={e=>{
            setForm({...form,phone:e.target.value});
            setPhoneChanged(true);
          }}
          className="w-full border rounded px-4 py-2"
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
            <input placeholder="Enter phone OTP"
              onChange={e=>setPhoneOtp(e.target.value)}
              className="w-full border rounded px-3 py-2"/>

            <button type="button"
              onClick={verifyPhoneOtp}
              className="w-full bg-green-600 text-white py-2 rounded">
              Verify Phone
            </button>
          </>
        )}

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Save Changes
        </button>
      </form>

      {/* PASSWORD SECTION */}
      <button type="button"
        onClick={()=>setShowPasswordBox(!showPasswordBox)}
        className="w-full bg-gray-200 py-2 rounded">
        Change Password
      </button>

      {showPasswordBox && (
        <div className="border p-4 rounded space-y-3">

          {step===1 && (
            <>
              <input value={data.phone}
                onChange={e=>setData({...data,phone:e.target.value})}
                className="w-full border rounded px-3 py-2"/>

              <div className="relative">
                <input type={showOld?"text":"password"}
                  placeholder="Old Password"
                  onChange={e=>setData({...data,oldPassword:e.target.value})}
                  className="w-full border rounded px-3 py-2"/>
                <span onClick={()=>setShowOld(!showOld)}
                  className="absolute right-3 top-2 cursor-pointer">👁</span>
              </div>

              <button type="button" onClick={verifyOld}
                className="w-full bg-indigo-600 text-white py-2 rounded">
                Verify Old Password
              </button>
            </>
          )}

          {step===2 && (
            <>
              <div className="relative">
                <input type={showNew?"text":"password"}
                  placeholder="New Password"
                  onChange={e=>setData({...data,newPassword:e.target.value})}
                  className="w-full border rounded px-3 py-2"/>
                <span onClick={()=>setShowNew(!showNew)}
                  className="absolute right-3 top-2 cursor-pointer">👁</span>
              </div>

              <div className="text-xs space-y-1">
                {rules.map(r=>(
                  <p key={r.label}
                    className={r.test(data.newPassword)
                      ?"text-green-600":"text-gray-400"}>
                    ✔ {r.label}
                  </p>
                ))}
              </div>

              <div className="relative">
                <input type={showConfirm?"text":"password"}
                  placeholder="Confirm Password"
                  onChange={e=>setData({...data,confirmPassword:e.target.value})}
                  className="w-full border rounded px-3 py-2"/>
                <span onClick={()=>setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2 cursor-pointer">👁</span>
              </div>

              {!otpSent ? (
                <button type="button"
                  disabled={!passwordsMatch}
                  onClick={sendOtp}
                  className="w-full bg-indigo-600 text-white py-2 rounded">
                  Send OTP
                </button>
              ):(
                <>
                  <input placeholder="Enter OTP"
                    onChange={e=>setData({...data,otp:e.target.value})}
                    className="w-full border rounded px-3 py-2"/>

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

                  <button type="button"
                    disabled={!isOtpValid}
                    onClick={changePassword}
                    className="w-full bg-green-600 text-white py-2 rounded">
                    Verify & Update Password
                  </button>
                </>
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}
