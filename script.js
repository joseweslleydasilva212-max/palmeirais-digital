/* =====================================================
   TRANSIÇÃO ENTRE PÁGINAS
===================================================== */

document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("page-ready");
});

document.addEventListener("click", function(event) {
    const link = event.target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return;
    }

    const samePage = href.startsWith("./") || href.startsWith("/") || href.endsWith(".html") || href.endsWith("/");

    if (!samePage) return;

    if (link.target === "_blank") return;

    event.preventDefault();
    document.body.classList.add("page-leaving");

    setTimeout(function() {
        window.location.href = href;
    }, 180);
});

/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("show");

    });

}


/* =====================================================
   FORMULÁRIO
===================================================== */

const reportForm =
    document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const message =
            document.getElementById("formMessage");

        message.textContent =
            "✓ Relato registrado nesta versão demonstrativa. Para salvar os dados de verdade, será necessário conectar o formulário a um banco de dados.";

        message.style.color = "#087ead";

        reportForm.reset();

    });

}


/* =====================================================
   MAPA
===================================================== */

const mapElement =
    document.getElementById("map");


if (mapElement && typeof L !== "undefined") {

    /*
        Coordenadas aproximadas de Palmeirais.

        Os marcadores abaixo são APENAS demonstrativos.
        Eles não representam problemas reais.
    */

    const palmeirais = [-5.9789, -43.0638];


    const map =
        L.map("map", {
            zoomControl: true,
            scrollWheelZoom: true
        }).setView(
            palmeirais,
            14
        );


    const osmLayer = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors",
            maxZoom: 19,
            crossOrigin: true
        }
    );

    const cartoLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
            subdomains: "abcd",
            maxZoom: 20,
            attribution:
                "&copy; OpenStreetMap contributors &copy; CARTO",
            crossOrigin: true
        }
    );

    let fallbackUsado = false;

    osmLayer.on("tileerror", function() {
        if (!fallbackUsado) {
            fallbackUsado = true;
            map.addLayer(cartoLayer);
            map.removeLayer(osmLayer);
        }
    });

    osmLayer.addTo(map);

    setTimeout(function() {
        map.invalidateSize();
    }, 150);

    window.addEventListener("load", function() {
        map.invalidateSize();
    });

    window.addEventListener("resize", function() {
        map.invalidateSize();
    });


    const pontos = [

        {
            lat: -5.975,
            lng: -43.067,
            color: "#ef4444",
            title: "Falta de água",
            text:
                "Dados a serem preenchidos pela comunidade/prefeitura."
        },

        {
            lat: -5.981,
            lng: -43.060,
            color: "#f97316",
            title: "Problema de esgoto",
            text:
                "Dados a serem preenchidos pela comunidade/prefeitura."
        },

        {
            lat: -5.978,
            lng: -43.055,
            color: "#eab308",
            title: "Necessidade de saneamento",
            text:
                "Dados a serem preenchidos pela comunidade/prefeitura."
        },

        {
            lat: -5.985,
            lng: -43.070,
            color: "#22c55e",
            title: "Área atendida",
            text:
                "Dados a serem preenchidos pela comunidade/prefeitura."
        }

    ];


    pontos.forEach(ponto => {

        L.circleMarker(
            [
                ponto.lat,
                ponto.lng
            ],
            {

                radius: 10,

                fillColor:
                    ponto.color,

                color: "#ffffff",

                weight: 3,

                fillOpacity: .9

            }

        )
        .addTo(map)

        .bindPopup(`

            <div>

                <h3>
                    ${ponto.title}
                </h3>

                <p>
                    <strong>Local:</strong>
                    Dados a serem preenchidos.
                </p>

                <p>
                    <strong>Descrição:</strong>
                    ${ponto.text}
                </p>

            </div>

        `);

    });

}


/* =====================================================
   MAPA DO PAINEL
===================================================== */

const dashboardElement =
    document.getElementById("dashboardMap");


