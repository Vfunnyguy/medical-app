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
    <footer class="footer">
      <div class="content has-text-centered">
        <span>
          <a href="https://bulma.io">
            <img
              src="https://bulma.io/images/made-with-bulma.png"
              alt="Made with Bulma"
              width="128"
              height="24"
            />
          </a>
        </span>
          by <a href="https://github.com/Vfunnyguy">Nguyễn Hoàng Việt </a>
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
