import styled from "styled-components";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

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

export const NavButton = styled.button`
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
    height: 90vh;
`

export const ControlPanel = styled.div`
    background-color: white;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizing: border-box;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 500px;
    }
`

export const H1 = styled.h1`
    font-size: xx-large;
    color: ${variables.palette.blue}; 
    margin: 0 auto;
    // padding-top: 1em;
`

export const H4 = styled.h3`
    font-size: x-large;
    color: #2c8096; 
    margin: 0 auto;
    text-align: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        flex-direction: column;
    }
`

export const GraphContainer = styled.div`
    width: 70%;
    height: 100%;
    display: grid;
    overflow: scroll;
    grid-template-rows: 3fr 1fr;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-areas: 
        " .   box1  . "
        "box2 box2 box2";
`

export const GraphBox1 = styled.div`
    grid-area: box1;
    padding: 1em;
`

export const ZoomOutButton = styled.button`
    width: 8em;
    padding: 0.5em;
    color: ${variables.palette.blue};
    background-color: transparent;
    border: solid 2px ${variables.palette.blue};
    border-radius: 4px;
    transition: all 500ms ease-in-out;

    &:hover {
        color: ${variables.palette.darkGrey};
        background-color: ${variables.palette.blue};
        border: solid 2px white;
        transition: all 500ms ease-in-out;
    }

`

export const GraphBox2 = styled.div`
    grid-area: box2;
    text-align: center;
    font-size: large;
    > p {
        // color: '#5e5e5e';
        color: white;
    }
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