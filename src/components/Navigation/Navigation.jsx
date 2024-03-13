import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const makeLinkStyle = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.isActive);
};

export default function Navigation() {
  return (
    <nav className={styles.navLinks}>
      <NavLink to="/" className={makeLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/movies" className={makeLinkStyle}>
        Movies
      </NavLink>
    </nav>
  );
}
