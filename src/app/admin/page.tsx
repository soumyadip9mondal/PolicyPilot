"use client";

import { useState, useEffect } from "react";
import {
    Plus, Trash2, Edit2, Shield, AlertCircle, CheckCircle2,
    Loader2, ChevronDown, ChevronUp, Save, X
} from "lucide-react";


interface EligibilityRule {
    field: string;
    operator: string;
    value: string;
    label: string;
}
interface RequiredDoc { name: string; mandatory: boolean; note: string; }

interface SchemeForm {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    ministry: string;
    deadline: string;
    benefits: string;
    applicationLink: string;
    tags: string;        // comma-separated
    eligibilityCriteria: EligibilityRule[];
    requiredDocuments: RequiredDoc[];
}

const EMPTY_FORM: SchemeForm = {
    title: "", shortDescription: "", fullDescription: "",
    category: "Scholarship", ministry: "", deadline: "",
    benefits: "", applicationLink: "", tags: "",
    eligibilityCriteria: [], requiredDocuments: [],
};

const CATEGORIES = ["Scholarship", "Insurance", "Government Aid", "Subsidy", "Loan", "Pension", "Other"];
const FIELDS = [
    { value: "annualIncome", label: "Annual Family Income (₹)" },
    { value: "age", label: "Age (years)" },
    { value: "category", label: "Category (SC/ST/OBC/General)" },
    { value: "gender", label: "Gender" },
    { value: "state", label: "State" },
    { value: "occupation", label: "Occupation" },
    { value: "any", label: "Anyone (no restriction)" },
];
const OPERATORS = [
    { value: "any", label: "Any value" },
    { value: "lte", label: "<= (at most)" },
    { value: "lt", label: "< (less than)" },
    { value: "gte", label: ">= (at least)" },
    { value: "gt", label: "> (greater than)" },
    { value: "eq", label: "= (equals)" },
    { value: "in", label: "One of (comma-separated)" },
];

