import './Form.scss';
import CategoryInput from '../../components/FormComponents/CategoryInput';
import CategorySellect from '../../components/FormComponents/CategorySellect';
import CheckboxComponent from '../../components/FormComponents/CheckboxComponent';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../../../firebase';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

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
  
  toggleChooseCategory,
  toggleCollectionExists,
    
} from '../../actions/actions';

export const firestore = getFirestore(app);

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
    
    const categoryValue = useSelector((state) => state.input.categoryValue);
    const customCollectionName = useSelector((state) => state.input.customCollectionName);
    const itemId = useSelector((state) => state.input.itemId);
  
    const handleCategoryClick = (event, isExistingCategory) => {
      event.preventDefault();
      if (isExistingCategory !== chooseCategory) {
        dispatch(toggleChooseCategory(isExistingCategory));
      }
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      
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
    
      if (!itemId) {
        // Если itemId пустой, значит, мы добавляем новый элемент
    
        // Проверяем, выбрана ли категория из селекта
        if (chooseCategory) {
          const collectionRef = collection(firestore, categoryValue);
    
          try {
            const docRef = await addDoc(collectionRef, documentData);
            console.log('Данные успешно добавлены в выбранную коллекцию:', docRef.id);
          } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            // Возможно, здесь стоит показать сообщение пользователю
          }
          
        } else {
          // Если выбрана новая категория, проверяем, существует ли она
          const nameData = collection(firestore, 'AllCollections');
          const querySnapshot = await getDocs(query(nameData, where('collectionName', '==', customCollectionName)));
    
          if (querySnapshot.empty) {
            // Создаем новую коллекцию и добавляем в нее элемент
            const collectionRef = collection(firestore, customCollectionName);
    
            try {
              const docRef = await addDoc(collectionRef, documentData);
              // Теперь добавляем название новой коллекции в AllCollections
              const colectionsNameData = {
                collectionName: customCollectionName
              }
              const docName = await addDoc(nameData, colectionsNameData);
              console.log('Данные успешно добавлены в новую коллекцию:', docRef.id, docName.id);
              
            } catch (error) {
              console.error('Ошибка при добавлении данных:', error);
              // Возможно, здесь стоит показать сообщение пользователю
            }
          } else {
            // Если коллекция с таким именем уже существует, показываем сообщение
            dispatch(toggleCollectionExists(true));
    
            // Устанавливаем задержку перед скрытием сообщения
            setTimeout(() => {
              dispatch(toggleCollectionExists(false));
            }, 5000);
          }
        }
      } else {
        // Редактирование существующего элемента
        const db = getFirestore(app);
        const collectionRef = collection(db, customCollectionName);
    
        try {
          // Получаем документ по itemId и обновляем его с новыми данными
          const docRef = doc(collectionRef, itemId);
          await updateDoc(docRef, documentData);
    
          console.log('Данные успешно обновлены:', docRef.id);
        } catch (error) {
          console.error('Ошибка при обновлении данных:', error);
        } finally {
          // После успешного обновления или в случае ошибки сбрасываем itemId
          dispatch(setItemId(''));
        }
      }
    };

    return ( 
        <form onSubmit={handleSubmit}>
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