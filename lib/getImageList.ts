// lib/getImageList.ts
import fs from "fs";
import path from "path";

export function getImageList(): string[] {
  const folders = ["backgrounds/nitrous-sedation", "npc"];
  const extensions = [".svg", ".webp", ".png", ".jpg", ".jpeg", ".gif"];
  const publicDir = path.join(process.cwd(), "public");

  let imagePaths: string[] = [];

  folders.forEach((folder) => {
    const fullPath = path.join(publicDir, folder);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      files.forEach((file) => {
        if (extensions.some((ext) => file.endsWith(ext))) {
          imagePaths.push(`/${folder}/${file}`);
        }
      });
    }
  });

  return imagePaths;
}