type SchemeType = Omit<SchemeForm, "tags"> & { _id: string; isActive: boolean; tags: string[] };
function SchemeCard({ scheme, onDelete, onEdit }: { scheme: SchemeType; onDelete: (id: string) => void; onEdit: (s: SchemeType) => void }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
            <div className="p-5 flex items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">{scheme.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${scheme.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                            {scheme.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{scheme.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scheme.shortDescription}</p>
                    <p className="text-xs text-muted-foreground mt-1">Ministry: {scheme.ministry}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={() => onEdit(scheme)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => onDelete(scheme._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    <button onClick={() => setExpanded(!expanded)} className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
                </div>
            </div>
            {expanded && (
                <div className="p-5 pt-0 border-t border-border/50 space-y-3 text-sm">
                    <p className="text-foreground leading-relaxed">{scheme.fullDescription}</p>
                    <div><span className="font-semibold">Benefits: </span><span className="text-muted-foreground">{scheme.benefits}</span></div>
                    {scheme.eligibilityCriteria?.length > 0 && (
                        <div>
                            <span className="font-semibold block mb-1">Eligibility Rules:</span>
                            <ul className="space-y-1">
                                {scheme.eligibilityCriteria.map((c: EligibilityRule, i: number) => (
                                    <li key={i} className="text-muted-foreground flex gap-2">
                                        <span className="text-primary">•</span>{c.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {scheme.requiredDocuments?.length > 0 && (
                        <div>
                            <span className="font-semibold block mb-1">Required Documents:</span>
                            <ul className="space-y-1">
                                {scheme.requiredDocuments.map((d: RequiredDoc, i: number) => (
                                    <li key={i} className="text-muted-foreground flex gap-2">
                                        <span className="text-primary">•</span>{d.name} {d.mandatory ? "(Required)" : "(Optional)"}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {scheme.deadline && <div><span className="font-semibold">Deadline: </span><span className="text-muted-foreground">{new Date(scheme.deadline).toLocaleDateString("en-IN")}</span></div>}
                    {scheme.applicationLink && <a href={scheme.applicationLink} target="_blank" rel="noreferrer" className="text-primary underline text-xs">Application Link →</a>}
                </div>
            )}
        </div>
    );
}

export default function AdminPage() {
    const [schemes, setSchemes] = useState<SchemeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<SchemeForm>(EMPTY_FORM);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [adminKeyInput, setAdminKeyInput] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const showToast = (type: "success" | "error", msg: string) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 4000);
    };

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/schemes");
            const data = await res.json();
            setSchemes(data.schemes || []);
        } catch { showToast("error", "Failed to load schemes"); }
        finally { setLoading(false); }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (authenticated) fetchSchemes(); }, [authenticated]);

    const handleSave = async () => {
        if (!form.title || !form.shortDescription || !form.ministry) {
            showToast("error", "Title, short description and ministry are required"); return;
        }
        setSaving(true);
        const payload = {
            ...form,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            deadline: form.deadline || undefined,
        };

        try {
            const url = editId ? `/api/schemes/${editId}` : "/api/schemes";
            const method = editId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", "x-admin-key": adminKeyInput },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) { showToast("error", data.error || "Save failed"); return; }
            showToast("success", editId ? "Scheme updated!" : "Scheme created!");
            setForm(EMPTY_FORM);
            setEditId(null);
            setShowForm(false);
            fetchSchemes();
        } catch { showToast("error", "Network error"); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this scheme?")) return;
        try {
            const res = await fetch(`/api/schemes/${id}`, { method: "DELETE", headers: { "x-admin-key": adminKeyInput } });
            if (!res.ok) { showToast("error", "Delete failed"); return; }
            showToast("success", "Scheme deleted");
            fetchSchemes();
        } catch { showToast("error", "Network error"); }
    };

    const handleEdit = (scheme: SchemeType) => {
        setForm({
            title: scheme.title, shortDescription: scheme.shortDescription,
            fullDescription: scheme.fullDescription, category: scheme.category,
            ministry: scheme.ministry, deadline: scheme.deadline ? scheme.deadline.split("T")[0] : "",
            benefits: scheme.benefits, applicationLink: scheme.applicationLink || "",
            tags: (scheme.tags || []).join(", "),
            eligibilityCriteria: scheme.eligibilityCriteria || [],
            requiredDocuments: scheme.requiredDocuments || [],
        });
        setEditId(scheme._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const addCriterion = () => setForm((f) => ({ ...f, eligibilityCriteria: [...f.eligibilityCriteria, { field: "annualIncome", operator: "lte", value: "", label: "" }] }));
    const removeCriterion = (i: number) => setForm((f) => ({ ...f, eligibilityCriteria: f.eligibilityCriteria.filter((_, j) => j !== i) }));
    const updateCriterion = (i: number, key: keyof EligibilityRule, val: string) =>
        setForm((f) => {
            const arr = [...f.eligibilityCriteria];
            arr[i] = { ...arr[i], [key]: val };
            return { ...f, eligibilityCriteria: arr };
        });

    const addDoc = () => setForm((f) => ({ ...f, requiredDocuments: [...f.requiredDocuments, { name: "", mandatory: true, note: "" }] }));
    const removeDoc = (i: number) => setForm((f) => ({ ...f, requiredDocuments: f.requiredDocuments.filter((_, j) => j !== i) }));
    const updateDoc = (i: number, key: keyof RequiredDoc, val: string | boolean) =>
        setForm((f) => {
            const arr = [...f.requiredDocuments];
            arr[i] = { ...arr[i], [key]: val };
            return { ...f, requiredDocuments: arr };
        });

    const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

    // Admin login gate
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><Shield size={24} /></div>
                        <div>
                            <h1 className="text-xl font-bold">Admin Access</h1>
                            <p className="text-sm text-muted-foreground">Enter admin key to continue</p>
                        </div>
                    </div>
                    <input
                        type="password"
                        placeholder="Admin Secret Key"
                        className={inputClass + " mb-4"}
                        value={adminKeyInput}
                        onChange={(e) => setAdminKeyInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && setAuthenticated(true)}
                    />
                    <button
                        onClick={() => setAuthenticated(true)}
                        className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Enter Admin Panel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 max-w-5xl mx-auto">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                    {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield size={20} className="text-primary" />
                        <h1 className="text-2xl font-bold">Admin Panel — Schemes</h1>
                    </div>
                    <p className="text-muted-foreground text-sm">{schemes.length} scheme{schemes.length !== 1 ? "s" : ""} in database</p>
                </div>
                <button
                    onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM); }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> New Scheme</>}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-soft space-y-5">
                    <h2 className="text-lg font-bold border-b border-border pb-3">{editId ? "Edit Scheme" : "Create New Scheme"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Scheme Title *</label>
                            <input type="text" className={inputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. PM Scholarship Scheme 2024" />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Short Description * (1–2 sentences)</label>
                            <input type="text" className={inputClass} value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Full Description *</label>
                            <textarea rows={4} className={inputClass} value={form.fullDescription} onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Category</label>
                            <select className={inputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Ministry / Department *</label>
                            <input type="text" className={inputClass} value={form.ministry} onChange={(e) => setForm((f) => ({ ...f, ministry: e.target.value }))} placeholder="e.g. Ministry of Education" />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Benefits (what the user gets)</label>
                            <textarea rows={2} className={inputClass} value={form.benefits} onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Deadline (optional)</label>
                            <input type="date" className={inputClass} value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Application Link (optional)</label>
                            <input type="url" className={inputClass} value={form.applicationLink} onChange={(e) => setForm((f) => ({ ...f, applicationLink: e.target.value }))} placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Tags (comma-separated)</label>
                            <input type="text" className={inputClass} value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="scholarship, education, SC/ST" />
                        </div>
                    </div>

                    {/* Eligibility Rules */}
                    <div>
                        <div className="flex justify-between items-center mb-3 border-t border-border pt-4">
                            <h3 className="font-semibold text-sm">Eligibility Criteria</h3>
                            <button onClick={addCriterion} className="text-xs flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                                <Plus size={14} /> Add Rule
                            </button>
                        </div>
                        <div className="space-y-3">
                            {form.eligibilityCriteria.map((c, i) => (
                                <div key={i} className="grid grid-cols-12 gap-2 items-start bg-muted/30 rounded-xl p-3 border border-border/50">
                                    <select className={inputClass + " col-span-3 text-xs"} value={c.field} onChange={(e) => updateCriterion(i, "field", e.target.value)}>
                                        {FIELDS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                                    </select>
                                    <select className={inputClass + " col-span-3 text-xs"} value={c.operator} onChange={(e) => updateCriterion(i, "operator", e.target.value)}>
                                        {OPERATORS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                    <input className={inputClass + " col-span-2 text-xs"} placeholder="Value" value={c.value} onChange={(e) => updateCriterion(i, "value", e.target.value)} />
                                    <input className={inputClass + " col-span-3 text-xs"} placeholder="Human-readable label" value={c.label} onChange={(e) => updateCriterion(i, "label", e.target.value)} />
                                    <button onClick={() => removeCriterion(i)} className="col-span-1 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"><X size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                        <div className="flex justify-between items-center mb-3 border-t border-border pt-4">
                            <h3 className="font-semibold text-sm">Required Documents</h3>
                            <button onClick={addDoc} className="text-xs flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                                <Plus size={14} /> Add Document
                            </button>
                        </div>
                        <div className="space-y-2">
                            {form.requiredDocuments.map((d, i) => (
                                <div key={i} className="grid grid-cols-12 gap-2 items-center bg-muted/30 rounded-xl p-3 border border-border/50">
                                    <input className={inputClass + " col-span-4 text-xs"} placeholder="Document name" value={d.name} onChange={(e) => updateDoc(i, "name", e.target.value)} />
                                    <input className={inputClass + " col-span-5 text-xs"} placeholder="Note (optional)" value={d.note} onChange={(e) => updateDoc(i, "note", e.target.value)} />
                                    <label className="col-span-2 flex items-center gap-1.5 text-xs cursor-pointer">
                                        <input type="checkbox" checked={d.mandatory} onChange={(e) => updateDoc(i, "mandatory", e.target.checked)} className="rounded" />
                                        Required
                                    </label>
                                    <button onClick={() => removeDoc(i)} className="col-span-1 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"><X size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }} className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
                            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {editId ? "Update Scheme" : "Create Scheme"}</>}
                        </button>
                    </div>
                </div>
            )}

            {/* Schemes List */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground">
                    <Loader2 size={32} className="animate-spin mr-3" /> Loading schemes...
                </div>
            ) : schemes.length === 0 ? (
                <div className="text-center py-20 bg-card border border-dashed border-border rounded-2xl text-muted-foreground">
                    <div className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4"><Shield size={28} className="opacity-40" /></div>
                    <p className="font-medium mb-1">No schemes yet</p>
                    <p className="text-xs">Click &quot;New Scheme&quot; above to create your first scheme</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {schemes.map((s) => <SchemeCard key={s._id} scheme={s} onDelete={handleDelete} onEdit={handleEdit} />)}
                </div>
            )}
        </div>
    );
}
