import styled from "styled-components";
import Image from "next/image";

const CardContainer = styled.div`
  width: 375px;
  border: 1px solid #C4C4C4;
  margin-bottom: 30px;
  margin-right: 22px;

  .image-wrapper {
    width: 100%;
    min-height: 169px;
    position: relative;

    img {
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px;
    height: 133px;
  }

  .title {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 5px;
    color: #1c1c1c;
  }

  .location {
    font-weight: 300;
    color: #1c1c1c;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .description {
    font-size: 30px;
    color: #1c1c1c;
    font-size: 14px;
  }

  .button {
    display: block;
    color: #fff;
    font-weight: 700;
    padding: 7px 18px;
    background: #f57553;
    border-radius: 4px;
    text-align: center
  }
`;

export default function Card({ title, image, city, description, phone }) {
  function translateCity(city) {
    if (city == 'araraquara') return 'Araraquara';
    if (city == 'bauru') return 'Bauru';
    if (city == 'sao-carlos') return 'São Carlos';
    if (city == 'rio-claro') return 'Rio Claro'
  }

  return (
    <CardContainer>
      <div className="image-wrapper">
        <Image src={image} layout="fill" />
      </div>
      <div className="content">
        <div className="meta">
          <h2 className="title">{title}</h2>
          <p className="location">{translateCity(city)} - SP</p>
          <p className="description">{description}</p>
        </div>
        <a href={"tel:" + phone} className="button">
          {phone}
        </a>
      </div>
    </CardContainer>
  );
}
