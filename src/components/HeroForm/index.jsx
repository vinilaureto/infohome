import styled from "styled-components";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";

const HeroFormStyled = styled.div`
  background-color: #fff;
  padding: 18px;
  width: 666px;

  .lead {
    color: #444;
    font-weight: 16;
    font-weight: 400;
    margin-bottom: 6px;
    display: block;
  }

  .filds {
    display: flex;

    select {
      font-weight: 300;
      font-size: 16px;
      display: block;
      color: #535353;
      width: 249px;
      height: 38px;
      margin-right: 12px;
      padding-left: 12px;
      border-radius: 4px;
    }

    button {
      background-color: #f57553;
      display: flex;
      width: 114px;
      height: 38px;
      color: #fff;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

export default function HeroForm() {
  const { setLocations } = useContext(Context);
  const [city, setCity] = useState(null)

  async function handleSearch(e) {
    e.preventDefault();
    let cityValue = document.getElementById('city').value;
    if (cityValue != "") {
      setCity(cityValue)
    } else {
      setCity(null)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/ap1/v1/imovel/findall')
    .then(response => {
      console.log('oi')
      if (city != null) {
        setLocations(response.data.filter(item => item.cidade == city))
      } else {
        setLocations(response.data)
      }
    })
  }, [city])

  return (
    <HeroFormStyled>
      <span className="lead">Eu procuro um imóvel em</span>
      <form className="filds" onSubmit={e => handleSearch(e)}>
        <select id="state">
          <option value="" defaultChecked>
            Estado
          </option>
          <option value="sp">São Paulo</option>
        </select>
        <select id="city">
          <option defaultChecked value="">Cidade</option>
          <option value="araraquara">Araraquara</option>
          <option value="bauru">Bauru</option>
          <option value="rio-claro">Rio Claro</option>
          <option value="sao-carlos">São Carlos</option>
        </select>
        <button>Buscar</button>
      </form>
    </HeroFormStyled>
  );
}
