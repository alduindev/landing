import React from 'react'
import clsx from 'clsx'

const UIButton = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  fullWidth = true,
  ...props
}) => {
  const baseStyles = 'mt-6 font-medium text-sm focus:outline-none transition-all duration-200 ease-in-out flex items-center justify-center gap-2 rounded-full py-3'

  const variants = {
    primary: 'bg-[#e0e0e0] text-gray-700 shadow-neumorphism hover:shadow-neumorphism-inset',
    secondary: 'bg-[#e0e0e0] text-gray-500 shadow-neumorphism hover:shadow-neumorphism-inset',
    tertiary: 'bg-[#d3d3d3] text-gray-800 shadow-neumorphism hover:shadow-neumorphism-inset',
    danger: 'bg-red-400 text-white shadow-neumorphism hover:shadow-neumorphism-inset',
  }

  const sizes = {
    sm: 'text-sm py-2 px-4',
    md: 'text-sm py-3 px-5',
    lg: 'text-base py-4 px-6',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        !fullWidth && 'w-auto',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      )}
      {Icon && !loading && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}

export default UIButton
