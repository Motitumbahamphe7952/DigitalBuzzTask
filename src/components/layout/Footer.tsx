import { ArrowRight, Briefcase } from "lucide-react";
import FlexRow from "../common/FlexRow";
import { footerSections, socialLinks } from "@/constants";

const Footer = () => {
  const FooterSection = ({
    title,
    links,
  }: {
    title: string;
    links: { label: string; href: string }[];
  }) => (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label} className="group">
            <a
              href={link.href}
              className="text-sm hover:text-white transition-colors flex items-center"
            >
              <ArrowRight className="w-0 h-3 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all group-hover:mr-2" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-[#010d2f] text-gray-400">
      <div className="px-6 md:px-20 lg:px-40 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <FlexRow className="items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-white" />
              <span className="text-white text-xl font-semibold">
                Careersathi
              </span>
            </FlexRow>
            <p className="text-sm">
              Call now:{" "}
              <span className="text-white font-medium">+977-9807343512</span>
            </p>
            <p className="text-xs leading-relaxed mt-1">
              PatanDhoka, Lalitpur, Nepal
            </p>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="px-6 md:px-20 lg:px-40 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm">
              © 2026 Careersathi - Job Portal. All rights Reserved
            </p>
            <FlexRow className="items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </FlexRow>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
