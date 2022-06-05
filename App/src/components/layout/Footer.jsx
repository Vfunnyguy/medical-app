import React from 'react';

const Footer = () => {
  const [goTop, setGoTop] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      setGoTop(window.scrollY >= 200);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="footer">
      {goTop && (
        <div
          className="gotop-btn"
          onClick={() => (document.documentElement.scrollTop = 0)}
          style={{ position: 'fixed', right: 20, bottom: 20 }}
        >
          <i className="fas fa-arrow-circle-up"></i>
        </div>
      )}
    </div>
  );
};

export default Footer;
