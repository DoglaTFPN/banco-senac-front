// 1. Dados em MemÃ³ria
const clientes = [
    { cpf: "111.222.333-44", senha: "123", nome: "Dennis Lopes", saldo: 5000 },
    { cpf: "222.333.444-55", senha: "123", nome: "Nicolas Silva", saldo: 1500 },
    { cpf: "333.444.555-66", senha: "123", nome: "Ana Maria", saldo: 3000 },
    { cpf: "444.555.666-77", senha: "123", nome: "Bruno Costa", saldo: 500 },
    { cpf: "555.666.777-88", senha: "123", nome: "Carla Souza", saldo: 10000 }
];

let usuarioLogado = null;

// 2. SeleÃ§Ã£o de Elementos (DOM)
const secaoLogin = document.querySelector('#login-section');
const secaoCadastro = document.querySelector('#cadastro-section');
const secaoSucesso = document.querySelector('#sucesso-section');
const secaoPainel = document.querySelector('#painel-section');

const campoSaldo = document.querySelector('#saldo-valor');
const boasVindas = document.querySelector('#boas-vindas');
const loginErro = document.querySelector('#login-erro');

// 3. AlternÃ¢ncia entre Telas (Login <-> Cadastro)
document.querySelector('#link-ir-cadastro').addEventListener('click', (e) => {
    e.preventDefault();
    secaoLogin.style.display = 'none';
    secaoCadastro.style.display = 'block';
});

document.querySelector('#link-voltar-login').addEventListener('click', (e) => {
    e.preventDefault();
    secaoCadastro.style.display = 'none';
    secaoLogin.style.display = 'block';
});

// 4. Eventos de Login
document.querySelector('#btn-login').addEventListener('click', () => {
    const cpfDigitado = document.querySelector('#input-cpf').value.trim();
    const senhaDigitada = document.querySelector('#input-senha').value.trim();

    const clienteEncontrado = clientes.find(c => c.cpf === cpfDigitado && c.senha === senhaDigitada);

    if (clienteEncontrado) {
        usuarioLogado = clienteEncontrado;
        loginErro.style.display = 'none';
        secaoLogin.style.display = 'none';
        secaoPainel.style.display = 'block';

        campoSaldo.textContent = `R$ ${usuarioLogado.saldo.toFixed(2)}`;
        boasVindas.textContent = `OlÃ¡, ${usuarioLogado.nome}`;
    } else {
        loginErro.style.display = 'block';
    }
});

// 5. LÃ³gica de SubmissÃ£o de Cadastro (Onde aplicaremos as RegEx)
document.querySelector('#form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();

    // TODO: Os alunos vÃ£o validar os campos com RegEx e conferir se as senhas coincidem.
    // ApÃ³s a validaÃ§Ã£o com sucesso, transita para a tela de anÃ¡lise:
    secaoCadastro.style.display = 'none';
    secaoSucesso.style.display = 'block';
});

// 6. BotÃ£o para voltar ao inÃ­cio a partir da tela de sucesso
document.querySelector('#btn-voltar-inicio').addEventListener('click', () => {
    location.reload();
});

// 7. OperaÃ§Ãµes BancÃ¡rias (EspaÃ§o reservado para as prÃ³ximas aulas / API)
document.querySelector('#btn-depositar').addEventListener('click', () => { });
document.querySelector('#btn-sacar').addEventListener('click', () => { });
document.querySelector('#btn-transferir').addEventListener('click', () => { });

document.querySelector('#btn-sair').addEventListener('click', () => {
    location.reload();
});

// 8. Seleciona o formulário de cadastro na página
const formCadastro = document.querySelector('#form-cadastro');
if (formCadastro) {
 // Adiciona um ouvinte para disparar sempre que houver digitação nos inputs
 formCadastro.addEventListener('input', () => {
 // Cria um objeto estruturado contendo os dados atuais dos campos
 const dadosRascunho = {
 dados: {
 nome: document.querySelector('#cad-nome').value,
 nome: document.querySelector('#cad-cpf').value,
 nome: document.querySelector('#cad-email').value,
 nome: document.querySelector('#cad-celular').value,
 nome: document.querySelector('#cad-cep').value,
 nome: document.querySelector('#cad-endereco').value,
 nome: document.querySelector('#cad-cidade').value,
 nome: document.querySelector('#cad-estado').value,
 // FAÇA O MESMO PARA OS CAMPOS ABAIXO:
// cpf, email, celular, cep, endereco, cidade, estado
 },
 timestamp: new Date().getTime()
 };
 // Salva no localStorage convertendo o objeto em string JSON
 localStorage.setItem('senac_rascunho_cadastro', JSON.stringify(dadosRascunho));
 });
}

