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
