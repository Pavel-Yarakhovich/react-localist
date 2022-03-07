import { MdDarkMode, MdLightMode } from "react-icons/md";

import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  color: ${({ theme }) => theme.neon};
`;

const ThemeToggle = ({ onToggle, currTheme }) => (
  <Wrapper onClick={onToggle}>
    {currTheme === "light" ? (
      <MdLightMode fontSize={"1.25rem"} />
    ) : (
      <MdDarkMode fontSize={"1.25rem"} />
    )}
  </Wrapper>
);

export default ThemeToggle;
