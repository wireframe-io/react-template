import {
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type Props = {
  text: any
}

const ErrorState: React.FunctionComponent<Props> = ({ text }) => (
  <div className="pt-40 text-center">
    <div className={`mx-auto p-4 max-w-2xl`}>
      <FontAwesomeIcon className="h-12 w-12 text-red-400" icon={faTriangleExclamation} />
      <span className="mt-2 block text-sm font-medium text-gray-900">{text}</span>
    </div>
  </div >
)

export default ErrorState