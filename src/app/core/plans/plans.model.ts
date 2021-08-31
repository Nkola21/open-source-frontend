export interface Plan {
    id?: number,
    plan: string,
    cover: string,
    premium: string,
    member_age_restriction: string,
    member_minimum_age: string,
    member_maximum_age: string,
    beneficiaries: string,
    consider_age: string,
    minimum_age: string,
    maximum_age: string,
    has_benefits: boolean,
    benefits: string,
    modified: string,
    created: string,
}


export function newPlan() {
    return {
        plan: null,
        cover: null,
        premium: null,
        member_age_restriction: null,
        member_minimum_age: null,
        member_maximum_age: null,
        beneficiaries: null,
        consider_age: null,
        minimum_age: null,
        maximum_age: null,
        has_benefits: null,
        benefits: null,
        modified: null,
        created: null,
    };
  }