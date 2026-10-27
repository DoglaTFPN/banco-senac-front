
const cpf = '529.982.247-25';

fetch(`https://senac-bank-api.dennislopes.com.br/api/clientes/${encodeURIComponent(cpf)}/ativar`, {
    method: 'PATCH'
})
    .then(async (res) => {
        // A API pode responder com texto puro ou JSON
        const texto = await res.text();
        let corpo;
        try { corpo = JSON.parse(texto); } catch { corpo = texto; }
        if (!res.ok) throw corpo;
        return corpo;
    })
    .then((resposta) => console.log('Conta ativada:', resposta))
    .catch((erro) => console.error('Erro ao ativar:', erro));
