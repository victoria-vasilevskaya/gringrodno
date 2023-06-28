
import logo from "./logo.svg"
import st from "./Header.module.css";
import icon from "./btn.svg";
import { useNavigate, Link} from 'react-router-dom';


const Header = () => {


    const history = useNavigate();

    const handleLogout = (e) => { //функция выхода из аккаунта
        localStorage.clear()
        e.preventDefault()
        history('/');
    }


    return (
        <div className={st.Header}>
            <div className={st.logo}>{
                (localStorage.getItem("role") === "Менеджер") ?(
                    <Link to="/journal"><img src={logo} alt="logo"></img></Link>
                ):(
                    <Link to="/master"><img src={logo} alt="logo"></img></Link> 
                )
            }
           
                
            </div>
            <Link to="/abonent-device" className={st.btn_stat}>Статистика</Link>
            <div className={st.textUser}>{localStorage.getItem("role")+" "+localStorage.getItem("username")}</div>
            <button href="#" className={st.btn_logout} onClick={handleLogout}>
                <span>Выйти</span>
                <img src={icon}></img>
            </button>
        </div>
    );
}


export default Header;