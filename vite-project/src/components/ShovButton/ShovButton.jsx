import './ShovButton.scss';
import { Link } from "react-router-dom";
function ShovButton() {

    return ( 
        <div className='shov-form'>
            <Link to={`/createcard`}>Shov card</Link>
        </div>
    );
}

export default ShovButton;