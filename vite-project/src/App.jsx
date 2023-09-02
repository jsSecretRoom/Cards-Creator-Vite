import './App.scss'

// import reactLogo from './assets/react.svg'
import CategoryInput from './components/FormComponents/CategoryInput'
import CategorySellect from './components/FormComponents/CategorySellect'
import CheckboxComponent from './components/FormComponents/CheckboxComponent';
import DeleteCategory from './components/DeleteCategory/DeleteCategory';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';

import { AuthProvider } from './auth';
import React, { useState } from 'react';

export const firestore = getFirestore(app);


function App() {
  const [chooseCategory, setCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [customCollectionName, setCustomCollectionName] = useState('');

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

  const handleCategoryClick = (event, isExistingCategory) => {
    event.preventDefault();
    setCategory(isExistingCategory);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategoryValue(selectedCategory);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const collectionRef = collection(firestore, chooseCategory ? categoryValue : customCollectionName);
    const nameData = collection(firestore, 'AllCollections');

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

    
    const colectionsNameData = {
      collectionName: customCollectionName
    }

    try {
      const docRef = await addDoc(collectionRef, documentData);
      const docName = await addDoc(nameData, colectionsNameData);

      console.log('Данные успешно добавлены:', docRef.id , docName.id);
    } catch (error) {
      console.error('Ошибка при добавлении данных:', error);
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
              <form onSubmit={handleSubmit}>
                <div className='form-container'>
                  <div className='choose-category'>
                    <button onClick={(event) => handleCategoryClick(event, true)} className={`chose-button${chooseCategory ? ' active' : ''}`}>Існуюча категорія</button>
                    <button onClick={(event) => handleCategoryClick(event, false) } className={`chose-button${chooseCategory ? '' : ' active'}`}>Нова категорія</button>
                  </div>

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
            <div className='help-info'>
              {/* <button>
                <img src={reactLogo} alt="" />
                Back
              </button> */}
              <h2>Категорії</h2>
            </div>
            <ul className='category-lyst'>
              <button>catewerewrwrgory</button>
              <button>crtrtrerwewretwertwtrrtr</button>
              <button>category</button>
              <button>category</button>
            </ul>
            <DeleteCategory/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
