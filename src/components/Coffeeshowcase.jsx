import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Coffee Cup ─────────────────────────────────────────────────────── */
const CoffeeCup = ({ id, size = 160, fillColor = '#6B3A2A', showFill = false, showSteam = false }) => {
    const clipId = `fill-clip-${id}`;
    const fillRectId = `fill-rect-${id}`;

    return (
        <svg
            width={size}
            height={size * 1.1}
            viewBox="0 0 160 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.13))' }}
        >
            <defs>
                <clipPath id={clipId}>
                    {/* liquid fill area inside cup body */}
                    <rect x="28" y="40" width="104" height="90" rx="4" />
                </clipPath>
                <linearGradient id={`cup-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f5ede6" />
                    <stop offset="40%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#e8d5c8" />
                </linearGradient>
                <linearGradient id={`liquid-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5E3C" />
                    <stop offset="100%" stopColor="#4a2412" />
                </linearGradient>
            </defs>

            {/* Saucer */}
            <ellipse cx="80" cy="152" rx="58" ry="10" fill="#e8d5c8" />
            <ellipse cx="80" cy="148" rx="54" ry="7" fill="#edd9c8" />

            {/* Cup body */}
            <path
                d="M28 44 Q26 100 32 130 Q40 148 80 148 Q120 148 128 130 Q134 100 132 44 Z"
                fill={`url(#cup-grad-${id})`}
                stroke="#d4b8a5"
                strokeWidth="1.5"
            />

            {/* Liquid fill (clipped) */}
            {showFill && (
                <g clipPath={`url(#${clipId})`}>
                    <rect
                        id={fillRectId}
                        x="28"
                        y="130"
                        width="104"
                        height="90"
                        fill={`url(#liquid-grad-${id})`}
                        className="coffee-fill-rect"
                        data-id={id}
                    />
                    {/* Liquid surface sheen */}
                    <ellipse cx="80" cy="130" rx="48" ry="6" fill="#a0622a" opacity="0.5" className="coffee-surface" data-id={id} />
                </g>
            )}

            {/* Cup rim */}
            <ellipse cx="80" cy="44" rx="52" ry="10" fill="#f0e2d6" stroke="#d4b8a5" strokeWidth="1.5" />
            <ellipse cx="80" cy="44" rx="44" ry="7" fill="#fdf6f1" />

            {/* Handle */}
            <path
                d="M132 70 Q158 70 158 95 Q158 120 132 118"
                stroke="#d4b8a5"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M132 70 Q150 70 150 95 Q150 118 132 118"
                stroke="#f0e2d6"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
            />

            {/* Steam */}
            {showSteam && (
                <g className="steam-group" data-id={id}>
                    {[0, 1, 2].map((i) => (
                        <path
                            key={i}
                            d={`M${62 + i * 18} 36 Q${58 + i * 18} 20 ${64 + i * 18} 10 Q${70 + i * 18} 0 ${66 + i * 18} -10`}
                            stroke="rgba(180,140,110,0.55)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            className={`steam-wisp steam-wisp-${i}`}
                            style={{
                                animationDelay: `${i * 0.4}s`,
                            }}
                        />
                    ))}
                </g>
            )}

            {/* Decorative ring on cup */}
            <path
                d="M33 80 Q80 88 127 80"
                stroke="#e0c9b8"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
            />
        </svg>
    );
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
const CoffeeShowcase = () => {
    const sectionRef = useRef(null);
    const leftCupRef = useRef(null);
    const rightCupRef = useRef(null);
    const centerCupRef = useRef(null);
    const fillRectRef = useRef(null);
    const fillSurfaceRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add('(min-width: 1px)', () => {
                const isMobile = window.innerWidth < 640;
                const cupOffset = isMobile ? '120vw' : '60vw';
                const cupDownOffset = isMobile ? '50vh' : '40vh';

                // Set initial positions
                gsap.set(leftCupRef.current, { x: `-${cupOffset}`, rotation: -180, opacity: 1 });
                gsap.set(rightCupRef.current, { x: `${cupOffset}`, rotation: 180, opacity: 1 });
                gsap.set(centerCupRef.current, { y: cupDownOffset, opacity: 0, scale: 0.8 });
                gsap.set(titleRef.current, { opacity: 0, y: 30 });
                gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

                // Initial fill rect position (bottom of cup = hidden)
                const fillRects = sectionRef.current.querySelectorAll('.coffee-fill-rect');
                const fillSurfaces = sectionRef.current.querySelectorAll('.coffee-surface');
                gsap.set(fillRects, { y: 90 }); // hidden below clip
                gsap.set(fillSurfaces, { y: 90 });

                // Steam wisps — start invisible
                const steamWisps = sectionRef.current.querySelectorAll('.steam-wisp');
                gsap.set(steamWisps, { opacity: 0, y: 10 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=220%',
                        pin: true,
                        scrub: 1.2,
                        anticipatePin: 1,
                    },
                });

                // Phase 1: Cups roll in (0 → 0.35)
                tl.to(leftCupRef.current, {
                    x: 0,
                    rotation: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, 0)
                    .to(rightCupRef.current, {
                        x: 0,
                        rotation: 0,
                        duration: 1,
                        ease: 'power2.out',
                    }, 0)
                    .to(centerCupRef.current, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'back.out(1.6)',
                    }, 0.15)

                    // Phase 2: Title fades in (0.4 → 0.6)
                    .to(titleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    }, 0.8)
                    .to(subtitleRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                    }, 0.95)

                    // Phase 3: Coffee fill rises in center cup (1.0 → 1.8)
                    .to(fillRects, {
                        y: 0,
                        duration: 1.2,
                        ease: 'power1.inOut',
                    }, 1.1)
                    .to(fillSurfaces, {
                        y: 0,
                        duration: 1.2,
                        ease: 'power1.inOut',
                    }, 1.1)

                    // Phase 4: Background warms (1.5 → 2.0)
                    .to(bgRef.current, {
                        backgroundColor: '#fdf5ee',
                        duration: 0.8,
                        ease: 'power1.inOut',
                    }, 1.4)

                    // Phase 5: Side cups tilt slightly (1.5 → 1.8)
                    .to(leftCupRef.current, {
                        rotation: -6,
                        y: -8,
                        duration: 0.5,
                        ease: 'power1.inOut',
                    }, 1.6)
                    .to(rightCupRef.current, {
                        rotation: 6,
                        y: -8,
                        duration: 0.5,
                        ease: 'power1.inOut',
                    }, 1.6)

                    // Phase 6: Steam appears (2.0 → 2.4)
                    .to(steamWisps, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.4,
                        ease: 'power2.out',
                    }, 2.0);
            });

            return () => mm.revert();
        }, sectionRef);

        // CSS steam animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes steamFloat {
        0%   { transform: translateY(0px) scaleX(1);   opacity: 0.55; }
        50%  { transform: translateY(-12px) scaleX(1.15); opacity: 0.3; }
        100% { transform: translateY(-24px) scaleX(0.9);  opacity: 0; }
      }
      .steam-wisp {
        animation: steamFloat 2.2s ease-in-out infinite;
      }
      .steam-wisp-0 { animation-delay: 0s; }
      .steam-wisp-1 { animation-delay: 0.4s; }
      .steam-wisp-2 { animation-delay: 0.8s; }
    `;
        document.head.appendChild(style);

        return () => {
            ctx.revert();
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Background layer (animates to warm) */}
            <div
                ref={bgRef}
                className="absolute inset-0 transition-colors"
                style={{ backgroundColor: '#ffffff' }}
            />

            {/* Decorative background rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border border-stone-100 opacity-60" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-stone-100 opacity-40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full px-4">

                {/* Top label */}
                <p className="text-[var(--color-cafe-accent)] uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-6 sm:mb-10 opacity-80">
                    The Art of the Cup
                </p>

                {/* Three cups row */}
                <div className="flex items-end justify-center gap-4 sm:gap-10 md:gap-16 mb-8 sm:mb-12">

                    {/* Left cup */}
                    <div ref={leftCupRef} className="flex-shrink-0" style={{ opacity: 1 }}>
                        <div className="transform scale-75 sm:scale-90 md:scale-100 origin-bottom">
                            <CoffeeCup id="left" size={130} showFill={false} showSteam={false} />
                        </div>
                    </div>

                    {/* Center cup — larger, featured */}
                    <div ref={centerCupRef} className="flex-shrink-0 relative">
                        <div className="transform scale-100 sm:scale-110 md:scale-125 origin-bottom">
                            <CoffeeCup id="center" size={150} showFill={true} showSteam={true} />
                        </div>
                    </div>

                    {/* Right cup */}
                    <div ref={rightCupRef} className="flex-shrink-0" style={{ opacity: 1 }}>
                        <div className="transform scale-75 sm:scale-90 md:scale-100 origin-bottom">
                            <CoffeeCup id="right" size={130} showFill={false} showSteam={false} />
                        </div>
                    </div>
                </div>

                {/* Text block */}
                <div className="text-center max-w-lg px-4">
                    <h2
                        ref={titleRef}
                        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-cafe-dark)] mb-3 sm:mb-4 leading-tight"
                    >
                        Brewed to Perfection
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-gray-500 text-sm sm:text-base leading-relaxed"
                    >
                        Every single cup is a ritual — sourced with care, roasted in-house, and crafted by hands that love what they do.
                    </p>
                </div>

                {/* Scroll hint (visible before animation starts) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-xs uppercase tracking-widest text-stone-400">Scroll</span>
                    <div className="w-px h-8 bg-stone-300 animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default CoffeeShowcase;