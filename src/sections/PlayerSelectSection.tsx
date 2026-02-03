import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MapPin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PlayerSelectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Heading entrance
      scrollTl.fromTo(
        headingRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Avatar entrance from left
      scrollTl.fromTo(
        avatarRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Info card entrance from right
      scrollTl.fromTo(
        infoRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Hearts entrance
      scrollTl.fromTo(
        heartsRef.current?.children || [],
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.02, ease: 'back.out(2)' },
        0.15
      );

      // SETTLE (30% - 70%) - Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headingRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        avatarRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        infoRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        heartsRef.current?.children || [],
        { opacity: 1 },
        { opacity: 0, stagger: 0.01 },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-retro-primary flex flex-col items-center justify-center"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-pixel text-xl md:text-2xl lg:text-3xl text-white text-center mb-8 lg:mb-12"
      >
        PLAYER SELECT
      </h2>

      {/* Content Container */}
      <div className="w-full px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Avatar Panel */}
        <div
          ref={avatarRef}
          className="w-full max-w-[340px] lg:w-[34vw] aspect-square border-[3px] border-white p-4 relative"
        >
          <img
            src="/player-avatar.jpg"
            alt="Player Avatar"
            className="w-full h-full object-cover"
          />
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-retro-accent" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-retro-accent" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-retro-accent" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-retro-accent" />
        </div>

        {/* Info Card */}
        <div
          ref={infoRef}
          className="w-full max-w-[500px] lg:w-[38vw] space-y-6"
        >
          <div>
            <h3 className="font-pixel text-lg md:text-xl text-white mb-2">
              SUSHANT SHAKYA
            </h3>
            <p className="font-mono text-sm text-retro-accent">
              UI / FRONTEND DEVELOPER
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-retro-accent" />
              <span className="font-mono text-sm text-white/80">
                PATAN, NEPAL
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-retro-accent" />
              <span className="font-mono text-sm text-white/80">
                sushantshakya191@gmail.com
              </span>
            </div>
          </div>

          <p className="font-sans text-base text-white/70 leading-relaxed">
            I build fast, accessible, and delightful web interfaces. I treat every
            project like a new level—clear goals, smooth mechanics, and a memorable
            finish.
          </p>

          {/* Stats Row */}
          <div className="flex gap-6 pt-4">
            <div className="text-center">
              <div className="font-pixel text-2xl text-retro-accent">4+</div>
              <div className="font-mono text-xs text-white/50 mt-1">YEARS XP</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl text-retro-accent">15+</div>
              <div className="font-mono text-xs text-white/50 mt-1">PROJECTS</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl text-retro-accent">3+</div>
              <div className="font-mono text-xs text-white/50 mt-1">CLIENTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hearts */}
      <div ref={heartsRef} className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4">
        <Heart className="w-6 h-6 text-retro-accent fill-retro-accent animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="w-5 h-5 text-retro-accent fill-retro-accent animate-float" style={{ animationDelay: '0.5s' }} />
        <Heart className="w-6 h-6 text-retro-accent fill-retro-accent animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default PlayerSelectSection;
