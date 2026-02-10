// Menu mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Fonction pour basculer le menu mobile
    function toggleMenu() {
        navMenu.classList.toggle('active');
        
        // Changer l'icône
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Événement sur le bouton menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Gestion des liens actifs
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermer le menu mobile si ouvert
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
                
                // Scroll vers l'élément
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion simple du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Simuler l'envoi
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message envoyé avec succès! Nous vous répondrons bientôt.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Fonction de validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Animation au défilement (scroll)
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer les cartes et autres éléments
        document.querySelectorAll('.card, .product-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialiser les animations
    initScrollAnimations();
});