Canlı site: BURAYA-VERCEL-LINKINI-YAZ

# Sprint 5 - React Bileşenleri

Sprint 5, Sprint 4'teki `frontend/` klasöründe devam eder. Yeni Vite projesi veya yeni sprint klasörü açılmaz. Görünüm ve davranış Sprint 4 ile aynı kalırken büyük `App.tsx` parçalara ayrılmıştır.

## Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

## Sprint 5 yapısı

- `src/components/layout/Header.tsx`: Başlığı ve isteğe bağlı alt yazıyı props ile gösterir.
- `src/components/layout/Navigation.tsx`: Menü öğelerini çizer, aktif sayfayı gösterir ve tıklamayı callback ile App'e bildirir.
- `src/components/layout/Footer.tsx`: Sayfanın alt bilgisini gösterir.
- `src/components/events/EventCard.tsx`: Tek bir etkinlik kartını gösterir ve detay isteğini callback ile yukarı bildirir.
- `src/components/events/EventList.tsx`: Etkinlik dizisini alır, her kayıt için `EventCard` üretir ve `key={event.id}` kullanır.
- `src/components/events/EventFilter.tsx`: Arama ve kategori alanlarını gösterir; state App'te kalır.
- `src/components/events/EventDetail.tsx`: Seçili etkinliğin afiş, künye, açıklama ve iki butonunu gösterir.
- `src/components/forms/EventForm.tsx`: Ekle ve Güncelle sayfalarının ortak formudur; submit olayını callback ile App'e iletir.
- `src/types/page.ts`: `PageName` union type tanımıdır.
- `src/utils/format-date.ts`: Ortak `formatDate` fonksiyonunu içerir.
- `src/App.tsx`: State, hesaplanan değerler, `go()` ve sayfa bileşenlerini birleştiren ana bileşendir.

## Kontrol

- Ana sayfa: yaklaşan 2 etkinlik.
- Etkinlikler: 6 etkinlik.
- `atölye` araması: 2 kart.
- Kategori `Atölye`: 2 kart.
- `xyz`: bulunamadı mesajı.
- Detay: afiş, künye, açıklama, Listeye dön ve Güncelle butonları.
- Ekle ve Güncelle: aynı `EventForm` bileşeni.
- Menü aktif sayfayı beyaz kutuda gösterir.
- `App.tsx` artık kart/form/detay JSX'lerini kendi içinde tekrar etmez.

## Build

```bash
cd frontend
npm run build
npm run preview
```

`npm run build` hatasız bitmeden teslim etmeyin.

## Vercel

Ayar değişmez:

- Root Directory: `frontend`
- Framework Preset: `Vite`

## Git teslimi

Repository kökünde:

```bash
git add .
git commit -m "Complete sprint 5 React components"
git tag sprint-05
git push
git push --tags
```
