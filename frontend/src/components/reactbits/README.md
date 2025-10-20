# React Bits Components

A collection of animated React components inspired by [reactbits.dev](https://reactbits.dev).

## 📦 What's Inside

This directory contains custom-built animated components that enhance the DataDocAI user experience with smooth, performant animations.

### Files

- `AnimatedText.jsx` - Text animation components
- `AnimatedButton.jsx` - Interactive button components
- `AnimatedBackground.jsx` - Background effect components
- `LoadingAnimations.jsx` - Loading state components
- `index.js` - Centralized exports

## 🚀 Quick Start

### Import All Components
```jsx
import {
  AnimatedText,
  MagneticButton,
  GradientOrbs,
  BouncingDots
} from './components/reactbits';
```

### Import Individual Components
```jsx
import { AnimatedText } from './components/reactbits/AnimatedText';
import { MagneticButton } from './components/reactbits/AnimatedButton';
```

## 📚 Available Components

### Text Animations
- **AnimatedText** - Character-by-character reveal
- **GradientTypingText** - Typing effect with gradient
- **BlurFadeText** - Blur-to-clear fade in

### Button Animations
- **MagneticButton** - Cursor-following magnetic effect
- **ShimmerButton** - Shimmer overlay on hover
- **RippleButton** - Click ripple effect

### Background Effects
- **ParticlesBackground** - Floating particles
- **GridBackground** - Animated grid pattern
- **GradientOrbs** - Floating gradient spheres
- **SpotlightBackground** - Radial gradient overlay

### Loading States
- **BouncingDots** - Three bouncing dots
- **PulseRing** - Pulsing ring loader
- **GradientSpinner** - Circular gradient spinner
- **SkeletonLoader** - Content skeleton with shimmer
- **GradientProgress** - Animated progress bar

## 💡 Examples

### Animated Header
```jsx
import { AnimatedText, ParticlesBackground } from './components/reactbits';

<div className="relative">
  <ParticlesBackground particleCount={20} />
  <h1>
    <AnimatedText text="Welcome to DataDocAI" />
  </h1>
</div>
```

### Interactive Button
```jsx
import { MagneticButton } from './components/reactbits';

<MagneticButton 
  onClick={handleClick}
  className="bg-gradient-to-r from-indigo-600 to-purple-600"
>
  Click Me
</MagneticButton>
```

### Loading State
```jsx
import { BouncingDots, GradientProgress } from './components/reactbits';

{isLoading && (
  <div>
    <BouncingDots color="indigo" size="md" />
    <GradientProgress progress={uploadProgress} />
  </div>
)}
```

### Background Effects
```jsx
import { GradientOrbs, GridBackground } from './components/reactbits';

<div className="relative">
  <GradientOrbs orbCount={3} />
  <GridBackground size={50} opacity={0.08} />
  {/* Your content */}
</div>
```

## 🎨 Styling

All components accept a `className` prop for custom styling:

```jsx
<AnimatedText 
  text="Custom Styled" 
  className="text-4xl font-bold text-blue-600"
/>
```

### Color System

Components use consistent gradients:
- Primary: `from-indigo-600 via-purple-600 to-pink-600`
- Background: `from-indigo-50 to-purple-50`

## ⚡ Performance

- **Zero dependencies** - Pure React + CSS
- **GPU-accelerated** - Uses CSS transforms
- **Lightweight** - ~3KB gzipped total
- **Optimized** - 60 FPS animations
- **Accessible** - Respects `prefers-reduced-motion`

## 🎯 Best Practices

### ✅ Do
- Use animations to guide user attention
- Keep animations subtle and purposeful
- Test on low-end devices
- Respect user motion preferences
- Combine effects thoughtfully

### ❌ Don't
- Animate everything
- Use heavy JavaScript animations
- Ignore accessibility
- Override user preferences
- Nest too many animated components

## 📖 Documentation

For detailed documentation, see:
- [REACTBITS_ENHANCEMENTS.md](../../../REACTBITS_ENHANCEMENTS.md) - Implementation guide
- [COMPONENT_SHOWCASE.md](../../../COMPONENT_SHOWCASE.md) - Visual showcase
- [UI_ENHANCEMENTS.md](../../../UI_ENHANCEMENTS.md) - Original enhancements

## 🛠️ Customization

### Adjusting Animation Speed

```jsx
// Faster character animation
<AnimatedText text="Fast" delay={0.02} duration={0.1} />

// Delayed blur fade
<BlurFadeText text="Delayed" delay={0.5} />
```

### Custom Animations

Add new keyframes in `index.css` and extend in `tailwind.config.js`:

```css
/* index.css */
@keyframes myAnimation {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-myAnimation {
  animation: myAnimation 1s ease-out;
}
```

```javascript
// tailwind.config.js
animation: {
  myAnimation: 'myAnimation 1s ease-out',
}
```

## 🔧 Troubleshooting

### Animations Not Working
1. Check if CSS is imported in `main.jsx`
2. Verify Tailwind config includes animation extensions
3. Ensure components are imported correctly

### Performance Issues
1. Reduce `particleCount` in ParticlesBackground
2. Limit simultaneous animations
3. Test with React DevTools Profiler
4. Consider disabling on low-end devices

### Styling Conflicts
1. Check class name specificity
2. Use `!important` sparingly
3. Verify Tailwind purge isn't removing classes
4. Check for conflicting CSS

## 🤝 Contributing

To add new components:

1. Create component in appropriate file
2. Export from `index.js`
3. Add documentation to this README
4. Update COMPONENT_SHOWCASE.md
5. Test across browsers

## 📄 License

Part of DataDocAI project. Inspired by React Bits (MIT License).

## 🙏 Credits

Inspired by [React Bits](https://reactbits.dev) by David Haz.

## 🔗 Links

- [React Bits Official Site](https://reactbits.dev)
- [React Bits GitHub](https://github.com/DavidHDev/react-bits)
- [DataDocAI Repository](https://github.com/AaronRaj06/DataDocAI)

---

**Need help?** Check the documentation files or open an issue on GitHub.
