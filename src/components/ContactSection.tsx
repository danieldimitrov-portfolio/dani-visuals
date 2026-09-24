import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import RichText from "./RichText";
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
    <section id="contact" className="section-pad border-t border-white/10 px-5 md:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-accent-bright">
            Contact
          </p>
          <h2 className="text-4xl text-white sm:text-5xl">Свържи се</h2>
          <RichText
            text={settings.contactIntro}
            className="mt-6 max-w-md font-body text-base"
          />

          <div className="mt-8 flex flex-col gap-3 font-body text-sm text-white">
            {settings.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="hover-purple flex w-fit items-center gap-3 rounded-full border border-white/15 px-4 py-2"
              >
                <Mail size={16} /> {settings.contactEmail}
              </a>
            )}
            {settings.contactPhone && (
              <a
                href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                className="hover-purple flex w-fit items-center gap-3 rounded-full border border-white/15 px-4 py-2"
              >
                <Phone size={16} /> {settings.contactPhone}
              </a>
            )}
          </div>

          {socials.length > 0 && (
            <div className="mt-8 flex gap-3">
              {socials.map((s) => {
                const Icon = getSocialIcon(s.iconKey);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.platform}
                    className="hover-purple flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
