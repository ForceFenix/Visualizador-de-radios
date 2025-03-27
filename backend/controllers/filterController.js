const fs = require('fs');
const path = require('path');
const filtersPath = path.join(__dirname, '..', 'data', 'filters.json');

const readFilters = () => {
  if (!fs.existsSync(filtersPath)) return [];
  const raw = fs.readFileSync(filtersPath);
  return JSON.parse(raw);
};

const writeFilters = (filters) => {
  fs.writeFileSync(filtersPath, JSON.stringify(filters, null, 2));
};

exports.getFilters = (req, res) => {
  const filters = readFilters();
  res.json(filters);
};

exports.addFilter = (req, res) => {
  const filters = readFilters();
  const newFilter = req.body;
  filters.push(newFilter);
  writeFilters(filters);
  res.status(201).json(newFilter);
};

exports.updateFilter = (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  let filters = readFilters();
  filters = filters.map(f => f.id === id ? updated : f);
  writeFilters(filters);
  res.json(updated);
};

exports.deleteFilter = (req, res) => {
  const { id } = req.params;
  let filters = readFilters();
  filters = filters.filter(f => f.id !== id);
  writeFilters(filters);
  res.json({ message: 'Filtro eliminado' });
};