import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

const projects: Project[] = [
  {
    title: 'National Cancer Hospital',
    category: 'Website / UI',
    description: 'A modern healthcare website designed to provide patients with easy access to information and services.',
    image: '/project-cancer-new.jpg',
    link: 'https://nationalcancerhospital.com',
    color: 'indigo',
  },
  {
    title: 'Marque Marketing',
    category: 'Web Design',
    description: 'Digital marketing agency website with bold visual identity and engaging user experience.',
    image: '/project-marque-new.jpg',
    link: 'https://marquemarketing.com.np',
    color: 'coral',
  },
  {
    title: 'Shakya Dynasty',
    category: 'Brand + Web',
    description: 'Cultural heritage brand website showcasing rich history with elegant design.',
    image: '/project-shakya-new.jpg',
    link: 'https://shakyadynasty.com',
    color: 'teal',
  },
];

const getTagColor = (color: string) => {
  const colors: Record<string, string> = {
    indigo: 'bg-indigo/10 text-indigo',
    coral: 'bg-coral/10 text-coral',
    teal: 'bg-teal/10 text-teal',
  };
  return colors[color] || colors.indigo;
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
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
      id="projects"
      className="section-padding bg-soft relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-coral/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-max relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 lg:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-coral mb-4 block">
              Portfolio
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-dark">
              Selected <span className="gradient-text">Work</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-gray-primary max-w-md mt-4 md:mt-0">
            A collection of projects I've worked on, showcasing my skills in design and development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[16/10] shadow-soft">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Arrow Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ExternalLink className="w-5 h-5 text-dark" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className={`label-tag mb-3 ${getTagColor(project.color)}`}>
                    {project.category}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-dark mb-2 group-hover:text-indigo transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="font-sans text-sm text-gray-primary leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
