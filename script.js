// Marga Satya Landing Page - JavaScript

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
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(waitlistForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                role: formData.get('role'),
                schoolName: formData.get('schoolName'),
                devices: formData.getAll('device'),
                timestamp: new Date().toISOString()
            };

            // Validate at least one device is selected
            if (data.devices.length === 0) {
                showMessage('error', 'Silakan pilih minimal satu perangkat yang akan digunakan.');
                return;
            }

            // Track Android interest
            if (data.devices.includes('Android')) {
                trackAndroidInterest(data);
            }

            // Save to localStorage (in production, this would be sent to a backend)
            saveToWaitlist(data);

            // Show success message
            showMessage('success', 'Terima kasih! Anda telah berhasil terdaftar sebagai pengguna awal Marga Satya. Kami akan menghubungi Anda segera.');

            // Reset form
            waitlistForm.reset();

            // Track conversion
            trackConversion(data);
        });
    }

    // Android Notify Button
    const androidNotifyBtn = document.getElementById('androidNotifyBtn');
    if (androidNotifyBtn) {
        androidNotifyBtn.addEventListener('click', function() {
            // Track click on "Android Coming Soon"
            trackAndroidComingSoonClick();

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

// Save to waitlist (localStorage for demo, would be API call in production)
function saveToWaitlist(data) {
    try {
        // Get existing waitlist
        let waitlist = JSON.parse(localStorage.getItem('margaSatyaWaitlist')) || [];

        // Add new entry
        waitlist.push(data);

        // Save back to localStorage
        localStorage.setItem('margaSatyaWaitlist', JSON.stringify(waitlist));

        // Log for debugging
        console.log('Waitlist entry saved:', data);
        console.log('Total entries:', waitlist.length);

        return true;
    } catch (error) {
        console.error('Error saving to waitlist:', error);
        return false;
    }
}

// Track Android interest
function trackAndroidInterest(data) {
    try {
        let androidInterest = JSON.parse(localStorage.getItem('margaSatyaAndroidInterest')) || [];
        androidInterest.push({
            email: data.email,
            name: data.name,
            role: data.role,
            timestamp: data.timestamp
        });
        localStorage.setItem('margaSatyaAndroidInterest', JSON.stringify(androidInterest));
        console.log('Android interest tracked:', androidInterest.length);
    } catch (error) {
        console.error('Error tracking Android interest:', error);
    }
}

// Track Android Coming Soon click
function trackAndroidComingSoonClick() {
    try {
        let clicks = JSON.parse(localStorage.getItem('margaSatyaAndroidComingSoonClicks')) || [];
        clicks.push({
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        localStorage.setItem('margaSatyaAndroidComingSoonClicks', JSON.stringify(clicks));
        console.log('Android Coming Soon click tracked:', clicks.length);
    } catch (error) {
        console.error('Error tracking click:', error);
    }
}

// Track conversion
function trackConversion(data) {
    try {
        let conversions = JSON.parse(localStorage.getItem('margaSatyaConversions')) || [];
        conversions.push({
            role: data.role,
            devices: data.devices,
            timestamp: data.timestamp
        });
        localStorage.setItem('margaSatyaConversions', JSON.stringify(conversions));
        console.log('Conversion tracked');
    } catch (error) {
        console.error('Error tracking conversion:', error);
    }
}

// Analytics Helper Functions (for future integration with Google Analytics, etc.)
function getAnalytics() {
    try {
        const waitlist = JSON.parse(localStorage.getItem('margaSatyaWaitlist')) || [];
        const androidInterest = JSON.parse(localStorage.getItem('margaSatyaAndroidInterest')) || [];
        const androidClicks = JSON.parse(localStorage.getItem('margaSatyaAndroidComingSoonClicks')) || [];
        const conversions = JSON.parse(localStorage.getItem('margaSatyaConversions')) || [];

        return {
            totalRegistrations: waitlist.length,
            androidInterest: androidInterest.length,
            androidComingSoonClicks: androidClicks.length,
            totalConversions: conversions.length,
            byRole: {
                guru: waitlist.filter(w => w.role === 'guru').length,
                siswa: waitlist.filter(w => w.role === 'siswa').length,
                sekolah: waitlist.filter(w => w.role === 'sekolah').length
            },
            byDevice: {
                iOS: waitlist.filter(w => w.devices.includes('iOS')).length,
                Android: waitlist.filter(w => w.devices.includes('Android')).length
            }
        };
    } catch (error) {
        console.error('Error getting analytics:', error);
        return null;
    }
}

// Expose analytics function globally for console access
window.getMargaSatyaAnalytics = getAnalytics;

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
