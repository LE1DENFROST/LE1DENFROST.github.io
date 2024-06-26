document.addEventListener('DOMContentLoaded', function() {
    
    fetch('database/blog.json')
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById('blog-list');
            data.forEach(post => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="date">${post.date}</span>
                    <a href="${post.link}">${post.title}</a>
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