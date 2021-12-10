import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
    return (
        <div className="Welcome">
            <p className="heading-1">Music</p>
            <p className="heading-2">is the</p>
            <p className="heading-3">Answer</p>

            <button className="login-btn"> <Link to="/authenticate/login"> Login </Link> </button>
            <button className="signup-btn"> <Link to="/authenticate/signup"> Signup </Link> </button>
        </div >
    )
}

export default Welcome;