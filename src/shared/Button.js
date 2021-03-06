import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px;
  background: ${({ theme }) =>
    `linear-gradient(64deg, ${theme.neon}, ${theme.steel})`};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  min-width: 100px;
  cursor: pointer;
  transition: all 250ms ease;
  &:hover {
    color: ${({ theme }) => theme.neon};
  }
  ${({ styles }) => styles}
`;

const Button = ({ onClick, children, styles }) => (
  <StyledButton onClick={onClick} styles={styles}>
    {children}
  </StyledButton>
);

export default Button;
