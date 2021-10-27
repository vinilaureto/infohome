import styled from "styled-components";
import Image from "next/image";
import HeroForm from "../HeroForm";

const HeroStyled = styled.div`
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
    z-index: 3;
  }

  img {
    object-fit: cover;
    object-position: 0 calc(50% + 112px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .content {
    position: relative;
    z-index: 3;

    .title {
      color: #ffffff;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 45px;
      line-height: 1.3;
    }
  }
`;

export default function Hero() {
  return (
    <HeroStyled>
      <Image src="/hero.jpg" layout="fill" />
      <div className="content container">
        <h2 className="title">
          A vida é feita de mudanças.
          <br /> Que tal deixar algumas mais simples?
        </h2>
        <HeroForm />
      </div>
    </HeroStyled>
  );
}
