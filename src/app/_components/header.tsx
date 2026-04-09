'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴와 스크롤 효과를 제공합니다
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setIsScrolled(currentScrollY > 20);

        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
          setIsMenuOpen(false);
        }

        setLastScrollY(currentScrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [lastScrollY]);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Career', id: 'career' },
    { name: 'Playgrounds', id: 'playgrounds' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 모바일 메뉴를 먼저 닫고 스크롤 시작
      if (isMenuOpen) {
        setIsMenuOpen(false);
        // 메뉴 닫히는 애니메이션 후 스크롤 실행
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const headerElement = (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 border-t border-border">
                <div className="flex flex-col space-y-4 pt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );

  const headerToggle = (
    <AnimatePresence>
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsVisible(true)}
          className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-background/90 backdrop-blur-md border border-border cursor-pointer group hover:scale-105 transition-transform duration-200"
        >
          <span className="text-[11px] font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            어디로 갈까요?
          </span>
          <ChevronDown
            size={14}
            className="text-emerald-500/60 group-hover:text-emerald-500 animate-bounce transition-colors"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {headerElement}
      {headerToggle}
    </>
  );
};

export default Header;
