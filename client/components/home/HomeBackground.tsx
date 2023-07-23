import React, { useEffect, useState, useCallback } from 'react';
import type { Container, Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const HomeBackground = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  // Getting window size as width of window increaased or decreased
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // await console.log(container);
    },
    []
  );

  return (
    <div id="div-particle">
      {' '}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fullScreen: false,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'none',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ['#f1f1f1', '#52b395'],
            },
            number: {
              value: windowWidth <= 930 ? 175 : 75,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            size: {
              value: 3, // Initial particle size
              random: true,
              anim: {
                enable: true,
                speed: 4,
                size_min: 0,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: windowWidth <= 930 ? 2 : 1,
              direction: 'none', // Particles move in random directions
              random: true,
              straight: false,
              outMode: 'out', // Particles disappear when they go out of the screen
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            // Other particle options...
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default HomeBackground;
