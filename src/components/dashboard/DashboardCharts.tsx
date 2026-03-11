"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const pieData = [
    { name: "Submitted", value: 60, color: "#3b82f6" },
    { name: "In Progress", value: 25, color: "#10b981" },
    { name: "Rejected", value: 15, color: "#ef4444" },
];

const barData = [
    { name: "Scholarships", value: 4 },
    { name: "Insurance", value: 7 },
    { name: "Gov Aid", value: 3 },
];

export function DashboardCharts() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-[260px] animate-pulse" /><div className="bg-card rounded-2xl p-6 shadow-soft border border-border h-[260px] animate-pulse" /></div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border flex flex-col items-center">
                <h3 className="font-semibold text-foreground mb-2 self-start">Form Status</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
                                itemStyle={{ color: 'var(--foreground)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="font-semibold text-foreground mb-2">Policies Checked This Month</h3>
                <div className="h-64 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.5 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.5 }} />
                            <Tooltip
                                cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                            />
                            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#10b981" : "#3b82f6"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
