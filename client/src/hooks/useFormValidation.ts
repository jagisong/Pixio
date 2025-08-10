import { useState, useEffect } from 'react';
import { getPasswordStrength } from '../utils/authUtils/passwordStrength';

interface UseFormValidationProps {
  email?: string;
  password?: string;
}

interface ValidationResult {
  emailValid: boolean;
  passwordStatus: {
    passed: boolean;
    label: string;
    score: number;
  };
  isFormValid: boolean;
}

export const useFormValidation = ({ 
  email = '', 
  password = '' 
}: UseFormValidationProps): ValidationResult => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    passed: boolean;
    label: string;
    score: number;
  }>({ score: 0, label: 'Very Weak', passed: false });

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // Password strength analysis
  useEffect(() => {
    const strength = getPasswordStrength(password);
    setPasswordStatus(strength);
  }, [password]);

  return {
    emailValid,
    passwordStatus,
    isFormValid: emailValid && passwordStatus.passed
  };
};