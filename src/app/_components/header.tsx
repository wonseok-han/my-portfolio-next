'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴와 스크롤 효과를 제공합니다
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Career', id: 'career' },
    { name: 'Playgrounds', id: 'playgrounds' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Portfolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 w-fit"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
