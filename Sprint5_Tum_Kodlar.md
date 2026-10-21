
## `frontend/src/types/page.ts`


export type PageName = "home" | "events" | "detail" | "add" | "update";

## `frontend/src/utils/format-date.ts`

```ts
export function formatDate(dateText: string): string {
  const [day, month, year] = dateText.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}



## `frontend/src/components/layout/Footer.tsx`

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-icerik">
        2416501075 - Elif Nur Özek - 2026
      </div>
    </footer>
  );
}

export default Footer;

```

## `frontend/src/components/layout/Header.tsx`

```tsx
interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;

```

## `frontend/src/components/layout/Navigation.tsx`

```tsx
import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { label: string; name: PageName }[] = [
  { label: "Ana Sayfa", name: "home" },
  { label: "Etkinlikler", name: "events" },
  { label: "Ekle", name: "add" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="site-nav" aria-label="Ana menü">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={`#${item.name}`}
          aria-current={current === item.name ? "page" : undefined}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;

```

## `frontend/src/components/events/EventCard.tsx`

```tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p className="kategori-etiketi">{event.category}</p>

      <dl className="kart-kunye">
        <div>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}</dd>
        </div>
        <div>
          <dt>Saat</dt>
          <dd>{event.time}</dd>
        </div>
        <div>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </div>
      </dl>

      <p>{event.description}</p>

      <a
        className="buton"
        href={`#${event.id}`}
        onClick={(clickEvent) => {
          clickEvent.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör
      </a>
    </article>
  );
}

export default EventCard;

```

## `frontend/src/components/events/EventList.tsx`

```tsx
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="bos-sonuc sonuc">
        {emptyText ?? "Gösterilecek etkinlik bulunamadı."}
      </p>
    );
  }

  return (
    <section className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onShowDetail={onShowDetail}
        />
      ))}
    </section>
  );
}

export default EventList;

```

## `frontend/src/components/events/EventFilter.tsx`

```tsx
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(event) => event.preventDefault()}>
      <div className="alan-grubu">
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          placeholder="atölye, kariyer, yapay..."
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="alan-grubu">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(event) =>
            onCategoryChange(event.target.value as Category | "")
          }
        >
          <option value="">Tümü</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;

```

## `frontend/src/components/events/EventDetail.tsx`

```tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className={`detay-karti${event.image ? "" : " detay-afissiz"}`}>
      {event.image && (
        <figure className="afis-figure">
          <img
            className="afis-gorsel"
            src={event.image}
            alt={`${event.title} afişi`}
          />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <div className="detay-icerik">
        <section className="kunye-karti">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <div>
              <dt>Tarih</dt>
              <dd>{formatDate(event.date)}</dd>
            </div>
            <div>
              <dt>Saat</dt>
              <dd>{event.time}</dd>
            </div>
            <div>
              <dt>Yer</dt>
              <dd>{event.location}</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>{event.category}</dd>
            </div>
            <div>
              <dt>Kontenjan</dt>
              <dd>{event.capacity} kişi</dd>
            </div>
          </dl>
        </section>

        <section className="aciklama">
          <h2>Açıklama</h2>
          <p>{event.description}</p>
        </section>

        <div className="detay-butonlari">
          <a
            className="buton ikincil"
            href="#events"
            onClick={(clickEvent) => {
              clickEvent.preventDefault();
              onBack();
            }}
          >
            Listeye dön
          </a>
          <a
            className="buton"
            href="#update"
            onClick={(clickEvent) => {
              clickEvent.preventDefault();
              onEdit(event.id);
            }}
          >
            Bu etkinliği güncelle
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;

```

## `frontend/src/components/forms/EventForm.tsx`

```tsx
interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      className="form-karti form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-alan">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
        />
      </div>

      <div className="form-alan">
        <label htmlFor="category">Kategori *</label>
        <select id="category" name="category" defaultValue="">
          <option value="" disabled>
            Seçiniz
          </option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </div>

      <div className="form-alan">
        <label htmlFor="date">Tarih *</label>
        <input type="date" id="date" name="date" />
      </div>

      <div className="form-alan">
        <label htmlFor="time">Saat *</label>
        <input type="time" id="time" name="time" />
      </div>

      <div className="form-alan">
        <label htmlFor="location">Yer *</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Örn. A Blok Konferans Salonu"
        />
      </div>

      <div className="form-alan">
        <label htmlFor="capacity">Kontenjan</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          max={1000}
        />
      </div>

      <div className="form-alan">
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5} />
      </div>

      <button className="buton" type="submit">
        Kaydet
      </button>
    </form>
  );
}

export default EventForm;

