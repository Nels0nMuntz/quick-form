import fs from "node:fs";
import { resolve } from "path";
import { NextFunction, Request, Response } from "express";
import { generateHTML } from "@tiptap/html";
import { StarterKit } from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { ApiResponse } from "../utils";
const { writeFile, readFile } = fs.promises;

interface Form {
  id: string;
  name: string;
  config: FormConfig;
  createdAt: string;
  updatedAt?: string;
  endsAt?: string;
}

interface FormConfig {
  title: object;
  description?: object;
}

const getJson = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await readFile(resolve(__dirname, "form.txt"), "utf-8");
    ApiResponse.sendSuccessResponse({
      res,
      status: 200,
      data: JSON.parse(config),
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const config = req.body as FormConfig;
    const form: Form = {
      id: "123",
      name: "Some name",
      createdAt: new Date().toISOString(),
      config,
    }
    await writeFile(resolve(__dirname, "form.txt"), JSON.stringify(form), {
      encoding: "utf-8",
    });
    ApiResponse.sendSuccessResponse({
      res,
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getHtml = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const configString = await readFile(
      resolve(__dirname, "config.txt"),
      "utf-8"
    );
    const configJson = JSON.parse(configString) as FormConfig;
    const title = generateHTML(configJson.title, [StarterKit]);
    const description = configJson.description
      ? generateHTML(configJson.description, [StarterKit, Underline])
      : "";
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple HTML Document</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is a simple HTML document.</p>
        <div style="padding: 12px; border: 1px solid #ccc;">
        ${title}
        ${description}
        </div>
    </body>
    </html>
  `;
    res.send(htmlContent);
  } catch (error) {
    next(error);
  }
};

export { getJson, create, getHtml };
