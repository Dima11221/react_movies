import style from './style.module.scss'

interface IProps {
    title: string;
}

const Header = ({title}: IProps) => {
    return (
        <div className={style.headFoot}>
            <div className={`${style.container} ${style.headFootWrapper}`}>
                <a href="#" className="brand-logo"><h2>{title}</h2></a>
                <h3>
                    <a href="#">A large selection of movies, TV series and games to suit your taste!</a>
                </h3>
            </div>
        </div>
    )

}

export {Header}