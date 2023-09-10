import { useDispatch } from 'react-redux';
import ResetSVG from '../../assets/reset-arrow.svg'
import { 
    setIndicatorNew,
    setIndicatorPopular,
    setIndicatorInclude,
    setIndicatorEnd,
    setIndicatorDiscount,
} from '../../actions/actions';

import {
    setProductName,
    setProductDescription,
    setProductPhoto,
    setInitialPrice,
    setDiscountedPrice,
} from '../../actions/actions';

function ResetButton() {
    const dispatch = useDispatch();

    const setReset = () =>{

        dispatch(setProductName(''));
        dispatch(setProductDescription(''));
        dispatch(setProductPhoto(''));
        dispatch(setInitialPrice(''));
        dispatch(setDiscountedPrice(''));
        
        dispatch(setIndicatorNew(false));
        dispatch(setIndicatorPopular(false));
        dispatch(setIndicatorInclude(false));
        dispatch(setIndicatorEnd(false));
        dispatch(setIndicatorDiscount(false));
    }

    return ( 
        <>
            
            <button onClick={setReset} className='reset-button'><img src={ResetSVG} alt="ResetSVG"/>Скинути</button>
        </>
        
    );
}

export default ResetButton;