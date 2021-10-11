export function testCpf(strCPF) {
  let sum = 0;
  let rest;
  if (
    !strCPF ||
    strCPF.length !== 11 ||
    strCPF === "00000000000" ||
    strCPF === "11111111111" ||
    strCPF === "22222222222" ||
    strCPF === "33333333333" ||
    strCPF === "44444444444" ||
    strCPF === "55555555555" ||
    strCPF === "66666666666" ||
    strCPF === "77777777777" ||
    strCPF === "88888888888" ||
    strCPF === "99999999999"
  )
    return false;

  let i = 1;
  while (i <= 9) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    i++;
  }

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  i = 1;
  while (i <= 10) {
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    i++;
  }

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

export const maskCpf = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};
