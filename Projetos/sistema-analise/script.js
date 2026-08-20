const palavrasSuspeitas = [

    { palavra: "acesse agora", peso: 3 },
    { palavra: "toque aqui", peso: 3 },
    { palavra: "urgente", peso: 3 },
    { palavra: "última chance", peso: 3 },
    { palavra: "prazo final", peso: 3 },
    { palavra: "clique aqui", peso: 3 },
    { palavra: "ação imediata", peso: 4 },
    { palavra: "evite o bloqueio", peso: 5 },
    { palavra: "sua conta será bloqueada", peso: 5 },
    { palavra: "conta bloqueada", peso: 4 },
    { palavra: "conta suspensa", peso: 4 },
    { palavra: "acesso suspenso", peso: 4 },
    { palavra: "transferência", peso: 4 },
    { palavra: "pix", peso: 4 },
    { palavra: "prêmio", peso: 3 },
    { palavra: "ganhou", peso: 2 },
    { palavra: "vencedor", peso: 3 },
    { palavra: "sorteado", peso: 3 },
    { palavra: "parabéns", peso: 2 },
    { palavra: "resgate seu prêmio", peso: 5 },
    { palavra: "link", peso: 1 },
    { palavra: "atualize seus dados", peso: 4 },
    { palavra: "cpf", peso: 3 },
    { palavra: "cartão", peso: 4 },
    { palavra: "dados bancários", peso: 5 },
    { palavra: "whatsapp", peso: 2 },
    { palavra: "atendimento", peso: 1 },
    { palavra: "oferta imperdível", peso: 3 },
    { palavra: "promoção exclusiva", peso: 3 },
    { palavra: "100% grátis", peso: 3 },
    { palavra: "grátis", peso: 2 },
    { palavra: "dinheiro de volta", peso: 3 },
    { palavra: "clique no link", peso: 4 },
    { palavra: "copie e cole", peso: 3 },
    { palavra: "ameaça", peso: 3 },
    { palavra: "processo judicial", peso: 4 },
    { palavra: "multa", peso: 3 },
    { palavra: "dívida", peso: 3 },
    { palavra: "regularize agora", peso: 4 },
    { palavra: "evite restrições", peso: 4 }

];


const campoMensagem = document.getElementById("mensagem");
const botaoAnalisar = document.getElementById("analisar");

const resultado = document.getElementById("resultado");
const status = document.getElementById("status");
const pontuacao = document.getElementById("pontuacao");
const descricao = document.getElementById("descricao");
const termos = document.getElementById("termos");


botaoAnalisar.addEventListener("click", analisarMensagem);


function analisarMensagem() {

    let mensagem = campoMensagem.value.trim();


    if (mensagem === "") {

        status.textContent = "MENSAGEM VAZIA";

        pontuacao.textContent = "0";

        descricao.textContent =
            "Digite uma mensagem para realizar a análise.";

        termos.innerHTML = "";

        resultado.className = "resultado";

        return;
    }


    mensagem = mensagem.toLowerCase();


    let pontuacaoFinal = 0;

    let encontrados = [];


    for (const palavra of palavrasSuspeitas) {

        if (mensagem.includes(palavra.palavra)) {

            pontuacaoFinal += palavra.peso;

            encontrados.push(palavra);

        }

    }


    pontuacao.textContent = pontuacaoFinal;


    mostrarTermos(encontrados);


    if (pontuacaoFinal <= 2) {

        status.textContent = "DE BOA";

        descricao.textContent =
            "Poucos ou nenhum sinal suspeito foi encontrado.";

        resultado.className =
            "resultado seguro";

    }

    else if (pontuacaoFinal <= 3) {

        status.textContent = "POSSÍVEL GOLPE";

        descricao.textContent =
            "A mensagem apresenta alguns sinais que merecem atenção.";

        resultado.className =
            "resultado alerta";

    }

    else {

        status.textContent = "GOLPE 100%";

        descricao.textContent =
            "A mensagem apresenta diversos sinais associados a golpes.";

        resultado.className =
            "resultado perigo";

    }

}


function mostrarTermos(encontrados) {

    termos.innerHTML = "";


    if (encontrados.length === 0) {

        termos.innerHTML =
            "<span>Nenhum termo suspeito encontrado.</span>";

        return;
    }


    encontrados.forEach(item => {

        const elemento = document.createElement("div");

        elemento.classList.add("termo");

        elemento.innerHTML = `
            <span>${item.palavra}</span>
            <strong>+${item.peso}</strong>
        `;

        termos.appendChild(elemento);

    });

}