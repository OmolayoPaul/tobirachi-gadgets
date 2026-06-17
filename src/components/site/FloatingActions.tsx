import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function FloatingActions() {
  return (
    <a
      href={waLink("Hi TOBIRACHI! I have a question.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
