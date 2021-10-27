import styled from "styled-components";
import Image from "next/image";
import { useState, useContext } from "react";
import BackIcon from "./back-icon.svg";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Context } from "../../context/context";

const LoginSignupContainerStyled = styled.section`
  display: flex;
  flex-wrap: wrap;

  .title {
    color: #000;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
    width: 100%;
  }
`;

const FormWrapper = styled.div`
  width: 425px;
  padding: 25px 35px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 385px;
  width: calc(100% - 441px);

  img {
    object-fit: cover;
  }
`;

const LoginFormSWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;

  label {
    display: block;
    font-size: 16px;
    color: #444444;
    margin-bottom: 3px;
    font-weight: 400;
  }

  input {
    width: 100%;
    height: 30px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 12px;
    margin-bottom: 15px;
  }

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 171px;
    height: 31px;
    background-color: #f57553;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    margin-left: auto;
    margin-bottom: 0;

    &:hover {
      background-color: #e66f4e;
      transition: 0.2s ease-in;
    }
  }

  .separator {
    margin-top: 30px;
    display: block;
    width: 90%;
    margin: 30px auto;
    height: 1px;
    background-color: #e8e8e8;
  }

  .new-account {
    text-align: center;
    p {
      font-size: 18px;
      color: #444444;
      font-weight: 400;
      margin-bottom: 5px;
    }

    button {
      color: #f57553;
      font-weight: 16;
      font-weight: 700;
      background: transparent;
      border: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .back-icon {
    display: flex;
    align-items: center;
    color: #f57553;
    font-weight: 700;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      text-decoration: underline;
    }

    svg {
      margin-right: 3px;
    }
  }
`;

function LoginForm({ handleVisibilityFunction }) {
  const router = useRouter();
  const { isLoggedIn, changeIsLoggedIn } = useContext(Context);

  async function handleLogin(e) {
    e.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    try {
      let data = await axios.post(
        "http://localhost:8080/ap1/v1/user/authenticate",
        {
          email,
          password,
        }
      );
      if (data.status == 200) {
        changeIsLoggedIn(true);
        localStorage.setItem("logged", "true");
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("id", data.data.id);
        router.push("/admin");
      } else {
        alert("E-mail ou senha incorretos");
      }
    } catch (error) {
      alert("Login ou senha incorretos");
    }
  }

  return (
    <LoginFormSWrapper>
      <span></span>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor="loginEmail">E-mail</label>
          <input type="email" id="loginEmail" placeholder="E-mail" />
        </div>
        <div>
          <label htmlFor="loginPassword">Senha</label>
          <input type="password" id="loginPassword" placeholder="Senha" />
        </div>
        <input className="submit" type="submit" value="Entrar" />
      </form>
      <span className="separator"></span>
      <div className="new-account">
        <p>Ainda não tem conta?</p>
        <button
          onClick={() => {
            handleVisibilityFunction(false);
          }}
        >
          Cadastre-se agora!
        </button>
      </div>
    </LoginFormSWrapper>
  );
}

function SignupForm({ handleVisibilityFunction }) {
  const router = useRouter();
  const { isLoggedIn, changeIsLoggedIn } = useContext(Context);

  async function handleSignUp(e) {
    e.preventDefault();
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    try {
      const data = await axios.post(
        "http://localhost:8080/ap1/v1/user/create",
        {
          name,
          email,
          password,
        }
      );
      if (data.status == 200) {
        localStorage.setItem("logged", "true");
        localStorage.setItem("name", name);
        localStorage.setItem("id", data.data.id);
        changeIsLoggedIn(true);
        router.push("/admin");
      }
    } catch (error) {
      alert("Erro no envio dos dados");
    }
  }

  return (
    <LoginFormSWrapper>
      <button
        className="back-icon"
        onClick={() => {
          handleVisibilityFunction(true);
        }}
      >
        <BackIcon />
        voltar
      </button>
      <form
        onSubmit={(e) => {
          handleSignUp(e);
        }}
      >
        <div>
          <label htmlFor="signupName">Nome completo</label>
          <input type="text" id="signupName" placeholder="Nome completo" />
        </div>
        <div>
          <label htmlFor="signupEmail">E-mail</label>
          <input type="email" id="signupEmail" placeholder="E-mail" />
        </div>
        <div>
          <label htmlFor="signupPassword">Senha</label>
          <input type="password" id="signupPassword" placeholder="Senha" />
        </div>
        <input className="submit" type="submit" value="Cadastrar" />
      </form>
    </LoginFormSWrapper>
  );
}

export default function LoginSignupContainer() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  function handleLoginVisibility(value) {
    setShowLoginForm(value);
  }

  return (
    <LoginSignupContainerStyled>
      <h2 className="title">
        {showLoginForm ? "Fazer login" : "Criar uma conta"}
      </h2>
      <FormWrapper>
        {showLoginForm ? (
          <LoginForm handleVisibilityFunction={handleLoginVisibility} />
        ) : (
          <SignupForm handleVisibilityFunction={handleLoginVisibility} />
        )}
      </FormWrapper>
      <ImageWrapper>
        <Image src="/login.jpg" layout="fill" />
      </ImageWrapper>
    </LoginSignupContainerStyled>
  );
}
