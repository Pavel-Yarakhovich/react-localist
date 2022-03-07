import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "../shared/Button";
import { BiLogIn, BiLogOut } from "react-icons/bi";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.neon};
`;

const UserName = styled.div`
  width: 80px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.white};
`;

const skeletonButton = `
    min-width: 10px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 1px 1px 4px rgb(0 0 0 / 10%);
`;

const UserBlock = () => {
  const { user, loginWithRedirect, logout } = useAuth0();

  return (
    <Wrapper>
      {user ? (
        <>
          <UserAvatar src={user.picture} alt={`${user.name} avatar`} />
          <UserName>{user.name}</UserName>
          <Button onClick={() => logout()} styles={skeletonButton}>
            <BiLogOut fontSize={"1.25rem"} />
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => loginWithRedirect()} styles={skeletonButton}>
            <BiLogIn fontSize={"1.25rem"} />
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default UserBlock;
