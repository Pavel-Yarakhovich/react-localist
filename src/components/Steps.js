import {
  AiFillEdit,
  AiOutlineDownload,
  AiOutlineUpload,
  AiOutlineCheck,
} from "react-icons/ai";

import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-bottom: 1.5rem;
`;

const StepsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Highlighter = styled.div`
  position: absolute;
  top: calc(100% - 9px);
  left: ${({ left }) => `${left}%`};
  width: ${({ left }) => `${100 - left}%`};
  height: 2px;
  background-color: ${({ theme }) => theme.neon};
  transition: all 200ms ease;
`;

const StepItem = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: ${({ width }) => `${width}% 0 0`};
  display: flex;
  align-items: center;
  min-height: 50px;
  font-size: ${({ active }) => (active ? "1.1rem" : "1rem")};
  color: ${({ theme, active }) => (active ? theme.neon : theme.white)};
  cursor: pointer;
  transition: all 200ms ease;
  &:hover {
    color: ${({ theme }) => theme.paleEmerald};
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ theme, active }) =>
    active ? `3px solid ${theme.neon}` : "none"};
  margin-right: 0.5rem;
  transition: border 200ms ease;
`;

const Instruction = styled.div`
  position: relative;
  top: -7px;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.paleEmerald};
  color: ${({ theme }) => theme.steel};
  border: 3px solid ${({ theme }) => theme.neon};
  border-top-color: transparent;
  border-left-color: transparent;
`;

const instructions = {
  upload: "Upload localization files in .json format",
  chooseTemplate: "Choose a base language",
  edit: "Make changes where needed",
  saveDownload: "Save your changes and download the changed localization files",
};

const icons = {
  upload: <AiOutlineUpload />,
  chooseTemplate: <AiOutlineCheck />,
  edit: <AiFillEdit />,
  saveDownload: <AiOutlineDownload />,
};

const Steps = ({ steps, currStep, setCurrStep }) => {
  const stepWidth = 100 / steps?.length;
  const activeStepIndex = steps.findIndex((s) => s.key === currStep);
  return (
    <Wrapper>
      <StepsContainer>
        {steps.map((step, i) => (
          <StepItem
            key={step.key}
            width={stepWidth}
            active={currStep === step.key}
            onClick={() => setCurrStep(step.key)}
          >
            <StepNumber active={currStep === step.key}>
              {icons[step.key]}
            </StepNumber>
            {step.title}
          </StepItem>
        ))}
        <Highlighter width={stepWidth} left={activeStepIndex * stepWidth} />
      </StepsContainer>
      <Instruction>{instructions[currStep]}</Instruction>
    </Wrapper>
  );
};

export default Steps;
