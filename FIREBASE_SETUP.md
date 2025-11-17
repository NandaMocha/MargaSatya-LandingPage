# 🔥 Panduan Setup Firebase untuk Marga Satya Landing Page

Ikuti langkah-langkah berikut untuk mengintegrasikan Firebase Firestore dengan landing page.

## 1. Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project: **Marga Satya** (atau nama yang Anda inginkan)
4. Ikuti wizard setup:
   - Enable/disable Google Analytics (opsional, tapi direkomendasikan)
   - Pilih atau buat Google Analytics account
5. Klik "Create project"

## 2. Setup Web App

1. Dari Firebase Console dashboard, klik icon **Web** (`</>`)
2. Daftarkan app:
   - App nickname: `Marga Satya Landing Page`
   - **Jangan** centang "Firebase Hosting" (kecuali Anda mau deploy ke Firebase Hosting)
3. Klik "Register app"
4. **PENTING**: Copy konfigurasi Firebase yang muncul (akan digunakan di langkah berikutnya)

Contoh konfigurasi:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "margasatya-xxxxx.firebaseapp.com",
  projectId: "margasatya-xxxxx",
  storageBucket: "margasatya-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};
```

## 3. Setup Firestore Database

1. Dari menu kiri Firebase Console, pilih **Build > Firestore Database**
2. Klik "Create database"
3. Pilih mode:
   - **Production mode** (recommended untuk production)
   - **Test mode** (untuk development, data bisa diakses siapa saja selama 30 hari)
4. Pilih lokasi server (pilih yang terdekat dengan Indonesia):
   - Recommended: `asia-southeast1` (Singapore) atau `asia-southeast2` (Jakarta)
5. Klik "Enable"

## 4. Setup Firestore Security Rules

Setelah Firestore dibuat, setup security rules:

1. Pergi ke **Firestore Database > Rules**
2. Ganti rules dengan berikut:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Waitlist collection - allow write, restrict read
    match /waitlist/{document=**} {
      allow write: if true; // Anyone can submit
      allow read: if false; // No one can read (admin only via console)
    }

    // Android Interest collection
    match /androidInterest/{document=**} {
      allow write: if true;
      allow read: if false;
    }

    // Android Coming Soon Clicks tracking
    match /androidComingSoonClicks/{document=**} {
      allow write: if true;
      allow read: if false;
    }

    // Conversions tracking
    match /conversions/{document=**} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

3. Klik "Publish"

**Penjelasan Security Rules:**
- `allow write: if true` - Siapa saja bisa menulis (submit form)
- `allow read: if false` - Tidak ada yang bisa membaca (hanya admin melalui Firebase Console)

## 5. Update Konfigurasi di Landing Page

1. Buka file `firebase-config.js`
2. Ganti nilai-nilai placeholder dengan konfigurasi dari step 2:

```javascript
const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY_HERE",
    authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
    projectId: "PASTE_YOUR_PROJECT_ID_HERE",
    storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
    appId: "PASTE_YOUR_APP_ID_HERE",
    measurementId: "PASTE_YOUR_MEASUREMENT_ID_HERE"
};
```

3. Save file

## 6. Testing

1. Buka `index.html` di browser
2. Buka Developer Console (F12)
3. Scroll ke form waitlist
4. Isi dan submit form
5. Check console untuk log:
   - ✅ "Firebase initialized successfully"
   - ✅ "Document written to Firestore with ID: xxx"
   - ✅ "Android interest tracked in Firestore" (jika pilih Android)

6. Verifikasi di Firebase Console:
   - Buka **Firestore Database > Data**
   - Lihat collection `waitlist` - seharusnya ada data baru

## 7. Struktur Data di Firestore

### Collection: `waitlist`
Menyimpan semua registrasi pengguna awal.

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "08123456789",
  role: "guru",
  schoolName: "SMA Negeri 1 Jakarta",
  devices: ["iOS", "Android"],
  createdAt: Timestamp,
  userAgent: "Mozilla/5.0...",
  platform: "Win32"
}
```

