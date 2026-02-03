import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.4,
        }
      );

      // Decorative elements animation
      gsap.fromTo(
        decorRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center bg-gradient-hero pt-20 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-teal/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-coral/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Gradient orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo/20 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-gradient-to-tr from-teal/20 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-max w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-gradient-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-indigo">
                UI / Frontend Developer
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-dark leading-[1.1] tracking-tight mb-6">
              Crafting
              <br />
              <span className="gradient-text">Digital</span>
              <br />
              Experiences
            </h1>
            
            <p className="font-sans text-base lg:text-lg text-gray-primary max-w-md mb-8 leading-relaxed">
              I design and build beautiful, functional web interfaces that users love. 
              Based in Patan, Nepal.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary group"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                View My Work
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={scrollToContact}
                className="btn-secondary"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo via-teal to-coral rounded-3xl blur-lg opacity-50" />
              
              <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px] rounded-2xl overflow-hidden shadow-soft-lg">
                <img
                  src="/hero-portrait-color.jpg"
                  alt="Sushant Shakya"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-indigo to-indigo-600 rounded-2xl -z-10 animate-float" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal to-teal-500 rounded-xl -z-10 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-coral to-orange-500 rounded-lg -z-10 animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:flex justify-center mt-16">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-gray-muted hover:text-indigo transition-colors group"
          >
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