if (
    dashboardElement &&
    typeof L !== "undefined"
) {

    const palmeirais =
        [-5.9789, -43.0638];


    const dashboardMap =
        L.map("dashboardMap", {
            zoomControl: true,
            scrollWheelZoom: true
        })
        .setView(
            palmeirais,
            14
        );


    const osmDashboardLayer = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors",
            maxZoom: 19,
            crossOrigin: true
        }
    );

    const cartoDashboardLayer = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
            subdomains: "abcd",
            maxZoom: 20,
            attribution:
                "&copy; OpenStreetMap contributors &copy; CARTO",
            crossOrigin: true
        }
    );

    let dashboardFallbackUsado = false;

    osmDashboardLayer.on("tileerror", function() {
        if (!dashboardFallbackUsado) {
            dashboardFallbackUsado = true;
            dashboardMap.addLayer(cartoDashboardLayer);
            dashboardMap.removeLayer(osmDashboardLayer);
        }
    });

    osmDashboardLayer.addTo(dashboardMap);

    setTimeout(function() {
        dashboardMap.invalidateSize();
    }, 150);

    window.addEventListener("load", function() {
        dashboardMap.invalidateSize();
    });

    window.addEventListener("resize", function() {
        dashboardMap.invalidateSize();
    });


    const pontos = [

        [-5.975, -43.067, "#ef4444", "Falta de água"],

        [-5.981, -43.060, "#f97316", "Problema de esgoto"],

        [-5.978, -43.055, "#eab308", "Necessidade de saneamento"],

        [-5.985, -43.070, "#22c55e", "Área atendida"]

    ];


    pontos.forEach(ponto => {

        L.circleMarker(
            [ponto[0], ponto[1]],
            {

                radius: 9,

                fillColor: ponto[2],

                color: "#ffffff",

                weight: 3,

                fillOpacity: .9

            }

        )
        .addTo(dashboardMap)

        .bindPopup(`

            <strong>
                ${ponto[3]}
            </strong>

            <br><br>

            Dados demonstrativos.

            <br>

            Os dados reais serão adicionados
            posteriormente.

        `);

    });

}

// ======================================
// SISTEMA DE DENÚNCIAS
// ======================================

let denuncias = JSON.parse(
    localStorage.getItem("denuncias")
) || [];

function sincronizarDenuncias() {
    try {
        denuncias = JSON.parse(
            localStorage.getItem("denuncias") || "[]"
        );
    } catch (error) {
        denuncias = [];
    }

    atualizarEstatisticasAgua();
}

