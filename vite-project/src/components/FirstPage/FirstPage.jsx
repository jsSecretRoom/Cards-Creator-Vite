import './FirstPage.scss'
import DeleteCategory from '../../components/DeleteCategory/DeleteCategory';
import GetComponntsButtons from '../../components/GetComponntsButtons/GetComponntsButtons';
import React, { useState } from 'react';
function FirstPage() {
    const [refresh, setRefresh] = useState(false);
    const handleCollectionDeletion = () => {
        setRefresh(!refresh);
    };
    
    return ( 
        <div className="first-page">
          <div className='help-info'>
            <h2>Категорії</h2>
          </div>
          <GetComponntsButtons refresh={refresh} /> 
          <DeleteCategory onCollectionDeletion={handleCollectionDeletion} />
        </div>
    );
}

export default FirstPage;