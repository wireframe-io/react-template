import React from 'react'


type Props = {
  children: React.ReactNode
}

const Superscript: React.FunctionComponent<Props> = ({
  children
}) => (
  <sup className="pr-1 font-bold text-gray-900 sups">
    {children}
  </sup>
)

export default Superscript