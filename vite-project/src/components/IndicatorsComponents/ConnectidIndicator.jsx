import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseIco from "../../assets/icons8-firebase.svg";
import { app } from "../../../firebase";

function ConnectidIndicator() {
  const [isConnected, setIsConnected] = useState(null); // Используем null для начального состояния

  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        const firestore = getFirestore(app); // Получаем объект Firestore
        const docRef = doc(firestore, "your-collection-name/your-document-id"); // Замените на вашу коллекцию и документ

        // Пробуем прочитать данные из Firestore
        await getDoc(docRef);

        // Если успешно, устанавливаем isConnected в true
        setIsConnected(true);
      } catch (error) {
        console.error("Ошибка при попытке доступа к Firebase Firestore:", error);
        // В случае ошибки, устанавливаем isConnected в false
        setIsConnected(false);
      }
    };

    checkFirebaseConnection();
  }, []);

  return (
    <div className="connectid-indicator">
      {isConnected === null ? (
        // В процессе проверки подключения
        <div className="connectid connecting">
          <img src={firebaseIco} alt="firebaseIco" />
          <p>Connecting...</p>
        </div>
      ) : isConnected ? (
        // Подключение успешно
        <div className="connectid success">
          <img src={firebaseIco} alt="firebaseIco" />
          <p>
            Connectid <span className="success-text">success!</span>
          </p>
        </div>
      ) : (
        // Ошибка при подключении
        <div className="connectid failure">
          <img src={firebaseIco} alt="firebaseIco" />
          <p>
            Connectid <span className="failure-text">failure!</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ConnectidIndicator;