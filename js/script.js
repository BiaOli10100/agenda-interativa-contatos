
// Pega o formulário dentro da section .form-cadastro
const form = document.querySelector(".form-cadastro form");

// Pega os campos do formulário pelo ID
const inputNome = document.getElementById("nome");
const inputTelefone = document.getElementById("telefone");
const inputEmail = document.getElementById("email");
const selectGrupo = document.getElementById("grupo");

// Array que vai guardar TODOS os contatos cadastrados
let contatos = [];

//Variável de controle para edição
let indiceEdicao = null;

form.addEventListener("submit",function(event){
    // Impede a página de recarregar e dos dados serem perdidos
    event.preventDefault();

    //Criando novo contato
// Pega o valor digitado em cada campo
    const nome = inputNome.value;
    const telefone = inputTelefone.value.trim();
    const email = inputEmail.value.trim();
    const grupo = selectGrupo.value;

    //valida email e telefone
    if(!validarTelefone(telefone)){
    alert("O telefone precisa conter 9 dígitos!");
    return;
    }
    
    if (!validarEmail(email)){
        alert('O email precisa conter "@"! ');
        return;
    }

    // Cria um objeto representando um contato
    const contato = {
        nome: nome,
        telefone: telefone,
        email: email,
        grupo: grupo
    };

    if(indiceEdicao !== null){
        contatos[indiceEdicao] = contato;
        indiceEdicao = null;
    } else {
        contatos.push(contato);
    }

        atualizarTabela();
        //limpa o form depois de salvar o contato
        form.reset();
        document.querySelector(".form-cadastro button").textContent = "Cadastrar";

    });



//validando telefone e email
function validarTelefone(telefone) {
    // Remove qualquer coisa que não seja número
    telefone = telefone.replace(/\D/g, "");

    return telefone.length === 9;
}
function validarEmail(email){
    return email.includes("@");
}


function atualizarTabela(){

    // Corpo da tabela onde os contatos serão exibidos
    const tbody = document.getElementById("tabela-contatos");
    //limpa a tabela
    tbody.innerHTML = "";

    //percorrendo o array
    contatos.forEach(function(contato,indice){

        //criando linha e colunas     
        const tr = document.createElement("tr");
        const tdNome = document.createElement("td");
        const tdTelefone = document.createElement("td");
        const tdEmail = document.createElement("td");
        const tdGrupo = document.createElement("td");
        const tdAcoes = document.createElement("td");

        //adicionando os dados na coluna
        tdNome.textContent = contato.nome;
        tdTelefone.textContent = contato.telefone;
        tdEmail.textContent = contato.email;
        tdGrupo.textContent = contato.grupo;

        //botões de ações editar e excluir
        const btnEditar = document.createElement("button");
        btnEditar.textContent="Editar";

        btnEditar.addEventListener("click", function () {
        // pega as células da linha
        const tds = tr.querySelectorAll("td");

        inputNome.value = contato.nome;
        inputTelefone.value = contato.telefone;
        inputEmail.value = contato.email;
        selectGrupo.value = contato.grupo;

        document.querySelector(".form-cadastro button").textContent = "Salvar Alterações";
        indiceEdicao = indice;
});

        const btnExcluir =document.createElement("button");
        btnExcluir.textContent="Excluir";

        btnExcluir.addEventListener("click", function () {
        contatos.splice(indice, 1);
        atualizarTabela();

        });

        //adiciona botões
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir)

        // Adiciona as colunas na linha
        tr.appendChild(tdNome);
        tr.appendChild(tdTelefone);
        tr.appendChild(tdEmail);
        tr.appendChild(tdGrupo);
        tr.appendChild(tdAcoes);

        // Adiciona a linha na tabela
        tbody.appendChild(tr);
        });
}