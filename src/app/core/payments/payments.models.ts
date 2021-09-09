export interface Payment {
    id?: number;
    date: Date;
    person_name: string;
    applicant_id: number;
    parlour_id: number;
    plan_id: string;
}

export function newPayment() {
    return {
        date: null,
        person_name: null,
        applicant_id: null,
        parlour_id: null,
        plan_id: null
    };
}