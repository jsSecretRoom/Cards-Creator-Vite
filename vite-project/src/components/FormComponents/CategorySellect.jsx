import React, { useState, useEffect } from 'react';
import './CategorySellect.scss';
import { GetAllCollectionName } from './GetAllColectionsName';

import { useDispatch } from 'react-redux';

import {
  setCategoryValue,
} from '../../actions/actions';

const CategorySellect = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [collectionNames, setCollectionNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const rootCollections = await GetAllCollectionName();
        setCollectionNames(rootCollections);
      } catch (error) {
        console.error('Ошибка при загрузке коллекций:', error);
      }
    }

    fetchData();
  }, []);

  const handleOptionChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    dispatch(setCategoryValue(selectedCategory));
  };

  return (
    <div className="select-container">
      <p htmlFor="category">Категория: </p>
      <select id="mySelect" name="mySelect" className="custom-select" value={selectedOption} onChange={handleOptionChange}>
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