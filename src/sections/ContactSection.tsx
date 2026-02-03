import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Copy, Check, Mail, MapPin, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo/5 border border-indigo/10">
              <div className="w-10 h-10 bg-indigo/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-dark truncate">sushantshakya191@gmail.com</p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-teal" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-primary" />
                )}
              </button>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-teal/5 border border-teal/10">
              <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="font-sans text-sm text-dark">Patan, Nepal</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-gray-muted mb-2 block">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="input-elegant pl-11"
                  />
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-gray-muted mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="input-elegant pl-11"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-gray-muted mb-2 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="input-elegant resize-none"
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto min-w-[200px]"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
