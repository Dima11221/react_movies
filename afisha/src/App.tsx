import React from "react";
import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Main} from "./layout/Main/Main.tsx";
// import './styles/App.scss'
import './styles/globals.scss'


function App() {


    return (
        <React.Fragment>
            <Header title='OMDb Movies' />
            <Main/>
            <Footer text='GitHub page'/>
        </React.Fragment>
    )
}

export default App
