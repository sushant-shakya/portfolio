import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote animation
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio animation
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '4+', label: 'Years Experience', icon: <Code className="w-5 h-5" />, color: 'indigo' },
    { value: '15+', label: 'Projects Completed', icon: <Palette className="w-5 h-5" />, color: 'teal' },
    { value: '3+', label: 'Happy Clients', icon: <Users className="w-5 h-5" />, color: 'coral' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-pure relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo/5 to-transparent pointer-events-none" />
      
      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Quote */}
          <div ref={quoteRef}>
            <span className="font-mono text-xs uppercase tracking-widest text-indigo mb-6 block">
              About Me
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-dark leading-tight">
              "Design is thinking made{" "}
              <span className="gradient-text">visual</span>."
            </h2>
            
            {/* Decorative line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              <div className="w-4 h-1 bg-teal rounded-full" />
              <div className="w-2 h-1 bg-coral rounded-full" />
            </div>
          </div>

          {/* Bio */}
          <div ref={bioRef} className="lg:pt-10">
            <p className="font-sans text-base lg:text-lg text-gray-primary leading-relaxed mb-6">
              I'm Sushant Shakya, a UI/Frontend Developer based in Patan, Nepal. 
              With over 4 years of experience, I specialize in creating intuitive, 
              pixel-perfect interfaces that bridge the gap between design and development.
            </p>
            <p className="font-sans text-base text-gray-primary leading-relaxed mb-10">
              My approach combines clean aesthetics with solid engineering, ensuring 
              every project not only looks great but performs flawlessly. I believe 
              in the power of thoughtful design to solve real problems.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4 rounded-xl bg-gray-50 hover:shadow-soft transition-shadow"
                >
                  <div className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                    stat.color === 'indigo' ? 'bg-indigo/10 text-indigo' :
                    stat.color === 'teal' ? 'bg-teal/10 text-teal' :
                    'bg-coral/10 text-coral'
                  }`}>
                    {stat.icon}
                  </div>
                  <div className="font-heading font-bold text-2xl lg:text-3xl text-dark mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
