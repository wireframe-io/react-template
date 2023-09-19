import Image from "next/image"
import React from "react"
import { Uploader } from "uploader"


type Props = {
  title: string
  description?: string
  onChange: any
  value?: string
  width?: number
  crop?: string
}

const ImageInput: React.FunctionComponent<Props> = ({
  title,
  description,
  onChange,
  value = "",
  width = 6,
  crop = "rect"
}) => {
  const uploader = Uploader({ apiKey: "public_W142hefEko4SJEdCBGK7wfxB4hyw" });

  const uploadImage = () => {
    let editor = {}
    if (crop === "circ") {
      editor = {
        images: {
          cropShape: "circ",
          cropRatio: 1 / 1,
        }
      }
    }
    uploader
      .open({
        maxFileCount: 1,
        mimeTypes: ["image/jpeg", "image/png", "image/webp"],
        editor: editor,
      })
      .then((files) => {
        if (files.length > 0) {
          const fileUrl = files[0].fileUrl
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
        <div className="h-40 w-96">
          <Image
            src={value}
            alt=""
            width="0"
            height="0"
            className="h-full w-full max-w-max"
            sizes="100vw"
          />
        </div>
      )}
      <div className="mt-2 flex rounded-md align-text-bottom">
        <button
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default ImageInput