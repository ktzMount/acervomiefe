const configuracaoPastas=[
    {id:'fe',titulo:'Mural da beleza do Gatinho',total:1},
    {id:'mi',titulo:'Mural da beleza da Princesa',total:2},
    {id:'aleatorios',titulo:'Aleatórios',total:9,totalVideos:7},
    {id:'23-maio',titulo:'23 de Maio',total:35},
    {id:'22-maio',titulo:'22 de Maio',total:4},
    {id:'18-maio',titulo:'18 de Maio',total:8},
    {id:'17-maio',titulo:'17 de Maio',total:44},
    {id:'15-maio',titulo:'15 de Maio',total:1},
    {id:'12-maio',titulo:'12 de Maio',total:6},
    {id:'11-maio',titulo:'11 de Maio',total:14},
    {id:'9-maio',titulo:'9 de Maio',total:5},
    {id:'8-maio',titulo:'8 de Maio',total:38},
    {id:'6-maio',titulo:'6 de Maio',total:5},
    {id:'4-maio',titulo:'4 de Maio',total:1},
    {id:'3-maio',titulo:'3 de Maio',total:1},
    {id:'29-abril',titulo:'29 de Abril',total:12},
    {id:'28-abril',titulo:'28 de Abril',total:19},
    {id:'27-abril',titulo:'27 de Abril',total:7},
    {id:'26-abril',titulo:'26 de Abril',total:16},
    {id:'25-abril',titulo:'25 de Abril',total:8},
    {id:'24-abril',titulo:'24 de Abril',total:30},
    {id:'22-abril',titulo:'22 de Abril',total:8},
    {id:'1-abril',titulo:'1 de Abril',total:1},
    {id:'31-marco',titulo:'31 de Março',total:1},
    {id:'26-marco',titulo:'26 de Março',total:5},
    {id:'24-marco',titulo:'24 de Março',total:1},
    {id:'21-fevereiro',titulo:'21 de Fevereiro',total:2}
];

let fotosAtuais=[];
let indiceAtual=0;

function gerarPastasGrid(){
    const container=document.getElementById('pastas-grid');
    if(!container)return;
    container.innerHTML=configuracaoPastas.map(pasta=>`
        <div class="pasta-card" onclick="abrirPasta('${pasta.id}')">
            <div class="pasta-icon">📁</div>
            <h3>${pasta.titulo}</h3>
            <p class="foto-count">${pasta.total+(pasta.totalVideos||0)} ${(pasta.total+(pasta.totalVideos||0))===1?'foto':'fotos'}</p>
        </div>
    `).join('');
}

function gerarGalerias(){
    const container=document.getElementById('galerias-container');
    if(!container)return;
    container.innerHTML=configuracaoPastas.map(pasta=>{
        const fotosHTML=Array.from({length:pasta.total},(_,i)=>{
            const num=i+1;
            const nomeArquivo=`${pasta.id}_${num}.jpg`;
            return `<div class="foto-item" data-pasta="${pasta.id}" data-index="${i}">
                <img src="./assets/${nomeArquivo}" alt="${pasta.titulo} - Foto ${num}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.closest('.foto-item').style.display='none'">
            </div>`;
        }).join('');
        const videosHTML=pasta.totalVideos?Array.from({length:pasta.totalVideos},(_,i)=>{
            const num=i+pasta.total+1;
            const nomeArquivo=`${pasta.id}_${num}.mp4`;
            return `<div class="foto-item video-item" data-pasta="${pasta.id}" data-index="${pasta.total+i}">
                <video src="./assets/${nomeArquivo}" preload="metadata" muted playsinline onloadeddata="this.classList.add('loaded')" onerror="this.closest('.foto-item').style.display='none'"></video>
                <div class="video-play-icon">▶</div>
            </div>`;
        }).join(''):'';
        return `<div class="galeria-section" id="galeria-${pasta.id}" style="display:none;">
            <div class="galeria-header">
                <button class="btn-voltar-galeria" onclick="fecharGaleria()">Voltar</button>
                <h2>${pasta.titulo}</h2>
            </div>
            <div class="fotos-grid">${fotosHTML}${videosHTML}</div>
            <div class="secao-memorias">
                <h2>Memórias deste dia</h2>
                <textarea class="textarea-memorias" id="memoria-${pasta.id}" placeholder="Escreva aqui o que tornou esse dia especial..."></textarea>
                <button class="btn-salvar-memoria" onclick="salvarMemoria('${pasta.id}')">Salvar Memória</button>
                <div class="memoria-salva" id="memoria-salva-${pasta.id}" style="display:none;">
                    <h3>Memória Guardada:</h3>
                    <p class="memoria-salva-texto"></p>
                </div>
            </div>
        </div>`;
    }).join('');

    /* Delegação de evento — Fix #1: evita listeners empilhados */
    container.addEventListener('click',(e)=>{
        const fotoItem=e.target.closest('.foto-item');
        if(!fotoItem) return;
        const pastaId=fotoItem.dataset.pasta;
        const indice=parseInt(fotoItem.dataset.index,10);
        if(pastaId!=null && !isNaN(indice)) abrirModal(pastaId,indice);
    });
}

function abrirPasta(pastaId,salvarEstado=true){
    const pastasGrid=document.getElementById('pastas-grid');
    if(pastasGrid)pastasGrid.style.display='none';
    document.querySelectorAll('.galeria-section').forEach(g=>{
        g.style.display='none';
        g.classList.remove('ativa');
    });
    const galeria=document.getElementById(`galeria-${pastaId}`);
    if(galeria){
        galeria.style.display='block';
        setTimeout(()=>galeria.classList.add('ativa'),10);
        carregarMemoria(pastaId);
        if(salvarEstado) localStorage.setItem('pastaAberta',pastaId);
    }
    window.scrollTo({top:0,behavior:'smooth'});
}

function fecharGaleria(){
    document.querySelectorAll('.galeria-section').forEach(g=>{
        g.style.display='none';
        g.classList.remove('ativa');
    });
    const pastasGrid=document.getElementById('pastas-grid');
    if(pastasGrid)pastasGrid.style.display='grid';
    localStorage.removeItem('pastaAberta');
    window.scrollTo({top:0,behavior:'smooth'});
}

/* adicionarEventosFotos removida — substituída por delegação de evento em gerarGalerias */

/* MODAL VANILLA */
function abrirModal(pastaId,indice){
    const galeria=document.getElementById(`galeria-${pastaId}`);
    if(!galeria)return;
    const pasta=configuracaoPastas.find(p=>p.id===pastaId);
    if(!pasta)return;

    fotosAtuais=[];
    for(let i=0;i<pasta.total;i++){
        fotosAtuais.push({
            src:`./assets/${pasta.id}_${i+1}.jpg`,
            alt:`${pasta.titulo} - Foto ${i+1}`,
            tipo:'img'
        });
    }
    if(pasta.totalVideos){
        for(let i=0;i<pasta.totalVideos;i++){
            fotosAtuais.push({
                src:`./assets/${pasta.id}_${pasta.total+i+1}.mp4`,
                alt:`${pasta.titulo} - Vídeo ${i+1}`,
                tipo:'video'
            });
        }
    }

    indiceAtual=indice;
    atualizarModal();
    document.getElementById('modal-fotos').classList.add('aberto');
    document.body.style.overflow='hidden';
}

function mudarFoto(direcao){
    indiceAtual+=direcao;
    if(indiceAtual<0) indiceAtual=fotosAtuais.length-1;
    if(indiceAtual>=fotosAtuais.length) indiceAtual=0;
    atualizarModal();
}

function atualizarModal(){
    const img=document.getElementById('img-modal');
    const videoModal=document.getElementById('video-modal');
    const legenda=document.getElementById('legenda-modal');
    if(fotosAtuais.length>0){
        const item=fotosAtuais[indiceAtual];
        if(item.tipo==='video'){
            img.style.display='none';
            if(!videoModal){
                const v=document.createElement('video');
                v.id='video-modal';
                v.controls=true;
                v.autoplay=true;
                v.style.maxWidth='90vw';
                v.style.maxHeight='80vh';
                v.style.borderRadius='10px';
                v.style.boxShadow='0 0 30px rgba(255,20,147,0.3)';
                img.parentNode.insertBefore(v,img);
            }
            const vm=document.getElementById('video-modal');
            vm.src=item.src;
            vm.style.display='block';
        }else{
            img.style.display='block';
            img.src=item.src;
            img.alt=item.alt;
            if(videoModal) {
                videoModal.pause();
                videoModal.style.display='none';
            }
        }
        legenda.textContent=item.alt;
        const contador=document.getElementById('contador-modal');
        if(contador) contador.textContent=`${indiceAtual+1} / ${fotosAtuais.length}`;
    }
}

