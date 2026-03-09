import ffmpeg from "fluent-ffmpeg";
import { mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const CONFIG = {
  inputVideo: "./videos/video.MP4", // Исходник (тяжелый)
  outputDir: "./videos",
  mobileWidth: 720, // Оптимально для телефонов
  desktopWidth: 1920, // Full HD для ПК
};

/**
 * Обертка для конвертации с заданными параметрами
 */
function processVideo(input, output, width, typeOfDevice = "mobile") {
  return new Promise((resolve, reject) => {
    // Этот фильтр впишет видео в квадрат 1920x1920 (или 720x720), сохраняя пропорции
    const smartScale = (w) => `scale='if(gt(iw,ih),${w},-2)':'if(gt(iw,ih),-2,${w})'`;

    // Для десктопа (max 1920px по большей стороне)
    const desktopFilter = smartScale(1920);

    // Для мобилки (max 720px по большей стороне)
    const mobileFilter = smartScale(720);

    const videoOptions = (() => {
      if (typeOfDevice === "mobile")
        return [
          "-c:v libvpx-vp9",
          "-crf 22",
          "-b:v 0",
          "-deadline best",
          "-cpu-used 1",
          "-an",
          `-vf ${mobileFilter}`,
        ]; // Мобилка: жесткое сжатие, без звука
      if (typeOfDevice === "desktop")
        return [
          "-c:v libvpx-vp9",
          "-crf 26",
          "-b:v 0",
          "-deadline best",
          "-cpu-used 1",
          "-an",
          `-vf ${desktopFilter}`,
        ]; // Десктоп: баланс качества

      return [
        "-c:v libx264", // Явно указываем кодек
        "-crf 22",
        "-preset slow",
        "-profile:v high", // Добавляем профиль High
        "-level:v 4.2", // Добавляем уровень для Full HD
        "-pix_fmt yuv420p", // СТРОГО ОБЯЗАТЕЛЬНО для совместимости
        "-movflags +faststart",
        "-an",
        `-vf ${desktopFilter}`,
      ];
    })();

    ffmpeg(input)
      .outputOptions(videoOptions)
      .on("start", () => console.log(`🚀 Начало: ${width}p (${typeOfDevice})`))
      .on("end", () => {
        console.log(`✅ Готово: ${output}`);
        resolve();
      })
      .on("error", (err) => reject(err))
      .save(output);
  });
}

async function createResponsiveVideos() {
  try {
    await mkdir(CONFIG.outputDir, { recursive: true });
    const name = parse(CONFIG.inputVideo).name;

    console.log("🎬 Запуск генерации адаптивного видео...");

    // Запускаем задачи. На слабых ПК лучше делать через await по очереди, а не Promise.all
    await Promise.all([
      // 1. Версия для ПК (WebM VP9)
      processVideo(
        CONFIG.inputVideo,
        join(CONFIG.outputDir, `${name}-desktop.webm`),
        CONFIG.desktopWidth,
        "desktop"
      ),
      // 2. Версия для Мобильных (WebM VP9)
      processVideo(
        CONFIG.inputVideo,
        join(CONFIG.outputDir, `${name}-mobile.webm`),
        CONFIG.mobileWidth,
        "mobile"
      ),
      processVideo(
        CONFIG.inputVideo,
        join(CONFIG.outputDir, `${name}-optimized.mp4`),
        CONFIG.desktopWidth,
        "optimized"
      ),
    ]);

    console.log("✨ Все версии созданы успешно!");
  } catch (err) {
    console.error("❌ Ошибка конвертации:", err.message);
  }
}

await createResponsiveVideos();
