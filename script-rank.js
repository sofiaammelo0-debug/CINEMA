const filmes = [
    {
        nome: "AVATAR AANG: O ÚLTIMO MESTRE DO AR",
        bilheteria: 4000
    },

    {
        nome: "MARTE UM",
        bilheteria: 2000
    },

    {
        nome: "CAPITÃES DA AREIA",
        bilheteria: 1500
    },

    {
        nome: "O SILÊNCIO DOS INOCENTES",
        bilheteria: 1200
    },

    {
        nome: "FAÇA ELA VOLTAR",
        bilheteria: 900
    },

    {
        nome: "O SORRISO DA MONA LISA",
        bilheteria: 700
    }
];


const lista = document.getElementById("listaFilmes");
const contador = document.getElementById("contador");


function formatarBilheteria(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function mostrarRanking() {

    filmes.sort(function (a, b) {

        return b.bilheteria - a.bilheteria;

    });


    contador.textContent = filmes.length;

    lista.innerHTML = "";


    filmes.forEach(function (filme, index) {

        const elemento = document.createElement("div");

        elemento.classList.add("filme");


        elemento.innerHTML = `

            <div class="posicao">

                ${String(index + 1).padStart(2, "0")}

            </div>


            <div class="info">

                <h3>
                    ${filme.nome}
                </h3>

                <p>

                    <i class="bi bi-bar-chart-fill"></i>

                    ${index + 1}º lugar no ranking

                </p>

            </div>


            <div class="bilheteria">

                <span>
                    BILHETERIA
                </span>

                <strong>
                    ${formatarBilheteria(filme.bilheteria)}
                </strong>

            </div>

        `;


        lista.appendChild(elemento);

    });

}


mostrarRanking();