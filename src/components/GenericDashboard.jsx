import React from "react";

export default function GenericDashboard({ title }) {
  return (
    <div>
      <h2 style={{ marginBottom: "12px" }}>{title}</h2>
      <p style={{ color: "#6b7280" }}>
        Analytics and insights will appear here.
      </p>
    </div>
  );
}
