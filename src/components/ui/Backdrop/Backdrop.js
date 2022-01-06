import './Backdrop.css';

const Backdrop = props => <div className="Backdrop" style={{ zIndex: props.zIndex }} onClick={props.clickHandler}> {props.children} </div>

export default Backdrop;