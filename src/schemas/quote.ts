import * as Yup from 'yup';

export const quoteSchema = Yup.object({
    text: Yup.string().required("Devi inserire una citazione"),
    author: Yup.string(),
});