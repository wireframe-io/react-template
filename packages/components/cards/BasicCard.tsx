import React from 'react'


type Props = {
  children: React.ReactNode
  className?: string
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const BasicCard: React.FunctionComponent<Props> = ({
  children,
  className = "",
}) => (
  <div
    className={
      classNames(
        "border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-lg shadow",
        className
      )
    }
  >
    {children}
  </div>
)

export default BasicCard