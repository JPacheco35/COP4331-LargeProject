import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/main">Main</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
};

export default Layout;