import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Atom, 
  FileCode, 
  Palette, 
  Wind, 
  Figma, 
  Server 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 90, icon: <Atom className="w-5 h-5" />, color: 'indigo' },
  { name: 'TypeScript', level: 85, icon: <FileCode className="w-5 h-5" />, color: 'blue' },
  { name: 'UI/UX Design', level: 88, icon: <Palette className="w-5 h-5" />, color: 'coral' },
  { name: 'Tailwind CSS', level: 92, icon: <Wind className="w-5 h-5" />, color: 'teal' },
  { name: 'Figma', level: 85, icon: <Figma className="w-5 h-5" />, color: 'purple' },
  { name: 'Node.js', level: 75, icon: <Server className="w-5 h-5" />, color: 'green' },
];

const SkillBar = ({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setWidth(skill.level);
      }, index * 100);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, skill.level, index]);

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      indigo: 'text-indigo bg-indigo/10',
      blue: 'text-blue-500 bg-blue-500/10',
      coral: 'text-coral bg-coral/10',
      teal: 'text-teal bg-teal/10',
      purple: 'text-purple-500 bg-purple-500/10',
      green: 'text-green-500 bg-green-500/10',
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="space-y-3 p-5 rounded-xl bg-white border border-gray-100 hover:shadow-soft transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClass(skill.color)}`}>
            {skill.icon}
          </div>
          <span className="font-sans text-sm font-medium text-dark">{skill.name}</span>
        </div>
        <span className="font-mono text-sm text-gray-muted">{skill.level}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills visibility trigger
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });

      gsap.fromTo(
        skillsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { title: 'Frontend', skills: 'React, Next.js, TypeScript, Tailwind CSS, JavaScript, HTML/CSS', color: 'indigo' },
    { title: 'Design', skills: 'Figma, Adobe XD, Photoshop, Illustrator, UI/UX, Prototyping', color: 'coral' },
    { title: 'Other', skills: 'Git, WordPress, PHP, jQuery, Responsive Design, Accessibility', color: 'teal' },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding bg-soft relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-indigo/5 to-transparent rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container-max relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo mb-4 block">
            Expertise
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-dark">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.title} className="text-center md:text-left">
                <h4 className={`font-heading font-medium text-dark mb-3 flex items-center justify-center md:justify-start gap-2`}>
                  <span className={`w-2 h-2 rounded-full ${
                    cat.color === 'indigo' ? 'bg-indigo' :
                    cat.color === 'coral' ? 'bg-coral' :
                    'bg-teal'
                  }`} />
                  {cat.title}
                </h4>
                <p className="font-sans text-sm text-gray-primary">
                  {cat.skills}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
