import { useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Sparkles, X } from 'lucide-react';

const materials = [
  { name: 'Wood', detail: 'Warm grain. Clean edges.', note: 'For signs, keepsakes & considered details.' },
  { name: 'Acrylic', detail: 'Color with a crisp edge.', note: 'For dimensional lettering, displays & small runs.' },
  { name: 'Metal', detail: 'A mark that stays.', note: 'For tags, tools & durable identification.' },
  { name: 'Paper', detail: 'Fine detail, light touch.', note: 'For invitations, packaging & intricate forms.' },
];

const questions = [
  { q: 'What can I have made?', a: 'Bring a finished design, a rough sketch, or simply an idea. We can help shape a custom piece, a small batch, or a repeatable component.' },
  { q: 'What materials can you work with?', a: 'Material choice depends on the process and the result you want. Wood, acrylic, metal and paper are good places to start; share your material preference in the brief and we can discuss fit.' },
  { q: 'What should I include in a quote request?', a: 'A few words about what you are making, the material if you know it, approximate dimensions, quantity, and any artwork or reference you already have. It is fine if some details are still undecided.' },
  { q: 'Can I bring my own design?', a: 'Absolutely. You can describe the design in your request and note what file or reference you have. We can talk through the next step once we understand the project.' },
];

function BrandMark() {
  return (
    <a href="#top" className="brand-mark" aria-label="Astromark Laser, back to top" data-testid="link-home">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="15.5" stroke="currentColor" />
        <path d="M17 5.5 20.2 14l8.3 3-8.3 3.1-3.2 8.4-3.2-8.4-8.3-3.1 8.3-3L17 5.5Z" stroke="currentColor" strokeWidth="1.15" />
        <circle cx="17" cy="17" r="2" fill="#D96E4B" />
      </svg>
      <span className="brand-type"><strong>ASTROMARK</strong><small>LASER STUDIO</small></span>
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [briefReady, setBriefReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: '', material: '', size: '', quantity: '' });

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setBriefReady(false);
    setCopied(false);
  };

  const briefText = [
    'ASTROMARK LASER — PROJECT BRIEF',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Project: ${form.project}`,
    `Material: ${form.material || 'Not sure yet'}`,
    `Approx. size: ${form.size || 'Not sure yet'}`,
    `Quantity: ${form.quantity || 'Not sure yet'}`,
  ].join('\n');

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const navItems = [
    { href: '#work', label: 'Selected work' },
    { href: '#approach', label: 'How we work' },
    { href: '#materials', label: 'Materials' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="site-shell" id="top">
      <div className="noise-layer" aria-hidden="true" />
      <header className="site-header">
        <div className="page-width header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => <a className="nav-link" href={item.href} key={item.href} data-testid={`link-nav-${item.href.slice(1)}`}>{item.label}</a>)}
          </nav>
          <a className="header-cta" href="#quote" data-testid="link-request-quote">Start a project <ArrowRight size={15} /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav mobile-menu" aria-label="Mobile navigation">
            {navItems.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight size={15} /></a>)}
            <a href="#quote" onClick={() => setMenuOpen(false)}>Start a project<ArrowRight size={15} /></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero page-width" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="eyebrow hero-kicker reveal"><span className="kicker-dot" /> Custom laser cutting & engraving</div>
            <h1 id="hero-heading" className="display hero-title reveal reveal-delay-1">Made to<br /><em>make its mark.</em></h1>
            <p className="hero-lede reveal reveal-delay-2">A good idea deserves a precise finish. We turn thoughtful designs into tangible pieces—cut clean, marked to last, and made with care.</p>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button button-dark button-arrow" href="#quote" data-testid="link-hero-quote">Tell us what you’re making <ArrowRight size={16} /></a>
              <a className="text-link" href="#work">See what’s possible <ArrowDown size={14} /></a>
            </div>
            <div className="hero-footnote"><span className="footnote-rule" /> From one-off ideas to thoughtful small runs</div>
          </div>
          <div className="hero-art reveal reveal-delay-2">
            <img src="/hero-workshop.jpg" alt="Sculptural amber acrylic and engraved metal details on a studio work surface" />
            <div className="art-label art-label-top"><span>01 / OBJECT STUDY</span><span>AST—001</span></div>
            <div className="art-index">A<span> / </span>01</div>
            <div className="art-caption">Precision you can<br />see. Craft you can feel.</div>
            <div className="art-crosshair crosshair-one" />
            <div className="art-crosshair crosshair-two" />
          </div>
          <div className="hero-side-note eyebrow">DESIGNED WITH INTENT<br />MADE WITH PRECISION</div>
        </section>

        <section className="marquee-band" aria-label="Our work">
          <div className="marquee-inner">
            <span>Ideas, made tangible</span><i><Sparkles size={13} /></i><span>Cut with clarity</span><i><Sparkles size={13} /></i><span>Marked to last</span><i><Sparkles size={13} /></i><span>Ideas, made tangible</span><i><Sparkles size={13} /></i>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="page-width">
            <div className="section-heading">
              <div><div className="eyebrow section-index">01 — A FEW DIRECTIONS</div><h2 className="display section-title">Small details.<br /><em>Big difference.</em></h2></div>
              <p className="section-intro">A single object can carry a name, a memory, a whole identity. Here are a few ways laser work can bring an idea into focus.</p>
            </div>
            <div className="work-grid">
              <article className="work-card work-card-wide" data-testid="card-work-signage">
                <div className="work-visual visual-sign">
                  <div className="sign-sample"><span>FIELD<br />NOTES</span><small>STUDIO / 04</small></div>
                  <span className="visual-coordinate">A / 01</span>
                  <span className="visual-side-label">LAYERED ACRYLIC · SIGNAGE</span>
                </div>
                <div className="work-caption"><div><span className="eyebrow">01 / SPACES & IDENTITY</span><h3>Signs with presence.</h3></div><span className="work-arrow"><ArrowUpRight /></span></div>
              </article>
              <article className="work-card" data-testid="card-work-objects">
                <div className="work-visual visual-object">
                  <div className="object-stack"><div className="tag tag-back">FIELD / 001</div><div className="tag tag-front"><span className="tag-star"><Sparkles size={15} /></span>made for keeps</div></div>
                  <span className="visual-coordinate">B / 02</span>
                  <span className="visual-side-label">ENGRAVED WOOD · OBJECTS</span>
                </div>
                <div className="work-caption"><div><span className="eyebrow">02 / OBJECTS & KEEPSAKES</span><h3>Personal, by design.</h3></div><span className="work-arrow"><ArrowUpRight /></span></div>
              </article>
              <article className="work-card" data-testid="card-work-identity">
                <div className="work-visual visual-metal">
                  <div className="metal-plate"><span>ASTRO<br />MARK</span><i /><small>BUILT TO BELONG</small></div>
                  <span className="visual-coordinate">C / 03</span>
                  <span className="visual-side-label">MARKED METAL · IDENTITY</span>
                </div>
                <div className="work-caption"><div><span className="eyebrow">03 / MARKS & COMPONENTS</span><h3>Details that endure.</h3></div><span className="work-arrow"><ArrowUpRight /></span></div>
              </article>
            </div>
            <div className="work-note"><span className="note-star"><Sparkles size={16} /></span><span>Examples are starting points, not a catalogue. Yours can be entirely its own.</span><a href="#quote">Bring us your idea <ArrowRight size={14} /></a></div>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="page-width approach-layout">
            <div className="approach-heading">
              <div className="eyebrow light-eyebrow">02 — THE PROCESS</div>
              <h2 className="display">Clear thinking.<br /><em>Clean cuts.</em></h2>
              <p>Precision is more than a machine setting. It starts with listening, choosing the right material, and working through the details together.</p>
              <a href="#quote" className="button button-light button-arrow" data-testid="link-process-quote">Start with a conversation <ArrowRight size={16} /></a>
            </div>
            <div className="steps-list">
              <div className="step-row"><span className="step-number">01</span><div><h3>Tell us the idea</h3><p>What are you making, and what should it feel like? A sketch or a sentence is enough to begin.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">02</span><div><h3>Find the right fit</h3><p>We’ll talk through material, scale and detail so the process fits the piece—not the other way around.</p></div><span className="step-mark">↗</span></div>
              <div className="step-row"><span className="step-number">03</span><div><h3>Make it matter</h3><p>Once the direction is clear, we move into making with care at every edge and mark.</p></div><span className="step-mark">↗</span></div>
            </div>
          </div>
          <div className="approach-coordinate eyebrow">ASTROMARK / PROCESS NOTES / FIELD 01</div>
        </section>

        <section className="materials-section section-pad" id="materials">
          <div className="page-width materials-layout">
            <div className="materials-intro"><div className="eyebrow section-index">03 — THE MATERIAL</div><h2 className="display section-title">The right surface<br />changes <em>everything.</em></h2><p>Material is part of the message. Explore a few starting points and tell us what you have in mind.</p></div>
            <div className="materials-browser">
              <div className="material-tabs" role="tablist" aria-label="Explore materials">
                {materials.map((material, index) => (
                  <button key={material.name} type="button" role="tab" aria-selected={activeMaterial === index} className={`material-tab ${activeMaterial === index ? 'selected' : ''}`} onClick={() => setActiveMaterial(index)} data-testid={`button-material-${material.name.toLowerCase()}`}>
                    <span className="material-number">0{index + 1}</span><span>{material.name}</span><ArrowRight size={15} />
                  </button>
                ))}
              </div>
              <div className="material-detail" role="tabpanel" data-testid="panel-material-detail">
                <div className={`material-swatch swatch-${activeMaterial}`} aria-hidden="true"><span className="swatch-ring" /><span className="swatch-letter">{materials[activeMaterial].name.slice(0, 1)}</span></div>
                <div className="material-copy"><span className="eyebrow">MATERIAL STUDY / 0{activeMaterial + 1}</span><h3>{materials[activeMaterial].detail}</h3><p>{materials[activeMaterial].note}</p><a href="#quote">Ask about {materials[activeMaterial].name.toLowerCase()} <ArrowRight size={14} /></a></div>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-section" id="quote">
          <div className="page-width quote-layout">
            <div className="quote-copy">
              <div className="eyebrow light-eyebrow">04 — YOUR PROJECT STARTS HERE</div>
              <h2 className="display">Let’s make<br /><em>your mark.</em></h2>
              <p>Tell us a little about what you have in mind. Not sure about the details? Leave them open—we can figure out the right questions together.</p>
                  <div className="quote-aside"><span className="quote-aside-mark"><Sparkles size={20} /></span><span>No pressure to have it all figured out.<br />A good starting point is enough.</span></div>
            </div>
            <div className="quote-form-wrap">
              {!briefReady ? (
                <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setBriefReady(true); }} data-testid="form-quote">
                  <div className="form-row">
                    <label>Your name<input required value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="How should we address you?" autoComplete="name" data-testid="input-name" /></label>
                    <label>Email address<input required type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="Where can we reach you?" autoComplete="email" data-testid="input-email" /></label>
                  </div>
                  <label>What are you thinking of making?<textarea required rows={3} value={form.project} onChange={(event) => updateForm('project', event.target.value)} placeholder="A custom sign, a small run, a gift with a story…" data-testid="input-project" /></label>
                  <div className="form-row form-row-three">
                    <label>Material <span className="optional">optional</span><select value={form.material} onChange={(event) => updateForm('material', event.target.value)} data-testid="select-material"><option value="">Not sure yet</option><option>Wood</option><option>Acrylic</option><option>Metal</option><option>Paper</option><option>Other / let's discuss</option></select></label>
                    <label>Approx. size <span className="optional">optional</span><input value={form.size} onChange={(event) => updateForm('size', event.target.value)} placeholder="e.g. palm-sized" data-testid="input-size" /></label>
                    <label>Quantity <span className="optional">optional</span><input value={form.quantity} onChange={(event) => updateForm('quantity', event.target.value)} placeholder="e.g. one / 25" data-testid="input-quantity" /></label>
                  </div>
                  <button type="submit" className="button button-orange button-arrow form-submit" data-testid="button-submit-brief">Prepare my project brief <ArrowRight size={16} /></button>
                  <p className="form-note">Your details stay in this page. This demo does not send or store submissions.</p>
                </form>
              ) : (
                <div className="brief-confirmation" data-testid="status-brief-ready">
                  <div className="confirm-icon"><Check size={20} /></div>
                  <div className="eyebrow">BRIEF PREPARED</div>
                  <h3>A clear place to start.</h3>
                  <p>Your project details are ready. Copy the brief below to keep it handy. This website has no submission endpoint, so nothing has been sent.</p>
                  <pre>{briefText}</pre>
                  <div className="confirm-actions">
                    <button className="button button-orange button-arrow" type="button" onClick={copyBrief} data-testid="button-copy-brief">{copied ? 'Copied to clipboard' : 'Copy project brief'} {copied ? <Check size={15} /> : <ArrowRight size={15} />}</button>
                    <button className="edit-brief" type="button" onClick={() => { setBriefReady(false); setCopied(false); }} data-testid="button-edit-brief">Edit details</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="page-width faq-layout">
            <div><div className="eyebrow section-index">05 — GOOD TO KNOW</div><h2 className="display section-title">A few things<br />you might <em>wonder.</em></h2><p className="faq-subtitle">Still curious? Your project brief is a fine place to ask.</p></div>
            <div className="faq-list">
              {questions.map((item, index) => (
                <div className={`faq-item ${openQuestion === index ? 'faq-open' : ''}`} key={item.q}>
                  <button type="button" className="faq-question" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? null : index)} data-testid={`button-faq-${index + 1}`}><span><i>0{index + 1}</i>{item.q}</span><ChevronDown size={18} /></button>
                  {openQuestion === index && <p className="faq-answer">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div><BrandMark /><p>Thoughtful pieces, made with precision.</p></div>
          <div className="footer-nav"><span className="eyebrow">EXPLORE</span><a href="#work">Selected work</a><a href="#approach">How we work</a><a href="#materials">Materials</a></div>
          <div className="footer-nav"><span className="eyebrow">YOUR NEXT STEP</span><a href="#quote">Request a quote <ArrowRight size={14} /></a><a href="#faq">Frequently asked questions</a></div>
          <a className="back-top" href="#top" aria-label="Back to top"><ArrowDown size={16} /></a>
        </div>
        <div className="page-width footer-bottom"><span>© Astromark Laser</span><span>Made for ideas that deserve a closer look.</span><span>DESIGN / DETAIL / DURABILITY</span></div>
      </footer>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;

function ArrowUpRight() {
  return <ArrowRight size={17} />;
}
