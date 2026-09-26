import { ArrowUpRight, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import LightScene from "./LightScene";
import RichText from "./RichText";
import SectionHeading from "./SectionHeading";
import { getSocialIcon } from "@/lib/social-icons";
import type { SiteSettingsData, SocialLinkData } from "@/lib/types";

export default function ContactSection({
  settings,
  socials,
}: {
  settings: SiteSettingsData;
  socials: SocialLinkData[];
}) {
  return (
    <section id="contact" className="section-pad relative isolate overflow-hidden border-t border-white/10">
      <LightScene seed="contact-rig" variant="overlay" intensity={0.45} className="-z-20 opacity-60" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_55%,rgba(124,58,237,0.2),transparent_42%)]"
      />

      <div className="shell">
        <SectionHeading index="05" label="Контакт" title="Нека запалим|сцената">
          <RichText text={settings.contactIntro} className="text-lg" />
        </SectionHeading>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="label">Директен контакт</p>
            <div className="mt-6 border-t border-white/10">
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 text-white transition-[color,text-shadow] hover:text-violet-soft hover:text-glow"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Mail size={18} className="shrink-0 text-violet-soft" aria-hidden />
                    <span className="truncate">{settings.contactEmail}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:rotate-45" aria-hidden />
                </a>
              )}
              {settings.contactPhone && (
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                  className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 text-white transition-[color,text-shadow] hover:text-violet-soft hover:text-glow"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={18} className="text-violet-soft" aria-hidden />
                    {settings.contactPhone}
                  </span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
                </a>
              )}
            </div>

            {socials.length > 0 && (
              <div className="mt-10">
                <p className="label mb-4">Последвай светлината</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => {
                    const Icon = getSocialIcon(social.iconKey);
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.platform}
                        className="btn-ghost h-12 min-h-0 w-12 p-0"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="reveal border border-violet-soft/25 bg-black/55 p-6 shadow-[0_0_90px_-35px_rgba(168,85,247,0.75)] backdrop-blur-sm sm:p-10 lg:col-span-7">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="label">Project inquiry</p>
                <h3 className="mt-3 text-2xl text-white sm:text-3xl">Разкажи ми за събитието</h3>
              </div>
              <span className="live-dot" aria-hidden />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
