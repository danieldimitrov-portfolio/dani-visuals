const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password -- "your-new-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// Next.js's env loader expands "$name" references even inside quoted .env values,
// which silently corrupts raw bcrypt hashes. Escaping "$" as "\$" keeps it literal.
const escapedForDotEnv = hash.replace(/\$/g, "\\$");

console.log("\nADMIN_PASSWORD_HASH for your .env file (dollar signs pre-escaped):\n");
console.log(`ADMIN_PASSWORD_HASH="${escapedForDotEnv}"\n`);
console.log("For Vercel's env var UI (no shell escaping there - paste the raw hash instead):\n");
console.log(hash + "\n");
