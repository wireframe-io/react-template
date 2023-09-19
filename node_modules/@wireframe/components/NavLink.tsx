import Link from 'next/link'
import React from 'react'


type Props = {
  href?: string
  children: any
  mobile?: boolean
  onClick?: any
  as?: any
}

const NavLink: React.FunctionComponent<Props> = ({
  href,
  children,
  mobile,
  onClick,
  as,
}) => {
  let classNames = "inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  if (mobile) {
    classNames = "block w-full p-2"
  }

  if (href?.startsWith("http://") || href?.startsWith("https://")) {
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classNames}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      className={classNames}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NavLink