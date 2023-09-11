import './AddAndUpdateIndicaror.scss';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../../actions/actions'; // Импортируйте соответствующие действия
import { useState, useEffect } from 'react';
const AddAndUpdateIndicaror = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { message, messageType } = useSelector((state) => state.indicators);

    useEffect(() => {
        if (message) {
            setIsModalOpen(true);

            setTimeout(() => {
                setIsModalOpen(false);
                dispatch(hideMessage());
            }, 3000); // Закрыть модальное окно через 3 секунды
        }
    }, [message, dispatch]);

    return (
        <div className='showMessage'>
            {isModalOpen && (
                <div className={`modal ${messageType}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default AddAndUpdateIndicaror;