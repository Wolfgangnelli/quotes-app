import * as Yup from 'yup';

export const quoteSchema = Yup.object({
    text: Yup.string().required("Devi inserire una citazione"),
    author: Yup.string(),
});

export const singupUserSchema = Yup.object({
    username: Yup.string().required("Username is required").min(4, "Username must be at least 4 characters")
        .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});

export const loginUserSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
});