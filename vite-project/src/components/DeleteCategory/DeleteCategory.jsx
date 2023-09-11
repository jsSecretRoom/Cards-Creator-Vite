import './DeleteCategory.scss';
import React, { useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, query, where, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../firebase';
import { showSuccessMessage, showErrorMessage } from '../../actions/actions';
import { useDispatch } from 'react-redux';

const DeleteCategory = ({ onCollectionDeletion }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');

  const handleDeleteClick = async () => {
    const firestore = getFirestore(app);

    try {
      // Проверяем, существует ли указанная категория
      const categoryQuery = query(collection(firestore, 'AllCollections'), where('collectionName', '==', categoryName));
      const categorySnapshot = await getDocs(categoryQuery);

      if (categorySnapshot.size === 0) {
        console.log(`Колекцію "${categoryName}" не знайдено.`);
        return;
      }

      // Удаляем категорию из AllCollections
      const categoryDoc = categorySnapshot.docs[0];
      await deleteDoc(categoryDoc.ref);
      console.log(`Ім'я коллекції "${categoryName}" видалено з AllCollections.`);

      // Удаляем соответствующую коллекцию
      const categoryRef = collection(firestore, categoryName);
      const categorySnapshot2 = await getDocs(categoryRef);

      categorySnapshot2.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      onCollectionDeletion();
      dispatch(showSuccessMessage(`Колекцію "${categoryName}" видалено.`));
    } catch (error) {
      console.error(`Помилка під час видалення колекції: ${categoryName}`, error);
      dispatch(showErrorMessage(`Помилка під час видалення колекції: ${categoryName}`));
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