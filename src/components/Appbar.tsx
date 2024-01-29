import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { SigninButton } from '.';
import Link from 'next/link';

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem isActive>
          <Link
            color='foreground'
            className='hover:text-sky-500 transition-colors'
            href='/'
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
