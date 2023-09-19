import React from 'react'


type Props = {
  color: string
  style?: any
}

const Dot: React.FunctionComponent<Props> = ({
  color,
  style,
  ...props
}) => {
  let backgroundColor = '#666666'
  if (color === 'green') {
    backgroundColor = '#32d296'
  } else if (color === 'red') {
    backgroundColor = '#f0506e'
  }

  return (
    <span
      {...props}
      style={{
        ...style,
        background: backgroundColor,
        borderRadius: '50%',
        height: 10,
        width: 10,
        display: "inline-block",
      }}
    />
  )
}

export default Dot