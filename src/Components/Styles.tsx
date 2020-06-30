import styled from "styled-components";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

const palette = {
    grey: "#222",
    green: "#1db954",
    red: "#f45b5b",
    blue: "#2c99b5",
    darkGrey: "#0a0a0a",
    headerBlue: "#2c8096"
};

export const Navigation = styled.nav`
    // top: 0;
    box-sizing: border-box;
    height: 80px;
    padding: 1em;
    // width: 100%;
    background-color: ${palette.grey};
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
    color: white;
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
        background-color: ${palette.green};
        visibility: hidden;
        transition: all 0.3s ease-in-out;
    }

    &:hover:before, &:hover {
        color: ${palette.green};
        visibility: visible;
        width: 100%;
    }

`

export const Main = styled.div`
    background-color: ${palette.darkGrey}; 
    display: flex;
    flex-direction: row;
    height: 90vh;

    @media screen and (max-width: 650px){
        flex-direction: column;
    }
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

    > section {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 500px;
    }

    @media screen and (max-width: 650px) {
        display: none;
    }

    // @media screen and (max-width: 650px){
    //     width: 100%;
    //     max-height: 30%; 
    //     overflow: hidden;

    //     > section {
    //         max-height: 0;
    //         overflow: hidden;
    //     }
    // }
`

export const H1 = styled.h1`
    font-size: xx-large;
    color: ${palette.blue}; 
    margin: 0 auto;
`

export const MobileButton = styled.div`
    display: none;

    @media screen and (max-width: 650px) {
        display: initial;
    }
`

export const H4 = styled.h3`
    font-size: x-large;
    color: ${palette.headerBlue}; 
    margin: 0 auto;
    text-align: center;
`

export const ErrorMessage = styled.p`
    margin: 0 auto;
    color: ${palette.red};
    font-size: medium;
    text-align: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90%;
    margin: 0 auto; 

    > div {
        flex-direction: column;
    }
`

export const GraphContainer = styled.div`
    width: 70%;
    height: 100%;
    display: grid;
    overflow: scroll;
    grid-template-rows: 1fr 3fr 1fr;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-areas: 
        "box0 box0 box0"
        "box1 box1 box1"
        "box2 box2 box2";

    @media screen and (max-width: 650px) {
        width: 100%;
        overflow-x: hidden;
    }
`

export const GraphBox1 = styled.div`
    grid-area: box1;
`

export const ZoomOutButton = styled.button`
    display: flex;
    align-items: center;
    min-height: 42px;
    min-width: 108px;
    padding: 0.5em;
    color: ${palette.blue};
    background-color: transparent;
    border: solid 2px ${palette.blue};
    border-radius: 4px;
    margin-bottom: 4px;
    transition: all 500ms ease-in-out;

    &:hover {
        color: ${palette.darkGrey};
        background-color: ${palette.blue};
        border: solid 2px white;
        transition: all 500ms ease-in-out;
    }

`

export const SVGDiv = styled.div`
    display: flex; 
    flex-direction: row;
    margin-top: 1rem;
    &:hover {
        cursor: pointer
    }
`

export const Modal = styled.div`
    background-color: white;
    text-align: center;
    width: 500px;
    height: auto;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
   

   > div {
       padding: .2em;
       width: 100%;
       box-sizing: border-box;

       &.article {
        background-color: #b9b9b9c9;
    }
   }
`

export const ModalHeader = styled.header`
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: left;
    margin-left: 1em;
   font-size: medium;
`

export const GraphBox2 = styled.div`
    grid-area: box2;
    text-align: center;
    font-size: large;
    > div p {
        color: white;
    }
`

export const Footer = styled.footer`
   bottom: 0;
   box-sizing: border-box;
   height: 80px;
   padding: 1em;
   width: 100%;
   background-color: ${palette.grey};
`

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

`

export const DataColumn = styled.div`
    width: 80%;
    margin: 0 auto;
`

export const CompanyStyle = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    margin: 0 auto;

    > p {
        > a {
            color: ${palette.blue}
        }
    }
`

export const CompanyName = styled.div`
    grid-area: box0;
    color: white;
    text-align: center;
`

