export const WHATSAPP_NUMBER = "2349093929840";
export const WHATSAPP_DISPLAY = "0707 379 1611";
export const PHONE_TEL = "+2347073791611";
export const PHONE_TEL_ALT = "+2347068278052";
export const PHONE_DISPLAY_ALT = "0706 827 8052";

export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
