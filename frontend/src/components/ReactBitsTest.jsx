import React from 'react';
import { AnimatedText, BlurFadeText, GradientTypingText } from './reactbits/AnimatedText';
import { MagneticButton, ShimmerButton, RippleButton } from './reactbits/AnimatedButton';
import { BouncingDots, GradientSpinner, GradientProgress } from './reactbits/LoadingAnimations';
import { ParticlesBackground, GridBackground, GradientOrbs } from './reactbits/AnimatedBackground';

/**
 * Test component to verify all React Bits components are working
 */
const ReactBitsTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 relative">
      {/* Background Tests */}
      <GradientOrbs orbCount={2} />
      <GridBackground size={60} opacity={0.05} />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          React Bits Component Test
        </h1>

        {/* Text Animations */}
        <section className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Text Animations</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">AnimatedText:</p>
              <AnimatedText text="Hello World! This is animated text." className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">BlurFadeText:</p>
              <BlurFadeText text="This text fades in from blur" className="text-xl" delay={0.2} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">GradientTypingText:</p>
              <GradientTypingText text="Typing animation with gradient" className="text-xl" />
            </div>
          </div>
        </section>

        {/* Button Animations */}
        <section className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Button Animations</h2>
          <div className="flex flex-wrap gap-4">
            <MagneticButton 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg"
              onClick={() => console.log('Magnetic clicked')}
            >
              Magnetic Button
            </MagneticButton>
            
            <ShimmerButton 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg"
              onClick={() => console.log('Shimmer clicked')}
            >
              Shimmer Button
            </ShimmerButton>
            
            <RippleButton 
              className="bg-gradient-to-r from-pink-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg"
              onClick={() => console.log('Ripple clicked')}
            >
              Ripple Button
            </RippleButton>
          </div>
        </section>

        {/* Loading Animations */}
        <section className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loading Animations</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Bouncing Dots:</span>
              <BouncingDots color="indigo" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Gradient Spinner:</span>
              <GradientSpinner size="md" />
            </div>
            <div>
              <span className="text-sm text-gray-600 block mb-2">Gradient Progress (75%):</span>
              <GradientProgress progress={75} />
            </div>
          </div>
        </section>

        {/* Background Particles Test */}
        <section className="bg-white rounded-xl p-6 shadow-lg relative overflow-hidden">
          <ParticlesBackground particleCount={15} />
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 relative z-10">
            Particles Background
          </h2>
          <p className="text-gray-600 relative z-10">
            You should see floating particles in the background of this section.
          </p>
        </section>

        <div className="text-center text-sm text-gray-500 mt-8">
          All components loaded successfully! ✨
        </div>
      </div>
    </div>
  );
};

export default ReactBitsTest;
