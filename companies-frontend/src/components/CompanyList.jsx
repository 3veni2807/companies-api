import React, { useEffect, useState } from "react";
import { getCompanies } from "../services/api";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ name: "", location: "" });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const data = await getCompanies(filters);
    setCompanies(data.companies);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchCompanies();
  };

  return (
    <div>
      <h2>Companies</h2>

      <div className="filters">
        <input
          name="name"
          placeholder="Company Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Employees</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.industry}</td>
                <td>{c.location}</td>
                <td>{c.employees}</td>
                <td>
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noreferrer">
                      {c.website}
                    </a>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
