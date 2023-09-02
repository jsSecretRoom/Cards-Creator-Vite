import './FirstPage.scss'
import DeleteCategory from '../../components/DeleteCategory/DeleteCategory';
import GetComponntsButtons from '../../components/GetComponntsButtons/GetComponntsButtons';
function FirstPage() {
    return ( 
        <div className="first-page">
            <div className='help-info'>
              <h2>Категорії</h2>
            </div>
            <GetComponntsButtons/>
            <DeleteCategory/>
        </div>
    );
}

export default FirstPage;