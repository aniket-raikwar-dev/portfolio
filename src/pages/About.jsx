import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import TechCubesScene from "../components/ui/TechCubesScene";
import yorkieLogo from "../assets/yorkie-logo.png";
import {
  RiReactjsLine,
  RiJavascriptLine,
  RiHtml5Line,
  RiCss3Line,
  RiNextjsLine,
  RiBearSmileLine,
} from "react-icons/ri";
import {
  SiTypescript,
  SiVite,
  SiSass,
  SiRedux,
  SiGraphql,
  SiShadcnui,
  SiWebcomponentsdotorg,
  SiTailwindcss,
  SiGit,
  SiJira,
  SiFigma,
  SiVercel,
  SiGithub,
  SiNpm,
  SiPostman,
  SiStorybook,
  SiFramer,
  SiWebpack,
  SiAntdesign,
  SiPnpm,
  SiTestinglibrary,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiExpress,
  SiJsonwebtokens,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Pixel Perfect",
  "Problem Solver",
  "Detail Oriented",
  "Micro-Frontends",
  "Scalable Architecture",
  "Performance First",
  "Accessible UIs",
  "Creative Thinker",
  "Motion Design",
  "React & TypeScript",
  "Web Components",
  "Mentorship Driven",
];

const EXPERIENCE = [
  {
    period: "Mar 2025 – Present",
    role: "Frontend Engineer (L3)",
    company: "Zinnia",
    logo: "https://www.google.com/s2/favicons?domain=zinnia.com&sz=32",
    location: "Nagpur, Maharashtra",
    techStack: [
      { icon: RiReactjsLine, label: "React", color: "#61dafb" },
      { icon: SiVite, label: "Vite", color: "#bd34fe" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: RiBearSmileLine, label: "Zustand", color: "#443e38" },
      { icon: SiWebcomponentsdotorg, label: "Web Comp..", color: "#29abe2" },
      { icon: SiSass, label: "SCSS", color: "#cc6699" },
    ],
    bullets: [
      "Architected a React micro-frontend framework (Vite + TypeScript + Web Components API) from scratch, enabling incremental migration of 4+ legacy JSP modules — reducing feature delivery time by 60%.",
      "Delivered 4 core SmartOffice modules including Dynamic Reports, the platform's highest-revenue feature, replacing legacy JSP with modern React interfaces.",
      "Reduced CLS by 96%, Total Blocking Time by 23%, and Speed Index from 5.8s to 4.5s — improving overall Lighthouse performance by 22%.",
      "Mentoring 2 L1 engineers — assigning feature tasks, conducting code reviews, and guiding them through the React Web Components workflow.",
    ],
  },
  {
    period: "Jun 2023 – Jul 2024",
    role: "Frontend Engineer (L2)",
    company: "York IE",
    logo: yorkieLogo,
    location: "Ahmedabad, Gujarat",
    techStack: [
      { icon: RiNextjsLine, label: "Next.js", color: "#888888" },
      { icon: SiRedux, label: "Redux", color: "#764abc" },
      { icon: SiShadcnui, label: "Shadcn UI", color: "#888888" },
      { icon: RiJavascriptLine, label: "JavaScript", color: "#f7df1e" },
      { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { icon: SiSass, label: "SCSS", color: "#cc6699" },
    ],
    bullets: [
      "Built Squeeze's employment sentiment tracker from scratch using Next.js and Shadcn UI — displaying 12 key metrics in an advanced grouped accordion-table layout, serving enterprises including Pfizer, Udemy, and Celonis.",
      "Rebuilt AmCharts integration from single-line to multi-type chart visualizations with cascading column selection and date-range filters — rendering data 30% faster.",
      "Built a preference center fetching 7 report categories concurrently with role-based access control and real-time multi-select preview.",
    ],
  },
  {
    period: "Sep 2022 – Jul 2023",
    role: "Frontend Engineer (L1)",
    company: "York IE",
    logo: yorkieLogo,
    location: "Ahmedabad, Gujarat",
    techStack: [
      { icon: RiReactjsLine, label: "React", color: "#61dafb" },
      { icon: SiGraphql, label: "GraphQL", color: "#e10098" },
      { icon: RiJavascriptLine, label: "JavaScript", color: "#f7df1e" },
      { icon: SiGit, label: "Git", color: "#f05032" },
      { icon: SiJira, label: "Jira", color: "#0052cc" },
      { icon: RiCss3Line, label: "CSS", color: "#1572b6" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06b6d4" },
    ],
    bullets: [
      "Reduced TBR application detail page load time from 12s to 4s by implementing code splitting, memoization, tree-shaking, and eliminating redundant re-renders.",
      "Stepped in to build ProxyIQ's reporting module (AntV + GraphQL) — engineered dynamic logic to handle both single and multi-chart creation with PDF/CSV export.",
    ],
  },
  {
    period: "Feb 2022 – Apr 2022",
    role: "Software Developer Intern",
    company: "Rhym",
    logo: "https://www.google.com/s2/favicons?domain=rhym.io&sz=32",
    location: "Bangalore, Remote",
    techStack: [
      { icon: RiReactjsLine, label: "React", color: "#61dafb" },
      { icon: RiJavascriptLine, label: "JavaScript", color: "#f7df1e" },
      { icon: RiHtml5Line, label: "HTML", color: "#e34f26" },
      { icon: RiCss3Line, label: "CSS", color: "#1572b6" },
      { icon: SiTailwindcss, label: "Tailwind", color: "#06b6d4" },
    ],
    bullets: [
      "Developed interactive UI components for an ed-tech platform focused on hands-on learning experiences.",
      "Built and iterated on frontend features using React, collaborating closely with the product and design teams.",
    ],
  },
];

const GRID_COLS = 10;
const GRID_ROWS = 7;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

// Center 4x3 block (rows 2-4, cols 3-6) reserved for overlay text
const CENTER_CELLS = new Set([
  23, 24, 25, 26,
  33, 34, 35, 36,
  43, 44, 45, 46,
]);

const SKILL_ICONS = [
  // Row 0 (0-9)
  { icon: RiHtml5Line, label: "HTML5", color: "#e34f26", cell: 0 },
  { icon: RiReactjsLine, label: "React", color: "#61dafb", cell: 2 },
  { icon: SiTypescript, label: "TypeScript", color: "#3178c6", cell: 4 },
  { icon: RiJavascriptLine, label: "JavaScript", color: "#f7df1e", cell: 6 },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933", cell: 8 },
  // Row 1 (10-19)
  { icon: SiVite, label: "Vite", color: "#bd34fe", cell: 10 },
  { icon: RiNextjsLine, label: "Next.js", color: "#888888", cell: 12 },
  { icon: SiRedux, label: "Redux", color: "#764abc", cell: 14 },
  { icon: SiExpress, label: "Express", color: "#888888", cell: 16 },
  { icon: SiShadcnui, label: "Shadcn", color: "#888888", cell: 19 },
  // Row 2 (20-29, center 23-26 reserved)
  { icon: SiTailwindcss, label: "Tailwind", color: "#06b6d4", cell: 20 },
  { icon: SiSass, label: "SCSS", color: "#cc6699", cell: 22 },
  { icon: RiCss3Line, label: "CSS3", color: "#1572b6", cell: 29 },
  // Row 3 (30-39, center 33-36 reserved)
  { icon: SiWebcomponentsdotorg, label: "Web Comp.", color: "#29abe2", cell: 30 },
  { icon: SiGraphql, label: "GraphQL", color: "#e10098", cell: 32 },
  { icon: SiMongodb, label: "MongoDB", color: "#47a248", cell: 37 },
  { icon: RiBearSmileLine, label: "Zustand", color: "#443e38", cell: 39 },
  // Row 4 (40-49, center 43-46 reserved)
  { icon: SiGit, label: "Git", color: "#f05032", cell: 40 },
  { icon: SiFirebase, label: "Firebase", color: "#ffca28", cell: 42 },
  { icon: SiSupabase, label: "Supabase", color: "#3fcf8e", cell: 47 },
  { icon: SiJsonwebtokens, label: "JWT", color: "#d63aff", cell: 49 },
  // Row 5 (50-59)
  { icon: SiStorybook, label: "Storybook", color: "#ff4785", cell: 51 },
  { icon: SiJira, label: "Jira", color: "#0052cc", cell: 53 },
  { icon: SiTestinglibrary, label: "Testing Lib", color: "#e33332", cell: 55 },
  { icon: SiGithub, label: "GitHub", color: "#888888", cell: 57 },
  { icon: SiFramer, label: "Framer", color: "#0055ff", cell: 59 },
  // Row 6 (60-69)
  { icon: SiFigma, label: "Figma", color: "#f24e1e", cell: 60 },
  { icon: SiAntdesign, label: "Ant Design", color: "#0170fe", cell: 62 },
  { icon: SiVercel, label: "Vercel", color: "#888888", cell: 64 },
  { icon: SiPostman, label: "Postman", color: "#ff6c37", cell: 66 },
  { icon: SiWebpack, label: "Webpack", color: "#8dd6f9", cell: 68 },
  { icon: SiNpm, label: "npm", color: "#cb3837", cell: 69 },
];

const skillMap = new Map(SKILL_ICONS.map((s) => [s.cell, s]));

const About = () => {
  const sectionRef = useRef(null);
  const greetRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const imageFrameRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const workSectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const expItemsRef = useRef([]);
  const skillGridRef = useRef(null);
  const skillSectionRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.from(greetRef.current, { y: 30, opacity: 0, duration: 0.7 });

      tl.from(
        headlineRef.current.querySelectorAll(".about-hero__word"),
        { y: 80, opacity: 0, rotateX: 40, duration: 0.9, stagger: 0.08 },
        "-=0.3"
      );

      tl.from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

      tl.from(
        statsRef.current.children,
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );

      tl.from(
        imageFrameRef.current,
        { scale: 0.8, opacity: 0, y: 40, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.7"
      );

      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      gsap.from(".about-marquee", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 1.8,
        ease: "power3.out",
      });

      // Work section heading reveal
      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: workSectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      workTl.from(".about-work__heading", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      workTl.from(
        ".about-work__subtitle",
        { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      // Timeline progress line grows on scroll
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          }
        );
      }

      // Each experience item reveals + dot highlights as the line reaches it
      expItemsRef.current.filter(Boolean).forEach((item, i) => {
        const dot = item.querySelector(".exp-item__dot-fill");
        const content = item.querySelector(".exp-item__content");
        const period = item.querySelector(".exp-item__period");

        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        })
          .from(period, { x: -20, opacity: 0, duration: 0.5, ease: "power3.out" }, 0)
          .from(content, { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.1)
          .to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 0);

        // Bullets stagger in
        const bullets = item.querySelectorAll(".exp-item__bullet");
        gsap.from(bullets, {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        });

        // Tech stack chips pop in
        const chips = item.querySelectorAll(".exp-tech-chip");
        if (chips.length) {
          gsap.from(chips, {
            scale: 0,
            opacity: 0,
            y: 10,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
      // Skill section heading
      if (skillSectionRef.current) {
        gsap.from(".about-skills__heading", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".about-skills__subtitle", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Skill grid
      if (skillGridRef.current) {
        const iconCells = skillGridRef.current.querySelectorAll(".skill-cell--has-icon");

        // Pop in from random order
        gsap.from(iconCells, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: { each: 0.05, from: "random" },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: skillGridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Empty cells fade in
        const emptyCells = skillGridRef.current.querySelectorAll(".skill-cell:not(.skill-cell--has-icon)");
        if (emptyCells.length) {
          gsap.from(emptyCells, {
            opacity: 0,
            duration: 0.3,
            stagger: { each: 0.015, from: "random" },
            scrollTrigger: {
              trigger: skillGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Center tagline
        gsap.from(".skill-grid__tagline", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillGridRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineLines = [
    [
      { text: "I", style: "" },
      { text: "build", style: "" },
      { text: "Interfaces", style: "accent" },
    ],
    [
      { text: "that", style: "" },
      { text: "ship", style: "" },
      { text: "Impact", style: "highlight" },
    ],
    [
      { text: "at", style: "" },
      { text: "Scale", style: "accent" },
    ],
  ];

  return (
    <main className="page about-page" ref={sectionRef}>
      <section className="about-hero">
        <div className="about-hero__left">
          <p className="about-hero__greet" ref={greetRef}>
            Hi, I am Aniket
          </p>

          <h1 className="about-hero__headline" ref={headlineRef}>
            {headlineLines.map((line, lineIdx) => (
              <span className="about-hero__line" key={lineIdx}>
                {line.map((word, i) => (
                  <span
                    key={i}
                    className={`about-hero__word ${word.style ? `about-hero__word--${word.style}` : ""}`}
                  >
                    {word.text}{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="about-hero__subtitle" ref={subtitleRef}>
            Crafting performant, scalable frontends & micro-frontend
            architectures at{" "}
            <strong>Zinnia</strong> — previously shipping enterprise
            products at <strong>York IE</strong>
          </p>

          <div className="about-hero__stats" ref={statsRef}>
            <span className="about-hero__stat">3+ Yrs Exp</span>
            <span className="about-hero__stat-divider" />
            <span className="about-hero__stat">Nagpur, India</span>
          </div>
        </div>

        <div className="about-hero__right">
          <div className="about-hero__image-frame" ref={imageFrameRef}>
            <div className="about-hero__image-placeholder">
              <span>Your Photo</span>
            </div>
          </div>

          <TechCubesScene />
        </div>
      </section>

      <div className="about-marquee">
        <div className="about-marquee__track" ref={marqueeTrackRef}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="about-marquee__item">
              <span className="about-marquee__text">{item}</span>
              <span className="about-marquee__separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="about-work" ref={workSectionRef}>
        <div className="about-work__inner">
          <h2 className="about-work__heading">
            <span className="about-work__heading-bold">Work</span>{" "}
            <span className="about-work__heading-italic">experience</span>
          </h2>
          <p className="about-work__subtitle">
            Where I&rsquo;ve worked and what I&rsquo;ve shipped.
          </p>

          <div className="exp-timeline" ref={timelineRef}>
            <div className="exp-timeline__track">
              <div className="exp-timeline__line-bg" />
              <div className="exp-timeline__line-fill" ref={timelineLineRef} />
            </div>

            {EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                className="exp-item"
                ref={(el) => (expItemsRef.current[i] = el)}
              >
                <div className="exp-item__left">
                  <span className="exp-item__period">{exp.period}</span>
                </div>

                <div className="exp-item__dot-wrapper">
                  <div className="exp-item__dot-ring" />
                  <div className="exp-item__dot-fill" />
                </div>

                <div className="exp-item__content">
                  <h3 className="exp-item__role">{exp.role}</h3>
                  <p className="exp-item__company">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="exp-item__company-logo"
                    />
                    {exp.company}
                  </p>

                  <ul className="exp-item__bullets">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="exp-item__bullet">{bullet}</li>
                    ))}
                  </ul>

                  <div className="exp-item__tech-stack">
                    {exp.techStack.map((tech, ti) => {
                      const Icon = tech.icon;
                      return (
                        <span
                          key={ti}
                          className="exp-tech-chip"
                          style={{ "--chip-color": tech.color }}
                        >
                          <span className="exp-tech-chip__handles" />
                          <Icon className="exp-tech-chip__icon" />
                          <span className="exp-tech-chip__label">{tech.label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-skills" ref={skillSectionRef}>
        <div className="about-skills__header">
          <h2 className="about-skills__heading">
            <span className="about-skills__heading-bold">My</span>{" "}
            <span className="about-skills__heading-italic">toolkit</span>
          </h2>
          <p className="about-skills__subtitle">
            From pixel-perfect UIs to scalable architectures — these are
            the frameworks, languages &amp; tools I reach for every day
            to turn ideas into production-grade products.
          </p>
        </div>

        <div className="skill-grid" ref={skillGridRef}>
          {Array.from({ length: TOTAL_CELLS }, (_, i) => {
            if (CENTER_CELLS.has(i)) {
              return <div key={i} className="skill-cell skill-cell--center" />;
            }
            const skill = skillMap.get(i);
            if (skill) {
              const Icon = skill.icon;
              return (
                <div
                  key={i}
                  className="skill-cell skill-cell--has-icon"
                  style={{ "--sk-color": skill.color }}
                >
                  <Icon className="skill-cell__icon" />
                  <span className="skill-cell__label">{skill.label}</span>
                </div>
              );
            }
            return <div key={i} className="skill-cell" />;
          })}

          <div className="skill-grid__overlay">
            <p className="skill-grid__tagline">
              Frameworks, languages &amp;{" "}
              <span className="skill-grid__tagline-hl">tools</span>{" "}
              I use to craft{" "}
              <span className="skill-grid__tagline-hl">fast</span>,{" "}
              <span className="skill-grid__tagline-hl">scalable</span>{" "}
              products.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
