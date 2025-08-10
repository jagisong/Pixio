import React from 'react';

interface SubmitButtonProps {
  label: string;
  isDisabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  label, 
  isDisabled = false 
}) => {
  return (
    <button
      type="submit"
      className="auth-btn"
      disabled={isDisabled}
      style={{
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export default SubmitButton;