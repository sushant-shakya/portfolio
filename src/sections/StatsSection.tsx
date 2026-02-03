import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code, Smartphone, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
  isVisible: boolean;
}

const StatCard = ({ icon, value, label, delay, isVisible }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 1000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeProgress * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return (
    <div className="card-retro bg-retro-secondary p-6 flex flex-col items-center">
      <div className="text-retro-accent mb-4">{icon}</div>
      <div className="font-pixel text-3xl md:text-4xl text-white mb-2">
        {displayValue}%
      </div>
      <div className="font-mono text-xs text-white/60 tracking-wider">
        {label}
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 bg-white/10 mt-4 overflow-hidden">
        <div
          className="h-full bg-retro-accent transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${value}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: <Palette className="w-8 h-8" />, value: 85, label: 'UI DESIGN' },
    { icon: <Code className="w-8 h-8" />, value: 90, label: 'FRONTEND' },
    { icon: <Smartphone className="w-8 h-8" />, value: 80, label: 'RESPONSIVE' },
    { icon: <Zap className="w-8 h-8" />, value: 75, label: 'PERFORMANCE' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
        },
      });

      // ENTRANCE (0% - 30%)
      // Heading entrance
      scrollTl.fromTo(
        headingRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Cards entrance from bottom
      scrollTl.fromTo(
        cardsRef.current?.children || [],
        { y: '70vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, ease: 'none' },
        0
      );

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headingRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardsRef.current?.children || [],
        { y: 0, opacity: 1 },
        { y: '-40vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="section-pinned bg-retro-primary flex flex-col items-center justify-center"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-pixel text-xl md:text-2xl lg:text-3xl text-white text-center mb-8 lg:mb-12"
      >
        STATS
      </h2>

      {/* Stats Grid */}
      <div
        ref={cardsRef}
        className="w-full max-w-5xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={index * 150}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* XP Ticker */}
      <div className="absolute bottom-8 left-0 right-0 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="font-mono text-sm text-white/30 mx-8"
            >
              XP: 4+ YEARS • LEVEL: PRO • CLASS: DEVELOPER
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
