'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Calendar, Building, TrendingUp, Briefcase, Eye } from 'lucide-react';
import Image from 'next/image';
import { useIsMobile } from '@/components/ui/use-mobile';

interface CareerProps {
  careers?: CompanyProps[];
}

/**
 * 프로젝트 상세보기 모달/드로어 컴포넌트
 */
const ProjectDetailModal = ({
  project,
  trigger,
}: {
  project: CareerProjectProps;
  trigger: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  const content = (
    <div className="space-y-6 mt-4">
      {/* Project Images */}
      {project.images && project.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {project.images.map((image, imgIndex) => (
            <div
              key={imgIndex}
              className="relative aspect-video rounded overflow-hidden"
            >
              <Image
                src={image}
                alt={`${project.name} screenshot ${imgIndex + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {project.skills && project.skills.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">기술 스택</h4>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Roles */}
      {project.roles && project.roles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-cyan-500" />
            <h4 className="font-medium text-sm">담당 역할</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {project.roles.map((role, roleIndex) => (
              <li key={roleIndex} className="flex items-start gap-2">
                <span className="text-cyan-500">•</span>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Intro */}
      {project.intro && project.intro.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 text-sm">프로젝트 소개</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {project.intro.map((intro, introIndex) => (
              <li key={introIndex} className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>{intro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Result */}
      {project.result && project.result.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-emerald-500" />
            <h4 className="font-medium text-sm">주요 성과</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {project.result.map((result, resultIndex) => (
              <li key={resultIndex} className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>{project.name}</DrawerTitle>
            <DrawerDescription>{project.term}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.term}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

/**
 * Career 섹션 컴포넌트
 * 경력 사항을 타임라인 형태로 표시합니다
 */
const Career = ({ careers }: CareerProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  if (!careers || careers.length === 0) {
    return null;
  }

  return (
    <section id="career" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Career</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            다양한 환경에서의 개발 경험을 통해 쌓아온 전문성과 성과들입니다
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500"></div>

          <div className="space-y-12">
            {careers.map((company, index) => (
              <motion.div
                key={company.key}
                variants={cardVariants}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ml-8 md:ml-0 ${
                    index % 2 !== 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <Card className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl p-2">
                            {company.position}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1 px-2">
                            <Building size={16} className="text-emerald-500" />
                            <span className="text-sm text-muted-foreground">
                              {company.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground p-2">
                          <Calendar size={14} />
                          <span>{company.term}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Works */}
                      {company.works && company.works.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">주요 업무</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {company.works.map((work, workIndex) => (
                              <li
                                key={workIndex}
                                className="flex items-start gap-2"
                              >
                                <span className="text-emerald-500">•</span>
                                <span>{work}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Projects */}
                      {company.projects && company.projects.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">주요 프로젝트</h4>
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {company.projects.map((project) => (
                              <ProjectDetailModal
                                key={project.key}
                                project={project}
                                trigger={
                                  <div className="border border-border rounded-lg p-4 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                      <h5 className="font-medium flex-1">
                                        {project.name}
                                      </h5>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">
                                      {project.term}
                                    </p>

                                    {/* Skills 미리보기 */}
                                    {project.skills &&
                                      project.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                          {project.skills
                                            .slice(0, 3)
                                            .map((skill) => (
                                              <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="text-xs"
                                              >
                                                {skill}
                                              </Badge>
                                            ))}
                                          {project.skills.length > 3 && (
                                            <Badge
                                              variant="secondary"
                                              className="text-xs"
                                            >
                                              +{project.skills.length - 3}
                                            </Badge>
                                          )}
                                        </div>
                                      )}

                                    {/* 프로젝트 소개 미리보기 */}
                                    {project.intro &&
                                      project.intro.length > 0 && (
                                        <div className="mb-3">
                                          <ul className="text-sm text-muted-foreground space-y-1">
                                            {project.intro
                                              .slice(0, 2)
                                              .map((intro, introIndex) => (
                                                <li
                                                  key={introIndex}
                                                  className="flex items-start gap-2"
                                                >
                                                  <span className="text-emerald-500 mt-1 text-xs">
                                                    •
                                                  </span>
                                                  <span className="line-clamp-1 text-xs">
                                                    {intro}
                                                  </span>
                                                </li>
                                              ))}
                                            {project.intro.length > 2 && (
                                              <li className="text-xs text-muted-foreground/60">
                                                ...외 {project.intro.length - 2}
                                                개 항목
                                              </li>
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full"
                                    >
                                      <Eye size={14} className="mr-2" />
                                      상세보기
                                    </Button>
                                  </div>
                                }
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Career;
