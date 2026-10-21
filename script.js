/**
 * Profil Saya - Pelatihan TIK (M.Nabil Rahmadhan)
 * File JavaScript Terpisah (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Tagline Rotator
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const phrases = [
            'Teknologi Informasi & Web',
            'Pengembangan Antarmuka Modern',
            'Solusi Komputasi Praktis',
            'Desain Responsif & Estetis'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 90;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Jeda saat kalimat selesai diketik
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 450; // Jeda sebelum mulai kalimat baru
            }

            setTimeout(typeLoop, typeSpeed);
        }

        setTimeout(typeLoop, 800);
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);

            const bars = menuToggle.querySelectorAll('.bar');
            if (isOpen) {
                bars[0].style.transform = 'translateY(9px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Tutup menu saat salah satu link diklik (khusus mobile)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 3. Header Scroll Effect & Scrollspy
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Efek header saat di-scroll
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Highlight tautan navigasi aktif berdasarkan posisi scroll
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 4. Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 5. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Interactive Contact Form & Toast
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span style="color: var(--red-bright); font-size: 16px;">✦</span>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('sender-name');
            const emailInput = document.getElementById('sender-email');
            const subjectInput = document.getElementById('sender-subject');
            const messageInput = document.getElementById('sender-message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showToast('Mohon lengkapi seluruh kolom formulir.');
                return;
            }

            // Validasi format email sederhana
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                showToast('Format email belum valid.');
                emailInput.focus();
                return;
            }

            // Tampilkan pesan konfirmasi di form
            if (formFeedback) {
                formFeedback.classList.remove('hidden');
            }

            const senderName = nameInput.value.trim();
            showToast(`Terima kasih ${senderName}! Pesan Anda telah terkirim kepada M.Nabil Rahmadhan.`);

            // Reset formulir setelah dikirim
            contactForm.reset();

            // Sembunyikan pesan feedback setelah 6 detik
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.classList.add('hidden');
                }
            }, 6000);
        });
    }
});
