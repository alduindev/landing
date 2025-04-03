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
  const baseStyles =
    'mt-6 w-full h-auto font-medium text-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out flex items-center justify-center gap-2 rounded-full py-3 shadow-md hover:opacity-90'

  const variants = {
    primary: 'bg-primary text-tertiary border border-gray-300 focus:ring-gray-200',
    secondary: 'bg-secondary text-tertiary focus:ring-gray-400',
    tertiary: 'bg-tertiary text-white focus:ring-gray-600',
    danger: 'bg-red-500 text-white focus:ring-red-300',
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
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
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
