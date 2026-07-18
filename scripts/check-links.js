/* global console, process */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Directories/files to check for markdown files
const FILES_TO_CHECK = [
  path.join(
    ROOT_DIR,
    "Portfolio Architecture & Engineering Handbook 2e6dfc6171c0423a8fc61d2f398ece49.md"
  ),
  path.join(ROOT_DIR, "README.md"),
];

const DOCS_DIR = path.join(ROOT_DIR, "docs");

// Recursively find markdown files in a directory
function findMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  }
  return results;
}

// Gather all markdown files to audit
const mdFiles = [...FILES_TO_CHECK, ...findMarkdownFiles(DOCS_DIR)].filter((file) =>
  fs.existsSync(file)
);

let exitCode = 0;

console.log(`Checking links in ${mdFiles.length} markdown files...`);

// Regex for Markdown links: [Text](URL)
const MARKDOWN_LINK_REGEX = /\[([^\]]*?)\]\(([^)]+?)\)/g;

for (const file of mdFiles) {
  const relativeFile = path.relative(ROOT_DIR, file);
  const content = fs.readFileSync(file, "utf-8");
  const fileDir = path.dirname(file);

  let match;
  while ((match = MARKDOWN_LINK_REGEX.exec(content)) !== null) {
    const linkText = match[1];
    let linkUrl = match[2].trim();

    // Skip empty links or external web URLs
    if (
      !linkUrl ||
      linkUrl.startsWith("http://") ||
      linkUrl.startsWith("https://") ||
      linkUrl.startsWith("mailto:") ||
      linkUrl.startsWith("#")
    ) {
      continue;
    }

    // 1. Check for prohibited absolute local paths (e.g. file:///c:)
    if (linkUrl.startsWith("file:///")) {
      console.error(
        `\x1b[31m[ERROR]\x1b[0m In ${relativeFile}: Prohibited absolute link "${linkUrl}" found for text "${linkText}". Use relative paths.`
      );
      exitCode = 1;
      continue;
    }

    // Decode URL encoded characters (like %20 for spaces)
    linkUrl = decodeURIComponent(linkUrl);

    // Remove any anchor fragments (e.g. #section-name) from the path calculation
    const cleanLinkUrl = linkUrl.split("#")[0];
    if (!cleanLinkUrl) {
      continue; // It was just an anchor on the same page
    }

    // Calculate absolute path of the target link
    const targetPath = path.resolve(fileDir, cleanLinkUrl);

    // Check if target file/directory exists
    if (!fs.existsSync(targetPath)) {
      console.error(
        `\x1b[31m[ERROR]\x1b[0m In ${relativeFile}: Broken link to "${linkUrl}" (resolved target path does not exist: "${path.relative(ROOT_DIR, targetPath)}")`
      );
      exitCode = 1;
    }
  }
}

if (exitCode === 0) {
  console.log("\x1b[32m[SUCCESS]\x1b[0m All documentation links are verified and portable!");
} else {
  console.error(
    "\x1b[31m[FAILURE]\x1b[0m Broken or absolute links found in documentation. Please fix them."
  );
}

process.exit(exitCode);
