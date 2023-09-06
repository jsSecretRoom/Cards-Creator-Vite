function Form() {
    return ( 
        <form onSubmit={handleSubmit}>

            <div className='form-container'>

                <div className='choose-category'>
                    <button onClick={(event) => handleCategoryClick(event, true)} className={`chose-button${chooseCategory ? ' active' : ''}`}>Існуюча категорія</button>
                    <button onClick={(event) => handleCategoryClick(event, false)} className={`chose-button${chooseCategory ? '' : ' active'}`}>Нова категорія</button>
                </div>

                {collectionExists && (
                <div style={{ color: 'yellow' }}>
                    Коллекция с таким именем уже существует. Введите другое имя коллекции!
                </div>
                )}
                
                {chooseCategory ? <CategorySellect onCategoryChange={handleCategoryChange}/> :
                <CategoryInput 
                htmlFor={"category"}  
                inputName="Категорія:" 
                type="text" 
                id="category" 
                name="category"
                value={customCollectionName}
                onChange={(event) => setCustomCollectionName(event.target.value)}
                />}
                
                <CategoryInput 
                htmlFor="productName" 
                inputName="Введіть назву продукту:" 
                type="text" 
                id="productName" 
                name="productName"
                value={productName}
                onChange={(event) => dispatch(setProductName(event.target.value))}
                />

                <CategoryInput 
                htmlFor="productDescription" 
                inputName="Введіть опис продукту:" 
                type="text" 
                id="productDescription" 
                name="productDescription"
                value={productDescription}
                onChange={(event) => dispatch(setProductDescription(event.target.value))}
                />

                <CategoryInput 
                htmlFor="productPhoto" 
                inputName="Введіть лінк на фото продукту:" 
                type="text" 
                id="productPhoto" 
                name="productPhoto"
                value={productPhoto}
                onChange={(event) => dispatch(setProductPhoto(event.target.value))}
                />

                <CategoryInput 
                htmlFor="initialPrice" 
                inputName="Початкова ціна:" 
                type="number" 
                id="initialPrice" 
                name="initialPrice"
                value={initialPrice}
                onChange={(event) => dispatch(setInitialPrice(event.target.value))}
                />

                <CategoryInput 
                htmlFor="discountedPrice" 
                inputName="Ціна зі знижкою:" 
                type="number" 
                id="discountedPrice" 
                name="discountedPrice"
                value={discountedPrice}
                onChange={(event) => dispatch(setDiscountedPrice(event.target.value))}
                />
            </div>
            <div className='checkbox-conteiner'>

                <CheckboxComponent 
                    id="indicatorNew" 
                    checkboxName="Новинка?"
                    value={indicatorNew}
                    onChange={() => dispatch(toggleIndicatorNew())}
                />

                <CheckboxComponent 
                    id="indicatorPopular" 
                    checkboxName="Топ продаж?"
                    value={indicatorPopular}
                    onChange={() => dispatch(toggleIndicatorPopular())}
                />

                <CheckboxComponent 
                    id="indicatorInclude" 
                    checkboxName="Нема в наявності!"
                    value={indicatorInclude}
                    onChange={() => dispatch(toggleIndicatorInclude())}
                />

                <CheckboxComponent 
                    id="indicatorEnd" 
                    checkboxName="Закінчуеться!"
                    value={indicatorEnd}
                    onChange={() => dispatch(toggleIndicatorEnd())}
                />

                <CheckboxComponent 
                    id="indicatorDiscount" 
                    checkboxName="Активність знижки:"
                    value={indicatorDiscount}
                    onChange={() => dispatch(toggleIndicatorDiscount())}
                />
            </div>
            <button type="submit">Створити</button>
        </form>
    );
}

export default Form
;