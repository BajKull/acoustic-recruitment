import acousticLogo from "@/assets/icons/logo.svg";
import ROUTES, { NAVBAR_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow h-10 w-full">
      <div className="max-w-7xl mx-auto h-full px-5">
        <ul className="flex items-center h-full">
          <li className="mr-auto w-20">
            <Link to={ROUTES.INDEX.PATH}>
              <img src={acousticLogo} alt="Acoustic logo" />
            </Link>
          </li>
          {NAVBAR_ROUTES.map((route) => (
            <li
              key={`${route.PATH}-${route.NAME}`}
              className="px-5 font-semibold"
            >
              <Link to={route.PATH}>{route.NAME}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
