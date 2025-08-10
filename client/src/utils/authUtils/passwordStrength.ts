export function getPasswordStrength(password: string | undefined): {
  score: number;
  label: string;
  passed: boolean;
} {
  // Add this line to prevent errors and ensure we always return a result:
  if (!password) {
    return { score: 0, label: 'Very Weak', passed: false };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const label = labels[score > 0 ? score - 1 : 0];

  return {
    score,
    label,
    passed: score >= 4 // Example: must have 4 of 5 criteria
  };
}
