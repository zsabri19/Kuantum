# Kuantum — GCC Digital Trade-Enablement Platform

**Premium, production-quality website for Kuantum** — positioned as an Oman-led digital trade-enablement and exhibition infrastructure platform for the GCC, backed by the CxO Global Forum ecosystem.

---

## ✅ Completed Features

### Design System
- **CSS Variables** — Navy (#0A0F1E), Gold (#C9A84C), Teal (#1A7A8A) brand palette
- **Typography** — Playfair Display (display/headings) + Inter (body)
- **SVG Kuantum Logo** — `images/kuantum-logo.svg` — ring-mark with K letterform, gold dots, wordmark, GCC tagline
- **Font Awesome 6.4** icons throughout (zero emojis remaining)
- **Glassmorphism navbar** with scroll-triggered opacity
- **Gold/teal accent system**, border gradients, shadow system
- **Responsive grid system** — 1/2/3/4-column with mobile breakpoints

### Homepage (`index.html`)
- Hero section with video background (kuantum-hero-1.mp4) + YouTube fallback
- Proof strip with animated counters
- **Brand Video Showcase** — 3-video section (hero video + 2 side videos with fallbacks)
- Why Kuantum pillars (3-column)
- Platform feature grid
- Who it's for (4 audience cards)
- 2022 Event proof with YouTube embed
- Ecosystem credibility / CxO Global Forum section
- Leadership preview with real founder photos
- Insights preview
- Final CTA

### Platform Page (`platform.html`)
- Feature comparison table
- Full platform capability grid

### Solutions Page (`solutions.html`)
- Sticky tab navigation (Organizers, Chambers, Government, Exhibitors)
- Per-audience solution cards with benefits
- FA icons replacing all emojis in tab labels

### Proof Page (`proof.html`)
- 2022 Digital Exhibition case study
- Partner logos (Government, Chamber, Corporate)
- YouTube video embed

### Leadership Page (`leadership.html`)
- Founding Thesis section
- **Kanwal Masroor Badvi** — Full profile with photo (images/kanwal-profile.jpg)
- **Zeeshan Sabri** — Full profile with photo (images/zeeshan-profile.jpg)
- Founder Philosophy section (4-quadrant)
- **Advisory Committee** — 8 cards in responsive 4-column grid with initials fallback
- Final CTA

### Insights Page (`insights.html`)
- Featured article section
- Filter tabs by category
- 9 article cards with hover state
- Expanded article view

### Contact Page (`contact.html`)
- 3-way selector (Demo / Partner / Exhibitor)
- URL parameter routing (`?type=demo|partner|exhibitor`)
- Form validation
- Regional office info

### JavaScript (`js/main.js`)
- Navbar scroll behavior + hamburger mobile menu
- IntersectionObserver scroll animations (fade-up, fade-in, stagger)
- Animated counter reveals
- Video fallback handling (hero + secondary videos)
- Video modal for YouTube
- Platform hover states
- Solution tab navigation
- Parallax effects

---

## 📄 Pages & URLs

| Page | Path | Description |
|------|------|-------------|
| Homepage | `index.html` | Full platform introduction with video showcase |
| Platform | `platform.html` | Feature deep-dive and comparison |
| Solutions | `solutions.html` | Per-audience solution pages with tabs |
| Proof | `proof.html` | 2022 case study |
| Leadership | `leadership.html` | Founders + Advisory Committee |
| Insights | `insights.html` | Thought leadership articles |
| Contact | `contact.html` | Demo/Partner/Exhibitor forms |

---

## 🎬 Video Integration

Videos are served as local files and fall back gracefully:

| File | Role | Fallback |
|------|------|----------|
| `kuantum-hero-1.mp4` | Hero visual + Brand showcase primary | YouTube thumbnail + click-to-watch |
| `kuantum-brand-2.mp4` | Secondary — Exhibitor environment | YouTube thumbnail |
| `kuantum-brand-3.mp4` | Secondary — Networking lounge | YouTube thumbnail |

**To upload videos**: Place the three MP4 files in the root directory before deploying. The JS fallback (`initVideoFallbacks()`) automatically shows YouTube-linked thumbnails if videos can't be loaded.

---

## 👤 Leadership & Founder Photos

| Person | Image File | Source |
|--------|-----------|--------|
| Kanwal Masroor Badvi | `images/kanwal-profile.jpg` | YouTube/CxO Global TV |
| Zeeshan Sabri | `images/zeeshan-profile.jpg` | cxo2conf.com speaker profile |

Both images use onerror fallback to styled initials (KM / ZS).

---

## 🏛️ Advisory Committee

The Advisory Committee section on `leadership.html` currently contains:
- **Ghulam Sadiqain Khoja** — GM IT, Yunus Textile Mills (from CxO Forum announcement)
- 7 placeholder cards awaiting real advisory member details

**Action Required**: Provide actual advisory member names, titles, LinkedIn URLs, and photos from the Advisory Committee.docx document to populate all 8 cards.

---

## 📁 File Structure

```
index.html            — Homepage
platform.html         — Platform features
solutions.html        — Audience solutions
proof.html            — 2022 case study
leadership.html       — Founders + Advisory
insights.html         — Articles
contact.html          — Contact forms
css/
  style.css           — Full design system (~46KB)
js/
  main.js             — Interactions + video fallback
images/
  kuantum-logo.svg    — SVG brand logo
  kuantum-profile.jpg — Kanwal photo
  zeeshan-profile.jpg — Zeeshan photo
  (other legacy files)
videos/ (to be added)
  kuantum-hero-1.mp4
  kuantum-brand-2.mp4
  kuantum-brand-3.mp4
```

---

## 🔲 Not Yet Implemented

- [ ] Real advisory committee member photos and verified LinkedIn URLs
- [ ] Kuantum.global official domain SSL integration
- [ ] CMS / data layer for Insights articles
- [ ] Live contact form backend submission
- [ ] Tracking / analytics integration (GA4, etc.)

---

## 🚀 Deployment

Go to **Publish tab** for one-click deployment. Before publishing:
1. Upload the 3 MP4 video files to the root directory
2. Confirm advisory member details and update leadership.html
3. Update LinkedIn URLs for advisory committee cards

---

*Built: March 2026 | CxO Global Forum Ecosystem | Oman-led GCC Digital Trade Infrastructure*
