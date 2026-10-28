import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleHelp, Menu, Search, X } from 'lucide-react';

type Product = { name: string; category: string; image: string; highlights: [string, string][]; details: string };

const products: Product[] = [
  { name: 'Fiber laser marking', category: 'Marking', image: '/images/fiber-marking-astramark.jpeg', highlights: [['Marking area', '100×100 to 300×300 mm'], ['Power options', '30, 50, 60, 100, 200 W'], ['Laser types', 'Fiber, CO₂ and UV']], details: 'Available in 100×100, 175×175, 220×220 and 300×300 mm fields, or customized. Confirm laser source and configuration for the intended material.' },
  { name: 'Customized fiber marking', category: 'Marking', image: '/images/custom-fiber-marking-astramark.jpeg', highlights: [['Working area', '600×600 to 1500×3000 mm'], ['Power options', '30, 50, 100, 200 W'], ['Continuous marking', 'Encoder-synced for large graphics']], details: 'Brochure ranges also list 900×900, 1200×1200 and 1300×2500 mm fields. Pulse repetition 1–1000 kHz, pulse width 2–500 ns, air cooling.' },
  { name: 'Fiber sheet cutting', category: 'Cutting', image: '/images/fiber-sheet-cutting-astramark.jpeg', highlights: [['Working area', '1500×3000 to 2500×13000 mm'], ['Power options', '1500–20000 W'], ['Motion', 'Up to 120 m/min travel']], details: 'Listed formats include 1500×3000, 1500×4000, 2500×6500 and 2500×13000 mm, plus customized sizes. Autofocus cutting head.' },
  { name: 'Pipe cutting', category: 'Cutting', image: '/images/pipe-cutting-astramark.jpeg', highlights: [['Machine size', '6000×200 mm length × width'], ['Chuck', '220 mm; 110 / 350 mm optional'], ['Position accuracy', '0.03 mm/m']], details: 'For round, rectangular, square, I-channel and C-channel tubes. Ask Astramark to confirm suitable chuck and tube profile.' },
  { name: 'Sheet + pipe cutting', category: 'Cutting', image: '/images/sheet-pipe-cutting-astramark.jpeg', highlights: [['Sheet area', '1500×3000 to 2500×6500 mm'], ['Pipe diameter', '20–220 mm chuck'], ['Travel speed', 'Up to 120 m/min']], details: 'Sheet formats listed: 1500×3000, 2000×4000, 2000×6000, 2500×6500 mm or customized. Position accuracy 0.03 mm/m; repeat positioning accuracy 0.02 mm/m. Listed powers 1500–20000 W.' },
  { name: 'Fiber welding', category: 'Welding', image: '/images/fiber-welding-astramark.jpeg', highlights: [['Power options', '1500, 2000, 3000, 6000 W'], ['Material thickness', '0.5–10 mm'], ['Cooling', 'Water-cooled']], details: 'Wobble width 0.5–5 mm; 10 mm optional. Suitability depends on material and joint requirements.' },
  { name: 'Battery welding', category: 'Welding', image: '/images/battery-welding-astramark.jpeg', highlights: [['Power options', '3000 / 6000 W'], ['Working field', '600×600 to 1200×1200 mm'], ['Scan speed', 'Up to 8 m/s']], details: 'Brochure lists 600×600, 900×900 and 1200×1200 mm fields or customized. Water-cooled.' },
  { name: 'Online marking', category: 'Marking', image: '/images/online-marking-astramark.jpeg', highlights: [['Laser options', 'Fiber, CO₂ or UV'], ['Standard power', '30 W; higher options'], ['Power supply', '220–230 V single-phase']], details: 'Inline marking configurations depend on production line speed, material and integration needs. Higher-power configurations are optional.' },
  { name: 'CO₂ cutting & engraving', category: 'Cutting', image: '/images/co2-cutting-astramark.jpeg', highlights: [['Working area', '600×900 to 1300×2500 mm'], ['Power options', '80–200 W'], ['Cooling', 'Water-cooled']], details: 'Multiple bed sizes are listed from 600×900 mm through 1300×2500 mm, with customized sizes available.' },
  { name: 'CO₂ engraving', category: 'Marking', image: '/images/co2-engraving-astramark.jpeg', highlights: [['Working area', '150×150 or 300×300 mm'], ['Power options', '30 / 60 / 100 W'], ['Cooling', 'Air-cooled metal tube']], details: 'Custom marking field options are listed. Verify the appropriate laser tube and configuration with Astramark.' },
  { name: 'UV marking', category: 'Marking', image: '/images/uv-marking-astramark.jpeg', highlights: [['Power options', '5 / 10 / 15 W'], ['Field options', '100×100, 175×175, 300×300 mm'], ['Field', 'Custom configurations listed']], details: 'UV marking field options include 100×100, 175×175 and 300×300 mm or customized.' },
  { name: '3D engraving', category: 'Marking', image: '/images/3d-engraving-astramark.jpeg', highlights: [['Laser source', 'Fiber'], ['Power', '60 W; 80 / 100 W options'], ['Working field', '100×100 mm']], details: 'Brochure-listed 3D engraving configuration. Confirm workpiece dimensions and required 3D depth before selection.' },
  { name: 'Die mould welding', category: 'Welding', image: '/images/die-mould-welding-astramark.jpeg', highlights: [['Power', '400 W'], ['Wavelength', '1064 nm'], ['Power adjustment', '1–200 A']], details: 'Table size 600×600 mm or customized. Confirm the working envelope and application fit.' },
  { name: 'Jewellery cutting', category: 'Jewellery', image: '/images/jewellery-cutting-astramark.jpeg', highlights: [['Laser source', 'German laser source listed'], ['Cutting size', '100×100 mm / custom'], ['Cutting depth', '0.01 micron–1.5 mm listed']], details: 'The cutting depth range is transcribed from the supplied brochure; confirm the required material and specification with Astramark.' },
  { name: 'Jewellery soldering', category: 'Jewellery', image: '/images/jewellery-soldering-astramark.jpeg', highlights: [['Laser source', 'ND:YAG pump lamp'], ['Power options', '200 W; 100 / 400 W options'], ['Solder joint', '0.2–2 mm']], details: 'Confirm the appropriate power configuration and joint size for the intended jewellery work.' },
];

