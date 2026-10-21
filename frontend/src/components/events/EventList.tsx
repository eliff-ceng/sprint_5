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
