
import CategoryInput from '../../components/FormComponents/CategoryInput';
import CategorySellect from '../../components/FormComponents/CategorySellect';

import { useSelector, useDispatch} from 'react-redux';

import {
    setProductName,
    setProductDescription,
    setProductPhoto,
    setInitialPrice,
    setDiscountedPrice,
    setCustomCollectionName,
    toggleChooseCategory,
} from '../../actions/actions';

function InputsComponent() {
    const dispatch = useDispatch();

    const collectionExists = useSelector((state) => state.checkbox.collectionExists);
    const chooseCategory = useSelector((state) => state.checkbox.chooseCategory);
    const customCollectionName = useSelector((state) => state.input.customCollectionName);

    const productName = useSelector((state) => state.input.productName);
    const productDescription = useSelector((state) => state.input.productDescription);
    const productPhoto = useSelector((state) => state.input.productPhoto);
    const initialPrice = useSelector((state) => state.input.initialPrice);
    const discountedPrice = useSelector((state) => state.input.discountedPrice);

    const handleCategoryClick = (event, isExistingCategory) => {
        event.preventDefault();
        if (isExistingCategory !== chooseCategory) {
          dispatch(toggleChooseCategory(isExistingCategory));
        }
    };

    return ( 
        <div className='form-container'>
            <div className='choose-category'>
                <button onClick={(event) => handleCategoryClick(event, true)} className={`chose-button${chooseCategory ? ' active' : ''}`}>Існуюча категорія</button>
                <button onClick={(event) => handleCategoryClick(event, false)} className={`chose-button${chooseCategory ? '' : ' active'}`}>Нова категорія</button>
            </div>

            {collectionExists && (
                <div style={{ color: 'yellow' }}>
                    Коллекция с таким именем уже существует. Введите другое имя коллекции!
                </div>
            )}
                
            {chooseCategory ? <CategorySellect/> :
                <CategoryInput 
                inputName="Категорія:" 
                type="text" 
                id="category" 
                name="category"
                value={customCollectionName}
                onChange={(event) => dispatch(setCustomCollectionName(event.target.value))}
            />}
                
            <CategoryInput 
                inputName="Введіть назву продукту:" 
                type="text" 
                id="productName" 
                name="productName"
                value={productName}
                onChange={(event) => dispatch(setProductName(event.target.value))}
                />

            <CategoryInput 
                inputName="Введіть опис продукту:" 
                type="text" 
                id="productDescription" 
                name="productDescription"
                value={productDescription}
                onChange={(event) => dispatch(setProductDescription(event.target.value))}
            />

            <CategoryInput 
                inputName="Введіть лінк на фото продукту:" 
                type="text" 
                id="productPhoto" 
                name="productPhoto"
                value={productPhoto}
                onChange={(event) => dispatch(setProductPhoto(event.target.value))}
            />

            <CategoryInput 
                inputName="Початкова ціна:" 
                type="number" 
                id="initialPrice" 
                name="initialPrice"
                value={initialPrice}
                onChange={(event) => dispatch(setInitialPrice(event.target.value))}
            />

            <CategoryInput 
                inputName="Ціна зі знижкою:" 
                type="number" 
                id="discountedPrice" 
                name="discountedPrice"
                value={discountedPrice}
                onChange={(event) => dispatch(setDiscountedPrice(event.target.value))}
            />
        </div>
    );
}

export default InputsComponent;