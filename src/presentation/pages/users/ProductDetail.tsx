import React, { useState } from 'react';
import Header from '../../components/organisms/Header';

// Interface Data Opsi dari Database
export interface PetalColorOption {
  id: string;
  name: string;
  label: string;
  colorHex: string;
  bgClass: string;
  textClass: string;
  stock: number;
}

export interface WrappingOption {
  id: string;
  name: string;
  tagline: string;
  colorHex: string;
  stock: number;
}

export interface ProductDetailProps {
  productId?: string;
  // Opsi di bawah ini dapat dipasing via props atau di-fetch dari API/Database
  petalColorOptions?: PetalColorOption[];
  wrappingOptions?: WrappingOption[];
}

// Data Dummy Contoh dari Database (Fallback)
const DEFAULT_PETAL_COLORS: PetalColorOption[] = [
  { id: 'c1', name: 'Soft Baby Pink', label: 'Pink', colorHex: '#f7a8b8', bgClass: 'bg-primary-container', textClass: 'text-on-primary-container', stock: 12 },
  { id: 'c2', name: 'Lilac Lavender', label: 'Lilac', colorHex: '#dcc4ec', bgClass: 'bg-[#dcc4ec]', textClass: 'text-[#4d2f60]', stock: 5 },
  { id: 'c3', name: 'Sky Blue', label: 'Sky Blue', colorHex: '#bcdcf5', bgClass: 'bg-[#bcdcf5]', textClass: 'text-[#1c4b72]', stock: 0 }, // Stok habis
  { id: 'c4', name: 'Buttercream Yellow', label: 'Butter', colorHex: '#fdeec3', bgClass: 'bg-[#fdeec3]', textClass: 'text-[#6d510c]', stock: 8 },
  { id: 'c5', name: 'Mint Green', label: 'Mint', colorHex: '#aad0af', bgClass: 'bg-secondary-fixed-dim', textClass: 'text-on-secondary-fixed-variant', stock: 3 },
];

const DEFAULT_WRAPPING_OPTIONS: WrappingOption[] = [
  { id: 'w1', name: 'Cream Minimalist', tagline: 'Best Match', colorHex: '#fcf9ee', stock: 20 },
  { id: 'w2', name: 'Dusty Rose', tagline: 'Romantis', colorHex: '#e8b5be', stock: 10 },
  { id: 'w3', name: 'Sage Mist', tagline: 'Earthy Natural', colorHex: '#bfd4c2', stock: 0 }, // Stok habis
  { id: 'w4', name: 'Mocha Kraft', tagline: 'Vintage Warm', colorHex: '#c8b39e', stock: 7 },
];

