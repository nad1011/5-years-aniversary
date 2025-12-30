# 💕 5-Year Anniversary Celebration Website

A beautiful, romantic anniversary celebration website built with React 18 and Tailwind CSS featuring modern glassmorphism design, smooth animations, and an interactive timeline.

![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)

## ✨ Features

- **Glassmorphism Design** - Modern frosted glass effect with warm gradients
- **Animated Timeline** - Vertical timeline with 5 milestones (2020-2025)
- **Gallery Modal** - Click any milestone to view photos from that year
- **Fullscreen Image Viewer** - Click any photo to view in fullscreen
- **Floating Hearts** - Animated hearts with parallax mouse effect
- **Scroll Animations** - Intersection Observer triggered animations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Keyboard Navigation** - ESC key to close modals

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Hero section with title and subtitle
│   ├── Timeline.jsx       # Timeline section with milestones
│   ├── TimelineItem.jsx   # Individual milestone card
│   ├── GalleryModal.jsx   # Gallery modal component
│   ├── FullscreenViewer.jsx # Fullscreen image viewer
│   └── FloatingHearts.jsx # Floating hearts background
├── data/
│   └── galleryData.js     # Timeline and gallery data
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles and animations
```

## 🎨 Customization

### Changing Timeline Content

Edit `src/data/galleryData.js` to update the timeline milestones:

```javascript
export const timelineData = [
  {
    year: '2020',
    title: 'Your Title Here',
    description: 'Your description here...',
  },
  // Add more years...
];
```

### Adding Your Photos

Replace the placeholder images in `src/data/galleryData.js`:

```javascript
export const galleryData = {
  '2020': [
    {
      img: '/path/to/your/photo.jpg',  // Local path or URL
      caption: 'Your caption here',
    },
    // Add more photos...
  ],
  // Add more years...
};
```

**Tips for adding photos:**
- Place photos in the `public/images/` folder for local images
- Use square images (1:1 ratio) for best results in the gallery
- Keep file sizes optimized for web (under 500KB each)

### Customizing Colors

The color scheme uses Tailwind CSS classes. Main colors are defined in:
- `src/index.css` - Custom CSS classes like `.gradient-text`
- Component files - Tailwind utility classes

Key color classes:
- Background: `from-pink-200 via-purple-200 to-orange-200`
- Text gradient: `from-pink-500 via-purple-500 to-orange-500`
- Accent: `text-pink-500`, `text-purple-700`

## 🎭 Animations

All animations use CSS transitions and keyframes defined in:
- `tailwind.config.js` - Custom animation definitions
- `src/index.css` - Additional CSS animations

Animation features:
- Hero fade-in-scale on load
- Timeline items fade-in with stagger delay
- Timeline line draws from top to bottom
- Gallery modal zoom-in transition
- Close button rotate on hover
- Floating hearts with mouse parallax

## 📱 Responsive Design

- **Desktop (lg+)**: Full zigzag timeline, 4-column gallery
- **Tablet (md)**: Zigzag timeline, 3-column gallery
- **Mobile (sm)**: Vertical timeline, 2-column gallery

## ⌨️ Keyboard Shortcuts

- `ESC` - Close modals (gallery or fullscreen viewer)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires support for:
- CSS `backdrop-filter`
- CSS Grid
- Intersection Observer API

## 📝 License

This project is open source and available for personal use.

---

Made with ❤️ for celebrating love
