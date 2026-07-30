import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Menu, X, Search, Heart, Share2, Phone, Send, MessageCircle, Music2,
  Sun, Moon, ChevronLeft, ChevronRight, SlidersHorizontal, Eye, Trash2,
  Pencil, Check, Plus, Upload, MapPin, GitCompareArrows, LayoutDashboard,
  Gauge, Fuel, Cog, Palette, User, ImageIcon
} from "lucide-react";

const BRANDS = ["Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Toyota", "Skoda", "Renault", "Nissan", "Honda"];
const MODELS_BY_BRAND = {
  "Audi": ["Q5", "A4", "A6"], "BMW": ["3 Series", "X5", "5 Series"],
  "Mercedes-Benz": ["C-Class", "GLC", "E-Class"], "Volkswagen": ["Passat", "Tiguan", "Golf"],
  "Toyota": ["Camry", "RAV4", "Corolla"], "Skoda": ["Octavia", "Superb", "Kodiaq"],
  "Renault": ["Megane", "Duster", "Kadjar"], "Nissan": ["Qashqai", "X-Trail", "Leaf"],
  "Honda": ["CR-V", "Civic", "Accord"]
};
const CITIES = ["Львів", "Київ", "Одеса", "Харків", "Тернопіль", "Івано-Франківськ", "Луцьк", "Рівне", "Дрогобич"];
const FUEL_TYPES = ["бензин", "дизель", "газ", "гібрид", "електро"];
const TRANSMISSIONS = ["механіка", "автомат", "робот", "варіатор"];
const DRIVES = ["передній", "задній", "повний"];
const BODY_TYPES = ["седан", "хетчбек", "універсал", "позашляховик", "купе", "мінівен"];
const COLORS = ["чорний", "білий", "сірий", "сірібний", "синій", "червоний", "коричневий"];

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

