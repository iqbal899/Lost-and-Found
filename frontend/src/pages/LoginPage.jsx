import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { MapPin, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-10 antialiased selection:bg-primary/10">
      <div className="w-full max-w-[420px] space-y-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2 text-center select-none animate-in fade-in slide-in-from-top-3 duration-500">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/15 dynamic-shadow">
            <MapPin className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-3">
            LostFound
          </h1>
        </div>

        {/* Responsive Content Container */}
        <div className="bg-transparent sm:bg-card/40 sm:backdrop-blur-md sm:border sm:border-border/60 sm:rounded-2xl sm:p-8 sm:shadow-xl sm:shadow-foreground/[0.02] transition-all duration-300">
          
          {/* Header Typography */}
          <div className="space-y-2 text-center mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                className="bg-background/50 h-11 px-3.5 border-muted-foreground/20 rounded-lg transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90">
                  Password
                </Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-medium text-primary/90 hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="bg-background/50 h-11 pl-3.5 pr-11 border-muted-foreground/20 rounded-lg transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/50"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="rounded-xl bg-destructive/10 p-3.5 text-xs font-medium text-destructive border border-destructive/15 animate-in fade-in zoom-in-95 duration-200">
                {error}
              </div>
            )}

            {/* Submit Action */}
            <Button 
              type="submit" 
              className="w-full h-11 rounded-lg font-medium tracking-wide shadow-sm active:scale-[0.985] transition-all duration-150 mt-2" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Bottom Navigation Link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            New to LostFound?{" "}
            <Link 
              to="/signup" 
              className="font-semibold text-primary hover:underline underline-offset-4 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}