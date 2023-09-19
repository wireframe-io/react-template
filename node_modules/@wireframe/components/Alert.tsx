import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'


type Props = {
  level: string
  title: string
  description: string
  actionText?: string
  actionUrl?: string
}

const Alert: React.FunctionComponent<Props> = ({
  level,
  title,
  description,
  actionText,
  actionUrl,
}) => {
  // Levels:
  //   - error (red)
  //   - warning (yellow, default)
  //   - info (blue)
  //   - success (green)

  let icon = <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
  let color = "yellow"

  if (level === "error") {
    icon = <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
    color = "red"
  } else if (level === "info") {
    icon = <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
    color = "blue"
  } else if (level === "success") {
    icon = <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
    color = "green"
  }

  return (
    <div className="pt-10">
      <div className={`mx-auto rounded-md bg-${color}-50 p-4 max-w-2xl`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium text-${color}-800`}>{title}</h3>
            <div className={`mt-2 text-sm text-${color}-700`}>
              <p>
                {description}
              </p>
            </div>
            <div className="mt-4">
              {(actionText && actionUrl) && (
                <div className="-mx-2 -my-1.5 flex">
                  <Link
                    href={actionUrl}
                    type="button"
                  >
                    <a className={`rounded-md bg-${color}-50 px-2 py-1.5 text-sm font-medium text-${color}-800 hover:bg-${color}-100 focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2 focus:ring-offset-${color}-50`}>
                      {actionText}
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Alert