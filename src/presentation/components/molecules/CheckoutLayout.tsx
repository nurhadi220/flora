import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/organisms/Header';
import CheckoutProgressBar from './CheckoutProgressBar';

export const CheckoutLayout = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  // 1. Penentuan Step berdasarkan Path (Sudah diperbaiki typonya)
  const isCart = pathname === '/cart';
  const isPayment = pathname === '/payment-instruction' || pathname === '/payment';

  // Kalkulasi Step (1: Cart, 2: Checkout, 3: Bayar)
  const step: 1 | 2 | 3 = isCart ? 1 : isPayment ? 3 : 2;

  // Penentuan Judul Header Dinamis
  const title = isCart
    ? 'Keranjang Belanja'
    : isPayment
    ? 'Instruksi Pembayaran'
    : 'Checkout & Pembayaran';

  return (
    <div className="bg-surface font-body text-on-surface flex flex-col min-h-screen pt-16">
      <Header title={title} />

      {/* Progress bar berada di luar AnimatePresence Halaman agar animasinya berjalan independen & smooth */}
      <CheckoutProgressBar currentStep={step} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CheckoutLayout;