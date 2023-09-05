import './App.scss'
import React, { useState } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth';


import ShovButton from './components/ShovButton/ShovButton';
import CardVisible from './components/CardVisible/CardVisible';
import CategoryInput from './components/FormComponents/CategoryInput';
import CategorySellect from './components/FormComponents/CategorySellect';
import CheckboxComponent from './components/FormComponents/CheckboxComponent';
import FirstPage from './components/FirstPage/FirstPage';
import CollectionPage from './components/CollectionPage/CollectionPage';

export const firestore = getFirestore(app);

function App() {
  const [chooseCategory, setCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [customCollectionName, setCustomCollectionName] = useState('');
  const [collectionExists, setCollectionExists] = useState(false);

  const [itemId, setItmId] = useState('');
  const [productName, setProductNameValue] = useState('');
  const [productDescription, setProductDescriptionValue] = useState('');
  const [productPhoto, setProductPhotoValue] = useState('');
  const [initialPrice, setInitialPriceValue] = useState('');
  const [discountedPrice, setDiscountedPriceValue] = useState('');

  const [indicatorNew, setIndicatorNew] = useState(false);
  const [indicatorPopular, setIndicatorPopular] = useState(false);
  const [indicatorInclude, setIndicatorInclude] = useState(false);
  const [indicatorEnd, setIndicatorEnd] = useState(false);
  const [indicatorDiscount, setIndicatorDiscount] = useState(false);
  
  const handleEdit = (selectedItem) => {
    setProductNameValue(selectedItem.productNameKey);
    setProductDescriptionValue(selectedItem.productDescriptionKey);
    setProductPhotoValue(selectedItem.productPhotoKey);
    setInitialPriceValue(selectedItem.initialPriceKey);
    setDiscountedPriceValue(selectedItem.discountedPriceKey);
    setIndicatorNew(selectedItem.indicatorNewKey);
    setIndicatorPopular(selectedItem.indicatorPopularKey);
    setIndicatorInclude(selectedItem.indicatorIncludeKey);
    setIndicatorEnd(selectedItem.indicatorEndKey);
    setIndicatorDiscount(selectedItem.indicatorDiscountKey);
  };

  const updateFieldsFromCollectionPage = (colectionName, productName, productDescription, productPhoto, initialPrice, discountedPrice, indicatorNew, indicatorPopular, indicatorInclude, indicatorEnd, indicatorDiscount, productId) => {
    setCustomCollectionName(colectionName)
    setProductNameValue(productName);
    setProductDescriptionValue(productDescription);
    setProductPhotoValue(productPhoto);
    setInitialPriceValue(initialPrice);
    setDiscountedPriceValue(discountedPrice);
    setIndicatorNew(indicatorNew);
    setIndicatorPopular(indicatorPopular);
    setIndicatorInclude(indicatorInclude);
    setIndicatorEnd(indicatorEnd);
    setIndicatorDiscount(indicatorDiscount);
    setItmId(productId);
  };
  

  const handleCategoryClick = (event, isExistingCategory) => {
    event.preventDefault();
    setCategory(isExistingCategory);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategoryValue(selectedCategory);
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
          setCollectionExists(true);
  
          // Устанавливаем задержку перед скрытием сообщения
          setTimeout(() => {
            setCollectionExists(false);
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
        setItmId('');
      }
    }
  };
  
  return (
    <div className='app-conteiner'>
      <main>
        <section className='form-section'>
          <div className='section-name'><h1>Product cart creator!</h1></div>
          <section className='authUsers'>
            <AuthProvider/>
          </section>
          <div className='create-block'>
              <ShovButton/>
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
                  
                  {chooseCategory ? <CategorySellect onCategoryChange={handleCategoryChange}/> :
                  <CategoryInput 
                    htmlFor={"category"}  
                    inputName="Категорія:" 
                    type="text" 
                    id="category" 
                    name="category"
                    value={customCollectionName}
                    onChange={(event) => setCustomCollectionName(event.target.value)}
                  />}

                  <CategoryInput 
                    htmlFor="productName" 
                    inputName="Введіть назву продукту:" 
                    type="text" 
                    id="productName" 
                    name="productName"
                    value={productName}
                    onChange={(event) => setProductNameValue(event.target.value)}
                  />

                  <CategoryInput 
                    htmlFor="productDescription" 
                    inputName="Введіть опис продукту:" 
                    type="text" 
                    id="productDescription" 
                    name="productDescription"
                    value={productDescription}
                    onChange={(event) => setProductDescriptionValue(event.target.value)}
                  />

                  <CategoryInput 
                    htmlFor="productPhoto" 
                    inputName="Введіть лінк на фото продукту:" 
                    type="text" 
                    id="productPhoto" 
                    name="productPhoto"
                    value={productPhoto}
                    onChange={(event) => setProductPhotoValue(event.target.value)}
                  />

                  <CategoryInput 
                    htmlFor="initialPrice" 
                    inputName="Початкова ціна:" 
                    type="number" 
                    id="initialPrice" 
                    name="initialPrice"
                    value={initialPrice}
                    onChange={(event) => setInitialPriceValue(event.target.value)}
                  />

                  <CategoryInput 
                    htmlFor="discountedPrice" 
                    inputName="Ціна зі знижкою:" 
                    type="number" 
                    id="discountedPrice" 
                    name="discountedPrice"
                    value={discountedPrice}
                    onChange={(event) => setDiscountedPriceValue(event.target.value)}
                  />
                </div>
                <div className='checkbox-conteiner'>

                  <CheckboxComponent 
                    id="indicatorNew" 
                    checkboxName="Новинка?"
                    value={indicatorNew}
                    onChange={(checked) => setIndicatorNew(checked)}
                  />
                  <CheckboxComponent 
                    id="indicatorPopular" 
                    checkboxName="Топ продаж?"
                    value={indicatorPopular}
                    onChange={(checked) => setIndicatorPopular(checked)}
                  />
                  <CheckboxComponent 
                    id="indicatorInclude" 
                    checkboxName="Нема в наявності!"
                    value={indicatorInclude}
                    onChange={(checked) => setIndicatorInclude(checked)}
                  />
                  <CheckboxComponent 
                    id="indicatorEnd" 
                    checkboxName="Закінчуеться!"
                    value={indicatorEnd}
                    onChange={(checked) => setIndicatorEnd(checked)}
                  />
                  <CheckboxComponent 
                    id="indicatorDiscount" 
                    checkboxName="Активність- знижки:"
                    value={indicatorDiscount}
                    onChange={(checked) => setIndicatorDiscount(checked)}
                  />
                </div>
                <button type="submit">Створити</button>
              </form>
          </div>
        </section>
        <section className='pages-section'>
          <div className='search-block'>
            <input type="tel" name="search" id="" placeholder='search' />
            <button>search</button>
          </div>
          <div className='pages-block'>
            <Routes>
              <Route path="/" element={<FirstPage/>} />
              <Route path="/createcard" element={<CardVisible 
                productName={productName}
                productDescription={productDescription}
                productPhoto={productPhoto}
                initialPrice={initialPrice}
                discountedPrice={discountedPrice}
                indicatorNew={indicatorNew}
                indicatorPopular={indicatorPopular}
                indicatorInclude={indicatorInclude}
                indicatorEnd={indicatorEnd}
                indicatorDiscount={indicatorDiscount}/>} 
                onEdit={handleEdit}
              />
              <Route path="/collections/:collectionName" element={<CollectionPage updateFields={updateFieldsFromCollectionPage}/>} />
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;