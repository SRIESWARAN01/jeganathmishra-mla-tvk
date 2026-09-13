# PLA. Jeganath Mishra MLA — Cumbum Constituency Official Portal

> **தமிழக வெற்றிக் கழகம் (TVK) | Tamilaga Vettri Kazhagam**
> "பிறப்பொக்கும் எல்லா உயிர்க்கும்" — All are equal by birth

## 🏛️ About

An original, modern public representative web application for **PLA. Jeganath Mishra**, MLA of **Cumbum Assembly Constituency, Theni District, Tamil Nadu**, under the leadership of **TVK Chief Thalapathy C. Joseph Vijay**.

### Features

- 🎬 **Cinematic App Intro** — 2.5s animated splash with TVK logo reveal, leader name, and constituency info
- 🌐 **Bilingual (Tamil / English)** — Full language switcher with contextual translations
- 📜 **33-Year Political Timeline** — Interactive journey from 1993 to 2026
- 🏴 **Official TVK Flag Showcase** — Flag with symbol explanation cards (elephants, vaagai flower, 28 stars)
- 📝 **Citizen Grievance Portal** — Submit petitions and receive tracked token IDs
- 🔍 **Live Grievance Tracker** — Real-time pipeline: Received → Review → Field Action → Resolution
- 🖨️ **Printable Official Receipt** — Formal acknowledgment with TVK watermark, QR code, and signature block
- 🌿 **Green Cumbum** — Environmental initiatives and Suruli Falls cleaning drives
- 📸 **Media Gallery** — COVID relief, constituency work, party events
- 📱 **Floating Quick Actions** — WhatsApp helpline and call buttons

### Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with custom design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Cinzel, Inter, Noto Sans Tamil (Google Fonts)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── public/
│   ├── assets/images/tvk/      # TVK logo, flag, leader emblem, state vision
│   └── favicon.ico             # TVK official badge favicon
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AppIntro.tsx         # Cinematic intro animation
│   │   │   ├── TvkLogo.tsx          # TVK logo component (badge/flag/emblem)
│   │   │   ├── GrievanceTracker.tsx  # Live grievance tracking pipeline
│   │   │   └── OfficialReceiptModal.tsx  # Printable receipt modal
│   │   ├── globals.css           # Full design system & styles
│   │   ├── layout.tsx            # Root layout with SEO metadata
│   │   └── page.tsx              # Main homepage
│   └── data/
│       └── content.ts            # Bilingual content (Tamil & English)
└── package.json
```

## 🛠️ Website Development

Designed & Developed by **THENIJOBS**

- **Developer**: THENIJOBS
- **Website**: [https://www.thenijobs.com/](https://www.thenijobs.com/)
- **Specialization**: Modern Web Application Design & Engineering

---

*This is the official representative portal for PLA. Jeganath Mishra MLA. All content is provided for public interest.*
