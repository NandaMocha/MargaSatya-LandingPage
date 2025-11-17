# Marga Satya - Landing Page

Landing page untuk aplikasi ujian digital yang aman untuk guru dan siswa di Indonesia.

## Deskripsi

Marga Satya adalah aplikasi ujian digital yang dirancang untuk menjaga fokus dan kejujuran siswa selama ujian. Guru bisa membuat ujian langsung di aplikasi atau menggunakan Google Form. Aplikasi ini hadir pertama di iOS dengan dukungan Android yang akan segera menyusul.

## Fitur Landing Page

### 1. Hero Section
- Badge iOS Available dan Android Coming Soon
- CTA untuk registrasi pengguna awal
- Device mockup (iPhone dan Android)

### 2. Informasi Produk
- Penjelasan tentang Marga Satya
- Fitur untuk Guru
- Fitur untuk Siswa
- Keamanan Ujian
- Dukungan Platform (iOS & Android)
- Untuk Sekolah

### 3. Waitlist Form
- Form pendaftaran pengguna awal
- Field: Nama, Email, Telepon, Peran, Nama Sekolah, Perangkat
- Validasi dan pesan sukses
- Tracking untuk iOS dan Android interest

### 4. Analytics Tracking
- Total registrasi
- Android interest tracking
- Click tracking pada "Android Coming Soon"
- Breakdown by role (Guru/Siswa/Sekolah)
- Breakdown by device (iOS/Android)

## Teknologi

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan gradient, animations, responsive design
- **Vanilla JavaScript** - Form handling, tracking, smooth scrolling
- **LocalStorage** - Temporary data storage (demo purpose)

## Struktur File

```
MargaSatya-LandingPage/
├── index.html          # Main landing page
├── styles.css          # Styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Cara Menggunakan

1. Clone repository ini
2. Buka `index.html` di browser
3. Landing page siap digunakan!

Untuk production:
- Deploy ke hosting (Vercel, Netlify, GitHub Pages, dll)
- Integrasikan form dengan backend API
- Tambahkan Google Analytics atau tracking lainnya
- Tambahkan favicon dan meta tags untuk social media

## Fitur JavaScript

### Form Waitlist
- Validasi input
- Tracking perangkat (iOS/Android)
- Save ke localStorage (demo)
- Success/error messages

### Tracking
- **Android Interest**: Track pengguna yang tertarik dengan Android
- **Android Coming Soon Clicks**: Track clicks pada button "Beri Tahu Saya Saat Tersedia"
- **Conversions**: Track total registrasi

### Analytics
Akses analytics melalui console:
```javascript
window.getMargaSatyaAnalytics()
```

Output:
```javascript
{
  totalRegistrations: 10,
  androidInterest: 5,
  androidComingSoonClicks: 8,
  totalConversions: 10,
  byRole: {
    guru: 4,
    siswa: 3,
    sekolah: 3
  },
  byDevice: {
    iOS: 7,
    Android: 5
  }
}
```

## SEO Keywords

- aplikasi ujian android
- aplikasi ujian aman
- aplikasi ujian iOS
- Google Form Safe Exam
- ujian digital Indonesia
- exam lock browser

## Responsive Design

Landing page telah dioptimalkan untuk:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Customization

### Warna
Edit CSS variables di `styles.css`:
```css
:root {
    --primary-color: #4A90E2;
    --secondary-color: #50C878;
    --warning-color: #FFA500;
    ...
}
```

### Konten
Edit langsung di `index.html` untuk mengubah:
- Teks dan copywriting
- Fitur-fitur
- Informasi kontak

## Next Steps untuk Production

1. **Backend Integration**
   - Setup API endpoint untuk form submission
   - Database untuk menyimpan waitlist
   - Email notification system

2. **Analytics**
   - Google Analytics 4
   - Facebook Pixel
   - Custom event tracking

3. **SEO Optimization**
   - Meta tags lengkap
   - Open Graph tags
   - Twitter Card tags
   - Sitemap.xml
   - robots.txt

4. **Performance**
   - Image optimization
   - Minify CSS/JS
   - CDN setup
   - Lazy loading

5. **A/B Testing**
   - Test different headlines
   - Test CTA button colors
   - Test form placement

## License

© 2025 Marga Satya. All rights reserved.

## Contact

Untuk informasi lebih lanjut tentang Marga Satya, silakan hubungi tim pengembang.
