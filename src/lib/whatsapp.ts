export const WHATSAPP_NUMBER = "2349093929840";
export const WHATSAPP_DISPLAY = "0909 392 9840";
export const PHONE_TEL = "+2349093929840";

export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
