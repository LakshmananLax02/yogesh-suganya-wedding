"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const weddingDate = new Date("2026-09-13T04:30:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => {
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
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="overflow-clip bg-ivory text-ink selection:bg-gold/25">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-6 sm:px-10 lg:px-16">
        <a href="#home" className="font-serif text-sm tracking-[0.35em] text-gold" aria-label="Yogesh and Suganya home">Y · S</a>
        <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/60 sm:flex" aria-label="Main navigation">
          <a className="transition-colors hover:text-green" href="#celebration">Celebration</a>
          <a className="transition-colors hover:text-green" href="#venue">Venue</a>
        </nav>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/55">13 · 09 · 2026</span>
      </header>

      <section id="home" className="relative grid min-h-[900px] items-center border-b border-ink/10 px-5 pb-20 pt-28 sm:px-10 lg:min-h-screen lg:grid-cols-[1.02fr_.98fr] lg:px-16 lg:pb-12">
        <div className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-blush/20 blur-3xl" style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
        <div className="relative z-10 max-w-3xl py-12 lg:py-0">
          <p className="hero-in mb-8 text-[10px] font-medium uppercase tracking-[0.34em] text-gold">Together with their families</p>
          <h1 className="font-serif text-[clamp(4.3rem,9vw,9.2rem)] font-normal leading-[0.75] tracking-[-0.065em]">
            <span className="hero-in block">Yogesh</span>
            <span className="hero-in ml-[21%] mt-7 block text-green"><i className="font-light text-gold">&amp;</i> Suganya</span>
          </h1>
          <div className="hero-in mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="font-serif text-xl text-green sm:text-2xl">Sunday, September 13, 2026</p>
            <span className="h-px w-16 bg-gold/55" />
            <p className="text-xs uppercase tracking-[0.18em] text-ink/55">Karumathampatti</p>
          </div>
          <p className="hero-in mt-8 max-w-xl text-sm leading-7 text-ink/60 sm:text-base">Joyfully invite you to celebrate their wedding and bless them as they begin their beautiful journey together.</p>
        </div>

        <div className="portrait-float relative mx-auto mt-2 w-full max-w-[560px] lg:mt-0" style={{ transform: `translate3d(0, ${Math.min(scrollY * 0.045, 28)}px, 0)` }}>
          <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-t-[48%] border border-gold/35" />
          <div className="hero-portrait relative aspect-[3/4] overflow-hidden rounded-t-[48%] bg-sand">
            <Image src="/couple-animated.png" alt="An animated illustration of a fictional South Indian wedding couple" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="couple-image object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-green/35 to-transparent" />
            <div className="portrait-shine absolute inset-0" aria-hidden="true" />
          </div>
          <div className="absolute -bottom-7 -left-3 hidden h-28 w-px bg-gold/55 sm:block" />
          <p className="absolute -bottom-8 left-5 text-[9px] uppercase tracking-[0.28em] text-ink/45">A new chapter begins</p>
        </div>
        <a href="#invitation" aria-label="Scroll to invitation" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-ink/45 lg:flex">
          Scroll <span className="h-10 w-px animate-scroll bg-gold/70" />
        </a>
      </section>

      <section id="invitation" className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
        <span className="absolute right-[6%] top-12 select-none font-serif text-[9rem] leading-none text-gold/[0.06] sm:text-[15rem]">&amp;</span>
        <div data-reveal className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">The invitation</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">Two hearts, one<br /><i className="font-normal text-gold">beautiful beginning</i></h2>
          <div className="mx-auto my-9 flex w-28 items-center gap-3"><span className="h-px flex-1 bg-gold/50" /><span className="size-1.5 rotate-45 bg-gold" /><span className="h-px flex-1 bg-gold/50" /></div>
          <p className="mx-auto max-w-2xl text-base leading-8 text-ink/60 sm:text-lg">With joyful hearts, we invite you to share in the celebration of our marriage and shower us with your love and blessings.</p>
        </div>
      </section>

      <section id="celebration" className="bg-green px-5 py-28 text-ivory sm:px-10 sm:py-36 lg:px-16">
        <div data-reveal className="reveal mx-auto max-w-7xl">
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <div><p className="eyebrow !text-gold-light">Save the date</p><h2 className="mt-5 font-serif text-5xl sm:text-7xl">The celebrations</h2></div>
            <p className="max-w-md text-sm leading-7 text-ivory/55 md:justify-self-end">Two cherished moments, one unforgettable weekend. Join us at Nithilam Mahal in Karumathampatti.</p>
          </div>
          <div className="grid border-y border-ivory/15 md:grid-cols-2">
            <article className="group relative py-12 md:border-r md:border-ivory/15 md:pr-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">Saturday · 12 September</p>
              <h3 className="mt-8 font-serif text-4xl transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">Wedding Reception</h3>
              <p className="mt-6 text-xl text-ivory/80">6:00 PM — 9:00 PM</p>
              <p className="mt-3 text-sm text-ivory/45">Nithilam Mahal</p>
              <span className="absolute right-4 top-11 font-serif text-6xl text-ivory/[0.06]">01</span>
            </article>
            <article className="group relative border-t border-ivory/15 py-12 md:border-t-0 md:pl-14">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">Sunday · 13 September</p>
              <h3 className="mt-8 font-serif text-4xl transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">Subha Muhurtham</h3>
              <p className="mt-6 text-xl text-ivory/80">4:30 AM — 6:00 AM</p>
              <p className="mt-3 text-sm text-ivory/45">Nithilam Mahal</p>
              <span className="absolute right-4 top-11 font-serif text-6xl text-ivory/[0.06]">02</span>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
        <div data-reveal className="reveal mx-auto max-w-6xl text-center">
          <p className="eyebrow">Counting down</p>
          <h2 className="mt-5 font-serif text-4xl sm:text-6xl">Until we say “I do”</h2>
          <div className="mt-14 grid grid-cols-4 border-y border-ink/10">
            {Object.entries(countdown).map(([label, value], index) => (
              <div key={label} className={`py-8 sm:py-12 ${index < 3 ? "border-r border-ink/10" : ""}`}>
                <span className="block font-serif text-3xl tabular-nums text-green sm:text-6xl">{String(value).padStart(2, "0")}</span>
                <span className="mt-3 block text-[8px] uppercase tracking-[0.18em] text-ink/45 sm:text-[10px] sm:tracking-[0.28em]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="border-t border-ink/10 px-5 py-28 sm:px-10 lg:px-16">
        <div data-reveal className="reveal mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-stretch">
          <div className="flex flex-col justify-between py-3">
            <div><p className="eyebrow">The venue</p><h2 className="mt-6 font-serif text-5xl leading-none sm:text-7xl">Nithilam<br /><i className="font-normal text-gold">Mahal</i></h2></div>
            <div className="mt-10"><p className="max-w-sm leading-7 text-ink/60">Behind KMS Bakery, near CTC Depot,<br />Karumathampatti, Tamil Nadu.</p><a href="https://maps.google.com/?q=Nithilam+Mahal+Karumathampatti" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-4 border-b border-gold pb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-green transition-all hover:gap-6">Open in Google Maps <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="min-h-[420px] overflow-hidden rounded-t-[110px] bg-sand shadow-[0_25px_80px_rgba(39,71,60,.12)]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62639.44293419667!2d77.11213852167965!3d11.115971000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8fff34dfe8959%3A0xdb87db4188d4d5b9!2sNithilam%20Mahal!5e0!3m2!1sen!2sin!4v1785949178728!5m2!1sen!2sin" width="100%" height="100%" className="min-h-[420px] border-0 grayscale-[20%]" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Nithilam Mahal location" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blush/40 px-5 py-28 text-center sm:px-10 sm:py-36">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
        <div data-reveal className="reveal relative mx-auto max-w-4xl"><p className="eyebrow">With love</p><h2 className="mt-7 font-serif text-5xl leading-tight sm:text-7xl">We can’t wait to<br /><i className="font-normal text-gold">celebrate with you</i></h2><p className="mt-9 text-xs uppercase tracking-[0.26em] text-ink/50">Yogesh &amp; Suganya · 13 September 2026</p></div>
      </section>

      <footer className="flex flex-col items-center justify-between gap-4 bg-green px-5 py-7 text-[9px] uppercase tracking-[0.24em] text-ivory/40 sm:flex-row sm:px-10 lg:px-16"><span>Yogesh &amp; Suganya</span><span>Made with love · 2026</span></footer>
    </main>
  );
}
