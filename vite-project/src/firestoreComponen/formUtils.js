// formUtils.js
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from '../../firebase';
import { toggleCollectionExists, setItemId } from '../actions/actions';

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
        console.log('Данные успешно добавлены в выбранную коллекцию:', docRef.id);
      } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
        // Возможно, здесь стоит показать сообщение пользователю
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
          console.log('Данные успешно добавлены в новую коллекцию:', docRef.id, docName.id);
          
        } catch (error) {
          console.error('Ошибка при добавлении данных:', error);
          // Возможно, здесь стоит показать сообщение пользователю
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

      console.log('Данные успешно обновлены:', docRef.id);
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    } finally {
      // После успешного обновления или в случае ошибки сбрасываем itemId
      dispatch(setItemId(''));
    }
  }
};