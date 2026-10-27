

fetch('https://senac-bank-api.dennislopes.com.br/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nome: 'Douglas Saragoza da Silva',
        cpf: '529.982.247-25',          // CPF válido de teste
        email: 'seu.nome@exemplo.com',
        celular: '(11) 91234-5678',
        cep: '01310-100',
        endereco: 'Av. Paulista, 1000 - Apto 42',
        cidade: 'São Paulo',
        estado: 'SP',
        senha: 'senhaforte1'              // mínimo 8 caracteres
    })
})
    .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw json;
        return json;
    })
    .then((cliente) => console.log('Cliente cadastrado:', cliente))
    .catch((erro) => console.error('Erro no cadastro:', erro));
