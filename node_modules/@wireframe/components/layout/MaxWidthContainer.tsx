import React from 'react'


type Props = {
  children: React.ReactNode
}

const MaxWidthContainer: React.FunctionComponent<Props> = ({
  children
}) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-base leading-7	text-gray-600">
      {children}
    </div>
  </div>
)

export default MaxWidthContainer