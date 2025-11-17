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
- **Vanilla JavaScript (ES6 Modules)** - Form handling, tracking, smooth scrolling
- **Firebase Firestore** - Cloud database untuk menyimpan waitlist data
- **LocalStorage** - Fallback storage jika Firebase error

## Struktur File

```
MargaSatya-LandingPage/
├── index.html                    # Main landing page
├── styles.css                    # Styling
├── script.js                     # JavaScript functionality (Firebase integrated)
├── firebase-config.js            # Firebase configuration
├── firebase-config.template.js   # Template untuk Firebase config
├── FIREBASE_SETUP.md             # Panduan lengkap setup Firebase
├── .gitignore                    # Git ignore file
└── README.md                     # Documentation
```

## 🚀 Quick Start

### 1. Setup Firebase (WAJIB)

Landing page ini menggunakan Firebase Firestore untuk menyimpan data form waitlist.

**Ikuti panduan lengkap di: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)**

Ringkasan langkah:
1. Buat Firebase project di [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Setup Security Rules
4. Copy konfigurasi Firebase
5. Update file `firebase-config.js` dengan konfigurasi Anda

### 2. Jalankan Landing Page

**Opsi A: Lokal dengan Live Server**
```bash
# Gunakan VS Code Live Server extension
# atau Python HTTP server
python -m http.server 8000
# atau PHP built-in server
php -S localhost:8000
```

**Opsi B: Deploy ke Hosting**
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Drag & drop folder
- **Firebase Hosting**: `firebase deploy`
- **GitHub Pages**: Push ke repository

**PENTING:** Landing page harus dijalankan melalui HTTP server (bukan file:// protocol) karena menggunakan ES6 modules.

### 3. Testing

1. Buka landing page di browser
2. Scroll ke form waitlist
3. Isi dan submit form
4. Check Firebase Console > Firestore Database untuk melihat data

## 📊 Fitur Firebase Integration

### Collections di Firestore

Landing page ini otomatis menyimpan data ke 4 collections:

1. **waitlist** - Semua registrasi pengguna awal
   - Berisi: name, email, phone, role, schoolName, devices, createdAt, userAgent, platform

2. **androidInterest** - Tracking khusus untuk pengguna yang tertarik Android
   - Berisi: email, name, role, schoolName, phone, createdAt

3. **androidComingSoonClicks** - Tracking clicks pada button Android Coming Soon
   - Berisi: timestamp, userAgent, platform

4. **conversions** - Tracking konversi per role dan device
   - Berisi: role, devices, createdAt

### Form Waitlist Features
- ✅ Validasi input
- ✅ Submit ke Firebase Firestore
- ✅ Fallback ke localStorage jika Firebase error
- ✅ Loading state saat submit
- ✅ Success/error messages
- ✅ Tracking perangkat (iOS/Android)

### Analytics (LocalStorage Fallback)
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

**Note:** Untuk analytics lengkap dari Firebase, gunakan Firebase Console atau query Firestore via Admin SDK.

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

## 🔧 Next Steps untuk Production

### 1. Firebase Enhancement
- ✅ Firebase Firestore sudah terintegrasi
- [ ] Setup Firebase Functions untuk email notification
- [ ] Setup Firebase App Check untuk prevent abuse
- [ ] Enable Firebase Analytics

### 2. Email Notification
Gunakan Firebase Functions + Email service:
```javascript
// functions/index.js
exports.sendWelcomeEmail = functions.firestore
  .document('waitlist/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    // Send email via SendGrid/Mailgun/etc
  });
```

### 3. Analytics Integration
- [x] Firebase Analytics (included)
- [ ] Google Analytics 4
- [ ] Facebook Pixel
- [ ] Custom event tracking

### 4. SEO Optimization
- [ ] Meta tags lengkap
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Schema.org markup

### 5. Performance
- [ ] Image optimization (add real images)
- [ ] Minify CSS/JS
- [ ] CDN setup
- [ ] Lazy loading
- [ ] PWA support

### 6. A/B Testing
- [ ] Test different headlines
- [ ] Test CTA button colors
- [ ] Test form placement
- [ ] Track with Firebase Remote Config

## License

© 2025 Marga Satya. All rights reserved.

## Contact

Untuk informasi lebih lanjut tentang Marga Satya, silakan hubungi tim pengembang.
