'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Share2, 
  Menu, 
  X, 
  Send, 
  Clock, 
  Award, 
  HeartHandshake, 
  Trees, 
  Droplets, 
  Trash2, 
  Recycle, 
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { siteContent, galleryPhotos, GalleryItem } from '@/data/content';
import TvkLogo from './components/TvkLogo';
import AppIntro from './components/AppIntro';
import GrievanceTracker, { GrievanceRecord } from './components/GrievanceTracker';
import OfficialReceiptModal from './components/OfficialReceiptModal';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ta'>('ta');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'covid' | 'suruli' | 'party' | 'constituency'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedReceiptRecord, setSelectedReceiptRecord] = useState<GrievanceRecord | null>(null);

  // Grievance Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    panchayat: '',
    category: '',
    subject: '',
    description: '',
  });
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const t = siteContent[lang];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.subject || !formData.description) {
      alert(lang === 'ta' ? 'தயவுசெய்து தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.' : 'Please fill all required fields.');
      return;
    }
    const token = `CBM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedToken(token);
  };

  const closeFormModal = () => {
    setSubmittedToken(null);
    setFormData({
      name: '',
      phone: '',
      panchayat: '',
      category: '',
      subject: '',
      description: '',
    });
  };

  const filteredPhotos = activeGalleryTab === 'all' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === activeGalleryTab);

  return (
    <div className={lang === 'ta' ? 'lang-ta' : ''}>
      {/* Cinematic TVK App Intro Animation */}
      <AppIntro />

      {/* 1. TOP UTILITY BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <MapPin size={14} color="#f5b014" />
              <span>{lang === 'ta' ? 'PLA இல்லம், கம்பம், தேனி மாவட்டம்' : 'PLA Home, Cumbum, Theni District'}</span>
            </span>
            <span className="top-bar-item">
              <Phone size={14} color="#f5b014" />
              <a href="tel:+918760515605">+91 87605 15605</a>
            </span>
            <span className="top-bar-item">
              <Mail size={14} color="#f5b014" />
              <a href="mailto:plajeganathmishramla@gmail.com">plajeganathmishramla@gmail.com</a>
            </span>
          </div>

          <div className="top-bar-right">
            {/* Live Bilingual Switcher */}
            <div className="lang-switcher" aria-label="Language selection">
              <button 
                className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} 
                onClick={() => setLang('ta')}
              >
                தமிழ்
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
                onClick={() => setLang('en')}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <header className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="logo-brand" title="Tamilaga Vettri Kazhagam">
            <div className="tvk-crest">
              <TvkLogo size={52} />
            </div>
            <div className="logo-titles">
              <span className="brand-name">{t.hero.title}</span>
              <span className="brand-sub">{lang === 'ta' ? 'கம்பம் சட்டமன்றத் தொகுதி • தவெக' : 'Cumbum Constituency • TVK'}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">{lang === 'ta' ? 'அறிமுகம்' : 'About'}</a></li>
            <li><a href="#timeline" className="nav-link">{lang === 'ta' ? 'அரசியல் பயணம்' : 'Milestones'}</a></li>
            <li><a href="#party" className="nav-link">{lang === 'ta' ? 'தளபதி விஜய் & தவெக' : 'TVK & Vijay'}</a></li>
            <li><a href="#green" className="nav-link">{lang === 'ta' ? 'பசுமை கம்பம்' : 'Green Cumbum'}</a></li>
            <li><a href="#gallery" className="nav-link">{lang === 'ta' ? 'புகைப்படங்கள்' : 'Gallery'}</a></li>
            <li><a href="#contact" className="nav-link">{lang === 'ta' ? 'தொடர்புக்கு' : 'Contact'}</a></li>
            <li>
              <a href="#grievance" className="nav-cta">
                {lang === 'ta' ? 'மனு அளியுங்கள்' : 'Grievance Desk'}
              </a>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer open">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'அறிமுகம் (About MLA)' : 'About MLA'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#timeline" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'அரசியல் பயணம் (Timeline)' : 'Political Journey'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#party" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'தளபதி விஜய் & தவெக (Party)' : 'TVK & Thalapathy Vijay'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#green" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'பசுமை கம்பம் & சுருளி அருவி' : 'Green Cumbum & Suruli'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#grievance" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'மக்களின் குறைதீர்ப்பு மையம்' : 'Citizen Grievance Portal'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'புகைப்படத் தொகுப்பு (Gallery)' : 'Media Gallery'}
                </a>
              </li>
              <li className="mobile-nav-item">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  {lang === 'ta' ? 'முகாம் அலுவலகம் (Contact)' : 'Camp Office & Contact'}
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* 3. HERO SHOWCASE */}
      <section className="hero-section" id="hero">
        <div className="hero-overlay-grid"></div>
        <div className="container hero-content">
          <div className="hero-text-col">
            <div className="hero-badge-wrap">
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-constituency">{t.hero.constituency}</p>

            {/* TVK Motto Box */}
            <div className="hero-motto-box">
              <div className="hero-creed">“{t.hero.creed}”</div>
              <div className="hero-creed-sub">{t.hero.creedSubtitle}</div>
            </div>

            {/* Leader Tribute Pill */}
            <div className="leader-tribute-pill">
              <div className="leader-avatar-wrap">
                <img 
                  src="/assets/images/tvk/tvk-leader-emblem.png"
                  alt="Tamilaga Vettri Kazhagam Chief Thalapathy Vijay"
                  style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                />
              </div>
              <div className="leader-tribute-text">
                <h5>{t.hero.leaderBanner}</h5>
                <h4>{t.hero.leaderName}</h4>
                <p>{t.hero.leaderDesc}</p>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#grievance" className="btn btn-gold">
                <FileText size={18} />
                <span>{t.hero.ctaPetition}</span>
              </a>
              <a href="#timeline" className="btn btn-outline">
                <Calendar size={18} />
                <span>{t.hero.ctaJourney}</span>
              </a>
            </div>
          </div>

          {/* Hero Portrait Visual Side */}
          <div className="hero-visual-col">
            <div className="hero-portrait-card">
              {/* Official high-resolution portrait from jeganathmishra.com */}
              <img 
                src="https://assets.zyrosite.com/2ly6OCHjuLV3GRfA/chatgpt-image-jul-25-2026-01_19_54-pm-p6KsuogFl9jF68YC.png"
                alt="PLA. Jeganath Mishra MLA"
                className="hero-main-img"
              />
              <div className="hero-floating-badge">
                <div className="badge-flag-stripe"></div>
                <div className="floating-badge-title">PLA. Jeganath Mishra MLA.,</div>
                <div className="floating-badge-sub">
                  {lang === 'ta' ? 'கம்பம் சட்டமன்ற உறுப்பினர் • தவெக' : 'MLA, Cumbum Constituency • TVK'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER RIBBON */}
      <div className="container">
        <div className="stats-ribbon">
          <div className="stats-grid">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. MISSION CREDO & QUOTATION BANNER */}
      <section className="mission-quote-section">
        <div className="container">
          <div className="quote-card">
            <div className="quote-icon-watermark">“</div>
            <div className="quote-badge">{t.quote.title}</div>
            <h3 className="quote-heading">{t.quote.subtitle}</h3>
            <p className="quote-body">{t.quote.text}</p>
            <div className="quote-author-block">
              <div>
                <div className="quote-author-name">{t.quote.author}</div>
                <div className="quote-author-sub">{t.quote.subline}</div>
              </div>
            </div>
          </div>

          {/* Slogan Banner */}
          <div className="slogan-highlight-bar">
            <p>
              {lang === 'ta' ? t.missionBanner.tamil : t.missionBanner.english}
            </p>
          </div>
        </div>
      </section>

      {/* 6. ABOUT MLA SECTION */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{lang === 'ta' ? 'வாழ்க்கைக் குறிப்பு' : 'Biographical Journey'}</span>
            <h2 className="section-title">{t.about.title}</h2>
            <p className="section-subtitle">{t.about.subtitle}</p>
          </div>

          <div className="about-grid">
            <div className="about-image-collage">
              <div className="about-main-card">
                <img 
                  src="https://assets.zyrosite.com/2ly6OCHjuLV3GRfA/2d4a5341---copy-w4B0ANegDZkPu6m5.JPG" 
                  alt="PLA. Jeganath Mishra in public service"
                />
              </div>
              <div className="about-floating-stat">
                <h4>London 2006</h4>
                <p>
                  {lang === 'ta' 
                    ? 'லண்டன் பாராளுமன்றம் வழங்கிய சிறந்த மனிதநேய விருது' 
                    : 'Recipient of London Parliament Best Humanitarian Award'}
                </p>
              </div>
            </div>

            <div className="about-story-col">
              <div className="story-pill">
                <h4>{t.about.earlyLifeTitle}</h4>
                <p>{t.about.earlyLifeText}</p>
              </div>

              <div className="story-pill">
                <h4>{t.about.businessTitle}</h4>
                <p>{t.about.businessText}</p>
              </div>

              <div className="story-pill">
                <h4>{t.about.humanitarianTitle}</h4>
                <p>{t.about.humanitarianText}</p>
              </div>

              <div className="story-pill">
                <h4>{t.about.familyTitle}</h4>
                <p>{t.about.familyText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 33-YEAR POLITICAL TIMELINE (1993 - 2026) */}
      <section className="timeline-section" id="timeline">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{lang === 'ta' ? 'அரசியல் களப்பணி' : '33 Years of Public Service'}</span>
            <h2 className="section-title">{t.timeline.title}</h2>
            <p className="section-subtitle">{t.timeline.subtitle}</p>
          </div>

          <div className="timeline-container">
            {t.timeline.items.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-node"></div>
                <div className="timeline-card">
                  <span className="timeline-year-badge">{item.year}</span>
                  <h3 className="timeline-role">
                    {lang === 'ta' ? item.roleTa : item.roleEn}
                  </h3>
                  <div className="timeline-org">
                    {lang === 'ta' ? item.organizationTa : item.organizationEn}
                  </div>
                  <p className="timeline-desc">
                    {lang === 'ta' ? item.descriptionTa : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TVK & THALAPATHY VIJAY LEADERSHIP SHOWCASE */}
      <section className="party-showcase-section" id="party">
        <div className="container">
          <div className="party-grid">
            <div className="party-poster-card">
              <img 
                src="https://assets.zyrosite.com/2ly6OCHjuLV3GRfA/4k-tvk-vijay-political-uhd-pc-wallpaper-833-zmBDBNlUtK7IqZJa.jpg"
                alt="Tamilaga Vettri Kazhagam Chief Vijay"
                className="party-poster-img"
              />
            </div>

            <div className="party-details-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <TvkLogo size={62} />
                <div>
                  <div className="party-badge-gold">{t.partySection.badge}</div>
                  <h2 className="party-title" style={{ margin: 0 }}>{t.partySection.title}</h2>
                </div>
              </div>
              <h3 style={{ color: '#f5b014', fontSize: '1.25rem', fontWeight: 800 }}>
                {t.partySection.chiefTitle}
              </h3>

              <div className="party-pillar-card">
                <h4>{lang === 'ta' ? '45 ஆண்டு திரையுலக பயணம் & மக்கள் சேவை' : '45 Years in Cinema to Public Dedication'}</h4>
                <p>{t.partySection.cinemaText}</p>
              </div>

              <div className="party-pillar-card">
                <h4>{lang === 'ta' ? 'விஜய் மக்கள் இயக்கம் (VMI - ஜூலை 2009)' : 'Vijay Makkal Iyakkam (VMI - July 2009)'}</h4>
                <p>{t.partySection.vmiText}</p>
              </div>

              <div className="party-pillar-card">
                <h4>{lang === 'ta' ? 'தமிழக வெற்றிக் கழகம் (TVK - பிப்ரவரி 2, 2024)' : 'Tamilaga Vettri Kazhagam (TVK - Feb 2, 2024)'}</h4>
                <p>{t.partySection.tvkText}</p>
              </div>
            </div>
          </div>

          {/* OFFICIAL TVK FLAG SHOWCASE */}
          <div className="tvk-flag-showcase">
            <div className="tvk-flag-header">
              <div className="tvk-flag-badge">
                <TvkLogo size={22} />
                <span>{lang === 'ta' ? 'கழகத்தின் புனிதக் கொடி' : 'Official Party Flag'}</span>
              </div>
              <h3 className="tvk-flag-title">
                {lang === 'ta' ? 'தமிழக வெற்றிக் கழக அதிகாரப்பூர்வ கொடி' : 'Official Tamilaga Vettri Kazhagam Flag'}
              </h3>
              <p className="tvk-flag-motto">“பிறப்பொக்கும் எல்லா உயிர்க்கும்”</p>
            </div>

            <div className="tvk-flag-content-grid">
              <div className="tvk-flag-wrap">
                <img 
                  src="/assets/images/tvk/tvk-flag.png" 
                  alt="Official TVK Flag - Red, Yellow & Royal Elephants" 
                  className="tvk-flag-img"
                />
                <div className="tvk-flag-caption-bar">
                  <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட விகிதம்: 3:2' : 'Official Aspect Ratio: 3:2'}</span>
                  <span>TVK OFFICIAL FLAG</span>
                </div>
              </div>

              <div className="tvk-symbols-cards">
                <div className="tvk-symbol-card">
                  <span className="tvk-symbol-indicator red" />
                  <h4>{lang === 'ta' ? 'சிவப்பு வண்ணப் பட்டைகள்' : 'Maroon Red Bands'}</h4>
                  <p>{lang === 'ta' ? 'தியாகம், வீரம், களப்போராட்டம் மற்றும் விடியலுக்கான புரட்சிகர அர்ப்பணிப்பு.' : 'Sacrifice, heroic public resilience, and fearless commitment to social equity.'}</p>
                </div>

                <div className="tvk-symbol-card">
                  <span className="tvk-symbol-indicator gold" />
                  <h4>{lang === 'ta' ? 'மஞ்சள் நடுவண்ணப் பட்டை' : 'Golden Yellow Center'}</h4>
                  <p>{lang === 'ta' ? 'மக்களாட்சி, ஒளிமயமான எதிர்காலம், சுபிட்சம் மற்றும் சமத்துவ நல்வாழ்வு.' : 'Democratic prosperity, golden vision for Tamil Nadu, and citizen empowerment.'}</p>
                </div>

                <div className="tvk-symbol-card">
                  <span className="tvk-symbol-indicator silver" />
                  <h4>{lang === 'ta' ? 'இரு போர் யானைகள்' : 'Twin Royal War Elephants'}</h4>
                  <p>{lang === 'ta' ? 'அசைக்க முடியாத கம்பீரம், தொடர் வெற்றி, மக்கள் ஆதரவு மற்றும் பாதுகாப்பு பலம்.' : 'Steadfast fortitude, unyielding triumph, and majestic protection of the public.'}</p>
                </div>

                <div className="tvk-symbol-card">
                  <span className="tvk-symbol-indicator vaagai" />
                  <h4>{lang === 'ta' ? '28 நட்சத்திரங்கள் & வாகை மலர்' : '28 Stars & Vaagai Flower'}</h4>
                  <p>{lang === 'ta' ? 'பண்டைய தமிழரின் வெற்றிச் சின்னமான வாகை மலர் மற்றும் 28 தொகுதி வழிகாட்டல் நட்சத்திரங்கள்.' : 'Ancient Tamil emblem of absolute victory encircled by 28 guiding stars of equality.'}</p>
                </div>
              </div>
            </div>

            {/* TVK 2026 State Vision Feature */}
            <div className="tvk-vision-showcase">
              <div className="tvk-vision-poster-wrap">
                <img 
                  src="/assets/images/tvk/tvk-state-vision.png" 
                  alt="Thalapathy Vijay Tamil Nadu Vision 2026" 
                  className="tvk-vision-poster-img"
                />
              </div>
              <div className="tvk-vision-text">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f5b014', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {lang === 'ta' ? 'தலைமைச் செயலக தொலைநோக்கு பார்வை' : 'Vision for Tamil Nadu Governance'}
                  </span>
                </div>
                <h3>{lang === 'ta' ? 'தூய்மையான மக்கள் ஆட்சி & கம்பம் தொகுதி வளர்ச்சி' : 'Clean Governance & Cumbum Growth'}</h3>
                <p>
                  {lang === 'ta' 
                    ? 'தமிழக வெற்றிக் கழகத் தலைவர் தளபதி விஜய் அவர்களின் வழிகாட்டுதலில், கம்பம் சட்டமன்றத் தொகுதி மக்களுக்கு லஞ்சமில்லா நேர்மையான சேவை, குடிநீர் பாதுகாப்பு, முல்லைப்பெரியாறு விவசாய உரிமை மற்றும் சுருளி அருவி பசுமை மேம்பாட்டை முன்னிறுத்தி PLA. ஜெகநாத் மிஸ்ரா MLA அவர்கள் தொடர்ந்து அர்ப்பணிப்புடன் களப்பணியாற்றி வருகிறார்.'
                    : 'Under the dynamic leadership of TVK Chief Thalapathy Vijay, MLA PLA. Jeganath Mishra champions corruption-free citizen governance, reliable drinking water, Mullaperiyar agricultural rights, and ecological conservation for Cumbum Constituency.'}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="#grievance" className="btn btn-gold" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                    <FileText size={16} />
                    <span>{lang === 'ta' ? 'மனு பதிவு மையம்' : 'Citizen Grievance'}</span>
                  </a>
                  <a href="#green" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '0.88rem', borderColor: 'rgba(255,255,255,0.3)' }}>
                    <span>{lang === 'ta' ? 'பசுமை கம்பம் பணிகள்' : 'Green Initiatives'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GREEN CUMBUM & ENVIRONMENTAL INITIATIVES */}
      <section className="green-section" id="green">
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ background: '#dcfce7', color: '#15803d' }}>
              {t.greenVision.badge}
            </span>
            <h2 className="section-title">{t.greenVision.title}</h2>
            <p className="section-subtitle">{t.greenVision.subtitle}</p>
          </div>

          <div className="green-actions-grid">
            {t.greenVision.actions.map((act, i) => (
              <div key={i} className="green-card">
                <div className="green-icon-wrap">
                  {i === 0 && <Trash2 size={24} />}
                  {i === 1 && <Recycle size={24} />}
                  {i === 2 && <Droplets size={24} />}
                  {i === 3 && <Trees size={24} />}
                  {i === 4 && <ShieldCheck size={24} />}
                  {i === 5 && <Droplets size={24} color="#dc2626" />}
                </div>
                <h4>{act.title}</h4>
                <p>{act.desc}</p>
              </div>
            ))}
          </div>

          {/* Suruli Falls Cleaning Feature Box */}
          <div className="suruli-feature-box">
            <div className="suruli-text">
              <h3>{t.greenVision.suruliHighlight.title}</h3>
              <p>{t.greenVision.suruliHighlight.text}</p>
            </div>
            <div className="suruli-visual">
              <img 
                src="https://assets.zyrosite.com/2ly6OCHjuLV3GRfA/2d4a4937-CuP1UJqUm4Nwfpcj.JPG" 
                alt="Suruli Falls Cleaning Drive"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. CITIZEN GRIEVANCE PORTAL */}
      <section className="grievance-section" id="grievance">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.grievance.badge}</span>
            <h2 className="section-title">{t.grievance.title}</h2>
            <p className="section-subtitle">{t.grievance.subtitle}</p>
          </div>

          {/* Interactive Grievance Tracker & Live Pipeline */}
          <GrievanceTracker 
            lang={lang} 
            onOpenReceipt={(record) => setSelectedReceiptRecord(record)} 
          />

          <div className="grievance-layout">
            <div className="grievance-info-panel">
              <h3>{lang === 'ta' ? 'மக்களின் குரல் உடனடியாக கேட்கப்படுகிறது' : 'Direct Helpline & Instant Ticketing'}</h3>
              <p>
                {lang === 'ta'
                  ? 'கம்பம் தொகுதி பொதுமக்கள் தங்கள் நியாயமான கோரிக்கைகள், கிராமப்புற தேவைகள், குடிநீர் மற்றும் பாசன நீர் பிரச்சினைகளை நேரடியாக பதிவு செய்யலாம்.'
                  : 'Citizens of Cumbum Constituency can directly register their representations, agricultural grievances, and civic requests for rapid review by the MLA Camp Office.'}
              </p>

              <ul className="grievance-points">
                <li className="grievance-point-item">
                  <CheckCircle2 className="grievance-point-icon" size={20} />
                  <span>{lang === 'ta' ? 'பதிவு செய்யப்பட்ட ஒவ்வொரு மனுவிற்கும் தனி குறியீடு எண்' : 'Unique tracking token generated for every petition'}</span>
                </li>
                <li className="grievance-point-item">
                  <CheckCircle2 className="grievance-point-icon" size={20} />
                  <span>{lang === 'ta' ? '48 மணி நேரத்திற்குள் அலுவலகக் குழுவினர் ஆய்வு செய்து தொடர்பு' : 'MLA camp office review and follow-up within 48 hours'}</span>
                </li>
                <li className="grievance-point-item">
                  <CheckCircle2 className="grievance-point-icon" size={20} />
                  <span>{lang === 'ta' ? 'விவசாயம், கல்வி, சுகாதாரம் மற்றும் சாலைப் பணிகளுக்கு முன்னுரிமை' : 'Priority channels for agriculture, education, and civic repairs'}</span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="grievance-form-card">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: '#111827' }}>
                {t.grievance.formTitle}
              </h3>

              <form onSubmit={handleFormSubmit} className="grievance-form-grid">
                <div className="form-group">
                  <label className="form-label">{t.grievance.nameLabel}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder={lang === 'ta' ? 'உங்கள் பெயர்' : 'e.g. M. Murugan'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.grievance.phoneLabel}</label>
                  <input 
                    type="tel" 
                    required 
                    className="form-input" 
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.grievance.panchayatLabel}</label>
                  <select 
                    className="form-select"
                    value={formData.panchayat}
                    onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                  >
                    <option value="">{lang === 'ta' ? '-- பகுதியைத் தேர்ந்தெடுக்கவும் --' : '-- Select Area / Town --'}</option>
                    {t.grievance.panchayats.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.grievance.categoryLabel}</label>
                  <select 
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">{lang === 'ta' ? '-- வகையைத் தேர்ந்தெடுக்கவும் --' : '-- Select Category --'}</option>
                    {t.grievance.categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label">{t.grievance.subjectLabel}</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder={lang === 'ta' ? 'கோரிக்கையின் சுருக்கம்' : 'Brief subject of petition'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label className="form-label">{t.grievance.descLabel}</label>
                  <textarea 
                    required 
                    className="form-textarea" 
                    placeholder={lang === 'ta' ? 'உங்கள் குறைகள் அல்லது தேவைகளை விரிவாகக் குறிப்பிடவும்...' : 'Describe your grievance or request in detail...'}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-group-full">
                  <button type="submit" className="submit-petition-btn">
                    <Send size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    <span>{t.grievance.submitBtn}</span>
                  </button>
                  <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '10px', textAlign: 'center' }}>
                    {t.grievance.trackingNotice}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. MEDIA & PRESS GALLERY */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.gallery.badge}</span>
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle">{t.gallery.subtitle}</p>
          </div>

          {/* Filter Tabs */}
          <div className="gallery-tabs">
            {t.gallery.tabs.map((tab) => (
              <button
                key={tab.id}
                className={`gallery-tab-btn ${activeGalleryTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveGalleryTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-masonry">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="gallery-card"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="gallery-img-wrap">
                  <img src={photo.imageUrl} alt={lang === 'ta' ? photo.titleTa : photo.titleEn} />
                </div>
                <div className="gallery-card-body">
                  <div className="gallery-card-category">{photo.category.toUpperCase()}</div>
                  <h4 className="gallery-card-title">
                    {lang === 'ta' ? photo.titleTa : photo.titleEn}
                  </h4>
                  <p className="gallery-card-desc">
                    {lang === 'ta' ? photo.descriptionTa : photo.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CAMP OFFICE & CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t.contact.badge}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-cards-col">
              <div className="contact-info-card">
                <h4>{t.contact.officeName}</h4>
                <p>{t.contact.address}</p>
              </div>

              <div className="contact-links-grid">
                <a href={`tel:${t.contact.phone}`} className="quick-contact-btn quick-btn-phone">
                  <Phone size={20} />
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase' }}>{lang === 'ta' ? 'நேரடி அழைப்பு' : 'Direct Call'}</div>
                    <div>{t.contact.phone}</div>
                  </div>
                </a>

                <a href={`https://wa.me/919842117518`} target="_blank" rel="noopener noreferrer" className="quick-contact-btn quick-btn-wa">
                  <MessageCircle size={20} />
                  <div>
                    <div style={{ fontSize: '0.74rem', textTransform: 'uppercase' }}>WhatsApp Direct</div>
                    <div>{t.contact.whatsapp}</div>
                  </div>
                </a>
              </div>

              {/* Social Media Links from site */}
              <div style={{ marginTop: '10px' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4b5563', marginBottom: '8px' }}>
                  {lang === 'ta' ? 'சமூக ஊடகங்கள் வழி இணையுங்கள்:' : 'Official Social Channels:'}
                </h5>
                <div className="social-links-bar">
                  <a href="https://www.facebook.com/jeganathmishra.chettiar.1" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Facebook">
                    FB
                  </a>
                  <a href="https://www.instagram.com/pla_jeganathmishra/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Instagram">
                    IG
                  </a>
                  <a href="https://x.com/JeganathMishra_" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter / X">
                    X
                  </a>
                  <a href="https://www.youtube.com/@plajeganathmishra" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                    YT
                  </a>
                  <a href="https://www.linkedin.com/in/pla-jeganathmishra-undefined-201023425" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                    IN
                  </a>
                </div>
              </div>
            </div>

            {/* Office Timings & Annadhanam */}
            <div className="office-hours-card">
              <h3>{lang === 'ta' ? 'அலுவலக வேலை நேரம் & மக்கள் சந்திப்பு' : 'Visiting Hours & Daily Service'}</h3>
              <p>{t.contact.hours}</p>

              <div className="annadhanam-highlight">
                <h4 style={{ fontWeight: 800, marginBottom: '6px', color: '#f5b014' }}>
                  {lang === 'ta' ? 'அன்னதானம் வழக்கம் (Annadhanam Tradition)' : 'Daily Annadhanam Sanctuary'}
                </h4>
                <p>{t.contact.dailyAnnadhanam}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. SUCCESS PETITION MODAL */}
      {submittedToken && (
        <div className="modal-backdrop" onClick={closeFormModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeFormModal}>&times;</button>
            <div className="modal-success-badge">
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px', color: '#111827' }}>
              {lang === 'ta' ? 'மனு வெற்றிகரமாக பதிவு செய்யப்பட்டது!' : 'Petition Successfully Registered!'}
            </h3>
            <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.92rem', marginBottom: '20px' }}>
              {lang === 'ta' 
                ? 'உங்கள் மனு கம்பம் சட்டமன்ற உறுப்பினர் அலுவலகத்தில் முறைப்படி ஏற்றுக்கொள்ளப்பட்டது.' 
                : 'Your representation has been queued for review by the MLA Camp Office.'}
            </p>

            <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '12px', border: '1px dashed #d97706', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#92400e' }}>
                {lang === 'ta' ? 'அரசு கண்காணிப்பு குறியீடு எண்' : 'Official Tracking Token'}
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#b45309', letterSpacing: '0.05em', marginTop: '4px' }}>
                #{submittedToken}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px' }}>
              <strong>{lang === 'ta' ? 'மனுதாரர் பெயர்:' : 'Applicant:'}</strong> {formData.name}<br />
              <strong>{lang === 'ta' ? 'பகுதி:' : 'Area:'}</strong> {formData.panchayat || 'Cumbum'}<br />
              <strong>{lang === 'ta' ? 'வகை:' : 'Category:'}</strong> {formData.category || 'General'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="btn btn-gold" 
                style={{ width: '100%' }}
                onClick={() => {
                  const rec: GrievanceRecord = {
                    token: submittedToken || 'CBM-2026-9999',
                    citizenName: formData.name,
                    village: formData.panchayat || 'Cumbum',
                    category: formData.category || 'General Representation',
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    status: 'received',
                    department: 'MLA Camp Office - Citizen Redressal Wing',
                    summaryTa: formData.description,
                    summaryEn: formData.subject,
                    actionTakenTa: 'மனு முறைப்படி ஏற்றுக்கொள்ளப்பட்டு அலுவலக பதிவேட்டில் சேர்க்கப்பட்டது; உடனடி பரிசீலனையில் உள்ளது.',
                    actionTakenEn: 'Representation successfully queued and entered into MLA Camp Office dispatch ledger for verification.',
                  };
                  setSelectedReceiptRecord(rec);
                  setSubmittedToken(null);
                }}
              >
                <FileText size={16} />
                <span>{lang === 'ta' ? 'அதிகாரப்பூர்வ அச்சு ரசீது (Print Formal Statement)' : 'Print Formal Statement'}</span>
              </button>

              <button 
                className="btn btn-outline" 
                style={{ width: '100%', borderColor: '#d1d5db', color: '#4b5563' }}
                onClick={closeFormModal}
              >
                {lang === 'ta' ? 'முடிந்தது (Done)' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 14. PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="modal-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-card" style={{ maxWidth: '780px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPhoto(null)}>&times;</button>
            <div style={{ maxHeight: '520px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', marginBottom: '16px', background: '#070a0f' }}>
              <img 
                src={selectedPhoto.imageUrl} 
                alt={lang === 'ta' ? selectedPhoto.titleTa : selectedPhoto.titleEn}
                style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
              {lang === 'ta' ? selectedPhoto.titleTa : selectedPhoto.titleEn}
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6 }}>
              {lang === 'ta' ? selectedPhoto.descriptionTa : selectedPhoto.descriptionEn}
            </p>
          </div>
        </div>
      )}

      {/* 15. FLOATING QUICK ACTION BUTTONS */}
      <div className="floating-actions">
        <a 
          href="https://wa.me/919842117518" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-btn floating-wa"
          title="WhatsApp Helpline"
        >
          <MessageCircle size={26} />
        </a>
        <a 
          href="tel:+918760515605" 
          className="floating-btn floating-call"
          title="Call Camp Office"
        >
          <Phone size={24} />
        </a>
      </div>

      {/* 16. FOOTER */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-top-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <TvkLogo size={44} />
                <h3 style={{ margin: 0 }}>{t.hero.title}</h3>
              </div>
              <p>{t.footer.constituencyTag}</p>
              <p style={{ marginTop: '8px', color: '#f5b014', fontWeight: 700 }}>
                {t.hero.creed}
              </p>
            </div>

            <div className="footer-links">
              <h4>{lang === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}</h4>
              <ul>
                <li><a href="#about">{lang === 'ta' ? 'வாழ்க்கைக் குறிப்பு' : 'About MLA'}</a></li>
                <li><a href="#timeline">{lang === 'ta' ? 'அரசியல் வரலாறு' : 'Political Path'}</a></li>
                <li><a href="#party">{lang === 'ta' ? 'தமிழக வெற்றிக் கழகம்' : 'TVK Movement'}</a></li>
                <li><a href="#green">{lang === 'ta' ? 'பசுமை கம்பம்' : 'Green Cumbum'}</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>{lang === 'ta' ? 'மக்கள் சேவை' : 'Constituency Services'}</h4>
              <ul>
                <li><a href="#grievance">{lang === 'ta' ? 'மக்களின் மனுக்கள்' : 'Grievance Submission'}</a></li>
                <li><a href="#gallery">{lang === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Media Gallery'}</a></li>
                <li><a href="#contact">{lang === 'ta' ? 'முகாம் அலுவலகம்' : 'Camp Office Details'}</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copyright-block">
              <span className="footer-rights-text">{t.footer.rights}</span>
              <span className="footer-dev-credit">
                Designed &amp; Developed by{' '}
                <a
                  href="https://www.thenijobs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thenijobs-link"
                >
                  THENIJOBS
                </a>
              </span>
            </div>

            <div className="footer-bottom-actions">
              <a
                href="https://www.thenijobs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="thenijobs-badge"
                title="THENIJOBS — Website Design & Engineering"
              >
                <span className="thenijobs-badge-icon">⚡</span>
                <span className="thenijobs-badge-text">
                  Developed by <strong className="thenijobs-brand">THENIJOBS</strong>
                </span>
              </a>

              <a
                href="https://www.jeganathmishra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-domain-link"
              >
                www.jeganathmishra.com
              </a>
            </div>
          </div>

          {/* Public Interest & Authorization Notice */}
          <div className="footer-disclaimer">
            <p>
              {lang === 'ta' 
                ? 'இந்த இணையதளத்தில் உள்ள அனைத்து உள்ளடக்கங்களும் பொதுமக்கள் நலன் கருதி வழங்கப்படுகின்றன. TVK கழகத்தின் சின்னங்கள் மற்றும் கொடி அதிகாரப்பூர்வ வழிகாட்டுதலின்படி பயன்படுத்தப்படுகின்றன. இது அரசு தளம் அல்ல.'
                : 'All content on this website is provided for public interest and constituent service. TVK party symbols and emblem are used under official party authorization. This is not a government website.'}
            </p>
          </div>
        </div>
      </footer>

      {/* 17. OFFICIAL PRINTABLE RECEIPT MODAL */}
      <OfficialReceiptModal 
        record={selectedReceiptRecord} 
        onClose={() => setSelectedReceiptRecord(null)} 
        lang={lang} 
      />
    </div>
  );
}
