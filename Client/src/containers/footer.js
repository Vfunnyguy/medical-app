import React from 'react';

const Footer = () => {
  const [isBottom, setIsBottom] = React.useState(false);
  React.useEffect(() => {
    function handleScroll() {
      setIsBottom(window.scrollY >= 200);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>
          This website is developed 
          </strong>{' '}
          by <a href="https://github.com/Vfunnyguy">Nguyễn Hoàng Việt </a>. The source code is
          licensed
           <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content is
          licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>

      {isBottom && (
        <div
          className="gotop-btn"
          onClick={() => (document.documentElement.scrollTop = 0)}
          style={{ position: 'fixed', right: 20, bottom: 20 }}
        >
          <i className="fas fa-arrow-circle-up w100 fs-30"></i>
        </div>
      )}
    </footer>
  );
};

export default Footer;
