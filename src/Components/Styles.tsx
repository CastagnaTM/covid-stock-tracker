import React from 'react';
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
    box-sizing: border-box
    height: 80px;
    padding: 1em;
    width: 100%;
    background-color: ${variables.palette.grey};
`

export const Ul = styled.ul `
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: space-evenly;
`

export const Li = styled.li`
    list-style: none;
    color: ${variables.liColor};
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
`

export const H1 = styled.h1`
    font-size: x-large;
    color: ${variables.palette.blue}; 
    margin: 0 auto;
`

export const H4 = styled.h4`
    font-size: large;
    color: #2c8096; 
    padding: 1em;
    text-align: center;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const Graph = styled.div`
    width: 70%;
    height: 100%;
`

export const Footer = styled.footer`
   bottom: 0;
   box-sizing: border-box
   height: 80px;
   padding: 1em;
   width: 100%;
   background-color: ${variables.palette.grey};
`