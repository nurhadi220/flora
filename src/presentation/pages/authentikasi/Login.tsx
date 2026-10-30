import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

type Role = 'customer' | 'artisan';

export const Login: React.FC = () => {
  const [role, setRole] = useState<Role>('customer');
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const handleLoginSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);

    if (identifier === "admin" && password === "admin") {
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setIsSuccess(false);
      alert("Username atau password salah!");
    }
  }, 1200);
};

  const triggerSocialFeedback = (provider: string) => {
    // Handling login sosial (Google / WhatsApp)
    console.log(`Login via ${provider} sebagai ${role}`);
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col relative w-full pt-safe pb-safe bg-surface">
        <div className="flex flex-col w-full pb-8 px-4 sm:px-6 max-w-md mx-auto">
          {/* Decorative Ambient Fluff Ornaments */}
          <div className="relative w-full pt-4 flex flex-col items-center">
            {/* Hero Visual / 3D Chenille Flower Header */}
            <div className="relative w-full flex flex-col items-center mb-6">
              {/* Glow Pod Behind Craft Visual */}
              <div className="relative w-36 h-36 rounded-full bg-surface-container flex items-center justify-center shadow-lg shadow-primary-container/20">
                <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-inner bg-surface-container-low flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
                    alt="Exquisite handmade pipe-cleaner fuzzy chenille wire pastel tulips and daisies bouquet"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrzCptil1MHb_6RzsiqxCyxufuZ32ypGwwaroTMZ_CdhWNKtWBIcQw57VsMctTdRuWVrPSBdlABks95refHFNTefZKOnTVMCckulMFp1WRajjabA4pExNrldw5vtIYHrA_Y1WG9w_4NcEXbqS7FaBJSXsnRZpa3qmYsZjMqgVJ852aDV7Jp2AP4rckeNBHDLdvZ-SxJOQDdx0V3A6zpzRUpE9xP9jE8-Jx4Vdt1sHVWFMJb3Hhf3v7uQ"
                  />
                </div>
                {/* Floating Clay Badges & Sparkle Pins */}
                <div className="absolute -top-1.5 -right-1 bg-surface-container-lowest text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                  <span
                    className="material-symbols-outlined text-[15px] text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    spa
                  </span>
                  <span className="text-[11px] tracking-wide text-primary">Handmade</span>
                </div>
                <div className="absolute -bottom-2 -left-2 bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">favorite</span>
                  <span>Bulu Halus</span>
                </div>
              </div>

              {/* Welcome Editorial Headings */}
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-container-low text-primary text-xs font-medium mb-1.5">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  <span>Ruang Rajutan Kasih</span>
                </div>
                <h1 className="font-headline text-2xl sm:text-3xl text-on-surface font-normal tracking-tight">
                  Selamat Datang di <span className="text-primary italic font-serif">FluffyPetal Studio</span> ✨
                </h1>
                <p className="text-on-surface-variant text-xs sm:text-sm mt-1.5 max-w-xs font-body leading-relaxed">
                  Masuk untuk pesan buket bunga kawat bulu kustom &amp; pantau pesanan buatan tanganmu.
                </p>
              </div>
            </div>

            {/* Role Switcher Pill / Chip */}
            <div className="w-full bg-surface-container-high p-1 rounded-full flex items-center justify-between mb-6 shadow-inner">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  role === 'customer'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-base">face_retouching_natural</span>
                <span>Pelanggan Cantik</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('artisan')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  role === 'artisan'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-base">palette</span>
                <span>Staff / Pengrajin</span>
              </button>
            </div>

            {/* Claymorphic Form Container */}
            <div className="w-full bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xl shadow-primary-container/20 relative">
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                {/* Input 1: WhatsApp / Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-on-surface-variant tracking-wide px-1">
                    WhatsApp atau Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-outline text-lg pointer-events-none material-symbols-outlined">
                      alternate_email
                    </span>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        role === 'customer'
                          ? 'Contoh: 08123456789 atau emailmu'
                          : 'ID Pengrajin / Email Internal Studio'
                      }
                      className="w-full bg-surface-container-low text-on-surface text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:bg-surface-bright focus:shadow-md transition-all placeholder:text-outline-variant font-body shadow-inner"
                    />
                  </div>
                </div>

                {/* Input 2: Password with Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-semibold text-on-surface-variant tracking-wide">
                      Kata Sandi
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-outline text-lg pointer-events-none material-symbols-outlined">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi rahasiamu"
                      className="w-full bg-surface-container-low text-on-surface text-xs sm:text-sm pl-11 pr-11 py-3 rounded-2xl focus:outline-none focus:bg-surface-bright focus:shadow-md transition-all placeholder:text-outline-variant font-body shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 text-outline hover:text-primary transition-colors p-1 flex items-center justify-center rounded-full"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 pb-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md accent-primary text-on-primary bg-surface-container-low cursor-pointer"
                    />
                    <span className="text-on-surface-variant font-medium">Ingat Saya</span>
                  </label>
                  <a href="#" className="text-tertiary hover:underline font-semibold transition-colors">
                    Lupa Sandi?
                  </a>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-6 rounded-full bg-primary text-on-primary font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      <span>Membuka Pintu Studio...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Link to = "/"> </Link>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        local_florist
                      </span>
                      <span>{role === 'customer' ? 'Masuk ke Studio' : 'Masuk Meja Pengrajin'}</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full bg-surface-variant h-px"></div>
                <span className="absolute bg-surface-container-lowest px-3 text-[11px] font-medium text-outline">
                  atau masuk lebih cepat dengan
                </span>
              </div>

              {/* Quick Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp One-Click */}
                <button
                  type="button"
                  onClick={() => triggerSocialFeedback('WhatsApp')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-secondary-container text-on-secondary-container text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    chat
                  </span>
                  <span>WhatsApp</span>
                </button>

                {/* Google Fast Login */}
                <button
                  type="button"
                  onClick={() => triggerSocialFeedback('Google')}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-surface-container text-on-surface text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </div>

            {/* Craft Guarantee Mini Showcase */}
            <div className="mt-6 w-full flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium shadow-sm">
                <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                <span>100% Kerajinan Tangan Halus &amp; Tahan Selamanya 🌸</span>
              </div>
            </div>

            {/* Bottom Registration Link */}
            <div className="mt-4 text-center">
              <p className="text-xs text-on-surface-variant font-body">
                Belum punya akun koleksi?
                <Link to="/register" className="font-bold text-primary hover:text-tertiary transition-colors ml-1">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;