document.addEventListener('DOMContentLoaded', function() {
    var menuIcon = document.getElementById('menu-icon');
    var menuModal = document.getElementById('menu-modal');
    var closeMenuButton = document.querySelector('.close-menu-button');
    menuIcon.addEventListener('click', function() {
        menuModal.style.display = 'block';
    });
    closeMenuButton.addEventListener('click', function() {
        menuModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target == menuModal) {
            menuModal.style.display = 'none';
        }
    });
    var clipboard = new ClipboardJS('.copy-btn');
    clipboard.on('success', function(e) {
        showNotification('Adres kopyalandı!');
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        showNotification('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.', 'error');
        console.error('Kopyalama başarısız:', e.action);
    });
    const searchIcon = document.querySelector('.search-icon');
    const searchModal = document.getElementById('search-modal');
    const closeButton = document.querySelector('.close-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let data = [];
    fetch('/database/blog.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
        })
        .catch(error => console.error('JSON yüklenirken hata oluştu:', error));
    searchIcon.addEventListener('click', () => {
        searchModal.style.display = 'flex';
    });
    closeButton.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target == searchModal) {
            searchModal.style.display = 'none';
        }
    });
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';
        const filteredPosts = data.filter(post => post.title.toLowerCase().includes(query));
        filteredPosts.forEach(post => {
            const resultItem = document.createElement('li');
            resultItem.innerHTML = `<a href="$${post.link}">$${post.title}</a>`;
            searchResults.appendChild(resultItem);
        });
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