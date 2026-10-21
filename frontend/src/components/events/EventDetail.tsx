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
