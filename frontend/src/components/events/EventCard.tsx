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
