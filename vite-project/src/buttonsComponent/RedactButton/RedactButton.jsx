import { useDispatch } from 'react-redux';
import {
    setProductName,
    setProductDescription,
    setProductPhoto,
    setInitialPrice,
    setDiscountedPrice,
    setCustomCollectionName,
    setItemId,
} from '../../actions/actions';
    
import { 
    setIndicatorNew,
    setIndicatorPopular,
    setIndicatorInclude,
    setIndicatorEnd,
    setIndicatorDiscount,
} from '../../actions/actions';


function RedactButton({item, collectionName}) {
    const dispatch = useDispatch();
    const setRedactCard = (item) => {
        dispatch(setCustomCollectionName(collectionName));
        dispatch(setProductName(item.productNameKey));
        dispatch(setProductDescription(item.productDescriptionKey));
        dispatch(setProductPhoto(item.productPhotoKey));
        dispatch(setInitialPrice(item.initialPriceKey));
        dispatch(setDiscountedPrice(item.discountedPriceKey));
        dispatch(setItemId(item.id));
        
        dispatch(setIndicatorNew(item.indicatorNewKey));
        dispatch(setIndicatorPopular(item.indicatorPopularKey));
        dispatch(setIndicatorInclude(item.indicatorIncludeKey));
        dispatch(setIndicatorEnd(item.indicatorEndKey));
        dispatch(setIndicatorDiscount(item.indicatorDiscountKey));
    }

    return ( 
        <>
            <button onClick={setRedactCard(item)}>Редагувати</button>
        </>
        
    );
}

export default RedactButton;