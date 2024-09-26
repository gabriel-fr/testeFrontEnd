export function formatCPF(value) {
  if (!value) return '';
  if (value?.length > 14) return value;

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function formatPhone(value) {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
}

export function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calc = (n) =>
    cpf
      .slice(0, n)
      .split('')
      .reduce((soma, num, i) => soma + num * (n + 1 - i), 0) % 11;

  return calc(9) < 2
    ? 0
    : 11 - calc(9) == cpf[9] && calc(10) < 2
    ? 0
    : 11 - calc(10) == cpf[10];
}
