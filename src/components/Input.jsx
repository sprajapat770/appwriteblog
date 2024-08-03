import React, { useId } from 'react'

const Input = React.forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className='w-full mb-4'>
            {label && (
                <label 
                htmlFor={id} 
                className='inline-block mb-2 pl-1 text-sm font-medium text-gray-700'>
                {label}
                </label>
            )}
            <input
                className={`${className} w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </div>

      )  
});

export default Input