'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface SkillsSectionProps {
  skills?: SkillProps;
}

/**
 * 스킬 이름에 따른 레벨과 색상 매핑
 */
const getSkillConfig = (name: string, score: number) => {
  const configs: Record<string, { level: number; color: string }> = {
    // Frontend
    HTML: { level: score, color: 'from-orange-500 to-red-500' },
    CSS: { level: score, color: 'from-blue-400 to-blue-600' },
    JavaScript: { level: score, color: 'from-yellow-400 to-yellow-600' },
    TypeScript: { level: score, color: 'from-blue-600 to-blue-400' },
    React: { level: score, color: 'from-blue-500 to-cyan-500' },
    'Next.js': { level: score, color: 'from-gray-800 to-gray-600' },

    // Backend
    Spring: { level: score, color: 'from-green-600 to-green-400' },
    Django: { level: score, color: 'from-gray-700 to-gray-500' },
    Oracle: { level: score, color: 'from-red-500 to-pink-500' },
    MySQL: { level: score, color: 'from-red-600 to-orange-500' },
    // DevOps
    Docker: { level: score, color: 'from-blue-600 to-cyan-400' },
    Git: { level: score, color: 'from-red-600 to-orange-500' },
    Vercel: { level: score, color: 'from-gray-700 to-gray-900' },
    // Blockchain
    WalletConnect: { level: score, color: 'from-purple-500 to-indigo-600' },
  };

  return (
    configs[name] || {
      level: 70,
      color: 'from-gray-500 to-gray-700',
    }
  );
};

/**
 * 스킬 섹션 컴포넌트
 * 기술 스택을 카테고리별로 표시합니다
 */
const Skills = ({ skills }: SkillsSectionProps) => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  // 스킬 데이터가 없으면 빈 배열로 초기화
  const skillCategories = [
    {
      title: 'Frontend',
      skills: skills?.frontend || [],
    },
    {
      title: 'Backend',
      skills: skills?.backend || [],
    },
    {
      title: 'DevOps & Tools',
      skills: skills?.['devops&tools'] || [],
    },
  ].filter((category) => category.skills.length > 0); // 데이터가 있는 카테고리만 표시

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기술 스택</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            다양한 기술을 활용하여 효율적이고 확장 가능한 솔루션을 구축합니다
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={category.title} variants={cardVariants}>
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const config = getSkillConfig(skill.name, skill.score);
                    return (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {config.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${config.level}%` }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
