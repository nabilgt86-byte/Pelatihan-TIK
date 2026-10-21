/**
 * Profil Saya - Pelatihan TIK
 * M.Nabil Rahmadhan
 * Script Interaktif
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Notifikasi Sapa Saya (Native Browser Alert)
    const btnGreet = document.getElementById('btn-greet');
    if (btnGreet) {
        btnGreet.addEventListener('click', () => {
            alert('Hi budy. namaku nabil');
        });
    }

    // 2. Modal Preview Foto Profil
    const avatarContainer = document.getElementById('avatar-container');
    const imageModal = document.getElementById('image-modal');
    const modalClose = document.getElementById('modal-close');

    if (avatarContainer && imageModal) {
        // Buka modal saat foto profil diklik
        avatarContainer.addEventListener('click', () => {
            imageModal.classList.add('active');
            imageModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Kunci scroll layar
        });

        // Dukungan aksesibilitas keyboard (Enter / Space) pada avatar
        avatarContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                avatarContainer.click();
            }
        });

        // Fungsi tutup modal
        const closeModal = () => {
            imageModal.classList.remove('active');
            imageModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Kembalikan scroll layar
        };

        // Tutup saat tombol X diklik
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Tutup saat area gelap di luar foto diklik
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });

        // Tutup dengan tombol Escape pada keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
