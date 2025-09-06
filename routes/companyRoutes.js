const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);
    const saved = await company.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { name, industry, location, minEmployees, maxEmployees, page = 1, limit = 20, sort } = req.query;

    const query = {};

    if (name) query.name = new RegExp(name, "i");          
    if (industry) query.industry = new RegExp(industry, "i");
    if (location) query.location = new RegExp(location, "i");
    if (minEmployees) query.employees = { ...query.employees, $gte: Number(minEmployees) };
    if (maxEmployees) query.employees = { ...query.employees, $lte: Number(maxEmployees) };

    const pageNum = Math.max(1, Number(page));
    const lim = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * lim;

    const total = await Company.countDocuments(query);
    const companies = await Company.find(query)
      .sort(sort || "-createdAt")
      .skip(skip)
      .limit(lim);

    res.json({
      total,
      page: pageNum,
      pages: Math.ceil(total / lim),
      companies
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Company not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Company not found" });
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
