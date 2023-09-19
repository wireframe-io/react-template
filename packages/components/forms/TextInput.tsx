import React from "react"


type Props = {
  title: string
  description?: string
  keyName: string
  autoComplete?: boolean
  onChange: any
  value?: string
  width?: number
  password?: boolean
}

const TextInput: React.FunctionComponent<Props> = ({
  title,
  description,
  keyName,
  onChange,
  value = "",
  autoComplete = false,
  width = 6,
  password = false,
}) => {
  let autoCompleteValue = "on"
  if (autoComplete === false) {
    autoCompleteValue = "off"
  }
  return (
    <div className={`sm:col-span-${width}`}>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {(description) && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      <div className="mt-2 flex rounded-md shadow-sm align-text-bottom">
        <input
          type={(password) ? "password" : "text"}
          name={keyName}
          id={keyName}
          autoComplete={autoCompleteValue}
          className="block w-full min-w-0 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={e => onChange(e)}
          value={value}
        />
      </div>
    </div>
  )
}

export default TextInput