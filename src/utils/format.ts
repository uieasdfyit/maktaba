/**
 * Formats amount into Iraqi Dinars format with comma separators.
 * Example: 5000 -> "5,000 د.ع"
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ar-IQ')} د.ع`;
}

/**
 * Formats amount with standard arabic digits or english formatted digits.
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ar-IQ');
}
