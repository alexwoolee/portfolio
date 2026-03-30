// Data
import { 
  C, Cpp, CSharp, Java, JavaScript, Python, Ruby, SQL, Tailwindcss, TypeScript, 
} from "@/components/icons/icon.js"
// Components
import SkillIconWrapper from "./SkillIconWrapper.jsx";


const Languages = () => {
  return (
    <div className="flex flex-wrap mx-auto mb-20">
      <SkillIconWrapper IconComponent={C} iconName="C" />
      <SkillIconWrapper IconComponent={Cpp} iconName="Cpp" />
      <SkillIconWrapper IconComponent={CSharp} iconName="CSharp" />
      <SkillIconWrapper IconComponent={Java} iconName="Java" />
      <SkillIconWrapper IconComponent={JavaScript} iconName="JavaScript" />
      <SkillIconWrapper IconComponent={Python} iconName="Python" />
      <SkillIconWrapper IconComponent={Ruby} iconName="Ruby" />
      <SkillIconWrapper IconComponent={SQL} iconName="SQL" />
      <SkillIconWrapper IconComponent={Tailwindcss} iconName="Tailwindcss" />
      <SkillIconWrapper IconComponent={TypeScript} iconName="TypeScript" />
    </div>
  );
};

export default Languages;
