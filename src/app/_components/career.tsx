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
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Calendar, Building, TrendingUp, Eye, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOrigin, setDialogOrigin] = useState({ x: 0, y: 0 });

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    setDialogOrigin({
      x: btnX - window.innerWidth / 2,
      y: btnY - window.innerHeight / 2,
    });
    setIsOpen(true);
  }, []);

  const content = (
    <div className="space-y-5 mt-2">
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

      {/* Intro */}
      {project.intro && project.intro.length > 0 && (
        <div className="rounded-lg bg-muted/40 p-4">
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

      {/* Skills */}
      {project.skills && project.skills.length > 0 && (
        <div>
          <h4 className="font-medium mb-2.5 text-sm flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-cyan-500" />
            기술 스택
          </h4>
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
          <h4 className="font-medium mb-2.5 text-sm flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-emerald-500" />
            담당 역할
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {project.roles.map((role, roleIndex) => (
              <li key={roleIndex} className="flex items-start gap-2">
                <span className="text-cyan-500 mt-0.5">•</span>
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Result */}
      {project.result && project.result.length > 0 && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" />
            주요 성과
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {project.result.map((result, resultIndex) => (
              <li key={resultIndex} className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">•</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const header = (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Calendar size={12} />
      <span>{project.term}</span>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div onClick={handleTriggerClick}>{trigger}</div>
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>{project.name}</DrawerTitle>
            <DrawerDescription asChild>
              <div>{header}</div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div onClick={handleTriggerClick}>{trigger}</div>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        style={
          {
            '--dialog-origin-x': `${dialogOrigin.x}px`,
            '--dialog-origin-y': `${dialogOrigin.y}px`,
          } as React.CSSProperties
        }
      >
        <DialogHeader>
          <DialogTitle className="text-xl pr-8">{project.name}</DialogTitle>
          <DialogDescription asChild>
            <div>{header}</div>
          </DialogDescription>
        </DialogHeader>
        <div className="h-px bg-gradient-to-r from-emerald-500/60 via-cyan-500/60 to-emerald-500/60" />
        {content}
      </DialogContent>
    </Dialog>
  );
};

/**
 * 주요 업무 및 성과 Collapsible 컴포넌트
 */
const WorksCollapsible = ({ works }: { works: WorkItemProps[] }) => {
  const hasDetails = works.some(
    (work) => work.details && work.details.length > 0
  );
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 500);
      }
    }
    setIsOpen(open);
  }, []);

  return (
    <Collapsible ref={sectionRef} open={isOpen} onOpenChange={handleOpenChange}>
      <h4 className="font-medium mb-3">주요 업무 및 성과</h4>
      <div className="relative">
        <ul className="text-sm text-muted-foreground space-y-3">
          {works.map((work, workIndex) => (
            <li key={workIndex}>
              <div className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span className="font-medium text-foreground">
                  {work.title}
                </span>
              </div>
              {work.details && work.details.length > 0 && (
                <CollapsibleContent>
                  <ul className="ml-6 mt-1 space-y-1">
                    {work.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <span className="text-cyan-500">-</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              )}
            </li>
          ))}
        </ul>
        {hasDetails && !isOpen && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        )}
      </div>
      {hasDetails && (
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-center gap-1.5 w-full pt-2 group">
            <span className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent animate-bounce">
              {isOpen ? '접을까요?' : '더 있어요!'}
            </span>
            <ChevronDown
              size={18}
              className="text-muted-foreground transition-transform duration-300 group-hover:text-foreground data-[open=true]:rotate-180"
              data-open={isOpen}
            />
          </button>
        </CollapsibleTrigger>
      )}
    </Collapsible>
  );
};

/**
 * 프로젝트 카드 컴포넌트
 */
const ProjectCard = ({
  project,
  side = 'left',
}: {
  project: CareerProjectProps;
  side?: 'left' | 'right';
}) => (
  <div className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5">
    {/* 그라데이션 바 - 타임라인 방향을 향함 */}
    <div
      className={`absolute top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-emerald-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
        side === 'right' ? 'right-0' : 'left-0'
      }`}
    />

    <h5 className="font-semibold text-sm leading-snug mb-1.5">
      {project.name}
    </h5>
    <div className="flex items-center gap-1.5 mb-2">
      <Calendar size={11} className="text-muted-foreground" />
      <span className="text-[11px] text-muted-foreground">{project.term}</span>
    </div>

    {project.intro && project.intro.length > 0 && (
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
        {project.intro[0]}
      </p>
    )}

    {project.skills && project.skills.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="text-[11px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground/60">
            +{project.skills.length - 4}
          </span>
        )}
      </div>
    )}

    <ProjectDetailModal
      project={project}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
        >
          <Eye size={14} className="mr-2" />
          상세보기
        </Button>
      }
    />
  </div>
);

