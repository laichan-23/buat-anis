const runningText = document.getElementById('running-text');
const tombol = document.getElementById('tombol');
const kotak = document.getElementById('kotak');
const bgMusic = document.getElementById('bgMusic');
const toweng = document.getElementById('towengSound');
const clickSound = document.getElementById('clickSound');
const finalText = document.getElementById('final-text');
const chatBox = document.getElementById('chatBox');

let currentPhoto = 1;

// Start Animation on Load
window.onload = () => {
    // Mulai musik saat klik pertama kali di layar
    document.body.onclick = () => {
        bgMusic.play();
        document.body.onclick = null;
    };

    // Kasih jeda sedikit lalu gerakkan teks dari kanan ke kiri
    setTimeout(() => {
        runningText.style.left = '-150%'; 
    }, 500);

    // Munculkan tombol di tengah setelah teks lewat
    setTimeout(() => {
        tombol.style.display = 'block';
        tombol.style.left = '50%';
        tombol.style.top = '50%';
    }, 4000); 
};

// Klik Tombol PNG
tombol.onclick = () => {
    clickSound.play();
    tombol.style.display = 'none';
    kotak.style.display = 'block';
};

// Klik Kotak PNG
kotak.onclick = () => {
    if (currentPhoto <= 17) {
        clickSound.play();
        toweng.play();
        spawnPhoto(currentPhoto);
        currentPhoto++;
    } else {
        kotak.style.display = 'none';
        finalText.style.display = 'block';
        arrangePhotos();
    }
};

function spawnPhoto(num) {
    const img = document.createElement('img');
    img.src = `${num}.png`;
    img.className = 'photo-container';
    img.id = `foto-${num}`;
    document.body.appendChild(img);
    img.style.display = 'block';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let speedX = (Math.random() - 0.5) * 20;
    let speedY = (Math.random() - 0.5) * 20;

    let move = setInterval(() => {
        x += speedX;
        y += speedY;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.transform = `rotate(${x}deg)`;

        if (x < 0 || x > window.innerWidth - 100) speedX *= -1;
        if (y < 0 || y > window.innerHeight - 150) speedY *= -1;
    }, 20);

    img.dataset.interval = move;
}

function arrangePhotos() {
    for (let i = 1; i <= 17; i++) {
        const img = document.getElementById(`foto-${i}`);
        if(img) {
            clearInterval(img.dataset.interval);
            let row = Math.floor((i-1) / 6);
            let col = (i-1) % 6;
            img.style.transition = "all 1s";
            img.style.left = (col * 16) + "%";
            img.style.top = (row * 30) + "%";
            img.style.transform = "rotate(0deg)";
            img.style.opacity = "0.5";
        }
    }
}

const messages = {
    'A': { txt: "awoakowk sorry telat ngucapinya, isun geh weruh sira lagi senyum awoakwok", color: "#ffcccc" },
    'N': { txt: "ngopi bareng yuk kapan kapan, dirimu g pernah main ke rumah saya cih :|", color: "#ccffcc" },
    'I': { txt: "ingat meskipun dirimu sibuk kerja, jangan lupa sholat 5 waktu kewajiban", color: "#ccccff" },
    'S': { txt: "semoga panjang umur, dan di limpahkan rezeki mu, dan sehat selalu, dan jangan pacaran terlalu lama :) langsung nikah be enak :), inget pacaran dosa hukum aslinya :)", color: "#ffffcc" }
};

function showChat(letter) {
    clickSound.play();
    chatBox.innerText = messages[letter].txt;
    chatBox.style.backgroundColor = messages[letter].color;
    chatBox.classList.add('show');

    setTimeout(() => {
        chatBox.classList.remove('show');
    }, 4000);
}