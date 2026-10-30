import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemPrice {
  [key: string]: number;
}

const ITEM_PRICES: ItemPrice = {
  tulip: 12000,
  daisy: 14000,
  kelinci: 25000,
  teddy: 25000,
  mawar: 15000,
  sunflower: 15000,
  lily: 16000,
};

const COLOR_PALETTES = [
  { name: 'Baby Macaron Pink', label: 'Baby Pink', desc: 'Baby Macaron Pink (Lembut & Romantis)', bgClass: 'bg-primary-container', textClass: 'text-on-primary' },
  { name: 'Lilac Cotton Candy', label: 'Lilac Sweet', desc: 'Lilac Cotton Candy (Ceria & Manis)', bgClass: 'bg-primary-fixed', textClass: 'text-on-primary-fixed' },
  { name: 'Butter Cream Yellow', label: 'Butter Cream', desc: 'Butter Cream Yellow (Hangat & Ceria)', bgClass: 'bg-tertiary-fixed', textClass: 'text-on-tertiary-fixed' },
  { name: 'Matcha Mint Green', label: 'Matcha Mint', desc: 'Matcha Mint Green (Segar & Natural)', bgClass: 'bg-secondary-container', textClass: 'text-on-secondary-container' },
  { name: 'Sky Blue Cloud', label: 'Sky Cloud', desc: 'Sky Blue Cloud (Tenang & Damai)', bgClass: 'bg-surface-dim', textClass: 'text-on-surface' },
  { name: 'Gradasi Dual-Tone', label: 'Dual-Tone', desc: 'Gradasi Dual-Tone (Unik & Modern)', bgClass: 'bg-gradient-to-tr from-primary-container via-tertiary-container to-secondary-container', textClass: 'text-on-primary' },
];

const CONTAINER_OPTIONS = [
  { id: 'bouquet', name: 'Hand Bouquet Sedang', desc: 'Kertas wrapping matte Korea', price: 20000, icon: 'redeem' },
  { id: 'pot', name: 'Pot Semen Estetik Clay', desc: 'Bisa pajang di meja kerja', price: 25000, icon: 'potted_plant' },
  { id: 'keychain', name: 'Gantungan Kunci Gemoy', desc: 'Kait emas ring tebal', price: 10000, icon: 'key' },
  { id: 'vase', name: 'Vase Kaca Aksen Pita', desc: 'Elegan & bening berkilau', price: 30000, icon: 'water_drop' },
];

const ACCESSORIES_LIST = [
  { id: 'led', name: 'Lampu Peri Fairy Lights LED 💡', desc: '3 mode kelap-kelip lembut', price: 10000, icon: 'hotel_class' },
  { id: 'toga', name: 'Topi Wisuda Mini + Toga 🎓', desc: 'Dipasang di boneka kelinci/teddy', price: 8000, icon: 'school' },
  { id: 'ribbon', name: 'Pita Satin Jumbo + Renda Korea 🎀', desc: 'Free custom cetak nama pendek', price: 7000, icon: 'loyalty' },
  { id: 'perfume', name: 'Parfum Fluffy Vanilla Bubblegum 🍬', desc: 'Wangi manis tahan hingga 30 hari', price: 5000, icon: 'air' },
  { id: 'wax', name: 'Kartu Amplop Segel Lilin (Wax Seal)', desc: 'Free bonus spesial studio', price: 0, icon: 'mail', isFree: true },
];

const MOOD_PILLS = [
  { emoji: '🎂', label: 'Ultah', text: 'Happy Birthday ya! Semoga selalu gemoy, bahagia terus, dan diberkahi selalu 🌸✨' },
  { emoji: '🎓', label: 'Wisuda', text: 'Happy Graduation! Proud of you ✨' },
  { emoji: '🎀', label: 'Lucu / Semangat', text: 'Semoga harimu selalu ceria & seindah bunga ini!' },
  { emoji: '💖', label: 'Romantis', text: 'To the sweetest person in my universe 💖' },
];

