import React from 'react'


type Props = {
  children: React.ReactNode
  className?: string
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Caption: React.FunctionComponent<Props> = ({
  children,
  className = "",
}) => (
  <div className={
    classNames(
      "text-sm leading-5 text-gray-500",
      className,
    )
  }>
    {children}
  </div>
)

export default Caption