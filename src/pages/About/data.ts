export type WorkExperience = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    company: "REA Group",
    position: "Developer",
    startDate: new Date(2021, 8),
    endDate: null,
    description: [],
  },
  {
    company: "AroFlo",
    position: "Web Developer",
    startDate: new Date(2019, 7),
    endDate: new Date(2021, 8),
    description: [
      "Working as a full stack developer. Delivering new features to AroFlo Platform which is an industry leading product in Australia, my current main involves in the platform include but not limited to project management, quotes, invoices, payment integration areas.",
    ],
  },
  {
    company: "PTEPLUS",
    position: "Development Lead",
    startDate: new Date(2018, 0),
    endDate: new Date(2019, 4),
    description: [
      "Work with the dev team on two main products. Design and implement IT architecture on the clouding computing platforms (AWS and Aliyun). Deliver stable, rapid responsible and reliable web applications to product's users.",
    ],
  },
  {
    company: "PTEPLUS",
    position: "Full Stack Developer",
    startDate: new Date(2016, 9),
    endDate: new Date(2018, 0),
    description: [
      "One of the key contributors to the start-up company, and participated in almost every stage of product design, implement and testing. Took responsibilities on full solutions to the technical side such as coding and servers’ setup.",
    ],
  },
];

export const backendStack: string[] = [
  "PHP, Laravel, Moodle",
  "Composer package development",
  "Message Queue, MVC",
  "MySQL, MSSQL, Redis",
  "Linux management",
  "Unit Testing / TDD",
  "Payment Integration",
  "Python, ColdFusion, Java",
];

export const frontendStack: string[] = [
  "HTML",
  "JavaScript, Vue, React, jQuery",
  "CSS, SASS, TailwindCSS, Bootstrap",
  "Webpack",
];

export const devOpsStack: string[] = [
  "AWS, Aliyun",
  "Infrastructure planning and implementing",
  "Horizontal scaling",
  "Docker, ECS",
  "Cloud data and files managements",
  "CI/CD, GitlabCI, CircleCI",
];
