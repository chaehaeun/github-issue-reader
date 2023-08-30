import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ORGNAME = "facebook";
const REPONAME = "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate("/");
  };

  return (
    <StyledHeader>
      {location.pathname !== "/" && (
        <BackButton type="button" aria-label="뒤로가기" onClick={goBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </BackButton>
      )}
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
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  color: #000;
  background-color: transparent;
  border: none;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default Header;
