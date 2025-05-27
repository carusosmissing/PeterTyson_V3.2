// TruEXP Form Validation Utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [field: string]: string };
}

export interface FormField {
  value: any;
  rules: ValidationRule[];
}

export interface FormData {
  [field: string]: FormField;
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z\s]+$/,
  numeric: /^\d+$/,
};

// Validation error messages
export const ValidationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  username: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
  password: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Invalid format',
  url: 'Please enter a valid URL',
  passwordMatch: 'Passwords do not match',
  terms: 'You must accept the terms and conditions',
  age: 'You must be at least 13 years old',
};

// Single field validation
export const validateField = (value: any, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return rule.message || ValidationMessages.required;
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      continue;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || ValidationMessages.minLength(rule.minLength);
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || ValidationMessages.maxLength(rule.maxLength);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || ValidationMessages.pattern;
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }
  }

  return null;
};

// Form validation
export const validateForm = (formData: FormData): ValidationResult => {
  const errors: { [field: string]: string } = {};
  let isValid = true;

  for (const [fieldName, field] of Object.entries(formData)) {
    const error = validateField(field.value, field.rules);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// Predefined validation rules
export const ValidationRules = {
  // Auth validations
  email: (): ValidationRule[] => [
    { required: true },
    { pattern: ValidationPatterns.email, message: ValidationMessages.email },
  ],

  password: (): ValidationRule[] => [
    { required: true },
    { minLength: 8, message: ValidationMessages.minLength(8) },
    { pattern: ValidationPatterns.password, message: ValidationMessages.password },
  ],

  confirmPassword: (originalPassword: string): ValidationRule[] => [
    { required: true },
    {
      custom: (value: string) => {
        return value !== originalPassword ? ValidationMessages.passwordMatch : null;
      },
    },
  ],

  username: (): ValidationRule[] => [
    { required: true },
    { minLength: 3, message: ValidationMessages.minLength(3) },
    { maxLength: 20, message: ValidationMessages.maxLength(20) },
    { pattern: ValidationPatterns.username, message: ValidationMessages.username },
  ],

  displayName: (): ValidationRule[] => [
    { required: true },
    { minLength: 2, message: ValidationMessages.minLength(2) },
    { maxLength: 50, message: ValidationMessages.maxLength(50) },
  ],

  // Profile validations
  bio: (): ValidationRule[] => [
    { maxLength: 500, message: ValidationMessages.maxLength(500) },
  ],

  phone: (): ValidationRule[] => [
    { pattern: ValidationPatterns.phone, message: ValidationMessages.phone },
  ],

  // Message validations
  messageContent: (): ValidationRule[] => [
    { required: true, message: 'Message cannot be empty' },
    { maxLength: 1000, message: ValidationMessages.maxLength(1000) },
  ],

  // Event validations
  eventTitle: (): ValidationRule[] => [
    { required: true },
    { minLength: 3, message: ValidationMessages.minLength(3) },
    { maxLength: 100, message: ValidationMessages.maxLength(100) },
  ],

  eventDescription: (): ValidationRule[] => [
    { maxLength: 1000, message: ValidationMessages.maxLength(1000) },
  ],

  // Search validations
  searchQuery: (): ValidationRule[] => [
    { required: true, message: 'Please enter a search term' },
    { minLength: 2, message: ValidationMessages.minLength(2) },
    { maxLength: 100, message: ValidationMessages.maxLength(100) },
  ],

  // Terms and conditions
  termsAccepted: (): ValidationRule[] => [
    {
      custom: (value: boolean) => {
        return !value ? ValidationMessages.terms : null;
      },
    },
  ],

  // Age verification
  birthDate: (): ValidationRule[] => [
    { required: true },
    {
      custom: (value: string) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 < 13 ? ValidationMessages.age : null;
        }
        
        return age < 13 ? ValidationMessages.age : null;
      },
    },
  ],
};

// Real-time validation hook helper
export const createFormValidator = (initialData: FormData) => {
  let formData = { ...initialData };
  let errors: { [field: string]: string } = {};

  const validateSingleField = (fieldName: string, value: any): string | null => {
    if (formData[fieldName]) {
      formData[fieldName].value = value;
      const error = validateField(value, formData[fieldName].rules);
      
      if (error) {
        errors[fieldName] = error;
      } else {
        delete errors[fieldName];
      }
      
      return error;
    }
    return null;
  };

  const validateAllFields = (): ValidationResult => {
    const result = validateForm(formData);
    errors = result.errors;
    return result;
  };

  const getFieldError = (fieldName: string): string | null => {
    return errors[fieldName] || null;
  };

  const hasErrors = (): boolean => {
    return Object.keys(errors).length > 0;
  };

  const clearErrors = (): void => {
    errors = {};
  };

  const updateFieldValue = (fieldName: string, value: any): void => {
    if (formData[fieldName]) {
      formData[fieldName].value = value;
    }
  };

  return {
    validateSingleField,
    validateAllFields,
    getFieldError,
    hasErrors,
    clearErrors,
    updateFieldValue,
    getFormData: () => formData,
    getErrors: () => errors,
  };
};

// Utility functions
export const ValidationUtils = {
  // Check if email is valid
  isValidEmail: (email: string): boolean => {
    return ValidationPatterns.email.test(email);
  },

  // Check if password is strong
  isStrongPassword: (password: string): boolean => {
    return ValidationPatterns.password.test(password);
  },

  // Check if username is valid
  isValidUsername: (username: string): boolean => {
    return ValidationPatterns.username.test(username);
  },

  // Sanitize input
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },

  // Format phone number
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  // Check if URL is valid
  isValidUrl: (url: string): boolean => {
    return ValidationPatterns.url.test(url);
  },

  // Get password strength
  getPasswordStrength: (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (ValidationPatterns.password.test(password)) return 'strong';
    return 'medium';
  },
}; 