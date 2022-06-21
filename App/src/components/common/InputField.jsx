import React from 'react';
import styled from 'styled-components';
const InputField = ({ type, value, placeholder, onChange, name, label, id, ...props }) => {
  return (
    <Input>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        id={id}
        {...props}
      />
      <label>{label}</label>
    </Input>
  );
};
const Input = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  margin: 25px 0;
  input {
    height: 100%;
    width: 100%;
    padding-left: 15px;
    outline: none;
    font-size: 19px;
    transition: 0.4s;
    border-radius: 15px;
  }
  label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    pointer-events: none;
    color: grey;
    font-size: 18px;
    transition: 0.4s;
  }
  input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-33px);
    background: white;
    font-size: 16px;
  }
`;
export default InputField;
