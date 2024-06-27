document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var navUl = document.getElementById('nav-ul');
    
    menuIcon.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });

    fetch('database/blog.json')
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById('blog-list');
            data.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="date">${post.date}</span>
                    <a href="$${post.link}">${post.title}</a>
                    <span class="reading-time">${post.readingTime}</span>
                `;
                blogList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));

    var clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
        showNotification('Adres kopyalandı!');
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        showNotification('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.', 'error');
        console.error('Kopyalama başarısız:', e.action);
    });
});

function showNotification(message, type = 'success') {
    var notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + type;
    
    setTimeout(function() {
        notification.className = 'notification';
    }, 3000);
}

const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 40);