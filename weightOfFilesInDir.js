import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { argv } from "node:process";

const dinamicPath = argv[2];

const INPUT_DIR = dinamicPath ?? "./images";

const formatSize = (bytes) => (bytes / 1024).toFixed(2) + " KB";
/**
 * скрипт для проверки веса файлов в папке
 */
async function measureFiles() {
  try {
    const files = await readdir(INPUT_DIR);
    let totalSize = 0;

    console.log(`📂 Анализ папки: ${INPUT_DIR}\n`);

    for (const file of files) {
      const filePath = join(INPUT_DIR, file);
      const stats = await stat(filePath);

      if (stats.isFile()) {
        totalSize += stats.size;
        console.log(`📄 ${file.padEnd(30)} | ${formatSize(stats.size)}`);
      }
    }

    console.log("\n" + "=".repeat(45));
    console.log(
      `Общий вес: ${formatSize(totalSize)} (${(totalSize / (1024 * 1024)).toFixed(2)} MB)`
    );
  } catch (err) {
    console.error("❌ Ошибка:", err.message);
  }
}

await measureFiles();
