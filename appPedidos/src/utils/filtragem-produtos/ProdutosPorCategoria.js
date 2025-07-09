export const filtrarProdutosPorCategoria = (produtosData) => {
  const categorias = ['drink', 'cerveja', 'pasteis', 'porcoes', 'semalcool', 'alaminuta'];
  const resultado = {};

  categorias.forEach(cat => {
    console.log(`🔍 Filtrando categoria: ${cat}`);

    const filtrados = produtosData.filter(p => {
      const categoriaProduto = p.categoriaProduto?.toLowerCase();
      const match = categoriaProduto === cat;

      if (match) {
        console.log(`✅ Produto corresponde: ${p.nomeProduto} (categoria: ${categoriaProduto})`);
      }

      return match;
    });

    console.log(`📦 Total de produtos encontrados em ${cat}: ${filtrados.length}`);
    resultado[cat] = filtrados;
  });

  return resultado;
};
