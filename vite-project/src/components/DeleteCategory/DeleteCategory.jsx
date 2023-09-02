import './DeleteCategory.scss';
import React, { useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { app } from '../../../firebase';

const DeleteCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleDeleteClick = async () => {
    const firestore = getFirestore(app);
    const categoryRef = collection(firestore, categoryName);

    try {
      // Получаем все документы в коллекции
      const querySnapshot = await getDocs(categoryRef);

      // Удаляем каждый документ
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log(`Коллекцію "${categoryName}" видалено.`);
    } catch (error) {
      console.error('Помилка під час видалення колекції:', error);
    }
  };

  return (
    <div className="delete-category">
      <label htmlFor="dell-category">Введіть ім'я категорії, яку хочете видалити:</label>
      <input
        type="text"
        name="dell-category"
        id="dell-category"
        placeholder="🔰"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={handleDeleteClick}>Видалити</button>
    </div>
  );
};

export default DeleteCategory;