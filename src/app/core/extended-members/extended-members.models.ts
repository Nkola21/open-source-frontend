export interface ExtendedMember {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    number: string;
    relation_to_main_member: string
    date_joined: Date;
    applicant_id: number,
}


export function newExtendedMember() {
    return {
        first_name: null,
        last_name: null,
        number: null,
        date_of_birth: null,
        applicant_id: null,
        date_joined: null,
        state: null,
        relation_to_main_member: null
    }
}


export interface Applicant {
    id?: number;
    policy_num: string;
    document: string;
    status: string;
    cancelled: string;
    date: Date;
}


export function newApplicant() {
    return {
        policy_num: null,
        document: null,
        plan_id: null,
        status: null,
        cancelled: null,
        date: null
    }
}
