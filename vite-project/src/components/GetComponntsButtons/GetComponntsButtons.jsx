import './GetComponntsButtons.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetAllCollectionName } from '../FormComponents/GetAllColectionsName';

function GetComponntsButtons({ refresh }) {
  const [collectionNames, setCollectionNames] = useState([]);
  const [searchText, setSearchText] = useState('');

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
  }, [refresh]);

  // Функция обработки изменения текста поиска
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // Фильтрация коллекций на основе текста поиска
  const filteredCollections = collectionNames.filter((name) =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className='category-search'>
        <p>{filteredCollections.length > 0 ? 'Введіть ім\'я категорії, яку хочете знайти:' : 'Такої категорії не існуе!'}</p>
        <input
          type="text"
          placeholder="Поиск"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </div>
      <ul className='category-list'>
        {filteredCollections.length > 0 ? (
          filteredCollections.map((name) => (
            <Link key={name} to={`/collections/${name}`}>
              <button>{name}</button>
            </Link>
          ))
        ) : null}
      </ul>
    </div>
  );
}

export default GetComponntsButtons;