document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const buyButton = document.getElementById('buyButton');
    const closeButton = document.querySelector('.close');
    const paymentForm = document.getElementById('paymentForm');
    const playDemo = document.getElementById('playDemo');

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal handling
    buyButton.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('🎉 Parabéns! Sua compra foi processada com sucesso. Verifique seu email para acessar o produto.');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Demo video placeholder
    playDemo.addEventListener('click', () => {
        alert('🎥 O vídeo de demonstração seria reproduzido aqui em um ambiente de produção.');
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .price-card, .demo-video');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    document.querySelectorAll('.feature-card, .price-card, .demo-video').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Listen for scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});