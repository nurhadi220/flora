import React, { useState } from "react";
import Header from "../../components/organisms/Header";
import { useNavigate } from "react-router-dom";

export const Checkout: React.FC = () => {
  
  // State Mode Pengiriman: 'delivery' | 'pickup'
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">(
    "delivery",
  );

  // State Metode Pembayaran: 'qris' | 'cash' | 'va' | 'card'
  const [paymentMethod, setPaymentMethod] = useState<
    "qris" | "cash" | "va" | "card"
  >("qris");

  // State Jadwal Pengerjaan: 'regular' | 'special'
  const [scheduleOption, setScheduleOption] = useState<"regular" | "special">(
    "special",
  );

  // State Accordion Item Pesanan
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(true);

  // Kalkulasi Harga
  const productTotal = 130000;
  const shippingFee = deliveryMode === "delivery" ? 25000 : 0;
  const voucherDiscount = 20000;
  const shippingDiscount = deliveryMode === "delivery" ? 10000 : 0;

  const grandTotal = Math.max(
    0,
    productTotal + shippingFee - voucherDiscount - shippingDiscount,
  );
  const totalSavings = voucherDiscount + shippingDiscount;

  const navigate = useNavigate();

  const handleConfirmPayment = () => {
      navigate("/payment");
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex flex-col min-h-screen">
      {/* Reusable Header */}
      <Header title="Checkout & Pembayaran" />

        <main className="flex flex-col relative w-full bg-surface">
            <div className="flex flex-col w-full pb-36 max-w-md mx-auto">
            <div className="flex flex-col gap-3.5 px-4 pt-4">
            {/* 1. Card Metode Penerimaan (Disamakan dengan Card Cart) */}
            <section className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                  </div>
                  <h2 className="font-headline font-semibold text-sm text-on-surface">
                    Metode Penerimaan
                  </h2>
                </div>
              </div>

              {/* Tab Selector: Kirim Kurir vs Ambil Sendiri */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface-container-low shadow-inner">
                <button
                  type="button"
                  onClick={() => setDeliveryMode("delivery")}
                  className={`py-2 px-3 rounded-xl text-xs font-label font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryMode === "delivery"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    two_wheeler
                  </span>
                  <span>Kirim Kurir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMode("pickup")}
                  className={`py-2 px-3 rounded-xl text-xs font-label font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryMode === "pickup"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    storefront
                  </span>
                  <span>Ambil Sendiri</span>
                </button>
              </div>

              {/* Detail Konten Alamat (Kirim Kurir) */}
              {deliveryMode === "delivery" ? (
                <div className="bg-surface-container-low rounded-2xl p-3 text-xs space-y-2 text-on-surface-variant shadow-inner transition-all">
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline font-semibold text-sm text-on-surface">
                        Kos Melati Asri
                      </span>
                      <span className="text-[10px] font-label font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                        Utama
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-[11px] font-label font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Ubah Alamat
                    </button>
                  </div>
                  <p className="font-body text-xs font-semibold text-on-surface">
                    Nadia Putri Maharani{" "}
                    <span className="text-on-surface-variant font-normal">
                      (+62 812-3456-7890)
                    </span>
                  </p>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Jl. Anggrek No. 14, Bintaro Sektor 7, Pondok Aren, Kota
                    Tangerang Selatan, Banten 15224.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-tertiary">
                    <span className="material-symbols-outlined text-[15px]">
                      edit_note
                    </span>
                    <span className="font-body italic text-[11px]">
                      Catatan: Titipkan di pos satpam depan gapura mawar jika
                      kos terkunci.
                    </span>
                  </div>
                </div>
              ) : (
                /* Detail Konten Ambil Sendiri (Self Pickup) */
                <div className="bg-surface-container-low rounded-2xl p-3 text-xs space-y-2 text-on-surface-variant shadow-inner transition-all">
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                    <span className="font-headline font-semibold text-sm text-on-surface">
                      FluffyPetal Studio
                    </span>
                    <span className="text-[10px] font-label font-bold px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container">
                      Bebas Ongkir
                    </span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    Jl. Buaran Raya No. 45, Bintaro Sektor 3, Tangerang Selatan
                    (Samping Kopi Kenangan Buaran).
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-on-surface bg-surface-container-lowest p-2 rounded-xl shadow-sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-secondary">
                        schedule
                      </span>
                      Jam Buka Studio: 09:00 - 20:00 WIB
                    </span>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="font-label font-bold text-primary flex items-center gap-0.5 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        map
                      </span>
                      Maps
                    </a>
                  </div>
                </div>
              )}
            </section>

            {/* 2. Card Jadwal Rangkai & Pengiriman (Disamakan dengan Card Cart) */}
            <section className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    calendar_month
                  </span>
                </div>
                <div>
                  <h2 className="font-headline font-semibold text-sm text-on-surface">
                    Jadwal Rangkai &amp;{" "}
                    {deliveryMode === "delivery" ? "Pengiriman" : "Penjemputan"}
                  </h2>
                  <p className="text-[11px] text-on-surface-variant font-body">
                    Dibuat telaten satu per satu dengan kawat chenille halus
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <label
                  onClick={() => setScheduleOption("regular")}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                    scheduleOption === "regular"
                      ? "bg-surface-container-low ring-1 ring-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule_option"
                    checked={scheduleOption === "regular"}
                    onChange={() => {}}
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-label font-bold text-on-surface">
                      Siap Kirim Segera (1-2 Hari)
                    </p>
                    <p className="text-[11px] font-body text-on-surface-variant">
                      Langsung masuk antrean perajin hari ini
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setScheduleOption("special")}
                  className={`flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                    scheduleOption === "special"
                      ? "bg-surface-container-low ring-1 ring-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule_option"
                    checked={scheduleOption === "special"}
                    onChange={() => {}}
                    className="accent-primary w-4 h-4 mt-1 cursor-pointer"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-label font-bold text-on-surface">
                        Atur Tanggal Spesial (Wisuda / Ultah)
                      </p>
                      <span className="text-[10px] font-label font-bold px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container">
                        Terpilih
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl bg-surface-container-lowest shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        celebration
                      </span>
                      <div>
                        <p className="text-xs font-label font-bold text-primary">
                          Tiba: Rabu, 28 Mei 2026
                        </p>
                        <p className="text-[10px] font-body text-on-surface-variant">
                          Keterangan: Hadiah Wisuda Nadia
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* 3. Ringkasan Pesanan (Collapsible Card) */}
            <section className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col">
              <button
                type="button"
                onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                className="flex items-center justify-between w-full text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      shopping_bag
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline font-semibold text-sm text-on-surface">
                      Rincian Item (2 Barang)
                    </h2>
                    <p className="text-[11px] text-on-surface-variant font-body">
                      Buket kawat bulu &amp; gantungan tas
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-on-surface-variant text-[20px] transition-transform duration-200 ${
                    isOrderSummaryOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOrderSummaryOpen && (
                <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 shadow-inner">
                      <img
                        alt="Custom Buket Kelinci"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9do9m-5o8QP1YGqlL1d7y9c5yCnNiZH1KV0ft-IkfVy2cdVlp6fI4VPNxxpCkDuhME8AO7iGPpQKv2s0oYkxp-1KJyERSjiq5VjGA6_LYXhLfrxEnlTDgGajxv0pAs8eVUVFvk2hdAaPp7ieBqAY-yx2SyJ6mkk60NzAEj0YO9CVx97yHTDdXEg3CwjNIakNAjPueZluT0bMjDNSv7Q3yKdsuuOAeIQyJ-N5FycCPEo4-tt6w3pjDA"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-headline font-semibold text-on-surface truncate">
                        Custom Buket Kelinci &amp; Tulip Gemoy
                      </p>
                      <p className="text-[11px] font-body text-on-surface-variant">
                        Warna: Lilac Berry &amp; Soft Cream
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-body text-on-surface-variant">
                          1x
                        </span>
                        <span className="text-xs font-label font-bold text-tertiary">
                          Rp 105.000
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 shadow-inner">
                      <img
                        alt="Gantungan Daisy"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4e8jBHeqvzLaiBFktCUWU5O_kqjaq1z56Emyn0BmxgUIKdtfn-dwqPSHRFzDb9jFpzeFfD4S2XIEpZv2EuD_62v8iBAH6St-BPCelSKbXw0WQRObDufvyUxZ8V_k6z8a-E2cU1ZXfll29YEdbK0BNmDcqsNwqNQJ7VZHSNyoyc8A1IwLa6OGsi-YPNA3NLzI9oL33OezixpFeNECtVUMSTo0ZWxcZQNYgLrDRk0bZze05fwLCX505A"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-headline font-semibold text-on-surface truncate">
                        Gantungan Kunci Daisy Pastel
                      </p>
                      <p className="text-[11px] font-body text-on-surface-variant">
                        Warna: Matcha Green &amp; Yellow Petals
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-body text-on-surface-variant">
                          1x
                        </span>
                        <span className="text-xs font-label font-bold text-tertiary">
                          Rp 25.000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 4. Card Metode Pembayaran */}
            <section className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    payments
                  </span>
                </div>
                <h2 className="font-headline font-semibold text-sm text-on-surface">
                  Metode Pembayaran
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {/* QRIS */}
                <label
                  onClick={() => setPaymentMethod("qris")}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === "qris"
                      ? "bg-surface-container-low ring-1 ring-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "qris"}
                      onChange={() => {}}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-label font-bold text-on-surface">
                          QRIS (Semua E-Wallet &amp; Bank)
                        </span>
                        <span className="text-[10px] font-label font-bold px-1.5 py-0.5 rounded-full bg-primary text-on-primary">
                          Instan ⚡
                        </span>
                      </div>
                      <p className="text-[11px] font-body text-on-surface-variant mt-0.5">
                        GoPay, ShopeePay, OVO, DANA, BCA QR
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    qr_code_scanner
                  </span>
                </label>

                {/* Tunai / Cash */}
                <label
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === "cash"
                      ? "bg-surface-container-low ring-1 ring-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "cash"}
                      onChange={() => {}}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-label font-bold text-on-surface">
                          {deliveryMode === "pickup"
                            ? "Bayar Tunai di Kasir Studio"
                            : "Bayar di Tempat (COD)"}
                        </span>
                        <span className="text-[10px] font-label font-bold px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                          Cash
                        </span>
                      </div>
                      <p className="text-[11px] font-body text-on-surface-variant mt-0.5">
                        {deliveryMode === "pickup"
                          ? "Bayar langsung saat mengambil buket di studio"
                          : "Bayar tunai ke kurir saat buket sampai"}
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    payments
                  </span>
                </label>

                {/* Virtual Account */}
                <label
                  onClick={() => setPaymentMethod("va")}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === "va"
                      ? "bg-surface-container-low ring-1 ring-primary/40 shadow-sm"
                      : "bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === "va"}
                      onChange={() => {}}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-label font-semibold text-on-surface">
                        Virtual Account Bank
                      </span>
                      <p className="text-[11px] font-body text-on-surface-variant mt-0.5">
                        BCA, Mandiri, BRI, BNI
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    account_balance
                  </span>
                </label>
              </div>
            </section>

            {/* 5. Rincian Tagihan (Card Styling) */}
            <section className="bg-surface-container-low rounded-3xl p-4 space-y-2.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-on-surface font-headline font-semibold text-sm mb-1">
                <span className="material-symbols-outlined text-primary text-base">
                  receipt_long
                </span>
                Ringkasan Biaya
              </div>
              <div className="flex justify-between items-center text-xs font-body text-on-surface-variant">
                <span>Total Harga Produk (2 Barang)</span>
                <span className="text-on-surface font-medium">
                  Rp {productTotal.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs font-body text-on-surface-variant">
                <span>Biaya Pengiriman</span>
                <span className="text-on-surface font-medium">
                  {deliveryMode === "pickup" ? (
                    <span className="text-secondary font-bold font-label uppercase text-[10px] bg-secondary-container px-2 py-0.5 rounded-full">
                      Ambil Sendiri (Gratis)
                    </span>
                  ) : (
                    `Rp ${shippingFee.toLocaleString("id-ID")}`
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs font-body text-on-surface-variant">
                <span className="text-tertiary font-medium">
                  Voucher Studio Chenille
                </span>
                <span className="text-tertiary font-bold">
                  - Rp {voucherDiscount.toLocaleString("id-ID")}
                </span>
              </div>

              {deliveryMode === "delivery" && (
                <div className="flex justify-between items-center text-xs font-body text-on-surface-variant">
                  <span className="text-tertiary font-medium">
                    Diskon Ongkir Buket
                  </span>
                  <span className="text-tertiary font-bold">
                    - Rp {shippingDiscount.toLocaleString("id-ID")}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-label font-bold text-on-surface block">
                    Total Pembayaran
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-body">
                    Sudah termasuk pajak &amp; kemasan
                  </span>
                </div>
                <span className="font-headline font-bold text-lg text-tertiary">
                  Rp {grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </section>

            {/* Micro Note Crafting */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  volunteer_activism
                </span>
              </div>
              <p className="text-[11px] font-body text-on-surface-variant leading-snug">
                Setiap kelopak kawat bulu dipintal tangan dengan cinta.
                Pesananmu akan langsung dikerjakan perajin.
              </p>
            </div>
          </div>

          {/* Sticky Bottom Checkout Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-4 py-3 shadow-[0_-8px_24px_rgba(45,37,40,0.06)] pb-safe">
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider font-semibold">
                    Total Tagihan
                  </span>
                  {totalSavings > 0 && (
                    <span className="text-[9px] bg-tertiary-fixed text-on-tertiary-fixed font-label font-bold px-1.5 py-0.2 rounded-full">
                      Hemat {totalSavings / 1000}rb
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-bold text-xl text-tertiary">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-5 py-3 rounded-full bg-tertiary text-on-tertiary font-label font-bold text-xs shadow-[0_8px_18px_rgba(153,69,58,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>
                  {paymentMethod === "cash"
                    ? deliveryMode === "pickup"
                      ? "Konfirmasi Ambil Sendiri"
                      : "Konfirmasi COD"
                    : `Bayar via ${paymentMethod.toUpperCase()}`}
                </span>
                <span className="text-sm">🌸</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
