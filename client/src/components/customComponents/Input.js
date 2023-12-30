import React from 'react';

const Input = ({
  label,
  inputid,
  inputType,
  inputclassName,
  value,
  name,
  error,
  errorClassName,
  children,
  tooltip,
  ...restProps
}) => (
  <React.Fragment>
    {label && (
      <>
        <label
          className="font-bold text-gray-700 inline-flex items-center"
          htmlFor={`grid-last-name-${inputid}`}
        >
          {label}
          {tooltip && (
            <span className="tooltip ml-1">
              <i className="material-icons text-sm">info</i>
              <span className="tooltip-content">{tooltip}</span>
            </span>
          )}
        </label>
      </>
    )}
    {children && <>{children}</>}
    <input
      className={inputclassName}
      id={`grid-last-name-${inputid}`}
      type={inputType || 'text'}
      value={value || ''}
      name={name || 'name'}
      tooltip={tooltip || ''}
      {...restProps}
    />
    {/* {children && <>{children}</>} */}
    {error && <div id={errorClassName || 'component-error-text'}>{error}</div>}
  </React.Fragment>
);

export default Input;