/**
 * 프로젝트 Collapsible 컴포넌트
 */
const ProjectsCollapsible = ({
  projects,
  side = 'left',
}: {
  projects: CareerProjectProps[];
  side?: 'left' | 'right';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const hasOthers = otherProjects.length > 0;
  // 기본 0.3s + 프로젝트당 0.15s, 최대 1.5s
  const duration = Math.min(0.3 + otherProjects.length * 0.15, 1.5);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, duration * 1000);
        }
      }
      setIsOpen(open);
    },
    [duration]
  );

  return (
    <Collapsible ref={sectionRef} open={isOpen} onOpenChange={handleOpenChange}>
      <h4 className="font-medium mb-3">진행했던 프로젝트</h4>
      <div className="relative">
        <div className="grid grid-cols-1 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.key} project={project} side={side} />
          ))}
        </div>
        {hasOthers && !isOpen && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
        )}
      </div>
      {hasOthers && (
        <>
          <CollapsibleContent duration={duration}>
            <div className="grid grid-cols-1 gap-4 pt-4">
              {otherProjects.map((project) => (
                <ProjectCard key={project.key} project={project} side={side} />
              ))}
            </div>
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <button className="flex items-center justify-center gap-1.5 w-full pt-3 group">
              <span className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent animate-bounce">
                {isOpen ? '접을까요?' : '더 있어요!'}
              </span>
              <ChevronDown
                size={18}
                className="text-muted-foreground transition-transform duration-300 group-hover:text-foreground data-[open=true]:rotate-180"
                data-open={isOpen}
              />
            </button>
          </CollapsibleTrigger>
        </>
      )}
    </Collapsible>
  );
};

/**
 * Career 섹션 컴포넌트
 * 경력 사항을 타임라인 형태로 표시합니다
 */
const Career = ({ careers }: CareerProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;

      // 타임라인 영역이 뷰포트에 들어온 정도를 계산
      const entered = windowHeight - rect.top;
      const ratio = Math.max(0, Math.min(1, entered / (totalHeight + windowHeight * 0.5)));
      setProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          ref={timelineRef}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline line - 배경 트랙 */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border/40" />
          {/* Timeline line - 스크롤 진행선 */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-emerald-500 will-change-transform origin-top"
            style={{ height: '100%', transform: `scaleY(${progress})` }}
          />

          <div className="space-y-16">
            {careers.map((company, index) => (
              <motion.div
                key={company.key}
                variants={cardVariants}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 md:bottom-0 z-10 flex justify-center">
                  <div className="md:sticky md:top-1/2 md:-translate-y-1/2 flex items-center gap-3 h-fit">
                    {/* 도트 */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 animate-timeline-ping" />
                      <div className="w-7 h-7 rounded-full border-2 border-emerald-500/40 bg-background flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                      </div>
                    </div>
                    {/* 회사명 + 기간 라벨 */}
                    <div
                      className={`hidden md:flex flex-col absolute top-1/2 -translate-y-1/2 ${
                        index % 2 === 0 ? 'right-full mr-3' : 'left-full ml-3'
                      }`}
                    >
                      <span className="text-[11px] font-semibold text-foreground/80 whitespace-nowrap">
                        {company.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {company.term}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ml-8 md:ml-0 ${
                    index % 2 !== 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <Card className="bg-card/50 backdrop-blur-sm hover:border-emerald-500/25 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)] hover:scale-[1.005] transition-all duration-300">
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
                      {/* Description */}
                      {company.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {company.description}
                        </p>
                      )}

                      {/* Works */}
                      {company.works && company.works.length > 0 && (
                        <WorksCollapsible works={company.works} />
                      )}

                      {/* Projects */}
                      {company.projects && company.projects.length > 0 && (
                        <ProjectsCollapsible
                          projects={company.projects}
                          side={index % 2 === 0 ? 'right' : 'left'}
                        />
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
