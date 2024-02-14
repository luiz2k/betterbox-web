import NavLink from "../NavLink/NavLink";
import { Home, Flame, Popcorn } from "lucide-react";

const NavBar = () => {
  return (
    <nav>
      <ul className=" flex flex-col gap-5 uppercase md:flex-row">
        <li>
          <NavLink href="/" leftIcon={<Home />}>
            Início
          </NavLink>
        </li>
        <li>
          <NavLink href="/filmes/emalta" leftIcon={<Flame />}>
            Em Alta
          </NavLink>
        </li>
        <li>
          <NavLink href="/filmes/topfilmes" leftIcon={<Popcorn />}>
            Top filmes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
