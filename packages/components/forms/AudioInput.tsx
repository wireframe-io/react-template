import React from "react"
import { Uploader } from "uploader"


type Props = {
  title: string
  description?: string
  onChange: any
  value?: string
  width?: number
}

const AudioInput: React.FunctionComponent<Props> = ({
  title,
  description,
  onChange,
  value = "",
  width = 6,
}) => {
  const uploader = Uploader({ apiKey: "public_W142hefEko4SJEdCBGK7wfxB4hyw" });

  const uploadAudio = () => {
    uploader
      .open({
        maxFileCount: 1,
        mimeTypes: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"],
      })
      .then((files) => {
        if (files.length > 0) {
          const fileUrl = files[0].originalFile.fileUrl
          onChange(fileUrl)
        }
      },
        error => alert(error)
      );
  }

  return (
    <div className={`sm:col-span-${width}`}>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {(description) && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {(value) && (
        <div>
          {/* audio tag */}
          <audio controls>
            <source src={value} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      <div className="mt-2 flex rounded-md align-text-bottom">
        <button
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={uploadAudio}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default AudioInput