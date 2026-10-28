import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, BadgeCheck, Check, ChevronDown, CircleDollarSign, CircleHelp, Handshake, Headphones, Heart, LifeBuoy, Menu, MessageCircle, Pause, Play, Search, ShieldCheck, TrendingUp, X, type LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Product = { name: string; category: string; image: string; highlights: [string, string][]; details: string };
type WhyBenefit = { number: string; title: string; body: string; icon: LucideIcon };
type WhyHighlight = { title: string; icon: LucideIcon };

const products: Product[] = [
  { name: 'Fiber laser marking', category: 'Marking', image: '/images/fiber-marking-clean.jpeg', highlights: [['Marking area', '100×100 to 300×300 mm'], ['Power options', '30, 50, 60, 100, 200 W'], ['Laser types', 'Fiber, CO₂ and UV']], details: 'Available in 100×100, 175×175, 220×220 and 300×300 mm fields, or customized. Confirm laser source and configuration for the intended material.' },
  { name: 'Customized fiber marking', category: 'Marking', image: '/images/custom-fiber-marking-clean.jpeg', highlights: [['Working area', '600×600 to 1500×3000 mm'], ['Power options', '30, 50, 100, 200 W'], ['Continuous marking', 'Encoder-synced for large graphics']], details: 'Brochure ranges also list 900×900, 1200×1200 and 1300×2500 mm fields. Pulse repetition 1–1000 kHz, pulse width 2–500 ns, air cooling.' },
  { name: 'Fiber sheet cutting', category: 'Cutting', image: '/images/fiber-sheet-cutting-clean.jpeg', highlights: [['Working area', '1500×3000 to 2500×13000 mm'], ['Power options', '1500–20000 W'], ['Motion', 'Up to 120 m/min travel']], details: 'Listed formats include 1500×3000, 1500×4000, 2500×6500 and 2500×13000 mm, plus customized sizes. Autofocus cutting head.' },
  { name: 'Pipe cutting', category: 'Cutting', image: '/images/pipe-cutting-clean.jpeg', highlights: [['Machine size', '6000×200 mm length × width'], ['Chuck', '220 mm; 110 / 350 mm optional'], ['Position accuracy', '0.03 mm/m']], details: 'For round, rectangular, square, I-channel and C-channel tubes. Ask Astramark to confirm suitable chuck and tube profile.' },
  { name: 'Sheet + pipe cutting', category: 'Cutting', image: '/images/sheet-pipe-cutting-clean.jpeg', highlights: [['Sheet area', '1500×3000 to 2500×6500 mm'], ['Pipe diameter', '20–220 mm chuck'], ['Travel speed', 'Up to 120 m/min']], details: 'Sheet formats listed: 1500×3000, 2000×4000, 2000×6000, 2500×6500 mm or customized. Position accuracy 0.03 mm/m; repeat positioning accuracy 0.02 mm/m. Listed powers 1500–20000 W.' },
  { name: 'Fiber welding', category: 'Welding', image: '/images/fiber-welding-clean.jpeg', highlights: [['Power options', '1500, 2000, 3000, 6000 W'], ['Material thickness', '0.5–10 mm'], ['Cooling', 'Water-cooled']], details: 'Wobble width 0.5–5 mm; 10 mm optional. Suitability depends on material and joint requirements.' },
  { name: 'Battery welding', category: 'Welding', image: '/images/battery-welding-clean.jpeg', highlights: [['Power options', '3000 / 6000 W'], ['Working field', '600×600 to 1200×1200 mm'], ['Scan speed', 'Up to 8 m/s']], details: 'Brochure lists 600×600, 900×900 and 1200×1200 mm fields or customized. Water-cooled.' },
  { name: 'Online marking', category: 'Marking', image: '/images/online-marking-clean.jpeg', highlights: [['Laser options', 'Fiber, CO₂ or UV'], ['Standard power', '30 W; higher options'], ['Power supply', '220–230 V single-phase']], details: 'Inline marking configurations depend on production line speed, material and integration needs. Higher-power configurations are optional.' },
  { name: 'CO₂ cutting & engraving', category: 'Cutting', image: '/images/co2-cutting-clean.jpeg', highlights: [['Working area', '600×900 to 1300×2500 mm'], ['Power options', '80–200 W'], ['Cooling', 'Water-cooled']], details: 'Multiple bed sizes are listed from 600×900 mm through 1300×2500 mm, with customized sizes available.' },
  { name: 'CO₂ engraving', category: 'Marking', image: '/images/co2-engraving-clean.jpeg', highlights: [['Working area', '150×150 or 300×300 mm'], ['Power options', '30 / 60 / 100 W'], ['Cooling', 'Air-cooled metal tube']], details: 'Custom marking field options are listed. Verify the appropriate laser tube and configuration with Astramark.' },
  { name: 'UV marking', category: 'Marking', image: '/images/uv-marking-clean.jpeg', highlights: [['Power options', '5 / 10 / 15 W'], ['Field options', '100×100, 175×175, 300×300 mm'], ['Field', 'Custom configurations listed']], details: 'UV marking field options include 100×100, 175×175 and 300×300 mm or customized.' },
  { name: '3D engraving', category: 'Marking', image: '/images/3d-engraving-clean.jpeg', highlights: [['Laser source', 'Fiber'], ['Power', '60 W; 80 / 100 W options'], ['Working field', '100×100 mm']], details: 'Brochure-listed 3D engraving configuration. Confirm workpiece dimensions and required 3D depth before selection.' },
  { name: 'Die mould welding', category: 'Welding', image: '/images/die-mould-welding-clean.jpeg', highlights: [['Power', '400 W'], ['Wavelength', '1064 nm'], ['Power adjustment', '1–200 A']], details: 'Table size 600×600 mm or customized. Confirm the working envelope and application fit.' },
  { name: 'Jewellery cutting', category: 'Jewellery', image: '/images/jewellery-cutting-clean.jpeg', highlights: [['Laser source', 'German laser source listed'], ['Cutting size', '100×100 mm / custom'], ['Cutting depth', '0.01 micron–1.5 mm listed']], details: 'The cutting depth range is transcribed from the supplied brochure; confirm the required material and specification with Astramark.' },
  { name: 'Jewellery soldering', category: 'Jewellery', image: '/images/jewellery-soldering-clean.jpeg', highlights: [['Laser source', 'ND:YAG pump lamp'], ['Power options', '200 W; 100 / 400 W options'], ['Solder joint', '0.2–2 mm']], details: 'Confirm the appropriate power configuration and joint size for the intended jewellery work.' },
];

