import React from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface PasswordFieldProps {
  register: UseFormRegister<any>;
  error?: string;
  passwordStatus?: {
    passed: boolean;
    label: string;
    score: number;
  };
  showStrength?: boolean;
  watch?: UseFormWatch<any>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  register,
  error,
  passwordStatus,
  showStrength = true,
  watch,
}) => {
  const password = watch ? watch('password') : '';
  return (
    <div className="field-group">
      <input
        {...register('password')}
        type="password"
        className="input-field"
        placeholder="Password"
      />
      {error && <p className="error-msg">{error}</p>}
      {showStrength && passwordStatus && password && password.length > 0 && (
        <p
          className={`assist-msg ${passwordStatus.passed ? 'valid' : 'invalid'}`}
        >
          Password Strength: {passwordStatus.label}
        </p>
      )}
    </div>
  );
};

export default PasswordField;