import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    initials: '🧠',
    name: 'Dr. Rachel Chen',
    role: 'Clinical Psychologist',
    quote: 'This platform has transformed how we approach mental health care. The therapeutic games and progress tracking provide invaluable insights that enhance our treatment outcomes.'
  },
  {
    initials: '💼',
    name: 'Michael Johnson',
    role: 'Wellness Director',
    quote: 'The personal space feature and mental health toolkit have been game-changers for our organization. Employee wellbeing scores have improved by 40% since implementation.'
  },
  {
    initials: '🎓',
    name: 'Sarah Peterson',
    role: 'University Counselor',
    quote: "Students love the interactive vlogs and progress tree visualization. It's made mental health support more accessible and engaging for our diverse campus community."
  },
  {
    initials: '🧘‍♀️',
    name: 'Emily Rivera',
    role: 'Mindfulness Coach',
    quote: 'I love how peaceful and intuitive the platform feels. It encourages mindfulness and progress without overwhelming users.'
  },
  {
    initials: '📈',
    name: 'Raj Patel',
    role: 'Data Scientist',
    quote: 'Their analytics dashboard is not just data — it tells a story. That story helps mental health practitioners act smarter.'
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef(null);
  const slideRef = useRef([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      style={{ padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8f8f8' }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 1100, display: 'flex', alignItems: 'center' }}>
        <button
          onClick={prevSlide}
          style={{
            backgroundColor: '#f1f1f1',
            border: '1px solid #ccc',
            width: 40,
            height: 40,
            borderRadius: '50%',
            fontSize: '1.2rem',
            color: '#333',
            cursor: 'pointer',
            position: 'absolute',
            left: -50,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >‹</button>

        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.8s ease-in-out',
              transform: `translateX(-${currentIndex * (100 / 3)}%)`
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                ref={(el) => slideRef.current[idx] = el}
                onMouseEnter={() => setCurrentIndex(idx)}
                style={{
                  flex: '0 0 33.33%',
                  boxSizing: 'border-box',
                  padding: 32,
                  margin: '0 12px',
                  background: 'white',
                  borderRadius: 24,
                  border: '1px solid #ddd',
                  boxShadow: currentIndex === idx ? '0 12px 32px rgba(0,0,0,0.1)' : '0 6px 16px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 480,
                  transform: currentIndex === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  zIndex: currentIndex === idx ? 2 : 1,
                  filter: currentIndex === idx ? 'brightness(1.03)' : 'none',
                }}
              >
                <div style={{ width: 64, height: 64, background: '#eee', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', marginBottom: 16 }}>{t.initials}</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#777', marginBottom: 16 }}>{t.role}</div>
                <div style={{ fontStyle: 'italic', color: '#444', textAlign: 'center', flexGrow: 1, marginTop: 16 }}>{t.quote}</div>
                <div style={{ marginTop: 16 }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f5c518', fontSize: '1.2rem' }}>⭐</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          style={{
            backgroundColor: '#f1f1f1',
            border: '1px solid #ccc',
            width: 40,
            height: 40,
            borderRadius: '50%',
            fontSize: '1.2rem',
            color: '#333',
            cursor: 'pointer',
            position: 'absolute',
            right: -50,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >›</button>
      </div>
    </div>
  );
};

export default Carousel;



