import { CgFile } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
  transition: all 200ms ease;
  cursor: pointer;
  background-color: ${({ theme, chosen }) =>
    chosen ? theme.paleEmerald : "transparent"};
  transform: scale(${({ chosen }) => (chosen ? "1.1" : "1")});
  &:hover {
    background-color: ${({ theme }) => theme.graphite};
  }
`;

const Name = styled.div`
  font-weight: 600;
  margin-left: 5px;
`;

const DeleteIcon = styled(TiDelete)`
  margin-left: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  transition: all 200ms ease;
  &:hover {
    color: ${({ theme }) => theme.error};
  }
`;

const FileCard = ({ file, removeFile, onClick, chosen }) => (
  <Wrapper onClick={() => onClick(file)} chosen={chosen}>
    <CgFile fontSize="2rem" />
    <Name>{file?.name}</Name>
    <DeleteIcon
      onClick={(e) => {
        e.stopPropagation();
        removeFile(file?.name);
      }}
    />
  </Wrapper>
);

export default FileCard;
