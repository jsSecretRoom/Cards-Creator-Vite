// formUtils.js
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../../firebase';
import { toggleCollectionExists, setItemId } from '../actions/actions';
import { showSuccessMessage, showErrorMessage } from '../actions/actions';
export const handleSubmit = async (event, documentData, dispatch, chooseCategory, categoryValue, customCollectionName, itemId) => {
  event.preventDefault();
  const firestore = getFirestore(app);
  
  if (!itemId) {
    // Если itemId пустой, значит, мы добавляем новый элемент

    // Проверяем, выбрана ли категория из селекта
    if (chooseCategory) {
      const collectionRef = collection(firestore, categoryValue);

      try {
        const docRef = await addDoc(collectionRef, documentData);
        dispatch(showSuccessMessage(`Данні успішно додані в коллекію ${categoryValue}!`));

      } catch (error) {
        console.error('Помилка при додаванні данних!!!', error);
        dispatch(showErrorMessage(`Помилка при додаванні данних до коллекії ${categoryValue}!!!`));
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
          dispatch(showSuccessMessage(`Данні успішно додані у нову коллекцію: ${customCollectionName}!`));

        } catch (error) {
          console.error('Помилка при додаанні данних:', error);
          dispatch(showErrorMessage(`Помилка при додаанні данних у нову коллекцію: ${customCollectionName}!!!`));
        }
      } else {
        // Если коллекция с таким именем уже существует, показываем сообщение
        dispatch(toggleCollectionExists(true));

        // Устанавливаем задержку перед скрытием сообщения
        setTimeout(() => {
          dispatch(toggleCollectionExists(false));
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
      dispatch(showSuccessMessage(`Данні у коллекціі ${customCollectionName} успішно оновленні!`));

    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      dispatch(showErrorMessage('Помилка! Данні не оновились!!!'));
    } finally {
      // После успешного обновления или в случае ошибки сбрасываем itemId
      dispatch(setItemId(''));
    }
  }
};