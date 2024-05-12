import { useState } from "react";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [OtpVerified, setOtpVerified] = useState(false);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => { },
          "expired-callback": () => { },
        },
        auth
      );
    }
  };

  const onSendVerificationCode = () => {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onVerifyOTP = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        setLoading(false);
        setOtpVerified(true);
        toast.success("OTP Verified");
        setShowOTP(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/update-password', {
    //   phoneNumber: phoneNumber,
    //   newPassword: newPassword,
    //   confirmNewPassword: confirmPassword,
    // });
    if (response.data.status == 0) {
      toast.success("password changed")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div id="recaptcha-container"></div>
        {showOTP && (
          <>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="otp-container mb-4"
              inputClassName="border text-sm text-black dark:text-black border-gray-300 rounded-md px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={onVerifyOTP}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
              Verify OTP
            </button>
          </>
        ) }
        
        { (!OtpVerified && !showOTP) &&
          
         (
           
          <>
            <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
            <p className="text-gray-500 mb-4">
              Enter your phone number to receive a verification code
            </p>
            <div className="flex flex-col items-center justify-center">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {loading && <CgSpinner className="animate-spin ml-2" />}

              <button
                onClick={onSendVerificationCode}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
              >
                Send Verification Code
              </button>
            </div>


          </>
        )}

{ OtpVerified  && (
        <div className="mt-8">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={onChangePassword}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
            >
              Change Password
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      )}

      </div>
     
    </div>
  );
};

export default ResetPassword;