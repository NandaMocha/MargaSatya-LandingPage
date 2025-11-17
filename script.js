// Marga Satya Landing Page - JavaScript with Firebase Integration

// Import Firebase Firestore functions
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Smooth scrolling for CTA button
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Waitlist Form Handler
    const waitlistForm = document.getElementById('waitlistForm');
    const formMessage = document.getElementById('formMessage');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get submit button
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim...';

            // Get form data
            const formData = new FormData(waitlistForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                role: formData.get('role'),
                schoolName: formData.get('schoolName'),
                devices: formData.getAll('device'),
                createdAt: new Date().toISOString(),
                userAgent: navigator.userAgent,
                platform: navigator.platform
            };

            // Validate at least one device is selected
            if (data.devices.length === 0) {
                showMessage('error', 'Silakan pilih minimal satu perangkat yang akan digunakan.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                return;
            }

            try {
                // Save to Firebase Firestore
                await saveToFirestore(data);

                // Track Android interest if selected
                if (data.devices.includes('Android')) {
                    await trackAndroidInterest(data);
                }

                // Track Android Coming Soon clicks (if any)
                await trackConversion(data);

                // Also save to localStorage as backup
                saveToLocalStorage(data);

                // Show success message
                showMessage('success', 'Terima kasih! Anda telah berhasil terdaftar sebagai pengguna awal Marga Satya. Kami akan menghubungi Anda segera.');

                // Reset form
                waitlistForm.reset();

            } catch (error) {
                console.error('Error submitting form:', error);

                // Fallback to localStorage if Firebase fails
                saveToLocalStorage(data);

                showMessage('success', 'Terima kasih! Anda telah berhasil terdaftar sebagai pengguna awal Marga Satya. Kami akan menghubungi Anda segera.');

                // Reset form even if there's an error
                waitlistForm.reset();
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Android Notify Button
    const androidNotifyBtn = document.getElementById('androidNotifyBtn');
    if (androidNotifyBtn) {
        androidNotifyBtn.addEventListener('click', async function() {
            // Track click on "Android Coming Soon"
            await trackAndroidComingSoonClick();

            // Scroll to waitlist form
            const waitlistSection = document.getElementById('waitlist');
            if (waitlistSection) {
                waitlistSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Pre-select Android checkbox
                setTimeout(() => {
                    const androidCheckbox = document.querySelector('input[name="device"][value="Android"]');
                    if (androidCheckbox) {
                        androidCheckbox.checked = true;
                    }
                }, 500);
            }
        });
    }
});

// Show form message
function showMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Save to Firebase Firestore
async function saveToFirestore(data) {
    try {
        if (!db) {
            throw new Error('Firebase not initialized');
        }

        // Add to 'waitlist' collection
        const docRef = await addDoc(collection(db, 'waitlist'), {
            ...data,
            createdAt: serverTimestamp()
        });

        console.log('Document written to Firestore with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document to Firestore:', error);
        throw error;
    }
}

// Track Android interest in Firestore
async function trackAndroidInterest(data) {
    try {
        if (!db) {
            console.warn('Firebase not initialized, skipping Android interest tracking');
            return;
        }

        await addDoc(collection(db, 'androidInterest'), {
            email: data.email,
            name: data.name,
            role: data.role,
            schoolName: data.schoolName,
            phone: data.phone,
            createdAt: serverTimestamp()
        });

        console.log('Android interest tracked in Firestore');
    } catch (error) {
        console.error('Error tracking Android interest:', error);
    }
}

// Track Android Coming Soon click
async function trackAndroidComingSoonClick() {
    try {
        if (!db) {
            console.warn('Firebase not initialized, skipping click tracking');
            // Fallback to localStorage
            let clicks = JSON.parse(localStorage.getItem('margaSatyaAndroidComingSoonClicks')) || [];
            clicks.push({
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
            localStorage.setItem('margaSatyaAndroidComingSoonClicks', JSON.stringify(clicks));
            return;
        }

        await addDoc(collection(db, 'androidComingSoonClicks'), {
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: navigator.platform
        });

        console.log('Android Coming Soon click tracked in Firestore');
    } catch (error) {
        console.error('Error tracking click:', error);
    }
}

// Track conversion
async function trackConversion(data) {
    try {
        if (!db) {
            console.warn('Firebase not initialized, skipping conversion tracking');
            return;
        }

        await addDoc(collection(db, 'conversions'), {
            role: data.role,
            devices: data.devices,
            createdAt: serverTimestamp()
        });

        console.log('Conversion tracked in Firestore');
    } catch (error) {
        console.error('Error tracking conversion:', error);
    }
}

// Fallback: Save to localStorage
function saveToLocalStorage(data) {
    try {
        // Get existing waitlist
        let waitlist = JSON.parse(localStorage.getItem('margaSatyaWaitlist')) || [];

        // Add new entry
        waitlist.push(data);

        // Save back to localStorage
        localStorage.setItem('margaSatyaWaitlist', JSON.stringify(waitlist));

        console.log('Waitlist entry saved to localStorage:', data);
        console.log('Total entries in localStorage:', waitlist.length);

        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Analytics Helper Functions (reads from localStorage)
function getLocalAnalytics() {
    try {
        const waitlist = JSON.parse(localStorage.getItem('margaSatyaWaitlist')) || [];
        const androidClicks = JSON.parse(localStorage.getItem('margaSatyaAndroidComingSoonClicks')) || [];

        return {
            totalRegistrations: waitlist.length,
            androidInterest: waitlist.filter(w => w.devices && w.devices.includes('Android')).length,
            androidComingSoonClicks: androidClicks.length,
            byRole: {
                guru: waitlist.filter(w => w.role === 'guru').length,
                siswa: waitlist.filter(w => w.role === 'siswa').length,
                sekolah: waitlist.filter(w => w.role === 'sekolah').length
            },
            byDevice: {
                iOS: waitlist.filter(w => w.devices && w.devices.includes('iOS')).length,
                Android: waitlist.filter(w => w.devices && w.devices.includes('Android')).length
            }
        };
    } catch (error) {
        console.error('Error getting analytics:', error);
        return null;
    }
}

// Expose analytics function globally for console access
window.getMargaSatyaAnalytics = getLocalAnalytics;

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
