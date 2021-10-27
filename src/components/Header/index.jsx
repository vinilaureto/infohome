import styled from "styled-components";
import Link from "next/link";
import HeaderStatus from "../HeaderStatus";
import HeaderCTA from "../HeaderCTA";

const HeaderStyled = styled.header`
  height: 77px;
  padding: 0 0 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2;

  .left-wrapper {
    color: #000;
    font-size: 28px;

    span {
      font-weight: 700;
      color: #f57553;
    }
  }

  .rigth-wrapper {
    display: flex;
    height: 100%;
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <div className="left-wrapper">
        <Link href="/">
          <a>
            <h1 className="logo">
              info<span>Home</span>
            </h1>
          </a>
        </Link>
      </div>
      <div className="rigth-wrapper">
        <HeaderCTA/>
        <HeaderStatus/>
      </div>
    </HeaderStyled>
  );
}