function normalizarTextoParaBusca(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function isProblemaAgua(tipo) {
    if (!tipo) return false;

    const valor = normalizarTextoParaBusca(tipo);

    return valor.includes("agua") ||
        valor.includes("abastecimento") ||
        valor.includes("vazamento") ||
        valor.includes("interrup") ||
        valor.includes("reserv");
}

function formatarNumero(valor) {
    return String(valor).padStart(2, "0");
}

function converterDataRelato(data) {
    const partes = String(data || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!partes) return null;

    const dataConvertida = new Date(Number(partes[3]), Number(partes[2]) - 1, Number(partes[1]));
    dataConvertida.setHours(0, 0, 0, 0);
    return Number.isNaN(dataConvertida.getTime()) ? null : dataConvertida;
}

let aguaGraficoAnimacaoInicial = true;

function renderizarGraficoAgua(relatos) {
    const chart = document.getElementById("aguaChart");
    if (!chart) return;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dias = Array.from({ length: 7 }, function(_, indice) {
        const data = new Date(hoje);
        data.setDate(hoje.getDate() - (6 - indice));
        return data;
    });
    const contagens = dias.map(function(dia) {
        return relatos.filter(function(relato) {
            const dataRelato = converterDataRelato(relato.data);
            return dataRelato && dataRelato.getTime() === dia.getTime();
        }).length;
    });
    const assinaturaDados = dias.map(dia => dia.getTime()).join(",") + ":" + contagens.join(",");
    if (chart.dataset.serieAgua === assinaturaDados) return;

    const inicioX = 48;
    const fimX = 690;
    const topoY = 18;
    const baseY = 184;
    const maiorValor = Math.max(4, Math.ceil(Math.max(...contagens) / 4) * 4);
    const pontos = contagens.map(function(valor, indice) {
        return {
            x: inicioX + (fimX - inicioX) * indice / 6,
            y: baseY - valor / maiorValor * (baseY - topoY),
            valor: valor
        };
    });
    const linha = pontos.map(function(ponto, indice) {
        return (indice === 0 ? "M" : "L") + ponto.x.toFixed(1) + " " + ponto.y.toFixed(1);
    }).join(" ");
    const area = linha + " L " + fimX + " " + baseY + " L " + inicioX + " " + baseY + " Z";
    const linhasGrade = Array.from({ length: 5 }, function(_, indice) {
        const valor = maiorValor * (4 - indice) / 4;
        const y = topoY + (baseY - topoY) * indice / 4;
        return '<line class="agua-chart-grid" x1="' + inicioX + '" y1="' + y + '" x2="' + fimX + '" y2="' + y + '"></line>' +
            '<text class="agua-chart-axis" x="' + (inicioX - 10) + '" y="' + (y + 4) + '" text-anchor="end">' + valor + '</text>';
    }).join("");
    const marcacoesDia = dias.map(function(dia, indice) {
        const x = pontos[indice].x;
        const rotulo = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(dia).replace(".", "");
        return '<line class="agua-chart-grid" x1="' + x + '" y1="' + topoY + '" x2="' + x + '" y2="' + baseY + '" opacity=".55"></line>' +
            '<text class="agua-chart-axis" x="' + x + '" y="210" text-anchor="middle">' + rotulo + '</text>';
    }).join("");
    const marcadores = pontos.map(function(ponto, indice) {
        return '<circle class="agua-chart-point" cx="' + ponto.x + '" cy="' + ponto.y + '" r="4"><title>' +
            pontos[indice].valor + ' relato(s)</title></circle>';
    }).join("");

    const classeAnimacao = aguaGraficoAnimacaoInicial ? " agua-chart-series-animar" : "";
    aguaGraficoAnimacaoInicial = false;

    chart.innerHTML = '<defs><linearGradient id="aguaAreaFill" x1="0" x2="0" y1="0" y2="1">' +
        '<stop offset="0%" stop-color="#1599f4" stop-opacity=".3"></stop>' +
        '<stop offset="100%" stop-color="#1599f4" stop-opacity=".02"></stop>' +
        '</linearGradient></defs>' + linhasGrade + marcacoesDia +
        '<g class="agua-chart-series' + classeAnimacao + '">' +
        '<path class="agua-chart-area" d="' + area + '"></path>' +
        '<path class="agua-chart-line" d="' + linha + '"></path>' + marcadores +
        '</g>';
    chart.dataset.serieAgua = assinaturaDados;
}

function atualizarEstatisticasAgua() {
    const aguaDenuncias = denuncias.filter(d => isProblemaAgua(d.tipo));
    const regioes = [...new Set(
        aguaDenuncias
            .map(d => d.local)
            .filter(Boolean)
            .map(local => String(local).trim())
    )];

    const regiaoEl = document.getElementById("aguaRegioesAfetadas");
    const frequenciaEl = document.getElementById("aguaFrequenciaProblemas");
    const relatosEl = document.getElementById("aguaRelatosRegistrados");
    const ultimoEl = document.getElementById("aguaUltimosRegistros");

    if (!regiaoEl && !frequenciaEl && !relatosEl && !ultimoEl) {
        return;
    }

    const totalAgua = aguaDenuncias.length;
    const registrosOrdenados = aguaDenuncias.slice().sort(function(a, b) {
        return (converterDataRelato(a.data)?.getTime() || 0) -
            (converterDataRelato(b.data)?.getTime() || 0);
    });
    const ultimoRegistro = totalAgua > 0
        ? registrosOrdenados[registrosOrdenados.length - 1].data || "--"
        : "--";

    renderizarGraficoAgua(aguaDenuncias);

    if (regiaoEl) {
        regiaoEl.textContent = formatarNumero(regioes.length || 0);
    }

    if (frequenciaEl) {
        frequenciaEl.textContent = formatarNumero(totalAgua);
    }

    if (relatosEl) {
        relatosEl.textContent = formatarNumero(totalAgua);
    }

    if (ultimoEl) {
        ultimoEl.textContent = ultimoRegistro;
    }
}

window.addEventListener("storage", function(event) {
    if (event.key === "denuncias") {
        sincronizarDenuncias();
    }
});

window.addEventListener("denunciasAtualizadas", function() {
    sincronizarDenuncias();
});

window.addEventListener("pageshow", function() {
    sincronizarDenuncias();
});

setInterval(function() {
    if (document.getElementById("aguaRegioesAfetadas")) {
        sincronizarDenuncias();
    }
}, 2000);

sincronizarDenuncias();

// ======================================
// FORMULÁRIO DE RELATO
// ======================================

const formRelato = document.getElementById("formRelato");
const helpButton = document.getElementById("helpButton");
const helpPanel = document.getElementById("helpPanel");
const fillExampleBtn = document.getElementById("fillExampleBtn");
const voltarHomeRelato = document.getElementById("voltarHomeRelato");
const sucessoRelato = document.getElementById("sucessoRelato");

function ocultarSucessoRelato() {
    if (sucessoRelato) {
        sucessoRelato.hidden = true;
        sucessoRelato.style.display = "none";
    }

    if (formRelato) {
        formRelato.hidden = false;
        formRelato.style.display = "grid";
    }
}

function mostrarSucessoRelato() {
    if (formRelato) {
        formRelato.hidden = true;
        formRelato.style.display = "none";
    }

    if (sucessoRelato) {
        sucessoRelato.hidden = false;
        sucessoRelato.style.display = "flex";
    }
}

if (formRelato) {
    ocultarSucessoRelato();
    window.addEventListener("pageshow", ocultarSucessoRelato);
}

if (voltarHomeRelato) {
    voltarHomeRelato.addEventListener("click", function() {
        window.location.href = "index.html";
    });
}

if (formRelato) {
    formRelato.addEventListener("input", ocultarSucessoRelato);
    formRelato.addEventListener("change", ocultarSucessoRelato);
}

function capitalizarPrimeiraLetra(texto) {
    if (!texto) return "";

    const valor = texto.trimStart();

    if (!valor) return "";

    return valor.charAt(0).toUpperCase() + valor.slice(1);
}

function buildVoiceAssistant() {
    if (document.querySelector(".voice-assistant")) {
        return;
    }

    const assistant = document.createElement("div");
    assistant.className = "voice-assistant";

    const label = document.createElement("div");
    label.className = "voice-assistant-label";
    label.textContent = "Assistente de voz";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Ativar assistente de voz");
    button.textContent = "🔊";

    assistant.appendChild(label);
    assistant.appendChild(button);
    document.body.appendChild(assistant);

    button.addEventListener("click", function() {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não suporta leitura por voz.");
            return;
        }

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            button.textContent = "🔊";
            label.textContent = "Assistente de voz";
            return;
        }

        const title = document.querySelector("h1")?.textContent?.trim() || document.title;
        const intro = "Você está na página de " + title + ".";
        const extra = "Use o menu para navegar, veja os informações principais e preencha os campos com atenção.";
        const pageText = intro + " " + extra;

        const message = new SpeechSynthesisUtterance(pageText);
        message.lang = "pt-BR";
        message.rate = 1;
        message.pitch = 1;

        message.onstart = function() {
            button.textContent = "🔇";
            label.textContent = "Escutando...";
        };

        message.onend = function() {
            button.textContent = "🔊";
            label.textContent = "Assistente de voz";
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(message);
    });
}

