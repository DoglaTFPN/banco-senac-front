const cpf = '529.982.247-25';

fetch(`https://senac-bank-api.dennislopes.com.br/api/clientes/${encodeURIComponent(cpf)}`, {
    method: 'DELETE'
})
    .then(async (res) => {
        const texto = await res.text();
        let corpo;
        try { corpo = texto ? JSON.parse(texto) : ''; } catch { corpo = texto; }

        if (!res.ok) {
            console.error(`Não foi possível excluir (HTTP ${res.status}):`, corpo || 'conta com saldo ou cliente inexistente');
            return;
        }
        console.log(`Cliente excluído com sucesso (HTTP ${res.status}):`, corpo || 'Cliente excluído.');
    })
    .catch((erro) => console.error('Falha na requisição:', erro));
