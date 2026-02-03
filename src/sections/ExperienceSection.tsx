import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  period: string;
  company: string;
  role: string;
  description?: string;
  type: 'work' | 'education' | 'training';
}

const experiences: Experience[] = [
  {
    period: 'Mar 2024 – Present',
    company: 'Freelance',
    role: 'Designer / Developer',
    description: 'Collaborating with product managers and designers to create comprehensive design systems. Designing and developing new user interfaces for web applications.',
    type: 'work',
  },
  {
    period: 'Mar 2023 – July 2023',
    company: 'Proshore Nepal Pvt Ltd',
    role: 'Frontend Developer',
    description: 'Implementation and maintaining UI/UX utilizing modern web design such as Figma, Illustrator and best practices for user experience and accessibility.',
    type: 'work',
  },
  {
    period: '2022',
    company: 'Animax Academy',
    role: 'Graphics Design',
    description: 'Completed professional graphics design training with focus on visual design principles and tools.',
    type: 'training',
  },
  {
    period: '2022',
    company: 'Hinode Japanese Language Institute',
    role: 'Japanese Language',
    description: 'Completed Japanese language course, enhancing communication skills for international collaboration.',
    type: 'training',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Briefcase className="w-4 h-4" />;
    case 'education':
      return <GraduationCap className="w-4 h-4" />;
    case 'training':
      return <Award className="w-4 h-4" />;
    default:
      return <Briefcase className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'work':
      return 'bg-indigo/10 text-indigo border-indigo/20';
    case 'training':
      return 'bg-teal/10 text-teal border-teal/20';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Timeline line animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Experience items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -20 : 20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding bg-pure relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-teal/5 to-transparent pointer-events-none" />
      
      <div className="container-max relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-teal mb-4 block">
            Background
          </span>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-dark">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div
            ref={timelineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 origin-top hidden md:block"
            style={{ background: 'linear-gradient(180deg, #6366F1 0%, #14B8A6 50%, #F97316 100%)' }}
          />

          {/* Experience Items */}
          <div className="space-y-10 lg:space-y-14">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-3 w-4 h-4 rounded-full -translate-x-1/2 border-4 border-white shadow-md z-10"
                  style={{ background: index % 2 === 0 ? '#6366F1' : '#14B8A6' }}
                />

                {/* Date */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-muted">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 md:pl-0">
                  <div className="card-elegant p-6 lg:p-8 relative overflow-hidden">
                    {/* Type Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider mb-4 border ${getTypeColor(exp.type)}`}>
                      {getIcon(exp.type)}
                      {exp.type}
                    </div>

                    <h3 className="font-heading font-semibold text-lg text-dark mb-1">
                      {exp.company}
                    </h3>
                    <p className="font-sans text-sm text-indigo mb-3">
                      {exp.role}
                    </p>
                    {exp.description && (
                      <p className="font-sans text-sm text-gray-primary leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo/5 to-transparent rounded-bl-full" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
