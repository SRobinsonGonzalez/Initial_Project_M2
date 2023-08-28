import React, { useState } from 'react'
import './Contact.modules.css'

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validate(inputs) {

  const errors = {};
  
  if (!inputs.name) {
      errors.name = 'Se requiere un nombre';
  }
  if (!regexEmail.test(inputs.email)) {
      errors.email = 'Debe ser un correo electrónico';
  }
  if (!inputs.message) {
      errors.message = 'Se requiere un mensaje';
  }
  return errors;
}

export default function Contact() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(event) {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    setErrors(validate({ ...inputs, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!Object.values(errors).length) {
      alert('Datos completos')
      setInputs({
        name: '',
        email: '',
        message: ''
      });
      setErrors(validate({
        name: '',
        email: '',
        message: ''
      }));
    } else {
      alert ('Debe llenar todos los campos')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            onChange={handleChange}
            value={inputs.name}
            name='name'
            placeholder='Escribe tu nombre...'
            type='text'
            className={errors.name && 'warning'} />
          <p className='danger'>{errors.name}</p>
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            onChange={handleChange}
            value={inputs.email}
            name='email'
            placeholder='Escribe tu email...'
            type='text'
            className={errors.email && 'warning'} />
          <p className='danger'>{errors.email}</p>
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea
            onChange={handleChange}
            value={inputs.message}
            name='message'
            placeholder='Escribe tu mensaje...'
            type='text'
            className={errors.message && 'warning'} />
          <p className='danger'>{errors.message}</p>
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};
