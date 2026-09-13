'use client';

import React from 'react';
import { Printer, X, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';
import { GrievanceRecord } from './GrievanceTracker';

interface OfficialReceiptModalProps {
  record: GrievanceRecord | null;
  onClose: () => void;
  lang: 'en' | 'ta';
}

export default function OfficialReceiptModal({ record, onClose, lang }: OfficialReceiptModalProps) {
  if (!record) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="receipt-modal-backdrop" onClick={onClose}>
      <div className="receipt-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls */}
        <div className="receipt-modal-top-actions no-print">
          <button onClick={handlePrint} className="receipt-action-btn print">
            <Printer size={16} />
            <span>{lang === 'ta' ? 'அச்சு எடுக்க (Print)' : 'Print Statement'}</span>
          </button>
          <button onClick={onClose} className="receipt-action-btn close" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        {/* Printable Official Document Card */}
        <div className="official-document-sheet" id="official-statement-print">
          {/* Document Watermark */}
          <div className="document-watermark">
            <img src="/assets/images/tvk/tvk-logo.png" alt="TVK Watermark" />
          </div>

          {/* Letterhead Header */}
          <div className="document-letterhead">
            <div className="letterhead-logo">
              <img
                src="/assets/images/tvk/tvk-logo.png"
                alt="TVK Official Logo"
                className="letterhead-logo-img"
              />
            </div>
            <div className="letterhead-text">
              <div className="letterhead-crest-title">
                TAMILAGA VETTRI KAZHAGAM • தமிழக வெற்றிக் கழகம்
              </div>
              <h2 className="letterhead-leader-title">
                PLA. JEGANATH MISHRA MLA.,
              </h2>
              <div className="letterhead-subtitle">
                MEMBER OF LEGISLATIVE ASSEMBLY • 198, CUMBUM CONSTITUENCY, THENI DISTRICT
              </div>
              <div className="letterhead-creed">
                “பிறப்பொக்கும் எல்லா உயிர்க்கும்” • All human beings are equal by birth
              </div>
            </div>
          </div>

          <div className="document-divider-stripe">
            <div className="stripe-crimson" />
            <div className="stripe-gold" />
            <div className="stripe-crimson" />
          </div>

          {/* Statement Subject Header */}
          <div className="document-header-row">
            <div>
              <div className="doc-type-badge">
                <ShieldCheck size={14} />
                <span>OFFICIAL GRIEVANCE ACKNOWLEDGMENT STATEMENT</span>
              </div>
              <div className="doc-reference-text">
                REF NO: <strong>{record.token}</strong>
              </div>
            </div>
            <div className="doc-meta-right">
              <div><strong>DATE:</strong> {record.date}</div>
              <div><strong>CAMP:</strong> PLA Home, Theni Main Road, Cumbum</div>
            </div>
          </div>

          {/* Citizen Details Table */}
          <table className="document-data-table">
            <tbody>
              <tr>
                <td className="table-label">CITIZEN NAME:</td>
                <td className="table-val"><strong>{record.citizenName}</strong></td>
                <td className="table-label">CONSTITUENCY:</td>
                <td className="table-val">198, Cumbum Assembly (TN)</td>
              </tr>
              <tr>
                <td className="table-label">VILLAGE / WARD:</td>
                <td className="table-val">{record.village}</td>
                <td className="table-label">DISTRICT:</td>
                <td className="table-val">Theni District, Tamil Nadu</td>
              </tr>
              <tr>
                <td className="table-label">DEPARTMENT:</td>
                <td colSpan={3} className="table-val">{record.department}</td>
              </tr>
              <tr>
                <td className="table-label">PETITION SUBJECT:</td>
                <td colSpan={3} className="table-val"><strong>{record.category}</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Description & Action Section */}
          <div className="document-body-box">
            <div className="doc-section-title">PETITION SUMMARY / மனு சுருக்கம்:</div>
            <p className="doc-narrative-text">{record.summaryEn}</p>
            <p className="doc-narrative-tamil">{record.summaryTa}</p>

            <div className="doc-section-title" style={{ marginTop: '16px' }}>CAMP OFFICE ACTION DIRECTIVE:</div>
            <p className="doc-narrative-text">{record.actionTakenEn}</p>
            <p className="doc-narrative-tamil">{record.actionTakenTa}</p>
          </div>

          {/* Verification Footer & Official Seal */}
          <div className="document-footer-row">
            <div className="doc-verification-seal">
              <div className="seal-circle">
                <span>CAMP OFFICE</span>
                <span className="seal-star">★ TVK ★</span>
                <span>CUMBUM MLA</span>
              </div>
              <div className="doc-security-note">
                <CheckCircle2 size={15} color="#059669" />
                <span>Digitally Verified at Camp Office Server</span>
              </div>
            </div>

            <div className="doc-qr-box">
              <div className="qr-visual">
                <QrCode size={48} />
              </div>
              <span className="qr-caption">Scan to Verify Live Status</span>
            </div>

            <div className="doc-signature-block">
              <div className="signature-space" />
              <div className="signature-line" />
              <div className="signature-name">PLA. Jeganath Mishra MLA</div>
              <div className="signature-sub">Camp Office Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
