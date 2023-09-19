import clsx from 'clsx'
import React from 'react'


type Props = {
  className?: string
  children: any
}

const Container: React.FunctionComponent<Props> = ({
  className,
  children
}) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ', className)}
    >
      {children}
    </div>
  )
}

export default Container
