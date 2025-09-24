# Raveworks Orbital Interface

A stunning 3D orbital interface for Raveworks MBSE consulting company, featuring interactive orbs with modal content and smooth animations.

## Features

- **3D Orbital Interface**: Static positioned orbs with realistic 3D sphere effects
- **Interactive Orbs**: Clickable orbs that open detailed modal content
- **Hover Effects**: Yellow text highlighting and subtle glow effects
- **Asynchronous Animations**: Each orb has independent animation timing
- **Responsive Design**: Works on desktop and mobile devices
- **Modal System**: Comprehensive content for each section

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Advanced animations and 3D effects
- **SVG** - Trace lines connecting orbs

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd raveworks-orbital-interface

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm run dev
```

### Build for Production

```bash
# Build the project
npm run build
# or
pnpm run build

# Preview the build
npm run preview
# or
pnpm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy with default settings

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Project Structure

```
src/
├── components/
│   ├── OrbitalInterface.jsx    # Main orbital interface component
│   ├── OrbitalInterface.css    # Styles and animations
│   └── ui/                     # UI components (modals, etc.)
├── lib/
│   └── utils.js               # Utility functions
├── hooks/
│   └── use-mobile.js          # Mobile detection hook
├── App.jsx                    # Main app component with modal system
├── App.css                    # App-level styles
└── main.jsx                   # Entry point
```

## Customization

### Colors
Edit the color variables in `OrbitalInterface.jsx`:
- `color`: Main orb color
- `glowColor`: Glow effect color

### Content
Update the modal content in `App.jsx` in the `modalContent` object.

### Animations
Modify animation timing in `OrbitalInterface.jsx`:
- `animationDelay`: Start delay
- `animationDuration`: Animation duration

## License

MIT License - feel free to use this project for your own purposes.
