import Header from "./header";
import Footer from "./footer";

const Layout = (props) => {
  return (
    <div className="main">
      <div className="container">
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
