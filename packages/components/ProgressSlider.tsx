import React from 'react'


type Props = {
  color: string
  width: number
  progress: number
}

const ProgressSlider: React.FunctionComponent<Props> = ({
  color,
  width,
  progress,
}) => {
  const marginLeft = progress / 100 * width

  let dotColor = "#666666"
  if (color === "green") {
    dotColor = "#32d296"
  } else if (color === "red") {
    dotColor = "#f0506e"
  }

  return (
    <div
      className="uk-margin-small-left uk-margin-small-right"
      data-uk-tooltip={`${progress}%`}
      style={{
        display: "inline-block",
        height: 11,
        width,
      }}
    >
      <div
        style={{
          background: "#CCCCCC",
          height: 2,
          position: "relative",
          top: 5,
        }}
      >
        <div
          style={{
            background: dotColor,
            borderRadius: "50%",
            float: "left",
            height: 10,
            marginLeft,
            position: "relative",
            top: -4,
            width: 10,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressSlider