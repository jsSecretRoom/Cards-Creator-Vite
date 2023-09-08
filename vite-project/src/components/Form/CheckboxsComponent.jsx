import './CheckboxsComponent.scss';

import CheckboxComponent from '../../components/FormComponents/CheckboxComponent';

import { useSelector, useDispatch } from 'react-redux';

import { 
    setIndicatorNew,
    setIndicatorPopular,
    setIndicatorInclude,
    setIndicatorEnd,
    setIndicatorDiscount,
} from '../../actions/actions';

function CheckboxsComponent() {

    const dispatch = useDispatch();

    const indicatorNew = useSelector((state) => state.checkbox.indicatorNew);
    const indicatorPopular = useSelector((state) => state.checkbox.indicatorPopular);
    const indicatorInclude = useSelector((state) => state.checkbox.indicatorInclude);
    const indicatorEnd = useSelector((state) => state.checkbox.indicatorEnd);
    const indicatorDiscount = useSelector((state) => state.checkbox.indicatorDiscount);

    return ( 
        <div className='checkbox-conteiner'>

            <CheckboxComponent 
                id="indicatorNew" 
                checkboxName="Новинка?"
                value={indicatorNew}
                onChange={(newValue) => dispatch(setIndicatorNew(newValue))}
            />

            <CheckboxComponent 
                id="indicatorPopular" 
                checkboxName="Топ продаж?"
                value={indicatorPopular}
                onChange={(newValue) => dispatch(setIndicatorPopular(newValue))}
            />

            <CheckboxComponent 
                id="indicatorInclude" 
                checkboxName="Нема в наявності!"
                value={indicatorInclude}
                onChange={(newValue) => dispatch(setIndicatorInclude(newValue))}
            />

            <CheckboxComponent 
                id="indicatorEnd" 
                checkboxName="Закінчуеться!"
                value={indicatorEnd}
                onChange={(newValue) => dispatch(setIndicatorEnd(newValue))}
            />

            <CheckboxComponent 
                id="indicatorDiscount" 
                checkboxName="Активність знижки:"
                value={indicatorDiscount}
                onChange={(newValue) => dispatch(setIndicatorDiscount(newValue))}
            />
        </div>
    );
}
export default CheckboxsComponent;