function Header({ theme, setTheme, view, setView, query, setQuery, menuOpen, setMenuOpen, social, favCount, cmpCount, toast }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-inner">
          <span className="tagline">Купівля та продаж авто по всій Україні</span>
          <div className="socials">
            <SocialIcon href={social.tiktok} label="TikTok"><Music2 size={15} /></SocialIcon>
            <SocialIcon href={social.telegram} label="Telegram"><Send size={15} /></SocialIcon>
            <SocialIcon href={social.viber} label="Viber"><Phone size={15} /></SocialIcon>
            <SocialIcon href={social.whatsapp} label="WhatsApp"><MessageCircle size={15} /></SocialIcon>
          </div>
        </div>
      </div>
      <div className="header-main">
        <button className="icon-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="logo" onClick={() => setView("home")} role="button" tabIndex={0}>
          <img src="/logo.png" alt="Avto Mix" className="logo-img" />
        </div>

        <nav className="main-nav desktop-only">
          <button className={view === "home" ? "nav-link active" : "nav-link"} onClick={() => setView("home")}>Головна</button>
          <button className={view === "catalog" ? "nav-link active" : "nav-link"} onClick={() => setView("catalog")}>Авто в наявності</button>
          <button className={view === "selection" ? "nav-link active" : "nav-link"} onClick={() => setView("selection")}>🔍 Підбір авто</button>
          <button className={view === "tradein" ? "nav-link active" : "nav-link"} onClick={() => setView("tradein")}>Trade-IN</button>
          <button className={view === "contacts" ? "nav-link active" : "nav-link"} onClick={() => setView("contacts")}>Контакти</button>
        </nav>

        <div className="search-wrap desktop-only">
          <Search size={16} className="search-ic" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Марка, модель або місто..." />
        </div>

        <div className="header-actions">
          <button className="icon-btn header-icon" onClick={() => setView("favorites")} aria-label="Обране">
            <Heart size={17} />
            {favCount > 0 && <span className="dot-badge">{favCount}</span>}
          </button>
          <button className="icon-btn header-icon" onClick={() => setView("compare")} aria-label="Порівняння">
            <GitCompareArrows size={17} />
            {cmpCount > 0 && <span className="dot-badge">{cmpCount}</span>}
          </button>
          <button className="icon-btn header-icon desktop-only" onClick={() => setView("admin")} aria-label="Адмін-панель">
            <LayoutDashboard size={17} />
          </button>
          <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Перемкнути тему">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="btn ghost desktop-only" onClick={() => toast("Демо-версія: вхід буде доступний після підключення бекенду")}>Увійти</button>
          <button className="btn primary" onClick={() => setView("submit")}>Подати оголошення</button>
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
          <button className="nav-link" onClick={() => { setView("contacts"); setMenuOpen(false); }}>Контакти</button>
          <div className="mobile-menu-sep" />
          <button className="nav-link" onClick={() => { setView("favorites"); setMenuOpen(false); }}>Обране ({favCount})</button>
          <button className="nav-link" onClick={() => { setView("compare"); setMenuOpen(false); }}>Порівняння ({cmpCount})</button>
          <button className="nav-link" onClick={() => { setView("admin"); setMenuOpen(false); }}>Адмін-панель</button>
          <button className="btn ghost" onClick={() => toast("Демо-версія: вхід буде доступний після підключення бекенду")}>Увійти</button>
        </div>
      )}
    </header>
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
      <div className="hero-slide" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.18)), url(${slide.image})` }}>
        <div className="hero-beam" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow">AVTOMIX · перевірені авто з усієї України</p>
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-sub">{slide.subtitle}</p>
          <div className="hero-actions">
            <button className="btn primary lg" onClick={() => setView("home")}>Переглянути каталог</button>
            <button className="btn outline lg" onClick={() => setView("submit")}>Подати оголошення</button>
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

function CarCard({ car, isFav, onToggleFav, isCmp, onToggleCmp, onOpen }) {
  return (
    <article className="car-card" onClick={() => onOpen(car.id)}>
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
  const filtered = useMemo(() => {
    return cars.filter((c) => {
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
  }, [cars, filters]);

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
          <span className="count">{filtered.length} оголошень</span>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">Нічого не знайдено. Спробуйте змінити фільтри.</div>
        ) : (
          <>
            <div className="cars-grid">
              {filtered.slice(0, visible).map((c) => (
                <CarCard key={c.id} car={c} isFav={favorites.includes(c.id)} onToggleFav={toggleFav}
                  isCmp={compareList.includes(c.id)} onToggleCmp={toggleCmp} onOpen={openCar} />
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
  useEffect(() => { onView(car.id); setPhotoIdx(0); }, [car.id]);

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
            <img src={car.photos[photoIdx]} alt={`${car.brand} ${car.model}`} />
            <button className="hero-arrow left" onClick={() => setPhotoIdx((photoIdx - 1 + car.photos.length) % car.photos.length)}><ChevronLeft size={18} /></button>
            <button className="hero-arrow right" onClick={() => setPhotoIdx((photoIdx + 1) % car.photos.length)}><ChevronRight size={18} /></button>
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
              <div><span>VIN-код</span><b>{car.vin}</b></div>
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
              <a className="btn outline block" href={car.telegram} target="_blank" rel="noreferrer"><Send size={16} /> Telegram</a>
              <a className="btn outline block" href={car.viber} target="_blank" rel="noreferrer"><Phone size={16} /> Viber</a>
              <a className="btn outline block" href={car.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
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
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls].slice(0, 30));
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
              <img src={p} alt="" />
              {i === 0 && <span className="main-photo-tag">Головне</span>}
              <button type="button" className="photo-remove" onClick={() => setPhotos((ph) => ph.filter((_, idx) => idx !== i))} aria-label="Видалити фото"><X size={13} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubmitListingView({ addCar, setView, toast }) {
  const [form, setForm] = useState({
    brand: "", model: "", trim: "", year: "", vin: "", engineVolume: "", power: "", fuel: FUEL_TYPES[0],
    trans: TRANSMISSIONS[0], drive: DRIVES[0], color: "", mileage: "", owners: "1", body: BODY_TYPES[0],
    desc: "", price: "", city: "", phone: "", telegram: "", viber: "", whatsapp: "", tiktokUrl: ""
  });
  const [photos, setPhotos] = useState([]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const required = ["brand", "model", "year", "engineVolume", "power", "mileage", "desc", "price", "city", "phone"];
  const missing = required.filter((k) => !String(form[k]).trim());

  const submit = (e) => {
    e.preventDefault();
    if (missing.length > 0) { toast("Заповніть усі обов'язкові поля"); return; }
    addCar({
      ...form,
      year: Number(form.year), engineVolume: Number(form.engineVolume), power: Number(form.power),
      mileage: Number(form.mileage), owners: Number(form.owners) || 1, price: Number(form.price),
      photos: photos.length > 0 ? photos : makePhotos(`new-${Date.now()}`, 3),
      published: false, views: 0
    });
    toast("Оголошення надіслано на модерацію");
    setView("home");
  };

  return (
    <div className="page-simple narrow">
      <h2>Подати оголошення</h2>
      <form className="listing-form" onSubmit={submit}>
        <div className="form-section">
          <h4>Основна інформація</h4>
          <div className="form-grid">
            <div><label>Марка *</label><input list="brands" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Наприклад, Audi" /></div>
            <div><label>Модель *</label><input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Наприклад, Q5" /></div>
            <div><label>Комплектація</label><input value={form.trim} onChange={(e) => set("trim", e.target.value)} placeholder="Prestige" /></div>
            <div><label>Рік випуску *</label><input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2019" /></div>
            <div><label>VIN-код</label><input value={form.vin} onChange={(e) => set("vin", e.target.value)} placeholder="Необов'язково" /></div>
            <div><label>Тип кузова</label><select value={form.body} onChange={(e) => set("body", e.target.value)}>{BODY_TYPES.map((b) => <option key={b}>{b}</option>)}</select></div>
          </div>
          <datalist id="brands">{BRANDS.map((b) => <option key={b} value={b} />)}</datalist>
        </div>

        <div className="form-section">
          <h4>Технічні характеристики</h4>
          <div className="form-grid">
            <div><label>Об'єм двигуна, л *</label><input type="number" step="0.1" value={form.engineVolume} onChange={(e) => set("engineVolume", e.target.value)} placeholder="2.0" /></div>
            <div><label>Потужність, к.с. *</label><input type="number" value={form.power} onChange={(e) => set("power", e.target.value)} placeholder="190" /></div>
            <div><label>Тип пального</label><select value={form.fuel} onChange={(e) => set("fuel", e.target.value)}>{FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}</select></div>
            <div><label>Коробка передач</label><select value={form.trans} onChange={(e) => set("trans", e.target.value)}>{TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label>Привід</label><select value={form.drive} onChange={(e) => set("drive", e.target.value)}>{DRIVES.map((d) => <option key={d}>{d}</option>)}</select></div>
            <div><label>Колір</label><input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Чорний" /></div>
            <div><label>Пробіг, км *</label><input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} placeholder="84000" /></div>
            <div><label>Кількість власників</label><input type="number" value={form.owners} onChange={(e) => set("owners", e.target.value)} placeholder="1" /></div>
          </div>
        </div>

        <div className="form-section">
          <h4>Опис і ціна</h4>
          <label>Опис *</label>
          <textarea rows={4} value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Розкажіть про стан авто, комплектацію, історію обслуговування..." />
          <div className="form-grid" style={{ marginTop: 12 }}>
            <div><label>Ціна, $ *</label><input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="24900" /></div>
            <div><label>Місто *</label><select value={form.city} onChange={(e) => set("city", e.target.value)}><option value="">Оберіть місто</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          </div>
        </div>

        <div className="form-section">
          <h4>Контакти</h4>
          <div className="form-grid">
            <div><label>Телефон *</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+380 63 123 45 67" /></div>
            <div><label>Telegram</label><input value={form.telegram} onChange={(e) => set("telegram", e.target.value)} placeholder="https://t.me/..." /></div>
            <div><label>Viber</label><input value={form.viber} onChange={(e) => set("viber", e.target.value)} placeholder="Посилання або номер" /></div>
            <div><label>WhatsApp</label><input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="https://wa.me/..." /></div>
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

        <button className="btn primary lg" type="submit" style={{ width: "100%" }}>Надіслати на модерацію</button>
      </form>
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

function AdminView({ cars, setCars, banner, setBanner, social, setSocial, toast }) {
  const [tab, setTab] = useState("listings");
  const totalViews = cars.reduce((s, c) => s + c.views, 0);
  const published = cars.filter((c) => c.published).length;
  const pending = cars.length - published;

  const patchCar = (id, patch) => setCars((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const removeCar = (id) => { setCars((cs) => cs.filter((c) => c.id !== id)); toast("Оголошення видалено"); };

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

function Footer({ social }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="logo footer-logo"><img src="/logo.png" alt="Avto Mix" className="logo-img footer-logo-img" /></div>
        <p>Купуйте та продавайте автомобілі легко — тисячі перевірених оголошень по всій Україні.</p>
        <div className="socials">
          <SocialIcon href={social.tiktok} label="TikTok"><Music2 size={16} /></SocialIcon>
          <SocialIcon href={social.telegram} label="Telegram"><Send size={16} /></SocialIcon>
          <SocialIcon href={social.viber} label="Viber"><Phone size={16} /></SocialIcon>
          <SocialIcon href={social.whatsapp} label="WhatsApp"><MessageCircle size={16} /></SocialIcon>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Avto Mix. Демонстраційний прототип.</p>
      </div>
    </footer>
  );
}

export default function AvtoMixApp() {
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cars, setCars] = useState(seedCars);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [toast, showToast] = useToast();
  const [social, setSocial] = useState({
    tiktok: "https://www.tiktok.com/@avtomix",
    telegram: "https://t.me/avtomix_lviv",
    viber: "viber://chat?number=%2B380631234567",
    whatsapp: "https://wa.me/380631234567"
  });
  const [banner, setBanner] = useState({
    slides: [
      { image: "https://picsum.photos/seed/avtomix-hero1/1600/800", title: "Avto Mix", subtitle: "Купуйте та продавайте автомобілі легко" },
      { image: "https://picsum.photos/seed/avtomix-hero2/1600/800", title: "Перевірені автомобілі", subtitle: "Детальні характеристики та реальні фото кожного авто" },
      { image: "https://picsum.photos/seed/avtomix-hero3/1600/800", title: "Подайте оголошення за хвилини", subtitle: "До 30 фото, зручна форма, публікація після модерації" }
    ]
  });

  const query = filters.search;
  const setQuery = (v) => setFilters((f) => ({ ...f, search: v }));

  const toggleFav = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const toggleCmp = (id) => setCompareList((c) => {
    if (c.includes(id)) return c.filter((x) => x !== id);
    if (c.length >= 3) { showToast("Можна порівняти не більше 3 авто"); return c; }
    return [...c, id];
  });
  const openCar = (id) => { setSelectedId(id); setView("detail"); window.scrollTo(0, 0); };
  const registerView = (id) => setCars((cs) => cs.map((c) => (c.id === id ? { ...c, views: c.views + 1 } : c)));
  const addCar = (data) => setCars((cs) => [{ id: `car-${Date.now()}`, vin: data.vin || "—", createdAt: Date.now(), ...data }, ...cs]);

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
          --bg: #0A0A0A; --bg-alt: #1C1C1E; --surface: #1C1C1E; --surface-2: #222224;
          --text: #F2F2F0; --text-muted: #9A9A9E; --accent: #FF7A00; --accent-text: #0A0A0A;
          --border: #2E2E31; --header-bg: #141415; --header-text: #F2F2F0;
        }
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
        .btn.block { width: 100%; justify-content: center; }
        .btn.tiktok { background: var(--bg-alt); border-color: var(--accent); color: var(--accent); }
        .link-btn { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; padding: 0; }
        .icon-btn { background: none; border: 1px solid var(--border); border-radius: var(--radius); width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text); }
        .icon-btn.small { width: 30px; height: 30px; }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); }

        .header { position: sticky; top: 0; z-index: 40; background: var(--header-bg); color: var(--header-text); }
        .header-top { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .header-top-inner { max-width: 1280px; margin: 0 auto; padding: 6px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #b8b8b8; }
        .socials { display: flex; gap: 10px; }
        .social-ic { width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; color: #d8d8d8; }
        .social-ic:hover { border-color: var(--accent); color: var(--accent); }
        .header-main { max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; gap: 20px; }
        .logo { display: flex; align-items: center; gap: 9px; cursor: pointer; }
        .logo-img { height: 46px; width: auto; display: block; }
        .main-nav { gap: 4px; margin-left: 8px; }
        .nav-link { background: none; border: none; color: #c9c9c9; font-weight: 600; font-size: 13.5px; padding: 9px 10px; border-radius: var(--radius); cursor: pointer; display: inline-flex; align-items: center; white-space: nowrap; }
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

        .hero { position: relative; overflow: hidden; }
        .hero-slide { height: 460px; background-size: cover; background-position: center; display: flex; align-items: center; position: relative; }
        .hero-beam { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.10), transparent 60%); }
        .hero-content { position: relative; max-width: 1280px; margin: 0 auto; padding: 0 24px; width: 100%; color: #fff; }
        .hero-eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
        .hero-title { font-size: 52px; line-height: 1.05; max-width: 640px; }
        .hero-sub { font-size: 17px; margin-top: 14px; max-width: 480px; opacity: 0.92; }
        .hero-actions { display: flex; gap: 12px; margin-top: 26px; }
        .hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .hero-arrow.left { left: 20px; } .hero-arrow.right { right: 20px; }
        .hero-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
        .dot { width: 22px; height: 3px; background: rgba(255,255,255,0.4); border: none; cursor: pointer; }
        .dot.active { background: var(--accent); }

        .catalog-wrap { max-width: 1280px; margin: 0 auto; padding: 32px 24px 64px; display: flex; gap: 28px; align-items: flex-start; }
        .catalog-main { flex: 1; min-width: 0; }
        .catalog-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
        .catalog-head h2 { font-size: 24px; }
        .count { color: var(--text-muted); font-size: 13px; }
        .filters { width: 260px; flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 18px; position: sticky; top: 100px; }
        .filters-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .filters-head h3 { font-size: 14px; display: flex; align-items: center; gap: 6px; }
        .f-group { margin-bottom: 12px; }
        .f-group.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .f-group label { display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.4px; }
        .f-group input, .f-group select, select, input, textarea { width: 100%; background: var(--bg-alt); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 8px 10px; font-size: 13px; font-family: var(--font-body); }
        .filters-toggle { display: none; }
        @media (max-width: 860px) {
          .catalog-wrap { flex-direction: column; }
          .filters-toggle { display: inline-flex; align-items: center; gap: 6px; }
          .filters-drawer { display: none; width: 100%; }
          .filters-drawer.open { display: block; }
          .filters { width: 100%; position: static; }
        }

        .cars-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 18px; }
        .car-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; cursor: pointer; transition: border-color .15s ease, transform .15s ease; }
        .car-card:hover { border-color: var(--accent); transform: translateY(-2px); }
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
        .car-card-bottom { display: flex; justify-content: space-between; margin-top: 10px; font-size: 12.5px; border-top: 1px solid var(--border); padding-top: 10px; }
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
        .detail-section { margin-top: 26px; }
        .detail-section h3 { font-size: 17px; margin-bottom: 12px; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; }
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
        .form-section { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .form-section h4 { font-size: 14px; margin-bottom: 14px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.4px; }
        .form-section label { display: block; font-size: 12px; color: var(--text-muted); margin: 0 0 5px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
        .form-grid > div { display: flex; flex-direction: column; }
        textarea { resize: vertical; font-family: var(--font-body); }

        .intro-text { color: var(--text-muted); font-size: 14.5px; margin-bottom: 22px; max-width: 620px; line-height: 1.6; }
        .tradein-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 26px; }
        @media (max-width: 640px) { .tradein-steps { grid-template-columns: 1fr; } }
        .tradein-step { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; display: flex; gap: 12px; align-items: flex-start; }
        .tradein-step b { font-size: 13.5px; }
        .tradein-step p { font-size: 12.5px; color: var(--text-muted); margin-top: 4px; }
        .step-num { background: var(--accent); color: var(--accent-text); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-weight: 600; font-size: 13px; flex-shrink: 0; }
        .contacts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        @media (max-width: 760px) { .contacts-grid { grid-template-columns: 1fr; } }
        .contacts-info { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
        .contact-row { display: flex; align-items: center; gap: 10px; font-size: 14px; margin-bottom: 12px; color: var(--text); }
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

        .footer { background: var(--header-bg); color: var(--header-text); margin-top: auto; padding: 40px 24px 24px; }
        .footer-inner { max-width: 1280px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .footer-logo { justify-content: center; }
        .footer-logo-img { height: 58px; }
        .catalog-intro { color: var(--text-muted); font-size: 13.5px; margin-top: 4px; max-width: 560px; }
        .footer p { color: #b8b8b8; font-size: 13.5px; max-width: 440px; }
        .copyright { font-size: 11.5px; color: #7a7a7a; margin-top: 12px; }

        .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--bg); padding: 12px 22px; border-radius: 30px; font-size: 13.5px; font-weight: 600; z-index: 100; box-shadow: 0 6px 18px rgba(0,0,0,0.25); }

        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <Header theme={theme} setTheme={setTheme} view={view} setView={setView} query={query} setQuery={setQuery}
        menuOpen={menuOpen} setMenuOpen={setMenuOpen} social={social} favCount={favorites.length} cmpCount={compareList.length} toast={showToast} />

      {view === "home" && (
        <>
          <HeroBanner banner={banner} setView={setView} />
          <CatalogView cars={cars} filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav}
            compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
        </>
      )}

      {view === "catalog" && (
        <CatalogView cars={cars} filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav}
          compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
          heading="Авто в наявності" />
      )}

      {view === "selection" && (
        <CatalogView cars={cars} filters={filters} setFilters={setFilters} favorites={favorites} toggleFav={toggleFav}
          compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
          heading="Підбір авто" intro="Скористайтеся фільтрами, щоб швидко знайти авто під ваш бюджет і потреби." />
      )}

      {view === "tradein" && <TradeInView toast={showToast} />}

      {view === "contacts" && <ContactsView social={social} toast={showToast} />}

      {view === "detail" && selectedCar && (
        <CarDetailView car={selectedCar} cars={cars} favorites={favorites} toggleFav={toggleFav} openCar={openCar}
          setView={setView} toast={showToast} onView={registerView} />
      )}

      {view === "favorites" && (
        <FavoritesView cars={cars} favorites={favorites} toggleFav={toggleFav} compareList={compareList} toggleCmp={toggleCmp} openCar={openCar} />
      )}

      {view === "compare" && <CompareView cars={cars} compareList={compareList} toggleCmp={toggleCmp} />}

      {view === "submit" && <SubmitListingView addCar={addCar} setView={setView} toast={showToast} />}

      {view === "admin" && (
        <AdminView cars={cars} setCars={setCars} banner={banner} setBanner={setBanner} social={social} setSocial={setSocial} toast={showToast} />
      )}

      <Footer social={social} />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
