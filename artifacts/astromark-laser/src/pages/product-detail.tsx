import { ArrowLeft, ArrowRight, Check, MessageCircle, MoveUpRight } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { buildGeneralWhatsAppUrl, buildProductWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import './product-detail.css';

type ProductDetailPageProps = {
  slug: string;
};

const catalogueHref = '/#catalogue';

function ProductNotFound() {
  return (
    <div className="product-detail-page">
      <header className="pd-header">
        <div className="pd-header-inner">
          <a className="pd-brand" href="/" aria-label="Astramark Laser Machine home" data-testid="link-brand-home">
            <img src="/images/astromark-logo.png" alt="Astramark Laser Machine Pvt. Ltd." />
          </a>
          <a className="pd-header-link" href={catalogueHref} data-testid="link-back-catalogue">
            <ArrowLeft size={15} /> Browse machines
          </a>
        </div>
      </header>
      <main className="pd-not-found" data-testid="status-product-not-found">
        <span className="pd-eyebrow">MACHINE CATALOGUE</span>
        <p className="pd-not-found-number">404</p>
        <h1>We couldn’t find that machine.</h1>
        <p>The product link may have changed. Browse the catalogue to find a machine by process.</p>
        <a className="pd-button pd-button-primary" href={catalogueHref} data-testid="link-not-found-catalogue">
          Browse the catalogue <ArrowRight size={16} />
        </a>
      </main>
      <ProductFooter />
    </div>
  );
}

function ProductFooter() {
  return (
    <footer className="pd-footer">
      <div className="pd-footer-main">
        <div className="pd-footer-brand">
          <a className="pd-brand pd-brand-footer" href="/" aria-label="Astramark Laser Machine home" data-testid="link-footer-home">
            <img src="/images/astromark-logo.png" alt="Astramark Laser Machine Pvt. Ltd." />
          </a>
          <p>Bringing Precision to Every Possibility.</p>
        </div>
        <div className="pd-footer-column">
          <span className="pd-eyebrow">CATALOGUE</span>
          <a href={catalogueHref} data-testid="link-footer-catalogue">Browse all machines</a>
          <a href="/#catalogue" data-testid="link-footer-processes">Marking, cutting &amp; welding</a>
        </div>
        <div className="pd-footer-column">
          <span className="pd-eyebrow">CONTACT</span>
          <a href="tel:+919177709681" data-testid="link-footer-phone">+91 9177709681</a>
          <a href="tel:+919177709682" data-testid="link-footer-phone-support">+91 9177709682</a>
          <a href="mailto:info@astramarklaser.com" data-testid="link-footer-email">info@astramarklaser.com</a>
          <a href="mailto:support@astramarklaser.com" data-testid="link-footer-support-email">support@astramarklaser.com</a>
          <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="link-footer-whatsapp"><MessageCircle size={14} /> WhatsApp enquiries</a>
        </div>
      </div>
      <div className="pd-footer-bottom">
        <span>© Astramark Laser Machine Pvt. Ltd.</span>
        <span>Machine visuals are illustrative supplier references, not photos of Astramark machines.</span>
      </div>
    </footer>
  );
}

function getWhatsAppHref(product: Product): string {
  return buildWhatsAppUrl(buildProductWhatsAppMessage(product.name));
}

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const product = products.find((item) => item.slug === slug);

  if (!product) return <ProductNotFound />;

  return (
    <div className="product-detail-page">
      <header className="pd-header">
        <div className="pd-header-inner">
          <a className="pd-brand" href="/" aria-label="Astramark Laser Machine home" data-testid="link-brand-home">
            <img src="/images/astromark-logo.png" alt="Astramark Laser Machine Pvt. Ltd." />
          </a>
          <nav className="pd-nav" aria-label="Main navigation">
            <a href="/#top" data-testid="link-nav-overview">Overview</a>
            <a href="/#support" data-testid="link-nav-why-astramark">Why Astramark</a>
            <a href="/#catalogue" data-testid="link-nav-machines">Machines</a>
            <a href="/#contact" data-testid="link-nav-contact">Contact</a>
            <a className="pd-header-cta" href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="link-header-whatsapp">
              <MessageCircle size={15} /> WhatsApp enquiries <MoveUpRight size={14} />
            </a>
          </nav>
          <div className="pd-mobile-actions">
            <a className="pd-mobile-catalogue" href={catalogueHref} data-testid="link-mobile-catalogue">All machines</a>
            <a className="pd-mobile-whatsapp" href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="link-mobile-whatsapp"><MessageCircle size={14} /> WhatsApp</a>
          </div>
        </div>
      </header>

      <main>
        <section className="pd-hero" aria-labelledby="pd-title">
          <div className="pd-hero-inner">
            <div className="pd-breadcrumbs" aria-label="Breadcrumb">
              <a href="/" data-testid="link-breadcrumb-home">Home</a>
              <span aria-hidden="true">/</span>
              <a href={catalogueHref} data-testid="link-breadcrumb-catalogue">Machine catalogue</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.name}</span>
            </div>
            <div className="pd-hero-grid">
              <div className="pd-hero-copy">
                <span className="pd-eyebrow pd-kicker"><i aria-hidden="true" /> {product.category} systems <span>—</span> Product {String(products.indexOf(product) + 1).padStart(2, '0')}</span>
                <h1 id="pd-title">{product.name}</h1>
                <p className="pd-summary">{product.summary}</p>
                <p className="pd-description">{product.description}</p>
                <div className="pd-hero-actions">
                  <a className="pd-button pd-button-primary" href={`/?machine=${encodeURIComponent(product.name)}`} data-testid="link-enquire-now">
                    Get a Quote <ArrowRight size={16} />
                  </a>
                  <a className="pd-button pd-button-secondary" href={catalogueHref} data-testid="link-back-to-catalogue">
                    <ArrowLeft size={15} /> Back to catalogue
                  </a>
                </div>
                <div className="pd-trust-note">
                  <span className="pd-trust-icon"><Check size={13} /></span>
                  <span>Configuration and suitability are confirmed around your application.</span>
                </div>
              </div>
              <div className="pd-visual">
                <div className="pd-image-frame">
                  <span className="pd-image-index">AST / {String(products.indexOf(product) + 1).padStart(2, '0')}</span>
                  <img src={product.image} alt={`Illustrative supplier reference image of the ${product.name}`} data-testid="img-product-reference" />
                  <span className="pd-image-caption"><span className="pd-caption-mark" /> {product.category} / machine reference</span>
                </div>
                <div className="pd-visual-disclosure" role="note" data-testid="text-image-disclosure">
                  <span className="pd-disclosure-line" aria-hidden="true" />
                  <div>
                    <strong>Illustrative supplier reference</strong>
                    <p>This image is a supplier reference for illustration—not a photo of a machine held by Astramark. Confirm model appearance and configuration with our team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pd-highlights" aria-label="Catalogue highlights">
          <div className="pd-highlights-inner">
            <div className="pd-highlights-label">
              <span className="pd-eyebrow">AT A GLANCE</span>
              <span>Catalogue highlights</span>
            </div>
            {product.highlights.map(([label, value], index) => (
              <div className="pd-highlight" key={`${label}-${index}`} data-testid={`text-highlight-${index + 1}`}>
                <span className="pd-highlight-label">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="pd-details" aria-label={`${product.name} details`}>
          <div className="pd-details-layout">
            <div className="pd-details-intro">
              <span className="pd-eyebrow pd-section-index">01 — SPECIFICATION NOTES</span>
              <h2>Know what’s listed.<br /><em>Confirm what fits.</em></h2>
              <p>These are the product details listed in the catalogue. Final configuration depends on material, workpiece, and process requirements—ask our team to review the fit.</p>
              <a className="pd-text-link" href={`/?machine=${encodeURIComponent(product.name)}`} data-testid="link-specification-enquiry">
                Ask about this configuration <MoveUpRight size={15} />
              </a>
            </div>
            <div className="pd-spec-card">
              <div className="pd-card-heading">
                <span className="pd-eyebrow">CATALOGUE LISTING</span>
                <span className="pd-spec-count">{String(product.specifications.length).padStart(2, '0')} entries</span>
              </div>
              <dl className="pd-spec-list">
                {product.specifications.map(([label, value], index) => (
                  <div className="pd-spec-row" key={`${label}-${index}`} data-testid={`row-specification-${index + 1}`}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="pd-spec-footnote">Please confirm the final specification and optional configurations with Astramark before proceeding.</p>
            </div>
          </div>
        </section>

        <section className="pd-applications" aria-label="Applications and features">
          <div className="pd-applications-inner">
            <div className="pd-app-heading">
              <span className="pd-eyebrow pd-section-index">02 — WHERE IT’S USED</span>
              <h2>Made for the work<br />you <em>actually do.</em></h2>
              <p>Catalogue-listed applications{product.features?.length ? ' and features' : ''} for this machine family.</p>
            </div>
            <div className="pd-application-content">
              <div className="pd-list-block">
                <div className="pd-list-heading"><span>Applications</span><span>{String(product.applications.length).padStart(2, '0')}</span></div>
                <ul className="pd-application-list">
                  {product.applications.map((application, index) => (
                    <li key={application} data-testid={`text-application-${index + 1}`}>
                      <span className="pd-list-number">{String(index + 1).padStart(2, '0')}</span>
                      <span>{application}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
              {product.features && product.features.length > 0 && (
                <div className="pd-list-block pd-features-block">
                  <div className="pd-list-heading"><span>Listed features</span><span>{String(product.features.length).padStart(2, '0')}</span></div>
                  <ul className="pd-feature-list">
                    {product.features.map((feature, index) => (
                      <li key={feature} data-testid={`text-feature-${index + 1}`}><Check size={14} aria-hidden="true" />{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pd-next-step" aria-labelledby="pd-next-title">
          <div className="pd-next-inner">
            <div>
              <span className="pd-eyebrow">03 — NEXT STEP</span>
              <h2 id="pd-next-title">Let’s talk about<br /><em>{product.name}.</em></h2>
              <p>Share your material and process goals. Astramark can help you discuss the configuration listed for your application.</p>
            </div>
            <div className="pd-next-actions">
              <a className="pd-button pd-button-light" href={`/?machine=${encodeURIComponent(product.name)}`} data-testid="link-bottom-enquire">
                Get a Quote <ArrowRight size={16} />
              </a>
              <a className="pd-button pd-button-whatsapp" href={getWhatsAppHref(product)} target="_blank" rel="noreferrer" data-testid="link-whatsapp-enquiry">
                <MessageCircle size={17} /> Enquire on WhatsApp <MoveUpRight size={14} />
              </a>
              <span className="pd-phone-note">WhatsApp · +91 9177709681</span>
            </div>
          </div>
          <div className="pd-next-watermark" aria-hidden="true">ASTRAMARK</div>
        </section>
      </main>

      <ProductFooter />
    </div>
  );
}

export default ProductDetailPage;
