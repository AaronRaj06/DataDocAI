# React Bits Quick Reference Card

## 🎯 Most Used Components

### Text Animation
```jsx
import { AnimatedText, BlurFadeText } from './components/reactbits';

<AnimatedText text="Hello" />
<BlurFadeText text="World" delay={0.3} />
```

### Buttons
```jsx
import { MagneticButton, ShimmerButton, RippleButton } from './components/reactbits';

<MagneticButton onClick={fn}>Send</MagneticButton>
<ShimmerButton onClick={fn}>Upload</ShimmerButton>
<RippleButton onClick={fn}>Click</RippleButton>
```

### Loading
```jsx
import { BouncingDots, GradientSpinner, GradientProgress } from './components/reactbits';

<BouncingDots color="indigo" size="md" />
<GradientSpinner size="lg" />
<GradientProgress progress={75} />
```

### Background
```jsx
import { GradientOrbs, GridBackground, ParticlesBackground } from './components/reactbits';

<GradientOrbs orbCount={3} />
<GridBackground size={50} opacity={0.08} />
<ParticlesBackground particleCount={20} />
```

## 📦 Single Import
```jsx
import {
  AnimatedText,
  MagneticButton,
  BouncingDots,
  GradientOrbs
} from './components/reactbits';
```

## 🎨 CSS Classes

| Class | Effect | Duration |
|-------|--------|----------|
| `animate-float` | Vertical float | 6s loop |
| `animate-shimmer` | Shimmer effect | 2s loop |
| `animate-ripple` | Click ripple | 0.6s |
| `animate-fadeIn` | Fade in | 0.5s |
| `animate-scaleIn` | Scale + fade | 0.3s |
| `animate-slideUp` | Slide up + fade | 0.3s |

## 🎨 Color Gradients

```jsx
// Primary
className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"

// Background Light
className="bg-gradient-to-br from-indigo-50 to-purple-50"

// Success
className="bg-gradient-to-r from-green-50 to-emerald-50"

// Error  
className="bg-gradient-to-r from-red-50 to-pink-50"
```

## ⚙️ Common Props

### AnimatedText
- `text`: string (required)
- `delay`: number (0.05)
- `duration`: number (0.3)
- `className`: string

### Buttons
- `onClick`: function
- `disabled`: boolean
- `className`: string
- `children`: ReactNode

### GradientProgress
- `progress`: number (0-100)
- `className`: string

### BouncingDots
- `color`: 'indigo' | 'purple' | 'pink'
- `size`: 'sm' | 'md' | 'lg'
- `className`: string

## 🚀 Performance Tips

✅ **Do**
- Use CSS animations
- Limit particle count
- Respect motion preferences

❌ **Don't**
- Animate everything
- Nest too many animations
- Ignore accessibility

## 📱 Mobile Optimization

```jsx
// Conditional rendering for mobile
{!isMobile && <ParticlesBackground particleCount={20} />}

// Reduced particles
<ParticlesBackground particleCount={isMobile ? 10 : 30} />
```

## 🎯 Where Used

| Component | Location |
|-----------|----------|
| AnimatedText | App.jsx, ChatInterface.jsx |
| BlurFadeText | App.jsx, FileUpload.jsx |
| MagneticButton | ChatInterface.jsx |
| ShimmerButton | FileUpload.jsx |
| RippleButton | MessageBubble.jsx |
| GradientOrbs | App.jsx |
| GridBackground | App.jsx |
| ParticlesBackground | ChatInterface.jsx |
| BouncingDots | ChatInterface.jsx |
| GradientSpinner | ChatInterface.jsx |
| GradientProgress | FileUpload.jsx |

## 📚 Full Documentation

- [REACTBITS_ENHANCEMENTS.md](./REACTBITS_ENHANCEMENTS.md) - Complete guide
- [COMPONENT_SHOWCASE.md](./COMPONENT_SHOWCASE.md) - Visual showcase
- [src/components/reactbits/README.md](./src/components/reactbits/README.md) - Component docs

---

**Made with** ❤️ **using** [React Bits](https://reactbits.dev)
