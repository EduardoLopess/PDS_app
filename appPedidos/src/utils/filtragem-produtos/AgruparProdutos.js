export const agruparPorTipo = (produtos) => {
  return produtos.reduce((acc, item) => {
    const categoria = item.tipoProduto || 'Outros';
    const existente = acc.find(sec => sec.categoria === categoria);
    if (existente) {
      existente.data.push(item);
    } else {
      acc.push({ categoria, data: [item] });
    }
    return acc;
  }, []);
};
