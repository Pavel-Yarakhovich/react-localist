import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Dropzone from "../components/DropZone";
import DataTable from "../components/DataTable";
import Steps from "../components/Steps";
import UserBlock from "../components/UserBlock";
import ThemeToggle from "../components/ThemeToggle";

import { prepareInitialDataFromJson, combineTranslations } from "../utils";

import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 60px 0 0;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: border-box;
  background: ${({ theme }) => theme.steel};
  color: ${({ theme }) => theme.white};
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0.5rem;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  overflow: auto;
  padding-top: 10px;
`;

const Title = styled.div`
  position: fixed;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.coal};
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.coal};

  h1 {
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    color: ${({ theme }) => theme.neon};
  }
`;

const DropzoneWrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-flow: column;
  padding: 1rem 0;
`;

const steps = {
  upload: "upload",
  chooseTemplate: "chooseTemplate",
  edit: "edit",
  saveDownload: "saveDownload",
};

const stepsArr = [
  { key: steps.upload, title: "Upload" },
  { key: steps.chooseTemplate, title: "Choose Template" },
  { key: steps.edit, title: "Edit" },
  { key: steps.saveDownload, title: "Save & Download" },
];

const MainPage = ({ toggleTheme, currTheme }) => {
  // Data states
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [data, setData] = useState({});
  const [chosenFiles, setChosenFiles] = useState([]);
  const [templateFile, setTemplateFile] = useState(null);

  // Ui states
  const [currStep, setCurrStep] = useState(steps.upload);
  const [content, setContent] = useState();

  const removeFile = (fileName) => {};

  const unpackUploadedFiles = useCallback(() => {
    uploadedFiles.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        setChosenFiles((prev) => [
          ...prev,
          {
            accessor: file.name.replace(".json", ""),
            ...JSON.parse(e.target.result),
          },
        ]);
      };
    });
    setCurrStep(steps.edit);
  }, [uploadedFiles]);

  useEffect(() => {
    if (templateFile && chosenFiles?.length === 0) {
      unpackUploadedFiles();
    }
  }, [templateFile, unpackUploadedFiles, chosenFiles]);

  useEffect(() => {
    if (uploadedFiles?.length !== chosenFiles?.length) return;
    if (!templateFile) {
      setData(null);
    } else {
      const data = combineTranslations(
        prepareInitialDataFromJson(chosenFiles),
        templateFile
      );
      setData(data);
    }
  }, [chosenFiles, uploadedFiles, templateFile]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => console.log("res ", res))
      .catch((err) => console.log("err ", err));
  }, []);

  useEffect(() => {
    let content;

    switch (currStep) {
      default:
      case steps.upload:
        content = (
          <DropzoneWrapper>
            <Dropzone
              files={uploadedFiles}
              setFiles={(files) => {
                setUploadedFiles(files);
                setCurrStep(steps.chooseTemplate);
              }}
              templateFile={templateFile}
              setTemplateFile={setTemplateFile}
              removeFile={removeFile}
            />
          </DropzoneWrapper>
        );
        break;
      case steps.edit:
        content = data ? (
          <DataTable data={data} templateFile={templateFile} />
        ) : null;
        break;
    }

    setContent(content);
  }, [currStep, data, unpackUploadedFiles, uploadedFiles, templateFile]);

  return (
    <Wrapper>
      <Title>
        <ThemeToggle onToggle={toggleTheme} currTheme={currTheme} />
        <h1>React-localist</h1>
        <UserBlock />
      </Title>
      <Content>
        <Steps steps={stepsArr} currStep={currStep} setCurrStep={setCurrStep} />
        {content}
      </Content>
    </Wrapper>
  );
};

export default MainPage;
