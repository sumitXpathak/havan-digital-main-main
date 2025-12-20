import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// FIX: Import from your firebase setup file
import { auth } from "../lib/firebase"; 
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  onAuthStateChanged,
  ConfirmationResult 
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, User, Loader2, ArrowLeft, KeyRound } from "lucide-react";
import { z } from "zod";

const phoneSchema = z.string().regex(/^\+91[6-9]\d{9}$/, "Please enter a valid Indian phone number (+91XXXXXXXXXX)");
const otpSchema = z.string().length(6, "OTP must be 6 digits");

type AuthStep = "phone" | "otp";

// Add window type definition for reCAPTCHA
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const Auth = () => {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState<{ phone?: string; otp?: string; fullName?: string }>({});
  
  // Store the Firebase confirmation result to verify OTP later
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Listen for Auth State Changes (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Initialize Invisible ReCAPTCHA
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
            toast({
                title: "Error",
                description: "reCAPTCHA expired. Please try again.",
                variant: "destructive",
            });
        }
      });
    }
  }, [toast]);

  // Timer logic
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validatePhone = () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setErrors({ phone: result.error.errors[0].message });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateOtp = () => {
    const result = otpSchema.safeParse(otp);
    if (!result.success) {
      setErrors({ otp: result.error.errors[0].message });
      return false;
    }
    setErrors({});
    return true;
  };

  // --- FIREBASE: Send OTP ---
  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validatePhone()) return;
    
    setLoading(true);

    try {
      if (!window.recaptchaVerifier) {
          throw new Error("Recaptcha not initialized");
      }

      const appVerifier = window.recaptchaVerifier;
      
      // Firebase function to send SMS
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      // Save the result so we can confirm the code later
      setConfirmationResult(confirmation);

      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${phone}`,
      });
      
      setStep("otp");
      setResendTimer(60);
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      
      // Reset reCAPTCHA if error occurs so user can try again
      if(window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          // Ideally re-initialize, but often clearing is enough to trigger a reload or manual reset
      }

      toast({
        title: "Failed to send OTP",
        description: error.message || "Could not send SMS. Check quota or internet.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- FIREBASE: Verify OTP ---
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOtp()) return;
    if (!confirmationResult) {
        toast({ title: "Error", description: "Session expired. Please resend OTP.", variant: "destructive" });
        return;
    }
    
    setLoading(true);

    try {
      // Confirm the code using the object we saved earlier
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Optional: Update Display Name if it's a new user
      // Note: Firebase `updateProfile` isn't imported here but follows standard pattern
      // if (fullName) { ... }

      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/^\+91/, "");
    }
    const digits = value.slice(3).replace(/\D/g, "");
    setPhone("+91" + digits.slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-background to-gold-50 dark:from-saffron-950/20 dark:via-background dark:to-gold-950/20 flex items-center justify-center p-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 left-4 gap-2"
        onClick={() => step === "otp" ? setStep("phone") : navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" />
        {step === "otp" ? "Change Number" : "Back to Home"}
      </Button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary">
            🙏 श्री सनातन पूजा पाठ
          </h1>
          <p className="text-muted-foreground mt-2">Your Sacred Shopping Destination</p>
        </div>

        <Card className="border-saffron-200/50 dark:border-saffron-800/30 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-heading text-center">
              {step === "phone" ? "Login / Sign Up" : "Verify OTP"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "phone"
                ? "Enter your phone number to continue"
                : `Enter the 6-digit code sent to ${phone}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name (for new users)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                      disabled={loading}
                      maxLength={13}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Hidden container for ReCAPTCHA */}
                <div id="recaptcha-container"></div>

                <Button
                  type="submit"
                  variant="default" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-foreground">Enter OTP</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className={`pl-10 text-center text-2xl tracking-widest ${errors.otp ? "border-destructive" : ""}`}
                      disabled={loading}
                      maxLength={6}
                      autoFocus
                    />
                  </div>
                  {errors.otp && (
                    <p className="text-sm text-destructive">{errors.otp}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in {resendTimer}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;