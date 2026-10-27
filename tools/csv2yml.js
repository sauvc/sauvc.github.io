// Converts a CSV export of registered teams into the format of src/content/teams/registered.yml.
// Usage: node csv2yml.js teams.csv > ../src/content/teams/registered.yml
const csv = require('csvtojson');
const YAML = require('yamljs');

// Columns copied into each team, in this order. Empty columns are left out.
const FIELDS = ['id', 'name', 'url', 'institute', 'institute-url', 'location', 'flag'];

csv()
  .fromFile(process.argv[2])
  .then((rows) => {
    const teams = rows.map((row) =>
      Object.fromEntries(FIELDS.filter((f) => row[f]).map((f) => [f, row[f]])),
    );
    console.log('open: false\nteams:');
    console.log(YAML.stringify(teams, 4));
  });
