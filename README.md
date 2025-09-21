# Canvas Arrow Blur Effect

An interactive canvas-based visual effect where arrows on a grid follow your mouse cursor with beautiful motion blur trails and opacity fade effects.

![Canvas Arrow Blur Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC)

## ✨ Features

- **Interactive Mouse Tracking**: Arrows smoothly follow your mouse cursor
- **Motion Blur Trails**: Beautiful trailing effect with customizable blur intensity
- **Opacity Fade**: Arrows fade based on distance from mouse cursor
- **Smooth Animation**: Fluid rotation with configurable smoothing factor
- **Responsive Design**: Adapts to any screen size
- **Performance Optimized**: Efficient canvas rendering with requestAnimationFrame
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🚀 Quick Deploy

Deploy this project instantly to your favorite platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maxwarzet/canvas-root)
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/maxwarzet/canvas-root)
[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/maxwarzet/canvas-root)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/maxwarzet/canvas-root)

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maxwarzet/canvas-root.git
   cd canvas-root
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 🎮 How to Use

1. **Open the application** in your web browser
2. **Move your mouse** around the screen
3. **Watch the arrows** smoothly follow your cursor
4. **Observe the effects**:
   - Arrows point toward your mouse position
   - Motion blur trails create beautiful visual effects
   - Arrows fade based on distance from cursor
   - Smooth rotation animations

## ⚙️ Customization

You can customize the visual effects by modifying these constants in `app/page.tsx`:

```typescript
// Grid and Blur Settings
const ARROW_SPACING = 50        // Distance between arrows (pixels)
const BLUR_ALPHA = 0.1          // Blur intensity (0.0-1.0)

// Arrow Appearance
const ARROW_LENGTH = 12         // Length of arrow lines
const ARROWHEAD_SIZE = 4        // Size of arrowheads
const LINE_STROKE_WIDTH = 0.2   // Line thickness

// Opacity Effects
const FADE_START_DISTANCE = 100 // Distance where fade begins
const FADE_END_DISTANCE = 200   // Distance where fade completes
const MIN_OPACITY = 0.01        // Minimum arrow opacity
const MAX_OPACITY = 1.0         // Maximum arrow opacity

// Animation Smoothing
const SMOOTHING_FACTOR = 0.05   // Rotation smoothness (0.0-1.0)
```

## 🏗️ Project Structure

```
canvas-root/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main canvas component
├── components/
│   ├── ui/                  # Reusable UI components
│   └── theme-provider.tsx   # Theme context provider
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
└── styles/                  # Additional stylesheets
```

## 🎨 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Canvas API** - 2D graphics rendering
- **React Hooks** - State management and effects
- **pnpm** - Fast package manager

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)

---

**Live Demo**: [View on Vercel](https://canvas-root.vercel.app) | **Repository**: [GitHub](https://github.com/maxwarzet/canvas-root)

Made with ❤️ by [maxwarzet](https://github.com/maxwarzet)
