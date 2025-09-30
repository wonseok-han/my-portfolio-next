'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import Link from 'next/link';

interface HeroProps {
  user?: UserProps;
}

/**
 * Hero 섹션 컴포넌트
 * 사용자 정보와 소개를 표시합니다
 */
const Hero = ({ user }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                안녕하세요,{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {user?.name || '개발자'}
                </span>{' '}
                입니다
              </h1>
            </motion.div>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl"
              variants={itemVariants}
            >
              {user?.intro}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('playgrounds')}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              >
                프로젝트 보기
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
              >
                연락하기
              </Button>
            </motion.div>

            <motion.div className="flex space-x-4 pt-4" variants={itemVariants}>
              {user?.github && (
                <Link
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </Link>
              )}
              <Link
                href="https://www.linkedin.com/in/wonseok-han-2a47b0373/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </Link>
              {user?.email && (
                <Link
                  href={`mailto:${user.email}`}
                  className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative rounded-full overflow-hidden border border-border">
                <ImageWithFallback
                  src="/api/images/assets/profile/profile_image.png"
                  alt="Developer workspace"
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <button
            onClick={() => scrollToSection('skills')}
            className="p-2 rounded-full border border-border hover:bg-muted transition-colors animate-bounce"
            aria-label="Scroll to skills"
          >
            <ArrowDown size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
