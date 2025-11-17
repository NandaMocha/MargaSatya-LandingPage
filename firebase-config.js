// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';

// Firebase configuration
// INSTRUKSI: Ganti dengan konfigurasi Firebase Anda
// Dapatkan konfigurasi ini dari Firebase Console > Project Settings > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyByrgwiUFxwnGhOBuogpUsN_Z1rofkc6Po",
  authDomain: "margasatya-a8849.firebaseapp.com",
  projectId: "margasatya-a8849",
  storageBucket: "margasatya-a8849.firebasestorage.app",
  messagingSenderId: "820028661198",
  appId: "1:820028661198:web:49ee917219db50ec529f9f",
  measurementId: "G-Z2EP6FBH4G"
};

// Initialize Firebase
let app;
let db;
let analytics;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    // Initialize Analytics (optional)
    if (typeof getAnalytics !== 'undefined') {
        analytics = getAnalytics(app);
    }

    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
}

// Export untuk digunakan di file lain
export { app, db, analytics };
