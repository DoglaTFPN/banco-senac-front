

const cpf = '529.982.247-25';

fetch(`https://senac-bank-api.dennislopes.com.br/api/clientes/${encodeURIComponent(cpf)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nome: 'Douglas Saragoza da Silva',
        cpf: cpf,
        email: 'novo.email@exemplo.com',          // dado novo
        celular: '(11) 98765-4321',               // dado novo
        cep: '04538-132',                         // dado novo
        endereco: 'Av. Brigadeiro Faria Lima, 2000 - Sala 10', // dado novo
        cidade: 'São Paulo',
        estado: 'SP',
        senha: 'senhaforte1'                        // mesma senha do cadastro
    })
})
    .then(async (res) => {
        const texto = await res.text();
        let corpo;
        try { corpo = JSON.parse(texto); } catch { corpo = texto; }
        if (!res.ok) throw corpo;
        return corpo;
    })
    .then((cliente) => console.log('Cliente atualizado:', cliente))
    .catch((erro) => console.error('Erro ao atualizar:', erro));