buildVoiceAssistant();

if (helpButton && helpPanel) {
    helpButton.addEventListener("click", function() {
        const isHidden = helpPanel.hasAttribute("hidden");

        if (isHidden) {
            helpPanel.removeAttribute("hidden");
            helpButton.setAttribute("aria-expanded", "true");
        } else {
            helpPanel.setAttribute("hidden", "hidden");
            helpButton.setAttribute("aria-expanded", "false");
        }
    });
}

if (fillExampleBtn && formRelato) {
    fillExampleBtn.addEventListener("click", function() {
        document.getElementById("nome").value = "Maria da Silva";
        document.getElementById("local").value = "Avenida Principal";
        document.getElementById("bairro").value = "Centro";
        document.getElementById("tipo").value = "Vazamento";
        document.getElementById("descricao").value = "Há um vazamento de água na rua principal há mais de 2 dias. O local está alagado e a água está escorrendo para a calçada.";
        document.getElementById("tempo").value = "2 dias";

        helpPanel.setAttribute("hidden", "hidden");
        helpButton.setAttribute("aria-expanded", "false");

        document.getElementById("local").focus();
    });
}

if (formRelato) {
    const camposCapitalizados = [
        document.getElementById("nome"),
        document.getElementById("local"),
        document.getElementById("bairro"),
        document.getElementById("descricao"),
        document.getElementById("tempo")
    ].filter(Boolean);

    camposCapitalizados.forEach(function(campo) {
        campo.addEventListener("input", function() {
            const valor = campo.value;
            const novoValor = capitalizarPrimeiraLetra(valor);

            if (novoValor !== valor) {
                campo.value = novoValor;
            }
        });
    });

    formRelato.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const local = document.getElementById("local").value.trim();
        const bairro = document.getElementById("bairro").value.trim();
        const tipo = document.getElementById("tipo").value;
        const descricao = document.getElementById("descricao").value.trim();

        if (!nome || !local || !bairro || !tipo || !descricao) {
            alert("Preencha todos os campos obrigatórios antes de enviar.");
            return;
        }

        const denuncia = {

            id: Date.now(),

            data: new Date().toLocaleDateString("pt-BR"),

            nome: nome,

            local: local,

            bairro: bairro,

            tipo: tipo,

            descricao: descricao,

            tempo: document.getElementById("tempo").value,

            status: "Pendente"

        };


        denuncias.push(denuncia);


        localStorage.setItem(
            "denuncias",
            JSON.stringify(denuncias)
        );

        window.dispatchEvent(
            new CustomEvent("denunciasAtualizadas")
        );

        mostrarSucessoRelato();

        formRelato.reset();

    });

}


