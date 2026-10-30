import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Types ---------- */
type PopularProduct = {
  id: number;
  name: string;
  desc: string;
  price: number;
  rating: number;
  reviews: number;
  badge: string;
  badgeClass: string;
  img: string;
  alt: string;
};

type NewProduct = {
  id: number;
  name: string;
  sub: string;
  price: number;
  badge?: string;
  badgeClass?: string;
  img: string;
  alt: string;
};

/* ---------- Data (nanti bisa diganti dari API) ---------- */
const CHIPS = [
  "Semua",
  "Buket Wisuda",
  "Bunga Meja & Vas",
  "Mini Pot Gemoy",
  "Gantungan Kunci",
  "Buket Pengantin",
];

const POPULAR: PopularProduct[] = [
  {
    id: 1,
    name: "Buket Tulip Pastel Puff",
    desc: "Chenille bulu premium soft pink & cream, wrapping korean paper, pita satin.",
    price: 85000,
    rating: 4.9,
    reviews: 128,
    badge: "Best Seller",
    badgeClass: "bg-primary-container text-on-primary-container",
    alt: "Buket tulip chenille pastel pink dan kuning",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2sHq-KHPYBwX-bqgG82FnKrmp_l4T0DJ9XU9qiI7sGILOorlfERNrBcBEtyIbQep_t0R0zcMHaY20HvmrWT3ziVHrrNLgGxIYgmSKcf231Ydhiw1y74cEG5qZN3xdvlWq8Bl4ldmffzuGckhZqxEKaJubENF25orFm9No2ntLN3ObjsjU22P3ihcclLKXxu8dvbvp8K22oDzXbvZyTk8NIn6A3v7jFLwdemdUJkQ9JEkBnlumk3dj6Q",
  },
  {
    id: 2,
    name: "Mini Daisy Pot Gemoy",
    desc: "Pot clay mungil dengan 3 tangkai daisy kawat bulu ceria untuk meja kerja.",
    price: 45000,
    rating: 5.0,
    reviews: 89,
    badge: "Handmade Ready",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    alt: "Pot mini dengan tiga bunga daisy kawat bulu",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwutBFiWMyOl1ZXfk1rJJiTPgsgfcnfb9ypNXZv_nMeSMrhijafsJrznb2lC1iElq_ZjcIwt10Cgx0YA85i4NzI-dVCG-pO-UWr-3Fq_9Rj67eHX_DDET6ONWI3NUwXAIqWze8q_rDHsOEyPTk-LroTKfIKUOn4f-HLUGfsvLH6-SaxCXtRgnMJtBj2Z2P_kR9JFUXk1bC4wuIq5Px4ZkTZFyprpDgHDU1c806S-mZjLhl1pphzZ0bew",
  },
];

const CATEGORIES = [
  {
    title: "Buket Mawar",
    sub: "Klasik & Mewah",
    icon: "yard",
    card: "bg-surface-container-low",
    iconWrap: "bg-surface-container text-primary",
  },
  {
    title: "Tulip & Lily",
    sub: "Pastel Lembut",
    icon: "local_florist",
    card: "bg-secondary-container/30",
    iconWrap: "bg-secondary-container text-on-secondary-container",
  },
  {
    title: "Sunflower Ceria",
    sub: "Penyemangat Hari",
    icon: "sunny",
    card: "bg-tertiary-fixed/30",
    iconWrap: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    title: "Custom Request",
    sub: "Desain Sesukamu",
    icon: "design_services",
    card: "bg-primary-fixed/30",
    iconWrap: "bg-primary-container text-on-primary-container",
  },
];

