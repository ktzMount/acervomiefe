const configuracaoPastas = [
    // Murais Especiais
    { id: 'mi', titulo: 'Mural da beleza da Princesa', mes: 'especiais', total: 2 },
    { id: 'aleatorios', titulo: 'Aleatórios', mes: 'especiais', total: 12, totalVideos: 7 },

    // Agosto 2026
    { id: '21-agosto', titulo: '21 de Agosto', mes: 'agosto', total: 2 },
    { id: '19-agosto', titulo: '19 de Agosto', mes: 'agosto', total: 14 },
    { id: '13-agosto', titulo: '13 de Agosto', mes: 'agosto', total: 7 },
    { id: '10-agosto', titulo: '10 de Agosto', mes: 'agosto', total: 3 },
    { id: '3-agosto', titulo: '3 de Agosto', mes: 'agosto', total: 3 },
    { id: '1-agosto', titulo: '1 de Agosto', mes: 'agosto', total: 12 },

    // Julho 2026
    { id: '26-julho', titulo: '26 de Julho', mes: 'julho', total: 4 },
    { id: '6-julho', titulo: '6 de Julho', mes: 'julho', total: 9, totalVideos: 1 },
    { id: '5-julho', titulo: '5 de Julho', mes: 'julho', total: 18 },

    // Junho 2026
    { id: '29-junho', titulo: '29 de Junho', mes: 'junho', total: 2 },
    { id: '28-junho', titulo: '28 de Junho', mes: 'junho', total: 9 },
    { id: '24-junho', titulo: '24 de Junho', mes: 'junho', total: 37 },
    { id: '21-junho', titulo: '21 de Junho', mes: 'junho', total: 38 },
    { id: '14-junho', titulo: '14 de Junho', mes: 'junho', total: 8 },
    { id: '12-junho', titulo: '12 de Junho', mes: 'junho', total: 22, totalVideos: 3 },
    { id: '8-junho', titulo: '8 de Junho', mes: 'junho', total: 1 },
    { id: '5-junho', titulo: '5 de Junho', mes: 'junho', total: 26, totalVideos: 1 },
    { id: '3-junho', titulo: '3 de Junho', mes: 'junho', total: 25, totalVideos: 1 },

    // Maio 2026
    { id: '30-maio', titulo: '30 de Maio', mes: 'maio', total: 113, totalVideos: 1 },
    { id: '29-maio', titulo: '29 de Maio', mes: 'maio', total: 1 },
    { id: '23-maio', titulo: '23 de Maio', mes: 'maio', total: 35 },
    { id: '22-maio', titulo: '22 de Maio', mes: 'maio', total: 4 },
    { id: '18-maio', titulo: '18 de Maio', mes: 'maio', total: 8 },
    { id: '17-maio', titulo: '17 de Maio', mes: 'maio', total: 44 },
    { id: '15-maio', titulo: '15 de Maio', mes: 'maio', total: 1 },
    { id: '12-maio', titulo: '12 de Maio', mes: 'maio', total: 6 },
    { id: '11-maio', titulo: '11 de Maio', mes: 'maio', total: 14 },
    { id: '9-maio', titulo: '9 de Maio', mes: 'maio', total: 5 },
    { id: '8-maio', titulo: '8 de Maio', mes: 'maio', total: 38 },
    { id: '6-maio', titulo: '6 de Maio', mes: 'maio', total: 5 },
    { id: '4-maio', titulo: '4 de Maio', mes: 'maio', total: 1 },
    { id: '3-maio', titulo: '3 de Maio', mes: 'maio', total: 1 },

    // Abril 2026
    { id: '29-abril', titulo: '29 de Abril', mes: 'abril', total: 12 },
    { id: '28-abril', titulo: '28 de Abril', mes: 'abril', total: 19 },
    { id: '27-abril', titulo: '27 de Abril', mes: 'abril', total: 7 },
    { id: '26-abril', titulo: '26 de Abril', mes: 'abril', total: 16 },
    { id: '25-abril', titulo: '25 de Abril', mes: 'abril', total: 8 },
    { id: '24-abril', titulo: '24 de Abril', mes: 'abril', total: 30 },
    { id: '22-abril', titulo: '22 de Abril', mes: 'abril', total: 8 },
    { id: '1-abril', titulo: '1 de Abril', mes: 'abril', total: 1 },

    // Março 2026
    { id: '31-marco', titulo: '31 de Março', mes: 'marco', total: 1 },
    { id: '26-marco', titulo: '26 de Março', mes: 'marco', total: 5 },
    { id: '24-marco', titulo: '24 de Março', mes: 'marco', total: 1 },

    // Fevereiro 2026
    { id: '21-fevereiro', titulo: '21 de Fevereiro', mes: 'fevereiro', total: 2 }
];

