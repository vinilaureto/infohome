import styled from "styled-components";
import Card from "../Card";
import { useContext } from "react";
import { Context } from "../../context/context";

const HomeDisplayContainer = styled.div`
  .container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 55px;
  }
`;

export default function HomeDisplay() {
  const { locations } = useContext(Context);

  return (
    <HomeDisplayContainer>
      <div className="container">
        {locations.map((item, key) => (
          <Card
            key={key}
            image={item.url}
            title={item.titulo}
            city={item.cidade}
            description={item.descricao}
            phone={item.telefone}
          />
        ))}
      </div>
    </HomeDisplayContainer>
  );
}