const NEWEST: NewProduct[] = [
  {
    id: 101,
    name: "Buket Graduasi Teddy",
    sub: "Bunga kawat bulu & boneka",
    price: 120000,
    badge: "Free Ucapan",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    alt: "Buket wisuda mawar lavender dengan boneka beruang",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlDUDyUCJY7BzfOgzD1OEI3wchlGfUeRhR_HE1Y1cw7EHjMOVvx9j_oeD3cpPRJzWHE8JFamdg3IvFBpvL7mo941jqaBDn62XDXrxHREiT8attcSlO4JYZzl1b2PRjg9ko-1kOJD91QUY82SDjI-AnzIEdK0KsaHJIh_cQTSQYUmL9VzB0PC0WIizHGzJ8ujp5rK6_C3ggZW_V42gW9e-C2HT4f3d14jQaC0TaoGL1EuE0iVJoLJRagQ",
  },
  {
    id: 102,
    name: "Lavender Bunch",
    sub: "Halus & lentur tahan lama",
    price: 65000,
    alt: "Seikat lavender dari kawat bulu",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaQzyujtPrEBW8ds6u-11BdUD2_FWcoQGrj0XfWMZBQAxD8XNpcoDA0gl-QsSn8T6ISn0CZo5SGajdbAOG4QiAjLfasrhJMgi4yg9IJ1meCf93oNzeEZLBNakACrt2M5BqsY2bJmLXWfVk8ya8PloxOu4-vQbbRko8OmRUuq0C99Mgs_t-7PNcwFD4A70224-7JAbkFfbpyL67OFQczpDFUU4d8NTNBGfT_DioA03RIfuWcFf5_crSZQ",
  },
  {
    id: 103,
    name: "Gantungan Pompom",
    sub: "Aksesoris tas gemoy",
    price: 25000,
    alt: "Gantungan kunci pompom bunga",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-zdSC2qoaiDIIi5pdEnvMX6EE3uBbVLlcirAtrXjQaCpu9eFH0XudOWZqKV53EYJAi33pAtjJA-HbvxQUwKERveFc21CFzpQkL48Uxa9p7gz9CJN2B_va3MpnvRW33iHC6gNrK52iFHwHve901n2YtgeIju_GEczqFGQx-ZYpatNx5M8Y1INPuCxcCTyYCFzOL9Nf4VCxN2uqVycOu1qHWCBNRPymIj2QU9sHb3StkWvsz1km3UEGPQ",
  },
  {
    id: 104,
    name: "Lily of the Valley LED",
    sub: "Bercahaya lembut estetik",
    price: 110000,
    badge: "Viral TikTok",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    alt: "Bunga lily of the valley dengan lampu LED",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYcqj6dVrdJV9FgpQlwCUPLxxmCRS-B7_fmtD9j8Ec1IVItaExxlfWn-l1FGrik4MS7otZ2kGH26kcMrdQUazlnMIFTjBm6rx0qNMvhgBHD1lu7BEL4Tg3uBv5sppIdKCxYK552FTnCDGNoLsNWzUXgG1A_dgduZPQTm2QqXGR-GA3jNH2AUTOaBEW6_l-tbV4prN63ARFJPL2mRgr1t91p5Zmwnz16uMT4NpQ7YOH7PXmKQjtyFt_hQ",
  },
];

const NAV = [
  { key: "katalog", label: "Katalog", icon: "local_florist", path: "/product" },
  { key: "kustomisasi", label: "Kustom", icon: "palette", path: "/custom" },
  { key: "keranjang", label: "Keranjang", icon: "shopping_bag", path: "/cart" },
  { key: "akun", label: "Akun", icon: "person", path: "/profile" },
];


const rupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

