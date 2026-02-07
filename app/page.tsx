"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO: staggered word reveal (faster, snappier than original)
      const words = gsap.utils.toArray(".hero-word");
      gsap.from(words, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
      });

      // Subheading fade
      gsap.from(".hero-sub", { y: 16, opacity: 0, duration: 0.6, delay: 0.12 });

      // Parallax image on scroll (gentle)
      gsap.to(".parallax-layer", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-split",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Section reveals
      gsap.utils.toArray(".reveal").forEach((el: any) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen">
      <Header />

      <section className="hero-split grid lg:grid-cols-2 items-center gap-8 min-h-[80vh] py-20">
        <div className="px-6 lg:px-12 max-w-2xl">
          <p className="hero-sub text-sm text-brand-emerald uppercase tracking-widest mb-4">A modern dining concept</p>
          <h1 className="hero-heading text-4xl md:text-6xl font-serif leading-tight">
            {splitWords("Aurora — A Cinematic Dining Experience")}
          </h1>
          <p className="mt-6 text-base text-brand-muted max-w-prose">
            Seasonal menus that highlight coastal produce and carefully crafted service.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#reservations" className="btn-primary">Reserve</a>
            <a href="#menu" className="btn-ghost">Explore Menu</a>
          </div>
        </div>

        <div className="relative px-6 lg:px-0">
          <div className="parallax-layer rounded-lg overflow-hidden shadow-soft-lg aspect-[16/11] relative">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
              alt="Dining ambience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/24 to-transparent" />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-brand-sand/50 reveal">
        <div className="section-container">
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-title">Distinct dining experiences</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Seasonal Tasting", desc: "A multi-course seasonal tasting menu." },
              { title: "Chef's Table", desc: "An intimate chef-led experience." },
              { title: "Private Events", desc: "Curated menus for private dining." },
            ].map((o) => (
              <div key={o.title} className="card-reveal bg-brand-cream p-6 rounded-lg">
                <h3 className="font-serif text-xl mb-2">{o.title}</h3>
                <p className="text-brand-muted">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 reveal">
        <div className="section-container">
          <p className="section-subtitle">Moments</p>
          <h2 className="section-title">Cinematic Views</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
            ].map((src, i) => (
              <div key={src} className="gallery-item overflow-hidden rounded-md aspect-[4/3] relative">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-white reveal">
        <div className="section-container">
          <p className="section-subtitle">Sample Menu</p>
          <h2 className="section-title">Curated plates</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {[
              { name: "Pan-Seared Cod", desc: "Citrus beurre blanc", price: "28" },
              { name: "Charred Octopus", desc: "Smoky aioli", price: "22" },
              { name: "Lemon Tart", desc: "Shortcrust, torched meringue", price: "12" },
            ].map((it) => (
              <div key={it.name} className="card-reveal p-6 bg-white rounded-lg shadow">
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

      <section id="reservations" className="py-20 bg-brand-cream reveal">
        <div className="section-container">
          <p className="section-subtitle">Reservations</p>
          <h2 className="section-title">Book your table</h2>
          <p className="mt-4 text-brand-muted max-w-xl">We recommend booking in advance for weekend seating. Use the form below to request a table — submissions are stored locally for demo purposes.</p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ReservationForm />

            <div>
              <h3 className="font-semibold mb-3">Upcoming (local demo)</h3>
              <ReservationsTable />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="py-12 bg-brand-ink text-brand-cream">
        <div className="section-container flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="font-serif text-xl">Aurora & Co.</h3>
            <p className="text-sm text-brand-cream/80">123 Ocean Drive — Open daily from 5pm</p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="#" className="inline-block text-sm underline">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4 lg:px-0">
      <div className="backdrop-blur-sm bg-brand-cream/70 rounded-xl shadow-soft-lg flex items-center justify-between py-3 px-4">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-coral rounded-md flex items-center justify-center text-white font-bold">A</div>
          <span className="font-serif text-lg">AURORA & CO.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a href="#about" className="text-brand-muted hover:text-brand-ink transition">About</a>
          <a href="#menu" className="text-brand-muted hover:text-brand-ink transition">Menu</a>
          <a href="#gallery" className="text-brand-muted hover:text-brand-ink transition">Gallery</a>
          <a href="#reservations" className="text-brand-muted hover:text-brand-ink transition">Reservations</a>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="p-2 rounded-md border">{open ? "Close" : "Menu"}</button>
        </div>
      </div>
    </header>
  );
}

function splitWords(text: string) {
  return (
    <span>
      {text.split(" ").map((w, i) => (
        <span key={i} className="hero-word inline-block mr-2">{w}</span>
      ))}
    </span>
  );
}

// ReservationForm: client-side demo form that stores submissions in local state
function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState("2");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Lifted state for demo table (store in window for simplicity)
  const getStored = () => (typeof window !== "undefined" ? (window as any).__reservations || [] : []);
  const [reservations, setReservations] = useState(getStored());

  function validate() {
    if (!name.trim() || !email.trim() || !date || !time) {
      setError("Please fill in name, email, date and time.");
      return false;
    }
    setError("");
    return true;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const r = { id: Date.now().toString(), name, email, phone, date, time, party, notes };
    const next = [r, ...reservations];
    setReservations(next);
    // store on window so table component can read it (simple demo approach)
    if (typeof window !== "undefined") (window as any).__reservations = next;
    setSuccess("Reservation requested — saved locally for demo.");
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setParty("2");
    setNotes("");
    setTimeout(() => setSuccess(""), 4000);
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-3 py-2 border rounded" aria-label="Full name" required />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 px-3 py-2 border rounded" aria-label="Email address" required />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 px-3 py-2 border rounded" aria-label="Phone number" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Party Size</span>
          <select value={party} onChange={(e) => setParty(e.target.value)} className="mt-1 px-3 py-2 border rounded" aria-label="Party size">
            {Array.from({ length: 10 }).map((_, i) => (
              <option key={i} value={(i + 1).toString()}>{i + 1}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Date</span>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="mt-1 px-3 py-2 border rounded" aria-label="Reservation date" required />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Time</span>
          <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="mt-1 px-3 py-2 border rounded" aria-label="Reservation time" required />
        </label>
      </div>

      <label className="flex flex-col mt-3">
        <span className="text-sm font-medium">Notes</span>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 px-3 py-2 border rounded" aria-label="Special requests" />
      </label>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {success && <p className="text-sm text-green-700 mt-2">{success}</p>}

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="btn-primary">Request Reservation</button>
        <button type="button" onClick={() => { setName(''); setEmail(''); setPhone(''); setDate(''); setTime(''); setParty('2'); setNotes(''); setError(''); setSuccess(''); }} className="btn-ghost">Clear</button>
      </div>
    </form>
  );
}

function ReservationsTable() {
  const [items, setItems] = useState(() => (typeof window !== "undefined" ? (window as any).__reservations || [] : []));

  useEffect(() => {
    const iv = setInterval(() => {
      if (typeof window !== "undefined") setItems((window as any).__reservations || []);
    }, 600);
    return () => clearInterval(iv);
  }, []);

  if (!items || items.length === 0) return <p className="text-sm text-brand-muted">No reservations yet (demo).</p>;

  return (
    <div className="overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-brand-muted">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Time</th>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Party</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r: any) => (
            <tr key={r.id} className="border-t">
              <td className="py-2 pr-4 text-sm">{r.date}</td>
              <td className="py-2 pr-4 text-sm">{r.time}</td>
              <td className="py-2 pr-4 text-sm">{r.name}</td>
              <td className="py-2 pr-4 text-sm">{r.party}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