const categories = ['All machines', 'Marking', 'Cutting', 'Welding', 'Jewellery'];
const questions = [
  { q: 'Can Astramark help choose a suitable machine?', a: 'Share your material, process, working dimensions, throughput and any existing line requirements. Astramark can discuss the options and clarify the configuration.' },
  { q: 'Are the listed specifications fixed?', a: 'No. Catalogue highlights are for reference. Exact model, configuration, availability and specifications should be confirmed with Astramark.' },
  { q: 'Does Astramark supply machines throughout India?', a: 'Yes. Astramark supplies laser machines throughout India. Contact us to confirm delivery arrangements for your location and machine.' },
  { q: 'What installation and repair support is available?', a: 'Astramark provides machine installation and support for repair needs. Contact us with your machine model and issue to discuss the assistance required.' },
  { q: 'Can I request support for an existing machine?', a: 'Yes. Choose “Service or technical support” in the enquiry form and include your machine model, issue, and any useful context. Do not include sensitive information.' },
  { q: 'Does this website send the enquiry?', a: 'Yes. Machine and configuration enquiries go to our sales inbox, and service or technical support requests go to our support inbox. Enquiry details are used only to deliver your message.' },
];

const whyBenefits: WhyBenefit[] = [
  { number: '01', icon: Heart, title: 'Customer Comes First', body: 'Your needs matter to us. We listen, understand your requirements, and help you explore the right laser solution for your business. Your satisfaction is our priority.' },
  { number: '02', icon: Handshake, title: 'Trust That Builds Relationships', body: 'We believe in genuine products, transparent communication, and honest business practices. We aim to build long-term relationships, not just complete a sale.' },
  { number: '03', icon: Headphones, title: 'Responsive Service & Support', body: 'We are committed to prompt communication and dependable service assistance.' },
  { number: '04', icon: CircleDollarSign, title: 'Competitive Pricing, Better Value', body: 'We focus on competitive prices and helping customers balance performance, affordability, and long-term value.' },
  { number: '05', icon: MessageCircle, title: 'Quick Response, Clear Communication', body: 'We value your time and aim to make enquiries, machine selection, and service communication simple and clear.' },
  { number: '06', icon: TrendingUp, title: 'Growing Together', body: 'Whether customers are starting a new business or expanding production, we want to support their journey with suitable laser solutions.' },
];

