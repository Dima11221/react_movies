import React from "react";
import {Header} from "./layout/Header.tsx";
import {Footer} from "./layout/Footer.tsx";
import {Main} from "./layout/Main.tsx";
import './App.css'


function App() {


    return (
        <React.Fragment>
            <Header />
            <Main/>
            <Footer/>
        </React.Fragment>
    )
}

export default App
