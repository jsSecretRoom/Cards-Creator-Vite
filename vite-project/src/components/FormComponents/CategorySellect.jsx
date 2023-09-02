import React, { useState, useEffect } from 'react';
import './CategorySellect.scss';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';

const CategorySellect = ({ onCategoryChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchCollectionNames() {
      const db = getFirestore(app);

      try {
        // Создайте запрос к коллекции AllCollections, где collectionName не пустое
        const q = query(collection(db, 'AllCollections'), where('collectionName', '!=', ''));

        const querySnapshot = await getDocs(q);
        const rootCollections = querySnapshot.docs.map((doc) => doc.data().collectionName);
        setCollectionNames(rootCollections);
      } catch (error) {
        console.error('Ошибка при загрузке коллекций:', error);
      }
    }

    fetchCollectionNames();
  }, []);

  const handleOptionChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="select-container">
      <label htmlFor="category">Категорія: </label>
      <select className="custom-select" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Выберите категорию</option>
        {collectionNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySellect;