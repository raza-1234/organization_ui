import React from 'react'

const Input = ({type, setValue, value, required}: any) => {
  return (
    <input
      required ={required && true}
      type={type}
      onChange={setValue}
      placeholder={`Enter ${type}`}
      value={value}

    />
  )
}

export default Input
