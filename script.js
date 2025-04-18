document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switch Logic ---
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };

    // Check saved theme on initial load
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Optional: Check system preference if no theme is saved
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark'); // Save the detected preference
        } else {
             applyTheme('light'); // Default to light if no preference
        }
    }

    // Add event listener for toggle switch
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- Scroll Reveal Animation ---
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cards.forEach(card => {
        observer.observe(card);
    });

    // --- Update Footer Date (If element exists - currently removed from HTML) ---
    // const dateElement = document.getElementById('current-date');
    // if (dateElement) {
    //     const today = new Date();
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     dateElement.textContent = today.toLocaleDateString(undefined, options);
    // }

}); // End DOMContentLoaded