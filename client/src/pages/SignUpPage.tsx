import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import type { signUpFormData } from '../types/auth.types';
import { signUpSchema } from '../utils/authUtils/validationSchema';
import { useAuth } from '../context/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import SubmitButton from '../components/auth/SubmitButton';

const SignUpPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<signUpFormData>({
        resolver: yupResolver(signUpSchema),
        mode: 'onChange' // triggers validation while typing
    });

    const { register: registerUser, error: authError, isLoading } = useAuth();
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    
    // Watch form fields for real-time validation
    const email = watch('email');
    const password = watch('password');
    
    // Use custom hook for form validation
    const { emailValid, passwordStatus, isFormValid } = useFormValidation({
        email,
        password
    });

    const onSubmit = async (data: signUpFormData) => {
        setRegistrationError(null);
        try {
            await registerUser(data);
            // Registration successful - redirect is handled in the AuthContext
        } catch (error) {
            if (error instanceof Error) {
                setRegistrationError(error.message);
            } else {
                setRegistrationError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h1>Join GeoPixio</h1>
                <p>Create your account below.</p>
            </div>

            <form className="auth-panel" onSubmit={handleSubmit(onSubmit)}>
                {/* Display auth errors */}
                {(authError || registrationError) && (
                    <div className="error-container">
                        <p className="error-msg">{authError || registrationError}</p>
                    </div>
                )}

                {/* Username */}
                <FormField
                    name="username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    error={errors.username?.message}
                />

                {/* Email */}
                <FormField
                    name="email"
                    type="email"
                    placeholder="Email"
                    register={register}
                    error={errors.email?.message}
                    assistMessage={
                        email && !emailValid && !errors.email && (
                            <p className="assist-msg invalid">Please enter a valid email</p>
                        )
                    }
                />

                {/* Password */}
                <PasswordField
                    register={register}
                    error={errors.password?.message}
                    passwordStatus={passwordStatus}
                    watch={watch}
                />

                {/* Submit */}
                <SubmitButton 
                    label={isLoading ? "Creating Account..." : "Sign Up"}
                    isDisabled={!isFormValid || isLoading}
                />

                <p style={{ color: '#fff', marginTop: '10px' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#00f' }}>
                        Log in
                    </Link>
                </p>
            </form>


        </div>
    );
};

export default SignUpPage;
