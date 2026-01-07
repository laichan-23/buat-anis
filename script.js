function arrangePhotos() {
    const isMobile = window.innerWidth < 768;
    const columns = isMobile ? 3 : 6; // 3 kolom di HP, 6 di Laptop
    const spacingX = isMobile ? 30 : 16; // Jarak horizontal
    const spacingY = isMobile ? 20 : 30; // Jarak vertikal

    for (let i = 1; i <= 17; i++) {
        const img = document.getElementById(`foto-${i}`);
        if(img) {
            clearInterval(img.dataset.interval);
            let row = Math.floor((i-1) / columns);
            let col = (i-1) % columns;
            
            img.style.transition = "all 1s";
            img.style.left = (col * spacingX + 5) + "%"; // Tambah offset 5% biar gak mepet kiri
            img.style.top = (row * spacingY + 5) + "%";
            img.style.transform = "rotate(0deg)";
            img.style.opacity = "0.4";
            img.style.zIndex = "1";
        }
    }
}