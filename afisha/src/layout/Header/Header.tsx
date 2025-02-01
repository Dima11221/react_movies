import style from './style.module.scss'

interface IProps {
    title: string;
}

const Header = ({title}: IProps) => {
    return (
        <nav className={style.nav}>
            <div className={style.container}>
                <a href="#" className="brand-logo"><h2>{title}</h2></a>
                <h3><a href="#">A large selection of movies, TV series and games to suit your taste!
                </a></h3>
                {/*<ul id="nav-mobile" className="">*/}
                {/*    <h3><a href="#">A large selection of movies, TV series and games to suit your taste!*/}
                {/*    </a></h3>*/}
                {/*</ul>*/}
            </div>
        </nav>
    )

}

export {Header}