let fotosAtuais = [];
let indiceAtual = 0;
let filtroMesAtual = 'todos';
let buscaAtual = '';

// Atualiza contadores do topo
function atualizarEstatisticas() {
    const statsContainer = document.getElementById('acervo-stats');
    if (!statsContainer) return;
    
    let totalFotos = 0;
    let totalVideos = 0;
    configuracaoPastas.forEach(p => {
        totalFotos += p.total;
        totalVideos += (p.totalVideos || 0);
    });
    
    statsContainer.innerHTML = `
        <span class="stat-pill">✨ ${configuracaoPastas.length} momentos</span>
        <span class="stat-pill">📸 ${totalFotos} fotos</span>
        ${totalVideos > 0 ? `<span class="stat-pill">🎥 ${totalVideos} vídeos</span>` : ''}
    `;
}

// Filtra e renderiza os cards das pastas
function gerarPastasGrid() {
    const container = document.getElementById('pastas-grid');
    if (!container) return;

    const pastasFiltradas = configuracaoPastas.filter(pasta => {
        const matchesMes = (filtroMesAtual === 'todos' || pasta.mes === filtroMesAtual);
        const matchesBusca = buscaAtual === '' || pasta.titulo.toLowerCase().includes(buscaAtual.toLowerCase());
        return matchesMes && matchesBusca;
    });

    if (pastasFiltradas.length === 0) {
        container.innerHTML = `
            <div class="sem-resultados">
                <div class="emoji-triste">🔍</div>
                <p>Nenhuma pasta encontrada para "${buscaAtual}".</p>
                <button class="btn-limpar-busca" onclick="limparFiltros()">Limpar busca</button>
            </div>
        `;
        return;
    }

    container.innerHTML = pastasFiltradas.map(pasta => {
        const totalItems = pasta.total + (pasta.totalVideos || 0);
        const videoBadge = pasta.totalVideos ? `<span class="badge-video">🎥 ${pasta.totalVideos}</span>` : '';
        const capaImg = `./assets/${pasta.id}_1.jpg`;

        return `
            <div class="pasta-card" onclick="abrirPasta('${pasta.id}')" data-id="${pasta.id}">
                <div class="pasta-capa-wrapper">
                    <img class="pasta-capa" src="${capaImg}" alt="${pasta.titulo}" loading="lazy" onerror="this.style.display='none'">
                    <div class="pasta-capa-overlay"></div>
                    <div class="pasta-badge-count">
                        <span>📸 ${pasta.total}</span>
                        ${videoBadge}
                    </div>
                </div>
                <div class="pasta-info">
                    <h3>${pasta.titulo}</h3>
                    <p class="pasta-subtitle">${totalItems} ${totalItems === 1 ? 'lembrança' : 'lembranças'}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Configura filtros de meses
function configurarFiltrosMeses() {
    const container = document.getElementById('meses-filtro');
    if (!container) return;

    const meses = [
        { id: 'todos', label: 'Todos' },
        { id: 'especiais', label: '💖 Especiais' },
        { id: 'agosto', label: 'Agosto' },
        { id: 'julho', label: 'Julho' },
        { id: 'junho', label: 'Junho' },
        { id: 'maio', label: 'Maio' },
        { id: 'abril', label: 'Abril' },
        { id: 'marco', label: 'Março' },
        { id: 'fevereiro', label: 'Fevereiro' }
    ];

    container.innerHTML = meses.map(m => `
        <button class="btn-filtro-mes ${m.id === filtroMesAtual ? 'ativo' : ''}" onclick="filtrarPorMes('${m.id}')">
            ${m.label}
        </button>
    `).join('');
}

function filtrarPorMes(mesId) {
    filtroMesAtual = mesId;
    configurarFiltrosMeses();
    gerarPastasGrid();
}

function filtrarPorBusca(termo) {
    buscaAtual = termo.trim();
    gerarPastasGrid();
}

function limparFiltros() {
    filtroMesAtual = 'todos';
    buscaAtual = '';
    const input = document.getElementById('input-busca');
    if (input) input.value = '';
    configurarFiltrosMeses();
    gerarPastasGrid();
}

// Gera o HTML de todas as galerias
function gerarGalerias() {
    const container = document.getElementById('galerias-container');
    if (!container) return;

    container.innerHTML = configuracaoPastas.map(pasta => {
        const fotosHTML = Array.from({ length: pasta.total }, (_, i) => {
            const num = i + 1;
            const nomeArquivo = `${pasta.id}_${num}.jpg`;
            return `
                <div class="foto-item" data-pasta="${pasta.id}" data-index="${i}">
                    <div class="foto-skeleton"></div>
                    <img src="./assets/${nomeArquivo}" alt="${pasta.titulo} - Foto ${num}" loading="lazy" onload="this.classList.add('loaded'); if(this.previousElementSibling) this.previousElementSibling.style.display='none';" onerror="this.closest('.foto-item').style.display='none'">
                </div>
            `;
        }).join('');

        const videosHTML = pasta.totalVideos ? Array.from({ length: pasta.totalVideos }, (_, i) => {
            const num = i + pasta.total + 1;
            const nomeArquivo = `${pasta.id}_${num}.mp4`;
            return `
                <div class="foto-item video-item" data-pasta="${pasta.id}" data-index="${pasta.total + i}">
                    <div class="foto-skeleton"></div>
                    <video src="./assets/${nomeArquivo}" preload="metadata" muted playsinline onloadeddata="this.classList.add('loaded'); if(this.previousElementSibling) this.previousElementSibling.style.display='none';" onerror="this.closest('.foto-item').style.display='none'"></video>
                    <div class="video-play-icon">▶</div>
                </div>
            `;
        }).join('') : '';

        const totalGeral = pasta.total + (pasta.totalVideos || 0);

        return `
            <div class="galeria-section" id="galeria-${pasta.id}" style="display:none;">
                <div class="galeria-sticky-header">
                    <button class="btn-voltar-galeria" onclick="fecharGaleria()">
                        <span class="seta-voltar">←</span> Voltar
                    </button>
                    <div class="galeria-header-info">
                        <h2>${pasta.titulo}</h2>
                        <span class="galeria-count-pill">${totalGeral} ${totalGeral === 1 ? 'mídia' : 'mídias'}</span>
                    </div>
                </div>

                <div class="fotos-grid">${fotosHTML}${videosHTML}</div>

                <div class="secao-memorias">
                    <div class="memorias-header">
                        <span class="memorias-icone">💌</span>
                        <h2>Memórias deste dia</h2>
                        <p class="memorias-sub">Guarde os sentimentos e histórias inesquecíveis que vivemos aqui.</p>
                    </div>
                    <div class="emojis-reacao-rapida">
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '😍')">😍</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '🥰')">🥰</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '💕')">💕</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '✨')">✨</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '💍')">💍</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '🌹')">🌹</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '🥺')">🥺</button>
                        <button type="button" class="btn-emoji-rapido" onclick="inserirEmoji('${pasta.id}', '👑')">👑</button>
                    </div>
                    <textarea class="textarea-memorias" id="memoria-${pasta.id}" placeholder="Escreva aqui o que tornou esse dia especial para nós dois..."></textarea>
                    <button class="btn-salvar-memoria" onclick="salvarMemoria('${pasta.id}')">
                        <span>💖</span> Salvar Memória
                    </button>
                    <div class="memoria-salva" id="memoria-salva-${pasta.id}" style="display:none;">
                        <div class="memoria-salva-badge">✨ Memória Guardada no Coração</div>
                        <p class="memoria-salva-texto"></p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Delegação de evento para cliques rápidos nas fotos
    container.addEventListener('click', (e) => {
        const fotoItem = e.target.closest('.foto-item');
        if (!fotoItem) return;
        const pastaId = fotoItem.dataset.pasta;
        const indice = parseInt(fotoItem.dataset.index, 10);
        if (pastaId != null && !isNaN(indice)) abrirModal(pastaId, indice);
    });
}

