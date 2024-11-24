'use client';

import { memo, useEffect, useState } from 'react';

interface CareerSectionProps {
  onDataLoaded: () => void;
}

const Skeleton = () => (
  <div>
    {/* 탭 메뉴 스켈레톤 */}
    <div className="flex space-x-4 border-b border-gray-700 pb-2 mb-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-32 bg-gray-700 rounded animate-pulse"
        ></div>
      ))}
    </div>

    {/* 탭 내용 스켈레톤 */}
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-gray-800 rounded-lg shadow-lg animate-pulse"
        >
          <div className="h-6 bg-gray-700 w-48 mb-4 rounded"></div>
          <div className="h-4 bg-gray-700 w-32 mb-2 rounded"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, innerIndex) => (
              <div
                key={innerIndex}
                className="h-4 bg-gray-700 w-full rounded"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default memo(function CareerSection({
  onDataLoaded,
}: CareerSectionProps) {
  const [careerData, setCareerData] = useState<CompanyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await fetch('/api/career');
        const data = await response.json();
        setCareerData(data);
        setLoading(false);
        setActiveTab(data[0].key);
        onDataLoaded();
      } catch (error) {
        console.error('Failed to fetch career data:', error);
        setLoading(false);
      }
    };

    fetchCareerData();
  }, [onDataLoaded]);

  if (loading) {
    return (
      <section
        id="career"
        className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-mint text-center">
            Career
          </h2>
          <Skeleton />
        </div>
      </section>
    );
  }

  return (
    <section
      id="career"
      className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-mint text-center">
          Career
        </h2>

        {/* 탭 메뉴 */}
        <div className="flex space-x-4 border-b border-gray-700 pb-2 mb-8">
          {careerData.map((company) => (
            <button
              key={company.key}
              onClick={() => setActiveTab(company.key)}
              className={`px-4 py-2 text-sm font-bold ${
                activeTab === company.key
                  ? 'text-mint border-b-2 border-mint'
                  : 'text-gray-400'
              }`}
            >
              {company.name} ({company.term})
            </button>
          ))}
        </div>

        {/* 활성화된 탭 내용 */}
        <div>
          {careerData
            .filter((company) => company.key === activeTab)
            .map((company) => (
              <div key={company.key}>
                {/* 회사 정보 */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-mint">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-400">{company.term}</p>
                  <ul className="list-disc list-inside text-gray-300 mt-4 space-y-1">
                    {company.works.map((work, index) => (
                      <li key={index} className="text-sm">
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 프로젝트 목록 */}
                <div className="space-y-8">
                  {company.projects.map((project) => (
                    <div
                      key={project.key}
                      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                    >
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-mint">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                          {project.term}
                        </p>

                        {/* 스킬 섹션 */}
                        <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-4">
                          {project.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-800 px-3 py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* 팀 구성원 섹션 */}
                        <div className="text-gray-300 mb-4">
                          <h5 className="text-lg font-semibold mb-2">Team</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {project?.man?.map((member, index) => (
                              <li key={index} className="text-sm">
                                {member}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* intro, result 섹션 */}
                        <div className="text-gray-300 mb-4">
                          <h5 className="text-lg font-semibold mb-2">
                            Description
                          </h5>
                          <p>{project.intro[0]}</p>
                        </div>
                        <div className="text-gray-300 mb-4">
                          <h5 className="text-lg font-semibold mb-2">
                            Outcome
                          </h5>
                          <p>{project?.result?.[0]}</p>
                        </div>
                      </div>

                      {/* Roles 섹션 */}
                      <div className="p-6 bg-gray-800 border-t border-gray-700">
                        <h5 className="text-lg font-semibold text-mint mb-4">
                          담당 업무
                        </h5>
                        <ul
                          className={`list-disc list-inside text-gray-300 space-y-2 transition-all ${
                            expanded === project.key ? '' : 'line-clamp-4'
                          }`}
                        >
                          {project.roles.map((role, index) => (
                            <li key={index} className="text-sm">
                              {role}
                            </li>
                          ))}
                        </ul>

                        {/* 펼치기/접기 버튼 */}
                        {project.roles.length > 4 && (
                          <button
                            onClick={() => toggleExpand(project.key)}
                            className="mt-4 text-sm text-mint font-bold underline"
                          >
                            {expanded === project.key ? '접기' : '더 보기'}
                          </button>
                        )}
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
});
