import { build } from "vite";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const collect = async (directory) => {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await collect(file)));
    else if (/\.(js|css)$/.test(file)) {
      const content = await readFile(file);
      result.push({
        file: path.relative("dist", file),
        kind: path.extname(file).slice(1),
        rawBytes: content.length,
        gzipBytes: gzipSync(content).length,
      });
    }
  }
  return result;
};
const reports = [];
for (const library of ["stylex", "tailwind"]) {
  const start = performance.now();
  await build({ mode: library });
  const buildMs = performance.now() - start;
  const assets = await collect(`dist/bench/${library}`);
  reports.push({
    library,
    buildMs,
    assets,
    totals: Object.fromEntries(
      ["js", "css"].map((kind) => [
        kind,
        assets
          .filter((a) => a.kind === kind)
          .reduce(
            (sum, a) => ({
              rawBytes: sum.rawBytes + a.rawBytes,
              gzipBytes: sum.gzipBytes + a.gzipBytes,
            }),
            { rawBytes: 0, gzipBytes: 0 },
          ),
      ]),
    ),
  });
}
const pkg = JSON.parse(await readFile("package.json", "utf8"));
await writeFile(
  "dist/build-report.json",
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      versions: { ...pkg.dependencies, ...pkg.devDependencies },
      note: "One sequential build per library; includes shared React and benchmark harness. Gzip is computed per file, not network transfer size.",
      reports,
    },
    null,
    2,
  ),
);
console.log("Build report: dist/build-report.json");
