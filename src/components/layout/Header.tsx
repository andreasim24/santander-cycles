import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-red-900 py-2 text-white backdrop-blur-lg'>
      <div className='flex h-14 items-center justify-between p-6 text-center md:px-20 xl:px-32'>
        <UnstyledLink
          href='/'
          className='text-2xl font-bold hover:text-red-100'
        >
          Santander
        </UnstyledLink>
      </div>
    </header>
  );
}
