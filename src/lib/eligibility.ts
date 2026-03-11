import { IScheme, IEligibilityCriterion } from "@/models/Scheme";

// Profile shape saved by profile page into Clerk metadata + localStorage
export interface UserProfile {
    fullName?: string;
    dob?: string;            // ISO date string
    gender?: string;
    category?: string;       // General | OBC | SC | ST
    annualIncome?: string;   // numeric string
    occupation?: string;
    parentOccupation?: string;
    village?: string;
    district?: string;
    state?: string;
    pincode?: string;
    uploadedDocs?: string[];
}

function getAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

function getProfileValue(profile: UserProfile, field: string): string | number | undefined {
    switch (field) {
        case "annualIncome": return profile.annualIncome ? parseFloat(profile.annualIncome) : undefined;
        case "age": return profile.dob ? getAge(profile.dob) : undefined;
        case "category": return profile.category;
        case "gender": return profile.gender;
        case "state": return profile.state;
        case "occupation": return profile.occupation;
        default: return undefined;
    }
}

function checkCriterion(profile: UserProfile, criterion: IEligibilityCriterion): boolean {
    if (criterion.operator === "any") return true; // no restriction

    const userVal = getProfileValue(profile, criterion.field);
    if (userVal === undefined) return true; // can't determine — give benefit of doubt

    const criterionVal = criterion.value;

    switch (criterion.operator) {
        case "lt": return typeof userVal === "number" && userVal < (criterionVal as number);
        case "lte": return typeof userVal === "number" && userVal <= (criterionVal as number);
        case "gt": return typeof userVal === "number" && userVal > (criterionVal as number);
        case "gte": return typeof userVal === "number" && userVal >= (criterionVal as number);
        case "eq": return String(userVal).toLowerCase() === String(criterionVal).toLowerCase();
        case "in": {
            const arr = criterionVal as string[];
            return arr.map((v) => v.toLowerCase()).includes(String(userVal).toLowerCase());
        }
        default: return true;
    }
}

export interface SchemeMatchResult {
    scheme: IScheme;
    matchScore: number;  // 0-100
    metCriteria: number;
    totalCriteria: number;
    eligible: boolean;
}

export function matchSchemeToProfile(scheme: IScheme, profile: UserProfile): SchemeMatchResult {
    const criteria = scheme.eligibilityCriteria;
    if (criteria.length === 0) {
        return { scheme, matchScore: 100, metCriteria: 0, totalCriteria: 0, eligible: true };
    }

    const met = criteria.filter((c) => checkCriterion(profile, c)).length;
    const score = Math.round((met / criteria.length) * 100);
    return {
        scheme,
        matchScore: score,
        metCriteria: met,
        totalCriteria: criteria.length,
        eligible: met === criteria.length,
    };
}

export function rankSchemesByProfile(schemes: IScheme[], profile: UserProfile): SchemeMatchResult[] {
    return schemes
        .map((s) => matchSchemeToProfile(s, profile))
        .sort((a, b) => b.matchScore - a.matchScore);
}
