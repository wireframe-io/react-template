import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

import Loader from '../Loader'
import SelectMenu from '../tailwind/SelectMenu'


const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', href: '/logout' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  apps?: any
  hideSidebar?: boolean
  children?: any
  isLoading?: boolean
  useQueryProfile: any
  navigation: any
  logo?: string
}

const SidebarLayout: React.FunctionComponent<Props> = ({
  apps = [],
  hideSidebar = false,
  children,
  isLoading = false,
  useQueryProfile,
  navigation,
  logo = "/logo-light.png",
}) => {
  const router = useRouter()
  const { uuid } = router.query

  const [firstPath, setFirstPath] = useState("")
  const [secondPath, setSecondPath] = useState("")
  const [thirdPath, setThirdPath] = useState("")
  const [pathname, setPathname] = useState("")

  const { data: identity, isLoading: isLoadingProfile } = useQueryProfile()

  useEffect(() => {
    let pathname = "";
    if (typeof window !== "undefined") {
      pathname = window.location.pathname;
    }
    const firstPath = `/${pathname.split('/')[1]}`
    const secondPath = pathname.split('/')[2] ? `/${pathname.split('/')[2]}` : ""
    const thirdPath = pathname.split('/')[3] ? `/${pathname.split('/')[3]}` : ""
    setPathname(pathname)
    setFirstPath(firstPath)
    setSecondPath(secondPath)
    setThirdPath(thirdPath)
  }, [])

  const items = apps.map((app: any) => {
    return {
      text: app.name,
      secondaryText: app.key,
      id: app.uuid,
    }
  })

  const onSelectMenuChange = (value: any) => {
    router.push(`/apps/${value.id}`)
  }

  if (isLoadingProfile) {
    return <></>
  }

  return (
    <>
      <div className="min-h-full bg-gray-100">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/platform/apps">
                        <Image
                          className="h-8 w-auto"
                          src={logo}
                          alt="Logo"
                          width="178"
                          height="32"
                          priority
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item: any) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === firstPath
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={(item.href === firstPath) ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              {...(identity.image_url ? { src: identity.image_url } : { src: "/profile.png" })}
                              alt=""
                              width="32"
                              height="32"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item: any) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === firstPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.href === firstPath ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        {...(identity.image_url ? { src: identity.image_url } : { src: "/profile.png" })}
                        alt=""
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{identity.first_name} {identity.last_name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{identity.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>


        <div className="flex h-full min-h-[calc(100vh-64px)]">

          {(!hideSidebar) ? (
            <div className="flex-none w-64 bg-gray-800">
              <div className="mt-5 flex flex-1 flex-col">
                <nav className="flex-1 space-y-1 px-2 pb-4">

                  {(apps.length > 0) && (
                    <div className="mb-4">
                      <SelectMenu
                        items={items}
                        keyName="temp"
                        onChange={onSelectMenuChange}
                        defaultId={uuid}
                      />
                    </div>
                  )}

                  {navigation.map((item: any) => {
                    if (item.href === firstPath) {
                      return item.sub.map((sub: any) => {
                        let isActive = firstPath + sub.href === firstPath + secondPath
                        let url = firstPath + sub.href

                        if (item.hasDropdown) {
                          url = firstPath + "/" + uuid + sub.href
                          isActive = firstPath + sub.href === firstPath + thirdPath
                        }

                        return (
                          <Link
                            key={sub.name}
                            href={url}
                            className={classNames(
                              isActive ? 'bg-gray-900 text-white' : 'text-gray-100 hover:bg-gray-600',
                              'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                            )}
                          >
                            <sub.icon className="mr-3 h-4 w-4 flex-shrink-0 text-gray-300" aria-hidden="true" />
                            {sub.name}
                          </Link>
                        )
                      })
                    }
                    return
                  })}

                </nav>
              </div>
            </div>
          ) : (
            <></>
          )}

          <main className="flex-auto">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-12 pb-12 pt-6">
              {(isLoading) ? (
                <Loader />
              ) : (
                children
              )}
            </div>
          </main>

        </div>
      </div>
    </>
  )
}

export default SidebarLayout