const whyHighlights: WhyHighlight[] = [
  { icon: ShieldCheck, title: 'Genuine & Trusted' },
  { icon: CircleDollarSign, title: 'Competitive Pricing' },
  { icon: BadgeCheck, title: 'Customer First' },
  { icon: LifeBuoy, title: 'Dedicated Support' },
];

function BrandLogo() {
  return <a href="#top" className="brand-mark" aria-label="Astramark Laser Machine, home"><img src="/images/astromark-logo.png" alt="Astramark Laser Machine Pvt. Ltd." /></a>;
}

function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll('.hero-copy, .hero-art, .section-heading, .product-toolbar, .product-card, .catalog-trust, .approach-heading, .step-row, .why-intro, .why-card, .why-highlight, .promise-panel, .materials-intro, .materials-browser, .material-tab, .quote-copy, .quote-form-wrap, .contact-copy, .contact-card, .faq-list, .faq-item');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener('change', updatePreference);
    return () => motionPreference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) heroVideoRef.current?.pause();
  }, [prefersReducedMotion]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All machines');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [submission, setSubmission] = useState<{ state: 'idle' | 'sending' | 'success' | 'error'; message?: string }>({ state: 'idle' });
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', requestType: 'Machine enquiry', machine: '', details: '', website: '' });

  const visibleProducts = useMemo(() => products.filter((product) =>
    (filter === 'All machines' || product.category === filter)
    && `${product.name} ${product.category} ${product.highlights.map((item) => item.join(' ')).join(' ')}`.toLowerCase().includes(search.toLowerCase()),
  ), [filter, search]);

  useEffect(() => {
    const cards = document.querySelectorAll('.product-card:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleProducts]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmission({ state: 'sending' });
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => null) as { error?: string; message?: string } | null;
      if (!response.ok) {
        setSubmission({
          state: 'error',
          message: result?.error ?? 'We could not send your enquiry. Your details are still here—please try again.',
        });
        return;
      }
      setSubmission({ state: 'success', message: result?.message ?? 'Your enquiry has been sent.' });
    } catch {
      setSubmission({
        state: 'error',
        message: 'We could not reach the enquiry service. Your details are still here—please try again.',
      });
    }
  };

  const startEnquiry = (product?: string) => {
    setForm((previous) => ({ ...previous, requestType: 'Machine enquiry', machine: product ?? previous.machine }));
    setSubmission({ state: 'idle' });
    setEnquiryOpen(true);
  };
  const toggleHeroVideo = async () => {
    const video = heroVideoRef.current;
    if (!video) return;
    setHeroVideoError(false);
    if (!video.paused) {
      video.pause();
      return;
    }
    video.muted = true;
    try {
      await video.play();
    } catch {
      setHeroVideoPlaying(false);
      setHeroVideoError(true);
    }
  };
  const navItems = [
    { href: '#top', label: 'Overview' },
    { href: '#support', label: 'Why ASTRAMARK' },
    { href: '#catalogue', label: 'Machines' },
    { href: '#enquiry', label: 'Enquire' },
    { href: '#contact', label: 'Contact' },
    { href: '#faq', label: 'FAQs' },
  ];

  const renderEnquiryForm = (prefix: string) => submission.state === 'success' ? (
    <div className="brief-confirmation" role="status" data-testid="status-enquiry-sent">
      <div className="confirm-icon"><Check size={20} /></div>
      <div className="eyebrow">ENQUIRY SENT</div>
      <h3>Thank you for contacting us.</h3>
      <p>{submission.message} Our team will follow up using the email address you provided.</p>
      <button
        className="button button-orange button-arrow"
        type="button"
        onClick={() => {
          setForm({ name: '', email: '', requestType: 'Machine enquiry', machine: '', details: '', website: '' });
          setSubmission({ state: 'idle' });
        }}
        data-testid="button-new-enquiry"
      >
        Send another enquiry <ArrowRight size={15} />
      </button>
    </div>
  ) : (
    <form className="quote-form" onSubmit={submitEnquiry} data-testid={prefix === 'page' ? 'form-machine-enquiry' : 'form-quick-machine-enquiry'}>
      <div className="form-row">
        <label>Your name<input id={prefix === 'page' ? 'enquiry-name' : 'quick-enquiry-name'} required minLength={2} maxLength={120} value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Name" autoComplete="name" data-testid={prefix === 'page' ? 'input-name' : 'input-quick-name'} /></label>
        <label>Email address<input required type="email" maxLength={254} value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="name@example.com" autoComplete="email" data-testid={prefix === 'page' ? 'input-email' : 'input-quick-email'} /></label>
      </div>
      <div className="form-row">
        <label>What do you need?<select value={form.requestType} onChange={(event) => updateForm('requestType', event.target.value)}><option>Machine enquiry</option><option>Service or technical support</option><option>Configuration question</option></select></label>
        <label>Machine / model <span className="optional">optional</span><input maxLength={120} value={form.machine} onChange={(event) => updateForm('machine', event.target.value)} placeholder="Machine or model" /></label>
      </div>
      <label>Application or support details<textarea required minLength={10} maxLength={3000} rows={4} value={form.details} onChange={(event) => updateForm('details', event.target.value)} placeholder="Material, dimensions, process, or the issue you need help with…" data-testid={prefix === 'page' ? 'input-details' : 'input-quick-details'} /></label>
      <label className="enquiry-trap" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateForm('website', event.target.value)} /></label>
      {submission.state === 'error' && <p className="enquiry-feedback enquiry-feedback-error" role="alert" data-testid="status-enquiry-error">{submission.message}</p>}
      <button type="submit" className="button button-orange button-arrow form-submit" disabled={submission.state === 'sending'} data-testid={prefix === 'page' ? 'button-submit-enquiry' : 'button-submit-quick-enquiry'}>
        {submission.state === 'sending' ? 'Sending enquiry…' : 'Send enquiry'} <ArrowRight size={16} />
      </button>
      <p className="form-note">Your details are used only to deliver this enquiry and are not stored by this website.</p>
    </form>
  );

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="page-width header-inner">
          <BrandLogo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <a className="nav-link" href={item.href} key={item.href} onClick={(event) => { if (item.label === 'Enquire') { event.preventDefault(); startEnquiry(); } }}>{item.label}</a>)}
          </nav>
          <button className="header-cta" type="button" onClick={() => startEnquiry()}>Talk to our team <ArrowRight size={15} /></button>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav mobile-menu" aria-label="Mobile navigation">{navItems.map((item) => <a href={item.href} key={item.href} onClick={(event) => { setMenuOpen(false); if (item.label === 'Enquire') { event.preventDefault(); startEnquiry(); } }}>{item.label}<ArrowRight size={15} /></a>)}</nav>}
      </header>

      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="quick-enquiry-dialog" aria-describedby="quick-enquiry-description" onOpenAutoFocus={(event) => { event.preventDefault(); document.getElementById('quick-enquiry-name')?.focus(); }}>
          <DialogHeader className="quick-enquiry-heading">
            <div className="eyebrow">SALES / SUPPORT — ASTRAMARK</div>
            <DialogTitle className="display">Let’s talk <em>machine details.</em></DialogTitle>
            <DialogDescription id="quick-enquiry-description">Send your question directly to our sales or support team. We only use your details to deliver the enquiry.</DialogDescription>
          </DialogHeader>
          <div className="quick-enquiry-body">{renderEnquiryForm('quick')}</div>
        </DialogContent>
      </Dialog>

      <main className="main-story">
        <section className="hero page-width" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="eyebrow hero-kicker"><span className="kicker-dot" /> 01 — ABOUT ASTRAMARK / SALES & SUPPORT</div>
            <h1 id="hero-heading" className="display hero-title hero-title-long">Laser systems<br />for the work<br /><em>you do.</em></h1>
            <p className="hero-lede">ASTRAMARK helps Indian manufacturers choose laser marking, cutting, welding and engraving systems, then supports customers through the process.</p>
            <p className="hero-lede">We help clarify materials, working areas, output needs and machine configurations—and provide support as you make the right choice for your business.</p>
            <p className="hero-tagline"><strong>Your Vision. Our Technology. Better Possibilities.</strong></p>
            <div className="hero-actions">
              <a className="button button-dark button-arrow" href="#catalogue">Explore Our Products <ArrowRight size={16} /></a>
              <button className="text-link text-link-button" type="button" onClick={() => startEnquiry()}>Request a Quote <ArrowRight size={14} /></button>
            </div>
            <div className="hero-footnote"><span className="footnote-rule" /> Machine sales, application guidance, and reliable support</div>
            <a className="scroll-cue" href="#support" aria-label="Scroll to learn why manufacturers choose Astramark"><span>SCROLL TO EXPLORE</span><i><ArrowDown size={15} /></i></a>
          </div>
          <div className="hero-art">
            <video
              ref={heroVideoRef}
              className="hero-video"
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/astramark-gold-laser-poster.jpg"
              aria-label="Illustrative 3D laser-cutting animation with a gold beam and sparks"
              onPlay={() => { setHeroVideoPlaying(true); setHeroVideoError(false); }}
              onPause={() => setHeroVideoPlaying(false)}
              onError={() => { setHeroVideoPlaying(false); setHeroVideoError(true); }}
            >
              <source src="/videos/astramark-laser-hero.webm" type="video/webm" />
              <source src="/videos/astramark-laser-hero.mp4" type="video/mp4" />
            </video>
            <button
              className={`hero-video-control ${heroVideoPlaying ? 'is-playing' : 'is-paused'}`}
              type="button"
              onClick={toggleHeroVideo}
              aria-label={heroVideoPlaying ? 'Pause laser animation' : 'Play gold laser animation'}
              aria-pressed={heroVideoPlaying}
            >
              <span className="hero-video-control-icon">{heroVideoPlaying ? <Pause size={15} /> : <Play size={16} fill="currentColor" />}</span>
              {!heroVideoPlaying && <span className="hero-video-control-label">Play gold laser video</span>}
            </button>
            {heroVideoError && <span className="hero-video-error" role="status">Video could not start. Tap play to try again.</span>}
            <div className="art-label"><span>3D CONCEPT VISUALIZATION</span><span>GOLD LASER MOTION</span></div>
            <div className="art-index">3D<span> / </span>GOLD</div>
            <div className="art-caption">Gold sparks in motion.<br />Illustrative laser visualization.</div>
          </div>
          <div className="hero-side-note eyebrow">MACHINE SELECTION<br />SALES / SUPPORT</div>
        </section>

        <section className="approach-section why-section" id="support" aria-labelledby="why-title">
          <div className="page-width why-section-inner">
            <div className="why-intro">
              <div className="eyebrow why-eyebrow">WHY ASTRAMARK?</div>
              <h2 className="display" id="why-title">More Than Machines.<br /><em>A Promise of Trust.</em></h2>
              <div className="why-intro-bottom">
                <p>At Astramark, we believe every great business relationship begins with trust and grows through genuine service. We offer laser machine solutions, competitive pricing, responsive support, and customer-focused guidance — because your success is our priority.</p>
                <div className="why-actions">
                  <a className="why-button why-button-primary" href="#catalogue">Explore Our Machines <ArrowRight size={16} /></a>
                  <button className="why-button why-button-secondary" type="button" onClick={() => startEnquiry()}>Talk to Our Team <ArrowRight size={16} /></button>
                </div>
              </div>
            </div>

            <div className="why-benefits-heading">
              <div className="eyebrow">WHY CHOOSE ASTRAMARK</div>
              <span>Support built around your business and your process.</span>
            </div>
            <div className="why-benefit-grid">
              {whyBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article className="why-card" key={benefit.number}>
                    <div className="why-card-top">
                      <span className="why-card-number">{benefit.number}</span>
                      <span className="why-card-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.body}</p>
                  </article>
                );
              })}
            </div>

            <ul className="why-highlights" aria-label="Astramark highlights">
              {whyHighlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <li className="why-highlight" key={highlight.title}>
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    <span>{highlight.title}</span>
                  </li>
                );
              })}
            </ul>

            <div className="promise-panel">
              <div className="promise-heading">
                <div className="eyebrow">OUR PROMISE</div>
                <h3>At Astramark, You Are Never Just a Customer.</h3>
                <p className="promise-tagline">Precision in Every Mark.<br />Trust in Every Relationship.</p>
              </div>
              <p className="promise-copy">You are a valued business partner. We strive to earn your trust through genuine products, fair pricing, responsive service, and a commitment to your satisfaction. We don't just want to sell you a machine. We want to build a relationship you can rely on.</p>
            </div>
          </div>
        </section>

        <section className="marquee-band" aria-label="Machine categories">
          <div className="marquee-inner"><span>Marking</span><i>·</i><span>Cutting</span><i>·</i><span>Welding</span><i>·</i><span>Jewellery systems</span><i>·</i><span>Sales & support</span></div>
        </section>

        <section className="work-section section-pad" id="catalogue" aria-labelledby="catalogue-heading">
          <div className="page-width">
            <div className="section-heading">
              <div><div className="eyebrow section-index">03 — MACHINE CATALOGUE</div><h2 className="display section-title" id="catalogue-heading">Find your process.<br /><em>Then the machine.</em></h2></div>
              <div className="catalogue-sidecopy">
                <p className="section-intro">Browse machine families and scan the brochure highlights. Each configuration is application-specific, so use the enquiry path to confirm what fits.</p>
                <p className="visual-disclosure">Catalogue images are unbranded supplier references for illustration—not photos of Astramark machines. Confirm the delivered model, appearance and configuration with our team.</p>
              </div>
            </div>
            <div className="product-toolbar">
              <div className="filter-list" role="group" aria-label="Filter machines by category">
                {categories.map((item) => <button key={item} type="button" className={`filter-chip ${filter === item ? 'active' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
              </div>
              <label className="search-box"><Search size={16} /><span className="sr-only">Search machines</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search machines" /></label>
            </div>
            <div className="product-grid" aria-live="polite">
              {visibleProducts.length ? visibleProducts.map((product, index) => (
                <article className="product-card" key={product.name} data-testid={`card-product-${index}`}>
                  <div className="product-photo"><span className="product-number">0{products.indexOf(product) + 1}</span><img src={product.image} alt={`Illustrative supplier reference image of a ${product.name} machine`} loading={index > 2 ? 'lazy' : 'eager'} /><span className="illustrative-label">ILLUSTRATIVE · SUPPLIER REFERENCE</span></div>
                  <div className="product-content">
                    <div className="product-category">{product.category} systems</div>
                    <h3>{product.name}</h3>
                    <ul className="spec-list">{product.highlights.map(([label, value]) => <li key={label}><strong>{label}</strong><span>{value}</span></li>)}</ul>
                    {expanded === product.name && <div className="extra-specs" id={`details-${products.indexOf(product)}`}>{product.details}</div>}
                    <div className="product-actions">
                      <button type="button" className="details-toggle" aria-expanded={expanded === product.name} aria-controls={`details-${products.indexOf(product)}`} onClick={() => setExpanded(expanded === product.name ? null : product.name)}>{expanded === product.name ? 'Less detail' : 'More specifications'} <ChevronDown size={15} /></button>
                      <button type="button" className="enquire-link" onClick={() => startEnquiry(product.name)}>Enquire <ArrowRight size={14} /></button>
                    </div>
                  </div>
                </article>
              )) : <div className="empty-results"><h3>No machines match that search.</h3><p>Try another machine name or choose a different category.</p><button type="button" className="details-toggle" onClick={() => { setSearch(''); setFilter('All machines'); }}>Clear filters <ArrowRight size={14} /></button></div>}
            </div>
            <aside id="astramark-support" className="catalog-trust" aria-label="Astramark customer support">
              <div className="catalog-trust-intro">
                <div className="eyebrow">PEOPLE / EXPERTISE / SUPPORT</div>
                <h3>More than a machine supplier.</h3>
                <p>Our skilled team pairs machine options with practical guidance, installation and repair support.</p>
              </div>
              <div className="catalog-trust-proof">
                <div className="customer-count"><strong>100<span>+</span></strong><span>customers served</span></div>
                <div className="trust-point"><span className="trust-index">01</span><h4>Skilled people</h4><p>Get application-focused guidance from a capable team.</p></div>
                <div className="trust-point"><span className="trust-index">02</span><h4>Across India</h4><p>Laser machine supply throughout India.</p></div>
              </div>
              <div className="customer-care-note">
                <span className="eyebrow">DELIVERY / INSTALLATION / CUSTOMER SUPPORT</span>
                <p>Astramark supplies machines throughout India. Our team provides machine installation and can assist with repair and configuration questions after delivery. Contact us to confirm delivery and service arrangements for your machine. For selection, we discuss your material, process and output needs; recommendations are confirmed case by case.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="materials-section section-pad" aria-labelledby="selection-heading">
          <div className="page-width materials-layout">
            <div className="materials-intro"><div className="eyebrow section-index">04 — MAKE A GOOD SHORTLIST</div><h2 className="display section-title" id="selection-heading">A process-first<br /><em>conversation.</em></h2><p>Machine selection starts with the work: material, part size, throughput and the result you need. Get these details together before comparing configurations.</p></div>
            <div className="materials-browser">
              {[['01', 'Material & process', 'What are you cutting, marking or welding? Include the material grade if known.'], ['02', 'Working envelope', 'Share the part dimensions, required bed size or marking field.'], ['03', 'Production needs', 'Note volume, shift pattern, line speed and any automation requirements.'], ['04', 'Support context', 'For existing equipment, include the machine model and describe the issue.']].map(([number, title, detail]) => <div className="material-tab" key={number}><span className="material-number">{number}</span><span>{title}</span><ArrowRight size={15} /></div>)}
            </div>
          </div>
        </section>

        <section className="quote-section" id="enquiry">
          <div className="page-width quote-layout">
            <div className="quote-copy">
              <div className="eyebrow light-eyebrow">05 — SALES OR SUPPORT ENQUIRY</div>
              <h2 className="display">Let’s talk<br /><em>machine details.</em></h2>
              <p>Tell us about a machine you are considering or an existing equipment support question. Your enquiry goes directly to the right Astramark team.</p>
              <div className="quote-aside"><span className="quote-aside-mark"><Check size={20} /></span><span>Machine and configuration enquiries go to sales.<br />Service requests go to customer support.</span></div>
            </div>
            <div className="quote-form-wrap">
              {renderEnquiryForm('page')}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-heading">
          <div className="page-width contact-layout">
            <div className="contact-copy">
              <div className="eyebrow section-index">06 — CONTACT ASTRAMARK</div>
              <h2 className="display section-title" id="contact-heading">Laser machines.<br /><em>Sales & support.</em></h2>
              <p>Astramark Laser Machine Pvt. Ltd. sells laser machines and provides customer support. Contact our team in Visakhapatnam for machine enquiries and assistance.</p>
              <button className="button button-dark button-arrow" type="button" onClick={() => startEnquiry()}>Talk to our team <ArrowRight size={16} /></button>
            </div>
            <div className="contact-grid">
              <div className="contact-card">
                <span className="eyebrow">PHONE</span>
                <a href="tel:9177709681">9177709681</a>
                <a href="tel:9177709682">9177709682</a>
              </div>
              <div className="contact-card">
                <span className="eyebrow">EMAIL</span>
                <a href="mailto:info@astramarklaser.com">info@astramarklaser.com</a>
                <a href="mailto:support@astramarklaser.com">support@astramarklaser.com</a>
              </div>
              <div className="contact-card">
                <span className="eyebrow">WEBSITE</span>
                <a href="https://astramarklaser.com" target="_blank" rel="noreferrer">astramarklaser.com</a>
              </div>
              <div className="contact-card contact-address">
                <span className="eyebrow">ADDRESS</span>
                <address>49-19-14, FF2, Sri Sai Sampath Enclave,<br />Lalithanagar, Akkayapalem,<br />Visakhapatnam 530 016,<br />Andhra Pradesh</address>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="page-width faq-layout">
            <div><div className="eyebrow section-index">07 — GOOD TO KNOW</div><h2 className="display section-title">Before you<br /><em>get in touch.</em></h2><p className="faq-subtitle">Need to compare machine options? Start an enquiry with your process details.</p></div>
            <div className="faq-list">
              {questions.map((item, index) => <div className={`faq-item ${openQuestion === index ? 'faq-open' : ''}`} key={item.q}>
                <button type="button" className="faq-question" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span><i>0{index + 1}</i>{item.q}</span><ChevronDown size={18} /></button>
                {openQuestion === index && <p className="faq-answer">{item.a}</p>}
              </div>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div><BrandLogo /><p>ASTRAMARK — Bringing Precision to Every Possibility.</p></div>
          <div className="footer-nav"><span className="eyebrow">CATALOGUE</span><a href="#catalogue">Browse all machines</a><a href="#catalogue">Marking & cutting</a><a href="#catalogue">Welding & jewellery</a></div>
          <div className="footer-nav"><span className="eyebrow">CONTACT</span><a href="tel:9177709681">9177709681</a><a href="mailto:info@astramarklaser.com">info@astramarklaser.com</a><a href="mailto:support@astramarklaser.com">support@astramarklaser.com</a><a href="#contact">Address & website</a></div>
          <div className="footer-nav"><span className="eyebrow">NEXT STEP</span><button type="button" className="footer-enquiry-link" onClick={() => startEnquiry()}>Machine enquiry <ArrowRight size={14} /></button><a href="#support">Sales & customer support</a><a href="#faq">Frequently asked questions</a></div>
          <a className="back-top" href="#top" aria-label="Back to top"><ArrowDown size={16} /></a>
        </div>
          <div className="page-width footer-bottom"><span>© Astramark Laser Machine Pvt. Ltd.</span><span>Machine visuals are unbranded supplier references for illustration, not photos of Astramark machines. Confirm model and configuration with our team.</span><span>SALES / SUPPORT / LASER SYSTEMS</span></div>
      </footer>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
