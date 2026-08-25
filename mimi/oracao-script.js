document.addEventListener('DOMContentLoaded', () => {
    const btnAbencoar = document.getElementById('btn-abencoar');
    const msgBencao = document.getElementById('msg-bencao');

    if (btnAbencoar) {
        btnAbencoar.addEventListener('click', (e) => {
            const rect = btnAbencoar.getBoundingClientRect();
            
            // Cria explosão de corações e estrelinhas
            for (let i = 0; i < 18; i++) {
                const particle = document.createElement('div');
                particle.textContent = ['💕', '✨', '💖', '🕊️', '🌸', '🙏', '❤️'][Math.floor(Math.random() * 7)];
                particle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    font-size: ${16 + Math.random() * 16}px;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    animation: particleFly 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
                    --tx: ${(Math.random() - 0.5) * 220}px;
                    --ty: ${-40 - Math.random() * 160}px;
                    --rot: ${(Math.random() - 0.5) * 360}deg;
                `;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1200);
            }

            if (msgBencao) {
                msgBencao.style.display = 'block';
            }

            btnAbencoar.style.transform = 'scale(0.95)';
            setTimeout(() => btnAbencoar.style.transform = '', 150);
        });
    }

    // Adiciona estilo de animação de partículas dinâmico
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFly {
            0% { transform: translate(-50%, -50%) scale(0.4) rotate(0deg); opacity: 1; }
            80% { opacity: 0.9; }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.3) rotate(var(--rot)); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