```

## `frontend/src/App.tsx`

```tsx
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const categories = [...new Set(events.map((event) => event.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const upcoming = events.slice(0, 2);

  const pageTitle = page === "home" ? "Ana Sayfa" : page === "events" ? "Tüm Etkinlikler" : page === "add" ? "Etkinlik Ekle" : page === "update" ? "Etkinlik Güncelle" : selected?.title ?? "Etkinlik Bulunamadı";
  const headerTitle = page === "home" ? "Kampüs Etkinlikleri" : pageTitle;
  const headerText = page === "home" ? "Fakültenin seminer, atölye ve söyleşileri tek yerde." : page === "events" ? "Arama yapın veya kategoriye göre daraltın." : undefined;

  function go(next: PageName, id: string | null = null): void {
    setPage(next);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${pageTitle}`;
  }, [pageTitle]);

  return (
    <>
      <div className="site-header">
        <div className="header-icerik">
          <Header title={headerTitle} text={headerText} />
          <Navigation current={page} onNavigate={go} />
        </div>
      </div>

      <main>
        {page === "home" && (
          <>
            <h2 className="sayfa-baslik">Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={setCategory} />
            <p id="sonuc" role="status" aria-live="polite">{filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}</p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {page === "detail" && !selected && (
          <section className="mesaj hata-kutusu">
            <h2>Etkinlik bulunamadı</h2>
            <p>Seçilen etkinlik bulunamadı veya etkinlik seçilmedi.</p>
            <button className="buton" type="button" onClick={() => go("events")}>Listeye dön</button>
          </section>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="form-aciklama">Bu sprintte form sadece görünür; kayıt yapılmaz.</p>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;

```

## `frontend/src/App.css`

```css
:root {
  --ana-renk: #159447;
  --ana-koyu: #0d6f34;
  --zemin: #f4f8f5;
  --kart: #ffffff;
  --metin: #1d2b22;
  --soluk: #5e6f64;
  --kenar: #d7e3da;
  --hata: #b42318;
  --hata-zemin: #fff1f0;
  --basari: #16794b;
  --basari-zemin: #effaf3;
  --golge: 0 8px 20px rgba(20, 70, 40, 0.08);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--metin);
  background: var(--zemin);
  line-height: 1.55;
}

.site-header {
  background: var(--ana-renk);
  color: #fff;
  padding: 1.4rem 1rem 1rem;
}

.header-icerik,
main,
.footer-icerik {
  width: min(1100px, calc(100% - 2rem));
  margin-inline: auto;
}

.site-header h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.site-nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.45rem 0.75rem;
  border-radius: 0.4rem;
}

.site-nav a:hover,
.site-nav a[aria-current="page"] {
  background: #fff;
  color: var(--ana-koyu);
}

main {
  min-height: 62vh;
  padding: 2rem 0 3rem;
}

.intro {
  margin-bottom: 1.5rem;
}

.intro h2,
.sayfa-baslik {
  margin-top: 0;
}

.etkinlik-listesi {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.kart,
.kunye-karti,
.form-karti,
.detay-karti,
.filtre {
  background: var(--kart);
  border: 1px solid var(--kenar);
  border-radius: 0.8rem;
  box-shadow: var(--golge);
}

.kart {
  padding: 1.1rem;
  border-top: 4px solid var(--ana-renk);
}

.kart h2 {
  margin: 0 0 0.25rem;
  font-size: 1.2rem;
}

.kategori-etiketi {
  display: inline-block;
  margin: 0 0 0.8rem;
  color: var(--ana-koyu);
  font-weight: 700;
}

.kart-kunye,
.kunye-karti dl {
  margin: 0;
}

.kart-kunye div,
.kunye-karti dl div {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.kart-kunye dt,
.kunye-karti dt {
  font-weight: 700;
}

.kart-kunye dd,
.kunye-karti dd {
  margin: 0;
}

.buton {
  display: inline-block;
  border: 0;
  border-radius: 0.45rem;
  padding: 0.65rem 0.9rem;
  background: var(--ana-renk);
  color: #fff;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
}

.buton:hover {
  background: var(--ana-koyu);
}

.buton.ikincil {
  background: #fff;
  color: var(--ana-koyu);
  border: 1px solid var(--ana-renk);
}

.filtre {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 0.8rem 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
}

.filtre .alan-grubu {
  display: grid;
  gap: 0.35rem;
}

.filtre label,
.form-karti label {
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #aebdb3;
  border-radius: 0.4rem;
  padding: 0.7rem;
  font: inherit;
  background: #fff;
  color: var(--metin);
}

input:focus,
select:focus,
textarea:focus {
  outline: 3px solid rgba(21, 148, 71, 0.18);
  border-color: var(--ana-renk);
}

#sonuc {
  margin: 0.6rem 0 1.2rem;
  color: var(--ana-koyu);
  font-weight: 700;
}

.bos-sonuc {
  grid-column: 1 / -1;
  background: #fff;
  border: 1px dashed var(--kenar);
  padding: 1rem;
  border-radius: 0.6rem;
}

.detay-karti {
  padding: 1rem;
  display: grid;
  grid-template-columns: minmax(230px, 0.8fr) minmax(300px, 1.2fr);
  gap: 1.2rem;
  align-items: start;
}

.detay-karti.detay-afissiz {
  grid-template-columns: 1fr;
}

.afis-figure {
  margin: 0;
}

.afis-gorsel {
  display: block;
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border: 4px solid #2f4a68;
  outline: 2px solid #d39b7f;
  background: #10233c;
}

.afis-figure figcaption {
  margin-top: 0.55rem;
  color: var(--soluk);
  font-size: 0.9rem;
}

.detay-icerik h1 {
  margin-top: 0;
}

.kunye-karti {
  padding: 1rem;
}

.kunye-karti h2,
.aciklama h2 {
  margin-top: 0;
}

.aciklama {
  margin-top: 1.2rem;
}

.detay-butonlari {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

.form-aciklama {
  max-width: 760px;
}

.form-karti {
  padding: 1.2rem;
  max-width: 760px;
}

.form-alan {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.mesaj {
  max-width: 760px;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.6rem;
}

.hata-kutusu {
  background: var(--hata-zemin);
  color: #7a1c14;
  border: 1px solid #e08f87;
}

.site-footer {
  border-top: 1px solid var(--kenar);
  padding: 1.5rem 0;
  color: var(--soluk);
  text-align: center;
}

@media (max-width: 850px) {
  .etkinlik-listesi {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detay-karti {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .header-icerik,
  main,
  .footer-icerik {
    width: min(100% - 1rem, 1100px);
  }

  .etkinlik-listesi,
  .filtre {
    grid-template-columns: 1fr;
  }

  .site-nav {
    gap: 0.3rem;
  }

  .site-nav a {
    padding: 0.4rem 0.55rem;
    font-size: 0.95rem;
  }

  .detay-karti {
    padding: 0.7rem;
  }

  .afis-gorsel {
    max-height: 360px;
  }
}

/* Sprint 5: Header bileşenindeki isteğe bağlı alt yazı */
.site-baslik p {
  margin: -0.35rem 0 0.75rem;
  color: rgba(255, 255, 255, 0.92);
}

```

## `frontend/src/data/events.ts`

```ts
import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer yolculukları ve sektör deneyimleri üzerine söyleşiler.",
    capacity: 120,
    image: "/afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "15-10-2026",
    time: "10:00",
    location: "Mühendislik Fakültesi Lab-2",
    description: "Temel sensörler, motor kontrolü ve küçük bir robot uygulaması yapılacak.",
    capacity: 30,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "21-10-2026",
    time: "13:30",
    location: "B Blok Amfi 1",
    description: "Saldırı yüzeyleri, güvenli yazılım geliştirme ve güncel siber tehditler konuşulacak.",
    capacity: 90,
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "25-10-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 3",
    description: "HTML, CSS ve responsive tasarım ile küçük bir arayüz geliştirilecek.",
    capacity: 35,
  },
  {
    id: "event-5",
    title: "Yapay Zeka Semineri",
    category: "Seminer",
    date: "02-11-2026",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    description: "Yapay zekanın eğitimde, yazılımda ve günlük hayatta kullanım alanları ele alınacak.",
    capacity: 150,
  },
  {
    id: "event-6",
    title: "Girişimcilik ve Proje Yarışması",
    category: "Yarışma",
    date: "08-11-2026",
    time: "16:00",
    location: "Teknokent Toplantı Salonu",
    description: "Öğrenci projeleri, ekip kurma ve girişim fikrini geliştirme üzerine bir proje yarışması.",
    capacity: 80,
  },
];

```

## `frontend/src/types/campus-event.ts`

```ts
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

```

## `frontend/src/utils/filter-events.ts`

```ts
import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(
  list: CampusEvent[],
  text: string,
): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");

  if (q === "") return list;

  return list.filter((event) => {
    const title = event.title.toLocaleLowerCase("tr-TR");
    const description = event.description.toLocaleLowerCase("tr-TR");

    return title.includes(q) || description.includes(q);
  });
}

export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;

  return list.filter((event) => event.category === category);
}

export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}

```

## `frontend/src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

```
