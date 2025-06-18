import fs from "node:fs";
import process from "node:process";
import path from "node:path";

const content = fs.readFileSync(path.join(process.cwd(), `settings.yaml`)).toString();
const output = ["/*! @settings\n", content.toString(), "*/\n"].join("\n");
const current = fs.readFileSync(path.join(process.cwd(), "src/scss/settings.scss")).toString();

if (output !== current) {
  fs.writeFileSync(path.join(process.cwd(), `src/scss/settings.scss`), output);
}
