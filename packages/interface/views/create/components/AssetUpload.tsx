import { FileUpload } from "app/components/Form";
import { ChangeEvent, useRef, useState } from "react";
import { useMintStore } from "app/store";

export const AssetUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const setRawFile = useMintStore((state) => state.setRawFile);
  const setPreviewURL = useMintStore((state) => state.setPreviewURL);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;
    const objectURL = URL.createObjectURL(files[0]);
    setPreview(objectURL);
    setPreviewURL(objectURL);
    setRawFile(files[0]);
  };

  const resetFile = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreview(null);
    setRawFile(null);
  };

  return (
    <FileUpload
      label="Upload File"
      fileTypes="JPG, PNG, GIF, SVG, MP3, MP4, WEBM, WAV, OGG. Max: 100 MB"
      preview={preview}
      resetFile={resetFile}
      ref={fileInputRef}
      onChange={handleImageChange}
      width="100%"
      height="320px"
    />
  );
};
