import './CardVisible.scss'
import FavoriteImg from '../../assets/Favorite.svg'
import backImg from '../../assets/react.svg'
function CardVisible({
    productName,
    productDescription,
    productPhoto,
    initialPrice,
    discountedPrice,

    indicatorNew,
    indicatorPopular,
    indicatorInclude,
    indicatorEnd,
    indicatorDiscount,
  }) {
    
    return ( 
        <div className="card-macet">
            <div className='card-head'>
                <button onClick={() => window.history.back()}> <img src={backImg} alt="backImg" />Back</button>
            </div>
            <div className="card-decoration">
                <div className='card-name'>
                    <h1>{productName}</h1>
                </div>
                <div className="card" style={{
                    backgroundColor:    indicatorNew ? '#45FF58' :
                                        indicatorPopular ? '#FF7D34' :
                                        indicatorInclude ? '#373737' :
                                        '#61c8ff'
                    }}>
                    <div className='card-head'>
                        <div className='fichs'>
                            <div className='body-collor'>
                                {indicatorNew && (
                                    <p style={{ backgroundColor: '#45FF58' }}>Новинка!</p>
                                )}
                                {indicatorPopular && (
                                    <p style={{ backgroundColor: '#FF7D34' }}>Топ продаж!</p>
                                )}
                                {indicatorInclude && (
                                    <p style={{ backgroundColor: '#373737' }}>Нема в наявності!</p>
                                )}
                                {!indicatorNew && !indicatorPopular && !indicatorInclude && (
                                    <p style={{ backgroundColor: '#61c8ff' }}>change</p>
                                )}  
                                <img src={FavoriteImg} alt="FavoriteImg" />
                            </div>
                        </div>
                        <div className='product-foto'>
                            <img src={productPhoto} alt="product" />
                        </div>
                        <div className='warning-fich'>
                            {indicatorEnd && (
                                <p>Закінчуеться!</p>
                            )}
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='card-deskription'>
                            <p className='product-name'>{productName}<span className='desc'> {productDescription}</span></p>
                        </div>
                        <div className='charecters'>
                            <div className='price-info'>
                                {indicatorDiscount ? <p className='price'style={{textDecoration: 'line-through', fontSize: '16px'}} >{initialPrice}$</p> 
                                :<p className='price' style={{textDecoration: 'none', fontSize: '22px'}}>{initialPrice}$</p>}
                                {indicatorDiscount ? <p className='discountedPrice'>{discountedPrice}$</p>
                                :<p className='discountedPrice'></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardVisible;