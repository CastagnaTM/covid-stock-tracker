import styled from "styled-components";

const variables = {
    palette: {
        grey: "#222",
        green: "#1db954",
        red: "#f45b5b",
        blue: "#2c8096",
        darkGrey: "#0a0a0a"
    },
    liColor: "white"

};

export const Navigation = styled.nav`
    top: 0;
    box-sizing: border-box;
    height: 80px;
    padding: 1em;
    width: 100%;
    background-color: ${variables.palette.grey};
    // display: flex;
    align-items: center;
`

export const Ul = styled.ul `
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    height: 80%;
    justify-content: space-evenly;
    align-self: center;
    list-style: none;
`

export const Button = styled.button`
    border: none;
    background-color: transparent;
    color: ${variables.liColor};
    padding: 0;
    font-size: large;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition: all 500ms ease-in-out;

    position: relative;
        
    &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: ${variables.palette.green};
        visibility: hidden;
        transition: all 0.3s ease-in-out;
    }

    &:hover:before, &:hover {
        color: ${variables.palette.green};
        visibility: visible;
        width: 100%;
    }

`

export const Main = styled.div`
    background-color: ${variables.palette.darkGrey}; 
    display: flex;
    flex-direction: row;
    height: 100vh;
`

export const ControlPanel = styled.div`
    background-color: white;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 0.5em;
`

export const H1 = styled.h1`
    font-size: xx-large;
    color: ${variables.palette.blue}; 
    margin: 0 auto;
`

export const H4 = styled.h3`
    font-size: x-large;
    color: #2c8096; 
    margin-bottom: 0;
    text-align: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const GraphContainer = styled.div`
    width: 70%;
    height: 100%;
`

export const Footer = styled.footer`
   bottom: 0;
   box-sizing: border-box;
   height: 80px;
   padding: 1em;
   width: 100%;
   background-color: ${variables.palette.grey};
`

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`