// 9. Executado recuperação dos dados assim que a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const rascunhoSalvo = localStorage.getItem('senac_rascunho_cadastro');
    if (rascunhoSalvo) {
    // Converte a string JSON de volta para objeto JavaScript
    const rascunho = JSON.parse(rascunhoSalvo);
    const d = rascunho.dados;
    // Preenche os campos do formulário com os dados salvos anteriormente
    // FAÇA O MESMO PARA OS CAMPOS ABAIXO:
    // cpf, email, celular, cep, endereco, cidade, estado
    document.querySelector('#cad-nome').value = d.nome || '';
    document.querySelector('#cad-cpf').value = d.cpf || '';
    document.querySelector('#cad-email').value = d.email || '';
    document.querySelector('#cad-celular').value = d.celular || '';
    document.querySelector('#cad-cep').value = d.cep || '';
    document.querySelector('#cad-endereco').value = d.endereco || '';
    document.querySelector('#cad-cidade').value = d.cidade || '';
    document.querySelector('#cad-estado').value = d.estado || '';
    // Opcional: Exibir um aviso visual para o usuário informando que o rascunho foi recuperado
    console.log("Rascunho de cadastro recuperado com sucesso!");
    }
   });

// 10. Limpeza ao submeter o formulário com sucesso
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        // 1. Evita o recarregamento da página
        e.preventDefault();
        
        // 2. Remove o rascunho do localStorage (substitua 'rascunho' pela chave real que você usou)
        localStorage.removeItem('rascunho');
        
        // 3. Reseta o formulário
        formCadastro.reset();
        
        secaoCadastro.style.display = 'none';
        secaoSucesso.style.display = 'block';
    });
}

// 11. Botão de descarte manual do rascunho
const btnLimparRascunho = document.querySelector('#link-limpar-rascunho');
if (btnLimparRascunho) {
 btnLimparRascunho.addEventListener('click', (e) => {
 e.preventDefault();
 if (confirm('Deseja realmente descartar o rascunho do cadastro?')) {
 localStorage.removeItem('senac_rascunho_cadastro');
 formCadastro.reset();
 }
 });
}

// Funções auxiliares de cookies (salvar, ler, apagar)
function salvarCookie(nome, valor, dias) {
    const d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
     //pconst d = new Date(Date.now() + (dias * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = nome + "=" + encodeURIComponent(valor) + ";" + expires + ";path=/";
    }
    function lerCookie(nome) {
    let nameEQ = nome + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
    }
    function apagarCookie(nome) {
    document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

// 12. Login com Gravação de Cookies
document.querySelector('#btn-login').addEventListener('click', () => {
    const cpfDigitado = document.querySelector('#input-cpf').value.trim();
    const senhaDigitada = document.querySelector('#input-senha').value.trim();
    const clienteEncontrado = clientes.find(c => c.cpf === cpfDigitado && c.senha === senhaDigitada);
    if (clienteEncontrado) {
    usuarioLogado = clienteEncontrado;
    loginErro.style.display = 'none';
    // Gravando cookies para identificação do dispositivo
    const primeiroNome = clienteEncontrado.nome.split(' ')[0];
    const agora = new Date().toLocaleString('pt-BR');
    salvarCookie('senac_cpf', clienteEncontrado.cpf, 30);
    salvarCookie('senac_nome', primeiroNome, 30);
    salvarCookie('senac_ultimo_acesso', agora, 30);
    secaoLogin.style.display = 'none';
    secaoPainel.style.display = 'block';
    campoSaldo.textContent = `R$ ${usuarioLogado.saldo.toFixed(2)}`;
    boasVindas.textContent = `Olá, ${usuarioLogado.nome}`;
    } else {
    loginErro.style.display = 'block';
    }
    })

// 13. Leitura de cookies na inicialização da página
function verificarReconhecimento() {
    const cpfSalvo = lerCookie('senac_cpf');
    const nomeSalvo = lerCookie('senac_nome');
    const ultimoAcesso = lerCookie('senac_ultimo_acesso');
    const subtitulo = document.querySelector('#login-section .subtitle');
    if (cpfSalvo && nomeSalvo) {
    document.querySelector('#input-cpf').value = cpfSalvo;
    subtitulo.innerHTML = `Que bom ter você de volta, <strong>${nomeSalvo}</strong>!<br>
    <small style="color: #6c757d;">Último acesso: ${ultimoAcesso}</small><br>
    <a href="#" id="link-trocar-usuario" style="font-size: 0.75rem; color: #0056b3; font-weight: bold;">
    Não é você? Trocar de conta
    </a>`;
    document.querySelector('#input-senha').focus();
    document.querySelector('#link-trocar-usuario').addEventListener('click', (e) => {
    e.preventDefault();
    apagarCookie('senac_cpf');
    apagarCookie('senac_nome');
    apagarCookie('senac_ultimo_acesso');
    document.querySelector('#input-cpf').value = '';
    document.querySelector('#input-senha').value = '';
    subtitulo.textContent = 'Portal do Cliente';
    document.querySelector('#input-cpf').focus();
    });
    }
    }
    window.addEventListener('DOMContentLoaded', () => {
    verificarReconhecimento();
    });



   