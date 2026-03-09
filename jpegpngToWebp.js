import { mkdir, readdir } from "node:fs/promises";
import { extname, join, parse } from "node:path";
import { argv } from "node:process";
import sharp from "sharp";

// -------------------------------------- FLAGS --------------------------------------
const FLAGS = {
  inputFile: "--inputFile",
  inputDir: "--inputDir",
  outputDir: "--outputDir",
  png: "--png",
  jpg: "--jpg",
};

const inputFilePath = argv
  .find((flag) => flag.startsWith(`${FLAGS.inputFile}:`))
  ?.split?.(":")?.[1];
const inputFileDir = inputFilePath ? parse(inputFilePath).dir : null;
const inputDir = argv.find((flag) => flag.startsWith(`${FLAGS.inputDir}:`))?.split?.(":")?.[1];
const outputDir = argv.find((flag) => flag.startsWith(`${FLAGS.outputDir}:`))?.split?.(":")?.[1];

const isWithoutExtFlags = !argv.some((flag) => flag === FLAGS.png || flag === FLAGS.jpg);
const pngFlag = inputFilePath || isWithoutExtFlags || argv.includes("--png");
const jpgFlag = inputFilePath || isWithoutExtFlags || argv.includes("--jpg");

//-----------------------------------------------------------------------------------------------

const CONFIG = {
  inputDir: inputFileDir ?? inputDir ?? "./images/results",
  outputDir: outputDir ?? inputFileDir ?? inputDir ?? "./images/results",
  // Общие настройки
  quality: 80,
  effort: 6,
  // Настройки для PNG (логотипы, графика)
  pngOptions: {
    smartSubsample: true, // Предотвращает размытие ярких цветов на границах
    alphaQuality: 90, // Высшее качество для полупрозрачных областей
  },
};

async function batchConvert() {
  try {
    await mkdir(CONFIG.outputDir, { recursive: true });

    const files = inputFilePath ? [inputFilePath] : await readdir(CONFIG.inputDir);
    const targets = files.filter(
      (f) =>
        (pngFlag && jpgFlag && /\.(jpe?g|png)$/i.test(extname(f))) ||
        (pngFlag && /\.(png)$/i.test(extname(f))) ||
        (jpgFlag && /\.(jpe?g)$/i.test(extname(f)))
    );
    console.log({ files });

    console.log(`🚀 Найдено изображений: ${targets.length}`);

    const promises = targets.map(async (file) => {
      const ext = extname(file).toLowerCase();
      const inputPath = join(CONFIG.inputDir, `${parse(file).name}${parse(file).ext}`);
      const outputPath = join(CONFIG.outputDir, `${parse(file).name}.webp`);
      console.log({ inputPath, outputPath });
      // Базовый конфиг
      const webpConfig = {
        quality: CONFIG.quality,
        effort: CONFIG.effort,
      };

      // Умная надстройка для PNG
      if (ext === ".png") {
        Object.assign(webpConfig, CONFIG.pngOptions);
      }

      await sharp(inputPath).webp(webpConfig).toFile(outputPath);

      return `✔ ${file} (${ext}) -> done`;
    });

    const results = await Promise.all(promises);
    results.forEach((msg) => console.log(msg));

    console.log("✨ Конвертация завершена!");
  } catch (err) {
    console.error("❌ Ошибка:", err.message);
  }
}

await batchConvert();
