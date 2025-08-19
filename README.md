# Techaurex — Gadget Reviews & Guides

Techaurex is a modern, responsive gadget reviews site built with React, Vite, Tailwind CSS, React Router, and shadcn/ui. It features category browsing, powerful filtering, product detail pages with image carousels, a global search experience, and light/dark themes.

## Features

- Categories dropdown: Mobile, Laptop, Earphone
- Category pages with filters
  - Price range (INR)
  - Company filter (context-aware per category)
  - Sections: Latest Reviews (date-sorted), Other Reviews (random)
  - “Show more” loads more items (adaptive: +4 on mobile, +6 on desktop)
- Product cards
  - Clickable to Product Details page (`/product/:id`)
  - “View Deal” opens affiliate link in new tab
- Product Details page
  - Responsive image carousel with thumbnails
  - Name, category, description, features, average rating, total reviews
  - Local star rating input (for future backend integration)
  - Purchase/View Deal buttons
- Latest page (`/latest`): newest products by date/time
- Search (`/search?q=...`)
  - Full-text over names and descriptions
  - Fallback: if no matches, shows products by detected company
  - “Product not listed” when none found
- About page: mission/story with founder (Hari Om Gupta)
- Contact page: feedback form, email, and social links (X/Instagram)
- Dark/light mode toggle (persisted in localStorage), tuned accessible dark palette
- Scroll-to-top on route change

## Tech Stack

- React 18 + Vite 5
- TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
# or
pnpm install
# or
yarn
```

### Run dev server

```bash
npm run dev
```

Open the app at the URL printed by Vite (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Navbar.tsx            # Top nav with categories dropdown, search, theme toggle
    Filters.tsx           # Sidebar filters (price/company)
    ProductCard.tsx       # Card; clickable to details; affiliate View Deal
    ScrollToTop.tsx       # Scrolls to top on route changes
  pages/
    Index.tsx             # Landing page
    CategoryPage.tsx      # Category view with filters/sections
    ProductDetails.tsx    # Details page with carousel & rating
    Latest.tsx            # Newest products page
    SearchResults.tsx     # Search experience with company fallback
    About.tsx             # Story & founder section
    Contact.tsx           # Feedback form, email, and socials
  data/
    mockData.ts           # Base product data (cards)
    categoryData.ts       # Category-specific products and helpers
    productDetails.ts     # Detailed product info & affiliate links
```

## Routing

- `/` — Home
- `/category/:category` — Category page (mobile | laptop | earphone)
- `/product/:id` — Product details
- `/latest` — Latest reviews
- `/search?q=...` — Search results
- `/about` — About us
- `/contact` — Contact us

## Theming

Dark mode uses Tailwind’s `class` strategy. The toggle is in the navbar and persists in `localStorage` as `theme`.

To adjust the palette, edit CSS variables in `src/index.css` under `:root` (light) and `.dark` (dark).

## Data Notes

Sample data lives in `src/data`. You can add products to `mockProducts` and `categoryProducts`. Detailed page data is in `productDetails.ts`; if an item is missing there, the details page falls back to `mockProducts` fields.

Prices are shown in INR using `Intl.NumberFormat('en-IN', { currency: 'INR' })`.

## Accessibility

- High-contrast dark palette for readability
- Keyboard-focusable controls, clear hover/focus states
- Semantic headings and landmarks

## Customization

- Branding: update `index.html` title/meta and the brand name in `Navbar.tsx` & `Footer.tsx`.
- Founder image: replace `/public/placeholder.svg` with your own.
- Pagination: adjust `getPageSize()` in `CategoryPage.tsx` for show-more increments.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## License

This project is provided as-is for educational/demo purposes. Replace assets and data before publishing.
