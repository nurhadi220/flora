import React, { useState } from "react";
import Header from "../../components/organisms/Header";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  checked: boolean;
  isCustomDIY?: boolean;
  details?: {
    flower: string;
    container: string;
    accessories: string;
    cardMessage?: string;
    artisanNote?: string;
  };
  variantInfo?: string;
}

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Custom Buket Kelinci & Tulip Gemoy (5 Tangkai)",
      type: "DIY Studio Custom",
      price: 105000,
      originalPrice: 125000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Ku6Fk_HC4_YS4CreXXFtHfX7KDlE4Hvg68uCcQ1ajcHzlPTQ7FXe5HdrJBECd9-7ySCrLsQ1XspkzPJOeIyKjQMnSYbE8iuljOO4HEnJGq_QhbWRCqE0Oyhsoh_HeDzCzMFw3LDQDG2JYLtDK5CMGBVaU04yMRetZfyZ5ag2TM1zNeNaAccZv6i6vrvyh7l2Gae8GbdqsCzjXwJn1ob0lxfuQeak_H8rKYygnBs5jtJRhjlE0Htq4A",
      quantity: 1,
      checked: true,
      isCustomDIY: true,
      details: {
        flower:
          "3x Tulip Gemoy (Baby Pink), 1x Daisy Senyum, 1x Boneka Kelinci Kawat",
        container: "Hand Bouquet Kertas Korea Matte Doff",
        accessories:
          "Lampu Peri LED Fairy Lights (+Rp 10rb), Amplop Segel Lilin Lilac (Free)",
        cardMessage:
          '"Happy Birthday ya! Semoga selalu gemoy, bahagia terus..."',
        artisanNote: '"Tolong telinga kelinci dilipat satu ya biar gemoy"',
      },
    },
    {
      id: "2",
      name: "Gantungan Kunci Bunga Daisy Pastel",
      type: "Ready Stock",
      price: 25000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCKj-BL_jNcDdK8j09kvwvfiee0CXuFTNGUCPqCKOR32tPaFXIC1tHRLFS1RGecE-06AgqD6f3a4S1C5yecsRYAiMKDzZs6IL_7V951AmrqJlQXBcrbX58KcfwKfqvYtJqrlACBbDxjx346cdpnksr7Z3k-KmdoNaiGnupMzpW_KtDJHmCfEME1SD0qiGr7ufCYwpYL7a-Og_Kb3e--WMSxcUJEB9RALd6W91R-Fz_iJ9aQxRG3KWvAsw",
      quantity: 1,
      checked: true,
      isCustomDIY: false,
      variantInfo: "Varian: Butter Cream & Ring Emas",
    },
  ]);

  const discount = 20000;
  const navigate = useNavigate();
  // Handler Checkbox
  const handleToggleCheck = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const isAllChecked =
    cartItems.length > 0 && cartItems.every((item) => item.checked);

  const handleToggleSelectAll = () => {
    const nextState = !isAllChecked;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: nextState })),
    );
  };

  // Handler Quantity & Delete
  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const handleDeleteItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteSelected = () => {
    setCartItems((prev) => prev.filter((item) => !item.checked));
  };

  // Calculations
  const selectedItems = cartItems.filter((item) => item.checked);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const grandTotal = Math.max(
    0,
    subtotal - (selectedItems.length > 0 ? discount : 0),
  );
  const totalCount = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const isCheckoutDisabled = selectedItems.length === 0 || totalCount === 0;

  const handleProceedToCheckout = () => {
    if (!isCheckoutDisabled) {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface flex flex-col min-h-screen">
      {/* Header Organism yang Konsisten */}
      <Header title="Keranjang Belanja" />

        <main className="flex flex-col relative w-full bg-surface">
            <div className="flex flex-col w-full pb-32 max-w-md mx-auto">
          {/* Promo Announcement Banner */}
          <div className="px-4 pt-3 pb-2">
            <div className="bg-secondary-container text-on-secondary-container rounded-2xl p-3.5 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-label font-bold uppercase tracking-wider text-secondary">
                    Slot Terbatas
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="text-xs text-on-secondary-variant font-medium">
                    Pengiriman Besok Pagi
                  </span>
                </div>
                <p className="text-xs font-body font-medium text-on-secondary-container leading-relaxed">
                  Pesan sekarang untuk pengerjaan besok pagi!{" "}
                  <span className="font-bold underline decoration-secondary">
                    Free ongkir
                  </span>{" "}
                  pengiriman pertama.
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary text-sm shrink-0">
                arrow_back_ios_new
              </span>
            </div>
          </div>

          {/* Cart Top Bar & Select All */}
          <div className="px-4 py-2 flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={handleToggleSelectAll}
                className="hidden peer"
              />
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shadow-sm transition-transform active:scale-95 ${
                  isAllChecked
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  check
                </span>
              </div>
              <span className="text-sm font-label font-semibold text-on-surface">
                Pilih Semua ({cartItems.length} Item)
              </span>
            </label>
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="text-xs font-label font-medium text-primary hover:text-on-primary-container transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">
                auto_delete
              </span>
              Hapus Terpilih
            </button>
          </div>

          {/* Cart Items Stack */}
          <div className="px-4 space-y-3.5 mt-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_12px_32px_-4px_rgba(217,119,106,0.08),0_4px_12px_rgba(45,37,40,0.03)] flex flex-col gap-3 relative"
              >
                {/* Item Head */}
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => handleToggleCheck(item.id)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center shadow-sm cursor-pointer ${
                        item.checked
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container-high text-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm font-bold">
                        check
                      </span>
                    </button>
                  </div>
                  {/* Image Preview */}
                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden shrink-0 shadow-[inset_0_2px_6px_rgba(45,37,40,0.06)] bg-surface-container-low flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.isCustomDIY && (
                      <div className="absolute top-1.5 left-1.5 bg-primary/90 text-on-primary text-[9px] font-label font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                        DIY
                      </div>
                    )}
                  </div>
                  {/* Identity & Price */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-label font-bold px-2 py-0.5 rounded-full">
                        {item.type}
                      </span>
                      {item.isCustomDIY && (
                        <span className="text-[10px] text-tertiary font-label font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">
                            brush
                          </span>{" "}
                          Handmade
                        </span>
                      )}
                    </div>
                    <h2 className="font-headline font-semibold text-base text-on-surface leading-snug mt-1">
                      {item.name}
                    </h2>
                    {item.variantInfo && (
                      <span className="text-[11px] font-body text-on-surface-variant mt-0.5">
                        {item.variantInfo}
                      </span>
                    )}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-label font-bold text-tertiary">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[11px] text-on-surface-variant font-body line-through">
                          Rp {item.originalPrice.toLocaleString("id-ID")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Custom Item Details */}
                {item.isCustomDIY && item.details && (
                  <div className="bg-surface-container-low rounded-2xl p-3 text-xs space-y-2 text-on-surface-variant shadow-inner">
                    <div className="flex items-center justify-between text-on-surface font-label font-bold border-b border-outline-variant/30 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-primary">
                          potted_plant
                        </span>
                        Komposisi Chenille Wire
                      </span>
                      <span className="text-[10px] text-primary font-label bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-sm">
                        5 Tangkai
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 text-[11px] font-body">
                      <div className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0"></span>
                        <span>
                          <strong className="text-on-surface">Bunga:</strong>{" "}
                          {item.details.flower}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0"></span>
                        <span>
                          <strong className="text-on-surface">Wadah:</strong>{" "}
                          {item.details.container}
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0"></span>
                        <span>
                          <strong className="text-on-surface">
                            Aksesoris:
                          </strong>{" "}
                          {item.details.accessories}
                        </span>
                      </div>
                    </div>
                    {/* Message Pills */}
                    <div className="pt-1.5 border-t border-outline-variant/30 space-y-1.5">
                      {item.details.cardMessage && (
                        <div className="bg-surface-container-lowest rounded-xl p-2 flex items-start gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">
                            mail
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-label font-bold text-on-surface uppercase tracking-wider block">
                              Kartu Ucapan
                            </span>
                            <p className="text-[11px] font-body italic text-on-surface-variant truncate">
                              {item.details.cardMessage}
                            </p>
                          </div>
                        </div>
                      )}
                      {item.details.artisanNote && (
                        <div className="bg-surface-container-lowest rounded-xl p-2 flex items-start gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-sm text-secondary shrink-0 mt-0.5">
                            edit_note
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-label font-bold text-on-surface uppercase tracking-wider block">
                              Catatan Pengrajin
                            </span>
                            <p className="text-[11px] font-body text-on-surface-variant">
                              {item.details.artisanNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Item Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {item.isCustomDIY && (
                      <button
                        type="button"
                        className="px-3 py-1.5 bg-surface-container text-on-surface rounded-full text-xs font-label font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          palette
                        </span>
                        Edit Desain
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label="Hapus item"
                      onClick={() => handleDeleteItem(item.id)}
                      className="w-8 h-8 rounded-full bg-surface-container-low text-tertiary hover:bg-tertiary-fixed flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        delete_outline
                      </span>
                    </button>
                  </div>
                  {/* Stepper */}
                  <div className="flex items-center bg-surface-container rounded-full p-1 shadow-inner gap-2">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm disabled:opacity-40 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">
                        remove
                      </span>
                    </button>
                    <span className="text-xs font-label font-bold text-on-surface w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">
                        add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add-ons Carousel */}
          <div className="mt-5 px-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">
                  favorite
                </span>
                <h3 className="font-headline font-semibold text-sm text-on-surface">
                  Biar Buket Makin Spesial
                </h3>
              </div>
              <span className="text-[11px] font-label text-primary font-medium">
                Add-on Cepat
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              <div className="min-w-[210px] bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_rgba(217,119,106,0.06)] flex items-center gap-2.5 shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmM22pLueXti0H2Q9k6ddJ3yQUl2KibhQtW8CMJVlzHB-4RmYQN4qdYJhkvMCYkZ_tmfIgOeTOzWCx_7C_7q0uMn3K7-qU7qqacC8HXFTOcZEqn9afxqZAfWRibQj8vB1_to370j7-BR9CONzOHwqqg2ierRzuPZOvHYqQkqd-_PRjMaiva5sWj4jqASRMvB8FWt4BV1cZA3SLQFI_zkUi4Ep2r4YZDYa1wf-zkiGIQn0wjkc9K4-BtA"
                    alt="Hardbox Kaca"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-label font-bold text-on-surface truncate">
                    Dus Hardbox Kaca
                  </span>
                  <span className="text-[11px] font-body text-tertiary font-semibold">
                    +Rp 15.000
                  </span>
                  <button
                    type="button"
                    className="mt-1 self-start px-2.5 py-0.5 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-label font-bold hover:bg-primary-container transition-all flex items-center gap-0.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">
                      add
                    </span>{" "}
                    Tambah
                  </button>
                </div>
              </div>

              <div className="min-w-[210px] bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_rgba(217,119,106,0.06)] flex items-center gap-2.5 shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0f7Cthaz6xOVhHgJddsYWKSBxeNvpeNwPcULKziXXddF7BNzmsqCjGnaVJwoNVIQJCOLPfJatjWKZXjH9OVkQjEsHhoOiIaXpEWJmrgJWfu4CxNS9y3_ZBn1YAoQAVyMQAy8OzqES8gXtXviwRq0KtmGPiCQ7o8kSQfmWROFPJSyeKKGvWHvNeCFQS758gUInKshGu0nBtq--5Kof2fc0P8-UQ2NsbHAMFYfgV-h9anGj6gIRKLs88w"
                    alt="Baterai LED"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-label font-bold text-on-surface truncate">
                    Baterai Cadangan LED
                  </span>
                  <span className="text-[11px] font-body text-tertiary font-semibold">
                    +Rp 5.000
                  </span>
                  <button
                    type="button"
                    className="mt-1 self-start px-2.5 py-0.5 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-label font-bold hover:bg-primary-container transition-all flex items-center gap-0.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">
                      add
                    </span>{" "}
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Voucher Section */}
          <div className="px-4 mt-5">
            <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-base">
                    confirmation_number
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-label font-bold text-on-surface">
                      Voucher Selamat Datang
                    </span>
                    <span className="bg-tertiary text-on-tertiary text-[9px] font-label font-bold px-1.5 py-0.2 rounded-full">
                      Hemat!
                    </span>
                  </div>
                  <p className="text-[11px] font-body text-tertiary font-medium truncate">
                    Potongan Rp 20.000 Terpasang ✨
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-xs font-label font-semibold text-primary shrink-0 hover:underline cursor-pointer"
              >
                Ganti
              </button>
            </div>
          </div>

          {/* Payment Summary Box */}
          <div className="px-4 mt-5">
            <div className="bg-surface-container-low rounded-3xl p-4 space-y-2.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-on-surface font-headline font-semibold text-sm mb-1">
                <span className="material-symbols-outlined text-primary text-base">
                  receipt_long
                </span>
                Rincian Pembayaran
              </div>
              <div className="flex items-center justify-between text-xs font-body text-on-surface-variant">
                <span>Subtotal Produk ({totalCount} Item)</span>
                <span className="font-medium text-on-surface">
                  Rp {subtotal.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-body text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Diskon Voucher Studio
                  <span className="material-symbols-outlined text-[12px] text-tertiary">
                    check_circle
                  </span>
                </span>
                <span className="font-bold text-tertiary">
                  -Rp{" "}
                  {selectedItems.length > 0
                    ? discount.toLocaleString("id-ID")
                    : 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-body text-on-surface-variant">
                <span>Packing Box Kardus Tebal</span>
                <span className="text-secondary font-bold font-label uppercase text-[10px] bg-secondary-container px-2 py-0.5 rounded-full">
                  Gratis
                </span>
              </div>
              <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-label font-bold text-on-surface block">
                    Total Belanja
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-body">
                    Sudah termasuk pajak &amp; kemasan
                  </span>
                </div>
                <span className="font-headline font-bold text-lg text-tertiary">
                  Rp {grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Checkout Bar */}
          <div className="fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl px-4 py-3 shadow-[0_-8px_24px_rgba(45,37,40,0.06)] pb-safe">
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-label uppercase text-on-surface-variant tracking-wider font-semibold">
                    Total Tagihan
                  </span>
                  <span className="text-[9px] bg-tertiary-fixed text-on-tertiary-fixed font-label font-bold px-1.5 py-0.2 rounded-full">
                    Hemat 20rb
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline font-bold text-xl text-tertiary">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                disabled={isCheckoutDisabled}
                onClick={handleProceedToCheckout}
                className={`flex-1 max-w-[220px] py-3.5 px-4 rounded-full font-label font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isCheckoutDisabled
                    ? "bg-surface-container-highest text-outline cursor-not-allowed opacity-60 shadow-none"
                    : "bg-tertiary text-on-tertiary shadow-[0_8px_18px_rgba(153,69,58,0.35)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                }`}
              >
                <span>
                  {isCheckoutDisabled
                    ? "Pilih Produk Dulu"
                    : `Lanjut Pembayaran (${totalCount})`}
                </span>
                {!isCheckoutDisabled && <span className="text-sm">🌸</span>}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
