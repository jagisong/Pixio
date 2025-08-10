import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import type { LoginFormData } from '../types/auth.types';
import '../styles/auth.css';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import SubmitButton from '../components/auth/SubmitButton';
import * as yup from 'yup';

// Login form validation schema
const loginSchema = yup.object({
  identifier: yup
    .string()
    .required('Email or username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const LoginPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });

  const { login, error: authError, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      await login(data);
      // Login successful - redirect is handled in the AuthContext
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred');
      }
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Welcome Back</h1>
        <p>Log in to your account</p>
      </div>

      <form className="auth-panel" onSubmit={handleSubmit(onSubmit)}>
        {/* Display auth errors */}
        {(authError || loginError) && (
          <div className="error-container">
            <p className="error-msg">{authError || loginError}</p>
          </div>
        )}

        {/* Email or Username */}
        <FormField
          name="identifier"
          type="text"
          placeholder="Email or Username"
          register={register}
          error={errors.identifier?.message}
        />

        {/* Password */}
        <PasswordField
          register={register}
          error={errors.password?.message}
          showStrength={false}
          watch={watch}
        />

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        {/* Submit */}
        <SubmitButton 
          label={isLoading ? "Logging in..." : "Log In"}
          isDisabled={isLoading}
        />

        <p style={{ color: '#fff', marginTop: '10px' }}>
          Don't have an account?{' '}
          <Link to="/" style={{ color: '#00f' }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
