import './CheckboxComponent.scss'
import React from 'react';

function CheckboxComponent({ id, checkboxName, value, onChange }) {
  return (
    <div className='checkbox'>
      <input
        type='checkbox'
        id={id}
        className='toggle-checkbox'
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label htmlFor={id} className='toggle-label'>
        <div className='toggle-button'></div>
      </label>
      {checkboxName}
    </div>
  );
}

export default CheckboxComponent;