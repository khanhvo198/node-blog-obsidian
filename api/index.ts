import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fm from "front-matter";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// const postsDirectory: string = path.join(__dirname, "blog-obsidian/posts");

interface PostFrontMatter {
  title: string;
  description: string;
  tags: string[];
  date: Date;
}

app.use(cors());

// app.get("/api/posts", (req: Request, res: Response) => {
//   const files = fs.readdirSync(postsDirectory);
//
//   const posts = files
//     .filter((file) => file.endsWith(".md"))
//     .map((file) => {
//       const filePath = path.join(postsDirectory, file);
//       const content = fs.readFileSync(filePath, "utf-8");
//       const { attributes } = fm<PostFrontMatter>(content);
//
//       return {
//         title: attributes.title,
//         description: attributes.description,
//         tags: attributes.tags,
//         date: attributes.date,
//         slug: file.replace(".md", ""),
//       };
//     });
//   res.send({ posts });
// });
//
// app.get("/api/posts/:slug", (req: Request, res: Response) => {
//   const { slug } = req.params;
//   const filePath = path.join(postsDirectory, `${slug}.md`);
//   const content = fs.readFileSync(filePath, "utf-8");
//   const { body } = fm(content);
//
//   res.send({
//     content: body,
//   });
// });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
