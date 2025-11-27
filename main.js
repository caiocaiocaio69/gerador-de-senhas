// Seleciona o elemento onde aparece o número de caracteres da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Valor inicial do tamanho da senha
let tamanhoSenha = 12;

// Atualiza o texto na tela com o valor inicial
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres disponíveis
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona os botões de aumentar e diminuir caracteres
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todos os checkboxes (maiúsculas, minúsculas, números, símbolos)
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona a barra que mostra a força da senha
const forcaSenha = document.querySelector('.forca');

// Liga os botões às funções que aumentam/diminuem o tamanho
botoes[0].onclick = diminuiTamanho; // Botão "-"
botoes[1].onclick = aumentaTamanho; // Botão "+"

/* ---------------------------------------------
   Funções de aumento e diminuição do tamanho
------------------------------------------------*/
function diminuiTamanho() {
    // Impede que o tamanho fique menor que 1
    if (tamanhoSenha > 1) {
        tamanhoSenha--;  // diminui 1
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza na tela
    geraSenha(); // Gera nova senha de acordo com o novo tamanho
}

function aumentaTamanho() {
    // Impede que o tamanho passe de 20 caracteres
    if (tamanhoSenha < 20) {
        tamanhoSenha++; // aumenta 1
    }
    numeroSenha.textContent = tamanhoSenha; // Atualiza na tela
    geraSenha(); // Regenera a senha
}

/* ---------------------------------------------
   Geração da senha ao clicar nos checkboxes
------------------------------------------------*/
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha; // Sempre que um checkbox muda → gera nova senha
}

// Gera uma senha logo ao carregar a página
geraSenha();

/* ---------------------------------------------
   Função principal que gera a senha aleatória
------------------------------------------------*/
function geraSenha() {
    let alfabeto = ''; // Onde os caracteres permitidos serão armazenados

    // Se o checkbox estiver marcado, adiciona o conjunto correspondente
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = ''; // Senha final

    // Loop que monta a senha caractere por caractere
    for (let i = 0; i < tamanhoSenha; i++) {
        // Gera número aleatório baseado no tamanho do alfabeto disponível
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio); // Converte para inteiro

        // Adiciona o caractere correspondente à senha
        senha = senha + alfabeto[numeroAleatorio];
    }

    // Exibe a senha no campo de texto
    campoSenha.value = senha;

    // Avalia a força da senha
    classificaSenha();
}

/* ---------------------------------------------
   Classificação da força da senha
------------------------------------------------*/
function classificaSenha() {
    // Remove todas as classes antes de definir a nova
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // Classificação baseada no TAMANHO da senha:
    if (tamanhoSenha > 11) {
        forcaSenha.classList.add('forte');   // Forte
    } else if (tamanhoSenha > 5 && tamanhoSenha < 12) {
        forcaSenha.classList.add('media');   // Média
    } else if (tamanhoSenha <= 5) {
        forcaSenha.classList.add('fraca');   // Fraca
    }
}