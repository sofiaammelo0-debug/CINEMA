
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("faturamentoForm");
    const filmeInput = document.getElementById("filme");
    const ingressosInput = document.getElementById("ingressos");
    const precoInput = document.getElementById("preco");
    const listaFaturamento = document.getElementById("listaFaturamento");
    const faturamentoTotalElement = document.getElementById("faturamentoTotal");
    const ingressosTotalElement = document.getElementById("ingressosTotal");
    const filmesTotalElement = document.getElementById("filmesTotal");
    const ultimoFaturamentoElement = document.getElementById("ultimoFaturamento");
    const limparTudoButton = document.getElementById("limparTudo");

    let filmes = JSON.parse(
        localStorage.getItem("cineMaisFaturamento")
    ) || [];

    function formatarMoeda(valor) {

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }

    function salvarDados() {

        localStorage.setItem(
            "cineMaisFaturamento",
            JSON.stringify(filmes)
        );

    }

    function atualizarResumo() {

        let faturamentoTotal = 0;
        let ingressosTotal = 0;

        filmes.forEach(function (filme) {

            faturamentoTotal += filme.faturamento;
            ingressosTotal += filme.ingressos;

        });

        faturamentoTotalElement.textContent =
            formatarMoeda(faturamentoTotal);

        ingressosTotalElement.textContent =
            ingressosTotal.toLocaleString("pt-BR");

        filmesTotalElement.textContent =
            filmes.length.toLocaleString("pt-BR");

    }

    function renderizarTabela() {

        listaFaturamento.innerHTML = "";

        if (filmes.length === 0) {

            listaFaturamento.innerHTML = `
                <tr class="tabela-vazia">
                    <td colspan="6">
                        <i class="bi bi-film"></i>
                        <strong>Nenhum filme cadastrado</strong>
                        <span>
                            Adicione um filme acima para começar o cálculo.
                        </span>
                    </td>
                </tr>
            `;

            atualizarResumo();

            return;
        }

        filmes.forEach(function (filme, index) {

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${index + 1}</td>

                <td>${filme.nome}</td>

                <td>
                    ${filme.ingressos.toLocaleString("pt-BR")}
                </td>

                <td>
                    ${formatarMoeda(filme.preco)}
                </td>

                <td class="valor-faturamento">
                    ${formatarMoeda(filme.faturamento)}
                </td>

                <td>
                    <button
                        class="excluir-faturamento"
                        title="Excluir filme"
                        data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;

            listaFaturamento.appendChild(linha);

        });

        atualizarResumo();

    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = filmeInput.value.trim();
        const ingressos = Number(ingressosInput.value);
        const preco = Number(precoInput.value);

        if (!nome) {

            alert("Digite o nome do filme.");
            filmeInput.focus();
            return;

        }

        if (ingressos <= 0 || isNaN(ingressos)) {

            alert("Digite uma quantidade válida de ingressos.");
            ingressosInput.focus();
            return;

        }

        if (preco <= 0 || isNaN(preco)) {

            alert("Digite um preço válido para o ingresso.");
            precoInput.focus();
            return;

        }

        const faturamento = ingressos * preco;

        const novoFilme = {
            nome: nome,
            ingressos: ingressos,
            preco: preco,
            faturamento: faturamento
        };

        filmes.push(novoFilme);

        ultimoFaturamentoElement.textContent =
            formatarMoeda(faturamento);

        salvarDados();
        renderizarTabela();

        form.reset();
        filmeInput.focus();

    });

    listaFaturamento.addEventListener(
        "click",
        function (event) {

            const botao =
                event.target.closest(".excluir-faturamento");

            if (!botao) {
                return;
            }

            const index =
                Number(botao.dataset.index);

            if (
                confirm(
                    "Deseja realmente excluir este registro?"
                )
            ) {

                filmes.splice(index, 1);

                salvarDados();
                renderizarTabela();

            }

        }
    );

    limparTudoButton.addEventListener(
        "click",
        function () {

            if (filmes.length === 0) {

                alert("Não existem registros para apagar.");
                return;

            }

            if (
                confirm(
                    "Deseja apagar TODOS os registros de faturamento?"
                )
            ) {

                filmes = [];

                salvarDados();

                ultimoFaturamentoElement.textContent =
                    "R$ 0,00";

                renderizarTabela();

            }

        }
    );

    renderizarTabela();

});
