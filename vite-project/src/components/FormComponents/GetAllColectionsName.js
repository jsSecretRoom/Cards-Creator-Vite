import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
export async function GetAllCollectionName() {
  
  const db = getFirestore(app);
  
  try {
    // Создайте запрос к коллекции AllCollections, где collectionName не пустое
    const q = query(collection(db, 'AllCollections'), where('collectionName', '!=', ''));
    const querySnapshot = await getDocs(q);
    const rootCollections = querySnapshot.docs.map((doc) => doc.data().collectionName);
    return rootCollections;

  } catch (error) {
    console.error('Ошибка при загрузке коллекций:', error);
    throw error;
  }
}