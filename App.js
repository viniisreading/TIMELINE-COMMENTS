import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: '👥', value: 20, label: 'Team Warriors' },
  { icon: '⏰', value: 80, label: 'Hours of Dedication ' },
  { icon: '😊', value: 100, label: 'Happy Users ', isDynamic: true },
];

const timelineData = [
  {
    title: '💡 The Big Idea',
    desc: "It all started with a 'Wait...why doesn't this exist yet?' moment. We saw a gap, got obsessed, and decided to build something actually useful. No fluff, just solving real problems.",
  },
  {
    title: '🔍 The Grind',
    desc: "Months of research, testing, and 'Oh wow, that definitely doesn't work' moments later—we finally cracked it. Shoutout to our early testers who kept it real with their feedback.",
  },
  {
    title: '🚀 The Launch',
    desc: "We went live on [date], and honestly? The response blew us away. Turns out people actually liked what we built (phew). Now we're just getting warmed up.",
  },
  {
    title: "🔮 What's Next?",
    desc: 'More features, more upgrades, and way less boring stuff. Stick around—this is gonna be fun. Let\'s do this.',
  },
];

const DigitScroller = ({ digit }) => {
  return (
    <span className="digit-container">
      <span className="digit-scroll">{digit}</span>
    </span>
  );
};

const StatCard = ({ icon, value, label, isDynamic }) => {
  const [digits, setDigits] = useState(Array.from(String(isDynamic ? 0 : value)));

  useEffect(() => {
    if (!isDynamic) return;

    const storedCount = parseInt(localStorage.getItem('visitorCount') || '0');
    const total = value + storedCount;
    let current = 0;

    const updateDigits = () => {
      const digitsArr = Array.from(String(current)).map(Number);
      setDigits(digitsArr);
    };

    const increment = () => {
      if (current < total) {
        current++;
        updateDigits();
        setTimeout(increment, 150);
      } else {
        updateDigits();
      }
    };

    increment();

    if (!localStorage.getItem('visitorCountIncremented')) {
      localStorage.setItem('visitorCount', (storedCount + 1).toString());
      localStorage.setItem('visitorCountIncremented', 'true');
    }
  }, [isDynamic, value]);

  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">
        {digits.map((digit, i) => (
          <DigitScroller key={i} digit={digit} />
        ))}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const TimelineCard = ({ title, desc }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) setVisible(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <article
      className={`timeline-card${visible ? ' visible' : ''}`}
      tabIndex={0}
      ref={ref}
    >
      <div className="timeline-dot"></div>
      <h3 className="timeline-title">{title}</h3>
      <p className="timeline-desc">{desc}</p>
    </article>
  );
};

const GrowthTimeline = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0; background: linear-gradient(135deg, #d0f0d8 0%, #ffffff 100%);
          color: #2f4f4f;
          padding: 2rem;
          overflow-x: hidden;
          text-align: center;
        }
        h1 {
          font-weight: 900; font-size: 3rem; color: #2ca02c;
          filter: blur(3px);
          opacity: 0;
          animation: blurFadeIn 1.2s forwards;
          margin-bottom: 0.2rem;
        }
        @keyframes blurFadeIn {
          to {
            filter: blur(0);
            opacity: 1;
          }
        }
        p.subheading {
          max-width: 600px;
          margin: 0 auto 3rem;
          font-size: 1.2rem;
          color: #555;
          opacity: 0;
          animation: blurFadeIn 1.2s forwards;
          animation-delay: 0.6s;
        }

        .stats-grid {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          max-width: 900px;
          margin: auto 0 3rem;
        }
        .stat-card {
          background: white;
          border-radius: 2rem;
          box-shadow: 0 8px 25px rgba(44,160,44,0.2);
          text-align: center;
          padding: 2rem 1.5rem;
          cursor: default;
          user-select: none;
          width: 220px;
        }
        .stat-icon {
          font-size: 3.5rem;
          color: #2ca02c;
          margin-bottom: 0.6rem;
        }
        .stat-value {
          font-weight: 900;
          font-size: 2.8rem;
          color: #1b4d1b;
          display: flex;
          justify-content: center;
          gap: 0.05em;
          overflow: hidden;
        }
        .digit-container {
          display: inline-block;
          height: 2.8rem;
          overflow: hidden;
        }
        .digit-scroll {
          display: inline-block;
          animation: scrollDigit 0.3s ease-in-out;
          transform: translateY(0);
        }
        @keyframes scrollDigit {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .stat-label {
          font-weight: 600;
          font-size: 1.1rem;
          margin-top: 0.3rem;
          color: #666;
        }

        .timeline-container {
          position: relative;
          max-width: 700px;
          margin: 4rem auto;
          padding: 0 1rem;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          background: #2ca02c;
          transform: translateX(-50%);
          border-radius: 4px;
        }

        .timeline-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 8px 30px rgba(44,160,44,0.15);
          padding: 1.8rem 2rem;
          margin-bottom: 4rem;
          position: relative;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.4s ease;
        }
        .timeline-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .timeline-card:hover,
        .timeline-card:focus-visible {
          transform: translateY(0) rotateY(10deg) rotateX(5deg) translateZ(10px);
          box-shadow: 0 20px 40px rgba(44,160,44,0.4);
          outline: none;
        }

        .timeline-dot {
          position: absolute;
          top: -2.6rem;
          left: 50%;
          width: 1.6rem;
          height: 1.6rem;
          background: #2ca02c;
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(44,160,44,0.8);
          transform: translateX(-50%) scale(0);
          opacity: 0;
          transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.4s ease;
          transform-origin: center center;
        }
        .timeline-card.visible .timeline-dot {
          transform: translateX(-50%) scale(1);
          opacity: 1;
        }
        .timeline-card:hover .timeline-dot,
        .timeline-card:focus-visible .timeline-dot {
          transform: translateX(-50%) scale(1.4);
          box-shadow: 0 0 30px rgba(44,160,44,1);
        }
      `}</style>

      <div className="timeline-wrapper">
        <h1>Our Glow Up ✨</h1>
        <p className="subheading">.</p>

        <section className="stats-grid" aria-label="Key stats">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </section>

        <section className="timeline-container" aria-label="Company growth timeline">
          {timelineData.map((item, idx) => (
            <TimelineCard key={idx} {...item} />
          ))}
        </section>
      </div>
    </>
  );
};

export default GrowthTimeline;
