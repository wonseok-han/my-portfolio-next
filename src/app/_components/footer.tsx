import { ScrollToTopButton } from '@/components/scroll-to-top';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

interface FooterProps {
  user: UserProps;
}

/**
 * Footer 컴포넌트 (Server Component)
 * 사이트 하단 정보와 소셜 링크를 표시합니다
 */
const Footer = ({ user }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    user.github && {
      icon: <FaGithub size={20} />,
      href: user.github,
      label: 'GitHub',
    },
    user.linkedin && {
      icon: <FaLinkedin size={20} />,
      href: user.linkedin,
      label: 'LinkedIn',
    },
    user.email && {
      icon: <Mail size={20} />,
      href: `mailto:${user.email}`,
      label: 'Email',
    },
  ].filter(Boolean);

  return (
    <footer className="bg-card/30 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Copyright */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>
              © {currentYear} {user?.name || 'Portfolio'}. All rights reserved.
            </span>
          </div>

          {/* Center - Logo */}
          <div className="hidden md:block">
            <ScrollToTopButton className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200" />
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(
              (link) =>
                link && (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200 hover:scale-110"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </Link>
                )
            )}
          </div>
        </div>

        {/* Mobile logo */}
        <div className="md:hidden text-center mt-4">
          <ScrollToTopButton className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200" />
        </div>

        {/* Additional info */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            이 사이트는 Next.js, React, TypeScript, Tailwind CSS로
            제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
