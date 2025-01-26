import React from "react";
import {Header} from "./layout/Header.tsx";
import {Footer} from "./layout/Footer.tsx";
import {Main} from "./layout/Main.tsx";
import './App.css'


function App() {


    return (
        <React.Fragment>
            <Header title='React Movies' />
            <Main/>
            <Footer text='Repo'/>
        </React.Fragment>
    )
}

export default App
