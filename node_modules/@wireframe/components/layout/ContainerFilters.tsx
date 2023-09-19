import React from 'react'


type Props = {
  children: React.ReactNode
}

const ContainerFilters: React.FunctionComponent<Props> = ({
  children
}) => (
  <div className="mx-auto max-w-3xl text-right">
    {children}
  </div>
)

export default ContainerFilters