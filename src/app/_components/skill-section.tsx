'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SkillsSection() {
  const [skillData, setSkillData] = useState<SkillProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkillData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch career data:', error);
        setLoading(false);
      }
    };

    fetchSkillData();
  }, []);

  if (loading) {
    return <div className="text-center text-mint">Loading skills data...</div>;
  }

  return (
    <section
      id="skills"
      className="py-16 min-h-svh bg-dark text-grayLight flex items-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-mint text-center">
          Skills
        </h2>
        <div className="space-y-16">
          {Object.entries(skillData).map(([category, skills]) => (
            <div key={category}>
              {/* 카테고리 제목 */}
              <h3 className="text-2xl font-semibold mb-4 capitalize text-mint text-center">
                {category}
              </h3>
              {/* 기술 아이콘 원형 디자인 */}
              <div className="flex flex-wrap justify-center gap-8">
                {(skills as unknown as SkillType[]).map((skill, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center w-28 h-28 bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    {/* 아이콘 */}
                    <Image
                      src={skill.src}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    {/* Hover 텍스트 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 rounded-full transition-opacity">
                      <p className="text-sm font-semibold text-mint text-center">
                        {skill.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
