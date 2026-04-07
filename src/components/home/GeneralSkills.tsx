export type SkillType = | "programming" | "design" | "architecture" | "methodology";

export type SkillItem = {
  skill: string,
  type: SkillType,
}

type SkillLabelProps = {
  text: string
}

const skills: SkillItem[] = [
  { skill: "Software Developer", type: "programming" },
  { skill: "Systems Programming", type: "programming" },
  { skill: "Machine Learning", type: "programming" },
  { skill: "UI/UX Design", type: "design" },
  { skill: "Prototyping", type: "design" },
  { skill: "API Design", type: "architecture" },
  { skill: "Database Design", type: "architecture" },
  { skill: "Agile", type: "methodology" },
  { skill: "Scrum", type: "methodology" },
  { skill: "DevOps", type: "methodology" },
]

const SkillLabel = ({ text }: SkillLabelProps) => {
  return <p className="bg-[#fde047] py-3 px-4 rounded-3xl mr-3 mb-3">{text}</p>
}

const GeneralSkills = () => {
  return (
    <div className="flex flex-wrap mx-auto mb-20">
      {skills.map((item) => (
        <SkillLabel key={item.skill} text={item.skill} />
      ))}
    </div>
  );
};

export default GeneralSkills;
