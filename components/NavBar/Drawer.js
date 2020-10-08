import Link from "next/link";
function Drawer({ nav, closeNav }) {
  const classes = nav ? "drawer nav-active" : "drawer";
  return (
    <nav className={classes}>
      <ul className="navList">
        <li onClick={closeNav}>
          <Link href="/">
            <a className="navItem">Home</a>
          </Link>
        </li>

        <li onClick={closeNav}>
          <a
            href="https://www.facebook.com/dagalaxy"
            target="_blank"
            rel="noopener noreferrer"
            className="navItem"
          >
            Follow On Facebook
          </a>
        </li>
        <li onClick={closeNav}>
          <Link href="/contact">
            <a className="navItem">Contact Us</a>
          </Link>
        </li>
        <li onClick={closeNav}>
          <Link href="/privacy-policy">
            <a className="navItem">Privacy Policy</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Drawer;
