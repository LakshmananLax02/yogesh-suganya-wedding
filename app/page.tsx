"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

const weddingDate = new Date("2026-09-13T04:30:00+05:30").getTime();
const petals = [
  [7, 17, 0, 18, 0.42], [16, 22, 7, 14, 0.28], [25, 19, 12, 20, 0.36],
  [34, 25, 3, 13, 0.3], [43, 18, 15, 17, 0.38], [52, 23, 9, 12, 0.25],
  [61, 20, 5, 19, 0.4], [70, 26, 14, 14, 0.27], [78, 21, 1, 18, 0.34],
  [87, 24, 10, 13, 0.3], [94, 19, 6, 17, 0.38], [12, 27, 16, 12, 0.24],
  [48, 28, 19, 15, 0.26], [82, 29, 21, 12, 0.22],
] as const;

function WeddingAtmosphere() {
  return (
    <div className="wedding-atmosphere" aria-hidden="true">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      <div className="ambient-orb ambient-orb-three" />
      {petals.map(([left, duration, delay, size, opacity], index) => (
        <span
          key={index}
          className={`wedding-petal ${index % 4 === 0 ? "wedding-petal-gold" : index % 3 === 0 ? "wedding-sparkle" : ""}`}
          style={{ "--petal-left": `${left}%`, "--petal-duration": `${duration}s`, "--petal-delay": `-${delay}s`, "--petal-size": `${size}px`, "--petal-opacity": opacity } as CSSProperties}
        />
      ))}
    </div>
  );
}

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
    if (now === null) {
      return { days: null, hours: null, minutes: null, seconds: null };
    }
    const distance = Math.max(0, weddingDate - now);
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance / 3600000) % 24),
      minutes: Math.floor((distance / 60000) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }, [now]);
}

