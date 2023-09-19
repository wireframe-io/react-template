import React from 'react'


type Props = {
  children: React.ReactNode
}

const Heading: React.FunctionComponent<Props> = ({
  children
}) => (
  <h3 className="mt-3 mb-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
    {children}
  </h3>
)

export default Heading