
const cpf = '529.982.247-25';
const senha = 'senha1234';

fetch('https://senac-bank-api.dennislopes.com.br/api/clientes/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cpf, senha })
})
    .then(async (response) => {
        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || `HTTP ${response.status}`);
        }
        return response.json();
    })
    .then((cliente) => {
        const nome = cliente.nome || (cliente.cliente && cliente.cliente.nome) || '';
        console.log(`Bem-vindo(a), ${nome}!`);
        console.log('Dados do cliente logado:', cliente);
    })
    .catch((erro) => console.error('Falha no login:', erro.message));
