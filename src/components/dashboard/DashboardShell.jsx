import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function DashboardShell({ data }) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        {data.title}
      </motion.h1>

      {/* TOP PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

        {/* Completion */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Onboarding Completion</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.completion} dataKey="value" innerRadius={70} outerRadius={100}>
                <Cell fill="#6366F1" />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-2xl font-bold text-indigo-600">
            {data.completion[0].value}% Completed
          </p>
        </div>

        {/* Risk */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Needs Attention</h2>
          <ul className="space-y-3">
            {data.risks.map((r, i) => (
              <li key={i} className="flex justify-between">
                <span>{r.label}</span>
                <span className={`font-bold ${r.color}`}>{r.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Smart Insights</h2>
          {data.insights.map((i, idx) => (
            <p key={idx} className="mt-2">{i}</p>
          ))}
        </div>
      </div>

      {/* DOMAIN PERFORMANCE */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.performance}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FUNNEL */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Onboarding Funnel</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.funnel}>
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
