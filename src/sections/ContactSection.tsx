import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, Mail, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sushantshakya191@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-pure relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-teal/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        <div ref={contentRef} className="max-w-2xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-heading font-semibold text-3xl md:text-4xl lg:text-5xl text-dark mb-4">
              Let's <span className="gradient-text">Work Together</span>
            </h2>
            <p className="font-sans text-base text-gray-primary">
              Have a project in mind? I'd love to hear about it.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-indigo/5 border border-indigo/10 flex-1 max-w-sm">
              <div className="w-12 h-12 bg-indigo/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-indigo" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-indigo/60 block mb-1">Email Me</span>
                <p className="font-sans text-base font-medium text-dark truncate">sushantshakya191@gmail.com</p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-teal" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-primary" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-teal/5 border border-teal/10 flex-1 max-w-sm">
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-teal" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-teal/60 block mb-1">Location</span>
                <p className="font-sans text-base font-medium text-dark">Patan, Nepal</p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
