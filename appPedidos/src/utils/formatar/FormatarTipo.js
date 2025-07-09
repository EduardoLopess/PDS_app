export const formatarTipoProduto = (tipo) => {
  const map = {
    LongNeck: 'Long Neck',
    Cerveja600: '600ml',
    CervejaLatao: 'Latão',
    CervejaLitro: '1L',
    AguaSemGaz: 'Água sem gás',
    AguaComGaz: 'Água com gás',
    RefrigeranteLata: 'Refrigerante Lata',
    Refrigerante600: 'Refrigerante 600ml',
    Suco: 'Suco',
    Drink: 'Drink',
    Caipirinha: 'Caipirinha',
    SemPeixe: 's/Peixe',
    Peixe: 'Peixe'
  };

  return map[tipo] || tipo; 
};


export const formatarTipoProdutoCarrinho = (tipo) => {
  const map = {
    LongNeck: 'Long Neck',
    Cerveja600: '600ml',
    CervejaLatao: 'Latão',
    CervejaLitro: '1L',
    AguaSemGaz: 's/gás',
    AguaComGaz: 'c/gás',
    RefrigeranteLata: 'Lata',
    Refrigerante600: '600ml',
    Suco: 'Suco',
    Drink: 'Drink',
    Caipirinha: 'Caipira',
    SemPeixe: 's/Peixe',
    Peixe: 'Peixe'
  };

  return map[tipo] || tipo; 
};