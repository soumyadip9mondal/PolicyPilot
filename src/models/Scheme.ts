import mongoose, { Schema, Document, Model } from "mongoose";

// ── Eligibility Criteria ─────────────────────────────────────────────────────
export interface IEligibilityCriterion {
    field: string;          // e.g. "annualIncome", "category", "age"
    operator: "lt" | "lte" | "gt" | "gte" | "eq" | "in" | "any";
    value: string | number | string[]; // e.g. 400000, ["SC","ST","OBC"]
    label: string;          // human-readable description
}

// ── Required Document ────────────────────────────────────────────────────────
export interface IRequiredDoc {
    name: string;
    mandatory: boolean;
    note?: string;
}

// ── Scheme ───────────────────────────────────────────────────────────────────
export interface IScheme extends Document {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: "Scholarship" | "Insurance" | "Government Aid" | "Subsidy" | "Loan" | "Pension" | "Other";
    ministry: string;
    deadline?: Date;
    eligibilityCriteria: IEligibilityCriterion[];
    requiredDocuments: IRequiredDoc[];
    benefits: string;
    applicationLink?: string;
    tags: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EligibilityCriterionSchema = new Schema<IEligibilityCriterion>({
    field: { type: String, required: true },
    operator: { type: String, enum: ["lt", "lte", "gt", "gte", "eq", "in", "any"], required: true },
    value: { type: Schema.Types.Mixed, required: true },
    label: { type: String, required: true },
});

const RequiredDocSchema = new Schema<IRequiredDoc>({
    name: { type: String, required: true },
    mandatory: { type: Boolean, default: true },
    note: { type: String },
});

const SchemeSchema = new Schema<IScheme>(
    {
        title: { type: String, required: true, trim: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        category: {
            type: String,
            enum: ["Scholarship", "Insurance", "Government Aid", "Subsidy", "Loan", "Pension", "Other"],
            required: true,
        },
        ministry: { type: String, required: true },
        deadline: { type: Date },
        eligibilityCriteria: [EligibilityCriterionSchema],
        requiredDocuments: [RequiredDocSchema],
        benefits: { type: String, required: true },
        applicationLink: { type: String },
        tags: [{ type: String }],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Prevent model re-compilation in dev hot-reload
const Scheme: Model<IScheme> =
    (mongoose.models.Scheme as Model<IScheme>) ||
    mongoose.model<IScheme>("Scheme", SchemeSchema);

export default Scheme;
