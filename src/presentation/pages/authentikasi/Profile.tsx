import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import BottomNav from '../../components/organisms/BottomNav';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin ingin keluar dari akun?')) {
      navigate('/login');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex flex-col min-h-screen">
      {/* Reusable Header Organism */}
      <Header title="Akun Pengguna" showBackButton={false} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full pb-8 max-w-md mx-auto">
          <div className="relative px-4 pt-3 pb-6 flex flex-col gap-6">
            
            {/* 1. Header Profil Pengguna */}
            <div className="w-full bg-surface-container-low rounded-xl p-5 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-secondary-fixed/50 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="relative flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary-container via-surface-container-lowest to-secondary-container shadow-[0_8px_20px_rgba(247,168,184,0.35)]">
                    <img
                      alt="Profile Avatar"
                      className="w-full h-full object-cover rounded-full shadow-inner"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK8MDrhPIrimG8sueJYtUcocCslodAFgpGt_ZcHePUxjcYnhD9q_5PdkSSj_ESvuJxQVq-6XBoZHJEwvzOi6_iCb9l1ElrcMfHNnxU2RfBre4ygZZlt-u__PoDjQ8W7WjQqYxda3Dnud4Zm2HmQyl-2nDfl5GhCq7E3XBS06opsznr2nrHRnR05eXlokhnQpx1_OUgmwshWG9xrVOqpKiYwar1dSozhjjJeWaHT12DNW2GIU7NiobRWA"
                    />
                  </div>
                  {/* VIP Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-on-primary px-3 py-0.5 rounded-full text-[11px] font-label font-bold flex items-center gap-1 shadow-[0_4px_12px_rgba(138,75,90,0.3)]">
                    <span className="material-symbols-outlined text-[13px] text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                    <span>VIP Petal Blossom</span>
                  </div>
                </div>

                {/* Name & Contact */}
                <h2 className="font-headline text-2xl font-normal text-on-surface mt-2 tracking-tight">
                  Nadia Putri Maharani
                </h2>
                <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-xs font-body mt-1 flex-wrap">
                  <span className="font-medium">+62 812-3456-7890</span>
                  <span className="text-outline-variant font-bold">•</span>
                  <span className="text-on-surface-variant">nadia.putri@email.com</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-surface-container-lowest text-primary font-label text-xs font-bold px-4 py-2 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(217,119,106,0.1)] hover:bg-surface-container-low transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Ubah Profil</span>
                  </button>
                  <button
                    type="button"
                    className="bg-surface-container-high text-on-surface-variant p-2 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] hover:text-primary transition-colors active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Kartu Loyalitas & Poin Gemoy */}
            <div className="w-full bg-gradient-to-br from-primary-fixed via-surface-container-low to-tertiary-fixed rounded-xl p-5 shadow-[0_16px_36px_-6px_rgba(217,119,106,0.18),0_6px_14px_rgba(45,37,40,0.04)] relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-container/40 blur-xl pointer-events-none"></div>
              <div className="absolute top-2 right-3 opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-7xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_florist
                </span>
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        spa
                      </span>
                    </span>
                    <span className="font-headline text-lg font-medium text-on-primary-fixed leading-none">FluffyClub Pass</span>
                  </div>
                  <span className="bg-surface-container-lowest/80 text-on-surface-variant px-2.5 py-1 rounded-full text-[11px] font-label font-bold shadow-sm backdrop-blur-sm">
                    Tingkat 3 • Velvet
                  </span>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <div>
                    <p className="font-label text-xs text-on-surface-variant">Saldo FluffyPoints</p>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-headline text-3xl font-medium text-on-primary-fixed tracking-tight">1.250</span>
                      <span className="font-label text-xs font-bold text-primary">Poin</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-primary text-on-primary font-label text-xs font-bold px-3.5 py-2 rounded-full shadow-[inset_0_2px_2px_rgba(255,255,255,0.7),0_6px_16px_rgba(138,75,90,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">redeem</span>
                    <span>Tukar Hadiah</span>
                  </button>
                </div>

                <div className="mt-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_12px_rgba(45,37,40,0.03)] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-secondary shadow-sm">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        confirmation_number
                      </span>
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label text-xs font-bold text-on-surface">3 Voucher Siap Pakai</span>
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                      </div>
                      <span className="font-body text-[11px] text-on-surface-variant">Diskon Wisuda 15% &amp; Gratis Lampu LED</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                </div>
              </div>
            </div>

            {/* 3. Status Pesanan Buket Saya */}
            <div className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <h3 className="font-headline text-lg font-medium text-on-surface">Pesanan Kerajinan Saya</h3>
                </div>
                <button type="button" className="font-label text-xs font-bold text-primary hover:text-tertiary transition-colors flex items-center gap-0.5 cursor-pointer">
                  <span>Lihat Semua</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <button type="button" className="flex flex-col items-center p-2 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.9)]">
                    <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
                  </div>
                  <span className="font-label text-[11px] font-semibold text-on-surface mt-1.5 text-center leading-tight">Menunggu Bayar</span>
                </button>

                <button type="button" className="flex flex-col items-center p-2 rounded-lg bg-surface-container-low transition-all relative cursor-pointer">
                  <div className="relative w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_14px_rgba(247,168,184,0.35)] scale-105">
                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      content_cut
                    </span>
                    <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] font-label font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      1
                    </span>
                  </div>
                  <span className="font-label text-[11px] font-bold text-primary mt-1.5 text-center leading-tight">Dirangkai ✂️</span>
                </button>

                <button type="button" className="flex flex-col items-center p-2 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.9)]">
                    <span className="material-symbols-outlined text-[22px]">two_wheeler</span>
                    <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] font-label font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      1
                    </span>
                  </div>
                  <span className="font-label text-[11px] font-semibold text-on-surface mt-1.5 text-center leading-tight">Dikirim 🛵</span>
                </button>

                <button type="button" className="flex flex-col items-center p-2 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.9)]">
                    <span className="material-symbols-outlined text-[22px]">star</span>
                    <span className="absolute -top-1 -right-1 bg-on-surface-variant text-surface-container-lowest text-[10px] font-label font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      2
                    </span>
                  </div>
                  <span className="font-label text-[11px] font-semibold text-on-surface mt-1.5 text-center leading-tight">Ulasan ⭐</span>
                </button>
              </div>

              {/* Active Craft Item Card */}
              <div className="mt-1 bg-surface-container-low rounded-lg p-3.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9)] flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container flex-shrink-0 shadow-[0_4px_10px_rgba(45,37,40,0.06)]">
                    <img
                      alt="Buket Tulip Pastel Chenille"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHsMDnyVRlZdI1bbkEZ81gRzEzHcL4Zj7rfPukSIPIkj9etXYB_3i8KvTKdEtZhn1xTWNnUnuRhS-ZAbnBkWgT1Gwdyb8ecPmAM65BVM8YdyT96KtLE-6hZB7oFCGOnq1hwvLTPmOYn8LVXZwu4QLSB3wr4xoS-wjZ4mD0XC8aIFElPTxVvsBOV5muJWq-Co8GKW4Vul0_K8Ib41booFEFXQZYOzuBno4X7xx6wdOk1xIRYxcOncT1aQ"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider bg-secondary-container px-2 py-0.5 rounded-full">
                        Proses Pengerjaan
                      </span>
                      <span className="font-label text-[11px] font-semibold text-on-surface-variant">#FP-8492</span>
                    </div>
                    <h4 className="font-headline text-sm font-medium text-on-surface truncate mt-1">
                      Buket Tulip Pastel Chenille (7 Tangkai)
                    </h4>
                    <p className="font-body text-[11px] text-on-surface-variant mt-0.5 line-clamp-2 leading-tight">
                      Pengrajin sedang melilit kawat bulu &amp; wrapping (Estimasi tiba sore ini 16:00 WIB).
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full flex items-center gap-1.5 pt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-secondary"></div>
                  <div className="flex-1 h-1.5 rounded-full bg-primary-container relative">
                    <div className="absolute -top-1 right-0 w-3.5 h-3.5 rounded-full bg-primary shadow-sm animate-ping opacity-75"></div>
                    <div className="absolute -top-1 right-0 w-3.5 h-3.5 rounded-full bg-primary shadow-sm"></div>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full bg-surface-container-highest"></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-body text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">eco</span>
                    Studio Buaran, Tangerang Selatan
                  </span>
                  <button
                    type="button"
                    className="bg-primary-container text-on-primary-container font-label text-xs font-bold px-3 py-1.5 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_10px_rgba(247,168,184,0.3)] hover:scale-102 active:scale-95 transition-all cursor-pointer"
                  >
                    Lacak Pesanan
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Menu Navigasi Pengguna */}
            <div className="flex flex-col gap-4">
              {/* Aktivitas Saya */}
              <div className="flex flex-col gap-2">
                <span className="font-label text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wider">
                  Aktivitas Saya
                </span>
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col">
                  <a href="#" className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          favorite
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label text-sm font-semibold text-on-surface">Koleksi Favorit / Wishlist</span>
                        <span className="font-body text-xs text-on-surface-variant">12 Buket kawat bulu tersimpan</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-surface-container text-on-surface-variant text-xs font-label font-bold px-2 py-0.5 rounded-full">12</span>
                      <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                    </div>
                  </a>
                  <div className="h-[1px] bg-surface-container mx-4"></div>
                  <a href="#" className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]">palette</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label text-sm font-semibold text-on-surface">Kustomisasi Tersimpan</span>
                        <span className="font-body text-xs text-on-surface-variant">Draft warna kelopak &amp; pita wrapping</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-label font-bold px-2 py-0.5 rounded-full">2 Draft</span>
                      <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                    </div>
                  </a>
                  <div className="h-[1px] bg-surface-container mx-4"></div>
                  <a href="#" className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label text-sm font-semibold text-on-surface">Alamat Pengiriman Studio &amp; Kos</span>
                        <span className="font-body text-xs text-on-surface-variant">Utama: Kos Melati Asri, Bintaro</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-surface-container text-on-surface-variant text-xs font-label font-bold px-2 py-0.5 rounded-full">2 Alamat</span>
                      <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Bantuan & Pengaturan */}
              <div className="flex flex-col gap-2">
                <span className="font-label text-xs font-bold text-on-surface-variant px-1 uppercase tracking-wider">
                  Bantuan &amp; Pengaturan
                </span>
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col">
                  <a href="#" className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label text-sm font-semibold text-on-surface">Chat Pengrajin &amp; CS Studio</span>
                        <span className="font-body text-xs text-on-surface-variant">Respon cepat via WhatsApp Pengrajin</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <span className="material-symbols-outlined text-outline-variant text-[20px]">chevron_right</span>
                    </div>
                  </a>
                  <div className="h-[1px] bg-surface-container mx-4"></div>
                  <a href="#" className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed-variant group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]">storefront</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label text-sm font-semibold text-on-surface">Dashboard Admin &amp; Kasir</span>
                          <span className="bg-primary text-on-primary text-[10px] font-label font-bold px-1.5 py-0.2 rounded">Staf</span>
                        </div>
                        <span className="font-body text-xs text-on-surface-variant">Akses POS kasir &amp; stok kawat bulu</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">sync_alt</span>
                  </a>
                  <div className="h-[1px] bg-surface-container mx-4"></div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-4 flex items-center justify-between hover:bg-error-container/20 transition-colors w-full text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error group-hover:scale-105 transition-transform shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label text-sm font-semibold text-error">Keluar Akun</span>
                        <span className="font-body text-xs text-error/80">Akhiri sesi di perangkat ini</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-error/60 text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="text-center pt-2 pb-2">
              <div className="inline-flex items-center gap-1.5 bg-surface-container px-3.5 py-1.5 rounded-full text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
                <span className="font-body text-xs font-medium">FluffyPetal Studio • Handmade with chenille yarn</span>
              </div>
              <p className="font-body text-[11px] text-outline mt-1.5">Versi Aplikasi 2.4.0 (Petal Edition)</p>
            </div>
          </div>
        </div>
      </main>

      {/* Reusable Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;