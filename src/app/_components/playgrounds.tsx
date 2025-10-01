'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface PlaygroundsProps {
  projects?: SideProjectProps[];
}

/**
 * Playgrounds 섹션 컴포넌트
 * 사이드 프로젝트를 표시합니다
 */
const Playgrounds = ({ projects }: PlaygroundsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.key} variants={cardVariants}>
              <Card className="group hover:shadow-lg transition-all duration-300 h-full bg-card/30 backdrop-blur-sm">
                {project.image && (
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={`/api/images${project.image}`}
                      alt={project.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  {project.skills && (
                    <p className="text-sm text-muted-foreground">
                      {project.skills}
                    </p>
                  )}
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
        </motion.div>
      </div>
    </section>
  );
};

export default Playgrounds;
