import styled from "styled-components";

const FooterStyled = styled.footer`
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #404040;
    font-size: 24px;
    color: #fff;
    font-weight: 400;

    span {
        font-weight: 700;
        color: #C0C0C0;
    }
`

export default function Footer() {
    return <FooterStyled>
        info<span>Home</span>
    </FooterStyled>
}