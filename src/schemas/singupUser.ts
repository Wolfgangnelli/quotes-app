import * as Yup from "yup";

export const singupUserSchema = Yup.object({
    username: Yup.string().required("Devi inserire un tuo username").min(4, "Username must be at least 6 characters")
        .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().email("Email is valid").required("Devi inserire la tua email"),
    password: Yup.string().required("Devi inserire la tua password").min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});
