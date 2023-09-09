import firebaseIco from '../../assets/icons8-firebase.svg';
function ConnectidIndicator() {
    return ( 
        <div className='connectid-indicator'>
            <div className='connectid'>
              <img src={firebaseIco} alt="firebaseIco" />
              <p>Connectid success!</p>
            </div>
        </div>
    );
}

export default ConnectidIndicator;