export const ProductDetail: React.FC<ProductDetailProps> = ({
  petalColorOptions = DEFAULT_PETAL_COLORS,
  wrappingOptions = DEFAULT_WRAPPING_OPTIONS,
}) => {
  const basePrice = 85000;

  // State Gambar Preview
  const images = [
    {
      id: 'img1',
      type: 'main',
      label: 'Tekstur Chenille',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2MrygG2WVv9W7s6ZRRulXTJUKjkP2c9EN__DopoiM2oZ9w8FEPVu2HV0nRFaw9aflTribxFUeQsDNArkXXVkh7AKV4R1qbdtlW9-WJ3-nyqQaep5QW4MB-Tv3TAc5HXyxHRe0UqKermor46dcL75MoLQtL88vguObc9yJJU8CgyYyLe9Rv1XDvV82gb1MI_2mt8YyvhMwH8EG9lzaLUif6EaEg1hSNOMasyspa0CsCMQUt33pNPS4zA',
    },
    {
      id: 'img2',
      type: 'wrapping',
      label: 'Detail Wrapping',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxoIfoOsQ-FJY8jJIHYHbmFRPZE8Q_s-4QoCtYMMAvvcX7-xmX2GwDme3xGbWPwrJ-SQqXu56SiOvLOxzHIuCA96Fl9TSCVy6TISGAEzwnP3Dtewd-49oy46rlz5b01WrJwjSCnNe7MZdoAYU2-r5_LUNz9mLz96V5PPoGLfFhCefqeLjsgv7N0F7EjWxoNw-jXrTqYQz7cJYNQKPw69NxqsVfErnbm6EUYbX1SVr_Cp1eKeoMIJlh8g',
    },
    {
      id: 'img3',
      type: 'led',
      label: 'Lampu LED Malam',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1d5PA8ToyNo7bGKNXAi_sz8IOduF4wg0K0NGkqUS8Mx_OPMWcaCjPbtekqCL1uwGU8Y4H5VEoou-O1DfG2-eyTpUJHLlZjbNm5nTD9P8I8Dko8QxItdw-QRBjGGjF_he5yQXPDRDcCAKmhq1rABbWCf35SRhXVVvwXbuiEB6nYuxa8lJRAsHn-6aBcbYnotH48gZDhXIsVV9nRBKjEktFB51diNk7my0Lag-6JF3GNArIMllbR751Zg',
    },
  ];

  const [activeImage, setActiveImage] = useState(images[0].src);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // State Pilihan Warna & Wrapping (Default ke opsi yang ready stock pertama)
  const initialColor = petalColorOptions.find((c) => c.stock > 0) || petalColorOptions[0];
  const initialWrap = wrappingOptions.find((w) => w.stock > 0) || wrappingOptions[0];

  const [selectedColor, setSelectedColor] = useState<PetalColorOption>(initialColor);
  const [selectedWrap, setSelectedWrap] = useState<WrappingOption>(initialWrap);

  // State Add-ons & Pesan
  const [addonLed, setAddonLed] = useState<boolean>(false);
  const [addonDoll, setAddonDoll] = useState<boolean>(false);
  const [addonPerfume, setAddonPerfume] = useState<boolean>(false);
  const [cardMessage, setCardMessage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // State Toast
  const [showToast, setShowToast] = useState<boolean>(false);

  // Hitung Total Stok Terbatas berdasarkan varian terpilih
  const currentAvailableStock = Math.min(selectedColor.stock, selectedWrap.stock);

  // Kalkulasi Biaya Total
  const addonsTotal =
    (addonLed ? 10000 : 0) + (addonDoll ? 15000 : 0) + (addonPerfume ? 5000 : 0);
  const grandTotal = (basePrice + addonsTotal) * quantity;

  // Handlers
  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= Math.max(1, currentAvailableStock)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleOpenArtisanChat = () => {
    alert('Menghubungkan ke Studio Pengrajin FluffyPetal via Live Chat...');
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Header Organism yang Konsisten */}
      <Header title="Detail Produk" />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface">
        <div className="flex flex-col w-full pb-32 max-w-md mx-auto">
          {/* Top Trust & Handcrafted Ribbon */}
          <div className="px-margin-mobile pt-space-md pb-space-xs">
            <div className="flex items-center justify-between bg-surface-container-low rounded-full px-space-md py-space-xs shadow-sm">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm">100% Chenille Handcrafted</span>
              </div>
              <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">local_florist</span>
                <span>Abadi Tanpa Layu</span>
              </div>
            </div>
          </div>

          {/* Showcase Gallery Card */}
          <section className="px-margin-mobile pt-space-sm">
            <div className="relative bg-surface-container-lowest rounded-lg p-space-sm shadow-[0_12px_32px_-4px_rgba(217,119,106,0.12),0_4px_12px_rgba(45,37,40,0.03)]">
              {/* Main Product Image Frame */}
              <div className="relative w-full aspect-[4/4] rounded-lg overflow-hidden bg-surface-container-low shadow-[inset_0_2px_8px_rgba(45,37,40,0.06)]">
                <img
                  src={activeImage}
                  alt="Buket Tulip Pastel Chenille"
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Live Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {currentAvailableStock > 0 ? (
                    <span className="inline-flex items-center gap-1 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-secondary font-label-sm text-label-sm shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      Ready Stock ({currentAvailableStock} pcs)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-error-container/90 backdrop-blur-md px-2.5 py-1 rounded-full text-on-error-container font-label-sm text-label-sm shadow-sm">
                      Stok Varian Habis
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 bg-tertiary-container/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-on-tertiary-container font-label-sm text-label-sm shadow-sm">
                    Hemat 14%
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  aria-label="Favoritkan"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-primary shadow-[0_4px_12px_rgba(217,119,106,0.18)] active:scale-90 transition-transform cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-all ${
                      isWishlisted ? 'text-tertiary' : 'text-primary'
                    }`}
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Floating Tactile Petal Badge */}
                <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_6px_16px_rgba(138,75,90,0.35)] flex items-center gap-1 -rotate-3">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  Bendable Wire Stem
                </div>
              </div>

              {/* Thumbnail Selector Row */}
              <div className="grid grid-cols-3 gap-space-sm mt-space-sm">
                {images.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(img.src)}
                    className={`group relative aspect-square rounded-DEFAULT overflow-hidden bg-surface-container-high p-0.5 shadow-sm transition-all cursor-pointer ${
                      activeImage === img.src
                        ? 'ring-2 ring-primary-container opacity-100'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover rounded-[14px]" />
                    <span className="absolute inset-x-0 bottom-0 bg-inverse-surface/60 backdrop-blur-xs text-inverse-on-surface text-[9px] py-0.5 text-center font-label-sm truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Title, Price & Social Proof Section */}
          <section className="px-margin-mobile pt-space-md">
            <div className="flex items-center gap-space-sm mb-1">
              <div className="flex items-center gap-0.5 text-tertiary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">4.9</span>
              </div>
              <span className="text-on-surface-variant font-body-sm text-body-sm">(142 ulasan pembeli)</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-secondary font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">eco</span>
                Bahan Premium
              </span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium leading-tight">
              Buket Tulip Pastel Chenille (7 Tangkai)
            </h2>
            <div className="flex items-baseline gap-space-sm mt-space-xs">
              <span className="font-headline-md text-headline-md text-primary font-bold">
                Rp {basePrice.toLocaleString('id-ID')}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                Rp 99.000
              </span>
              <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full">
                Diskon Launching
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
              Dibuat teliti satu per satu menggunakan kawat bulu chenille lembut berkualitas tinggi. Tangkai lentur dapat ditekuk sesuai selera, cocok untuk kado wisuda, ulang tahun, atau dekorasi kamar estetik.
            </p>
          </section>

          {/* Dynamic Customizer Section (Integrated with DB Stock) */}
          <section className="px-margin-mobile pt-space-lg space-y-space-lg">
            
            {/* 1. Custom Petal Color (Dinamis Database) */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_8px_24px_-4px_rgba(217,119,106,0.08)]">
              <div className="flex items-center justify-between mb-space-sm">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface text-[19px]">
                    1. Pilih Warna Kelopak
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Nuansa kawat bulu utama
                  </p>
                </div>
                <span className="font-label-md text-label-md text-primary bg-primary-fixed/40 px-space-sm py-1 rounded-full">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center justify-between pt-space-xs flex-wrap gap-2">
                {petalColorOptions.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  const isOutOfStock = color.stock <= 0;

                  return (
                    <button
                      key={color.id}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedColor(color);
                        if (quantity > color.stock) setQuantity(Math.max(1, color.stock));
                      }}
                      className={`flex flex-col items-center gap-1 group focus:outline-none relative ${
                        isOutOfStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      <div
                        style={{ backgroundColor: color.colorHex }}
                        className={`w-11 h-11 rounded-full p-1 flex items-center justify-center transition-all ${
                          isSelected ? 'scale-110 shadow-[0_0_0_3px_#8a4b5a]' : 'shadow-sm'
                        }`}
                      >
                        {isSelected && (
                          <span className={`material-symbols-outlined text-[16px] font-bold ${color.textClass}`}>
                            check
                          </span>
                        )}
                      </div>
                      <span className={`font-label-sm text-[10px] ${isSelected ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>
                        {color.label}
                      </span>
                      {isOutOfStock && (
                        <span className="absolute -top-1 bg-error text-on-error text-[8px] px-1 rounded-full font-bold">
                          Habis
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Korean Wrapping Paper Style (Dinamis Database) */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_8px_24px_-4px_rgba(217,119,106,0.08)]">
              <div className="flex items-center justify-between mb-space-sm">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface text-[19px]">
                    2. Kertas Wrapping Korea
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Bahan waterproof matte doff
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                {wrappingOptions.map((wrap) => {
                  const isSelected = selectedWrap.id === wrap.id;
                  const isOutOfStock = wrap.stock <= 0;

                  return (
                    <button
                      key={wrap.id}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedWrap(wrap);
                        if (quantity > wrap.stock) setQuantity(Math.max(1, wrap.stock));
                      }}
                      className={`text-left p-space-sm rounded-DEFAULT flex items-center gap-2.5 transition-all ${
                        isOutOfStock
                          ? 'bg-surface-container-lowest border border-outline-variant/40 opacity-40 cursor-not-allowed'
                          : isSelected
                          ? 'bg-secondary-container text-on-secondary-container shadow-[inset_0_1px_2px_#fff,0_4px_12px_rgba(68,102,75,0.15)] cursor-pointer'
                          : 'bg-surface-container-low text-on-surface shadow-sm opacity-85 hover:opacity-100 cursor-pointer'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: wrap.colorHex }}
                        className="w-4 h-4 rounded-full shadow-inner shrink-0"
                      ></span>
                      <div className="min-w-0 flex-1">
                        <span className="font-label-md text-label-md block truncate">{wrap.name}</span>
                        <span className="font-body-sm text-[11px] block truncate">
                          {isOutOfStock ? 'Stok Habis' : wrap.tagline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Add-on Accessories Checkboxes */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_8px_24px_-4px_rgba(217,119,106,0.08)]">
              <div className="mb-space-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface text-[19px]">
                  3. Tambahan Aksesoris
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Buat buketmu semakin berkesan
                </p>
              </div>

              <div className="space-y-space-sm">
                {/* LED Lights */}
                <label className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer select-none">
                  <div className="flex items-center gap-space-sm">
                    <input
                      type="checkbox"
                      checked={addonLed}
                      onChange={(e) => setAddonLed(e.target.checked)}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg bg-surface-container-high peer-checked:bg-secondary flex items-center justify-center text-on-secondary transition-all shadow-inner">
                      {addonLed && <span className="material-symbols-outlined text-[16px]">check</span>}
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Lampu LED Fairy Lights</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">3 Mode kedip, baterai terpasang</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-primary">+Rp 10.000</span>
                </label>

                {/* Graduation Doll Topper */}
                <label className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer select-none">
                  <div className="flex items-center gap-space-sm">
                    <input
                      type="checkbox"
                      checked={addonDoll}
                      onChange={(e) => setAddonDoll(e.target.checked)}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg bg-surface-container-high peer-checked:bg-secondary flex items-center justify-center text-on-secondary transition-all shadow-inner">
                      {addonDoll && <span className="material-symbols-outlined text-[16px]">check</span>}
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Topper Boneka Wisuda Mini</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">Bisa custom nama di selempang</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-primary">+Rp 15.000</span>
                </label>

                {/* Vanilla Flower Scent Spray */}
                <label className="flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-low/70 hover:bg-surface-container-low transition-colors cursor-pointer select-none">
                  <div className="flex items-center gap-space-sm">
                    <input
                      type="checkbox"
                      checked={addonPerfume}
                      onChange={(e) => setAddonPerfume(e.target.checked)}
                      className="hidden peer"
                    />
                    <div className="w-6 h-6 rounded-lg bg-surface-container-high peer-checked:bg-secondary flex items-center justify-center text-on-secondary transition-all shadow-inner">
                      {addonPerfume && <span className="material-symbols-outlined text-[16px]">check</span>}
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Semprot Parfum Vanilla Bloom</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">Wangi manis tahan 7-14 hari</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md text-primary">+Rp 5.000</span>
                </label>
              </div>
            </div>

            {/* 4. Free Greeting Card */}
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_8px_24px_-4px_rgba(217,119,106,0.08)]">
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">mark_email_read</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface text-[19px]">Kartu Ucapan Gratis</h3>
                </div>
                <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                  Free Card &amp; Envelope
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
                Ditulis tangan dengan kaligrafi estetik oleh tim FluffyPetal.
              </p>
              <div className="relative">
                <textarea
                  rows={3}
                  maxLength={150}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Tulis ucapan manismu di sini (maks. 150 kata)... Contoh: Happy Graduation Sarah tersayang! Semoga langkah barumu selalu merekah indah."
                  className="w-full bg-surface-container-low rounded-DEFAULT p-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-outline/70 focus:outline-none shadow-[inset_0_2px_4px_rgba(45,37,40,0.04)] resize-none"
                />
                <span className="absolute bottom-2.5 right-3 font-label-sm text-[11px] text-on-surface-variant">
                  {cardMessage.length}/150
                </span>
              </div>
            </div>

            {/* Workshop Guarantee Card */}
            <div className="bg-surface-container-low/80 rounded-lg p-space-md flex items-center gap-space-md shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-container/60 flex items-center justify-center text-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[24px]">inventory_2</span>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg text-on-surface">Packing Kardus Tebal + Bubble Wrap</h4>
                <p className="font-body-sm text-[13px] text-on-surface-variant">Garansi bentuk buket tetap mengembang sempurna sampai alamatmu.</p>
              </div>
            </div>
          </section>

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(45,37,40,0.08)] px-margin-mobile py-3 pb-safe">
            <div className="flex items-center gap-space-sm max-w-md mx-auto">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-surface-container rounded-full p-1 shadow-[inset_0_1px_3px_rgba(45,37,40,0.06)]">
                <button
                  type="button"
                  aria-label="Kurangi Jumlah"
                  disabled={quantity <= 1}
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center active:scale-95 shadow-sm disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span className="font-label-md text-label-md text-on-surface w-7 text-center">{quantity}</span>
                <button
                  type="button"
                  aria-label="Tambah Jumlah"
                  disabled={quantity >= currentAvailableStock}
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center active:scale-95 shadow-sm disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              {/* Artisan Chat Consultation */}
              <button
                type="button"
                aria-label="Konsultasi Pengrajin"
                onClick={handleOpenArtisanChat}
                className="w-11 h-11 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-[inset_0_2px_2px_rgba(255,255,255,0.8),0_4px_10px_rgba(45,37,40,0.06)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">forum</span>
              </button>

              {/* Primary Action CTA Button */}
              <button
                type="button"
                disabled={currentAvailableStock <= 0}
                onClick={handleAddToCart}
                className={`flex-1 h-12 rounded-full font-label-lg text-label-lg flex items-center justify-between px-space-md transition-all ${
                  currentAvailableStock <= 0
                    ? 'bg-surface-container-highest text-outline cursor-not-allowed'
                    : 'bg-primary-container text-on-primary-container shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_8px_18px_rgba(247,168,184,0.45)] active:scale-98 cursor-pointer'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>{currentAvailableStock <= 0 ? 'Stok Habis' : '+ Keranjang'}</span>
                </span>
                <span className="font-bold text-body-sm">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </button>
            </div>
          </div>

          {/* Micro-Toast Notification */}
          <div
            className={`fixed top-20 inset-x-4 z-50 pointer-events-none transform transition-all duration-300 flex justify-center ${
              showToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
            }`}
          >
            <div className="bg-inverse-surface/95 backdrop-blur-md text-inverse-on-surface px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                check_circle
              </span>
              <span className="font-label-md text-label-md">
                Berhasil ditambahkan ke keranjang belanja!
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;