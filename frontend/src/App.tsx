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
