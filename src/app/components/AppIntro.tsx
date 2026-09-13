'use client';

import React, { useEffect, useState } from 'react';

interface AppIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function AppIntro({ onComplete, forceShow = false }: AppIntroProps) {
  // Sequence step: 0: initial, 1: logo in, 2: logo reveal glow, 3: name, 4: title & constituency, 5: exit
  const [step, setStep] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if intro was already seen in this session (unless forced)
    if (!forceShow && typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('tvk_cumbum_intro_seen');
      if (seen === 'true') {
        setIsVisible(false);
        if (onComplete) onComplete();
        return;
      }
    }

    // Fast, cinematic 2.6s sequence
    // 0.1s -> Step 1: TVK Logo
    const t1 = setTimeout(() => setStep(1), 100);
    // 0.7s -> Step 2: Elegant logo reveal & radial beam
    const t2 = setTimeout(() => setStep(2), 700);
    // 1.3s -> Step 3: PLA. JEGANATH MISHRA
    const t3 = setTimeout(() => setStep(3), 1300);
    // 1.8s -> Step 4: MLA • CUMBUM CONSTITUENCY • THENI DISTRICT
    const t4 = setTimeout(() => setStep(4), 1800);
    // 2.5s -> Step 5: Start exit transition
    const t5 = setTimeout(() => setStep(5), 2500);
    // 2.8s -> Finished: unmount and notify
    const t6 = setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tvk_cumbum_intro_seen', 'true');
      }
      if (onComplete) onComplete();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [forceShow, onComplete]);

  const handleSkip = () => {
    setStep(5);
    setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tvk_cumbum_intro_seen', 'true');
      }
      if (onComplete) onComplete();
    }, 250);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`intro-overlay ${step === 5 ? 'intro-fade-out' : ''}`}
      aria-label="Application Cinematic Intro"
    >
      {/* Background Ambient Aura */}
      <div className="intro-bg-radial" />
      <div className="intro-particles-grid" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="intro-skip-btn"
        aria-label="Skip introduction"
      >
        <span>Skip</span>
        <span className="intro-skip-arrow">→</span>
      </button>

      {/* Main Central Presentation Block */}
      <div className="intro-stage">
        {/* Step 1 & 2: TVK Logo & Radiant Reveal */}
        <div className={`intro-logo-box ${step >= 1 ? 'logo-enter' : ''} ${step >= 2 ? 'logo-glow-active' : ''}`}>
          <div className="intro-logo-halo" />
          <img
            src="/assets/images/tvk/tvk-logo.png"
            alt="Tamilaga Vettri Kazhagam Official Logo"
            className="intro-logo-media"
          />
          <div className="intro-logo-spark" />
        </div>

        {/* Step 2: Party Affirmation Banner */}
        <div className={`intro-party-tag ${step >= 2 ? 'fade-up-active' : ''}`}>
          <span className="intro-flag-line" />
          <span className="intro-party-title">TAMILAGA VETTRI KAZHAGAM</span>
          <span className="intro-flag-line" />
        </div>

        {/* Step 3: Leader Name */}
        <div className={`intro-name-wrap ${step >= 3 ? 'name-enter-active' : ''}`}>
          <h1 className="intro-leader-name">PLA. JEGANATH MISHRA</h1>
        </div>

        {/* Step 4: Designation, Constituency & District */}
        <div className={`intro-details-wrap ${step >= 4 ? 'details-enter-active' : ''}`}>
          <div className="intro-mla-badge">
            <span className="mla-text">MLA</span>
          </div>

          <div className="intro-geo-line">
            <span className="intro-geo-item">CUMBUM CONSTITUENCY</span>
            <span className="intro-dot">•</span>
            <span className="intro-geo-item">THENI DISTRICT</span>
          </div>

          <div className="intro-tamil-creed">
            “பிறப்பொக்கும் எல்லா உயிர்க்கும்”
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="intro-progress-track">
        <div className={`intro-progress-fill step-${step}`} />
      </div>
    </div>
  );
}
