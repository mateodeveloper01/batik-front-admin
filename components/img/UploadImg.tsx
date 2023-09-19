import { Button } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { env } from "~/env.mjs";

const UploadImg = () => {
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    if (acceptedFiles[0]) {
      formData.append("img", acceptedFiles[0]);
      axios
        .post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/img`, formData, {
          withCredentials: true,
        })
        .then(() => queryClient.invalidateQueries())
        .catch(console.error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant={isDragActive ? "solid" : "outline"} colorScheme="teal">
        {isDragActive
          ? "Suelta la imagen aquí"
          : "Haz clic o arrastra una imagen aquí"}
      </Button>
    </div>
  );
};

export default UploadImg;
