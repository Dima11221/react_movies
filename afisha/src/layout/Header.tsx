interface IProps {
    title: string;
}

const Header = ({title}: IProps) => {
    return (
        <nav className="">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo"><h2>{title}</h2></a>
                <ul id="nav-mobile" className="">
                    <li><a href="#">Movie</a></li>
                </ul>
            </div>
        </nav>
    )

}

export {Header}