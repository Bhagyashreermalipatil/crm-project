import React, { useState, useEffect } from "react";
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Advanced CRM Dashboard</h1>
      <p>Role: {role}</p>

      {dashboard && (
        <div>
          <h3>Total Leads: {dashboard.totalLeads}</h3>
          <p>Conversion Rate: {dashboard.conversionRate}%</p>
          <p>
            New: {dashboard.stages.New} | Contacted: {dashboard.stages.Contacted} |
            Qualified: {dashboard.stages.Qualified} | Closed: {dashboard.stages.Closed}
          </p>
        </div>
      )}

      <div>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select value={stage} onChange={(e) => setStage(e.target.value)}>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Closed</option>
        </select>
        <button onClick={addLead}>Add Lead</button>
      </div>

      <input
        placeholder="Search leads"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filteredLeads.map((lead, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
            <h3>{lead.name}</h3>
            <p>{lead.email}</p>

            <select
              value={lead.stage}
              onChange={(e) => updateStage(index, e.target.value)}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Closed</option>
            </select>

            <button onClick={() => deleteLead(index)}>Delete</button>
            <button onClick={() => setSelectedLead(index)}>View Activity</button>

            {selectedLead === index && (
              <div>
                <h4>Activity Log</h4>
                {lead.activityLog.map((log, i) => (
                  <p key={i}>
                    {log.type}: {log.message} ({new Date(log.date).toLocaleString()})
                  </p>
                ))}
                <input
                  placeholder="Add activity"
                  value={activityMessage}
                  onChange={(e) => setActivityMessage(e.target.value)}
                />
                <button onClick={() => addActivity(index)}>Log Activity</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;