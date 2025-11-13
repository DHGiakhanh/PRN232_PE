import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const variantClass =
    variant === 'danger'
      ? 'btn-danger'
      : variant === 'outline' || variant === 'secondary'
      ? 'btn-secondary'
      : 'btn-primary'

  return <button className={`${variantClass} ${className}`.trim()} {...props} />
}
