import React, { useEffect, useState } from 'react';

const SplashScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-90');

  useEffect(() => {
    // Start fade-in animation
    const fadeInTimer = setTimeout(() => {
      setAnimationClass('opacity-100 scale-100');
    }, 100);

    // Hide splash screen after 3 seconds
    const hideSplashTimer = setTimeout(() => {
      setAnimationClass('opacity-0 scale-90'); // Fade out
      setTimeout(() => setLoading(false), 500); // Hide after fade out
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(hideSplashTimer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white transition-all duration-500 ease-in-out transform-gpu">
          <div className={`text-6xl font-extrabold tracking-tight mb-4 transition-all duration-500 ease-in-out ${animationClass}`}>
            HostelFlow
          </div>
          <p className={`text-xl font-light transition-all duration-500 ease-in-out delay-200 ${animationClass}`}>
            Your seamless booking experience
          </p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SplashScreen;