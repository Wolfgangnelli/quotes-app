import * as Yup from "yup";

export const singupUserSchema = Yup.object({
    username: Yup.string().required("Devi inserire un tuo username"),
    password: Yup.string().required("Devi inserire la tua password"),
    email: Yup.string().email().required("Devi inserire la tua email"),
});
