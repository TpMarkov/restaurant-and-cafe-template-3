"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins (guarded for SSR)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO TIMELINE
      // New approach: staggered word reveals and a subtle parallax on the image.
      const heroTitleWords = gsap.utils.toArray(".hero-word");
      gsap.from(heroTitleWords, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.08,
      });

      gsap.from(".hero-sub", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "circ.out",
        delay: 0.25,
      });

      // Parallax effect for layered image using ScrollTrigger (scrubbed)
      gsap.to(".parallax-layer", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-split",
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      // SECTIONS: staggered reveal with different easing & timings than original
      gsap.utils.toArray(".card-reveal").forEach((el: any, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: "expo.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Wide image gallery parallax + reveal
      gsap.utils.toArray(".gallery-item").forEach((item: any, idx) => {
        gsap.fromTo(
          item,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            delay: idx * 0.06,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-brand-sand text-brand-ink">
      <Navigation />

      {/* New section order: Hero -> Offerings -> Gallery -> Menu -> Reservations -> Contact */}
      <HeroSplit />
      <Offerings />
      <GallerySection />
      <MenuSection />
      <ReservationsSection />
      <ContactSection />
    </main>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 lg:px-0">
      <div className="backdrop-blur-sm bg-brand-cream/70 rounded-xl shadow-soft-lg flex items-center justify-between py-3 px-4">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-coral rounded-md flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-serif text-lg">AURORA & CO.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a
            href="#about"
            className="text-brand-muted hover:text-brand-ink transition"
          >
            About
          </a>
          <a
            href="#menu"
            className="text-brand-muted hover:text-brand-ink transition"
          >
            Menu
          </a>
          <a
            href="#gallery"
            className="text-brand-muted hover:text-brand-ink transition"
          >
            Gallery
          </a>
          <a
            href="#reservations"
            className="text-brand-muted hover:text-brand-ink transition"
          >
            Reservations
          </a>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md border"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSplit() {
  // Hero with a split composition: left content, right layered parallax imagery
  return (
    <section className="hero-split relative grid lg:grid-cols-2 items-center gap-8 min-h-[88vh] py-20">
      <div className="px-6 lg:px-12 max-w-2xl">
        <p className="hero-sub text-sm text-brand-emerald uppercase tracking-wider mb-4">
          A modern dining concept
        </p>
        <h1 className="hero-heading text-4xl md:text-6xl font-serif leading-tight text-brand-ink">
          {splitWords("Aurora — A Cinematic Dining Experience")}
        </h1>
        <p className="mt-6 text-base text-brand-muted max-w-prose">
          We craft seasonal menus that celebrate coastal ingredients, refined
          techniques, and a warm, cinematic atmosphere.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#reservations" className="btn-primary">
            Reserve
          </a>
          <a href="#menu" className="btn-ghost">
            Explore Menu
          </a>
        </div>
      </div>

      <div className="relative px-6 lg:px-0">
        <div className="parallax-layer rounded-lg overflow-hidden shadow-soft-lg aspect-[16/11] relative">
          {/* Replace these placeholders with unique wide ambience images. Do NOT reuse original images. */}
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
            alt="Wide ambience"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  const offerings = [
    {
      title: "Seasonal Tasting",
      desc: "A multi-course seasonal tasting menu.",
      key: "off-1",
    },
    {
      title: "Chef's Table",
      desc: "An intimate chef-led experience.",
      key: "off-2",
    },
    {
      title: "Private Events",
      desc: "Curated menus for private dining.",
      key: "off-3",
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <p className="section-subtitle">What We Offer</p>
        <h2 className="section-title">Distinct dining experiences</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((o) => (
            <div
              key={o.key}
              className="card-reveal bg-brand-cream p-6 rounded-lg"
            >
              <h3 className="font-serif text-xl mb-2">{o.title}</h3>
              <p className="text-brand-muted">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const imgs = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  ];
  return (
    <section id="gallery" className="py-20 bg-brand-sand/60">
      <div className="section-container">
        <p className="section-subtitle">Moments</p>
        <h2 className="section-title">Cinematic Views</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <div
              key={src}
              className="gallery-item overflow-hidden rounded-md aspect-[4/3] relative"
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  // Keep route anchor `#menu` for compatibility but present a condensed cards layout
  const items = [
    { name: "Pan-Seared Cod", desc: "Citrus beurre blanc", price: "28" },
    { name: "Charred Octopus", desc: "Smoky aioli", price: "22" },
    { name: "Lemon Tart", desc: "Shortcrust, torched meringue", price: "12" },
  ];

  return (
    <section id="menu" className="py-20">
      <div className="section-container">
        <p className="section-subtitle">Sample Menu</p>
        <h2 className="section-title">Curated plates</h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.name}
              className="card-reveal p-6 bg-white rounded-lg shadow"
            >
              <div className="flex justify-between items-baseline">
                <h4 className="font-medium">{it.name}</h4>
                <div className="text-sm text-brand-muted">${it.price}</div>
              </div>
              <p className="text-brand-muted mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReservationsSection() {
  return (
    <section id="reservations" className="py-20 bg-brand-cream">
      <div className="section-container">
        <p className="section-subtitle">Reservations</p>
        <h2 className="section-title">Book your table</h2>
        <p className="mt-4 text-brand-muted max-w-xl">
          We recommend booking in advance for weekend seating. For private
          events, contact us directly.
        </p>
        <div className="mt-6">
          <a href="#" className="btn-primary">
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer id="contact" className="py-12 bg-brand-ink text-brand-cream">
      <div className="section-container flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="font-serif text-xl">Aurora & Co.</h3>
          <p className="text-sm text-brand-cream/80">
            123 Ocean Drive — Open daily from 5pm
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <a href="#" className="inline-block text-sm underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

// Helper: split a string into span-wrapped words for staggered reveal
function splitWords(text: string) {
  return (
    <span>
      {text.split(" ").map((w, i) => (
        <span key={i} className="hero-word inline-block mr-2">
          {w}
        </span>
      ))}
    </span>
  );
}
