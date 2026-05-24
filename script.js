/* ==========================================
   🌊 WAVE CRIMELIFE - SCRIPT.JS
   ========================================== */

// Smooth Scroll für Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy IP Function
function copyIP() {
    const ip = '193.111.248.178:30120';
    navigator.clipboard.writeText(ip).then(() => {
        alert('✅ Server IP wurde kopiert!\n\nFüge sie in FiveM ein:\nF8 → connect ' + ip);
    }).catch(err => {
        // Fallback für ältere Browser
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Server IP wurde kopiert!');
    });
}

// Server Status Live Update
async function updateServerStatus() {
    try {
        // Cfx.re Server API (funktioniert wenn Server online)
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/3ygkyob');
        const data = await response.json();

        if (data && data.Data) {
            // Spielerzahl updaten
            const players = data.Data.clients || 0;
            const maxPlayers = data.Data.svMaxclients || 48;
            document.getElementById('playerCount').textContent = `${players}/${maxPlayers}`;

            // Status grün
            document.getElementById('serverStatus').textContent = 'Online';
            document.getElementById('serverStatus').style.color = '#2ECC71';
        }
    } catch (error) {
        console.log('Server Status nicht verfügbar:', error);
        // Offline anzeigen
        document.getElementById('serverStatus').textContent = 'Offline';
        document.getElementById('serverStatus').style.color = '#E74C3C';
    }
}

// Update alle 30 Sekunden
updateServerStatus();
setInterval(updateServerStatus, 30000);

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Anwenden auf alle Karten
document.querySelectorAll('.regel-card, .team-card, .shop-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(5, 5, 16, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 20, 0.95)';
    }

    lastScroll = currentScroll;
});

// Konsolen Easter Egg
console.log('%c🌊 WAVE CRIMELIFE COMEBACK 🌊', 'color: #3498DB; font-size: 30px; font-weight: bold;');
console.log('%cWillkommen Hacker! 👋\nDu willst Code sehen? Schreib dich im Discord für eine Bewerbung!\n💬 discord.gg/wavelife', 'color: white; font-size: 14px;');
