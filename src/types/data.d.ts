interface UserProps {
  [key: string]: string;
  name: string;
  birthday: string;
  address: string;
  github: string;
  linkedin: string;
  email: string;
  company: string;
}

type SkillType = {
  name: string;
  src: string;
  score: number;
};

interface SkillProps {
  frontend: Array<SkillType>;
  backend: Array<SkillType>;
  'devops&tools': Array<SkillType>;
}

interface CareerProjectProps {
  key: string;
  name: string;
  term: string;
  roles: Array<string>;
  man?: Array<string>;
  skills: Array<string>;
  intro: Array<string>;
  result?: Array<string>;
  images?: Array<string>;
  featured?: boolean;
  visible?: boolean;
}
interface WorkItemProps {
  title: string;
  details?: Array<string>;
}

interface CompanyProps {
  key: string;
  name: string;
  term: string;
  position: string;
  description?: string;
  works: Array<WorkItemProps>;
  projects: Array<CareerProjectProps>;
}

interface SideProjectProps {
  key: string;
  name: string;
  skills: string;
  url: string;
  image?: string;
  /** 캡처가 여러 장인 경우 사용. 지정하면 image 대신 이 목록을 스와이프로 보여줍니다 */
  images?: Array<string>;
  github?: string;
  intro?: Array<string>;
}
