export interface Parlour {
    id?: number,
    parlour_name: string,
    person_name: string,
    number: string,
    email: string,
    created: string
}

export function newParlour() {
    return {
        parlour_name: '',
        person_name: '',
        address: '',
        number: '',
        email: ''
    }
}