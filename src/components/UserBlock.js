import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "../shared/Button";

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
`;

const UserName = styled.div`
  width: 80px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.white};
`;

const UserBlock = () => {
  const { user, loginWithRedirect, logout } = useAuth0();
  console.log("USER ", user);
  return (
    <Wrapper>
      {user ? (
        <Fragment>
          <UserAvatar src={user.picture} alt={`${user.name} avatar`} />
          <UserName>{user.name}</UserName>
          <Button onClick={() => logout()}>logout</Button>
        </Fragment>
      ) : (
        <Fragment>
          {/* <ImagePlaceholder /> */}
          <Button onClick={() => loginWithRedirect()}>login</Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default UserBlock;