export const CustomStudio: React.FC = () => {
  const navigate = useNavigate();

  // Quantities
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    tulip: 3,
    daisy: 1,
    kelinci: 1,
    teddy: 0,
    mawar: 0,
    sunflower: 0,
    lily: 0,
  });

  // Color & Container
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0]);
  const [selectedContainer, setSelectedContainer] = useState(CONTAINER_OPTIONS[0]);

  // Accessories Multi-Select
  const [selectedAccs, setSelectedAccs] = useState<string[]>(['led', 'wax']);

  // LED and Visualizer
  const [isLedOn, setIsLedOn] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Card & Notes State
  const [cardMessage, setCardMessage] = useState<string>(
    'Happy Birthday ya! Semoga selalu gemoy, bahagia terus, dan diberkahi selalu 🌸✨'
  );
  const [craftNote, setCraftNote] = useState<string>(
    'Tolong telinga kelincinya agak dilipat satu ya biar gemoy!'
  );

  // Toast State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  // Quantity Handlers
  const handleQtyChange = (itemKey: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemKey] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [itemKey]: updated };
    });
  };

  // Preset & Reset
  const handleLoadPreset = () => {
    setQuantities({
      tulip: 4,
      daisy: 2,
      kelinci: 1,
      teddy: 1,
      mawar: 0,
      sunflower: 0,
      lily: 0,
    });
    triggerToast('Template "Super Gemoy Garden" dimuat! ✨');
  };

  const handleReset = () => {
    setQuantities({
      tulip: 1,
      daisy: 0,
      kelinci: 0,
      teddy: 0,
      mawar: 0,
      sunflower: 0,
      lily: 0,
    });
    triggerToast('Pilihan studio di-reset kembali 🌸');
  };

  // Rotation 360 Effect
  const handleRotate360 = () => {
    if (isRotating) return;
    setIsRotating(true);
    triggerToast('Memutar tampilan 360° buket');
    setTimeout(() => {
      setIsRotating(false);
    }, 1300);
  };

  // Toggle Accessory
  const toggleAccessory = (id: string) => {
    setSelectedAccs((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (id === 'led') {
        setIsLedOn(!exists);
      }
      return next;
    });
  };

  // Total Calculations
  let flowerTotal = 0;
  let totalStems = 0;
  Object.keys(quantities).forEach((key) => {
    const qty = quantities[key] || 0;
    flowerTotal += qty * (ITEM_PRICES[key] || 0);
    totalStems += qty;
  });

  const accessoriesTotal = selectedAccs.reduce((sum, accId) => {
    const item = ACCESSORIES_LIST.find((a) => a.id === accId);
    return sum + (item ? item.price : 0);
  }, 0);

  const grandTotal = flowerTotal + selectedContainer.price + accessoriesTotal;

  // Title Preview Dynamic
  const getPreviewTitle = () => {
    if (quantities.kelinci > 0 && quantities.tulip > 0) {
      return `Buket Kelinci & Tulip Gemoy (${totalStems} item)`;
    }
    if (quantities.teddy > 0) {
      return `Buket Teddy Bear Fluffy (${totalStems} item)`;
    }
    if (quantities.daisy > 0) {
      return `Buket Daisy Ceria (${totalStems} item)`;
    }
    return `Buket Kustom FluffyPetal (${totalStems} item)`;
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(217,119,106,0.06)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Kembali"
              type="button"
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:bg-surface-container-low cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <img
              alt="FluffyPetal Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZUTTq4hT27SRmoOuoBdjL2JEK4W3CGymBU8bKUqGcQ9swazFeryIzMLorYCi6qIZj2P-NuS5phuqkOl85keEnkzKkkrLKnutNqzTnsrP5LBACYJmcyCDwe399EGN3UiYLrqJcQ9jqM8EoUxfkyElzAMQL4CQLX5oOhURb2dsVv_M7EFNhi03eyc3dKZ90piVAKgbkXQGddLNff3dXmeV5B9pV7SW_F8O62_2_0YNaXHy1h8EFW4wgjQ"
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">Studio Kustom</h1>
          </div>
          <div className="flex items-center">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(217,119,106,0.15)]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChoX7iOwr838Q2uHZaK5_VXwQ4WyosVzlLKyQb9UR8i074adGEcoSxii3LCPje769IFzAPQobfmFVWUFTFRuC6gzKJFSG-da7wK3VcHiKZBHgRGhq2gCgGav_j36ELFbU4lc1v2Jbi6EX2KaXKIP936uE3CR8H1rhiUkzDss7jC0Vo70fzzgOvGjpIzpiSyt4e0NpWrWejweaAqGCd-EHsUTzmhwFsFpEW_2183rRcQee_0GG6CNkXsA"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface">
        <div className="flex flex-col w-full pb-32">
          {/* Top Intro & Reset Bar */}
          <section className="px-5 pt-3 pb-2 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-[26px] leading-tight text-on-surface font-medium">Studio Kreasi Gemoy</span>
                <span className="text-xl animate-bounce">✨</span>
              </div>
              <p className="font-body text-xs text-on-surface-variant">Bikin buket kawat bulu impianmu berdimensi tactile</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label text-xs shadow-sm hover:bg-surface-container-highest transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleLoadPreset}
                className="px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label text-xs shadow-[0_4px_12px_rgba(247,168,184,0.4)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Inspirasi</span>
              </button>
            </div>
          </section>

          {/* Interactive 3D / Clay Showcase Card */}
          <section className="px-4 py-2">
            <div className="relative w-full rounded-3xl bg-surface-container-low shadow-[0_16px_36px_-6px_rgba(217,119,106,0.12),0_4px_14px_rgba(45,37,40,0.04)] p-4 overflow-hidden transition-all duration-500">
              {/* Glow ambient layer for LED mode */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr from-tertiary-container/0 via-primary-container/20 to-tertiary-fixed/30 pointer-events-none transition-all duration-700 ${
                  isLedOn ? 'opacity-100' : 'opacity-0'
                }`}
              ></div>

              {/* Top Badges inside Preview */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-primary font-label text-[11px] shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">local_florist</span>
                    <span>100% Chenille Wire</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[11px]">
                    {totalStems} Tangkai Aktif
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRotate360}
                  className="px-2.5 py-1 rounded-full bg-surface-container-highest/80 backdrop-blur-md text-on-surface-variant font-label text-[11px] shadow-sm flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">360</span>
                  <span>Rotasi 360°</span>
                </button>
              </div>

              {/* Clay Bouquet Visualizer Box */}
              <div className="relative z-10 w-full h-56 my-3 rounded-2xl bg-surface-container-lowest flex items-center justify-center overflow-hidden shadow-[inset_0_2px_8px_rgba(45,37,40,0.04)]">
                <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/40 via-surface-container-lowest to-surface-container-high/30 pointer-events-none"></div>

                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXqkd487nD0dg0bulV2D4EtZCoL65FLDzDfWj03s13-Cwn20LulYljkJLxlp1U_ND7fvowumHt6NVjsWj4s9Zg0_ECxa5AaIk_aujcAfJyGmRshIyNxFfyyMPP3QTU_jaI5e_5XCop0W7V83EOKPTNtQgWZxi1_1-bXEK7z6Ku1ZdLboaw0lnnlxFnbyKXE8nM8Po9qRF_CD75s_cBP5H1ZM4R7xevBFGUBePDkJerK4J-ciasf52r6Q"
                  alt="Bouquet Preview"
                  className={`w-full h-full object-cover ease-out ${
                    isRotating ? 'transition-transform duration-1000 scale-95 rotate-[360deg]' : 'transition-transform duration-500 scale-100 rotate-0'
                  }`}
                />

                {/* Fairy LED twinkle dots overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isLedOn ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-tertiary-container shadow-[0_0_12px_#ffa79b] animate-ping"></div>
                  <div className="absolute top-16 right-14 w-2.5 h-2.5 rounded-full bg-primary-fixed shadow-[0_0_14px_#ffd9df] animate-pulse"></div>
                  <div className="absolute bottom-16 left-20 w-3 h-3 rounded-full bg-tertiary-container shadow-[0_0_10px_#ffa79b] animate-ping"></div>
                  <div className="absolute top-24 left-1/2 w-3.5 h-3.5 rounded-full bg-tertiary-fixed shadow-[0_0_16px_#ffdad5] animate-pulse"></div>
                </div>

                {/* Floating Title Badge */}
                <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                  <span className="font-headline text-xs text-on-surface">{getPreviewTitle()}</span>
                </div>
              </div>

              {/* Controls below visualizer */}
              <div className="relative z-10 flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsLedOn(!isLedOn)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-label text-xs shadow-sm active:scale-95 transition-all cursor-pointer ${
                    isLedOn ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-base text-tertiary">lightbulb</span>
                  <span>{isLedOn ? 'Matikan Lampu LED' : 'Nyalakan Lampu LED'}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-body text-on-surface-variant">Tekstur:</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-primary font-label text-[11px]">Chenille Plush 6mm</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step Progress Indicator */}
          <section className="px-5 py-3">
            <div className="bg-surface-container-low rounded-2xl p-3 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs shadow-sm">
                  1
                </div>
                <div>
                  <h2 className="font-headline text-sm text-on-surface font-medium">Langkah 1: Bentuk Karakter &amp; Bunga</h2>
                  <p className="font-body text-[11px] text-on-surface-variant">Tap +/- untuk menentukan komposisi tangkai</p>
                </div>
              </div>
              <span className="text-xs font-label text-primary">1 / 5</span>
            </div>
          </section>

          {/* Step 1: Items List */}
          <section className="px-4 space-y-2.5">
            {/* Tulip Gemoy */}
            <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_-4px_rgba(217,119,106,0.06)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shadow-inner flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrF4gTnoK3gXIVt40qUnTqcCjRjyHdJmA0SwOdRQWxul8xpa2yEKeOtdsc5eUL9wajnUh-ohGT-_PIlvjKpf-sb4YmFWHKRW5byjz6F4nZcrWFtMVXlwrc_oejUZsKhVDMVO2sBPTT6dUB8cEiL2b_olOyFdkY0B5Zf0aOPpcn-Z8k7Tlv_5aFAlqbF4Im3eqSGPdFFO71VCTEihJ-Fmsn9orZyPrvxRczyUS7WVtV-Y7gtrXRegjk8A"
                    alt="Tulip Gemoy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-base text-on-surface truncate">Tulip Gemoy</h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-label bg-primary-container text-on-primary-container">Populer</span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant truncate">Kelopak empuk membal melengkung</p>
                  <p className="font-label text-xs text-tertiary mt-0.5">Rp 12.000<span className="text-[10px] text-on-surface-variant">/tangkai</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full shadow-inner">
                <button
                  type="button"
                  disabled={quantities.tulip === 0}
                  onClick={() => handleQtyChange('tulip', -1)}
                  className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface font-label text-xs flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.tulip}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange('tulip', 1)}
                  className="w-6 h-6 rounded-full bg-primary text-on-primary font-label text-xs flex items-center justify-center hover:bg-on-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>

            {/* Daisy Senyum */}
            <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_-4px_rgba(217,119,106,0.06)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shadow-inner flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNeyzcEeGpy15b3R0A7tLoG_I0rluGI3_8o1-RxO0n12AHvDNSeT6Q21Jo96il3k6Sth08JSF7wfAaJ8aTzdoUOY3IIckxeho4Atyktn0ENvUZM0kQpJtBhPkv7aAhKURCt_NUQxnK1q0uwJ7dJlkCE13pINa0deBnS_DqWLGTShCOF0zltK5jYh6agzPqHoloFjeB4xpXjc4z5rqMCk1K925cFp_9LnIHDH67ECw8Duer4VLU2LvE_w"
                    alt="Daisy Senyum"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-base text-on-surface truncate">Daisy Senyum 🌼</h3>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant truncate">Bordir mata &amp; senyuman ceria</p>
                  <p className="font-label text-xs text-tertiary mt-0.5">Rp 14.000<span className="text-[10px] text-on-surface-variant">/tangkai</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full shadow-inner">
                <button
                  type="button"
                  disabled={quantities.daisy === 0}
                  onClick={() => handleQtyChange('daisy', -1)}
                  className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface font-label text-xs flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.daisy}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange('daisy', 1)}
                  className="w-6 h-6 rounded-full bg-primary text-on-primary font-label text-xs flex items-center justify-center hover:bg-on-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>

            {/* Kelinci Kawat Bulu */}
            <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_-4px_rgba(217,119,106,0.06)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shadow-inner flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJGckfXX7iZPjM0ECQKeNeorwWC8pbmqoY4UPuaE1GK_JyaiNwOxG5Bf6IN7LuHK9nBskIQ4-Rha8tHkhR0YZ23OM5d4wn2K1VFpm8096wcfqvsiJCs5DuLgOJTGZv_W68mZIw_gXtMIMcaiE5Vuq232uc8lPB8cdleN4pIBjl9bUkmG6y1Kv51FZ2ULg3-NnX5NlnVRLmZbaEk1UTMtDr29-T-YHXvNJyBCPWHc2GNY2aMxiHvPngww"
                    alt="Boneka Kelinci"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-base text-on-surface truncate">Boneka Kelinci 🐰</h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-label bg-secondary-container text-on-secondary-container">Karakter</span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant truncate">Telinga kawat bisa ditekuk-tekuk</p>
                  <p className="font-label text-xs text-tertiary mt-0.5">Rp 25.000<span className="text-[10px] text-on-surface-variant">/buah</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full shadow-inner">
                <button
                  type="button"
                  disabled={quantities.kelinci === 0}
                  onClick={() => handleQtyChange('kelinci', -1)}
                  className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface font-label text-xs flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.kelinci}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange('kelinci', 1)}
                  className="w-6 h-6 rounded-full bg-primary text-on-primary font-label text-xs flex items-center justify-center hover:bg-on-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>

            {/* Teddy Bear Chenille */}
            <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_-4px_rgba(217,119,106,0.06)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shadow-inner flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgW4rzu2mx1UXVttaXzGETsZKHwCutjocbII_BrlFMpQCVKwbdX0ztJLJq8rB2eHF1qOAJkLAOEeFlG05NRl7hhW_jd_AF9h8U2d96gfItacL1XaS_8e18cU27eqK-WdZ2x7cmFW7AhQUaFwNp9vXo4XSi9qw91N7SlJs7-Bfvgty5GPEEF_h2R-IQnQjMbmL_43-CN-j_87Ltrf6V_xHEMxfZXI-jjRCxd3Jkg3Avp_QZkDzLRmRSVg"
                    alt="Teddy Bear"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-base text-on-surface truncate">Teddy Bear 🧸</h3>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant truncate">Beruang mini peluk pita lucu</p>
                  <p className="font-label text-xs text-tertiary mt-0.5">Rp 25.000<span className="text-[10px] text-on-surface-variant">/buah</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-full shadow-inner">
                <button
                  type="button"
                  disabled={quantities.teddy === 0}
                  onClick={() => handleQtyChange('teddy', -1)}
                  className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface font-label text-xs flex items-center justify-center hover:bg-surface-container-high transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.teddy}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange('teddy', 1)}
                  className="w-6 h-6 rounded-full bg-primary text-on-primary font-label text-xs flex items-center justify-center hover:bg-on-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>

            {/* Collapsible Details */}
            <details className="group bg-surface-container-lowest rounded-2xl p-3 shadow-[0_8px_20px_-4px_rgba(217,119,106,0.04)]">
              <summary className="list-none flex items-center justify-between cursor-pointer font-label text-xs text-on-surface">
                <span className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-base">expand_circle_down</span>
                  Lihat Varian Lain (Mawar Velvet, Sunflower, Lily of the Valley)
                </span>
                <span className="text-[11px] text-on-surface-variant group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pt-3 space-y-2.5">
                {/* Mawar Velvet */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDhs07aQcdBt7XM2kbv3AW1qqDVfRR5lImQ5Z5t_F4PUVNPewtsVdzz8_nvRzmDe_5knJu7RWWbBbHQr7fi8b9ET7NbvV4Z-edXFZZHXKMCSvLS7ty9hxMjlMEopMAuroX0QbroxmLd-ci_c6t5_2Cml1QHS5ptZCwBqA0IQ1wgIKUmHTc0snT1h994LRDB-fURaD81Rg8pQtd-ZbSGtVy5e4YNYjALbykOxaDmXlTg5mHzQoPOPvRGg"
                        alt="Mawar Velvet"
                      />
                    </div>
                    <div>
                      <p className="font-headline text-sm text-on-surface">Mawar Velvet 🌹</p>
                      <p className="font-label text-xs text-tertiary">Rp 15.000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-0.5 rounded-full">
                    <button type="button" onClick={() => handleQtyChange('mawar', -1)} className="w-5 h-5 rounded-full bg-surface-container-lowest text-on-surface text-xs cursor-pointer">-</button>
                    <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.mawar}</span>
                    <button type="button" onClick={() => handleQtyChange('mawar', 1)} className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs cursor-pointer">+</button>
                  </div>
                </div>

                {/* Sunflower Ceria */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANF18oAL_DCrWUIwTV55PuK0sa-sEm24pNjqaBy4dCxhbYtAk3qi5IIfr_v7z8bVWaY7Mk1gYmyE2vYIgmGhlFQGo7rSDc2MwQ11-WBaF_bYPagM4W4EdhzKN-ZufKMRQrGgin8muVF5lf8atP1P6jarMvF_8rJXLA3VZzyURaNz6hgiDrFk_V_ylUoL7dVK3zgON6Dt5QS16toG5CK2PWdKzxx_mdF_u2Kcp99pSLJsGmNcrRhep3jQ"
                        alt="Sunflower"
                      />
                    </div>
                    <div>
                      <p className="font-headline text-sm text-on-surface">Bunga Matahari 🌻</p>
                      <p className="font-label text-xs text-tertiary">Rp 15.000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-0.5 rounded-full">
                    <button type="button" onClick={() => handleQtyChange('sunflower', -1)} className="w-5 h-5 rounded-full bg-surface-container-lowest text-on-surface text-xs cursor-pointer">-</button>
                    <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.sunflower}</span>
                    <button type="button" onClick={() => handleQtyChange('sunflower', 1)} className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs cursor-pointer">+</button>
                  </div>
                </div>

                {/* Lily of the Valley */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnn5WiJRhhTYSnwvakyoAV-nLdTThgOb3_jJ3v1606aNy5K-sMnmX5em02nkuWK03LCeVWR4eSinvpIES6By1p0ygKcrIoBt71McaMMPN7BeOUak2H3-h05pg_V61l4yGxvR8S-wLiutwXapGJgHPkU41qmxnlX_D09Fnb5qAwaHp2B0UXzMzZ7F4c9eO6TLFx5T2VGECvqP6pK0WlPHU4-CvYIUjLMHY1HwECbJo7HfRH6jTMTVHTLg"
                        alt="Lily of the Valley"
                      />
                    </div>
                    <div>
                      <p className="font-headline text-sm text-on-surface">Lily of the Valley 🔔</p>
                      <p className="font-label text-xs text-tertiary">Rp 16.000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-low px-2 py-0.5 rounded-full">
                    <button type="button" onClick={() => handleQtyChange('lily', -1)} className="w-5 h-5 rounded-full bg-surface-container-lowest text-on-surface text-xs cursor-pointer">-</button>
                    <span className="font-label text-xs text-on-surface w-4 text-center">{quantities.lily}</span>
                    <button type="button" onClick={() => handleQtyChange('lily', 1)} className="w-5 h-5 rounded-full bg-primary text-on-primary text-xs cursor-pointer">+</button>
                  </div>
                </div>
              </div>
            </details>
          </section>

          {/* Step 2: Palette Selector */}
          <section className="px-5 pt-6 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs shadow-sm">
                  2
                </div>
                <div>
                  <h2 className="font-headline text-sm text-on-surface font-medium">Langkah 2: Racik Palet Bulu</h2>
                  <p className="font-body text-[11px] text-on-surface-variant">Pilih mood nuansa bulu chenille lembut</p>
                </div>
              </div>
              <span className="text-xs font-label text-primary">2 / 5</span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 -mx-1 no-scrollbar">
              {COLOR_PALETTES.map((swatch) => {
                const isActive = selectedPalette.name === swatch.name;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => {
                      setSelectedPalette(swatch);
                      triggerToast(`Palet bulu diubah ke ${swatch.name}`);
                    }}
                    className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-surface-container-low shadow-[0_4px_12px_rgba(247,168,184,0.3)] scale-105'
                        : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container-low'
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-full ${swatch.bgClass} shadow-inner flex items-center justify-center ${isActive ? 'text-on-primary' : 'text-transparent'}`}>
                      <span className="material-symbols-outlined text-sm">check</span>
                    </span>
                    <span className={`font-label text-[11px] ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {swatch.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-primary font-label mt-1 text-center">
              Palet Terpilih: {selectedPalette.desc}
            </p>
          </section>

          {/* Step 3: Container Options */}
          <section className="px-5 pt-5 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs shadow-sm">
                  3
                </div>
                <div>
                  <h2 className="font-headline text-sm text-on-surface font-medium">Langkah 3: Bentuk Kerangka &amp; Wadah</h2>
                  <p className="font-body text-[11px] text-on-surface-variant">Kemasan penopang kreasi</p>
                </div>
              </div>
              <span className="text-xs font-label text-primary">3 / 5</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {CONTAINER_OPTIONS.map((item) => {
                const isSelected = selectedContainer.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedContainer(item)}
                    className={`p-3 rounded-2xl flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-surface-container-low shadow-[0_4px_14px_rgba(247,168,184,0.25)]'
                        : 'bg-surface-container-lowest shadow-sm hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`material-symbols-outlined text-xl ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {item.icon}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline text-sm text-on-surface">{item.name}</h4>
                      <p className="text-[11px] text-on-surface-variant">{item.desc}</p>
                      <p className="text-xs font-label text-tertiary mt-1">+Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 4: Accessories Multi-Select */}
          <section className="px-5 pt-5 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs shadow-sm">
                  4
                </div>
                <div>
                  <h2 className="font-headline text-sm text-on-surface font-medium">Langkah 4: Aksesoris Super Gemoy</h2>
                  <p className="font-body text-[11px] text-on-surface-variant">Biar buket makin hidup &amp; penuh kejutan</p>
                </div>
              </div>
              <span className="text-xs font-label text-primary">4 / 5</span>
            </div>

            <div className="space-y-2">
              {ACCESSORIES_LIST.map((acc) => {
                const isChecked = selectedAccs.includes(acc.id);
                return (
                  <label
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl shadow-sm cursor-pointer transition-all ${
                      isChecked ? 'bg-surface-container-low' : 'bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-inner">
                        <span className="material-symbols-outlined text-lg">{acc.icon}</span>
                      </div>
                      <div>
                        <p className="font-headline text-sm text-on-surface">{acc.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{acc.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {acc.isFree ? (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px]">
                          Gratis
                        </span>
                      ) : (
                        <span className="font-label text-xs text-tertiary">+Rp {acc.price.toLocaleString('id-ID')}</span>
                      )}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div click
                        className="w-5 h-5 rounded-md text-primary accent-primary cursor-pointer"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Step 5: Message & Notes */}
          <section className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label text-xs shadow-sm">
                  5
                </div>
                <div>
                  <h2 className="font-headline text-sm text-on-surface font-medium">Langkah 5: Kartu Ucapan &amp; Catatan</h2>
                  <p className="font-body text-[11px] text-on-surface-variant">Tulis pesan tulus untuk orang tersayang</p>
                </div>
              </div>
              <span className="text-xs font-label text-primary">5 / 5</span>
            </div>

            {/* Mood Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
              {MOOD_PILLS.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setCardMessage(pill.text)}
                  className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label text-xs shadow-sm flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>{pill.emoji}</span> {pill.label}
                </button>
              ))}
            </div>

            {/* Message Textarea */}
            <div className="mt-2 bg-surface-container-lowest rounded-2xl p-3 shadow-inner">
              <label className="block font-label text-[11px] text-on-surface-variant mb-1">
                Isi Pesan di Kartu Amplop Segel:
              </label>
              <textarea
                rows={3}
                maxLength={150}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder="Tuliskan ucapan manismu di sini... (Maks 150 karakter)"
                className="w-full bg-transparent font-body text-xs text-on-surface focus:outline-none resize-none placeholder:text-outline-variant"
              />
              <div className="flex justify-end pt-1">
                <span className="text-[10px] text-on-surface-variant">{cardMessage.length}/150</span>
              </div>
            </div>

            {/* Craft Note Input */}
            <div className="mt-3 bg-surface-container-lowest rounded-2xl p-3 shadow-inner">
              <label className="block font-label text-[11px] text-on-surface-variant mb-1">
                Catatan Tambahan untuk Pengrajin FluffyPetal:
              </label>
              <input
                type="text"
                value={craftNote}
                onChange={(e) => setCraftNote(e.target.value)}
                placeholder="Contoh: Tolong posisi kelincinya di tengah ya kak, pita warna putih..."
                className="w-full bg-transparent font-body text-xs text-on-surface focus:outline-none placeholder:text-outline-variant"
              />
            </div>
          </section>

          {/* Guarantee Badge */}
          <section className="px-5 py-3">
            <div className="p-3.5 rounded-2xl bg-surface-container-low shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </div>
              <div>
                <h5 className="font-headline text-sm text-on-surface">Jaminan 100% Handcrafted Love</h5>
                <p className="font-body text-[11px] text-on-surface-variant">
                  Setiap tekukan kawat dipilin manual oleh perajin studio berpengalaman dengan kawat chenille grade A bebas karat.
                </p>
              </div>
            </div>
          </section>

          {/* Sticky Bottom Summary Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl px-5 py-3 shadow-[0_-8px_24px_rgba(45,37,40,0.06)]">
            <div className="max-w-md mx-auto flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-lg font-bold text-tertiary">
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <span className="text-[11px] font-body text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span>1-2 Hari Jadi (Handmade)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerToast('Desain kustom disimpan ke Draft Anda!')}
                  className="px-3.5 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label text-xs shadow-sm hover:bg-surface-container-highest active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  <span>Draft</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('Memproses kreasi ke keranjang pesanan... 🛍️')}
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label text-xs shadow-[0_8px_18px_rgba(247,168,184,0.45)] hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Pesan Desain Ini</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Micro-Toast Notification */}
          <div
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full font-label text-xs shadow-xl flex items-center gap-2 transition-all duration-300 ${
              showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-primary-container">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomStudio;