import React from 'react'

interface ButtonProps {
  label: string;
  onClick?: () => null | void;
  type?: string
}

const Button = (props: ButtonProps) => {
  const {
    label,
    onClick
  } = props
  return (
    <button style={{ color: 'white', border: 'none', background: 'linear-gradient(#87ceeb,#3232ff)', borderRadius: '1.25em', padding: 10, boxShadow: '3px 10px 13px 3px #000058', fontSize: '22px', textTransform: 'uppercase', fontWeight: 'bold', textShadow: '1px 1px 1px black'}} onClick={onClick} type='submit'>
      {label}
    </button>
  )
}

export default Button
