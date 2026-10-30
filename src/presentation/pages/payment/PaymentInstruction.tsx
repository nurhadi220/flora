import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/organisms/Header';

interface PaymentStateProps {
  orderId?: string;
  ticketNo?: string;
  amount?: number;
  paymentMethodName?: string;
}

export const PaymentInstruction: React.FC = () => {
  const location = useLocation();

  // Menerima data state dari halaman Checkout
  const stateData = (location.state as PaymentStateProps) || {};
  const orderId = stateData.orderId || '#FP-8492';
  const ticketNo = stateData.ticketNo || 'TK-8492-QRIS9921';
  const amount = stateData.amount || 125000;
  const paymentMethodName = stateData.paymentMethodName || 'QRIS (Semua E-Wallet & Bank QR)';

  // Countdown Timer State (11 Menit 8 Detik sesuai mockup / 15 Menit)
  const [timeLeft, setTimeLeft] = useState<number>(11 * 60 + 8);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Countdown Timer Interval
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const copyToClipboard = (text: string, message: string) => {
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    triggerToast(message);
  };

  const handleCheckStatus = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      triggerToast('Status: Menunggu transfer di aplikasi Anda.');
    }, 1200);
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex flex-col min-h-screen">
      {/* Reusable Header */}
      <Header title="Instruksi Pembayaran" />

      <main className="flex flex-col relative w-full bg-surface">
            <div className="flex flex-col w-full pb-36 max-w-md mx-auto">

          {/* Floating Toast Notification */}
          <div
            className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full shadow-xl text-xs font-semibold ${
              showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-secondary-fixed">check_circle</span>
            <span>{toastMessage}</span>
          </div>

          <div className="px-4 pt-4 flex flex-col gap-4">
            
            {/* 1. Status & Countdown Header Card */}
            <div className="bg-surface-container-low rounded-2xl p-4 shadow-[0_8px_24px_-4px_rgba(217,119,106,0.08)] flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary font-label">
                    Menunggu Pembayaran
                  </span>
                </div>
                <p className="text-xs font-body text-on-surface-variant">Selesaikan sebelum batas waktu berakhir</p>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/30">
                <span className="material-symbols-outlined text-[16px] text-primary">timer</span>
                <span className="text-xs font-mono font-bold text-on-surface">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* 2. Total Tagihan & Order ID Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0_10px_26px_-4px_rgba(217,119,106,0.1)] flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-on-surface-variant font-medium">Total Pembayaran</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderId, 'Order ID disalin!')}
                  className="flex items-center gap-1 text-[11px] font-mono font-semibold text-primary bg-surface-container-low px-2.5 py-0.5 rounded-full hover:bg-surface-container transition-all cursor-pointer"
                >
                  <span>{orderId}</span>
                  <span className="material-symbols-outlined text-[13px] text-on-surface-variant">content_copy</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/20 font-body">
                <span className="text-on-surface-variant font-medium">No. Tiket Pembayaran</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(ticketNo, 'Nomor Tiket Pembayaran disalin!')}
                  className="flex items-center gap-1 text-[11px] font-mono font-semibold text-primary bg-surface-container-low px-2.5 py-0.5 rounded-full hover:bg-surface-container transition-all active:scale-95 cursor-pointer"
                >
                  <span>{ticketNo}</span>
                  <span className="material-symbols-outlined text-[13px] text-on-surface-variant">content_copy</span>
                </button>
              </div>

              <div className="flex items-baseline justify-between pt-0.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-primary">Rp</span>
                  <span className="font-headline text-3xl font-bold tracking-tight text-on-surface">
                    {amount.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(amount.toString(), `Nominal Rp ${amount.toLocaleString('id-ID')} berhasil disalin!`)}
                  className="flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container text-primary px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer font-label"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  <span>Salin Jumlah</span>
                </button>
              </div>
            </div>

            {/* 3. Badge Metode Terpilih */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-primary-fixed/40 border border-primary-fixed-dim/50 px-3.5 py-1.5 rounded-full text-xs text-on-primary-fixed font-medium shadow-2xs font-body">
                <span className="material-symbols-outlined text-[16px] text-primary">qr_code_2</span>
                <span>
                  Metode Pembayaran: <strong className="font-bold text-primary">{paymentMethodName}</strong>
                </span>
              </div>
            </div>

            {/* 4. QRIS Main Presentation Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_12px_28px_-6px_rgba(217,119,106,0.08)] flex flex-col items-center gap-4">
              {/* QR Frame Container */}
              <div className="relative bg-surface-container-low p-5 rounded-2xl shadow-inner flex flex-col items-center gap-3 w-full">
                <div className="w-56 h-56 relative flex items-center justify-center bg-surface-bright rounded-xl p-2 shadow-sm">
                  {/* Stylized Vector QR Code */}
                  <svg className="w-full h-full text-on-surface" fill="none" viewBox="0 0 200 200">
                    <rect fill="currentColor" height="50" rx="8" width="50" x="10" y="10" />
                    <rect fill="#ffffff" height="30" rx="4" width="30" x="20" y="20" />
                    <rect fill="currentColor" height="18" rx="2" width="18" x="26" y="26" />
                    <rect fill="currentColor" height="50" rx="8" width="50" x="140" y="10" />
                    <rect fill="#ffffff" height="30" rx="4" width="30" x="150" y="20" />
                    <rect fill="currentColor" height="18" rx="2" width="18" x="156" y="26" />
                    <rect fill="currentColor" height="50" rx="8" width="50" x="10" y="140" />
                    <rect fill="#ffffff" height="30" rx="4" width="30" x="20" y="150" />
                    <rect fill="currentColor" height="18" rx="2" width="18" x="26" y="156" />
                    <rect fill="currentColor" height="12" rx="2" width="12" x="70" y="15" />
                    <rect fill="currentColor" height="24" rx="2" width="12" x="90" y="15" />
                    <rect fill="currentColor" height="12" rx="2" width="18" x="110" y="20" />
                    <rect fill="currentColor" height="12" rx="2" width="15" x="70" y="35" />
                    <rect fill="currentColor" height="15" rx="2" width="12" x="115" y="40" />
                    <rect fill="currentColor" height="12" rx="2" width="15" x="15" y="70" />
                    <rect fill="currentColor" height="12" rx="2" width="24" x="35" y="75" />
                    <rect fill="currentColor" height="18" rx="2" width="20" x="15" y="90" />
                    <rect fill="currentColor" height="15" rx="2" width="18" x="42" y="95" />
                    <rect fill="currentColor" height="15" rx="2" width="12" x="15" y="115" />
                    <rect fill="currentColor" height="12" rx="2" width="25" x="35" y="115" />
                    <rect fill="currentColor" height="16" rx="3" width="16" x="72" y="65" />
                    <rect fill="currentColor" height="20" rx="2" width="12" x="95" y="65" />
                    <rect fill="currentColor" height="12" rx="2" width="15" x="115" y="65" />
                    <rect fill="currentColor" height="15" rx="2" width="20" x="140" y="70" />
                    <rect fill="currentColor" height="22" rx="2" width="18" x="168" y="75" />
                    <rect fill="currentColor" height="20" rx="2" width="15" x="140" y="95" />
                    <rect fill="currentColor" height="12" rx="2" width="22" x="165" y="105" />
                    <rect fill="currentColor" height="15" rx="2" width="24" x="70" y="140" />
                    <rect fill="currentColor" height="22" rx="2" width="15" x="100" y="135" />
                    <rect fill="currentColor" height="12" rx="2" width="20" x="125" y="140" />
                    <rect fill="currentColor" height="15" rx="2" width="30" x="155" y="135" />
                    <rect fill="currentColor" height="20" rx="2" width="16" x="70" y="165" />
                    <rect fill="currentColor" height="15" rx="2" width="25" x="95" y="165" />
                    <rect fill="currentColor" height="25" rx="2" width="15" x="130" y="160" />
                    <rect fill="currentColor" height="25" rx="3" width="25" x="155" y="160" />
                    <circle cx="100" cy="100" fill="#ffffff" r="18" />
                    <circle cx="100" cy="100" fill="#8a4b5a" r="14" />
                    <path d="M100 93C98 90 94 92 95 95C93 96 93 100 96 100C94 102 96 106 99 104C100 106 104 105 103 102C106 102 106 98 103 97C105 94 102 91 100 93Z" fill="#ffd9df" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-on-surface font-label tracking-wide">FluffyPetal Studio Official</p>
                  <p className="text-[11px] text-on-surface-variant font-mono">NMID: ID102488392019</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => copyToClipboard('', 'QR Code telah disimpan ke Galeri Foto!')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-surface-container text-primary font-label font-semibold text-xs rounded-full hover:bg-surface-container-high transition-all active:scale-95 shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">download</span>
                  <span>Unduh QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard('', 'Membuka aplikasi pembayaran pilihan Anda...')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-primary text-on-primary font-label font-semibold text-xs rounded-full hover:bg-primary/95 transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">open_in_new</span>
                  <span>Buka E-Wallet</span>
                </button>
              </div>

              {/* Supported Apps Badges */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-semibold rounded-full font-label">GoPay</span>
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-semibold rounded-full font-label">OVO</span>
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-semibold rounded-full font-label">ShopeePay</span>
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-semibold rounded-full font-label">Dana</span>
                <span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[10px] font-semibold rounded-full font-label">BCA Mobile</span>
              </div>
            </div>

            {/* 5. Single Line Ringkasan Pesanan */}
            <div className="bg-surface-container-low rounded-2xl px-4 py-3 shadow-[0_4px_16px_rgba(217,119,106,0.06)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-primary text-[19px] flex-shrink-0">local_florist</span>
                <p className="text-xs text-on-surface truncate font-body">
                  <strong className="font-semibold">Pesanan:</strong> Custom Buket Kelinci &amp; Tulip + Gantungan Kunci
                </p>
              </div>
              <span className="text-xs font-bold text-primary font-mono flex-shrink-0">
                Rp {amount.toLocaleString('id-ID')}
              </span>
            </div>

            {/* 6. Simple Tip Box */}
            <div className="bg-surface-container-lowest/80 border border-outline-variant/30 rounded-2xl px-4 py-3 flex items-center gap-2.5 text-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[18px] flex-shrink-0">lightbulb</span>
              <p className="text-xs text-on-surface-variant leading-tight font-body">
                Cukup scan kode QR di atas menggunakan aplikasi mobile banking atau e-wallet apa pun.
              </p>
            </div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-4 pt-3 pb-6 border-t border-outline-variant/20 shadow-[0_-8px_24px_rgba(217,119,106,0.08)] pb-safe">
            <div className="max-w-md mx-auto flex flex-col gap-2">
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleCheckStatus}
                className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary/95 text-on-primary font-label font-bold text-xs shadow-[0_8px_20px_rgba(138,75,90,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
              >
                <span className={`material-symbols-outlined text-[19px] ${isVerifying ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>{isVerifying ? 'Memeriksa Pembayaran...' : 'Cek Status Pembayaran'}</span>
              </button>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Kak%20Salsabila%2C%20saya%20butuh%20bantuan%20terkait%20pembayaran%20pesanan%20${encodeURIComponent(orderId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container font-label font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">chat</span>
                <span>Bantuan WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentInstruction;