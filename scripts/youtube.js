const API_KEY = CONFIG.YOUTUBE_API_KEY;
const CHANNEL_ID = CONFIG.YOUTUBE_CHANNEL_ID;

document.addEventListener("DOMContentLoaded", () => {
    verificarLive();
    carregarUltimoVideo();
});

async function verificarLive() {
    
    const container = document.getElementById("youtubeLiveContainer");

    if (!container) return;
    container.innerHTML = "<p>🔍 Verificando transmissões...</p>";
    try {
        const url =
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&eventType=live&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.items && dados.items.length > 0) {
            const live = dados.items[0];
            container.innerHTML = `
                <div class="youtube-live">
                    <h3>🔴 AO VIVO AGORA</h3>
                    <img
                        src="${live.snippet.thumbnails.high.url}"
                        class="youtube-thumb"
                        alt="${live.snippet.title}">
                    <h4>${live.snippet.title}</h4>
                    <br>
                    <a
                        href="https://www.youtube.com/watch?v=${live.id.videoId}"
                        target="_blank">
                        <button>Assistir Agora</button>
                    </a>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="youtube-offline">
                    <h3>⚫ Nenhuma live no momento.</h3>
                </div>
            `;
        }
    } catch (erro) {
        console.error(erro);
        container.innerHTML = `
            <p>Não foi possível verificar a live.</p>
        `;
    }
}

async function carregarUltimoVideo() {
    const container = document.getElementById("youtubeContainer");
    container.innerHTML = "<p>📺 Carregando último vídeo...</p>";

    try {
        const url =
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&type=video&key=${API_KEY}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (!dados.items || dados.items.length === 0) {
            container.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
            return;
        }

        const video = dados.items[0];
        const videoId = video.id.videoId;
        carregarDetalhesVideo(videoId, video.snippet);
    }
    catch (erro) {
        console.error(erro);

        container.innerHTML = `
            <p>Erro ao carregar o último vídeo.</p>
        `;
    }
}

async function carregarDetalhesVideo(videoId, snippet) {

    const container = document.getElementById("youtubeContainer");
    try {
        const url =
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const stats = dados.items[0].statistics;
        const visualizacoes = formatarNumero(stats.viewCount);
        const curtidas = stats.likeCount
            ? formatarNumero(stats.likeCount)
            : "Ocultas";
        const data = formatarData(snippet.publishedAt);
        const descricao =
            snippet.description.length > 180
                ? snippet.description.substring(0, 180) + "..."
                : snippet.description;
        container.innerHTML = `
            <div class="youtube-card">
                <img
                    src="${snippet.thumbnails.high.url}"
                    class="youtube-thumb"
                    alt="${snippet.title}">
                <div class="youtube-info">
                    <h3>${snippet.title}</h3>
                    <p>${descricao}</p>
                    <p><strong>📅 Publicado:</strong> ${data}</p>
                    <p><strong>👁️ Visualizações:</strong> ${visualizacoes}</p>
                    <p><strong>👍 Curtidas:</strong> ${curtidas}</p>
                    <br>
                    <a
                        href="https://www.youtube.com/watch?v=${videoId}"
                        target="_blank">
                        <button>
                            Assistir no YouTube
                        </button>
                    </a>
                </div>
            </div>
        `;
    }
    catch (erro) {
        console.error(erro);
    }
}

function formatarData(dataISO) {
    return new Date(dataISO).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

function formatarNumero(numero) {
    return Number(numero).toLocaleString("pt-BR");
}