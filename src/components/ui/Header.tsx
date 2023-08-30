import styled from "styled-components";

const ORGNAME = "facebook";
const REPONAME = "react";

const Header = () => {
  return (
    <StyledHeader>
      {ORGNAME} / {REPONAME}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid #393939;
`;

export default Header;
