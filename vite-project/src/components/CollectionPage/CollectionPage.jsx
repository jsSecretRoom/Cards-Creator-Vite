import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebase';

function CollectionPage() {
  const { collectionName } = useParams();
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const db = getFirestore(app);
      const collectionRef = collection(db, collectionName);

      try {
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setCollectionData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных коллекции:', error);
      }
    }

    fetchData();
  }, [collectionName]);

  return (
    <div>
      <h2>{collectionName} Коллекция</h2>
      <div className="card-container">
        {collectionData.map((item, index) => (
          <div key={index} className="card">
            {/* Отображение данных элемента коллекции, например, картинки и текста */}
            <img src={item.imageUrl} alt={item.title} />
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => window.history.back()}>Вернуться назад</button>
    </div>
  );
}

export default CollectionPage;