import React from "react"


type Props = {
  title: string
  description?: string
  keyName: string
  onChange: any
  value?: string
  options?: { value: string, label: string }[]
}

const RadioInput: React.FunctionComponent<Props> = ({
  title,
  description,
  keyName,
  onChange,
  options = [],
  value = "",
}) => {
  return (
    <div className="sm:col-span-6">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {(description) && <p className="mt-1 text-sm text-gray-500">{description}</p>}

      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <div className="flex items-center" key={option.value}>
            <input
              name={keyName}
              //id={keyName}
              value={option.value}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={onChange}
              defaultChecked={value === option.value}
            />
            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
              {option.label}
            </label>
          </div>
        ))}

      </div>
    </div>
  )
}

export default RadioInput