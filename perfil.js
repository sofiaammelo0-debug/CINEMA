const abrirCadastro =
    document.getElementById("abrirCadastro");

const modalCadastro =
    document.getElementById("modalCadastro");

const fecharCadastro =
    document.getElementById("fecharCadastro");

const mostrarSenha =
    document.getElementById("mostrarSenha");

const senha =
    document.getElementById("senha");

const telefone =
    document.getElementById("telefone");

const loginForm =
    document.getElementById("loginForm");

const cadastroForm =
    document.getElementById("cadastroForm");

const esqueciSenha =
    document.getElementById("esqueciSenha");



abrirCadastro.addEventListener("click", function () {

    modalCadastro.classList.add("ativo");

});



fecharCadastro.addEventListener("click", function () {

    modalCadastro.classList.remove("ativo");

});

modalCadastro.addEventListener("click", function (event) {

    if (event.target === modalCadastro) {

        modalCadastro.classList.remove("ativo");

    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        modalCadastro.classList.remove("ativo");

    }

});


mostrarSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.classList.remove("bi-eye");

        mostrarSenha.classList.add("bi-eye-slash");

    } else {

        senha.type = "password";

        mostrarSenha.classList.remove("bi-eye-slash");

        mostrarSenha.classList.add("bi-eye");

    }

});



telefone.addEventListener("input", function () {

    let valor = telefone.value.replace(/\D/g, "");

    if (valor.length > 11) {

        valor = valor.substring(0, 11);

    }


    if (valor.length <= 10) {

        valor = valor.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );

    } else {

        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            "($1) $2-$3"
        );

    }


    telefone.value = valor;

});



loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const senhaValor =
        document.getElementById("senha").value;


    if (email === "" || senhaValor === "") {

        alert("Preencha todos os campos.");

        return;

    }


    alert("Login realizado com sucesso no CINE+!");

});



cadastroForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("emailCadastro").value.trim();

    const telefoneValor =
        document.getElementById("telefone").value.trim();

    const senhaCadastro =
        document.getElementById("senhaCadastro").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;



    if (nome === "") {

        alert("Digite seu nome completo.");

        return;

    }



    if (email === "") {

        alert("Digite seu e-mail.");

        return;

    }

    if (telefoneValor.length < 14) {

        alert("Digite um número de telefone válido.");

        return;

    }


    if (senhaCadastro.length < 6) {

        alert(
            "A senha deve ter pelo menos 6 caracteres."
        );

        return;

    }


    if (senhaCadastro !== confirmarSenha) {

        alert("As senhas não são iguais.");

        return;

    }



    alert(
        "Conta criada com sucesso, " +
        nome +
        "!\n\n" +
        "Bem-vindo ao CINE+."
    );


    cadastroForm.reset();



    modalCadastro.classList.remove("ativo");

});

esqueciSenha.addEventListener("click", function (event) {

    event.preventDefault();

    alert(
        "A recuperação de senha será disponibilizada em breve."
    );

});