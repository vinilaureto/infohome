import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "./edit-icon.svg";
import RemoveIcon from "./remove-icon.svg";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const LocationsDisplayStyled = styled.section`
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }
`;

const LocationsWrapper = styled.div`
  padding: 20px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 2px;

  .new-location {
    display: block;
    margin-left: auto;
    border: none;
    background: #f57553;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    padding: 7px 28px;
    cursor: pointer;
    transition: 0.2s ease-in;

    &:hover {
      background-color: #e66f4e;
      transition: 0.2s ease-in;
    }
  }
`;

const LocationsTopic = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  color: #444444;
  padding: 10px;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 70px;
  }

  .controls {
    display: flex;
  }

  button {
    background-color: #f57553;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    display: block;
    border: none;
    border-radius: 3px;
    padding: 0;
    margin-left: 6px;
    cursor: pointer;
    transition: 0.2s ease-in;

    &:hover {
      background-color: #e66f4e;
      transition: 0.2s ease-in;
    }

    svg {
      transform: translateY(1px);
      width: 18px;
      height: 18px;
    }
  }
`;

const LocationEditorStyle = styled.div`
  label {
    display: block;
    color: #444444;
    font-size: 16px;
    margin-bottom: 3px;
  }

  .input-text {
    width: 419px;
    height: 38px;
    box-sizing: border-box;
    padding-left: 12px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .state-city {
    display: flex;
    margin-bottom: 15px;

    div {
      margin-right: 9px;
    }

    select {
      font-size: 16px;
      padding-left: 12px;
      width: 205px;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      border-radius: 4px;
      height: 38px;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;

    .cancel,
    .submit {
      background-color: #f57553;
      color: #fff;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 171px;
      height: 31px;
      border: none;
      padding: 0;
      font-weight: 700;
      margin-left: 10px;
      cursor: pointer;
      transition: 0.2s ease-in;
      border-radius: 2px;

      span {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:hover {
        background-color: #e66f4e;
        transition: 0.2s ease-in;
      }
    }
  }
`;

function LocationsList({ showListFunction }) {
  const [locationsState, setLocationsState] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ap1/v1/imovel/findall")
      .then((response) => {
        setLocationsState(
          response.data.filter((item) => item.applicationUser.id == 7)
        );
      });
    console.log(locationsState);
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/ap1/v1/imovel/delete/${id}`)
      .then((response) => {
        if (response.status == 200) {
          alert("Imóvel removido com sucesso");
        }
      })
      .catch(() => {
        alert("Erro ao enviar os dados");
      });
    document.getElementById(`location${id}`).remove();
  }

  function handleEdit(
    locationId,
    title,
    description,
    image,
    city,
    state,
    phone
  ) {
    localStorage.setItem("locationId", locationId);
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("image", image);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
    localStorage.setItem("phone", phone);
    showListFunction();
  }

  return (
    <>
      {locationsState.map((location, key) => (
        <LocationsTopic key={key} id={"location" + location.id}>
          <p className="name">{location.titulo}</p>
          <div className="controls">
            <button className="edit">
              <EditIcon
                onClick={() => {
                  handleEdit(
                    location.id,
                    location.titulo,
                    location.descricao,
                    location.url,
                    location.cidade,
                    location.estado,
                    location.telefone
                  );
                }}
              />
            </button>
            <button
              className="remove"
              onClick={() => handleDelete(location.id)}
            >
              <RemoveIcon />
            </button>
          </div>
        </LocationsTopic>
      ))}

      <button
        className="new-location"
        onClick={() => {
          showListFunction();
        }}
      >
        Cadastrar imóvel
      </button>
    </>
  );
}