function inserirEmoji(pastaId, emoji) {
    const textarea = document.getElementById(`memoria-${pastaId}`);
    if (textarea) {
        textarea.value += (textarea.value.length && !textarea.value.endsWith(' ') ? ' ' : '') + emoji;
        textarea.focus();
    }
}

function abrirPasta(pastaId, salvarEstado = true) {
    const controlesGrid = document.getElementById('controles-filtros');
    const pastasGrid = document.getElementById('pastas-grid');
    const acervoHeader = document.querySelector('.acervo-header');
    
    if (controlesGrid) controlesGrid.style.display = 'none';
    if (pastasGrid) pastasGrid.style.display = 'none';
    if (acervoHeader) acervoHeader.style.display = 'none';

    document.querySelectorAll('.galeria-section').forEach(g => {
        g.style.display = 'none';
        g.classList.remove('ativa');
    });

    const galeria = document.getElementById(`galeria-${pastaId}`);
    if (galeria) {
        galeria.style.display = 'block';
        requestAnimationFrame(() => galeria.classList.add('ativa'));
        carregarMemoria(pastaId);
        if (salvarEstado) localStorage.setItem('pastaAberta', pastaId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fecharGaleria() {
    document.querySelectorAll('.galeria-section').forEach(g => {
        g.style.display = 'none';
        g.classList.remove('ativa');
    });

    const controlesGrid = document.getElementById('controles-filtros');
    const pastasGrid = document.getElementById('pastas-grid');
    const acervoHeader = document.querySelector('.acervo-header');

    if (controlesGrid) controlesGrid.style.display = 'flex';
    if (pastasGrid) pastasGrid.style.display = 'grid';
    if (acervoHeader) acervoHeader.style.display = 'block';

    localStorage.removeItem('pastaAberta');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* LIGHTBOX / MODAL PREMIUM */
function abrirModal(pastaId, indice) {
    const pasta = configuracaoPastas.find(p => p.id === pastaId);
    if (!pasta) return;

    fotosAtuais = [];
    for (let i = 0; i < pasta.total; i++) {
        fotosAtuais.push({
            src: `./assets/${pasta.id}_${i + 1}.jpg`,
            alt: `${pasta.titulo} • Foto ${i + 1} de ${pasta.total}`,
            tipo: 'img'
        });
    }
    if (pasta.totalVideos) {
        for (let i = 0; i < pasta.totalVideos; i++) {
            fotosAtuais.push({
                src: `./assets/${pasta.id}_${pasta.total + i + 1}.mp4`,
                alt: `${pasta.titulo} • Vídeo ${i + 1}`,
                tipo: 'video'
            });
        }
    }

    indiceAtual = indice;
    atualizarModal();
    const modal = document.getElementById('modal-fotos');
    modal.classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function mudarFoto(direcao) {
    if (!fotosAtuais || fotosAtuais.length === 0) return;
    indiceAtual += direcao;
    if (indiceAtual < 0) indiceAtual = fotosAtuais.length - 1;
    if (indiceAtual >= fotosAtuais.length) indiceAtual = 0;
    atualizarModal();
}

function atualizarModal() {
    const img = document.getElementById('img-modal');
    const videoModal = document.getElementById('video-modal');
    const legenda = document.getElementById('legenda-modal');
    const contador = document.getElementById('contador-modal');

    if (fotosAtuais.length > 0) {
        const item = fotosAtuais[indiceAtual];
        if (item.tipo === 'video') {
            img.style.display = 'none';
            if (!videoModal) {
                const v = document.createElement('video');
                v.id = 'video-modal';
                v.controls = true;
                v.autoplay = true;
                v.playsInline = true;
                v.className = 'midia-modal';
                img.parentNode.insertBefore(v, img);
            }
            const vm = document.getElementById('video-modal');
            vm.src = item.src;
            vm.style.display = 'block';
            vm.play().catch(() => {});
        } else {
            if (videoModal) {
                videoModal.pause();
                videoModal.removeAttribute('src');
                videoModal.style.display = 'none';
            }
            img.style.display = 'block';
            img.src = item.src;
            img.alt = item.alt;
        }

        if (legenda) legenda.textContent = item.alt;
        if (contador) contador.textContent = `${indiceAtual + 1} / ${fotosAtuais.length}`;

        // Preload next and previous images for instantaneous swipe response
        [-1, 1, 2].forEach(offset => {
            const idx = indiceAtual + offset;
            if (idx >= 0 && idx < fotosAtuais.length && fotosAtuais[idx].tipo === 'img') {
                const preloader = new Image();
                preloader.src = fotosAtuais[idx].src;
            }
        });
    }
}

function fecharModal() {
    const vm = document.getElementById('video-modal');
    if (vm) {
        vm.pause();
        vm.removeAttribute('src');
        vm.load();
    }
    const modal = document.getElementById('modal-fotos');
    modal.classList.remove('aberto');
    document.body.style.overflow = '';
    fotosAtuais = [];
    indiceAtual = 0;
}

// Teclado
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('modal-fotos').classList.contains('aberto')) return;
    if (e.key === 'ArrowLeft') mudarFoto(-1);
    if (e.key === 'ArrowRight') mudarFoto(1);
    if (e.key === 'Escape') fecharModal();
});

// Suporte a Swipe no Modal para Mobile
(function () {
    let touchStartX = 0;
    let touchStartY = 0;
    const modal = document.getElementById('modal-fotos');

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].screenX - touchStartX;
        const diffY = e.changedTouches[0].screenY - touchStartY;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) mudarFoto(-1);
            else mudarFoto(1);
        } else if (diffY > 90 && Math.abs(diffY) > Math.abs(diffX)) {
            fecharModal();
        }
    }, { passive: true });
})();

