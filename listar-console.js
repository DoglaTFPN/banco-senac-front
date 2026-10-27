
fetch('https://senac-bank-api.dennislopes.com.br/api/clientes')
    .then(async (response) => {
        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || `HTTP ${response.status}`);
        }
        return response.json();
    })
    .then((dados) => {
        // A lista pode vir direto como array ou dentro de um objeto
        const lista = Array.isArray(dados)
            ? dados
            : (dados.clientes || dados.content || dados.data || []);
        console.log(`Total de clientes: ${lista.length}`);
        console.table(lista);
    })
    .catch((erro) => console.error('Falha ao listar clientes:', erro.message));
