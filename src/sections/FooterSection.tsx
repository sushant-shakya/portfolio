import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Dribbble, Twitter, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#', color: 'hover:bg-indigo hover:text-white' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#', color: 'hover:bg-teal hover:text-white' },
  { icon: <Dribbble className="w-5 h-5" />, label: 'Dribbble', href: '#', color: 'hover:bg-coral hover:text-white' },
  { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#', color: 'hover:bg-blue-400 hover:text-white' },
];

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-dark text-white py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
      </div>
      
      <div ref={contentRef} className="container-max relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12 lg:mb-16">
          {/* Logo & Tagline */}
          <div>
            <h3 className="font-heading font-semibold text-2xl mb-4">
              Sushant<span className="text-indigo">.</span>
            </h3>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              UI/Frontend Developer crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-sans text-sm text-white/70 hover:text-indigo transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/70 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-white/40">
            © 2026 Sushant Shakya. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-coral fill-coral" /> in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
