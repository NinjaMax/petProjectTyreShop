import { IAnswerData } from "./AnswerData.type";

export type IQuestionCard = {
    questionData?:{
        id_question: number;
        id: number;
        id_model: number;
        id_brand: number;
        id_customer: number;
        id_user: number;
        description: string;
        name: string;
        email: string;
        customer_pictures: string;
        createdAt: any;
        answer?: [IAnswerData, ...IAnswerData[]];
    },
};