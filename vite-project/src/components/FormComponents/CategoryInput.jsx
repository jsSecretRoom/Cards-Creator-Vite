import './CategoryInput.scss';

function CategoryInput({ htmlFor, inputName, type, id, name, value, onChange }) {
    return (
      <div className='input-inem'>
        <label htmlFor={id}>{inputName}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}  
          onChange={onChange}    
          placeholder="❤"
        />
      </div>
    );
}
  
export default CategoryInput;