import './Form.scss';

import CheckboxComponent from '../../components/FormComponents/CheckboxComponent';
import { handleSubmit } from '../../firestoreComponen/formUtils';
import { useSelector, useDispatch } from 'react-redux';
import InputsComponent from './InputsComponent';

  
import { 
  setIndicatorNew,
  setIndicatorPopular,
  setIndicatorInclude,
  setIndicatorEnd,
  setIndicatorDiscount,
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
    
    const customCollectionName = useSelector((state) => state.input.customCollectionName);
    const categoryValue = useSelector((state) => state.input.categoryValue);
    const itemId = useSelector((state) => state.input.itemId);

  

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

          <InputsComponent/>

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