import styled from "styled-components";

const palette = {
    grey: "#222",
    green: "#1db954",
    red: "#f45b5b",
    blue: "#2c99b5",
    darkGrey: "#0a0a0a",
    headerBlue: "#2c8096"
};

const maxWidth = '1024px';

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
    height: calc(100vh - 40px);
    @media screen and (max-width: ${maxWidth}){
        flex-direction: column;
    }
`

export const ControlPanel = styled.div`
    background-color: white;
    min-width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    padding: 1em;

    @media screen and (max-width: ${maxWidth}) {
        display: none;
    }
`

export const H1 = styled.header`
    font-size: 1.5em;
    font-weight: bolder;
    color: #0c8224; 
    margin: 0 auto;
    padding: .2em;
`

export const APIerror = styled(H1)`
    color: white;
    padding: 0.5em;
`

export const MobileButton = styled.div`
    display: none;

    @media screen and (max-width: ${maxWidth}) {
        display: initial;
    }
`
export const MobileVirusButton = styled.div`
    display: none;

    @media screen and (max-width: 750px) {
        display: initial;
    }
`

export const H4 = styled.header`
    font-size: 1.2em;
    color: ${palette.headerBlue}; 
    margin: 0 auto;
    text-align: center;

    @media screen and (max-width: 750px){
        font-size: 1.5rem;
    } 
    
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
    width: 100%;
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

    @media screen and (max-width: ${maxWidth}) {
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
    margin: 1em;
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
    position: fixed;
    left: calc(50% - 250px);
    border: solid 4px #3d99b6;
    border-radius: 10px;

    @media screen and (max-width: 550px ){
        left: 10%;
        width: 80%;
    }

    button {
        right: 5px;
        top: 2px;
        font-size: x-large;
        position: absolute;
        color: #4a4a4a;
        border: none;
        // border-radius: 50%;
        background: transparent;
        cursor: pointer;
        // width: 50px;
        // height: 50px;
        transition: all 500ms ease-in-out;

        // @media screen and (max-width: ${maxWidth}){
        //     width: auto;
        //     border: none;
        // }

        &:hover {
            // border: solid 2px ${palette.blue};
            color: ${palette.blue};
            transition: all 500ms ease-in-out;
        }
    }
   
    a {
        color: ${palette.blue};
    }

    div {
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
    align-items: center;
    justify-content: left;
    font-size: medium;
`

export const GraphBox2 = styled.div`
    grid-area: box2;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: large;
`

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5em;
`

export const FormSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 90%;

    @media screen and (max-width: ${maxWidth}){
        width: 70%;
    }
`

export const DataColumn = styled.div`
    width: 80%;
    margin: 0 auto;
`

export const VirusDataColumn = styled(DataColumn)`

    @media screen and (max-width: 750px){
        display: none;
    }
`

export const CompanyStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    h2 {
        color: white;
    }

    > p {
        color: #eedaa4;
        > span {
            color: #c7a4ee;
            font-family: 'Roboto', sans-serif;
        }
    }
`

export const VirusStyle = styled(CompanyStyle)`

    display: flex;
    flex-direction: column;
    margin-bottom: 1em;

    .virusColumn {

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

        

    p { 
        color: ${palette.blue};
       
    }

    .labels {
        > p {
            color: white;
        }
    }

    .negative {
        color: ${palette.green};
    }

    .positive {
        color: ${palette.red};       
    }

    .recovered {
        color: #eedaa4;
        
    }   
`

export const MobileVirusStyle = styled(CompanyStyle)`

    display: flex;
    flex-direction: column;
    background-color: ${palette.darkGrey};
    p { 
        color: ${palette.blue};
        > span {
            color: white;
        }
    }
    .negative {
        color: ${palette.green};
        > span {
            color: white;
        }
    }
    .positive {
        color: ${palette.red};
        // #B80C09;
        > span {
            color: white;
        }
    }
    .recovered {
        color: #eedaa4;
        > span {
            color: white;
        }
    }
`

export const CompanyName = styled.a`
    grid-area: box0;
    color: ${palette.blue};
    text-align: center;
    margin-top: 1rem;
`


export const Introduction = styled.div `
    color: white;
    padding: 1em;
    font-size: medium;
    background-color: black;
    overflow: scroll;

    h2, h3 {
        font-size: x-large;
        margin-bottom: 0;
    }

    section {
        padding: .5em;

        a {
            color: ${palette.blue};
        }
    }

    ol {
        > li {
            list-style-type: number;
        }
    }

`

export const FooterStyle = styled.footer`
    background-color: #0c495b;
    bottom: 0;
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: medium;
    position: fixed;

    @media screen and (max-width: 450px) {
        font-size: small;
    }


    > div {
        display: flex;
        flex-direction: row;
        align-items: center;

        > p, a {
            width: min-content;
            color: white;
        }
    }
`