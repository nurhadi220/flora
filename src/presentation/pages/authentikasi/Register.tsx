import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>('');
  const [salutation, setSalutation] = useState<'female' | 'male'>('female');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [agreePromo, setAgreePromo] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }
    console.log('Register Payload:', {
      fullName,
      salutation,
      whatsapp,
      email,
      password,
      agreeTerms,
      agreePromo,
    });
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col relative w-full pt-safe pb-safe bg-surface">
        <div className="flex flex-col w-full pb-10 px-5 space-y-6 max-w-md mx-auto">
          {/* Navigasi Atas & Tombol Kembali */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
              <span className="text-xs font-semibold tracking-wide">🌸 Bergabung dengan FluffyClub</span>
            </div>
            <div className="w-11 h-11 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">local_florist</span>
            </div>
          </div>

          {/* Hero Header & Welcome Benefit Card */}
          <div className="space-y-4 text-center">
            <div className="space-y-1.5">
              <h1 className="font-headline text-3xl font-medium tracking-tight text-on-surface">
                Buat Akun Baru <span className="text-primary">✨</span>
              </h1>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed px-2">
                Dapatkan buket kawat bulu impianmu &amp; nikmati voucher selamat datang{' '}
                <span className="font-semibold text-primary">Rp 20.000!</span>
              </p>
            </div>

            {/* Soft Claymorphic Benefit Floating Pill Card */}
            <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-4 shadow-md text-left">
              <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-primary-container/20 blur-xl pointer-events-none"></div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-tertiary">
                      Bonus Member Baru
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  </div>
                  <p className="text-xs font-medium text-on-surface leading-tight">
                    Gratis Pita Kustom &amp; Lampu LED Fairy Lights di order pertamamu!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulir Pendaftaran */}
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            {/* Input: Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1">
                Nama Lengkap
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[19px]">person</span>
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama panggilan atau lengkapmu"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest text-on-surface text-sm rounded-2xl placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Input Feature Baru: Panggilan Sapaan Ramah */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-semibold text-on-surface-variant">
                  Panggilan Sapaan Ramah
                </label>
                <span className="text-[11px] text-outline font-medium">
                  (Agar pengrajin menyapamu tepat ✨)
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="salutation"
                    value="female"
                    checked={salutation === 'female'}
                    onChange={() => setSalutation('female')}
                    className="peer hidden"
                  />
                  <div className="py-2.5 px-3 rounded-2xl bg-surface-container-lowest border border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed/30 flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200">
                    <span className="text-xs font-semibold text-on-surface peer-checked:text-primary">
                      🌸 Kak Cantik / Mba
                    </span>
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="salutation"
                    value="male"
                    checked={salutation === 'male'}
                    onChange={() => setSalutation('male')}
                    className="peer hidden"
                  />
                  <div className="py-2.5 px-3 rounded-2xl bg-surface-container-lowest border border-transparent peer-checked:border-secondary peer-checked:bg-secondary-container/40 flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200">
                    <span className="text-xs font-semibold text-on-surface peer-checked:text-secondary">
                      🌿 Kak Ganteng / Mas
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Input: Nomor WhatsApp */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-semibold text-on-surface-variant">
                  Nomor WhatsApp Aktif
                </label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[19px]">chat</span>
                </div>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest text-on-surface text-sm rounded-2xl placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm"
                />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-secondary-container/50 text-on-secondary-container text-[11px] leading-tight">
                <span className="material-symbols-outlined text-[14px] shrink-0">notifications_active</span>
                <span>Untuk update foto &amp; progres perangkaian buketmu via WA</span>
              </div>
            </div>

            {/* Input: Alamat Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1">
                Alamat Email
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[19px]">mail</span>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emailkamu@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest text-on-surface text-sm rounded-2xl placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Input: Kata Sandi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[19px]">lock</span>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter kombinasi"
                  className="w-full pl-11 pr-11 py-3.5 bg-surface-container-lowest text-on-surface text-sm rounded-2xl placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3.5 text-outline hover:text-primary flex items-center justify-center p-1 rounded-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Input: Konfirmasi Kata Sandi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-on-surface-variant ml-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[19px]">task_alt</span>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-container-lowest text-on-surface text-sm rounded-2xl placeholder:text-outline/70 focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Syarat & Persetujuan */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="peer h-4 w-4 appearance-none rounded-md bg-surface-container-highest checked:bg-secondary transition-colors cursor-pointer"
                  />
                  <span className="material-symbols-outlined text-[13px] text-on-secondary absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    check
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Saya menyetujui{' '}
                  <a href="#" className="font-medium text-primary underline">
                    Ketentuan Layanan
                  </a>{' '}
                  &amp;{' '}
                  <a href="#" className="font-medium text-primary underline">
                    Kebijakan Privasi
                  </a>{' '}
                  FluffyPetal Studio.
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreePromo}
                    onChange={(e) => setAgreePromo(e.target.checked)}
                    className="peer h-4 w-4 appearance-none rounded-md bg-surface-container-highest checked:bg-secondary transition-colors cursor-pointer"
                  />
                  <span className="material-symbols-outlined text-[13px] text-on-secondary absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                    check
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant leading-relaxed">
                  Kirimkan saya update katalog buket terbaru &amp; promo diskon via WhatsApp.
                </span>
              </label>
            </div>

            {/* Tombol CTA Utama */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-primary text-on-primary font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Daftar &amp; Klaim Voucher 🌸</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Pemisah / Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow h-px bg-outline-variant/50"></div>
            <span className="flex-shrink mx-3 text-xs text-outline font-medium">atau daftar instan dengan</span>
            <div className="flex-grow h-px bg-outline-variant/50"></div>
          </div>

          {/* Tombol Sosial 1-Klik */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              className="py-3 px-4 rounded-2xl bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-xs font-semibold">Google</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              className="py-3 px-4 rounded-2xl bg-surface-container-lowest text-secondary shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
              <span className="text-xs font-semibold text-on-surface">WhatsApp</span>
            </button>
          </div>

          {/* Footer Navigasi & Security Micro-Badge */}
          <div className="space-y-4 pt-2 text-center">
            <p className="text-xs text-on-surface-variant font-medium">
              Sudah punya akun FluffyPetal?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                Masuk di sini
              </Link>
            </p>
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-outline text-[11px]">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Data pribadi &amp; alamatmu terenkripsi aman</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;