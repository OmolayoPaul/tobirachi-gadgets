import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, BookOpen, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { formatNaira } from "@/lib/products";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Tech Training — TOBIRACHI" },
      { name: "description", content: "Practical, instructor-led tech courses in Magboro: graphics, web dev, MS Office, digital marketing, repairs." },
    ],
  }),
  component: TrainingPage,
});

type Course = {
  title: string; duration: string; price: number;
  tools: string; learn: string[]; cert: string;
  comingSoon?: boolean; tag?: string;
};

const COURSES: Course[] = [
  {
    title: "Graphics Design Masterclass",
    duration: "6 weeks", price: 25000,
    tools: "Adobe Photoshop, Illustrator, Canva Pro",
    learn: ["Logo design", "Flyers & banners", "Social media creatives", "Brand identity"],
    cert: "Portfolio + Certificate",
  },
  {
    title: "Web Development Bootcamp",
    duration: "12 weeks", price: 45000,
    tools: "HTML, CSS, JavaScript, React",
    learn: ["Responsive websites", "React applications", "API integration", "Deployment"],
    cert: "Portfolio + Certificate",
    comingSoon: true, tag: "COMING SOON",
  },
  {
    title: "Microsoft Office Professional",
    duration: "4 weeks", price: 15000,
    tools: "Word, Excel, PowerPoint, Outlook",
    learn: ["Advanced Excel formulas", "Professional presentations", "Document formatting", "Email management"],
    cert: "Certificate",
  },
  {
    title: "Digital Marketing & Social Media",
    duration: "6 weeks", price: 30000,
    tools: "Meta Ads, Google Ads, Canva, Analytics",
    learn: ["Ad campaign setup", "Content strategy", "Analytics & reporting", "Social media management"],
    cert: "Certificate",
  },
  {
    title: "Phone & Laptop Repair Training",
    duration: "8 weeks", price: 40000,
    tools: "Hands-on repair skills",
    learn: ["Screen replacement", "Battery swap", "Board-level repair", "Diagnostics"],
    cert: "Certificate + Tool Kit",
    tag: "NEW",
  },
];

function TrainingPage() {
  return (
    <>
      <PageHeader eyebrow="Learn" title="Tech Training" description="Level up your skills with practical, instructor-led courses in Magboro." />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <div key={c.title} className="flex flex-col rounded-xl border border-border/60 bg-card p-6">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-xl font-semibold leading-snug">{c.title}</h3>
                {c.tag && (
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                    c.comingSoon ? "bg-warning/20 text-warning" : "bg-accent/20 text-accent"
                  }`}>{c.tag}</span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Tools: {c.tools}</p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground">{c.duration}</span>
                <span className="font-display text-xl font-bold text-gradient">{formatNaira(c.price)}</span>
              </div>
              <div className="mt-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What you'll learn</div>
                <ul className="space-y-1.5 text-sm">
                  {c.learn.map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="h-3.5 w-3.5 text-primary" /> {c.cert}
              </div>
              <div className="mt-auto pt-6">
                {c.comingSoon ? (
                  <button disabled className="w-full cursor-not-allowed rounded-md bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground">
                    Coming Soon
                  </button>
                ) : (
                  <a
                    target="_blank" rel="noreferrer"
                    href={waLink(`Hi TOBIRACHI! I'm interested in the ${c.title} (${c.duration}, ${formatNaira(c.price)}). Can I enroll?`)}
                    className="block w-full rounded-md bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Enroll Now
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-center font-display text-3xl font-bold">Why Learn with TOBIRACHI?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "Physical Classes", desc: "Learn in-person with expert instructors" },
            { icon: Award, title: "Certificate", desc: "Recognized certificate on completion" },
            { icon: BookOpen, title: "Hands-On Practice", desc: "Real projects, not just theory" },
            { icon: Briefcase, title: "Job Placement Support", desc: "We connect you with opportunities" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card p-6 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
