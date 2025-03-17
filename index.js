import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const app = express();
const PORT = "8000";

app.use(cors());
app.use(express.json());

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const loadTranslation = (lang) => {
  let filePath;

  try {
    filePath = join(__dirname, "translations", `${lang}.json`);
    const translations = JSON.parse(readFileSync(filePath, "utf8"));
    return translations;
  } catch (err) {
    console.error(err);

    const defaultTranslations = JSON.parse(
      readFileSync(join(__dirname, "translations", `en.json`), "utf8")
    );
    return defaultTranslations;
  }
};

app.get("/api/translations/:lng", (req, res) => {
  const { lng } = req?.params;
  const translations = loadTranslation(lng !== "dev" && lng);
  return res.json(translations);
});

app.get("/api/lng", (req, res) => {
  return res.json({ lng: "en" });
});

app.listen(PORT, () => {
  console.log(`your app started successfully and is running at port: ${PORT}`);
});
