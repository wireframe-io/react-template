import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'

import Container from './Container'
import HeaderItem from './HeaderItem'
import Logo from './Logo'
import NavLink from './NavLink'


function MobileNavLink({ onClick, href, className, children }: any) {
  return (
    <Popover.Button className={className}>
      <NavLink href={href} onClick={onClick} mobile>
        {children}
      </NavLink>
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: any) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.replace(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/logout`);
}

function MobileNavigation({ isSignedIn, items }: any) {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white py-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            {(items.map((item: any) => {
              return (
                <MobileNavLink
                  href={item.url}
                  key={item.title}
                >
                  {item.title}
                </MobileNavLink>
              )
            }))}
            {(isSignedIn) ? (
              <MobileNavLink onClick={handleLogout} className="border-t border-gray-200 pt-2 mt-2">Sign out</MobileNavLink>
            ) : (
              <MobileNavLink href="/login" className="border-t border-gray-200 pt-2 mt-2">Sign in</MobileNavLink>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

type Props = {
  app?: string
  isSignedIn?: boolean
  items?: any[]
  pathname?: string
}

const Header: React.FunctionComponent<Props> = ({
  isSignedIn = false,
  items = [],
  pathname,
}) => {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Logo />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {(items.map((item: any) => (
              <HeaderItem
                url={item.url}
                key={item.title}
                title={item.title}
                isActive={(pathname === item.url)}
              />
            )))}
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {(isSignedIn) ? (
                <NavLink onClick={handleLogout}>Logout</NavLink>
              ) : (
                <NavLink href="/login">Sign in</NavLink>
              )}
            </div>
            <div className="-mr-1 md:hidden">
              <MobileNavigation
                isSignedIn={isSignedIn}
                items={items}
              />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header