import backImg from '../../assets/react.svg'
function CardVisible() {
    return ( 
        <div className="card-macet">
            <div>
            <button onClick={() => window.history.back()}> <img src={backImg} alt="backImg" />Back</button>
                <div className="card-decoration">

                </div>
            </div>
        </div>
    );
}

export default CardVisible;