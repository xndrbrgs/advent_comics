import fs from "fs";
import path from "path";

export function getImageList(dir: string, extensions: string[]) {
    const fullPath = path.join(process.cwd(), "public", dir);
    return fs
        .readdirSync(fullPath)
        .filter((file) => extensions.some((ext) => file.endsWith(ext)))
        .map((file) => `/${dir}/${file}`);
}