// ======================================
// LOGIN DA PREFEITURA
// ======================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();


        const usuario =
            document.getElementById("usuario").value.trim();

        const senha =
            document.getElementById("senha").value.trim();


        // LOGIN DE TESTE
        const usuarioCorreto = "prefeitura";
        const senhaCorreta = "123456";


        if (
            usuario === usuarioCorreto &&
            senha === senhaCorreta
        ) {

            sessionStorage.setItem(
                "admLogado",
                "true"
            );


            document.getElementById(
                "loginADM"
            ).style.display = "none";


            document.getElementById(
                "painelADM"
            ).style.display = "block";


            carregarPainel();

        } else {

            document.getElementById(
                "erroLogin"
            ).textContent =
                "Usuário ou senha incorretos.";

        }

    });

}


// ======================================
// VERIFICAR LOGIN
// ======================================

function verificarLogin() {

    const logado =
        sessionStorage.getItem("admLogado");


    const login =
        document.getElementById("loginADM");

    const painel =
        document.getElementById("painelADM");


    if (!login || !painel) {
        return;
    }


    if (logado === "true") {

        login.style.display = "none";

        painel.style.display = "block";

        carregarPainel();

    } else {

        login.style.display = "flex";

        painel.style.display = "none";

    }

}


verificarLogin();

const btnLimparTodos = document.getElementById("btnLimparTodos");

if (btnLimparTodos) {
    btnLimparTodos.addEventListener("click", limparTodosRegistros);
}


// ======================================
// CARREGAR PAINEL
// ======================================

function confirmarResolucao(id) {
    const denuncia = denuncias.find(d => d.id === id);

    if (!denuncia) {
        return;
    }

    const confirmado = window.confirm(
        `Confirmar que o problema de ${denuncia.local} foi resolvido?`
    );

    if (!confirmado) {
        return;
    }

    denuncia.status = "Resolvido";

    localStorage.setItem(
        "denuncias",
        JSON.stringify(denuncias)
    );

    window.dispatchEvent(
        new CustomEvent("denunciasAtualizadas")
    );

    carregarPainel();
}

