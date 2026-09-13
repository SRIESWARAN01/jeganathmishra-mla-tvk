'use client';

import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  FileText, 
  MapPin, 
  User, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Printer,
  ChevronDown
} from 'lucide-react';

export interface GrievanceRecord {
  token: string;
  citizenName: string;
  village: string;
  category: string;
  date: string;
  status: 'received' | 'review' | 'action' | 'resolved';
  department: string;
  summaryTa: string;
  summaryEn: string;
  actionTakenTa: string;
  actionTakenEn: string;
}

const SAMPLE_RECORDS: Record<string, GrievanceRecord> = {
  'CBM-2026-8492': {
    token: 'CBM-2026-8492',
    citizenName: 'M. Shanmugam',
    village: 'Narayanathevanpatti, Cumbum',
    category: 'Irrigation Canal Cleaning',
    date: 'February 18, 2026',
    status: 'action',
    department: 'Water Resources & Mullaperiyar Basin Wing',
    summaryTa: 'சுருளி அருவி பாசன வாய்க்காலில் அடைபட்டுள்ள கழிவுகளை அகற்றி தடையற்ற நீர்வரத்தை உறுதி செய்தல்.',
    summaryEn: 'Desilting and removal of debris along the Suruli irrigation channel to ensure smooth water flow to farm lands.',
    actionTakenTa: 'சட்டமன்ற உறுப்பினர் தலையீட்டால் பொதுப்பணித்துறை அலுவலர்கள் நேரில் ஆய்வு செய்து ஜேசிபி மூலம் தூர்வாரும் பணிகள் துவங்கப்பட்டுள்ளன.',
    actionTakenEn: 'Following direct MLA intervention, PWD engineers inspected the site and desilting operations commenced with heavy machinery.',
  },
  'CBM-2026-3104': {
    token: 'CBM-2026-3104',
    citizenName: 'K. Meenakshi Ammal',
    village: 'Gudalur West, Theni',
    category: 'Drinking Water & Borewell Repair',
    date: 'January 29, 2026',
    status: 'resolved',
    department: 'Town Panchayat & Public Health',
    summaryTa: 'கூடலூர் 4-வது வார்டு பகுதியில் குடிநீர் மோட்டார் பழுதாகி 5 நாட்களாக குடிநீர் விநியோகம் தடைபட்டது.',
    summaryEn: 'Drinking water pump motor failure in Ward 4, Gudalur, disrupting tap water supply for 5 consecutive days.',
    actionTakenTa: 'புதிய 7.5 HP மோட்டார் நிறுவப்பட்டு 24 மணி நேரத்திற்குள் குடிநீர் விநியோகம் முழுமையாக சீரமைக்கப்பட்டது.',
    actionTakenEn: 'New 7.5 HP submersible pump motor installed and potable water supply restored within 24 hours.',
  },
  'CBM-2026-5521': {
    token: 'CBM-2026-5521',
    citizenName: 'P. Arumugam & Farmers Group',
    village: 'Cumbum Valley Grape Farms',
    category: 'Grape Crop Protection & Cold Storage',
    date: 'February 24, 2026',
    status: 'review',
    department: 'Horticulture & Agricultural Marketing',
    summaryTa: 'பன்னீர் திராட்சை விவசாயிகளுக்கு நவீன குளிர்பதன கிடங்கு மற்றும் கொள்முதல் உதவி கோரிக்கை.',
    summaryEn: 'Request for solar-assisted cold storage facility and direct marketing support for Cumbum Panneer grape growers.',
    actionTakenTa: 'அரசு தோட்டக்கலைத்துறை உயர் அதிகாரிகளுடன் திட்ட வரைவு பரிசீலனையில் உள்ளது; பட்ஜெட் முன்மொழிவு தயார் செய்யப்படுகிறது.',
    actionTakenEn: 'Detailed Project Report (DPR) submitted to State Horticulture Directorate; budget allocation under fast-track review.',
  },
};

