import React, { useState, useEffect, useMemo, useRef } from "react";
import { supabase, supabaseReady } from "./supabaseClient";
import {
  Menu, X, Search, Heart, Share2, Phone, Send, MessageCircle, Music2,
  Sun, Moon, ChevronLeft, ChevronRight, SlidersHorizontal, Eye, Trash2,
  Pencil, Check, Plus, Upload, MapPin, GitCompareArrows, LayoutDashboard,
  Gauge, Fuel, Cog, Palette, User, ImageIcon, ArrowUpDown, LayoutGrid, List, Loader2,
  ExternalLink, ShieldCheck, AlertTriangle, LogIn, LogOut, Lock, Maximize2,
  Award, RefreshCw, Umbrella, KeyRound, Globe, HeartPulse, ShieldAlert, Car, FileText, Zap, ChevronDown,
  Sparkles, Download, CheckCircle2, XCircle, Fingerprint, Clock, Navigation, ScanLine, Camera
} from "lucide-react";

const BRANDS = [
  "Acura", "Alfa Romeo", "Audi", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Citroen", "Dacia", "Dodge", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti",
  "Jaguar", "Jeep", "Kia", "Lada", "Lancia", "Land Rover", "Lexus", "Lincoln", "Mazda",
  "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Renault",
  "Rolls-Royce", "Saab", "Seat", "Skoda", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota",
  "Volkswagen", "Volvo"
];
const MODELS_BY_BRAND = {
  "Acura": ["ILX", "TLX", "RDX", "MDX", "RLX", "NSX", "Integra"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Giulietta", "4C", "Tonale", "MiTo"],
  "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT", "R8", "e-tron"],
  "Bentley": ["Continental", "Flying Spur", "Bentayga", "Mulsanne"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX"],
  "Buick": ["Encore", "Enclave", "Envision", "LaCrosse", "Regal"],
  "Cadillac": ["ATS", "CTS", "XT4", "XT5", "XT6", "Escalade", "CT4", "CT5"],
  "Chevrolet": ["Aveo", "Cruze", "Malibu", "Impala", "Camaro", "Corvette", "Equinox", "Traverse", "Tahoe", "Suburban", "Silverado", "Spark", "Trax"],
  "Chrysler": ["300", "Pacifica", "Voyager"],
  "Citroen": ["C3", "C4", "C5", "C5 Aircross", "Berlingo", "Jumpy"],
  "Dacia": ["Logan", "Sandero", "Duster", "Dokker", "Lodgy"],
  "Dodge": ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan"],
  "Fiat": ["500", "Panda", "Tipo", "Punto", "500X", "Doblo"],
  "Ford": ["Fiesta", "Focus", "Mondeo", "Mustang", "Kuga", "Escape", "Explorer", "Edge", "EcoSport", "Ranger", "F-150", "Transit", "Puma"],
  "Genesis": ["G70", "G80", "G90", "GV70", "GV80"],
  "GMC": ["Terrain", "Acadia", "Yukon", "Sierra", "Canyon"],
  "Honda": ["Civic", "Accord", "CR-V", "HR-V", "Pilot", "Fit", "Jazz", "Insight", "Odyssey"],
  "Hyundai": ["i10", "i20", "i30", "Accent", "Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Creta", "Palisade", "Ioniq"],
  "Infiniti": ["Q50", "Q60", "Q70", "QX50", "QX60", "QX70", "QX80"],
  "Jaguar": ["XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"],
  "Kia": ["Picanto", "Rio", "Ceed", "Cerato/Forte", "Optima/K5", "Sportage", "Sorento", "Soul", "Stinger", "Niro", "Telluride"],
  "Lada": ["Granta", "Vesta", "Niva", "XRAY", "Kalina", "Priora"],
  "Lancia": ["Ypsilon", "Delta", "Musa"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar", "Discovery", "Discovery Sport", "Defender"],
  "Lexus": ["IS", "ES", "GS", "LS", "UX", "NX", "RX", "GX", "LX", "RC", "LC"],
  "Lincoln": ["MKZ", "Continental", "Corsair", "Nautilus", "Aviator", "Navigator"],
  "Mazda": ["2", "3", "6", "CX-3", "CX-5", "CX-9", "CX-30", "MX-5"],
  "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "Vito", "Sprinter"],
  "Mini": ["Cooper", "Clubman", "Countryman", "Paceman"],
  "Mitsubishi": ["Lancer", "Outlander", "ASX", "Eclipse Cross", "Pajero", "L200"],
  "Nissan": ["Micra", "Note", "Sentra/Sylphy", "Altima", "Maxima", "Qashqai", "X-Trail", "Murano", "Pathfinder", "Juke", "Leaf", "Navara"],
  "Opel": ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Zafira", "Vectra"],
  "Peugeot": ["208", "308", "508", "2008", "3008", "5008", "Partner"],
  "Porsche": ["911", "718 Cayman/Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
  "Renault": ["Clio", "Megane", "Talisman", "Captur", "Kadjar", "Koleos", "Duster", "Sandero", "Trafic"],
  "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Cullinan"],
  "Saab": ["9-3", "9-5"],
  "Seat": ["Ibiza", "Leon", "Toledo", "Arona", "Ateca", "Tarraco"],
  "Skoda": ["Fabia", "Rapid", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Scala"],
  "Smart": ["Fortwo", "Forfour"],
  "Subaru": ["Impreza", "Legacy", "Outback", "Forester", "XV/Crosstrek", "WRX", "BRZ"],
  "Suzuki": ["Swift", "Baleno", "Vitara", "SX4", "Jimny", "S-Cross"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
  "Toyota": ["Yaris", "Corolla", "Camry", "Avalon", "RAV4", "Highlander", "Land Cruiser", "Prado", "C-HR", "Prius", "Hilux", "Fortuner"],
  "Volkswagen": ["Polo", "Golf", "Jetta", "Passat", "Arteon", "Tiguan", "Touareg", "T-Roc", "T-Cross", "Touran", "Sharan", "ID.3", "ID.4"],
  "Volvo": ["S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90"]
};
const CITIES = ["Львів", "Київ", "Одеса", "Харків", "Тернопіль", "Івано-Франківськ", "Луцьк", "Рівне", "Дрогобич"];
const FUEL_TYPES = ["бензин", "дизель", "газ", "гібрид", "електро"];
const TRANSMISSIONS = ["механіка", "автомат", "робот", "варіатор"];
const DRIVES = ["передній", "задній", "повний"];
const BODY_TYPES = ["седан", "хетчбек", "універсал", "позашляховик", "купе", "мінівен"];
const COLORS = ["чорний", "білий", "сірий", "сірібний", "синій", "червоний", "коричневий", "зелений", "жовтий", "оранжевий", "бежевий", "бордовий", "фіолетовий"];

function makePhotos(seed, n) {
  return Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/900/620`);
}

function seedCars() {
  const raw = [
    { brand: "Audi", model: "Q5", trim: "Prestige", year: 2019, body: "позашляховик", engineVolume: 2.0, power: 249, fuel: "бензин", trans: "автомат", drive: "повний", color: "чорний", mileage: 84000, owners: 2, price: 24900, city: "Львів", desc: "Автомобіль в хорошому технічному стані, вчасне ТО, зимова та літня гума в комплекті." },
    { brand: "BMW", model: "3 Series", trim: "320d", year: 2020, body: "седан", engineVolume: 2.0, power: 190, fuel: "дизель", trans: "автомат", drive: "задній", color: "сірий", mileage: 62000, owners: 1, price: 27500, city: "Київ", desc: "Один власник, повна сервісна історія, без ДТП." },
    { brand: "Mercedes-Benz", model: "GLC", trim: "220d 4MATIC", year: 2018, body: "позашляховик", engineVolume: 2.1, power: 194, fuel: "дизель", trans: "автомат", drive: "повний", color: "білий", mileage: 91000, owners: 2, price: 25900, city: "Одеса", desc: "Панорамний дах, шкіряний салон, підігрів сидінь." },
    { brand: "Volkswagen", model: "Passat", trim: "B8 Highline", year: 2017, body: "універсал", engineVolume: 1.6, power: 120, fuel: "дизель", trans: "робот", drive: "передній", color: "сірібний", mileage: 128000, owners: 3, price: 14200, city: "Тернопіль", desc: "Економічний і надійний, готовий до експлуатації без вкладень." },
    { brand: "Toyota", model: "RAV4", trim: "Hybrid Style", year: 2021, body: "позашляховик", engineVolume: 2.5, power: 218, fuel: "гібрид", trans: "варіатор", drive: "повний", color: "синій", mileage: 38000, owners: 1, price: 31900, city: "Львів", desc: "Гібридна силова установка, низька витрата пального, як новий." },
    { brand: "Skoda", model: "Octavia", trim: "Ambition", year: 2019, body: "хетчбек", engineVolume: 1.5, power: 150, fuel: "бензин", trans: "механіка", drive: "передній", color: "червоний", mileage: 71000, owners: 1, price: 16700, city: "Івано-Франківськ", desc: "Місткий багажник, ідеальний стан кузова, свіже ТО." },
    { brand: "Renault", model: "Duster", trim: "Prestige 4x4", year: 2020, body: "позашляховик", engineVolume: 1.5, power: 115, fuel: "дизель", trans: "механіка", drive: "повний", color: "коричневий", mileage: 55000, owners: 1, price: 18400, city: "Луцьк", desc: "Повний привід, готовий до бездоріжжя, без вкладень." },
    { brand: "Nissan", model: "Qashqai", trim: "Acenta", year: 2018, body: "позашляховик", engineVolume: 1.3, power: 140, fuel: "бензин", trans: "варіатор", drive: "передній", color: "сірий", mileage: 68000, owners: 2, price: 17300, city: "Рівне", desc: "Компактний кросовер, зручний в місті, камера заднього виду." },
    { brand: "Honda", model: "Civic", trim: "Sport", year: 2020, body: "хетчбек", engineVolume: 1.5, power: 182, fuel: "бензин", trans: "робот", drive: "передній", color: "білий", mileage: 41000, owners: 1, price: 21800, city: "Дрогобич", desc: "Турбований двигун, спортивна підвіска, повна комплектація." }
  ];
  return raw.map((c, i) => ({
    id: `car-${i + 1}`,
    ...c,
    vin: `WA1${(100000000 + i * 731).toString(36).toUpperCase()}`,
    photos: makePhotos(`avtomix${i}`, 5),
    phone: "+380 63 123 45 67",
    telegram: "https://t.me/avtomix_lviv",
    viber: "viber://chat?number=%2B380631234567",
    whatsapp: "https://wa.me/380631234567",
    tiktokUrl: i % 3 === 0 ? "https://www.tiktok.com/@avtomix" : "",
    views: 40 + i * 17,
    published: true,
    createdAt: Date.now() - i * 86400000
  }));
}

const fmtPrice = (n) => "$" + n.toLocaleString("en-US");
const fmtNum = (n) => n.toLocaleString("uk-UA");

function useToast() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const show = (text) => {
    setToast(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  };
  return [toast, show];
}

function SocialIcon({ href, label, children }) {
  return (
    <a href={href || "#"} target="_blank" rel="noreferrer" aria-label={label} className="social-ic" title={label}>
      {children}
    </a>
  );
}

function Header({ theme, setTheme, view, setView, query, setQuery, menuOpen, setMenuOpen, social, favCount, cmpCount, toast, session, profile, onLogout }) {
  const isAdmin = !supabaseReady || profile?.role === "admin";
  const canPublish = !supabaseReady || (profile && (profile.role === "admin" || profile.role === "publisher"));
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-inner">
          <div className="socials">
            <SocialIcon href={social.telegram} label="Telegram"><Send size={15} /></SocialIcon>
            <SocialIcon href={social.whatsapp} label="WhatsApp"><MessageCircle size={15} /></SocialIcon>
          </div>
        </div>
      </div>
      <div className="header-main">
        <button className="icon-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="logo" onClick={() => setView("home")} role="button" tabIndex={0}>
          <span className="logo-word"><span className="logo-avto">Avto</span><span className="logo-mix">Mix</span></span>
        </div>

        <nav className="main-nav desktop-only">
          <button className={view === "home" ? "nav-link active" : "nav-link"} onClick={() => setView("home")}>Головна</button>
          <button className={view === "catalog" ? "nav-link active" : "nav-link"} onClick={() => setView("catalog")}>Авто в наявності</button>
          <button className={view === "selection" ? "nav-link active" : "nav-link"} onClick={() => setView("selection")}>🔍 Підбір авто</button>
          <button className={view === "tradein" ? "nav-link active" : "nav-link"} onClick={() => setView("tradein")}>Trade-IN</button>
          <button className={view === "insurance" ? "nav-link active" : "nav-link"} onClick={() => setView("insurance")}>Страхування</button>
          <button className={view === "contacts" ? "nav-link active" : "nav-link"} onClick={() => setView("contacts")}>Контакти</button>
          <button className={view === "vin" ? "nav-link active" : "nav-link"} onClick={() => setView("vin")}>VIN-перевірка</button>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Перемкнути тему">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {session ? (
            <button className="btn ghost desktop-only" onClick={onLogout}><LogOut size={14} /> Вийти</button>
          ) : (
            <button className="btn ghost desktop-only" onClick={() => setView(supabaseReady ? "auth" : "home")}>
              {supabaseReady ? <><LogIn size={14} /> Увійти</> : "Увійти"}
            </button>
          )}
          <button className="btn primary" onClick={() => setView("submit")}><Plus size={15} className="btn-icon-only" /><span className="btn-label-full">Подати оголошення</span></button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="search-wrap">
            <Search size={16} className="search-ic" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Пошук..." />
          </div>
          <button className="nav-link" onClick={() => { setView("home"); setMenuOpen(false); }}>Головна</button>
          <button className="nav-link" onClick={() => { setView("catalog"); setMenuOpen(false); }}>Авто в наявності</button>
          <button className="nav-link" onClick={() => { setView("selection"); setMenuOpen(false); }}>🔍 Підбір авто</button>
          <button className="nav-link" onClick={() => { setView("tradein"); setMenuOpen(false); }}>Trade-IN</button>
          <button className="nav-link" onClick={() => { setView("insurance"); setMenuOpen(false); }}>Страхування</button>
          <button className="nav-link" onClick={() => { setView("contacts"); setMenuOpen(false); }}>Контакти</button>
          <button className="nav-link" onClick={() => { setView("vin"); setMenuOpen(false); }}>VIN-перевірка</button>
          <div className="mobile-menu-sep" />
          <button className="nav-link" onClick={() => { setView("favorites"); setMenuOpen(false); }}>Обране ({favCount})</button>
          <button className="nav-link" onClick={() => { setView("compare"); setMenuOpen(false); }}>Порівняння ({cmpCount})</button>
          {isAdmin && <button className="nav-link" onClick={() => { setView("admin"); setMenuOpen(false); }}>Адмін-панель</button>}
          {session ? (
            <button className="btn ghost" onClick={() => { onLogout(); setMenuOpen(false); }}><LogOut size={14} /> Вийти</button>
          ) : (
            <button className="btn ghost" onClick={() => { setView(supabaseReady ? "auth" : "home"); setMenuOpen(false); }}>
              {supabaseReady ? <><LogIn size={14} /> Увійти</> : "Увійти"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function FeaturesRow({ setView }) {
  const items = [
    { icon: Award, title: "500+", text: "проданих авто", sub: "Довіра клієнтів, підтверджена результатом." },
    { icon: ShieldCheck, title: "VIN-перевірка", sub: "Перевіряйте історію автомобіля перед покупкою.", view: "vin" },
    { icon: RefreshCw, title: "Trade-In", sub: "Обміняйте старий автомобіль на новий.", view: "tradein" },
    { icon: Umbrella, title: "Страхування авто", sub: "Оформлення ОСЦПВ, Зеленої карти та ДЦВ.", view: "insurance" },
    { icon: MapPin, title: "Львів та область", sub: "Автомобілі від власників і автосалонів у Львові." }
  ];
  return (
    <div className="page-simple features-row-wrap">
      <div className="features-row">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className={it.view ? "feature-card clickable" : "feature-card"} onClick={it.view ? () => setView(it.view) : undefined}>
              <div className="feature-icon"><Icon size={20} /></div>
              <div>
                <h4>{it.title}</h4>
                {it.text && <span className="feature-tag">{it.text}</span>}
                <p>{it.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PromoBanners({ setView }) {
  return (
    <div className="page-simple promo-banners-wrap">
      <div className="promo-banners">
        <div className="promo-card promo-dark">
          <div className="promo-icon"><KeyRound size={30} /></div>
          <h3>Хочете продати авто?</h3>
          <p>Розмістіть оголошення та знайдіть покупця швидше.</p>
          <button className="btn primary lg" onClick={() => setView("submit")}><Plus size={16} /> Подати оголошення</button>
        </div>
        <div className="promo-card promo-accent">
          <div className="promo-icon"><Search size={30} /></div>
          <h3>Потрібна допомога з підбором авто?</h3>
          <p>Наші експерти допоможуть підібрати найкращий варіант.</p>
          <button className="btn outline lg" onClick={() => setView("selection")}>Підібрати авто</button>
        </div>
      </div>
    </div>
  );
}

function HeroBanner({ banner, setView }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banner.slides.length), 5000);
    return () => clearInterval(t);
  }, [banner.slides.length]);
  const slide = banner.slides[idx];
  return (
    <section className="hero">
      <div className="hero-slide">
        <div key={idx} className="hero-bg" style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: slide.bgSize || "cover",
          backgroundPosition: slide.bgPosition || "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: slide.bgColor || undefined
        }} />
        <div className="hero-overlay" style={{ backgroundImage: slide.overlay || "linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.18))" }} />
        <div className="hero-beam" aria-hidden="true" />
        <div className="hero-content">
          {!slide.hideEyebrow && <p className="hero-eyebrow">{slide.eyebrow || "AVTOMIX · перевірені авто з усієї України"}</p>}
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-sub">{slide.subtitle}</p>
          <div className="hero-actions">
            <button className="btn primary lg" onClick={() => setView(slide.primaryView || "home")}>{slide.primaryLabel || "Переглянути каталог"}</button>
            <button className="btn outline lg" onClick={() => setView(slide.secondaryView || "submit")}>{slide.secondaryLabel || "Подати оголошення"}</button>
          </div>
        </div>
      </div>
      <button className="hero-arrow left" onClick={() => setIdx((idx - 1 + banner.slides.length) % banner.slides.length)} aria-label="Попередній слайд"><ChevronLeft size={20} /></button>
      <button className="hero-arrow right" onClick={() => setIdx((idx + 1) % banner.slides.length)} aria-label="Наступний слайд"><ChevronRight size={20} /></button>
      <div className="hero-dots">
        {banner.slides.map((_, i) => (
          <button key={i} className={i === idx ? "dot active" : "dot"} onClick={() => setIdx(i)} aria-label={`Слайд ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

function CarCard({ car, isFav, onToggleFav, isCmp, onToggleCmp, onOpen, layout = "grid" }) {
  return (
    <article className={layout === "list" ? "car-card list" : "car-card"} onClick={() => onOpen(car.id)}>
      <div className="car-card-img">
        <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} loading="lazy" />
        <button className={isFav ? "fav-btn active" : "fav-btn"} onClick={(e) => { e.stopPropagation(); onToggleFav(car.id); }} aria-label="Додати в обране">
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
        {!car.published && <span className="pending-tag">На модерації</span>}
      </div>
      <div className="car-card-body">
        <div className="car-card-top">
          <h3>{car.brand} {car.model}</h3>
          <span className="price">{fmtPrice(car.price)}</span>
        </div>
        <p className="trim">{car.trim}</p>
        <div className="specs-row">
          <span><Gauge size={13} /> {fmtNum(car.mileage)} км</span>
          <span><Fuel size={13} /> {car.engineVolume} л · {car.fuel}</span>
          <span><Cog size={13} /> {car.trans}</span>
        </div>
        <div className="car-card-bottom">
          <span className="year">{car.year} р.</span>
          <span className="city"><MapPin size={13} /> {car.city}</span>
          {car.owners === 1 && <span className="owner-tag">Перший власник</span>}
        </div>
        <label className="cmp-check" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={isCmp} onChange={() => onToggleCmp(car.id)} />
          Порівняти
        </label>
      </div>
    </article>
  );
}

const emptyFilters = { search: "", brand: "", model: "", yearFrom: "", yearTo: "", priceFrom: "", priceTo: "", mileageMax: "", body: "", fuel: "", trans: "", drive: "", color: "", city: "" };

function FilterPanel({ filters, setFilters, onReset }) {
  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const models = filters.brand ? (MODELS_BY_BRAND[filters.brand] || []) : [];
  return (
    <aside className="filters">
      <div className="filters-head">
        <h3><SlidersHorizontal size={16} /> Фільтри</h3>
        <button className="link-btn" onClick={onReset}>Скинути</button>
      </div>

      <div className="f-group">
        <label>Марка</label>
        <select value={filters.brand} onChange={(e) => { set("brand", e.target.value); set("model", ""); }}>
          <option value="">Будь-яка</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Модель</label>
        <select value={filters.model} onChange={(e) => set("model", e.target.value)} disabled={!filters.brand}>
          <option value="">Будь-яка</option>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="f-group two-col">
        <div><label>Рік від</label><input type="number" placeholder="2005" value={filters.yearFrom} onChange={(e) => set("yearFrom", e.target.value)} /></div>
        <div><label>Рік до</label><input type="number" placeholder="2026" value={filters.yearTo} onChange={(e) => set("yearTo", e.target.value)} /></div>
      </div>
      <div className="f-group two-col">
        <div><label>Ціна від, $</label><input type="number" placeholder="0" value={filters.priceFrom} onChange={(e) => set("priceFrom", e.target.value)} /></div>
        <div><label>Ціна до, $</label><input type="number" placeholder="50000" value={filters.priceTo} onChange={(e) => set("priceTo", e.target.value)} /></div>
      </div>
      <div className="f-group">
        <label>Пробіг до, км</label>
        <input type="number" placeholder="200000" value={filters.mileageMax} onChange={(e) => set("mileageMax", e.target.value)} />
      </div>
      <div className="f-group">
        <label>Тип кузова</label>
        <select value={filters.body} onChange={(e) => set("body", e.target.value)}>
          <option value="">Будь-який</option>
          {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Тип двигуна</label>
        <select value={filters.fuel} onChange={(e) => set("fuel", e.target.value)}>
          <option value="">Будь-який</option>
          {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Коробка передач</label>
        <select value={filters.trans} onChange={(e) => set("trans", e.target.value)}>
          <option value="">Будь-яка</option>
          {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Привід</label>
        <select value={filters.drive} onChange={(e) => set("drive", e.target.value)}>
          <option value="">Будь-який</option>
          {DRIVES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Колір</label>
        <select value={filters.color} onChange={(e) => set("color", e.target.value)}>
          <option value="">Будь-який</option>
          {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="f-group">
        <label>Місто</label>
        <select value={filters.city} onChange={(e) => set("city", e.target.value)}>
          <option value="">Будь-яке</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </aside>
  );
}

function CatalogView({ cars, filters, setFilters, favorites, toggleFav, compareList, toggleCmp, openCar, filtersOpen, setFiltersOpen, heading = "Каталог автомобілів", intro = "" }) {
  const [sort, setSort] = useState("default");
  const [layout, setLayout] = useState("grid");

  const filtered = useMemo(() => {
    const result = cars.filter((c) => {
      if (!c.published) return false;
      const q = filters.search.trim().toLowerCase();
      if (q && !(`${c.brand} ${c.model} ${c.city}`.toLowerCase().includes(q))) return false;
      if (filters.brand && c.brand !== filters.brand) return false;
      if (filters.model && c.model !== filters.model) return false;
      if (filters.yearFrom && c.year < Number(filters.yearFrom)) return false;
      if (filters.yearTo && c.year > Number(filters.yearTo)) return false;
      if (filters.priceFrom && c.price < Number(filters.priceFrom)) return false;
      if (filters.priceTo && c.price > Number(filters.priceTo)) return false;
      if (filters.mileageMax && c.mileage > Number(filters.mileageMax)) return false;
      if (filters.body && c.body !== filters.body) return false;
      if (filters.fuel && c.fuel !== filters.fuel) return false;
      if (filters.trans && c.trans !== filters.trans) return false;
      if (filters.drive && c.drive !== filters.drive) return false;
      if (filters.color && c.color !== filters.color) return false;
      if (filters.city && c.city !== filters.city) return false;
      return true;
    });
    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "year-desc") sorted.sort((a, b) => b.year - a.year);
    else if (sort === "mileage-asc") sorted.sort((a, b) => a.mileage - b.mileage);
    return sorted;
  }, [cars, filters, sort]);

  const [visible, setVisible] = useState(6);

  return (
    <div className="catalog-wrap">
      <button className="filters-toggle mobile-only" onClick={() => setFiltersOpen(!filtersOpen)}>
        <SlidersHorizontal size={16} /> Фільтри
      </button>
      <div className={filtersOpen ? "filters-drawer open" : "filters-drawer"}>
        <FilterPanel filters={filters} setFilters={setFilters} onReset={() => setFilters(emptyFilters)} />
      </div>
      <div className="catalog-main">
        <div className="catalog-head">
          <div>
            <h2>{heading}</h2>
            {intro && <p className="catalog-intro">{intro}</p>}
          </div>
          <div className="catalog-controls">
            <span className="count">{filtered.length} оголошень</span>
            <div className="sort-wrap">
              <ArrowUpDown size={14} />
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">За замовчуванням</option>
                <option value="price-asc">Дешевші спершу</option>
                <option value="price-desc">Дорожчі спершу</option>
                <option value="year-desc">Новіші спершу</option>
                <option value="mileage-asc">Менший пробіг</option>
              </select>
            </div>
            <div className="view-toggle">
              <button className={layout === "grid" ? "vt-btn active" : "vt-btn"} onClick={() => setLayout("grid")} aria-label="Плитка"><LayoutGrid size={15} /></button>
              <button className={layout === "list" ? "vt-btn active" : "vt-btn"} onClick={() => setLayout("list")} aria-label="Список"><List size={15} /></button>
            </div>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">Нічого не знайдено. Спробуйте змінити фільтри.</div>
        ) : (
          <>
            <div className={layout === "list" ? "cars-grid list-mode" : "cars-grid"}>
              {filtered.slice(0, visible).map((c) => (
                <CarCard key={c.id} car={c} isFav={favorites.includes(c.id)} onToggleFav={toggleFav}
                  isCmp={compareList.includes(c.id)} onToggleCmp={toggleCmp} onOpen={openCar} layout={layout} />
              ))}
            </div>
            {visible < filtered.length && (
              <button className="btn outline load-more" onClick={() => setVisible((v) => v + 6)}>Показати ще</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CarDetailView({ car, cars, favorites, toggleFav, openCar, setView, toast, onView }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => { onView(car.id); setPhotoIdx(0); }, [car.id]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") setPhotoIdx((i) => (i - 1 + car.photos.length) % car.photos.length);
      if (e.key === "ArrowRight") setPhotoIdx((i) => (i + 1) % car.photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [fullscreen, car.photos.length]);

  const similar = cars.filter((c) => c.id !== car.id && c.published && (c.brand === car.brand || c.body === car.body)).slice(0, 3);
  const isFav = favorites.includes(car.id);

  const copyLink = () => {
    const url = `https://avtomix.ua/car/${car.id}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    toast("Посилання скопійовано");
  };

  return (
    <div className="detail-wrap">
      <button className="link-btn back-link" onClick={() => setView("home")}><ChevronLeft size={16} /> Назад до каталогу</button>
      <div className="detail-grid">
        <div className="gallery">
          <div className="gallery-main">
            <img src={car.photos[photoIdx]} alt={`${car.brand} ${car.model}`} onClick={() => setFullscreen(true)} style={{ cursor: "zoom-in" }} />
            <button className="hero-arrow left" onClick={() => setPhotoIdx((photoIdx - 1 + car.photos.length) % car.photos.length)}><ChevronLeft size={18} /></button>
            <button className="hero-arrow right" onClick={() => setPhotoIdx((photoIdx + 1) % car.photos.length)}><ChevronRight size={18} /></button>
            <button className="gallery-expand-btn" onClick={() => setFullscreen(true)} aria-label="На весь екран"><Maximize2 size={16} /></button>
          </div>
          <div className="gallery-thumbs">
            {car.photos.map((p, i) => (
              <img key={i} src={p} className={i === photoIdx ? "thumb active" : "thumb"} onClick={() => setPhotoIdx(i)} alt="" />
            ))}
          </div>

          <div className="detail-section">
            <h3>Характеристики</h3>
            <div className="specs-grid">
              <div><span>Марка</span><b>{car.brand}</b></div>
              <div><span>Модель</span><b>{car.model}</b></div>
              <div><span>Комплектація</span><b>{car.trim}</b></div>
              <div><span>Рік випуску</span><b>{car.year}</b></div>
              <div><span>VIN-код</span><b>{car.vin} <button className="link-btn vin-inline-link" onClick={() => setView("vin")}>перевірити</button></b></div>
              <div><span>Тип кузова</span><b>{car.body}</b></div>
              <div><span>Об'єм двигуна</span><b>{car.engineVolume} л</b></div>
              <div><span>Потужність</span><b>{car.power} к.с.</b></div>
              <div><span>Тип пального</span><b>{car.fuel}</b></div>
              <div><span>Коробка передач</span><b>{car.trans}</b></div>
              <div><span>Привід</span><b>{car.drive}</b></div>
              <div><span>Колір</span><b>{car.color}</b></div>
              <div><span>Пробіг</span><b>{fmtNum(car.mileage)} км</b></div>
              <div><span>Власників</span><b>{car.owners}</b></div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Опис</h3>
            <p className="desc-text">{car.desc}</p>
          </div>
        </div>

        <div className="detail-side">
          <div className="price-card">
            <div className="price-card-top">
              <h1>{car.brand} {car.model}</h1>
              <button className={isFav ? "fav-btn static active" : "fav-btn static"} onClick={() => toggleFav(car.id)} aria-label="В обране">
                <Heart size={18} fill={isFav ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="trim">{car.trim} · {car.year} р.</p>
            <div className="big-price">{fmtPrice(car.price)}</div>
            <div className="meta-row"><MapPin size={14} /> {car.city} <span className="dot-sep">·</span><Eye size={14} /> {car.views} переглядів</div>

            <div className="contact-buttons">
              <a className="btn primary block" href={`tel:${car.phone.replace(/\s/g, "")}`}><Phone size={16} /> Подзвонити</a>
              {car.tiktokUrl && (
                <a className="btn tiktok block" href={car.tiktokUrl} target="_blank" rel="noreferrer"><Music2 size={16} /> Дивитися відео в TikTok</a>
              )}
            </div>

            <button className="link-btn share-link" onClick={copyLink}><Share2 size={14} /> Скопіювати посилання</button>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="detail-section">
          <h3>Схожі автомобілі</h3>
          <div className="cars-grid">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} isFav={favorites.includes(c.id)} onToggleFav={toggleFav}
                isCmp={false} onToggleCmp={() => {}} onOpen={openCar} />
            ))}
          </div>
        </div>
      )}

      {fullscreen && (
        <div className="photo-lightbox" onClick={() => setFullscreen(false)}>
          <button className="lightbox-close" onClick={() => setFullscreen(false)} aria-label="Закрити"><X size={26} /></button>
          <button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); setPhotoIdx((photoIdx - 1 + car.photos.length) % car.photos.length); }} aria-label="Попереднє фото"><ChevronLeft size={26} /></button>
          <img src={car.photos[photoIdx]} alt={`${car.brand} ${car.model}`} onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); setPhotoIdx((photoIdx + 1) % car.photos.length); }} aria-label="Наступне фото"><ChevronRight size={26} /></button>
          <div className="lightbox-counter">{photoIdx + 1} / {car.photos.length}</div>
        </div>
      )}
    </div>
  );
}

function FavoritesView({ cars, favorites, toggleFav, compareList, toggleCmp, openCar }) {
  const list = cars.filter((c) => favorites.includes(c.id));
  return (
    <div className="page-simple">
      <h2>Обране</h2>
      {list.length === 0 ? (
        <div className="empty-state">Ви ще не додали жодного авто в обране.</div>
      ) : (
        <div className="cars-grid">
          {list.map((c) => (
            <CarCard key={c.id} car={c} isFav onToggleFav={toggleFav} isCmp={compareList.includes(c.id)} onToggleCmp={toggleCmp} onOpen={openCar} />
          ))}
        </div>
      )}
    </div>
  );
}

function CompareView({ cars, compareList, toggleCmp }) {
  const list = cars.filter((c) => compareList.includes(c.id));
  const rows = [
    ["Ціна", (c) => fmtPrice(c.price)], ["Рік", (c) => c.year], ["Пробіг", (c) => fmtNum(c.mileage) + " км"],
    ["Двигун", (c) => `${c.engineVolume} л · ${c.fuel}`], ["Потужність", (c) => c.power + " к.с."],
    ["Коробка", (c) => c.trans], ["Привід", (c) => c.drive], ["Кузов", (c) => c.body], ["Колір", (c) => c.color],
    ["Власників", (c) => c.owners], ["Місто", (c) => c.city]
  ];
  return (
    <div className="page-simple">
      <h2>Порівняння автомобілів</h2>
      {list.length === 0 ? (
        <div className="empty-state">Додайте авто до порівняння з каталогу (до 3 штук).</div>
      ) : (
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                {list.map((c) => (
                  <th key={c.id}>
                    <img src={c.photos[0]} alt="" />
                    <div>{c.brand} {c.model}</div>
                    <button className="link-btn" onClick={() => toggleCmp(c.id)}>Прибрати</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, get]) => (
                <tr key={label}>
                  <td className="row-label">{label}</td>
                  {list.map((c) => <td key={c.id}>{get(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PhotoDrop({ photos, setPhotos }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (files) => {
    const arr = Array.from(files).slice(0, Math.max(0, 30 - photos.length));
    const entries = arr.map((f) => ({ url: URL.createObjectURL(f), file: f }));
    setPhotos((p) => [...p, ...entries].slice(0, 30));
  };

  return (
    <div>
      <div
        className={dragOver ? "dropzone drag" : "dropzone"}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current.click()}
      >
        <Upload size={22} />
        <p>Перетягніть фото сюди або натисніть, щоб вибрати</p>
        <span className="hint">До 30 фото · автоматичне стиснення · перше фото — головне</span>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
      </div>
      {photos.length > 0 && (
        <div className="photo-grid">
          {photos.map((p, i) => (
            <div key={i} className="photo-thumb-wrap">
              <img src={p.url} alt="" />
              {i === 0 && <span className="main-photo-tag">Головне</span>}
              <button type="button" className="photo-remove" onClick={() => setPhotos((ph) => ph.filter((_, idx) => idx !== i))} aria-label="Видалити фото"><X size={13} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function SubmitListingView({ addCar, setView, toast, session, profile }) {
  const [form, setForm] = useState({
    brand: "", model: "", trim: "", year: "", vin: "", engineVolume: "", power: "", fuel: FUEL_TYPES[0],
    trans: TRANSMISSIONS[0], drive: DRIVES[0], color: "", mileage: "", owners: "1", body: BODY_TYPES[0],
    desc: "", price: "", city: "", phone: "", tiktokUrl: ""
  });
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (supabaseReady && !session) {
    return (
      <div className="page-simple narrow">
        <h2>Подати оголошення</h2>
        <div className="access-gate">
          <Lock size={22} />
          <p>Щоб подати оголошення, спершу увійдіть або зареєструйтесь.</p>
          <button className="btn primary" onClick={() => setView("auth")}>Увійти / зареєструватись</button>
        </div>
      </div>
    );
  }

  if (supabaseReady && profile && profile.role === "user") {
    return (
      <div className="page-simple narrow">
        <h2>Подати оголошення</h2>
        <div className="access-gate">
          <Lock size={22} />
          <p>У вашого акаунта поки немає доступу до публікації оголошень. Зверніться до адміністратора сайту, щоб отримати доступ.</p>
        </div>
      </div>
    );
  }

  const required = ["brand", "price", "phone"];
  const missing = required.filter((k) => !String(form[k]).trim());

  const autoPublish = supabaseReady && profile && (profile.role === "admin" || profile.role === "publisher");

  const submit = async (e) => {
    e.preventDefault();
    if (missing.length > 0) { toast("Заповніть усі обов'язкові поля"); return; }

    const carData = {
      ...form,
      year: Number(form.year), engineVolume: Number(form.engineVolume), power: Number(form.power),
      mileage: Number(form.mileage), owners: Number(form.owners) || 1, price: Number(form.price)
    };

    if (supabaseReady) {
      if (photos.length === 0) { toast("Додайте хоча б одне фото авто"); return; }
      setSubmitting(true);
      try {
        const uploadedUrls = [];
        for (let i = 0; i < photos.length; i++) {
          const { file } = photos[i];
          const path = `${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
          const { error: upErr } = await supabase.storage.from("car-photos").upload(path, file);
          if (upErr) throw upErr;
          const { data } = supabase.storage.from("car-photos").getPublicUrl(path);
          uploadedUrls.push(data.publicUrl);
        }
        await addCar({ ...carData, photos: uploadedUrls, published: autoPublish, views: 0 });
        toast(autoPublish ? "Оголошення опубліковано" : "Оголошення надіслано на модерацію");
        setView("home");
      } catch (err) {
        toast(err.message || "Не вдалося надіслати оголошення");
      } finally {
        setSubmitting(false);
      }
    } else {
      addCar({
        ...carData,
        photos: photos.length > 0 ? photos.map((p) => p.url) : makePhotos(`new-${Date.now()}`, 3),
        published: autoPublish, views: 0
      });
      toast(autoPublish ? "Оголошення опубліковано" : "Оголошення надіслано на модерацію");
      setView("home");
    }
  };

  return (
    <div className="page-simple narrow">
      <h2>Подати оголошення</h2>
      <form className="listing-form" onSubmit={submit}>
        <div className="form-section">
          <h4>Основна інформація</h4>
          <div className="form-grid">
            <div>
              <label>Марка *</label>
              <select value={form.brand} onChange={(e) => { set("brand", e.target.value); set("model", ""); }}>
                <option value="">Оберіть марку</option>
                {BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label>Модель</label>
              <select value={form.model} onChange={(e) => set("model", e.target.value)}>
                <option value="">Оберіть модель</option>
                {(MODELS_BY_BRAND[form.brand] || []).map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div><label>Комплектація</label><input value={form.trim} onChange={(e) => set("trim", e.target.value)} placeholder="Prestige" /></div>
            <div><label>Рік випуску</label><input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2019" /></div>
            <div><label>VIN-код</label><input value={form.vin} onChange={(e) => set("vin", e.target.value)} placeholder="Необов'язково" /></div>
            <div><label>Тип кузова</label><select value={form.body} onChange={(e) => set("body", e.target.value)}>{BODY_TYPES.map((b) => <option key={b}>{b}</option>)}</select></div>
          </div>
        </div>

        <div className="form-section">
          <h4>Технічні характеристики</h4>
          <div className="form-grid">
            <div><label>Об'єм двигуна, л</label><input type="number" step="0.1" value={form.engineVolume} onChange={(e) => set("engineVolume", e.target.value)} placeholder="2.0" /></div>
            <div><label>Потужність, к.с.</label><input type="number" value={form.power} onChange={(e) => set("power", e.target.value)} placeholder="190" /></div>
            <div><label>Тип пального</label><select value={form.fuel} onChange={(e) => set("fuel", e.target.value)}>{FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}</select></div>
            <div><label>Коробка передач</label><select value={form.trans} onChange={(e) => set("trans", e.target.value)}>{TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label>Привід</label><select value={form.drive} onChange={(e) => set("drive", e.target.value)}>{DRIVES.map((d) => <option key={d}>{d}</option>)}</select></div>
            <div><label>Колір</label><select value={form.color} onChange={(e) => set("color", e.target.value)}><option value="">Оберіть колір</option>{COLORS.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label>Пробіг, км</label><input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} placeholder="84000" /></div>
            <div><label>Кількість власників</label><input type="number" value={form.owners} onChange={(e) => set("owners", e.target.value)} placeholder="1" /></div>
          </div>
        </div>

        <div className="form-section">
          <h4>Опис і ціна</h4>
          <label>Опис</label>
          <textarea rows={4} value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Розкажіть про стан авто, комплектацію, історію обслуговування..." />
          <div className="form-grid" style={{ marginTop: 12 }}>
            <div><label>Ціна, $ *</label><input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="24900" /></div>
            <div><label>Місто</label><select value={form.city} onChange={(e) => set("city", e.target.value)}><option value="">Оберіть місто</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
        </div>

        <div className="form-section">
          <h4>Контакти</h4>
          <div className="form-grid">
            <div><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
          </div>
        </div>

        <div className="form-section">
          <h4>TikTok</h4>
          <label>Посилання на TikTok</label>
          <input value={form.tiktokUrl} onChange={(e) => set("tiktokUrl", e.target.value)} placeholder="https://www.tiktok.com/..." />
        </div>

        <div className="form-section">
          <h4>Фотографії</h4>
          <PhotoDrop photos={photos} setPhotos={setPhotos} />
        </div>

        <button className="btn primary lg" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? <><Loader2 size={16} className="spin-ic" /> Надсилаємо...</> : "Надіслати на модерацію"}
        </button>
      </form>
    </div>
  );
}

function SelectionRequestView({ toast }) {
  const [form, setForm] = useState({ name: "", phone: "", brand: "", model: "", budgetFrom: "", budgetTo: "", yearFrom: "", yearTo: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast("Вкажіть ім'я та телефон"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Підбір авто" })
      });
      if (!res.ok) throw new Error("request failed");
      toast("Заявку надіслано! Ми зв'яжемось з вами найближчим часом");
      setForm({ name: "", phone: "", brand: "", model: "", budgetFrom: "", budgetTo: "", yearFrom: "", yearTo: "", comment: "" });
    } catch (err) {
      toast("Не вдалося надіслати заявку. Зателефонуйте нам напряму");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-simple narrow">
      <h2>🔍 Підбір авто</h2>
      <p className="intro-text">Розкажіть, яке авто шукаєте — підберемо варіанти з наявних і нових надходжень та звʼяжемось з вами. Заявка одразу надходить нашому менеджеру.</p>
      <form className="listing-form" onSubmit={submit}>
        <div className="form-section">
          <h4>Ваші побажання</h4>
          <div className="form-grid">
            <div><label>Марка</label><input list="brands-selection" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Наприклад, Toyota" /></div>
            <div><label>Модель</label><input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Наприклад, RAV4" /></div>
            <div><label>Бюджет від, $</label><input type="number" value={form.budgetFrom} onChange={(e) => set("budgetFrom", e.target.value)} placeholder="10000" /></div>
            <div><label>Бюджет до, $</label><input type="number" value={form.budgetTo} onChange={(e) => set("budgetTo", e.target.value)} placeholder="25000" /></div>
            <div><label>Рік від</label><input type="number" value={form.yearFrom} onChange={(e) => set("yearFrom", e.target.value)} placeholder="2015" /></div>
            <div><label>Рік до</label><input type="number" value={form.yearTo} onChange={(e) => set("yearTo", e.target.value)} placeholder="2023" /></div>
          </div>
          <datalist id="brands-selection">{BRANDS.map((b) => <option key={b} value={b} />)}</datalist>
          <div style={{ marginTop: 12 }}>
            <label>Коментар</label>
            <textarea rows={3} value={form.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Додаткові побажання: колір, привід, стан..." />
          </div>
        </div>
        <div className="form-section">
          <h4>Контакти</h4>
          <div className="form-grid">
            <div><label>Ім'я *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ваше ім'я" /></div>
            <div><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
          </div>
        </div>
        <button className="btn primary lg" type="submit" disabled={submitting} style={{ width: "100%" }}>
          {submitting ? <><Loader2 size={16} className="spin-ic" /> Надсилаємо...</> : "Надіслати заявку"}
        </button>
      </form>
    </div>
  );
}

const INSURANCE_TYPES = [
  {
    id: "oscpv",
    title: "ОСЦПВ",
    icon: Car,
    short: "Обов'язкове страхування цивільної відповідальності водія.",
    desc: "Обов'язковий поліс цивільної відповідальності. Покриває шкоду, завдану іншим людям і їхньому майну, якщо винуватець ДТП — ви. Без нього керувати авто в Україні заборонено законом."
  },
  {
    id: "kasko",
    title: "КАСКО",
    icon: ShieldCheck,
    short: "Повний захист автомобіля від пошкодження, викрадення та інших ризиків.",
    desc: "Добровільне комплексне страхування власного авто: ДТП, викрадення, пожежа, стихійне лихо. Відшкодовує ремонт або вартість авто незалежно від того, хто винен у ДТП."
  },
  {
    id: "green-card",
    title: "Зелена карта",
    icon: Globe,
    short: "Страхування для подорожей автомобілем за кордон.",
    desc: "Міжнародний аналог автоцивілки. Обов'язкова для в'їзду в більшість країн Європи — без неї на кордоні можуть не пропустити або оштрафувати."
  },
  {
    id: "medical",
    title: "Медичне страхування",
    icon: HeartPulse,
    short: "Захист під час подорожей Україною та за кордон.",
    desc: "Медична допомога та підтримка в будь-якій країні світу — лікарські витрати, екстрена допомога, турбота про ваше здоров'я в дорозі."
  },
  {
    id: "dcv",
    title: "ДЦВ",
    icon: ShieldAlert,
    short: "Додатковий захист цивільної відповідальності.",
    desc: "Добровільне страхування цивільної відповідальності понад ліміти ОСЦПВ — вищі суми покриття для серйозних випадків."
  }
];

const INSURANCE_STEPS = [
  { icon: FileText, title: "Оберіть потрібний вид страхування" },
  { icon: User, title: "Залиште заявку" },
  { icon: ShieldCheck, title: "Отримайте електронний страховий поліс" }
];

const INSURANCE_WHY = [
  { icon: Zap, title: "Швидке оформлення", text: "Оформлення страховки за кілька хвилин онлайн." },
  { icon: Award, title: "Перевірені партнери", text: "Працюємо тільки з надійними страховими компаніями." },
  { icon: FileText, title: "Електронний поліс", text: "Отримайте поліс на email одразу після оформлення." },
  { icon: MessageCircle, title: "Підтримка 24/7", text: "Наші менеджери завжди на зв'язку та допоможуть." }
];

function InsuranceView({ toast }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const typesRef = useRef(null);
  const formRef = useRef(null);

  const scrollToTypes = () => typesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openType = (id) => {
    setSelected(id);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast("Вкажіть ім'я та телефон"); return; }
    setSubmitting(true);
    const typeTitle = selected === "consult" ? "Консультація" : (INSURANCE_TYPES.find((t) => t.id === selected)?.title || "Не вказано");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, comment: `Вид страхування: ${typeTitle}. ${form.comment || ""}`.trim(), source: "Страхування" })
      });
      if (!res.ok) throw new Error("request failed");
      toast("Заявку надіслано! Менеджер звʼяжеться з вами найближчим часом");
      setForm({ name: "", phone: "", comment: "" });
      setSelected(null);
    } catch (err) {
      toast("Не вдалося надіслати заявку. Зателефонуйте нам напряму");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="insurance-page">
      <div className="page-simple breadcrumb-wrap">
        <p className="breadcrumb"><span onClick={() => {}}>Головна</span> <ChevronRight size={12} /> <span>Страхування авто</span></p>
      </div>

      <section className="ins-hero">
        <div className="ins-hero-bg" style={{ backgroundImage: "url(/insurance-hero.png)" }} />
        <div className="ins-hero-overlay" />
        <div className="page-simple ins-hero-inner">
          <div className="ins-hero-text">
            <p className="hero-eyebrow">СТРАХУВАННЯ AVTOMIX</p>
            <h1 className="ins-hero-title">Страхування за кілька хвилин</h1>
            <p className="ins-hero-sub">ОСЦПВ, КАСКО, Зелена карта та інші страхові продукти від перевірених партнерів.</p>
            <div className="hero-actions">
              <button className="btn primary lg" onClick={scrollToTypes}>Оформити страховку</button>
              <button className="btn outline lg" onClick={() => openType("consult")}>Отримати консультацію</button>
            </div>
          </div>
          <div className="ins-glass-card">
            {INSURANCE_TYPES.map((t) => (
              <div key={t.id} className="ins-glass-row"><Check size={16} /> {t.title}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-simple">
        <h2 ref={typesRef} className="section-title">Що можна застрахувати</h2>
        <div className="insurance-grid">
          {INSURANCE_TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.id} className="insurance-card">
                <div className="insurance-card-icon"><Icon size={22} /></div>
                <h4>{t.title}</h4>
                <p>{t.short}</p>
                <button className="link-btn" onClick={() => openType(t.id)}>Дізнатися більше <ChevronRight size={14} /></button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="page-simple">
        <h2 className="section-title">Як це працює</h2>
        <div className="ins-steps">
          {INSURANCE_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={s.title}>
                <div className="ins-step">
                  <div className="ins-step-icon"><Icon size={24} /><span className="ins-step-num">{i + 1}</span></div>
                  <p>{s.title}</p>
                </div>
                {i < INSURANCE_STEPS.length - 1 && <div className="ins-step-arrow"><ChevronRight size={20} /></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="page-simple">
        <h2 className="section-title">Чому оформлюють через AvtoMix</h2>
        <div className="ins-why-grid">
          {INSURANCE_WHY.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="ins-why-card">
                <div className="insurance-card-icon"><Icon size={20} /></div>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="page-simple">
        <div className="ins-final-banner">
          <div className="ins-final-text">
            <h3>Не відкладайте безпеку</h3>
            <p>Оформіть страховку онлайн та вирушайте в дорогу з упевненістю.</p>
            <button className="btn primary lg" onClick={scrollToTypes}>Оформити страховку</button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="page-simple">
          <form ref={formRef} className="form-section ins-form" onSubmit={submit} style={{ maxWidth: 480, margin: "0 auto" }}>
            <h4>Заявка: {selected === "consult" ? "Консультація" : INSURANCE_TYPES.find((t) => t.id === selected)?.title}</h4>
            <div className="form-grid">
              <div><label>Ім'я *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ваше ім'я" /></div>
              <div><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Коментар</label>
              <textarea rows={3} value={form.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Марка/модель авто, коли потрібен поліс тощо" />
            </div>
            <button className="btn primary lg" type="submit" disabled={submitting} style={{ width: "100%", marginTop: 14 }}>
              {submitting ? <><Loader2 size={16} className="spin-ic" /> Надсилаємо...</> : "Надіслати заявку"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function TradeInView({ toast }) {
  const [form, setForm] = useState({ brand: "", model: "", year: "", mileage: "", condition: "Добрий", phone: "", city: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.brand || !form.model || !form.phone) { toast("Заповніть марку, модель і телефон"); return; }
    toast("Заявку на Trade-IN надіслано, менеджер звʼяжеться з вами");
    setForm({ brand: "", model: "", year: "", mileage: "", condition: "Добрий", phone: "", city: "" });
  };
  return (
    <div className="page-simple narrow">
      <h2>Trade-IN</h2>
      <p className="intro-text">Здайте своє авто в рахунок покупки нового. Оцінюємо безкоштовно, готівку або доплату видаємо в день звернення.</p>

      <div className="tradein-steps">
        <div className="tradein-step"><span className="step-num">1</span><div><b>Залиште заявку</b><p>Вкажіть марку, модель і стан авто.</p></div></div>
        <div className="tradein-step"><span className="step-num">2</span><div><b>Оцінка</b><p>Наш спеціаліст огляне авто і назве ціну.</p></div></div>
        <div className="tradein-step"><span className="step-num">3</span><div><b>Обмін</b><p>Отримуєте нове авто з доплатою або без.</p></div></div>
      </div>

      <form className="listing-form" onSubmit={submit}>
        <div className="form-section">
          <h4>Дані вашого авто</h4>
          <div className="form-grid">
            <div><label>Марка *</label><input value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Наприклад, Toyota" /></div>
            <div><label>Модель *</label><input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Наприклад, Camry" /></div>
            <div><label>Рік випуску</label><input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2018" /></div>
            <div><label>Пробіг, км</label><input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} placeholder="90000" /></div>
            <div>
              <label>Стан авто</label>
              <select value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                <option>Відмінний</option><option>Добрий</option><option>Задовільний</option><option>Потребує ремонту</option>
              </select>
            </div>
            <div><label>Місто</label><select value={form.city} onChange={(e) => set("city", e.target.value)}><option value="">Оберіть місто</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
            <div><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
          </div>
        </div>
        <button className="btn primary lg" type="submit" style={{ width: "100%" }}>Надіслати заявку на оцінку</button>
      </form>
    </div>
  );
}

function ContactsView({ social, toast }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast("Вкажіть імʼя та телефон"); return; }
    toast("Повідомлення надіслано, ми звʼяжемось з вами");
    setForm({ name: "", phone: "", message: "" });
  };
  return (
    <div className="page-simple">
      <h2>Контакти</h2>
      <div className="contacts-grid">
        <div className="contacts-info">
          <div className="contact-row"><MapPin size={16} /> м. Львів, вул. Автомобільна, 12</div>
          <div className="contact-row"><Phone size={16} /> <a href="tel:+380631234567">+380 63 123 45 67</a></div>
          <div className="contact-row"><Send size={16} /> Пн–Сб: 9:00–19:00, Нд: вихідний</div>
          <div className="socials" style={{ marginTop: 14 }}>
            <SocialIcon href={social.tiktok} label="TikTok"><Music2 size={16} /></SocialIcon>
            <SocialIcon href={social.telegram} label="Telegram"><Send size={16} /></SocialIcon>
            <SocialIcon href={social.viber} label="Viber"><Phone size={16} /></SocialIcon>
            <SocialIcon href={social.whatsapp} label="WhatsApp"><MessageCircle size={16} /></SocialIcon>
          </div>
          <div className="map-placeholder"><MapPin size={22} /><span>Карта проїзду</span></div>
        </div>
        <form className="form-section contact-form" onSubmit={submit}>
          <h4>Написати нам</h4>
          <div><label>Ім'я *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ваше ім'я" /></div>
          <div style={{ marginTop: 12 }}><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
          <div style={{ marginTop: 12 }}><label>Повідомлення</label><textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Ваше запитання..." /></div>
          <button className="btn primary lg" type="submit" style={{ width: "100%", marginTop: 14 }}>Надіслати</button>
        </form>
      </div>
    </div>
  );
}

function VinCheckView({ toast }) {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const checkVin = async (e) => {
    e.preventDefault();
    const clean = vin.trim().toUpperCase();
    if (clean.length !== 17) { toast("VIN-код має містити рівно 17 символів"); return; }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${clean}?format=json`);
      const data = await res.json();
      const row = data?.Results?.[0];
      if (!row || (!row.Make && !row.Model)) {
        setError("Не вдалося розпізнати VIN. Перевірте правильність коду.");
      } else {
        setResult(row);
      }
    } catch (err) {
      setError("Сервіс перевірки тимчасово недоступний. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  };

  const fields = result ? [
    ["Марка", result.Make], ["Модель", result.Model], ["Рік випуску", result.ModelYear],
    ["Тип кузова", result.BodyClass], ["Двигун", result.EngineCylinders ? `${result.EngineCylinders} цил., ${result.DisplacementL || "?"} л` : "—"],
    ["Потужність", result.EngineHP ? `${result.EngineHP} к.с.` : "—"], ["Паливо", result.FuelTypePrimary],
    ["Привід", result.DriveType], ["Коробка передач", result.TransmissionStyle], ["Країна складання", result.PlantCountry],
    ["Виробник", result.Manufacturer], ["Кількість дверей", result.Doors]
  ].filter(([, v]) => v && v !== "Not Applicable") : [];

  // Ілюстративні дані для прев'ю повного паспорта — НЕ реальна історія цього конкретного авто.
  const demoPhotos = [
    "https://picsum.photos/seed/passport-auction/900/620",
    "https://picsum.photos/seed/passport-damage/900/620",
    "https://picsum.photos/seed/passport-repair/900/620",
    "https://picsum.photos/seed/passport-current/900/620"
  ];
  const demoChecks = [
    { ok: true, label: "Реальний пробіг" },
    { ok: false, label: "Було ДТП (2022)" },
    { ok: true, label: "Не перебуває у розшуку" },
    { ok: true, label: "Не перебуває у заставі" },
    { ok: false, label: "2 власники" },
    { ok: true, label: "Документи перевірені" }
  ];
  const demoTimeline = [
    { year: "2019", text: "Випущено із заводу" },
    { year: "2020", text: "Перша реєстрація" },
    { year: "2022", text: "ДТП" },
    { year: "2022", text: "Продаж через аукціон Copart" },
    { year: "2023", text: "Відновлення" },
    { year: "2024", text: "Імпорт в Україну" },
    { year: "2025", text: "Остання реєстрація" }
  ];
  const demoRoute = ["🇺🇸 США", "🇵🇱 Польща", "🇺🇦 Україна"];
  const whatWeCheck = ["VIN", "ДТП", "Фото", "Пробіг", "Реєстрації", "Власники", "Викрадення", "Арешти", "Застави", "Страхові випадки", "Історія аукціонів", "Комплектація", "Ринкова вартість"];
  const carLabel = result ? `${result.Make || ""} ${result.Model || ""}`.trim() : "";

  return (
    <div className="passport-page">
      <section className="passport-hero">
        <div className="passport-hero-inner">
          <div className="passport-hero-left">
            <p className="passport-eyebrow"><Fingerprint size={13} /> AVTOMIX AUTO PASSPORT</p>
            <h1>Паспорт автомобіля AvtoMix</h1>
            <p className="passport-sub">Дізнайтеся повну історію автомобіля ще до покупки. Один VIN — повний цифровий звіт.</p>
            <form className="passport-form" onSubmit={checkVin}>
              <input value={vin} onChange={(e) => setVin(e.target.value.toUpperCase())} placeholder="Введіть VIN або державний номер" maxLength={17} />
              <button className="btn primary lg" type="submit" disabled={loading}>
                {loading ? <><Loader2 size={16} className="spin-ic" /> Перевіряємо...</> : <><Search size={16} /> Перевірити автомобіль</>}
              </button>
            </form>
            <div className="passport-trust">
              <span><CheckCircle2 size={14} /> перевірка займає до 30 секунд</span>
              <span><CheckCircle2 size={14} /> офіційні джерела</span>
              <span><CheckCircle2 size={14} /> фото автомобіля</span>
            </div>
            {error && <div className="vin-error"><AlertTriangle size={16} /> {error}</div>}
          </div>
          <div className="passport-hero-right">
            {!result ? (
              <div className="passport-preview-card">
                <ScanLine size={34} />
                <p>Тут з'явиться цифровий паспорт автомобіля одразу після перевірки</p>
              </div>
            ) : (
              <div className="passport-score-card">
                <img src={demoPhotos[0]} alt={carLabel} />
                <div className="passport-score-overlay">
                  <div className="score-ring"><span>87</span><small>/100</small></div>
                  <div>
                    <b>{carLabel || "Автомобіль"}</b>
                    <p>Стан автомобіля · <span className="risk-low">Ризик низький</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {result && (
        <>
          <div className="passport-demo-banner">
            <Sparkles size={16} />
            <p>Нижче — приклад повного цифрового паспорта на демонстраційних даних. Реальні дані про ДТП, аукціони і фото з'являться після підключення офіційного постачальника історії авто (наприклад bidfax.info або Carfax). Розшифровка марки, моделі й двигуна вище — реальна, з відкритої бази NHTSA.</p>
          </div>

          <section className="passport-section">
            <h3>Загальна інформація <span className="real-tag">реальні дані</span></h3>
            <div className="specs-grid">
              {fields.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
            </div>
          </section>

          <section className="passport-section">
            <h3>Швидкий огляд <span className="demo-tag">приклад</span></h3>
            <div className="quickcheck-grid">
              {demoChecks.map((c, i) => (
                <div key={i} className={c.ok ? "quickcheck-card ok" : "quickcheck-card warn"}>
                  {c.ok ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="passport-section">
            <h3>Фото автомобіля <span className="demo-tag">приклад</span></h3>
            <div className="passport-gallery">
              {demoPhotos.map((p, i) => (
                <img key={i} src={p} alt="" onClick={() => { setGalleryIdx(i); setGalleryOpen(true); }} />
              ))}
            </div>
          </section>

          <section className="passport-section">
            <h3>Історія автомобіля <span className="demo-tag">приклад</span></h3>
            <div className="passport-timeline">
              {demoTimeline.map((t, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot" />
                  <div className="timeline-year">{t.year}</div>
                  <div className="timeline-text">{t.text}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="passport-section">
            <h3>Карта переміщення <span className="demo-tag">приклад</span></h3>
            <div className="passport-route">
              {demoRoute.map((r, i) => (
                <React.Fragment key={i}>
                  <span className="route-stop">{r}</span>
                  {i < demoRoute.length - 1 && <Navigation size={14} className="route-arrow" />}
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className="passport-section ai-block">
            <div className="ai-block-icon"><Sparkles size={22} /></div>
            <div>
              <h3>Висновок AvtoMix AI <span className="demo-tag">приклад</span></h3>
              <p>На основі знайдених даних автомобіль мав одну страхову подію у 2022 році. Пошкодження були локальними, критичних дефектів не виявлено. Ознак скручування пробігу немає. Документи відповідають історії реєстрацій. Загальна рекомендація — автомобіль вартий уваги, але перед покупкою бажано провести технічний огляд.</p>
              <div className="passport-actions">
                <button className="btn primary" onClick={() => toast("Повний PDF-звіт буде доступний після підключення офіційного постачальника даних історії авто")}><Download size={15} /> Завантажити PDF-звіт</button>
                <button className="btn outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast("Посилання скопійовано"); }}><Share2 size={15} /> Поділитися звітом</button>
                <button className="btn outline" onClick={() => toast("Додано в обране")}><Heart size={15} /> Додати до обраного</button>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="passport-section">
        <h3>Що перевіряє AvtoMix</h3>
        <div className="whatcheck-grid">
          {whatWeCheck.map((w) => <div key={w} className="whatcheck-item"><CheckCircle2 size={14} /> {w}</div>)}
        </div>
      </section>

      <div className="bidfax-highlight">
        <div className="bidfax-highlight-text">
          <h4><ShieldCheck size={16} style={{ verticalAlign: -2, marginRight: 6 }} />Фото пошкоджень і аукціонна історія</h4>
          <p>За цим VIN-кодом на bidfax.info можна безкоштовно побачити реальні фото авто з аукціону (Copart / IAAI), статус Salvage/Clean, дату та ціну продажу.</p>
        </div>
        <a
          className="btn primary lg bidfax-highlight-btn"
          href={vin.trim().length === 17 ? `https://bidfax.info/?s=${encodeURIComponent(vin.trim().toUpperCase())}` : "https://bidfax.info/"}
          target="_blank" rel="noreferrer"
        >
          <ExternalLink size={16} /> Перевірити на bidfax.info
        </a>
      </div>

      <p className="vin-disclaimer">Базова розшифровка виконується через відкриту базу даних NHTSA (США) і працює для більшості VIN, виданих у Північній Америці. Дані про ДТП, аукціони та фото авто bidfax.info надає окремо на своєму сайті. Розділи з позначкою «приклад» показують демонстраційні дані для ілюстрації майбутньої функції.</p>

      <section className="passport-cta">
        <h3>Перевірте автомобіль до покупки</h3>
        <p>Не ризикуйте своїми коштами. Отримайте повну історію автомобіля за кілька секунд.</p>
        <button className="btn primary lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Перевірити VIN</button>
      </section>

      {galleryOpen && (
        <div className="lightbox" onClick={() => setGalleryOpen(false)}>
          <img src={demoPhotos[galleryIdx]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox-close" onClick={() => setGalleryOpen(false)}><X size={22} /></button>
        </div>
      )}
    </div>
  );
}

function AuthView({ setView, toast }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!supabaseReady) {
    return (
      <div className="page-simple narrow">
        <h2>Реєстрація і вхід</h2>
        <div className="vin-error"><AlertTriangle size={16} /> База даних ще не підключена. Додайте VITE_SUPABASE_URL і VITE_SUPABASE_ANON_KEY в змінні середовища Vercel.</div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { toast("Вкажіть email і пароль"); return; }
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast("Вхід виконано");
        setView("home");
      } else {
        const { error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        toast("Реєстрація успішна! Перевірте пошту, якщо потрібне підтвердження");
        setView("home");
      }
    } catch (err) {
      toast(err.message === "Invalid login credentials" ? "Невірний email або пароль" : (err.message || "Сталася помилка"));
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      toast(err.message || "Не вдалося увійти");
    }
  };

  return (
    <div className="page-simple narrow">
      <h2>{mode === "login" ? "Вхід" : "Реєстрація"}</h2>
      <p className="intro-text">
        {mode === "login" ? "Увійдіть, щоб керувати оголошеннями." : "Створіть акаунт. За замовчуванням новий акаунт не має доступу до публікації — доступ надає адміністратор."}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420, marginBottom: 18 }}>
        <button type="button" className="oauth-btn" onClick={() => oauthLogin("google")}>
          Продовжити через Google
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 420, margin: "0 0 18px", color: "var(--muted)", fontSize: 13 }}>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        або
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <form className="form-section" onSubmit={submit} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Мінімум 6 символів" />
        </div>
        <button className="btn primary lg" type="submit" disabled={loading} style={{ width: "100%", marginTop: 18 }}>
          {loading ? <><Loader2 size={16} className="spin-ic" /> Зачекайте...</> : (mode === "login" ? "Увійти" : "Зареєструватися")}
        </button>
        <button type="button" className="link-btn" style={{ marginTop: 14 }} onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Ще немає акаунта? Зареєструватися" : "Вже є акаунт? Увійти"}
        </button>
      </form>
    </div>
  );
}

function AdminView({ cars, setCars, banner, setBanner, social, setSocial, toast, updateCar, deleteCar }) {
  const [tab, setTab] = useState("listings");
  const totalViews = cars.reduce((s, c) => s + c.views, 0);
  const published = cars.filter((c) => c.published).length;
  const pending = cars.length - published;

  const patchCar = (id, patch) => {
    if (supabaseReady && updateCar) { updateCar(id, patch); return; }
    setCars((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const removeCar = (id) => {
    if (supabaseReady && deleteCar) { deleteCar(id); return; }
    setCars((cs) => cs.filter((c) => c.id !== id));
    toast("Оголошення видалено");
  };

  return (
    <div className="page-simple">
      <h2><LayoutDashboard size={20} style={{ verticalAlign: -3, marginRight: 6 }} />Адмін-панель</h2>

      <div className="stat-cards">
        <div className="stat-card"><span>Всього оголошень</span><b>{cars.length}</b></div>
        <div className="stat-card"><span>Опубліковано</span><b>{published}</b></div>
        <div className="stat-card"><span>На модерації</span><b>{pending}</b></div>
        <div className="stat-card"><span>Сумарні перегляди</span><b>{fmtNum(totalViews)}</b></div>
      </div>

      <div className="admin-tabs">
        <button className={tab === "listings" ? "tab active" : "tab"} onClick={() => setTab("listings")}>Оголошення</button>
        <button className={tab === "banner" ? "tab active" : "tab"} onClick={() => setTab("banner")}>Банер</button>
        <button className={tab === "contacts" ? "tab active" : "tab"} onClick={() => setTab("contacts")}>Контакти та соцмережі</button>
      </div>

      {tab === "listings" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th></th><th>Авто</th><th>Ціна</th><th>Місто</th><th>Перегляди</th><th>Статус</th><th>Дії</th></tr></thead>
            <tbody>
              {cars.map((c) => (
                <tr key={c.id}>
                  <td><img className="admin-thumb" src={c.photos[0]} alt="" /></td>
                  <td>{c.brand} {c.model}<div className="muted-small">{c.year} р.</div></td>
                  <td>{fmtPrice(c.price)}</td>
                  <td>{c.city}</td>
                  <td>{c.views}</td>
                  <td><span className={c.published ? "status-tag pub" : "status-tag pend"}>{c.published ? "Опубліковано" : "На модерації"}</span></td>
                  <td className="admin-actions">
                    <button className="icon-btn small" title={c.published ? "Приховати" : "Опублікувати"} onClick={() => patchCar(c.id, { published: !c.published })}>
                      {c.published ? <Eye size={15} /> : <Check size={15} />}
                    </button>
                    <button className="icon-btn small" title="Видалити" onClick={() => removeCar(c.id)}><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "banner" && (
        <div className="admin-panel-block">
          {banner.slides.map((s, i) => (
            <div className="banner-edit-row" key={i}>
              <img src={s.image} alt="" />
              <div className="banner-edit-fields">
                <label>Заголовок слайду {i + 1}</label>
                <input value={s.title} onChange={(e) => {
                  const slides = [...banner.slides]; slides[i] = { ...s, title: e.target.value };
                  setBanner({ ...banner, slides });
                }} />
                <label>Підзаголовок</label>
                <input value={s.subtitle} onChange={(e) => {
                  const slides = [...banner.slides]; slides[i] = { ...s, subtitle: e.target.value };
                  setBanner({ ...banner, slides });
                }} />
              </div>
            </div>
          ))}
          <button className="btn outline" onClick={() => toast("Зміни банера збережено")}>Зберегти банер</button>
        </div>
      )}

      {tab === "contacts" && (
        <div className="admin-panel-block form-grid">
          <div><label>TikTok</label><input value={social.tiktok} onChange={(e) => setSocial({ ...social, tiktok: e.target.value })} /></div>
          <div><label>Telegram</label><input value={social.telegram} onChange={(e) => setSocial({ ...social, telegram: e.target.value })} /></div>
          <div><label>Viber</label><input value={social.viber} onChange={(e) => setSocial({ ...social, viber: e.target.value })} /></div>
          <div><label>WhatsApp</label><input value={social.whatsapp} onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })} /></div>
          <button className="btn outline" style={{ gridColumn: "1 / -1" }} onClick={() => toast("Контакти оновлено")}>Зберегти контакти</button>
        </div>
      )}
    </div>
  );
}

function Footer({ social, setView }) {
  return (
    <footer className="footer">
      <div className="footer-inner footer-grid">
        <div className="footer-col footer-brand">
          <div className="logo footer-logo"><span className="logo-word"><span className="logo-avto">Avto</span><span className="logo-mix">Mix</span></span></div>
          <p>Покупка та продаж автомобілів у Львові та Львівській області.</p>
          <div className="socials">
            <SocialIcon href={social.tiktok} label="TikTok"><Music2 size={16} /></SocialIcon>
            <SocialIcon href={social.telegram} label="Telegram"><Send size={16} /></SocialIcon>
            <SocialIcon href={social.viber} label="Viber"><Phone size={16} /></SocialIcon>
            <SocialIcon href={social.whatsapp} label="WhatsApp"><MessageCircle size={16} /></SocialIcon>
          </div>
        </div>

        <div className="footer-col">
          <h5>Навігація</h5>
          <button onClick={() => setView("catalog")}>Авто в наявності</button>
          <button onClick={() => setView("selection")}>Підбір авто</button>
          <button onClick={() => setView("tradein")}>Trade-In</button>
          <button onClick={() => setView("insurance")}>Страхування авто</button>
          <button onClick={() => setView("vin")}>VIN-перевірка</button>
          <button onClick={() => setView("contacts")}>Контакти</button>
        </div>

        <div className="footer-col">
          <h5>Клієнтам</h5>
          <button onClick={() => setView("contacts")}>Як це працює?</button>
          <button onClick={() => setView("contacts")}>Питання та відповіді</button>
          <button onClick={() => setView("contacts")}>Угода користувача</button>
          <button onClick={() => setView("contacts")}>Політика конфіденційності</button>
        </div>

        <div className="footer-col">
          <h5>Зв'яжіться з нами</h5>
          <p className="footer-contact-line"><Phone size={14} /> +38 (093) 123 45 67</p>
          <p className="footer-contact-line"><Send size={14} /> info@avtomix.lviv.ua</p>
          <p className="footer-contact-line"><MapPin size={14} /> м. Львів, вул. Зелена, 147</p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} AvtoMix. Усі права захищені.</p>
    </footer>
  );
}

export default function AvtoMixApp() {
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cars, setCars] = useState(supabaseReady ? [] : seedCars());
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [toast, showToast] = useToast();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [social, setSocial] = useState({
    tiktok: "https://www.tiktok.com/@avtomix",
    telegram: "https://t.me/avtomix_lviv",
    viber: "viber://chat?number=%2B380631234567",
    whatsapp: "https://wa.me/380631234567"
  });
  const [banner, setBanner] = useState({
    slides: [
      { image: "/hero-slide-1.png", eyebrow: "AVTO MIX · ЛЬВІВ ТА ЛЬВІВСЬКА ОБЛАСТЬ", title: "Знайдіть своє наступне авто",
        subtitle: "Переглядайте актуальні оголошення, користуйтеся VIN-перевіркою та знаходьте автомобілі у Львові й Львівській області.",
        bgSize: "auto 100%", bgPosition: "right", bgColor: "#0D0F14",
        primaryLabel: "Переглянути автомобілі", primaryView: "home", secondaryLabel: "VIN-перевірка", secondaryView: "vin" },
      { image: "/hero-slide-2.png", eyebrow: "AVTO MIX · ПРОДАЖ АВТО", title: "Продайте авто швидко та без зайвих клопотів",
        subtitle: "Додайте оголошення за кілька хвилин, а покупці знайдуть вас. Перед покупкою перевіряйте автомобіль за VIN.",
        bgSize: "auto 100%", bgPosition: "right", bgColor: "#0D0F14",
        primaryLabel: "Подати оголошення", primaryView: "submit", secondaryLabel: "Як це працює?", secondaryView: "contacts" },
      { image: "/insurance-banner.png", title: "Всі види автострахування", subtitle: "Автоцивілка, Зелена карта, ДЦВ — оформимо поліс за кілька хвилин, без відвідування офісу",
        hideEyebrow: true,
        overlay: "linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.05))",
        primaryLabel: "Отримати поліс", primaryView: "insurance", secondaryLabel: "Переглянути умови", secondaryView: "insurance" }
    ]
  });

  // --- Supabase <-> app data mapping ---
  const dbToCar = (row) => ({
    id: row.id, ownerId: row.owner_id, brand: row.brand, model: row.model, trim: row.trim, year: row.year,
    vin: row.vin || "—", engineVolume: row.engine_volume, power: row.power, fuel: row.fuel, trans: row.trans,
    drive: row.drive, color: row.color, mileage: row.mileage, owners: row.owners, body: row.body,
    desc: row.description, price: row.price, city: row.city, phone: row.phone, telegram: row.telegram,
    viber: row.viber, whatsapp: row.whatsapp, tiktokUrl: row.tiktok_url, photos: row.photos || [],
    published: row.published, views: row.views || 0, createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now()
  });
  const carToDb = (data) => ({
    brand: data.brand, model: data.model, trim: data.trim || "", year: data.year, vin: data.vin || null,
    engine_volume: data.engineVolume, power: data.power, fuel: data.fuel, trans: data.trans, drive: data.drive,
    color: data.color || "", mileage: data.mileage, owners: data.owners, body: data.body,
    description: data.desc, price: data.price, city: data.city, phone: data.phone,
    telegram: data.telegram || null, viber: data.viber || null, whatsapp: data.whatsapp || null,
    tiktok_url: data.tiktokUrl || null, photos: data.photos || [], published: data.published ?? false, views: data.views ?? 0
  });

  const fetchCars = async () => {
    if (!supabaseReady) return;
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (error) { showToast(error.message); return; }
    setCars((data || []).map(dbToCar));
  };

  // Auth session tracking
  useEffect(() => {
    if (!supabaseReady) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => setSession(sess));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Load own profile (contains role) whenever the logged-in user changes
  useEffect(() => {
    if (!supabaseReady) return;
    if (!session?.user?.id) { setProfile(null); return; }
    supabase.from("profiles").select("*").eq("id", session.user.id).single()
      .then(({ data }) => setProfile(data || null));
  }, [session?.user?.id]);

  // Load cars whenever auth state changes (RLS visibility can depend on role)
  useEffect(() => { fetchCars(); }, [session?.user?.id]);

  const onLogout = async () => {
    if (!supabaseReady) return;
    await supabase.auth.signOut();
    showToast("Ви вийшли з акаунта");
    setView("home");
  };

  const query = filters.search;
  const setQuery = (v) => setFilters((f) => ({ ...f, search: v }));

  const toggleFav = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const toggleCmp = (id) => setCompareList((c) => {
    if (c.includes(id)) return c.filter((x) => x !== id);
    if (c.length >= 3) { showToast("Можна порівняти не більше 3 авто"); return c; }
    return [...c, id];
  });
  const openCar = (id) => { setSelectedId(id); setView("detail"); window.scrollTo(0, 0); };

  const registerView = (id) => {
    setCars((cs) => cs.map((c) => (c.id === id ? { ...c, views: c.views + 1 } : c)));
    if (supabaseReady) {
      const car = cars.find((c) => c.id === id);
      if (car) supabase.from("cars").update({ views: (car.views || 0) + 1 }).eq("id", id).then(() => {});
    }
  };

  const addCar = async (data) => {
    if (supabaseReady) {
      const payload = { ...carToDb(data), owner_id: session?.user?.id || null };
      const { error } = await supabase.from("cars").insert(payload);
      if (error) throw error;
      await fetchCars();
    } else {
      setCars((cs) => [{ id: `car-${Date.now()}`, vin: data.vin || "—", createdAt: Date.now(), ...data }, ...cs]);
    }
  };

  const updateCar = async (id, patch) => {
    if (supabaseReady) {
      const dbPatch = {};
      Object.keys(patch).forEach((k) => {
        if (k === "published") dbPatch.published = patch.published;
        else if (k === "views") dbPatch.views = patch.views;
      });
      const { error } = await supabase.from("cars").update(dbPatch).eq("id", id);
      if (error) { showToast(error.message); return; }
      await fetchCars();
    } else {
      setCars((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    }
  };

  const deleteCar = async (id) => {
    if (supabaseReady) {
      const { error } = await supabase.from("cars").delete().eq("id", id);
      if (error) { showToast(error.message); return; }
      await fetchCars();
      showToast("Оголошення видалено");
    } else {
      setCars((cs) => cs.filter((c) => c.id !== id));
      showToast("Оголошення видалено");
    }
  };

  const selectedCar = cars.find((c) => c.id === selectedId);

  useEffect(() => { setMenuOpen(false); setFiltersOpen(false); }, [view]);

  return (
    <div className="app-root" data-theme={theme}>
      <style>{`
        .app-root {
          --font-display: 'Oswald', sans-serif;
          --font-body: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --radius: 8px;
          font-family: var(--font-body);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .app-root[data-theme="light"] {
          --bg: #FFFFFF; --bg-alt: #F4F4F4; --surface: #FFFFFF; --surface-2: #FAFAFA;
          --text: #0A0A0A; --text-muted: #63625E; --accent: #D60000; --accent-text: #FFFFFF;
          --border: #E4E3DF; --header-bg: #0A0A0A; --header-text: #F4F4F4;
        }
        .app-root[data-theme="dark"] {
          --bg: #0D0F14; --bg-alt: #171A20; --surface: #171A20; --surface-2: #1D2028;
          --text: #F4F3F0; --text-muted: #96959D; --accent: #FF6B1A; --accent-2: #FF8A42; --accent-text: #0D0F14;
          --border: #262A33; --header-bg: #0D0F14; --header-text: #F4F3F0;
        }
        .app-root[data-theme="dark"] .btn.primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          box-shadow: 0 6px 22px rgba(255, 107, 26, 0.3);
          transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.15s ease;
        }
        .app-root[data-theme="dark"] .btn.primary:hover { box-shadow: 0 8px 30px rgba(255, 107, 26, 0.55); opacity: 1; filter: brightness(1.06); transform: translateY(-1px); }
        .app-root[data-theme="dark"] .btn.outline { transition: box-shadow 0.2s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease; }
        .app-root[data-theme="dark"] .btn.outline:hover { box-shadow: 0 0 0 1px var(--accent), 0 8px 24px rgba(255, 107, 26, 0.22); transform: translateY(-1px); }
        .app-root[data-theme="dark"] .price,
        .app-root[data-theme="dark"] .big-price {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .app-root[data-theme="dark"] .step-num,
        .app-root[data-theme="dark"] .dot-badge,
        .app-root[data-theme="dark"] .pending-tag,
        .app-root[data-theme="dark"] .badge {
          background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: var(--accent-text);
        }
        .app-root[data-theme="dark"] .car-card:hover { box-shadow: 0 0 0 1px var(--accent), 0 12px 28px rgba(0,0,0,0.4); }
        .app-root[data-theme="dark"] .fav-btn.active,
        .app-root[data-theme="dark"] .fav-btn.static.active { color: var(--accent-2); }
        .app-root { background: var(--bg); color: var(--text); }
        .app-root * { box-sizing: border-box; }
        .accent-text { color: var(--accent); }
        a { color: inherit; text-decoration: none; }
        h1,h2,h3,h4 { font-family: var(--font-display); font-weight: 600; letter-spacing: 0.2px; margin: 0; }
        p { margin: 0; }
        .desktop-only { display: flex; }
        .mobile-only { display: none; }
        @media (max-width: 860px) { .desktop-only { display: none !important; } .mobile-only { display: inline-flex !important; } }

        .btn { font-family: var(--font-body); font-weight: 600; font-size: 14px; padding: 10px 18px; border-radius: var(--radius); border: 1.5px solid transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; transition: transform .12s ease, opacity .12s ease; }
        .btn:active { transform: scale(0.97); }
        .btn.primary { background: var(--accent); color: var(--accent-text); }
        .btn.primary:hover { opacity: 0.88; }
        .btn.outline { background: transparent; border-color: var(--border); color: var(--text); }
        .btn.outline:hover { border-color: var(--accent); color: var(--accent); }
        .btn.ghost { background: transparent; color: var(--header-text); border-color: transparent; }
        .btn.ghost:hover { opacity: 0.75; }
        .btn.lg { padding: 13px 24px; font-size: 15px; }
        .oauth-btn { width: 100%; padding: 13px 20px; font-size: 15px; font-weight: 600; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
        .oauth-btn:hover { background: var(--bg-alt); }
        .btn.block { width: 100%; justify-content: center; }
        .btn.tiktok { background: var(--bg-alt); border-color: var(--accent); color: var(--accent); }
        .link-btn { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; padding: 0; }
        .icon-btn { background: none; border: 1px solid var(--border); border-radius: var(--radius); width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text); }
        .icon-btn.small { width: 30px; height: 30px; }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); }

        .header { position: sticky; top: 0; z-index: 40; background: var(--header-bg); color: var(--header-text); }
        .header-top { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .header-top-inner { max-width: 1280px; margin: 0 auto; padding: 6px 24px; display: flex; justify-content: flex-end; align-items: center; font-size: 12px; color: #b8b8b8; }
        .socials { display: flex; gap: 10px; }
        .social-ic { width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; color: #d8d8d8; }
        .social-ic:hover { border-color: var(--accent); color: var(--accent); }
        .header-main { max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; gap: 20px; }
        .logo { display: flex; align-items: center; gap: 9px; cursor: pointer; }
        .logo-word { font-family: var(--font-display); font-weight: 700; font-size: 32px; letter-spacing: 0.3px; }
        .logo-avto { color: var(--text); }
        .logo-mix { color: var(--accent); }
        .footer-logo .logo-word { font-size: 34px; }
        .main-nav { gap: 4px; margin-left: 8px; }
        .nav-link { background: none; border: none; color: #c9c9c9; font-weight: 600; font-size: 14.5px; padding: 9px 10px; border-radius: var(--radius); cursor: pointer; display: inline-flex; align-items: center; white-space: nowrap; }
        .nav-link:hover { color: var(--header-text); }
        .nav-link.active { color: var(--accent); background: rgba(255,255,255,0.05); }
        .badge { background: var(--accent); color: var(--accent-text); font-size: 10px; border-radius: 20px; padding: 1px 6px; margin-left: 5px; }
        .header-icon { position: relative; background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); color: var(--header-text); }
        .header-icon:hover { border-color: var(--accent); color: var(--accent); }
        .dot-badge { position: absolute; top: -5px; right: -5px; background: var(--accent); color: var(--accent-text); font-size: 10px; font-weight: 700; border-radius: 20px; min-width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; padding: 0 3px; }
        .mobile-menu-sep { height: 1px; background: rgba(255,255,255,0.1); margin: 6px 0; }
        .search-wrap { flex: 1; max-width: 320px; margin-left: auto; position: relative; }
        .search-wrap input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: var(--header-text); border-radius: var(--radius); padding: 9px 12px 9px 34px; font-size: 13px; }
        .search-wrap input::placeholder { color: #9a9a9a; }
        .search-ic { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #9a9a9a; }
        .header-actions { display: flex; align-items: center; gap: 10px; }
        .theme-toggle { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); color: var(--header-text); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .mobile-menu { background: var(--header-bg); border-top: 1px solid rgba(255,255,255,0.1); padding: 14px 20px 20px; display: flex; flex-direction: column; gap: 6px; }
        .mobile-menu .nav-link { text-align: left; }
        @media (max-width: 640px) {
          .header-top-inner { padding: 6px 14px; }
          .tagline { display: none; }
          .header-main { padding: 10px 14px; gap: 10px; }
          .logo-word { font-size: 19px; }
          .header-actions { gap: 6px; }
          .header-icon, .theme-toggle { width: 34px; height: 34px; }
          .btn.primary { padding: 9px 12px; font-size: 12.5px; }
          .icon-btn.mobile-only { width: 34px; height: 34px; }
        }
        @media (max-width: 380px) {
          .btn.primary span.btn-label-full { display: none; }
        }

        .hero { position: relative; overflow: hidden; }
        .hero-slide { height: 460px; position: relative; display: flex; align-items: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: -12px; background-size: cover; background-position: center; animation: kenburns 14s ease-in-out infinite alternate; will-change: transform; }
        .hero-overlay { position: absolute; inset: 0; }
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }
        @media (prefers-reduced-motion: reduce) { .hero-bg { animation: none; } }
        .hero-beam { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.10), transparent 60%); }
        .hero-content { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%; color: #fff; }
        .hero-eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
        .hero-title { font-size: 52px; line-height: 1.05; max-width: 640px; }
        .hero-sub { font-size: 17px; margin-top: 14px; max-width: 480px; opacity: 0.92; }
        .hero-actions { display: flex; gap: 12px; margin-top: 26px; }
        .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .hero-arrow.left { left: 20px; } .hero-arrow.right { right: 20px; }
        .hero-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
        .dot { width: 22px; height: 3px; background: rgba(255,255,255,0.4); border: none; cursor: pointer; }
        .dot.active { background: var(--accent); }
        @media (max-width: 640px) {
          .hero-slide { height: 380px; }
          .hero-eyebrow { font-size: 10.5px; margin-bottom: 10px; }
          .hero-title { font-size: 30px; max-width: 100%; }
          .hero-sub { font-size: 14px; max-width: 100%; }
          .hero-actions { flex-direction: column; align-items: stretch; gap: 10px; margin-top: 18px; }
          .hero-actions .btn { justify-content: center; }
          .hero-arrow { width: 32px; height: 32px; }
          .hero-arrow.left { left: 10px; } .hero-arrow.right { right: 10px; }
        }

        .catalog-wrap { max-width: 1280px; margin: 0 auto; padding: 32px 24px 64px 16px; display: flex; gap: 18px; align-items: flex-start; }
        .catalog-main { flex: 1; min-width: 0; }
        .catalog-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; flex-wrap: wrap; gap: 12px; }
        .catalog-head h2 { font-size: 24px; }
        .count { color: var(--text-muted); font-size: 13px; white-space: nowrap; }
        .catalog-controls { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .sort-wrap { display: flex; align-items: center; gap: 6px; background: var(--surface); border: 1.5px solid var(--accent); border-radius: 8px; padding: 0 10px; color: var(--accent); }
        .sort-wrap select { border: none; background: none; padding: 8px 4px; width: auto; color: var(--accent); font-weight: 600; }
        .view-toggle { display: flex; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
        .vt-btn { background: var(--surface); border: none; color: var(--text-muted); width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .vt-btn.active { background: var(--accent); color: var(--accent-text); }
        .filters { width: 260px; flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: sticky; top: 100px; }
        .filters-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .filters-head h3 { font-size: 15.5px; display: flex; align-items: center; gap: 6px; }
        .f-group { margin-bottom: 12px; }
        .f-group.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .f-group label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.4px; }
        .f-group input, .f-group select, select, input, textarea { width: 100%; background: var(--bg-alt); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 9px 11px; font-size: 14px; font-family: var(--font-body); }
        .filters-toggle { display: none; }
        @media (max-width: 860px) {
          .catalog-wrap { flex-direction: column; }
          .filters-toggle { display: inline-flex; align-items: center; gap: 6px; }
          .filters-drawer { display: none; width: 100%; }
          .filters-drawer.open { display: block; }
          .filters { width: 100%; position: static; }
        }

        .cars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 1000px) { .cars-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .cars-grid { grid-template-columns: 1fr; } }
        .cars-grid.list-mode { display: flex; flex-direction: column; gap: 12px; }
        .car-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: pointer; transition: border-color .15s ease, transform .15s ease; }
        .car-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .car-card.list { display: flex; flex-direction: row; align-items: stretch; }
        .car-card.list:hover { transform: none; }
        .car-card.list .car-card-img { width: 220px; height: auto; flex-shrink: 0; }
        .car-card.list .car-card-body { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 600px) { .car-card.list { flex-direction: column; } .car-card.list .car-card-img { width: 100%; height: 170px; } }
        .car-card-img { position: relative; height: 170px; }
        .car-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .fav-btn { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .fav-btn.active { color: var(--accent); }
        .fav-btn.static { position: static; background: var(--bg-alt); color: var(--text); border: 1px solid var(--border); }
        .fav-btn.static.active { color: var(--accent); border-color: var(--accent); }
        .pending-tag { position: absolute; left: 10px; top: 10px; background: var(--accent); color: var(--accent-text); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
        .car-card-body { padding: 14px 16px 16px; }
        .car-card-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
        .car-card-top h3 { font-size: 16px; }
        .price { font-family: var(--font-mono); font-weight: 500; color: var(--accent); font-size: 15px; white-space: nowrap; }
        .trim { color: var(--text-muted); font-size: 12.5px; margin-top: 2px; }
        .specs-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; font-size: 12px; color: var(--text-muted); }
        .specs-row span { display: flex; align-items: center; gap: 4px; }
        .car-card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 12.5px; border-top: 1px solid var(--border); padding-top: 10px; gap: 8px; flex-wrap: wrap; }
        .owner-tag { background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 20px; white-space: nowrap; }
        .city { display: flex; align-items: center; gap: 4px; color: var(--text-muted); }
        .cmp-check { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); margin-top: 10px; cursor: pointer; }
        .load-more { display: flex; margin: 26px auto 0; }
        .empty-state { padding: 60px 20px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border); border-radius: 12px; }

        .page-simple { max-width: 1280px; margin: 0 auto; padding: 36px 24px 64px; }
        .page-simple.narrow { max-width: 780px; }
        .page-simple h2 { font-size: 26px; margin-bottom: 22px; }

        .detail-wrap { max-width: 1280px; margin: 0 auto; padding: 24px 24px 64px; }
        .back-link { margin-bottom: 16px; }
        .detail-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 28px; align-items: start; }
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
        .gallery-main { position: relative; border-radius: 12px; overflow: hidden; height: 440px; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-thumbs { display: flex; gap: 8px; margin-top: 10px; overflow-x: auto; }
        .thumb { width: 76px; height: 56px; object-fit: cover; border-radius: 6px; cursor: pointer; opacity: 0.55; flex-shrink: 0; border: 2px solid transparent; }
        .thumb.active { opacity: 1; border-color: var(--accent); }
        .gallery-expand-btn { position: absolute; bottom: 14px; right: 14px; background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .photo-lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .photo-lightbox img { max-width: 90vw; max-height: 88vh; object-fit: contain; cursor: default; }
        .lightbox-close { position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .lightbox-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .lightbox-arrow.left { left: 18px; } .lightbox-arrow.right { right: 18px; }
        .lightbox-counter { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); color: #fff; background: rgba(255,255,255,0.12); padding: 5px 14px; border-radius: 20px; font-size: 13px; }
        @media (max-width: 600px) {
          .lightbox-arrow { width: 38px; height: 38px; }
          .lightbox-arrow.left { left: 6px; } .lightbox-arrow.right { right: 6px; }
        }
        .detail-section { margin-top: 26px; }
        .detail-section h3 { font-size: 17px; margin-bottom: 12px; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; }
        @media (max-width: 480px) { .specs-grid { grid-template-columns: 1fr; } }
        .specs-grid div { display: flex; justify-content: space-between; font-size: 13.5px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
        .specs-grid span { color: var(--text-muted); }
        .desc-text { font-size: 14.5px; line-height: 1.7; color: var(--text); }
        .price-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 22px; position: sticky; top: 96px; }
        .price-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
        .price-card-top h1 { font-size: 21px; }
        .big-price { font-family: var(--font-mono); font-size: 30px; font-weight: 500; color: var(--accent); margin: 14px 0 8px; }
        .meta-row { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--text-muted); margin-bottom: 18px; }
        .dot-sep { margin: 0 4px; }
        .contact-buttons { display: flex; flex-direction: column; gap: 9px; }
        .share-link { margin-top: 16px; }

        .compare-table-wrap { overflow-x: auto; }
        .compare-table { width: 100%; border-collapse: collapse; min-width: 560px; }
        .compare-table th, .compare-table td { border: 1px solid var(--border); padding: 10px 14px; font-size: 13.5px; text-align: center; }
        .compare-table th img { width: 100px; height: 66px; object-fit: cover; border-radius: 6px; margin-bottom: 6px; }
        .row-label { text-align: left !important; color: var(--text-muted); background: var(--surface-2); }

        .listing-form { display: flex; flex-direction: column; gap: 22px; }
        .access-gate { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 34px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; color: var(--text-muted); }
        .access-gate p { max-width: 380px; font-size: 14px; line-height: 1.6; }
        .form-section { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .form-section h4 { font-size: 14px; margin-bottom: 14px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.4px; }
        .form-section label { display: block; font-size: 12px; color: var(--text-muted); margin: 0 0 5px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
        .form-grid > div { display: flex; flex-direction: column; }
        textarea { resize: vertical; font-family: var(--font-body); }

        .intro-text { color: var(--text-muted); font-size: 14.5px; margin-bottom: 22px; max-width: 620px; line-height: 1.6; }
        .vin-form { display: flex; gap: 10px; flex-wrap: wrap; }
        .vin-input { flex: 1; min-width: 220px; font-family: var(--font-mono); letter-spacing: 1px; text-transform: uppercase; }
        .bidfax-highlight { margin-top: 20px; padding: 18px 20px; border-radius: 12px; background: var(--surface); border: 1px solid var(--accent); display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; }
        .features-row-wrap { padding-top: 28px; padding-bottom: 6px; }
        .features-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; }
        .feature-card { display: flex; gap: 14px; align-items: flex-start; padding: 20px; border-radius: 14px; background: var(--surface); border: 1px solid var(--border); }
        .feature-card.clickable { cursor: pointer; transition: transform 0.15s, border-color 0.15s; }
        .feature-card.clickable:hover { transform: translateY(-3px); border-color: var(--accent); }
        .feature-icon { width: 42px; height: 42px; border-radius: 10px; background: color-mix(in srgb, var(--accent) 16%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .feature-card h4 { margin: 0 0 2px; font-size: 16px; }
        .feature-tag { font-size: 12px; color: var(--text-muted); }
        .feature-card p { margin: 4px 0 0; font-size: 13px; color: var(--text-muted); line-height: 1.5; }
        .promo-banners-wrap { padding-top: 8px; }
        .promo-banners { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .promo-card { border-radius: 16px; padding: 36px 32px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
        .promo-dark { background: linear-gradient(135deg, #14171d, #0d0f14); border: 1px solid var(--border); }
        .promo-accent { background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, #14171d), #0d0f14); border: 1px solid var(--accent); }
        .promo-icon { width: 56px; height: 56px; border-radius: 14px; background: color-mix(in srgb, var(--accent) 20%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .promo-card h3 { margin: 0; font-size: 22px; }
        .promo-card p { margin: 6px 0 18px; color: var(--text-muted); font-size: 14px; max-width: 360px; }
        @media (max-width: 720px) {
          .promo-banners { grid-template-columns: 1fr; }
        }
        .insurance-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; margin-top: 24px; }
        .insurance-card { position: relative; border: 1px solid var(--border); border-radius: 16px; padding: 26px 20px 22px; background: var(--surface); display: flex; flex-direction: column; gap: 8px; transition: transform 0.2s ease, border-color 0.2s ease; }
        .insurance-card:hover { transform: translateY(-4px); border-color: var(--accent); }
        .insurance-card.active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
        .insurance-card-tag { position: absolute; top: 14px; right: 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: var(--accent); }
        .insurance-card-icon { width: 48px; height: 48px; border-radius: 12px; background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .insurance-card h4 { margin: 0; font-size: 17px; }
        .insurance-card p { margin: 0 0 10px; font-size: 13px; color: var(--text-muted); line-height: 1.5; flex: 1; }

        .insurance-page { padding-bottom: 20px; }
        .breadcrumb-wrap { padding-top: 18px; padding-bottom: 0; }
        .breadcrumb { font-size: 12.5px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
        .breadcrumb span:last-child { color: var(--text); }
        .section-title { font-size: 26px; margin: 0 0 4px; }

        .ins-hero { position: relative; overflow: hidden; border-radius: 20px; margin: 20px 24px 0; }
        .ins-hero-bg { position: absolute; inset: -10px; background-size: cover; background-position: center 30%; animation: kenburns 16s ease-in-out infinite alternate; }
        .ins-hero-overlay { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(6,7,10,0.92) 30%, rgba(6,7,10,0.55) 60%, rgba(6,7,10,0.25)); }
        .ins-hero-inner { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 40px; padding: 48px 40px; flex-wrap: wrap; color: #fff; }
        .ins-hero-text { max-width: 560px; }
        .ins-hero-title { font-size: 44px; line-height: 1.1; margin: 10px 0 16px; font-weight: 700; }
        .ins-hero-sub { font-size: 16px; color: #d8d8dc; margin-bottom: 26px; max-width: 480px; }
        .ins-glass-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(14px); border-radius: 16px; padding: 22px 26px; display: flex; flex-direction: column; gap: 16px; min-width: 240px; }
        .ins-glass-row { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: #fff; }
        .ins-glass-row svg { color: var(--accent); flex-shrink: 0; }

        .ins-steps { display: flex; align-items: flex-start; justify-content: center; gap: 6px; margin-top: 28px; flex-wrap: wrap; }
        .ins-step { display: flex; flex-direction: column; align-items: center; text-align: center; width: 200px; gap: 12px; }
        .ins-step-icon { position: relative; width: 64px; height: 64px; border-radius: 50%; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); display: flex; align-items: center; justify-content: center; }
        .ins-step-num { position: absolute; top: -4px; right: -4px; width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: var(--accent-text); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .ins-step p { margin: 0; font-size: 14px; color: var(--text-muted); }
        .ins-step-arrow { color: var(--text-muted); margin-top: 22px; }
        @media (max-width: 720px) { .ins-step-arrow { display: none; } }

        .ins-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-top: 24px; }
        .ins-why-card { border-radius: 16px; padding: 22px 20px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); backdrop-filter: blur(6px); }
        .ins-why-card h4 { margin: 4px 0; font-size: 15.5px; }
        .ins-why-card p { margin: 0; font-size: 13px; color: var(--text-muted); line-height: 1.5; }

        .ins-final-banner { position: relative; border-radius: 20px; overflow: hidden; padding: 54px 40px; background: radial-gradient(circle at 15% 30%, rgba(255,107,26,0.22), transparent 55%), radial-gradient(circle at 85% 70%, rgba(255,107,26,0.14), transparent 50%), #0a0b0e; }
        .ins-final-text h3 { font-size: 28px; margin: 0 0 10px; }
        .ins-final-text p { color: var(--text-muted); margin: 0 0 22px; max-width: 460px; }

        @media (max-width: 900px) {
          .ins-hero { margin: 14px 16px 0; }
          .ins-hero-inner { padding: 44px 0; }
          .ins-hero-title { font-size: 30px; }
          .ins-glass-card { width: 100%; }
        }
        .insurance-banner { position: relative; overflow: hidden; border-radius: 16px; margin: 24px 0; padding: 28px 26px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; background: linear-gradient(120deg, #0f2e22, #163f2c 55%, #1f5c3a); color: #fff; }
        .insurance-banner::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12), transparent 60%); pointer-events: none; }
        .insurance-banner-icon { width: 54px; height: 54px; border-radius: 14px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .insurance-banner-text { flex: 1; min-width: 240px; position: relative; }
        .insurance-banner-text .tag { font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; opacity: 0.75; font-weight: 700; }
        .insurance-banner-text h3 { margin: 4px 0 6px; font-size: 22px; }
        .insurance-banner-text p { margin: 0; font-size: 14px; opacity: 0.85; max-width: 480px; }
        .insurance-banner-actions { display: flex; gap: 10px; flex-wrap: wrap; position: relative; }
        .insurance-banner-actions .btn.ghost-light { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.35); }
        .insurance-banner-actions .btn.ghost-light:hover { background: rgba(255,255,255,0.18); }
        @media (max-width: 640px) {
          .insurance-banner { padding: 22px 18px; }
          .insurance-banner-actions { width: 100%; }
          .insurance-banner-actions .btn { flex: 1; justify-content: center; }
        }
        .bidfax-highlight-text { flex: 1; min-width: 220px; }
        .bidfax-highlight-text h4 { margin: 0 0 6px; font-size: 15px; }
        .bidfax-highlight-text p { margin: 0; color: var(--text-muted); font-size: 13px; line-height: 1.5; }
        .bidfax-highlight-btn { white-space: nowrap; }
        @media (max-width: 560px) {
          .bidfax-highlight { flex-direction: column; align-items: stretch; }
          .bidfax-highlight-btn { width: 100%; justify-content: center; }
        }
        .vin-error { display: flex; align-items: center; gap: 8px; color: var(--accent); background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; margin-top: 16px; font-size: 13.5px; }
        .vin-history-cta { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
        .vin-history-cta p { color: var(--text-muted); font-size: 13px; margin-bottom: 10px; }
        .vin-disclaimer { color: var(--text-muted); font-size: 12px; margin-top: 22px; line-height: 1.6; }
        .vin-inline-link { font-size: 11px; margin-left: 6px; font-weight: 600; }
        .spin-ic { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .tradein-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 26px; }
        @media (max-width: 640px) { .tradein-steps { grid-template-columns: 1fr; } }
        .tradein-step { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; }
        .tradein-step b { font-size: 13.5px; }
        .tradein-step p { font-size: 12.5px; color: var(--text-muted); margin-top: 4px; }
        .step-num { background: var(--accent); color: var(--accent-text); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-weight: 600; font-size: 13px; flex-shrink: 0; }
        .contacts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        @media (max-width: 760px) { .contacts-grid { grid-template-columns: 1fr; } }
        .contacts-info { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .contact-row { display: flex; align-items: center; gap: 10px; font-size: 15px; margin-bottom: 12px; color: var(--text); }
        .contact-row a { color: var(--accent); font-weight: 600; }
        .map-placeholder { margin-top: 18px; height: 160px; border-radius: 10px; background: var(--bg-alt); border: 1px dashed var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--text-muted); font-size: 12.5px; }
        .contact-form div { display: flex; flex-direction: column; }

        .dropzone { border: 2px dashed var(--border); border-radius: 10px; padding: 30px 16px; text-align: center; cursor: pointer; color: var(--text-muted); }
        .dropzone.drag { border-color: var(--accent); color: var(--accent); }
        .dropzone p { margin: 10px 0 4px; font-size: 14px; color: var(--text); }
        .dropzone .hint { font-size: 11.5px; }
        .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; margin-top: 14px; }
        .photo-thumb-wrap { position: relative; height: 70px; border-radius: 6px; overflow: hidden; }
        .photo-thumb-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .main-photo-tag { position: absolute; bottom: 3px; left: 3px; background: var(--accent); color: var(--accent-text); font-size: 9px; padding: 1px 5px; border-radius: 3px; }
        .photo-remove { position: absolute; top: 3px; right: 3px; background: rgba(0,0,0,0.6); border: none; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .stat-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 26px; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .stat-card span { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
        .stat-card b { font-family: var(--font-mono); font-size: 22px; font-weight: 500; }
        .admin-tabs { display: flex; gap: 6px; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
        .tab { background: none; border: none; padding: 10px 16px; font-size: 13.5px; font-weight: 600; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; }
        .tab.active { color: var(--accent); border-color: var(--accent); }
        .admin-table-wrap { overflow-x: auto; }
        .admin-table { width: 100%; border-collapse: collapse; min-width: 640px; }
        .admin-table th { text-align: left; font-size: 11.5px; text-transform: uppercase; color: var(--text-muted); padding: 8px 12px; border-bottom: 1px solid var(--border); }
        .admin-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); font-size: 13.5px; vertical-align: middle; }
        .admin-thumb { width: 56px; height: 40px; object-fit: cover; border-radius: 5px; }
        .muted-small { color: var(--text-muted); font-size: 11.5px; }
        .status-tag { font-size: 11px; padding: 3px 8px; border-radius: 20px; font-weight: 600; }
        .status-tag.pub { background: rgba(60,180,90,0.15); color: #3ecb6a; }
        .status-tag.pend { background: rgba(255,150,0,0.15); color: var(--accent); }
        .admin-actions { display: flex; gap: 6px; }
        .admin-panel-block { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .banner-edit-row { display: flex; gap: 16px; margin-bottom: 20px; align-items: center; }
        .banner-edit-row img { width: 140px; height: 84px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .banner-edit-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .banner-edit-fields label { font-size: 11px; color: var(--text-muted); }

        .footer { background: var(--header-bg); color: var(--header-text); margin-top: auto; padding: 48px 24px 24px; border-top: 1px solid var(--border); }
        .footer-inner { max-width: 1280px; margin: 0 auto; }
        .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; text-align: left; }
        .footer-logo { justify-content: flex-start; }
        .footer-brand p { max-width: 320px; }
        .footer-col h5 { font-size: 14px; margin: 0 0 14px; color: var(--text); }
        .footer-col { display: flex; flex-direction: column; gap: 10px; }
        .footer-col button { background: none; border: none; padding: 0; text-align: left; color: #b8b8b8; font-size: 13.5px; cursor: pointer; }
        .footer-col button:hover { color: var(--accent); }
        .footer-contact-line { display: flex; align-items: center; gap: 8px; margin: 0; }
        .catalog-intro { color: var(--text-muted); font-size: 13.5px; margin-top: 4px; max-width: 560px; }
        .footer p { color: #b8b8b8; font-size: 13.5px; max-width: 440px; margin: 10px 0; }
        .copyright { font-size: 11.5px; color: #7a7a7a; margin: 32px auto 0; max-width: 1280px; padding-top: 20px; border-top: 1px solid var(--border); }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; text-align: center; }
          .footer-brand p { max-width: none; }
          .footer-logo { justify-content: center; }
          .footer-col { align-items: center; }
        }

        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--bg); padding: 12px 22px; border-radius: 30px; font-size: 13.5px; font-weight: 600; z-index: 100; box-shadow: 0 6px 18px rgba(0,0,0,0.25); }

        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ===== AvtoMix Auto Passport (always-dark premium page) ===== */
        .passport-page {
          --pp-bg: #08080B; --pp-card: rgba(255,255,255,0.045); --pp-card-solid: #17171C;
          --pp-border: rgba(255,255,255,0.09); --pp-text: #F5F5F3; --pp-muted: #9A9AA5; --pp-accent: #FF6B1A;
          background: var(--pp-bg); color: var(--pp-text); margin: -1px 0 0; padding-bottom: 60px;
        }
        .passport-hero { position: relative; padding: 56px 24px 40px; background: radial-gradient(ellipse at 80% 0%, rgba(255,107,26,0.14), transparent 55%), var(--pp-bg); }
        .passport-hero-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; }
        @media (max-width: 900px) { .passport-hero-inner { grid-template-columns: 1fr; gap: 32px; } }
        .passport-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 1.5px; color: var(--pp-accent); margin-bottom: 16px; }
        .passport-hero-left h1 { font-family: var(--font-display); font-size: 42px; line-height: 1.08; margin: 0 0 14px; color: #fff; }
        .passport-sub { color: var(--pp-muted); font-size: 15.5px; line-height: 1.6; max-width: 460px; margin-bottom: 26px; }
        .passport-form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
        .passport-form input { flex: 1; min-width: 220px; background: var(--pp-card); border: 1px solid var(--pp-border); color: #fff; border-radius: 10px; padding: 14px 16px; font-family: var(--font-mono); letter-spacing: 1px; font-size: 14px; }
        .passport-page .btn.primary { background: linear-gradient(135deg, var(--pp-accent), #FFA24D); color: #0A0A0A; box-shadow: 0 8px 24px rgba(255,107,26,0.3); }
        .passport-page .btn.outline { background: var(--pp-card); border-color: var(--pp-border); color: var(--pp-text); }
        .passport-page .btn.outline:hover { border-color: var(--pp-accent); color: var(--pp-accent); }
        .passport-trust { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12.5px; color: var(--pp-muted); }
        .passport-trust span { display: flex; align-items: center; gap: 5px; }
        .passport-trust svg { color: var(--pp-accent); }
        .passport-hero-right { display: flex; align-items: center; justify-content: center; }
        .passport-preview-card { width: 100%; aspect-ratio: 4/3; border: 1px dashed var(--pp-border); border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; color: var(--pp-muted); background: var(--pp-card); text-align: center; padding: 30px; }
        .passport-preview-card svg { color: var(--pp-accent); }
        .passport-preview-card p { max-width: 260px; font-size: 13.5px; }
        .passport-score-card { position: relative; width: 100%; border-radius: 20px; overflow: hidden; border: 1px solid var(--pp-border); backdrop-filter: blur(20px); }
        .passport-score-card img { width: 100%; height: 320px; object-fit: cover; display: block; }
        .passport-score-overlay { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(0deg, rgba(8,8,11,0.95), rgba(8,8,11,0.2)); padding: 20px; display: flex; align-items: center; gap: 16px; }
        .score-ring { width: 66px; height: 66px; border-radius: 50%; background: conic-gradient(var(--pp-accent) 87%, rgba(255,255,255,0.12) 0); display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
        .score-ring::before { content: ""; position: absolute; inset: 5px; border-radius: 50%; background: var(--pp-card-solid); }
        .score-ring span { position: relative; font-family: var(--font-display); font-weight: 700; font-size: 19px; color: #fff; }
        .score-ring small { position: relative; font-size: 9px; color: var(--pp-muted); margin-left: 1px; }
        .passport-score-overlay b { font-size: 16px; color: #fff; }
        .passport-score-overlay p { margin: 2px 0 0; font-size: 12px; color: var(--pp-muted); }
        .risk-low { color: #3ecb6a; font-weight: 600; }
        .passport-demo-banner { max-width: 1280px; margin: 0 auto 8px; padding: 0 24px; display: flex; gap: 10px; align-items: flex-start; }
        .passport-demo-banner svg { color: var(--pp-accent); flex-shrink: 0; margin-top: 2px; }
        .passport-demo-banner p { font-size: 12.5px; color: var(--pp-muted); line-height: 1.6; margin: 0; }
        .passport-section { max-width: 1280px; margin: 40px auto 0; padding: 0 24px; }
        .passport-section h3 { font-family: var(--font-display); font-size: 19px; color: #fff; display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
        .real-tag { font-size: 10.5px; font-weight: 700; background: rgba(62,203,106,0.15); color: #3ecb6a; padding: 3px 9px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px; }
        .demo-tag { font-size: 10.5px; font-weight: 700; background: rgba(255,107,26,0.15); color: var(--pp-accent); padding: 3px 9px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px; }
        .passport-section .specs-grid div { border-bottom-color: var(--pp-border); }
        .passport-section .specs-grid span { color: var(--pp-muted); }
        .passport-section .specs-grid b { color: #fff; }
        .quickcheck-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
        .quickcheck-card { display: flex; align-items: center; gap: 10px; background: var(--pp-card); border: 1px solid var(--pp-border); border-radius: 12px; padding: 14px 16px; font-size: 13.5px; }
        .quickcheck-card.ok svg { color: #3ecb6a; }
        .quickcheck-card.warn svg { color: var(--pp-accent); }
        .passport-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
        .passport-gallery img { width: 100%; height: 140px; object-fit: cover; border-radius: 12px; cursor: pointer; border: 1px solid var(--pp-border); transition: transform .15s ease; }
        .passport-gallery img:hover { transform: scale(1.02); }
        .passport-timeline { display: flex; flex-direction: column; gap: 0; border-left: 2px solid var(--pp-border); padding-left: 22px; margin-left: 6px; }
        .timeline-item { position: relative; padding-bottom: 22px; display: flex; gap: 14px; align-items: baseline; }
        .timeline-dot { position: absolute; left: -28px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--pp-accent); box-shadow: 0 0 0 4px rgba(255,107,26,0.18); }
        .timeline-year { font-family: var(--font-mono); font-size: 13px; color: var(--pp-accent); font-weight: 600; min-width: 42px; }
        .timeline-text { font-size: 13.5px; color: var(--pp-text); }
        .passport-route { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; background: var(--pp-card); border: 1px solid var(--pp-border); border-radius: 14px; padding: 20px; }
        .route-stop { font-size: 14px; font-weight: 600; background: rgba(255,255,255,0.06); padding: 8px 14px; border-radius: 20px; }
        .route-arrow { color: var(--pp-accent); }
        .ai-block { display: flex; gap: 18px; align-items: flex-start; background: linear-gradient(135deg, rgba(255,107,26,0.08), rgba(255,255,255,0.02)); border: 1px solid var(--pp-border); border-radius: 18px; padding: 26px; }
        .ai-block-icon { width: 46px; height: 46px; border-radius: 12px; background: rgba(255,107,26,0.15); color: var(--pp-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ai-block p { color: var(--pp-muted); font-size: 14px; line-height: 1.7; max-width: 720px; margin: 10px 0 18px; }
        .passport-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .whatcheck-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
        .whatcheck-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--pp-text); background: var(--pp-card); border: 1px solid var(--pp-border); border-radius: 10px; padding: 11px 14px; }
        .whatcheck-item svg { color: var(--pp-accent); flex-shrink: 0; }
        .passport-page .bidfax-highlight { max-width: 1280px; margin: 40px auto 0; }
        .passport-page .vin-disclaimer { max-width: 1280px; margin: 20px auto 0; padding: 0 24px; }
        .passport-cta { max-width: 1280px; margin: 48px auto 0; padding: 44px 32px; text-align: center; border-radius: 22px; background: radial-gradient(ellipse at 50% 0%, rgba(255,107,26,0.18), transparent 60%), #0F0F13; border: 1px solid var(--pp-border); }
        .passport-cta h3 { font-family: var(--font-display); font-size: 26px; color: #fff; margin-bottom: 8px; }
        .passport-cta p { color: var(--pp-muted); font-size: 14.5px; margin-bottom: 22px; }
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 30px; cursor: zoom-out; }
        .lightbox img { max-width: 90vw; max-height: 85vh; border-radius: 10px; object-fit: contain; }
        .lightbox-close { position: absolute; top: 20px; right: 24px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        @media (max-width: 640px) {
          .passport-hero { padding: 40px 16px 30px; }
          .passport-hero-left h1 { font-size: 30px; }
          .passport-section { margin-top: 30px; padding: 0 16px; }
          .passport-demo-banner { padding: 0 16px; }
        }
      `}</style>

      <Header theme={theme} setTheme={setTheme} view={view} setView={setView} query={query} setQuery={setQuery}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen} social={social} favCount={favorites.length} cmpCount={compareList.length} toast={showToast}
        session={session} profile={profile} onLogout={onLogout} />

      {view === "home" && (
        <>
          <HeroBanner banner={banner} setView={setView} />
          <FeaturesRow setView={setView} />
          <CatalogView cars={cars} filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav}
            compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
          <PromoBanners setView={setView} />
        </>
      )}

      {view === "catalog" && (
        <CatalogView cars={cars} filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav}
          compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
          heading="Авто в наявності" />
      )}

      {view === "selection" && <SelectionRequestView toast={showToast} />}

      {view === "tradein" && <TradeInView toast={showToast} />}

      {view === "insurance" && <InsuranceView toast={showToast} />}

      {view === "contacts" && <ContactsView social={social} toast={showToast} />}

      {view === "vin" && <VinCheckView toast={showToast} />}

      {view === "detail" && selectedCar && (
        <CarDetailView car={selectedCar} cars={cars} favorites={favorites} toggleFav={toggleFav} openCar={openCar}
          setView={setView} toast={showToast} onView={registerView} />
      )}

      {view === "favorites" && (
        <FavoritesView cars={cars} favorites={favorites} toggleFav={toggleFav} compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} />
      )}

      {view === "compare" && <CompareView cars={cars} compareList={compareList} toggleCmp={toggleCmp} />}

      {view === "auth" && <AuthView setView={setView} toast={showToast} />}

      {view === "submit" && <SubmitListingView addCar={addCar} setView={setView} toast={showToast} session={session} profile={profile} />}

      {view === "admin" && (
        (!supabaseReady || profile?.role === "admin") ? (
          <AdminView cars={cars} setCars={setCars} banner={banner} setBanner={setBanner} social={social} setSocial={setSocial}
            toast={showToast} updateCar={updateCar} deleteCar={deleteCar} />
        ) : (
          <div className="page-simple narrow">
            <div className="access-gate">
              <Lock size={22} />
              <p>Адмін-панель доступна лише адміністратору сайту.</p>
            </div>
          </div>
        )
      )}

      <Footer social={social} setView={setView} />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