/* ---------- Small UI pieces ---------- */
function Icon({
  name,
  size = 20,
  filled = false,
  className = "",
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}`,
      }}
    >
      {name}
    </span>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const [activeChip, setActiveChip] = useState("Semua");
  // const [activeTab, setActiveTab] = useState("katalog");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* ===== Header ===== */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(217,119,106,0.06)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <img
              alt="FluffyPetal Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZUTTq4hT27SRmoOuoBdjL2JEK4W3CGymBU8bKUqGcQ9swazFeryIzMLorYCi6qIZj2P-NuS5phuqkOl85keEnkzKkkrLKnutNqzTnsrP5LBACYJmcyCDwe399EGN3UiYLrqJcQ9jqM8EoUxfkyElzAMQL4CQLX5oOhURb2dsVv_M7EFNhi03eyc3dKZ90piVAKgbkXQGddLNff3dXmeV5B9pV7SW_F8O62_2_0YNaXHy1h8EFW4wgjQ"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">
                FluffyPetal Studio
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-space-xs">
                Katalog
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Notifikasi"
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low"
            >
              <Icon name="notifications" size={22} />
            </button>
            <button
              aria-label="Profil Pelanggan"
              className="w-11 h-11 rounded-full flex items-center justify-center p-space-xs ml-space-xs"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(217,119,106,0.15)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChoX7iOwr838Q2uHZaK5_VXwQ4WyosVzlLKyQb9UR8i074adGEcoSxii3LCPje769IFzAPQobfmFVWUFTFRuC6gzKJFSG-da7wK3VcHiKZBHgRGhq2gCgGav_j36ELFbU4lc1v2Jbi6EX2KaXKIP936uE3CR8H1rhiUkzDss7jC0Vo70fzzgOvGjpIzpiSyt4e0NpWrWejweaAqGCd-EHsUTzmhwFsFpEW_2183rRcQee_0GG6CNkXsA"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Main ===== */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full">
          {/* Search + chips */}
          <div className="px-margin-mobile pt-space-md pb-space-xs flex flex-col gap-space-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-primary">
                <Icon name="search" />
              </div>
              <input
                type="text"
                placeholder="Cari buket kawat bulu favoritmu..."
                className="w-full pl-11 pr-11 py-space-sm bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-full shadow-[inset_0_2px_4px_rgba(45,37,40,0.04),0_6px_16px_rgba(247,168,184,0.12)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(247,168,184,0.4)] placeholder:text-outline transition-all"
              />
              <button
                aria-label="Filter Detail"
                className="absolute inset-y-0 right-0 pr-space-md flex items-center text-primary-container hover:text-primary transition-colors"
              >
                <Icon name="tune" />
              </button>
            </div>

            <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs -mx-margin-mobile px-margin-mobile">
              {CHIPS.map((chip) => {
                const active = chip === activeChip;
                return (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip)}
                    className={`flex-shrink-0 px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
                      active
                        ? "bg-secondary-container text-on-secondary-container shadow-[inset_0_1px_2px_#ffffff,0_4px_10px_rgba(68,102,75,0.15)]"
                        : "bg-surface-container-low text-on-surface-variant shadow-[0_2px_6px_rgba(217,119,106,0.08)] hover:bg-surface-container"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hero banner */}
          <div className="px-margin-mobile py-space-sm">
            <div className="relative w-full overflow-hidden rounded-lg bg-surface-container p-space-lg shadow-[0_12px_32px_-4px_rgba(217,119,106,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)]">
              <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-primary-container/30 blur-2xl pointer-events-none" />
              <div className="absolute right-3 top-2 flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_14px_rgba(247,168,184,0.25)] rotate-12">
                <Icon name="spa" size={28} filled className="text-primary" />
              </div>
              <div className="relative z-10 flex flex-col items-start max-w-[72%]">
                <span className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest text-tertiary font-label-sm text-label-sm shadow-[inset_0_1px_2px_#fff]">
                  Abadi • Tanpa Layu
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mt-space-xs leading-tight">
                  Handmade with Love &amp; Fluffy Details
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
                  Kreasi bunga kawat bulu chenille lembut, lentur dibentuk, dan
                  senantiasa merekah indah di sudut mejamu.
                </p>
                <button className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_14px_rgba(247,168,184,0.35)] active:scale-95 transition-transform">
                  <span>Lihat Best Seller</span>
                  <Icon name="arrow_forward" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Paling populer */}
          <section className="px-margin-mobile pt-space-lg pb-space-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon
                  name="local_fire_department"
                  size={22}
                  filled
                  className="text-tertiary"
                />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Paling Populer
                </h3>
              </div>
              <a
                href="#"
                className="font-label-md text-label-md text-primary flex items-center hover:opacity-80 transition-opacity"
              >
                Lihat Semua <Icon name="chevron_right" size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-space-md">
              {POPULAR.map((p) => (
                <article
                  key={p.id}
                  className="relative flex flex-row items-center bg-surface-container-lowest rounded-lg p-space-sm shadow-[0_10px_24px_-4px_rgba(217,119,106,0.08),inset_0_2px_3px_rgba(255,255,255,0.95)]"
                >
                  <div className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden shadow-[inset_0_2px_6px_rgba(45,37,40,0.06)] bg-surface-container-high">
                    <img
                      className="w-full h-full object-cover"
                      src={p.img}
                      alt={p.alt}
                    />
                    <span
                      className={`absolute top-1.5 left-1.5 px-space-xs py-0.5 rounded-full font-label-sm text-label-sm shadow-sm ${p.badgeClass}`}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between pl-space-md pr-space-xs py-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-tertiary">
                          <Icon name="star" size={16} filled />
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                            {p.rating.toFixed(1)}
                          </span>
                          <span className="font-label-sm text-label-sm text-outline">
                            ({p.reviews})
                          </span>
                        </div>
                        <button
                          aria-label="Favorit"
                          onClick={() => toggleFavorite(p.id)}
                          className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:text-tertiary transition-transform active:scale-90"
                        >
                          <Icon
                            name="favorite"
                            size={18}
                            filled={favorites.has(p.id)}
                            className={favorites.has(p.id) ? "text-tertiary" : ""}
                          />
                        </button>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1 truncate">
                        {p.name}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">
                        {p.desc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-space-sm pt-1">
                      <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                        {rupiah(p.price)}
                      </span>
                      <button
                        aria-label={`Tambah ${p.name}`}
                        onClick={addToCart}
                        className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_4px_10px_rgba(247,168,184,0.4)] active:scale-90 transition-transform"
                      >
                        <Icon name="add" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Kategori */}
          <section className="px-margin-mobile pt-space-lg pb-space-sm">
            <div className="flex items-center gap-space-xs mb-space-md">
              <Icon name="category" size={22} className="text-secondary" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Kategori Kerajinan
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-space-sm">
              {CATEGORIES.map((c) => (
                <button
                  key={c.title}
                  className={`flex flex-col items-center justify-center p-space-md rounded-lg text-center shadow-[0_8px_20px_-3px_rgba(217,119,106,0.06),inset_0_2px_4px_rgba(255,255,255,0.9)] active:scale-95 transition-transform ${c.card}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[inset_0_2px_3px_#ffffff,0_4px_8px_rgba(247,168,184,0.2)] mb-space-xs ${c.iconWrap}`}
                  >
                    <Icon name={c.icon} size={26} />
                  </div>
                  <span className="font-headline-sm text-[16px] leading-tight text-on-surface">
                    {c.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                    {c.sub}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Koleksi terbaru */}
          <section className="px-margin-mobile pt-space-lg pb-space-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon name="auto_awesome" size={22} className="text-primary" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Koleksi Terbaru
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Update Mingguan
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-md">
              {NEWEST.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col bg-surface-container-lowest rounded-lg p-space-xs shadow-[0_10px_24px_-4px_rgba(217,119,106,0.08),inset_0_2px_3px_rgba(255,255,255,0.95)]"
                >
                  <div className="relative w-full aspect-square rounded overflow-hidden bg-surface-container-high shadow-[inset_0_2px_6px_rgba(45,37,40,0.06)]">
                    <img
                      className="w-full h-full object-cover"
                      src={p.img}
                      alt={p.alt}
                    />
                    {p.badge && (
                      <span
                        className={`absolute top-1.5 left-1.5 px-space-xs py-0.5 rounded-full font-label-sm text-[10px] ${p.badgeClass}`}
                      >
                        {p.badge}
                      </span>
                    )}
                    <button
                      aria-label="Suka"
                      onClick={() => toggleFavorite(p.id)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center text-primary shadow-sm active:scale-90"
                    >
                      <Icon
                        name="favorite"
                        size={16}
                        filled={favorites.has(p.id)}
                        className={favorites.has(p.id) ? "text-tertiary" : ""}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col p-space-xs min-w-0">
                    <h4 className="font-headline-sm text-[16px] text-on-surface truncate mt-1">
                      {p.name}
                    </h4>
                    <span className="font-label-sm text-label-sm text-outline">
                      {p.sub}
                    </span>
                    <div className="flex items-center justify-between mt-space-sm pt-0.5">
                      <span className="font-headline-sm text-[16px] text-primary font-semibold">
                        {rupiah(p.price)}
                      </span>
                      <button
                        aria-label={`Tambah ${p.name}`}
                        onClick={addToCart}
                        className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),0_4px_8px_rgba(247,168,184,0.3)] active:scale-90"
                      >
                        <Icon name="add" size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Toast */}
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 z-50 ${
            toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="px-space-md py-space-xs bg-inverse-surface text-inverse-on-surface rounded-full shadow-lg flex items-center gap-space-xs">
            <Icon name="check_circle" size={18} className="text-primary-container" />
            <span className="font-label-md text-label-md">
              Berhasil ditambahkan ke keranjang!
            </span>
          </div>
        </div>
      </main>

      {/* ===== Bottom nav ===== */}
          <nav className="fixed bottom-0 left-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-8px_24px_rgba(217,119,106,0.08)]">
      <div className="flex justify-around items-center h-20 px-space-sm">
        {NAV.map((item) => {
          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          return (
            <button
              key={item.key}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] py-space-xs px-space-md rounded-full transition-all duration-200 ${
                active
                  ? "bg-primary-container text-on-primary-container shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_14px_rgba(247,168,184,0.35)]"
                  : "text-on-surface-variant"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon name={item.icon} size={22} />

                {item.key === "keranjang" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-tertiary text-on-tertiary font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </div>

              <span className="font-label-sm text-label-sm mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
    </div>
  );
}