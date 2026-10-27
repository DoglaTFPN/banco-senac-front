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

// 5. Lógica de Submissão de Cadastro (envia os dados para a API)
document.querySelector('#form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();

    // TODO: Os alunos vão validar os campos com RegEx.
    const senha = document.querySelector('#cad-senha').value;
    const confirma = document.querySelector('#cad-confirma-senha').value;

    if (senha.length < 8) {
        alert('A senha precisa ter pelo menos 8 caracteres.');
        return;
    }
    if (senha !== confirma) {
        alert('As senhas não coincidem.');
        return;
    }

    // Lê os dados do formulário ANTES de qualquer reset()
    const dados = montarDadosCadastro();

    try {
        await cadastrarClienteNaAPI(dados);
        secaoCadastro.style.display = 'none';
        secaoSucesso.style.display = 'block';
    } catch (erro) {
        alert('Não foi possível concluir o cadastro: ' + erro.message);
    }
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
        // (a senha NÃO é salva no rascunho, por segurança)
        const dadosRascunho = {
            dados: {
                nome: document.querySelector('#cad-nome').value,
                cpf: document.querySelector('#cad-cpf').value,
                email: document.querySelector('#cad-email').value,
                celular: document.querySelector('#cad-celular').value,
                cep: document.querySelector('#cad-cep').value,
                endereco: document.querySelector('#cad-endereco').value,
                cidade: document.querySelector('#cad-cidade').value,
                estado: document.querySelector('#cad-estado').value
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

// 10. Limpeza do rascunho ao submeter o formulário
// (a troca de tela agora acontece na seção 5, só depois que a API responde com sucesso)
if (formCadastro) {
    formCadastro.addEventListener('submit', () => {
        localStorage.removeItem('senac_rascunho_cadastro');
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

// 14. Cadastro de cliente via API (POST + fetch)
const API_CLIENTES = 'https://senac-bank-api.dennislopes.com.br/api/clientes';

// Monta o objeto que será enviado no corpo da requisição
function montarDadosCadastro() {
    return {
        nome: document.querySelector('#cad-nome').value.trim(),
        cpf: document.querySelector('#cad-cpf').value.trim(),
        email: document.querySelector('#cad-email').value.trim(),
        celular: document.querySelector('#cad-celular').value.trim(),
        cep: document.querySelector('#cad-cep').value.trim(),
        endereco: document.querySelector('#cad-endereco').value.trim(),
        cidade: document.querySelector('#cad-cidade').value.trim(),
        estado: document.querySelector('#cad-estado').value.trim().toUpperCase(),
        senha: document.querySelector('#cad-senha').value
    };
}

// Envia o cliente para a API e devolve o JSON retornado pelo servidor
async function cadastrarClienteNaAPI(dados) {
    const resposta = await fetch(API_CLIENTES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        console.error('Erro da API:', resultado);
        throw new Error(resultado.message || resultado.erro || `HTTP ${resposta.status}`);
    }

    console.log('Cliente cadastrado com sucesso:', resultado);
    return resultado;
}

// Versão para colar direto no console do navegador (preencha o nome real e execute):
// cadastrarClienteNaAPI({
//     nome: 'SEU NOME COMPLETO AQUI',
//     cpf: '529.982.247-25',
//     email: 'seu.nome@exemplo.com',
//     celular: '(11) 91234-5678',
//     cep: '01310-100',
//     endereco: 'Av. Paulista, 1000 - Apto 42',
//     cidade: 'São Paulo',
//     estado: 'SP',
//     senha: 'senha1234'
// });


// 15. Ativação de conta via API (PATCH)
// O cliente nasce com ativo: false; esta rota libera o acesso da conta.
// A API pode responder com JSON ou com texto puro, então lemos como texto e tentamos converter.
async function lerRespostaDaAPI(resposta) {
    const texto = await resposta.text();
    try {
        return JSON.parse(texto);
    } catch {
        return texto;
    }
}

async function ativarClienteNaAPI(cpf) {
    const resposta = await fetch(`${API_CLIENTES}/${encodeURIComponent(cpf)}/ativar`, {
        method: 'PATCH'
    });

    const resultado = await lerRespostaDaAPI(resposta);

    if (!resposta.ok) {
        console.error('Erro da API:', resultado);
        throw new Error(typeof resultado === 'string' ? resultado : (resultado.message || resultado.erro || `HTTP ${resposta.status}`));
    }

    console.log('Conta ativada com sucesso:', resultado);
    return resultado;
}

// Versão para colar direto no console (use o mesmo CPF do cadastro):
// ativarClienteNaAPI('529.982.247-25');


// 16. Login de cliente via API (POST)
async function loginNaAPI(cpf, senha) {
    const resposta = await fetch(`${API_CLIENTES}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha })
    });

    // Falha (CPF/senha inválidos, conta inativa etc.): a API pode mandar texto puro
    if (!resposta.ok) {
        const textoErro = await resposta.text();
        console.error('Falha no login:', textoErro || `HTTP ${resposta.status}`);
        throw new Error(textoErro || `HTTP ${resposta.status}`);
    }

    // Sucesso: converte para JSON
    const cliente = await resposta.json();
    const nome = cliente.nome || (cliente.cliente && cliente.cliente.nome) || '';
    console.log(`Bem-vindo(a), ${nome}!`);
    console.log('Dados do cliente logado:', cliente);
    return cliente;
}

// Versão para colar direto no console (use o CPF e a senha que você cadastrou):
// loginNaAPI('529.982.247-25', 'senha1234');


// 17. Listagem de clientes via API (GET + console.table)
async function listarClientesDaAPI() {
    const resposta = await fetch(API_CLIENTES, { method: 'GET' });

    if (!resposta.ok) {
        const textoErro = await resposta.text();
        console.error('Falha ao listar clientes:', textoErro || `HTTP ${resposta.status}`);
        throw new Error(textoErro || `HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();

    // A lista pode vir direto como array ou dentro de um objeto (ex.: { clientes: [...] })
    const lista = Array.isArray(dados)
        ? dados
        : (dados.clientes || dados.content || dados.data || []);

    console.log(`Total de clientes: ${lista.length}`);
    console.table(lista);
    return lista;
}

// Versão para colar direto no console:
// listarClientesDaAPI();


// 18. Atualização completa de cliente via API (PUT)
// PUT substitui o cadastro inteiro: por isso enviamos TODOS os campos, não só os alterados.
async function atualizarClienteNaAPI(cpf, dadosAtualizados) {
    const resposta = await fetch(`${API_CLIENTES}/${encodeURIComponent(cpf)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
    });

    // Lê como texto e tenta converter, pois a API pode responder com JSON ou texto puro
    const texto = await resposta.text();
    let resultado;
    try {
        resultado = JSON.parse(texto);
    } catch {
        resultado = texto;
    }

    if (!resposta.ok) {
        console.error('Erro da API:', resultado);
        throw new Error(typeof resultado === 'string' ? resultado : (resultado.message || resultado.erro || `HTTP ${resposta.status}`));
    }

    console.log('Cliente atualizado com sucesso:', resultado);
    return resultado;
}

// Versão para colar direto no console (use o CPF cadastrado e o seu nome real):
// atualizarClienteNaAPI('529.982.247-25', {
//     nome: 'SEU NOME COMPLETO AQUI',
//     cpf: '529.982.247-25',
//     email: 'novo.email@exemplo.com',
//     celular: '(11) 98765-4321',
//     cep: '04538-132',
//     endereco: 'Av. Brigadeiro Faria Lima, 2000 - Sala 10',
//     cidade: 'São Paulo',
//     estado: 'SP',
//     senha: 'senha1234'
// });


// 19. Exclusão de cliente via API (DELETE)
// Regra de negócio: a API só exclui se o saldo da conta estiver zerado.
async function excluirClienteNaAPI(cpf) {
    const resposta = await fetch(`${API_CLIENTES}/${encodeURIComponent(cpf)}`, {
        method: 'DELETE'
    });

    // Lê como texto: a API pode responder com texto, JSON ou corpo vazio (204)
    const texto = await resposta.text();
    let resultado;
    try {
        resultado = texto ? JSON.parse(texto) : '';
    } catch {
        resultado = texto;
    }

    // Erro tratado (ex.: conta ainda possui saldo)
    if (!resposta.ok) {
        const mensagem = typeof resultado === 'string'
            ? resultado
            : (resultado.message || resultado.erro || `HTTP ${resposta.status}`);
        console.error(`Não foi possível excluir (HTTP ${resposta.status}):`, mensagem || 'conta com saldo ou cliente inexistente');
        throw new Error(mensagem || `HTTP ${resposta.status}`);
    }

    console.log(`Cliente excluído com sucesso (HTTP ${resposta.status}):`, resultado || 'Cliente excluído.');
    return resultado;
}

// Versão para colar direto no console (use o CPF cadastrado):
// excluirClienteNaAPI('529.982.247-25');