function apagarDenuncia(id) {
    const denuncia = denuncias.find(d => d.id === id);

    if (!denuncia) {
        return;
    }

    const confirmado = window.confirm(
        `Deseja realmente excluir o registro de ${denuncia.local}?`
    );

    if (!confirmado) {
        return;
    }

    denuncias = denuncias.filter(d => d.id !== id);

    localStorage.setItem(
        "denuncias",
        JSON.stringify(denuncias)
    );

    window.dispatchEvent(
        new CustomEvent("denunciasAtualizadas")
    );

    carregarPainel();
}

function limparTodosRegistros() {
    if (denuncias.length === 0) {
        alert("Não há registros para apagar.");
        return;
    }

    const confirmado = window.confirm(
        "Tem certeza que deseja apagar todos os registros?"
    );

    if (!confirmado) {
        return;
    }

    denuncias = [];

    localStorage.setItem(
        "denuncias",
        JSON.stringify(denuncias)
    );

    window.dispatchEvent(
        new CustomEvent("denunciasAtualizadas")
    );

    carregarPainel();
}

function carregarPainel() {

    const lista =
        document.getElementById("listaDenuncias");


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    const semDenuncias =
        document.getElementById("semDenuncias");


    if (denuncias.length === 0) {

        semDenuncias.style.display = "block";

    } else {

        semDenuncias.style.display = "none";

    }


    denuncias.forEach(function(denuncia) {

        const linha =
            document.createElement("tr");

        const statusClass = denuncia.status === "Resolvido"
            ? "status-resolvido"
            : denuncia.status === "Em análise"
                ? "status-analise"
                : "status-pendente";

        const botao = denuncia.status === "Resolvido"
            ? '<button class="btn-resolvido" type="button" disabled>Resolvido</button>'
            : `<button class="btn-confirmar" type="button" data-id="${denuncia.id}">Confirmar resolução</button>`;

        linha.innerHTML = `

            <td>${denuncia.data}</td>

            <td>${denuncia.local}</td>

            <td>${denuncia.tipo}</td>

            <td>${denuncia.descricao}</td>

            <td>
                <span class="${statusClass}">
                    ${denuncia.status}
                </span>
            </td>

            <td>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    ${botao}
                    <button class="btn-excluir" type="button" data-excluir-id="${denuncia.id}">Excluir</button>
                </div>
            </td>

        `;

        const botaoConfirmar = linha.querySelector(".btn-confirmar");

        if (botaoConfirmar) {
            botaoConfirmar.addEventListener("click", function() {
                confirmarResolucao(Number(this.dataset.id));
            });
        }

        const botaoExcluir = linha.querySelector(".btn-excluir");

        if (botaoExcluir) {
            botaoExcluir.addEventListener("click", function() {
                apagarDenuncia(Number(this.dataset.excluirId));
            });
        }

        lista.appendChild(linha);

    });


    atualizarEstatisticas();
    atualizarEstatisticasAgua();

}


atualizarEstatisticasAgua();

// ======================================
// ESTATÍSTICAS
// ======================================

function atualizarEstatisticas() {

    const total =
        denuncias.length;


    const agua =
        denuncias.filter(
            d => d.tipo === "Falta de água"
        ).length;


    const esgoto =
        denuncias.filter(
            d =>
                d.tipo === "Falta de rede de esgoto" ||
                d.tipo === "Esgoto a céu aberto"
        ).length;


    const resolvidos =
        denuncias.filter(
            d => d.status === "Resolvido"
        ).length;


    document.getElementById(
        "totalDenuncias"
    ).textContent = total;


    document.getElementById(
        "totalAgua"
    ).textContent = agua;


    document.getElementById(
        "totalEsgoto"
    ).textContent = esgoto;


    document.getElementById(
        "totalResolvidos"
    ).textContent = resolvidos;

}


// ======================================
// SAIR DO PAINEL
// ======================================

function sairADM() {

    sessionStorage.removeItem(
        "admLogado"
    );


    window.location.href =
        "painel.html";

}