export interface Applicant {
    id?: number;
    policy_num: string;
    document: string;
    status: string;
    cancelled: string;
    date: Date;
    main_member: MainMember;
    dependant: Dependant;
    extended_member: ExtendedMember;
    additional_extended_member: AdditionalExtendedMember;
}


export function newApplicant() {
    return {
        policy_num: null,
        document: null,
        status: null,
        cancelled: null,
        date: null,
        main_member: newMainMember(),
        extended_member: newExtendedMember(),
        dependant: newDependant(),
        additional_extended_member: newAdditionalExtendedMember()
    }
}


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


export interface Dependant {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    number: string;
    relation_to_main_member: '';
    date_joined: Date;
}


export function newDependant() {
    return {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        number: '',
        relation_to_main_member: '',
        date_joined: new Date()
    }
}


export interface ExtendedMember {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    number: string;
    relation_to_main_member: string;
    date_joined: Date;
}


export function newExtendedMember() {
    return {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        number: '',
        relation_to_main_member: '',
        date_joined: new Date()
    }
}


export interface AdditionalExtendedMember {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    number: string;
    relation_to_main_member: string
    date_joined: Date;
}


export function newAdditionalExtendedMember() {
    return {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        number: '',
        relation_to_main_member: '',
        date_joined: new Date()
    }
}