export default function Home() {
  const countdown = useCountdown();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--scroll-progress");
      observer.disconnect();
    };
  }, []);

  return (
    <main className="wedding-gradient overflow-clip text-ink selection:bg-gold/25">
      <WeddingAtmosphere />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 sm:px-10 sm:py-6 lg:px-16">
        <a href="#home" className="font-serif text-sm tracking-[0.35em] text-gold" aria-label="Yogesh and Suganya home">Y · S</a>
        <nav className="flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/60 sm:gap-8 sm:text-[11px] sm:tracking-[0.18em]" aria-label="Main navigation">
          <a className="transition-colors hover:text-green" href="#celebration">Celebration</a>
          <a className="transition-colors hover:text-green" href="#venue">Venue</a>
        </nav>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/55">13 · 09 · 2026</span>
      </header>

      <section id="home" className="relative grid items-center gap-6 border-b border-ink/10 px-5 pb-9 pt-16 sm:gap-10 sm:px-10 sm:pb-16 sm:pt-24 lg:min-h-screen lg:grid-cols-[1.02fr_.98fr] lg:gap-0 lg:px-16 lg:pb-12 lg:pt-28">
        <div className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-blush/20 blur-3xl" style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
        <div className="relative z-10 order-2 max-w-3xl py-0 lg:order-1 lg:py-0">
          <p className="hero-in mb-3 text-center text-[8px] font-medium uppercase tracking-[0.24em] text-gold sm:mb-5 sm:text-[10px] sm:tracking-[0.34em] lg:mb-8 lg:text-left">Together with their families</p>
          <h1 className="font-serif text-[clamp(2.9rem,14vw,4.5rem)] font-normal leading-[0.82] tracking-[-0.055em] sm:text-[clamp(4.3rem,9vw,9.2rem)] sm:leading-[0.75] sm:tracking-[-0.065em]">
            <span className="hero-in block">Yogesh</span>
            <span className="hero-in ml-[12%] mt-3 block text-green sm:ml-[21%] sm:mt-7"><i className="font-light text-gold">&amp;</i> Suganya</span>
          </h1>
          <div className="hero-in mt-5 flex flex-col items-start gap-2 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 lg:mt-12">
            <p className="font-serif text-base text-green sm:text-2xl">Sunday, September 13, 2026</p>
            <span className="h-px w-12 bg-gold/55 sm:w-16" />
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink/55 sm:text-xs">Karumathampatti</p>
          </div>
          <p className="hero-in mt-4 max-w-xl text-xs leading-5 text-ink/60 sm:mt-6 sm:text-base sm:leading-7 lg:mt-8">Joyfully invite you to celebrate their wedding and bless them as they begin their beautiful journey together.</p>
        </div>

        <div className="portrait-float relative order-1 mx-auto w-[min(64vw,240px)] sm:w-full sm:max-w-[330px] lg:order-2 lg:mr-8 lg:max-w-[390px]" style={{ transform: `translate3d(0, ${Math.min(scrollY * 0.045, 28)}px, 0)` }}>
          <div className="portrait-drift relative">
            <div className="absolute -inset-1.5 translate-x-1.5 translate-y-1.5 rounded-[28px] border border-gold/35 sm:-inset-2 sm:translate-x-2 sm:translate-y-2 sm:rounded-[34px]" />
            <div className="hero-portrait relative aspect-[4/5] overflow-hidden rounded-[24px] bg-sand shadow-[0_18px_55px_rgba(39,71,60,.16)] sm:rounded-[30px] sm:shadow-[0_24px_70px_rgba(39,71,60,.14)]">
              <Image src="/couple-cartoon-equal.png" alt="A cartoon-style South Indian wedding couple of equal apparent height" fill priority sizes="(max-width: 639px) 240px, (max-width: 1024px) 330px, 390px" className="couple-image object-cover object-center" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-green/35 to-transparent" />
              <div className="portrait-shine absolute inset-0" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-7 -left-3 hidden h-28 w-px bg-gold/55 sm:block" />
            <p className="absolute -bottom-7 left-4 hidden text-[9px] uppercase tracking-[0.28em] text-ink/45 sm:block">A new chapter begins</p>
          </div>
        </div>
        <a href="#invitation" aria-label="Scroll to invitation" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-ink/45 lg:flex">
          Scroll <span className="h-10 w-px animate-scroll bg-gold/70" />
        </a>
      </section>

      <section id="invitation" className="relative px-5 py-12 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <span className="absolute right-[6%] top-12 select-none font-serif text-[9rem] leading-none text-gold/[0.06] sm:text-[15rem]">&amp;</span>
        <div data-reveal className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">For everyone we love</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:mt-6 sm:text-6xl">Join us to<br /><i className="font-normal text-gold">celebrate together</i></h2>
          <div className="mx-auto my-6 flex w-24 items-center gap-3 sm:my-9 sm:w-28"><span className="h-px flex-1 bg-gold/50" /><span className="size-1.5 rotate-45 bg-gold" /><span className="h-px flex-1 bg-gold/50" /></div>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-ink/60 sm:text-lg sm:leading-8">We warmly invite our family, friends, colleagues, and loved ones to join us as we celebrate our wedding.</p>
        </div>
      </section>

      <section id="celebration" className="bg-green px-5 py-8 text-ivory sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <div data-reveal className="reveal mx-auto max-w-7xl">
          <div className="mb-5 grid gap-3 sm:mb-16 sm:gap-6 md:grid-cols-2 md:items-end">
            <div><p className="eyebrow !text-gold-light">Save the date</p><h2 className="mt-2 font-serif text-3xl sm:mt-5 sm:text-7xl">The celebrations</h2></div>
            <p className="max-w-md text-xs leading-5 text-ivory/55 sm:text-sm sm:leading-7 md:justify-self-end">Two cherished moments, one unforgettable weekend. Join us at Nithilam Mahal in Karumathampatti.</p>
          </div>
          <div className="grid border-y border-ivory/15 md:grid-cols-2">
            <article className="group relative py-5 sm:py-12 md:border-r md:border-ivory/15 md:pr-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">Saturday · 12 September</p>
              <h3 className="mt-3 font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:mt-8 sm:text-5xl">Wedding Reception</h3>
              <p className="mt-2 text-base text-ivory/80 sm:mt-6 sm:text-xl">6:00 PM — 9:00 PM</p>
              <p className="mt-2 text-xs text-ivory/45 sm:mt-3 sm:text-sm">Nithilam Mahal</p>
              <span className="absolute right-4 top-7 font-serif text-5xl text-ivory/[0.06] sm:top-11 sm:text-6xl">01</span>
            </article>
            <article className="group relative border-t border-ivory/15 py-5 sm:py-12 md:border-t-0 md:pl-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">Sunday · 13 September</p>
              <h3 className="mt-3 font-serif text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:mt-8 sm:text-5xl">Subha Muhurtham</h3>
              <p className="mt-2 text-base text-ivory/80 sm:mt-6 sm:text-xl">4:30 AM — 6:00 AM</p>
              <p className="mt-2 text-xs text-ivory/45 sm:mt-3 sm:text-sm">Nithilam Mahal</p>
              <span className="absolute right-4 top-7 font-serif text-5xl text-ivory/[0.06] sm:top-11 sm:text-6xl">02</span>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 pb-3 pt-8 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <div data-reveal className="reveal mx-auto max-w-6xl text-center">
          <p className="eyebrow">Counting down</p>
          <h2 className="mt-3 font-serif text-3xl sm:mt-5 sm:text-6xl">Until we say “I do”</h2>
          <div className="mt-5 grid grid-cols-4 border-y border-ink/10 sm:mt-14">
            {Object.entries(countdown).map(([label, value], index) => (
              <div key={label} className={`py-3 sm:py-12 ${index < 3 ? "border-r border-ink/10" : ""}`}>
                <span className="block font-serif text-2xl tabular-nums text-green sm:text-6xl">{value === null ? "--" : String(value).padStart(2, "0")}</span>
                <span className="mt-2 block text-[8px] uppercase tracking-[0.18em] text-ink/45 sm:mt-3 sm:text-[10px] sm:tracking-[0.28em]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="border-t border-ink/10 px-5 py-12 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <div data-reveal className="reveal mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-stretch">
          <div className="flex flex-col justify-between py-3">
            <div><p className="eyebrow">The venue</p><h2 className="mt-4 font-serif text-4xl leading-none sm:mt-6 sm:text-7xl">Nithilam<br /><i className="font-normal text-gold">Mahal</i></h2></div>
            <div className="mt-6 sm:mt-10"><p className="max-w-sm text-sm leading-6 text-ink/60 sm:text-base sm:leading-7">Behind KMS Bakery, near CTC Depot,<br />Karumathampatti, Tamil Nadu.</p><a href="https://maps.google.com/?q=Nithilam+Mahal+Karumathampatti" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-4 border-b border-gold pb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-green transition-all hover:gap-6 sm:mt-8">Open in Google Maps <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="min-h-[300px] overflow-hidden rounded-none bg-sand shadow-[0_25px_80px_rgba(39,71,60,.12)] sm:min-h-[420px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62639.44293419667!2d77.11213852167965!3d11.115971000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8fff34dfe8959%3A0xdb87db4188d4d5b9!2sNithilam%20Mahal!5e0!3m2!1sen!2sin!4v1785949178728!5m2!1sen!2sin" width="100%" height="100%" className="min-h-[300px] border-0 grayscale-[20%] sm:min-h-[420px]" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Nithilam Mahal location" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blush/40 px-5 py-12 text-center sm:px-10 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
        <div data-reveal className="reveal relative mx-auto max-w-4xl"><p className="eyebrow">With love</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:mt-7 sm:text-7xl">We can’t wait to<br /><i className="font-normal text-gold">celebrate with you</i></h2><p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-ink/50 sm:mt-9 sm:text-xs sm:tracking-[0.26em]">Yogesh &amp; Suganya · 13 September 2026</p></div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-2 bg-green px-5 py-5 text-[9px] uppercase tracking-[0.2em] text-ivory/40 sm:flex-row sm:gap-4 sm:px-10 sm:py-7 sm:tracking-[0.24em] lg:px-16"><span>Yogesh &amp; Suganya</span><span>Made with love · 2026</span></footer>
    </main>
  );
}
