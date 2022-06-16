export function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const number = cleaned.substr(cleaned.length - 8);
  const match = number.match(/^(\d{4})(\d{4})$/);
  if (match) return `(+632) ${match[1]} ${match[2]}`;
}
export function formatMobileNumber(phoneNumberString: string) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const number = cleaned.substr(cleaned.length - 10);
  const match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) return `(+63) ${match[1]} ${match[2]} ${match[3]}`;
}
function withComma(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatAmount(amount: number | string) {
  const number = +amount as number;
  return `₱ ${withComma(number.toFixed(2))}`;
}
