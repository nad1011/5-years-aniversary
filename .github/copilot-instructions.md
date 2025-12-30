# Anniversary Celebration Website

## Project Overview
A 5-year anniversary celebration website built with React 18 and Tailwind CSS featuring:
- Glassmorphism design with warm gradients
- Animated timeline with milestones
- Gallery modal with fullscreen image viewer
- Floating hearts animations
- Scroll-triggered animations

## Tech Stack
- React 18 (Vite)
- Tailwind CSS
- CSS animations (no external libraries)

## Project Structure
```
src/
├── components/
│   ├── Hero.jsx          - Hero section with title and subtitle
│   ├── Timeline.jsx      - Timeline section with milestones
│   ├── TimelineItem.jsx  - Individual milestone card
│   ├── GalleryModal.jsx  - Gallery modal component
│   ├── FullscreenViewer.jsx - Fullscreen image viewer
│   └── FloatingHearts.jsx - Floating hearts background
├── data/
│   └── galleryData.js    - Timeline and gallery data
├── App.jsx               - Main app component
├── main.jsx              - Entry point
└── index.css             - Global styles and animations
```

## Customization
- Update `src/data/galleryData.js` to change timeline content and photos
- All placeholder images from Unsplash can be replaced with personal photos
- Colors and styling can be adjusted via Tailwind classes

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