const categories = ['All machines', 'Marking', 'Cutting', 'Welding', 'Jewellery'];
const questions = [
  { q: 'Can Astramark help choose a suitable machine?', a: 'Share your material, process, working dimensions, throughput and any existing line requirements. Astramark can discuss the options and clarify the configuration.' },
  { q: 'Are the listed specifications fixed?', a: 'No. Catalogue highlights are for reference. Exact model, configuration, availability and specifications should be confirmed with Astramark.' },
  { q: 'Can I request support for an existing machine?', a: 'Yes. Choose “Service or technical support” in the enquiry form and include your machine model, issue, and any useful context. Do not include sensitive information.' },
  { q: 'Does this website send the enquiry?', a: 'The form prepares an email for you to review and send. The website does not store your details.' },
];

function BrandLogo() {
  return <a href="#top" className="brand-mark" aria-label="Astramark Laser Machine, home"><img src="/images/astromark-logo.png" alt="Astramark Laser Machine Pvt. Ltd." /></a>;
}

function Home() {
  useEffect(() => {
    const targets = document.querySelectorAll('.hero-copy, .hero-art, .section-heading, .product-card, .approach-heading, .step-row, .materials-intro, .material-tab, .quote-copy, .quote-form-wrap, .contact-copy, .contact-card, .faq-item');
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All machines');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [briefReady, setBriefReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', requestType: 'Machine enquiry', machine: '', details: '' });

  const visibleProducts = useMemo(() => products.filter((product) =>
    (filter === 'All machines' || product.category === filter)
    && `${product.name} ${product.category} ${product.highlights.map((item) => item.join(' ')).join(' ')}`.toLowerCase().includes(search.toLowerCase()),
  ), [filter, search]);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setBriefReady(false);
    setCopied(false);
  };

  const briefText = [
    'ASTRAMARK LASER MACHINE — ENQUIRY',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Request type: ${form.requestType}`,
    `Machine / model: ${form.machine || 'Not specified'}`,
    `Requirements / issue: ${form.details}`,
  ].join('\n');
  const enquiryRecipient = form.requestType === 'Service or technical support'
    ? 'support@astramarklaser.com'
    : 'info@astramarklaser.com';
  const emailEnquiryHref = `mailto:${enquiryRecipient}?subject=${encodeURIComponent(`${form.requestType} — Astramark Laser Machine`)}&body=${encodeURIComponent(briefText)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = briefText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(success);
    }
  };

  const startEnquiry = (product?: string) => {
    setForm((previous) => ({ ...previous, requestType: 'Machine enquiry', machine: product ?? previous.machine }));
    setBriefReady(false);
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => document.getElementById('enquiry-name')?.focus(), 450);
  };

  const navItems = [
    { href: '#top', label: 'Overview' },
    { href: '#support', label: 'Why ASTRAMARK' },
    { href: '#catalogue', label: 'Machines' },
    { href: '#enquiry', label: 'Enquire' },
    { href: '#contact', label: 'Contact' },
    { href: '#faq', label: 'FAQs' },
  ];

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="page-width header-inner">
          <BrandLogo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <a className="nav-link" href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <a className="header-cta" href="#enquiry">Talk to our team <ArrowRight size={15} /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav mobile-menu" aria-label="Mobile navigation">{navItems.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight size={15} /></a>)}</nav>}
      </header>

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
              <a className="text-link" href="#enquiry">Request a Quote <ArrowRight size={14} /></a>
            </div>
            <div className="hero-footnote"><span className="footnote-rule" /> Machine sales, application guidance, and reliable support</div>
          </div>
          <div className="hero-art">
            <img src="/images/fiber-sheet-cutting-astramark.jpeg" alt="Industrial fiber laser sheet cutting machine" />
            <div className="art-label"><span>LASER SYSTEMS / CATALOGUE</span><span>AST—2026</span></div>
            <div className="art-index">01<span> / </span>15</div>
            <div className="art-caption">Industrial precision.<br />Configured around the job.</div>
          </div>
          <div className="hero-side-note eyebrow">MACHINE SELECTION<br />SALES / SUPPORT</div>
        </section>

        <section className="approach-section" id="support">
          <div className="page-width approach-layout">
            <div className="approach-heading">
              <div className="eyebrow light-eyebrow">02 — WHY CHOOSE ASTRAMARK</div>
              <h2 className="display">Why choose<br /><em>ASTRAMARK?</em></h2>
              <p>We believe that the right technology can transform the way businesses work. That is why we focus on understanding your requirements and helping you find the right laser solution for your application.</p>
              <button type="button" className="button button-light button-arrow" onClick={() => startEnquiry()}>Request a Quote <ArrowRight size={16} /></button>
            </div>
            <div className="steps-list why-list">
              <div className="step-row"><span className="step-number">01</span><div><h3>Precision Engineering</h3><p>Designed for accurate, consistent results.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">02</span><div><h3>Smart Technology</h3><p>Modern laser solutions for evolving industrial needs.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">03</span><div><h3>Application-Focused Solutions</h3><p>Machine options suited to different materials and applications.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">04</span><div><h3>Customer-Centric Approach</h3><p>We listen, understand, and recommend solutions based on your requirements.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">05</span><div><h3>Reliable Support</h3><p>Assistance to help you make informed decisions and get the most from your investment.</p></div><span className="step-mark">↗</span></div>
            </div>
          </div>
          <div className="approach-coordinate eyebrow">ASTROMARK / MACHINE SALES / CUSTOMER SUPPORT</div>
        </section>

        <section className="marquee-band" aria-label="Machine categories">
          <div className="marquee-inner"><span>Marking</span><i>◆</i><span>Cutting</span><i>◆</i><span>Welding</span><i>◆</i><span>Jewellery systems</span><i>◆</i><span>Sales & support</span><i>◆</i><span>Marking</span><i>◆</i></div>
        </section>

        <section className="work-section section-pad" id="catalogue" aria-labelledby="catalogue-heading">
          <div className="page-width">
            <div className="section-heading">
              <div><div className="eyebrow section-index">03 — MACHINE CATALOGUE</div><h2 className="display section-title" id="catalogue-heading">Find your process.<br /><em>Then the machine.</em></h2></div>
              <p className="section-intro">Browse machine families and scan the brochure highlights. Each configuration is application-specific, so use the enquiry path to confirm what fits.</p>
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
                  <div className="product-photo"><span className="product-number">0{products.indexOf(product) + 1}</span><img src={product.image} alt={`${product.name} machine`} loading={index > 2 ? 'lazy' : 'eager'} /></div>
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
            <div className="catalog-note"><CircleHelp size={17} aria-hidden="true" /><div><strong>Illustrative Astramark concept images.</strong> These branded visuals are based on supplier catalogue references; final machine appearance and configuration may vary. Confirm model options and specifications with our team.</div></div>
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
              <p>Tell us about a machine you are considering or an existing equipment support question. Prepare an enquiry and open it in your email app.</p>
              <div className="quote-aside"><span className="quote-aside-mark"><Check size={20} /></span><span>The form opens a draft for you to review and send.<br />This website does not store your information.</span></div>
            </div>
            <div className="quote-form-wrap">
              {!briefReady ? (
                <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setBriefReady(true); }} data-testid="form-machine-enquiry">
                  <div className="form-row">
                    <label>Your name<input id="enquiry-name" required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Name" autoComplete="name" data-testid="input-name" /></label>
                    <label>Email address<input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="name@example.com" autoComplete="email" data-testid="input-email" /></label>
                  </div>
                  <div className="form-row">
                    <label>What do you need?<select value={form.requestType} onChange={(event) => updateForm('requestType', event.target.value)}><option>Machine enquiry</option><option>Service or technical support</option><option>Configuration question</option></select></label>
                    <label>Machine / model <span className="optional">optional</span><input value={form.machine} onChange={(event) => updateForm('machine', event.target.value)} placeholder="Machine or model" /></label>
                  </div>
                  <label>Application or support details<textarea required rows={4} value={form.details} onChange={(event) => updateForm('details', event.target.value)} placeholder="Material, dimensions, process, or the issue you need help with…" data-testid="input-details" /></label>
                  <button type="submit" className="button button-orange button-arrow form-submit" data-testid="button-prepare-enquiry">Prepare copyable enquiry <ArrowRight size={16} /></button>
                  <p className="form-note">Your email app opens with the enquiry ready for you to review. This website does not store submissions.</p>
                </form>
              ) : (
                <div className="brief-confirmation" data-testid="status-enquiry-ready">
                  <div className="confirm-icon"><Check size={20} /></div>
                  <div className="eyebrow">ENQUIRY PREPARED</div>
                  <h3>Ready for you to share.</h3>
                  <p>Review the details, then open the email draft to send your enquiry. Nothing is stored by this website.</p>
                  <pre>{briefText}</pre>
                  <div className="confirm-actions">
                    <a className="button button-orange button-arrow" href={emailEnquiryHref} data-testid="link-email-enquiry">Open email draft <ArrowRight size={15} /></a>
                    <button className="button button-orange button-arrow" type="button" onClick={copyBrief} data-testid="button-copy-enquiry">{copied ? 'Copied to clipboard' : 'Copy enquiry'} {copied ? <Check size={15} /> : <ArrowRight size={15} />}</button>
                    <button className="edit-brief" type="button" onClick={() => { setBriefReady(false); setCopied(false); }}>Edit details</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-heading">
          <div className="page-width contact-layout">
            <div className="contact-copy">
              <div className="eyebrow section-index">06 — CONTACT ASTRAMARK</div>
              <h2 className="display section-title" id="contact-heading">Laser machines.<br /><em>Sales & support.</em></h2>
              <p>Astramark Laser Machine Pvt. Ltd. sells laser machines and provides customer support. Contact our team in Visakhapatnam for machine enquiries and assistance.</p>
              <a className="button button-dark button-arrow" href="mailto:info@astramarklaser.com">Email our team <ArrowRight size={16} /></a>
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
          <div className="footer-nav"><span className="eyebrow">NEXT STEP</span><a href="#enquiry">Machine enquiry <ArrowRight size={14} /></a><a href="#support">Sales & customer support</a><a href="#faq">Frequently asked questions</a></div>
          <a className="back-top" href="#top" aria-label="Back to top"><ArrowDown size={16} /></a>
        </div>
        <div className="page-width footer-bottom"><span>© Astramark Laser Machine Pvt. Ltd.</span><span>Illustrative Astramark concept visuals; confirm final specifications with our team.</span><span>SALES / SUPPORT / LASER SYSTEMS</span></div>
      </footer>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
