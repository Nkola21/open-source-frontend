export interface Payment {
    id?: number;
    date: Date;
    last_payment: Date;
    person_name: string;
    applicant_id: number;
    parlour_id: number;
    plan_id: string;
}

export function newPayment() {
    return {
        date: null,
        applicant_id: null,
        cover: null,
        last_payment: null,
        premium: null
    };
}