import { MdDarkMode, MdLightMode } from "react-icons/md";

import styled from "styled-components";

const Wrapper = styled.div`
  cursor: pointer;
  margin-left: 1rem;
`;

const ThemeToggle = ({ onToggle, currTheme }) => (
  <Wrapper onClick={onToggle}>
    {currTheme === "light" ? <MdLightMode /> : <MdDarkMode />}
  </Wrapper>
);

export default ThemeToggle;