function fecharModal(){
    const vm=document.getElementById('video-modal');
    if(vm){vm.pause();vm.removeAttribute('src');vm.load();}
    document.getElementById('modal-fotos').classList.remove('aberto');
    document.body.style.overflow='';
    fotosAtuais=[];
    indiceAtual=0;
}

document.addEventListener('keydown',(e)=>{
    if(!document.getElementById('modal-fotos').classList.contains('aberto')) return;
    if(e.key==='ArrowLeft') mudarFoto(-1);
    if(e.key==='ArrowRight') mudarFoto(1);
    if(e.key==='Escape') fecharModal();
});

/* Fix #4: suporte a swipe no modal para mobile */
(function(){
    let touchStartX=0;
    const modal=document.getElementById('modal-fotos');
    modal.addEventListener('touchstart',(e)=>{
        touchStartX=e.changedTouches[0].screenX;
    },{passive:true});
    modal.addEventListener('touchend',(e)=>{
        const diff=e.changedTouches[0].screenX-touchStartX;
        if(Math.abs(diff)>50){
            if(diff>0) mudarFoto(-1);
            else mudarFoto(1);
        }
    },{passive:true});
})();

function salvarMemoria(pastaId){
    const textarea=document.getElementById(`memoria-${pastaId}`);
    const memoria=textarea.value.trim();
    const memoriaSalvaDiv=document.getElementById(`memoria-salva-${pastaId}`);
    const memoriaTexto=memoriaSalvaDiv.querySelector('.memoria-salva-texto');
    if(memoria){
        localStorage.setItem(`memoria-${pastaId}`,memoria);
        memoriaTexto.textContent=memoria;
        memoriaSalvaDiv.style.display='block';
        const btn=document.querySelector(`#galeria-${pastaId} .btn-salvar-memoria`);
        const textoOriginal=btn.textContent;
        btn.textContent='Salvo!';
        btn.style.background='linear-gradient(135deg,#4CAF50,#45a049)';
        setTimeout(()=>{
            btn.textContent=textoOriginal;
            btn.style.background='linear-gradient(135deg,#ff1493,#ff69b4)';
        },2000);
    }
}

function carregarMemoria(pastaId){
    const memoriaSalva=localStorage.getItem(`memoria-${pastaId}`);
    const textarea=document.getElementById(`memoria-${pastaId}`);
    const memoriaSalvaDiv=document.getElementById(`memoria-salva-${pastaId}`);
    const memoriaTexto=memoriaSalvaDiv.querySelector('.memoria-salva-texto');
    if(memoriaSalva){
        textarea.value=memoriaSalva;
        memoriaTexto.textContent=memoriaSalva;
        memoriaSalvaDiv.style.display='block';
    }else{
        textarea.value='';
        memoriaSalvaDiv.style.display='none';
    }
}

function restaurarEstado(){
    const pastaAberta=localStorage.getItem('pastaAberta');
    if(pastaAberta){
        const galeria=document.getElementById(`galeria-${pastaAberta}`);
        if(galeria){
            // Mostra o grid de pastas primeiro
            const pastasGrid=document.getElementById('pastas-grid');
            if(pastasGrid) pastasGrid.style.display='grid';
            
            // Depois abre a galeria
            abrirPasta(pastaAberta,false);
        }
    }else{
        // Garante que o grid de pastas esteja visível
        const pastasGrid=document.getElementById('pastas-grid');
        if(pastasGrid) pastasGrid.style.display='grid';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    console.log('Iniciando acervo...');
    gerarPastasGrid();
    gerarGalerias();
    document.querySelectorAll('.galeria-section').forEach(g=>g.style.display='none');
    restaurarEstado();
    console.log('Acervo carregado! Pastas:',configuracaoPastas.length);
});