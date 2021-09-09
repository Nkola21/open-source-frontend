export interface MainMember {
    id?: number;
    first_name: string;
    last_name: string;
    id_number: string;
    contact: string;
    date_joined: Date;
}

export function newMainMember() {
    return {
        first_name: '',
        last_name: '',
        id_number: '',
        contact: '',
        date_joined: new Date()
    }
}