'use client';


import { MailIcon, PhoneIcon } from 'lucide-react';

import { Link } from '@kit/ui/link';

const navigation = [
  { name: 'Bienvenue', href: '/' },
  { name: 'Notre savoir-faire', href: '/savoir-faire' },
  { name: 'Échappements sur mesure', href: 'echappements-sur-mesure' },
  { name: 'Échappements serie', href: 'echappements-serie' },
];

export default function Navigation() {

  return (
    <>
      {/*logo*/}
      <div className="bg-mti-orange">
        <div className="container mx-auto flex items-center justify-between p-2 text-white lg:px-8">
          <a href="#" className="-m-1.5 p-1.5 font-bold text-white">
            <span className="">MTI ECHAPPEMENT INOX</span>
          </a>
          <div className={'flex justify-end space-x-4'}>
            <a className={'flex items-center gap-1'}>
              <MailIcon className={'h-4 w-4'}></MailIcon>
              mtimichel@wanadoo.fr
            </a>
            <a className={'flex items-center gap-1'}>
              <PhoneIcon className={'h-4 w-4'}></PhoneIcon> 06 71 08 52 71
            </a>
          </div>
        </div>
      </div>
      {/*nav*/}
      <header className="bg-background">
        <nav
          aria-label="Global"
          className="container mx-auto flex items-center justify-between p-6 text-white lg:px-8"
        >
          <div className="flex lg:hidden"></div>
          <div className="relative hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                variant={'link'}
                className=" font-semibold border-mti-orange"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
