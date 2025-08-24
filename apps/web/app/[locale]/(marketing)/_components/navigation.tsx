'use client';

import { useState } from 'react';

import { MailIcon, MenuIcon, PhoneIcon, XIcon } from 'lucide-react';

import { Dialog, DialogContent } from '@kit/ui/dialog';
import { Link } from '@kit/ui/link';

const navigation = [
  { name: 'Bienvenue', href: '/' },
  { name: 'Notre savoir-faire', href: '/savoir-faire' },
  { name: 'Échappements sur mesure', href: 'echappements-serie' },
  { name: 'Échappements serie', href: 'echappements-sur-mesure' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className="text-sm/6 font-semibold text-gray-900 dark:text-white"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen}>
          <DialogContent>
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto dark:hidden"
                />
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto not-dark:hidden"
                />
              </a>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
    </>
  );
}