interface GrievanceTrackerProps {
  lang: 'en' | 'ta';
  onOpenReceipt: (record: GrievanceRecord) => void;
}

export default function GrievanceTracker({ lang, onOpenReceipt }: GrievanceTrackerProps) {
  const [searchInput, setSearchInput] = useState<string>('CBM-2026-8492');
  const [activeRecord, setActiveRecord] = useState<GrievanceRecord | null>(SAMPLE_RECORDS['CBM-2026-8492']);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (SAMPLE_RECORDS[query]) {
      setActiveRecord(SAMPLE_RECORDS[query]);
      setErrorMessage('');
    } else {
      setErrorMessage(
        lang === 'ta'
          ? 'மனு எண் காணப்படவில்லை. மாதிரி எண்களில் ஒன்றை முயற்சிக்கவும்: CBM-2026-8492, CBM-2026-3104, CBM-2026-5521'
          : 'Token ID not found. Try one of the verified sample tokens: CBM-2026-8492, CBM-2026-3104, CBM-2026-5521'
      );
    }
  };

  const getStepIndex = (status: GrievanceRecord['status']) => {
    switch (status) {
      case 'received': return 1;
      case 'review': return 2;
      case 'action': return 3;
      case 'resolved': return 4;
      default: return 1;
    }
  };

  const currentStep = activeRecord ? getStepIndex(activeRecord.status) : 0;

  return (
    <div className="tracker-card-container">
      {/* Header with Live Status Pulse */}
      <div className="tracker-top-header">
        <div>
          <div className="tracker-badge">
            <span className="pulse-dot" />
            <span>{lang === 'ta' ? 'நேரடி மனு கண்காணிப்பு தளம்' : 'Citizen Grievance Tracking Portal'}</span>
          </div>
          <h3 className="tracker-title">
            {lang === 'ta' ? 'மனுவின் தற்போதைய நிலையை அறியுங்கள்' : 'Track Your Constituency Grievance'}
          </h3>
          <p className="tracker-subtitle">
            {lang === 'ta' 
              ? 'உங்கள் மனு ரசீதில் உள்ள குறிப்பு எண்ணை உள்ளிட்டு நிகழ்நேர களப்பணி நிலையை அறிந்து கொள்ளுங்கள்.'
              : 'Enter your grievance tracking token to view real-time administrative and field actions.'}
          </p>
        </div>

        {/* Quick Sample Selector Pill */}
        <div className="tracker-sample-pills">
          <span className="sample-label">{lang === 'ta' ? 'மாதிரி மனுக்கள்:' : 'Sample Tokens:'}</span>
          {Object.keys(SAMPLE_RECORDS).map((tok) => (
            <button
              key={tok}
              type="button"
              className={`sample-token-btn ${activeRecord?.token === tok ? 'active' : ''}`}
              onClick={() => {
                setSearchInput(tok);
                setActiveRecord(SAMPLE_RECORDS[tok]);
                setErrorMessage('');
              }}
            >
              {tok}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="tracker-search-form">
        <div className="tracker-search-wrap">
          <Search size={20} className="tracker-search-icon" />
          <input
            type="text"
            className="tracker-search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={lang === 'ta' ? 'மனு குறிப்பு எண் (எ.கா: CBM-2026-8492)...' : 'Enter Grievance Token (e.g. CBM-2026-8492)...'}
            aria-label="Grievance token input"
          />
          <button type="submit" className="tracker-search-submit-btn">
            <span>{lang === 'ta' ? 'கண்காணி' : 'Track Status'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="tracker-error-alert">
          <ShieldAlert size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Live Record Showcase */}
      {activeRecord && (
        <div className="tracker-details-panel">
          {/* Metadata Card Strip */}
          <div className="record-meta-strip">
            <div className="meta-block">
              <span className="meta-label">{lang === 'ta' ? 'மனு எண் (Token ID)' : 'Grievance Token'}</span>
              <span className="meta-value token-highlight">{activeRecord.token}</span>
            </div>
            <div className="meta-block">
              <span className="meta-label">{lang === 'ta' ? 'மனுதாரர்' : 'Citizen'}</span>
              <span className="meta-value">{activeRecord.citizenName}</span>
            </div>
            <div className="meta-block">
              <span className="meta-label">{lang === 'ta' ? 'பகுதி / கிராமம்' : 'Locality / Village'}</span>
              <span className="meta-value">{activeRecord.village}</span>
            </div>
            <div className="meta-block">
              <span className="meta-label">{lang === 'ta' ? 'பதிவு செய்யப்பட்ட தேதி' : 'Filing Date'}</span>
              <span className="meta-value">{activeRecord.date}</span>
            </div>
            <div className="meta-block">
              <button
                type="button"
                onClick={() => onOpenReceipt(activeRecord)}
                className="view-statement-btn"
                title="View Official Grievance Statement Receipt"
              >
                <Printer size={15} />
                <span>{lang === 'ta' ? 'அதிகாரப்பூர்வ ரசீது' : 'Official Statement'}</span>
              </button>
            </div>
          </div>

          {/* 4-Stage Progress Pipeline */}
          <div className="tracker-pipeline-box">
            <div className="pipeline-steps">
              {/* Step 1: Received */}
              <div className={`pipeline-step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>
                <div className="step-circle">
                  <CheckCircle2 size={18} />
                </div>
                <div className="step-content">
                  <h5>{lang === 'ta' ? 'மனு பெறப்பட்டது' : 'Petition Received'}</h5>
                  <p>{lang === 'ta' ? 'முகாம் அலுவலகம்' : 'Camp Office Registry'}</p>
                </div>
              </div>

              {/* Step 2: Under Review */}
              <div className={`pipeline-step ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}>
                <div className="step-circle">
                  <Clock size={18} />
                </div>
                <div className="step-content">
                  <h5>{lang === 'ta' ? 'ஆய்வு & துறைக்கு அனுப்புதல்' : 'Official Scrutiny'}</h5>
                  <p>{activeRecord.department.split('&')[0]}</p>
                </div>
              </div>

              {/* Step 3: Field Action */}
              <div className={`pipeline-step ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}>
                <div className="step-circle">
                  <Sparkles size={18} />
                </div>
                <div className="step-content">
                  <h5>{lang === 'ta' ? 'களப்பணி / நடவடிக்கை' : 'Field Inspection & Action'}</h5>
                  <p>{lang === 'ta' ? 'நேரடி ஆய்வு' : 'On-site Execution'}</p>
                </div>
              </div>

              {/* Step 4: Resolved */}
              <div className={`pipeline-step ${currentStep >= 4 ? 'completed' : ''} ${currentStep === 4 ? 'active' : ''}`}>
                <div className="step-circle">
                  <CheckCircle2 size={18} />
                </div>
                <div className="step-content">
                  <h5>{lang === 'ta' ? 'தீர்வு காணப்பட்டது' : 'Resolution Complete'}</h5>
                  <p>{lang === 'ta' ? 'நிறைவு அறிக்கை' : 'Verified Closure'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Log Box */}
          <div className="tracker-action-log">
            <div className="log-col">
              <h4>{lang === 'ta' ? 'மனுவின் கோரிக்கை விபரம்' : 'Grievance Description'}</h4>
              <p>{lang === 'ta' ? activeRecord.summaryTa : activeRecord.summaryEn}</p>
            </div>
            <div className="log-col highlighted">
              <h4>{lang === 'ta' ? 'சட்டமன்ற உறுப்பினர் அலுவலக கள நடவடிக்கை' : 'Camp Office Action Report'}</h4>
              <p>{lang === 'ta' ? activeRecord.actionTakenTa : activeRecord.actionTakenEn}</p>
              <div className="log-dept-tag">
                <MapPin size={14} />
                <span>{activeRecord.department}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
