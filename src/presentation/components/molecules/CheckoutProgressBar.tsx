import React from 'react';
import { motion } from 'framer-motion';

interface CheckoutProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export const CheckoutProgressBar: React.FC<CheckoutProgressBarProps> = ({ currentStep }) => {
  // Hitung persentase lebar garis (0%, 50%, atau 100%)
  const progressPercent = currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%';

  return (
    <section className="px-5 py-4 bg-surface-container-low shadow-sm">
      <div className="relative flex items-center justify-between max-w-md mx-auto">
        
        {/* Track Garis Belakang */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high rounded-full overflow-hidden">
          {/* Garis Aktif dengan Animasi Smooth Maju & Mundur */}
          <motion.div
            className="h-full bg-secondary"
            initial={false}
            animate={{ width: progressPercent }}
            transition={{ type: 'spring', stiffness: 40, damping: 12, mass: 0.8 }}
          />
        </div>

        {/* Step 1: Keranjang */}
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <motion.div
            animate={{
              scale: currentStep === 1 ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              currentStep >= 1
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {currentStep > 1 ? (
              <span className="material-symbols-outlined text-[16px]">check</span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            )}
          </motion.div>
          <span
            className={`text-[11px] font-label transition-colors duration-300 ${
              currentStep === 1
                ? 'font-bold text-primary'
                : currentStep > 1
                ? 'font-semibold text-secondary'
                : 'text-on-surface-variant'
            }`}
          >
            Keranjang
          </span>
        </div>

        {/* Step 2: Pengiriman */}
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <motion.div
            animate={{
              scale: currentStep === 2 ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              currentStep > 2
                ? 'bg-secondary text-on-secondary shadow-md'
                : currentStep === 2
                ? 'bg-primary text-on-primary shadow-lg ring-4 ring-primary-fixed'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            {currentStep > 2 ? (
              <span className="material-symbols-outlined text-[16px]">check</span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            )}
          </motion.div>
          <span
            className={`text-[11px] font-label transition-colors duration-300 ${
              currentStep === 2
                ? 'font-bold text-primary'
                : currentStep > 2
                ? 'font-semibold text-secondary'
                : 'text-on-surface-variant'
            }`}
          >
            Pengiriman
          </span>
        </div>

        {/* Step 3: Pembayaran */}
        <div className="relative flex flex-col items-center gap-1.5 z-10">
          <motion.div
            animate={{
              scale: currentStep === 3 ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              currentStep === 3
                ? 'bg-primary text-on-primary shadow-lg ring-4 ring-primary-fixed'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[17px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_florist
            </span>
          </motion.div>
          <span
            className={`text-[11px] font-label transition-colors duration-300 ${
              currentStep === 3 ? 'font-bold text-primary' : 'text-on-surface-variant'
            }`}
          >
            Bayar
          </span>
        </div>
      </div>
    </section>
  );
};

export default CheckoutProgressBar;