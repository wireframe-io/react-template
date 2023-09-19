import React from 'react'


type Props = {
  children: React.ReactNode
}

const H1: React.FunctionComponent<Props> = ({
  children
}) => (
  <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
    {children}
  </h1>
)

export default H1