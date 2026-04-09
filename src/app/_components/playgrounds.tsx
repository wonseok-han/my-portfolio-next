'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState, useCallback } from 'react';

interface PlaygroundsProps {
  projects?: SideProjectProps[];
}

/**
 * Playgrounds 섹션 컴포넌트
 * 사이드 프로젝트를 표시합니다
 */
const PAGE_SIZE = 6;

const Playgrounds = ({ projects }: PlaygroundsProps) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="playgrounds" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Playgrounds</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            개인적인 관심사와 새로운 기술 실험을 위한 사이드 프로젝트들입니다
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % PAGE_SIZE) * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:border-emerald-500/25 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)] hover:scale-[1.005] transition-all duration-300 h-full bg-card/30 md:backdrop-blur-sm">
                {project.image && (
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={`/api/images${project.image}`}
                      alt={project.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="px-3">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {project.intro && project.intro.length > 0 && (
                    <div className="mb-3">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.intro.map((intro, introIndex) => (
                          <li
                            key={introIndex}
                            className="flex items-start gap-2"
                          >
                            <span className="text-emerald-500">•</span>
                            <span>{intro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.skills && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.skills.split(',').map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {project.github && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={14} className="mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.url && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleCount < projects.length && (
          <div className="flex flex-col items-center mt-8 gap-1">
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-emerald-500/80" />
            <button
              onClick={handleLoadMore}
              className="group flex flex-col items-center gap-1.5 py-2 px-4"
            >
              <span className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent animate-bounce">
                더 있어요!
              </span>
              <ChevronDown
                size={18}
                className="text-emerald-500/60 group-hover:text-emerald-500 transition-colors"
              />
            </button>
            <span className="text-[11px] text-muted-foreground/50">
              {visibleCount} / {projects.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Playgrounds;