function LocationEditor({ cancelFunction }) {
  useEffect(() => {
    if (localStorage.getItem("title")) {
      document.getElementById("locationTitle").value =
        localStorage.getItem("title");
    }
    if (localStorage.getItem("description")) {
      document.getElementById("locationDescription").value =
        localStorage.getItem("description");
    }
    if (localStorage.getItem("image")) {
      document.getElementById("locationImage").value =
        localStorage.getItem("image");
    }
    if (localStorage.getItem("state")) {
      document.getElementById("locationState").value =
        localStorage.getItem("state");
    }
    if (localStorage.getItem("city")) {
      document.getElementById("locationCity").value =
        localStorage.getItem("city");
    }
    if (localStorage.getItem("phone")) {
      document.getElementById("locationPhone").value =
        localStorage.getItem("phone");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    let title = document.getElementById("locationTitle").value;
    let description = document.getElementById("locationDescription").value;
    let image = document.getElementById("locationImage").value;
    let state = document.getElementById("locationState").value;
    let city = document.getElementById("locationCity").value;
    let phone = document.getElementById("locationPhone").value;

    if (localStorage.getItem('title')) {
      try {
        const data = await axios.put(
          "http://localhost:8080/ap1/v1/imovel/update",
          {
            titulo: title,
            descricao: description,
            estado: state,
            cidade: city,
            url: image,
            telefone: phone,
            id: localStorage.getItem('locationId'),
            applicationUserId: localStorage.getItem("id"),
          }
        );
  
        if (data.status == 200) {
          alert("Imóvel salvo com sucesso");
          deleteLocalStorage();
          cancelFunction();
        }
      } catch (error) {
        alert("Erro ao enviar os dados");
      }
    } else {
      try {
        const data = await axios.post(
          "http://localhost:8080/ap1/v1/imovel/create",
          {
            titulo: title,
            descricao: description,
            estado: state,
            cidade: city,
            url: image,
            telefone: phone,
            applicationUserId: localStorage.getItem("id"),
          }
        );
  
        if (data.status == 200) {
          alert("Imóvel salvo com sucesso");
          deleteLocalStorage();
          cancelFunction();
        }
      } catch (error) {
        alert("Erro ao enviar os dados");
      }
    }


  }

  function deleteLocalStorage() {
    if (localStorage.getItem("title")) {
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("image");
      localStorage.removeItem("state");
      localStorage.removeItem("city");
      localStorage.removeItem("phone");
    }
  }

  function handleCancel() {
    deleteLocalStorage();
    cancelFunction();
  }

  return (
    <LocationEditorStyle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="locationTitle">Título do imóvel</label>
          <input
            type="text"
            id="locationTitle"
            required
            className="input-text"
            placeholder="Título do imóvel"
          />
        </div>
        <div>
          <label htmlFor="locationDescription">Descrição</label>
          <input
            type="text"
            id="locationDescription"
            required
            className="input-text"
            placeholder="Descrição"
          />
        </div>
        <div>
          <label htmlFor="locationImage">URL da imagem</label>
          <input
            type="text"
            id="locationImage"
            required
            className="input-text"
            placeholder="URL da imagem"
          />
        </div>
        <div className="state-city">
          <div>
            <label htmlFor="locationState">Estado</label>
            <select id="locationState">
              <option defaultChecked>Estado</option>
              <option value="sp">São Paulo</option>
            </select>
          </div>
          <div>
            <label htmlFor="locationCity">Cidade</label>
            <select id="locationCity">
              <option defaultChecked>Cidade</option>
              <option value="araraquara">Araraquara</option>
              <option value="bauru">Bauru</option>
              <option value="rio-claro">Rio Claro</option>
              <option value="sao-carlos">São Carlos</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="locationPhone">Telefone de contato</label>
          <input
            type="text"
            id="locationPhone"
            required
            className="input-text"
            placeholder="Telefone de contato"
          />
        </div>
        <div className="buttons">
          <button
            className="cancel"
            type="button"
            onClick={() => {
              handleCancel();
            }}
          >
            <span>Cancelar</span>
          </button>
          <input type="submit" value="Salvar" className="submit" />
        </div>
      </form>
    </LocationEditorStyle>
  );
}

export default function LocationsDisplay() {
  const [showList, setShowList] = useState(true);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorImage, setEditorImage] = useState("");
  const [editorState, setEditorState] = useState("");
  const [editorCity, setEditorCity] = useState("");
  const [editorPhone, setEditorPhone] = useState("");

  function handleShowList(title, description, image, state, city, phone) {
    setShowList(!showList);
    setEditorTitle(title || "");
    setEditorDescription(description || "");
    setEditorImage(image || "");
    setEditorState(state || "");
    setEditorCity(city || "");
    setEditorPhone(phone || "");
  }

  return (
    <LocationsDisplayStyled>
      <h2 className="title">
        {showList ? "Meus imóveis" : "Detalhes do imóvel"}
      </h2>
      <LocationsWrapper>
        {showList ? (
          <LocationsList showListFunction={handleShowList} />
        ) : (
          <LocationEditor
            title={editorTitle}
            description={editorDescription}
            image={editorImage}
            state={editorState}
            city={editorCity}
            phone={editorPhone}
            cancelFunction={handleShowList}
          />
        )}
      </LocationsWrapper>
    </LocationsDisplayStyled>
  );
}