### Collection: `androidInterest`
Tracking khusus untuk pengguna yang tertarik dengan Android.

```javascript
{
  email: "john@example.com",
  name: "John Doe",
  role: "guru",
  schoolName: "SMA Negeri 1 Jakarta",
  phone: "08123456789",
  createdAt: Timestamp
}
```

### Collection: `androidComingSoonClicks`
Tracking clicks pada button "Beri Tahu Saya Saat Tersedia".

```javascript
{
  timestamp: Timestamp,
  userAgent: "Mozilla/5.0...",
  platform: "Win32"
}
```

### Collection: `conversions`
Tracking konversi per role dan device.

```javascript
{
  role: "guru",
  devices: ["iOS"],
  createdAt: Timestamp
}
```

## 8. Melihat Data di Firebase Console

1. Buka Firebase Console
2. Pilih **Firestore Database > Data**
3. Pilih collection (waitlist, androidInterest, dll)
4. Lihat dokumen-dokumen yang tersimpan

### Export Data

Untuk export data dari Firestore:

**Via Console (Manual):**
1. Buka collection
2. Klik titik tiga (...) di kanan atas
3. Pilih export options

**Via Code (Otomatis):**
Install Firebase Admin SDK dan buat script untuk export ke CSV/Excel.

## 9. Setup Analytics (Opsional)

Jika Anda mengaktifkan Google Analytics saat setup:

1. Data tracking otomatis tercatat
2. Lihat analytics di Firebase Console > Analytics
3. Integrasikan dengan Google Analytics 4

## 10. Firestore Indexes (Untuk Query Kompleks)

Jika nanti Anda ingin query data dengan filter tertentu:

1. Buka **Firestore > Indexes**
2. Klik "Create Index"
3. Setup index sesuai kebutuhan query

Contoh query yang mungkin butuh index:
```javascript
// Get all guru who are interested in Android
db.collection('waitlist')
  .where('role', '==', 'guru')
  .where('devices', 'array-contains', 'Android')
  .get()
```

## 11. Tips Keamanan

1. **Jangan commit credentials** ke Git:
   - Jika private repo: aman
   - Jika public repo: jangan commit `firebase-config.js` atau gunakan environment variables

2. **Review Security Rules** secara berkala

3. **Enable App Check** untuk produksi:
   - Mencegah abuse dari bot
   - Firebase Console > Build > App Check

4. **Monitor Usage**:
   - Firebase Console > Usage and billing
   - Set budget alerts

## 12. Quotas & Pricing

**Free Tier (Spark Plan):**
- Stored data: 1 GB
- Document reads: 50,000/day
- Document writes: 20,000/day
- Document deletes: 20,000/day

Untuk landing page dengan traffic normal, free tier lebih dari cukup!

Upgrade ke **Blaze Plan (Pay as you go)** jika traffic tinggi.

## 13. Troubleshooting

### Error: "Firebase not initialized"
- Pastikan `firebase-config.js` sudah diupdate dengan config yang benar
- Check console browser untuk error message detail

### Error: "Missing or insufficient permissions"
- Review Firestore Security Rules
- Pastikan `allow write: if true` untuk collection yang diakses

### Form submit tapi tidak masuk Firestore
- Check browser console untuk error
- Verifikasi Firebase config sudah benar
- Pastikan Firestore sudah enabled
- Check security rules

### CORS Error
- Pastikan menggunakan HTTPS atau localhost
- Tambahkan domain ke Firebase authorized domains:
  - Firebase Console > Authentication > Settings > Authorized domains

## 14. Next Steps

Setelah setup Firebase:

1. **Test submit form** dari landing page
2. **Verifikasi data masuk** ke Firestore
3. **Setup email notification** (optional):
   - Gunakan Firebase Functions + SendGrid/Mailgun
   - Trigger ketika ada document baru di `waitlist`
4. **Deploy landing page** ke hosting pilihan Anda
5. **Monitor data** secara berkala

## Butuh Bantuan?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Get Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Console](https://console.firebase.google.com/)

---

**Selamat! Firebase Anda sudah siap digunakan! 🎉**
