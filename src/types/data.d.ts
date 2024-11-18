interface UserProps {
  [key: string]: string;
  name: string;
  birthday: string;
  address: string;
  github: string;
  email: string;
  company: string;
}

type SkillType = {
  name: string;
  src: string;
};

interface SkillProps {
  frontend: Array<SkillType>;
  backend: Array<SkillType>;
  scm: Array<SkillType>;
  database: Array<SkillType>;
  blockchain: Array<SkillType>;
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
}
interface CompanyProps {
  key: string;
  name: string;
  term: string;
  works: Array<string>;
  projects: Array<CareerProjectProps>;
}

interface SideProjectProps {
  key: string;
  name: string;
  skills: string;
  url: string;
  image?: string;
  github?: string;
  intro?: Array<string>;
}
