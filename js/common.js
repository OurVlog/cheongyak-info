/**
 * common.js
 * This script handles the loading of reusable components (like header and footer)
 * into placeholder elements on each page. It ensures a consistent look and feel
 * and makes maintenance easier.
 */
document.addEventListener('DOMContentLoaded', function() {

    // Function to fetch and insert HTML components
    // It uses absolute paths starting from the root of the site ('/')
    const loadComponent = (componentPath, placeholderId) => {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.error(`Placeholder element with ID '${placeholderId}' not found.`);
            return;
        }

        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading component:', error);
                placeholder.innerHTML = `<p class="text-red-500 text-center">Error: ${componentPath}를 불러오는데 실패했습니다.</p>`;
            });
    };

    // Load header and footer into their respective placeholders
    loadComponent('/header.html', 'header-placeholder');
    loadComponent('/footer.html', 'footer-placeholder');

    // Dynamically add common scripts to the head to avoid duplication
    const addScript = (src, async = true, crossorigin = null) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        if (crossorigin) {
            script.crossOrigin = crossorigin;
        }
        document.head.appendChild(script);
    };

    // Add Google Analytics and AdSense scripts
    addScript('https://www.googletagmanager.com/gtag/js?id=G-MET2FR8C3B');
    addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2621906042965502', true, 'anonymous');
    
    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MET2FR8C3B');

});
