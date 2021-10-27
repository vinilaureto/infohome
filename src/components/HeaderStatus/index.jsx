import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../../context/context";
import { useRouter } from "next/dist/client/router";

const HeaderLoginCTA = styled.a`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  color: #f57553;
  font-weight: 700;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #f1f1f1;
    transition: 0.2s ease-in;
  }
`;

const HeaderStatusStyled = styled.a`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 50px;
  color: #f57553;
  font-weight: 700;
  transition: 0.2s ease-in;

  button {
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 400;
    margin-top: 2px;
    cursor: pointer;
    color: #f57553;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function HeaderStatus() {
  const router = useRouter();
  const { isLoggedIn, changeIsLoggedIn } = useContext(Context);

  function handleLogoff() {
    localStorage.removeItem("logged");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    changeIsLoggedIn(false);
    router.push("/");
  }

  return (
    <>
      {isLoggedIn ? (
        <HeaderStatusStyled>
          <p className="user-name">{localStorage.getItem("name") || ""}</p>
          <button onClick={handleLogoff}>Sair</button>
        </HeaderStatusStyled>
      ) : (
        <HeaderLoginCTA href="/login">Entrar</HeaderLoginCTA>
      )}
    </>
  );
}
