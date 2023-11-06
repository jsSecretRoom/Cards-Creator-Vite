import './CollectionPage.scss';
import backImg from '../../assets/react.svg';
import FavoriteImg from '../../assets/Favorite.svg';
import { truncateText } from '../CardVisible/CardVisible';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../../../firebase';

import RedactButton from '../../buttonsComponent/RedactButton/RedactButton';
import DeleteButton from '../../buttonsComponent/DeleteButton/DeleteButton';

function CollectionPage() {
  

  const [searchText, setSearchText] = useState('');
  const { collectionName } = useParams();
  const [collectionData, setCollectionData] = useState([]); 

  const messageTypeIndicator = useSelector((state) => state.indicators.messageType);
  
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const db = getFirestore(app);
      const collectionRef = collection(db, collectionName);
  
      try {
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCollectionData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных коллекции:', error);
      }
    }
  
    // Вызов функции fetchData при изменении collectionName или messageTypeIndicator
    fetchData();
  }, [collectionName, messageTypeIndicator]);
  
  const handleDelete = async (id) => {
    const db = getFirestore(app);
    const collectionRef = collection(db, collectionName);
    const docRef = doc(collectionRef, id);
    
    try {
      await deleteDoc(docRef);
      // После удаления обновите состояние данных
      setCollectionData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении документа:', error);
    }
  };



  return (
    <div className='colection'>
      <div className='collection-head'>
        <button onClick={() => window.history.back()}> <img src={backImg} alt="backImg" />Back</button>
        <h2>Коллекція: {collectionName}</h2>
      </div>
      <div className='search-by-id'>
        <input
            type="search"
            name="search"
            id="search"
            placeholder='Знайти по id:'
            value={searchText}
            onChange={handleSearchInputChange}
          />
      </div>
      <div className="card-list">
        {collectionData
        .filter((item) => item.id.includes(searchText))
        .map((item) => (
          <div key={item.id} className='card-container'>
            <div className="card" style={{
                    backgroundColor:    item.indicatorNewKey ? '#45FF58' :
                    item.indicatorPopularKey ? '#FF7D34' :
                    item.indicatorIncludeKey ? '#373737' :
                    '#61c8ff'
                    }}>
              <div className='card-head'>
                <div className='fichs'>
                  <div className='body-collor'>
                    {item.indicatorNewKey && (
                        <p style={{ backgroundColor: '#45FF58' }}>Новинка!</p>
                    )}
                    {item.indicatorPopularKey && (
                        <p style={{ backgroundColor: '#FF7D34' }}>Топ продаж!</p>
                    )}
                    {item.indicatorIncludeKey && (
                        <p style={{ backgroundColor: '#373737' }}>Нема в наявності!</p>
                    )}
                    {!item.indicatorNewKey && !item.indicatorPopularKey && !item.indicatorIncludeKey && (
                        <p style={{ backgroundColor: '#61c8ff' }}>change</p>
                    )}  
                    <img src={FavoriteImg} alt="FavoriteImg" />
                  </div>
                </div>
                <div className='product-foto'>
                  <img src={item.productPhotoKey} alt="" />
                </div>
                <div className='warning-fich'>
                  {item.indicatorEndKey && (
                    <p>Закінчуеться!</p>
                  )}
                </div>
              </div>
              <div className='card-body'>
                <div className='card-deskription'>
                  <p className='product-name'>{truncateText(item.productNameKey, 28)} <span className='desc'>{truncateText(item.productDescriptionKey, 34)}</span></p>
                </div>
                <div className='charecters'>
                  <div className='price-info'>
                      {item.indicatorDiscountKey ? <p className='price'style={{textDecoration: 'line-through', fontSize: '16px'}}>{item.initialPriceKey}$</p> 
                      :<p className='price' style={{textDecoration: 'none', fontSize: '22px'}}>{item.initialPriceKey}$</p>}
                      {item.indicatorDiscountKey ? <p className='discountedPrice'>{item.discountedPriceKey}$</p>
                      :<p className='discountedPrice'></p>}
                  </div>
                </div>
              </div>
            </div>
            <ul className='card-info'>
              <li>Id: {item.id}</li>
              <DeleteButton id={item.id} handleDelete={handleDelete}/>
              <Link to={`/createcard`}>
                <RedactButton item={item} collectionName={collectionName}/>
              </Link>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;