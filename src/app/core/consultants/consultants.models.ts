export interface Consultant {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    number: string;
    email: string;
    branch: string;
}

export function newConsultant() {
    return {
        first_name: '',
        last_name: '',
        username: '',
        number: '',
        email: '',
        branch: ''
    }
}