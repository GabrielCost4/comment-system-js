/*
EXERCÍCIO: Contador de caracteres com limite

OBJETIVO:
Criar um campo de texto que:
- Conta caracteres em tempo real
- Limita o máximo em 100 caracteres
- Dá feedback visual conforme o usuário digita
- Valida antes de permitir "publicar"

REGRAS:
1. Atualizar contador (ex: 0 / 100) a cada digitação
2. Se passar de 80 caracteres → aviso visual (atenção)
3. Se chegar em 100 → estado crítico (limite atingido)
4. Não permitir envio se estiver vazio ou acima do limite
5. Após publicar → limpar o campo e resetar contador

LÓGICA:
digitar →
contar caracteres →
atualizar contador →
validar limite →
alterar cor →
habilitar/desabilitar botão →
publicar →
resetar estado

FOCO:
- organização de código
- nomes claros
- separação de responsabilidades
- lógica limpa (pensar antes de codar)
*/

//Pegar os elementos DOM

let textoDigitado = document.getElementById('campoTexto');
let contador = document.getElementById('contador');
let botaoPublicar = document.getElementById('btnPublicar');
let comentarios = document.getElementById('comentarios')
let mensagemAlerta = document.getElementById('message-alert')

// Adiciona o evento de input a função
textoDigitado.addEventListener('input', atualizarContador);

//Função para pegar o valor do campo de texto e atualizar o contador
function atualizarContador() {
    let quantidadeDeCaracteres = textoDigitado.value.length;
    contador.textContent = `${quantidadeDeCaracteres} / 100`
    contador.classList.remove('alert-yellow', 'alert-red')

    if (quantidadeDeCaracteres >= 80 && quantidadeDeCaracteres <= 100) {
        contador.classList.add('alert-yellow')
        mensagemAlerta.textContent = 'Chegando no limite.'
        mensagemAlerta.classList.add('alert-yellow')
        mensagemAlerta.classList.remove('alert-red')
    } else if (quantidadeDeCaracteres > 100) {
        contador.classList.add('alert-red')
        mensagemAlerta.textContent = 'Limite atingido!'
        mensagemAlerta.classList.add('alert-red')
        botaoPublicar.disabled = true
    } else if (quantidadeDeCaracteres >= 0 && quantidadeDeCaracteres <= 79) {
        mensagemAlerta.textContent = ''
    }

    if (quantidadeDeCaracteres >= 0 && quantidadeDeCaracteres <= 100) {
        botaoPublicar.disabled = false
    }

}

// Adiciona evento de clique ao botão de publicar
botaoPublicar.addEventListener('click', validar)

// Função para validar o clique
function validar() {
    if (textoDigitado.value == '' || textoDigitado.value.length > 100) {
        alert('⚠️ [ERRO] Insira algo válido')
        return
    }

    // Criando o campo dos comentários e adicionando o texto digitado ao campo
    let campoDoComentário = document.createElement('section')
    let comentarioFeito = document.createElement('p')
    comentarioFeito.textContent = textoDigitado.value
    comentarios.appendChild(campoDoComentário)
    campoDoComentário.appendChild(comentarioFeito)

    //Adicionar a classe na section criada
    campoDoComentário.classList.add('campoDosComentarios')
    const hoje = new Date();

    // Data do comentário
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const ano = hoje.getFullYear();

    // Criando o campo da data do comentário e adicionando a data ao campo
    let dataDoComentario = document.createElement('span')
    dataDoComentario.textContent = `${dia}/${mes}/${ano}`
    campoDoComentário.appendChild(dataDoComentario)

    

    // Limpando o texto digitado e resetando o contador
    textoDigitado.value = ''
    contador.textContent = '0 / 100'
}