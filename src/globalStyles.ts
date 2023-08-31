import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-family: "Pretendard Variable",'Noto Sans KR', sans-serif;
    }
    #root{
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        background-color: #fff;
    }
    `;

export const a11yHidden = css`
  overflow: hidden;
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
`;

export default GlobalStyles;
