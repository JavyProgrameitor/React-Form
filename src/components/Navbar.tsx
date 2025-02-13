import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function Nav() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://javyprogrameitor.github.io/Portfolio/">
        {/* Logo de GitHub inline */}
        <svg
          className="mr-3 h-6 sm:h-9"
          role="img"
          viewBox="0 0 24 24"
          aria-label="GitHub Logo"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>GitHub</title>
          <path d="M12 .296a12 12 0 0 0-3.797 23.39c.6.111.82-.261.82-.58 
            0-.287-.01-1.051-.015-2.064-3.338.73-4.05-1.61-4.05-1.61
            -.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.73.084-.73
            1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.495.998
            .108-.776.419-1.305.762-1.605-2.666-.303-5.467-1.335-5.467-5.933
            0-1.311.469-2.382 1.235-3.221-.123-.303-.535-1.524.117-3.176 
            0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.403 
            11.52 11.52 0 0 1 3.003.403c2.293-1.552 3.301-1.23 
            3.301-1.23 .652 1.652.24 2.873.117 3.176 
            .767.839 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.48 5.922
            .43.37.81 1.102.81 2.222 0 1.606-.015 2.903-.015 3.296 0 .321.217.697.825.58
            A12 12 0 0 0 12 .296"/>
        </svg><p className="font-black"> JavyProgrameitor@gmail.com return Portfolio</p>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
