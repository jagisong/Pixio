import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  assistMessage?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
  register,
  error,
  assistMessage,
}) => {
  return (
    <div className="field-group">
      <input
        {...register(name)}
        type={type}
        className="input-field"
        placeholder={placeholder}
      />
      {error && <p className="error-msg">{error}</p>}
      {assistMessage && assistMessage}
    </div>
  );
};

export default FormField;