interface IProps {
    text: string;
}

const Footer = ({text}:IProps) => {
    return <footer className="page-footer green lighten-4">
        <div className="footer-copyright">
            <div className="container">
                © {new Date().getFullYear()} Copyright Text
                <a className="grey-text text-lighten-4 right" href="#!">{text}</a>
            </div>
        </div>
    </footer>
}



export {Footer}