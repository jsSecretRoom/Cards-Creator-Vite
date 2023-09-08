import './Form.scss';
import CategoryInput from '../../components/FormComponents/CategoryInput';
import CategorySellect from '../../components/FormComponents/CategorySellect';
import CheckboxComponent from '../../components/FormComponents/CheckboxComponent';
import { handleSubmit } from '../../firestoreComponen/formUtils';
import { useSelector, useDispatch } from 'react-redux';

import {
  setProductName,
  setProductDescription,
  setProductPhoto,
  setInitialPrice,
  setDiscountedPrice,
  setCustomCollectionName,
} from '../../actions/actions';
  
import { 
  setIndicatorNew,
  setIndicatorPopular,
  setIndicatorInclude,
  setIndicatorEnd,
  setIndicatorDiscount,
  toggleChooseCategory,
} from '../../actions/actions';

function Form() {
    const dispatch = useDispatch();

    const productName = useSelector((state) => state.input.productName);
    const productDescription = useSelector((state) => state.input.productDescription);
    const productPhoto = useSelector((state) => state.input.productPhoto);
    const initialPrice = useSelector((state) => state.input.initialPrice);
    const discountedPrice = useSelector((state) => state.input.discountedPrice);
  
    const indicatorNew = useSelector((state) => state.checkbox.indicatorNew);
    const indicatorPopular = useSelector((state) => state.checkbox.indicatorPopular);
    const indicatorInclude = useSelector((state) => state.checkbox.indicatorInclude);
    const indicatorEnd = useSelector((state) => state.checkbox.indicatorEnd);
    const indicatorDiscount = useSelector((state) => state.checkbox.indicatorDiscount);
  
    const chooseCategory = useSelector((state) => state.checkbox.chooseCategory);
    const collectionExists = useSelector((state) => state.checkbox.collectionExists);
    const customCollectionName = useSelector((state) => state.input.customCollectionName);
    const categoryValue = useSelector((state) => state.input.categoryValue);
    const itemId = useSelector((state) => state.input.itemId);

    const handleCategoryClick = (event, isExistingCategory) => {
      event.preventDefault();
      if (isExistingCategory !== chooseCategory) {
        dispatch(toggleChooseCategory(isExistingCategory));
      }
    };

    const handleFormSubmit = (event) => {
      // Соберите данные формы и передайте их в handleSubmit
      const documentData = {
        productNameKey: productName,
        productDescriptionKey: productDescription,
        productPhotoKey: productPhoto,
        initialPriceKey: initialPrice,
        discountedPriceKey: discountedPrice,
        indicatorNewKey: indicatorNew,
        indicatorPopularKey: indicatorPopular,
        indicatorIncludeKey: indicatorInclude,
        indicatorEndKey: indicatorEnd,
        indicatorDiscountKey: indicatorDiscount,
      };
  
      handleSubmit(event, documentData, dispatch, chooseCategory, categoryValue, customCollectionName, itemId);
    };
    
    return ( 
        <form onSubmit={handleFormSubmit}>
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
            <div className='checkbox-conteiner'>
            <CheckboxComponent 
              id="indicatorNew" 
              checkboxName="Новинка?"
              value={indicatorNew}
              onChange={(newValue) => dispatch(setIndicatorNew(newValue))}
            />

            <CheckboxComponent 
              id="indicatorPopular" 
              checkboxName="Топ продаж?"
              value={indicatorPopular}
              onChange={(newValue) => dispatch(setIndicatorPopular(newValue))}
            />

            <CheckboxComponent 
              id="indicatorInclude" 
              checkboxName="Нема в наявності!"
              value={indicatorInclude}
              onChange={(newValue) => dispatch(setIndicatorInclude(newValue))}
            />

            <CheckboxComponent 
              id="indicatorEnd" 
              checkboxName="Закінчуеться!"
              value={indicatorEnd}
              onChange={(newValue) => dispatch(setIndicatorEnd(newValue))}
            />

            <CheckboxComponent 
              id="indicatorDiscount" 
              checkboxName="Активність знижки:"
              value={indicatorDiscount}
              onChange={(newValue) => dispatch(setIndicatorDiscount(newValue))}
            />
          </div>
            <button type="submit">Створити</button>
        </form>
    );
}

export default Form;