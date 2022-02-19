import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImUpload } from "react-icons/im";

import FileCard from "./FileCard";

import styled from "styled-components";

const DropzoneWrapper = styled.div`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.graphite};
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  margin-bottom: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    border-color: ${({ theme }) => theme.paleEmerald};
  }
`;

const FilesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const Dropzone = ({
  files,
  setFiles,
  setTemplateFile,
  removeFile,
  templateFile,
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".json",
  });

  return (
    <>
      <DropzoneWrapper {...getRootProps()}>
        <ImUpload fontSize={32} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </DropzoneWrapper>
      <FilesContainer>
        {files.length > 0 &&
          files.map((file) => (
            <FileCard
              key={file.name}
              file={file}
              onClick={setTemplateFile}
              removeFile={removeFile}
              chosen={file.name === templateFile?.name}
            />
          ))}
      </FilesContainer>
    </>
  );
};

export default Dropzone;
