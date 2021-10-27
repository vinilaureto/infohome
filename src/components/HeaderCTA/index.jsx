import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Context } from "../../context/context";

const HeaderCTAStyled = styled.a`
  color: #fff;
  font-weight: 18;
  background-color: #f57553;
  height: 100%;
  font-weight: 700;
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #e66f4e;
    transition: 0.2s ease-in;
  }
`;

export default function HeaderCTA() {
  const { isLoggedIn, changeIsLoggedIn } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("logged") == "true") {
      changeIsLoggedIn(true);
    } else {
      changeIsLoggedIn(false);
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <HeaderCTAStyled href="/admin">Meus imoveis</HeaderCTAStyled>
      ) : (
        <HeaderCTAStyled href="/login">
          Quero cadastrar um imovel
        </HeaderCTAStyled>
      )}
    </>
  );
}
