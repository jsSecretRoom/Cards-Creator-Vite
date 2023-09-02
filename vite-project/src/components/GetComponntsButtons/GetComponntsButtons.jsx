import './GetComponntsButtons.scss'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetAllCollectionName } from '../FormComponents/GetAllColectionsName';

function GetComponntsButtons({ onCategoryChange }) {
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

  return (
    <ul className='category-list'>
      {collectionNames.map((name) => (
        <button key={name}>
          <Link to={`/Cards-Creator/${name}`}>{name}</Link>
        </button>
      ))}
    </ul>
  );
}

export default GetComponntsButtons;