// Sistema de Memórias
function salvarMemoria(pastaId) {
    const textarea = document.getElementById(`memoria-${pastaId}`);
    const memoria = textarea.value.trim();
    const memoriaSalvaDiv = document.getElementById(`memoria-salva-${pastaId}`);
    const memoriaTexto = memoriaSalvaDiv.querySelector('.memoria-salva-texto');

    if (memoria) {
        localStorage.setItem(`memoria-${pastaId}`, memoria);
        memoriaTexto.textContent = memoria;
        memoriaSalvaDiv.style.display = 'block';

        const btn = document.querySelector(`#galeria-${pastaId} .btn-salvar-memoria`);
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<span>✅</span> Salvo com Amor!';
        btn.classList.add('salvo');

        setTimeout(() => {
            btn.innerHTML = textoOriginal;
            btn.classList.remove('salvo');
        }, 2500);
    }
}

function carregarMemoria(pastaId) {
    const memoriaSalva = localStorage.getItem(`memoria-${pastaId}`);
    const textarea = document.getElementById(`memoria-${pastaId}`);
    const memoriaSalvaDiv = document.getElementById(`memoria-salva-${pastaId}`);
    const memoriaTexto = memoriaSalvaDiv.querySelector('.memoria-salva-texto');

    if (memoriaSalva) {
        textarea.value = memoriaSalva;
        memoriaTexto.textContent = memoriaSalva;
        memoriaSalvaDiv.style.display = 'block';
    } else {
        textarea.value = '';
        memoriaSalvaDiv.style.display = 'none';
    }
}

function restaurarEstado() {
    const pastaAberta = localStorage.getItem('pastaAberta');
    if (pastaAberta) {
        const galeria = document.getElementById(`galeria-${pastaAberta}`);
        if (galeria) {
            abrirPasta(pastaAberta, false);
            return;
        }
    }
    const pastasGrid = document.getElementById('pastas-grid');
    if (pastasGrid) pastasGrid.style.display = 'grid';
}

// Botão Scroll to Top
function configurarScrollTop() {
    const btnScroll = document.createElement('button');
    btnScroll.className = 'btn-scroll-top';
    btnScroll.innerHTML = '↑';
    btnScroll.title = 'Voltar ao topo';
    btnScroll.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btnScroll);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            btnScroll.classList.add('visivel');
        } else {
            btnScroll.classList.remove('visivel');
        }
    }, { passive: true });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarEstatisticas();
    configurarFiltrosMeses();
    gerarPastasGrid();
    gerarGalerias();
    configurarScrollTop();
    restaurarEstado();

    const inputBusca = document.getElementById('input-busca');
    const btnLimparInput = document.getElementById('btn-limpar-busca-input');

    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            const val = e.target.value;
            if (btnLimparInput) {
                btnLimparInput.style.display = val.trim().length > 0 ? 'flex' : 'none';
            }
            filtrarPorBusca(val);
        });
    }

    if (btnLimparInput && inputBusca) {
        btnLimparInput.addEventListener('click', () => {
            inputBusca.value = '';
            btnLimparInput.style.display = 'none';
            filtrarPorBusca('');
            inputBusca.focus();
        });
    }
});