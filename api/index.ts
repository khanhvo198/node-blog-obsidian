import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fm from "front-matter";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const postsDirectory: string = path.join(process.cwd(), "blog-obsidian/posts");

interface PostFrontMatter {
  title: string;
  description: string;
  tags: string[];
  date: Date;
  public: boolean;
}

app.use(cors());

app.use("/images", express.static(process.cwd() + "/blog-obsidian/images"));

app.get("/api/posts", (req: Request, res: Response) => {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { attributes } = fm<PostFrontMatter>(content);

      return {
        title: attributes.title,
        description: attributes.description,
        tags: attributes.tags,
        date: attributes.date,
        slug: file.replace(".md", ""),
        public: attributes.public,
      };
    })
    .filter((post) => post.public);
  res.send({ posts });
});

app.get("/api/posts/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const content = fs.readFileSync(filePath, "utf-8");
  const { body } = fm(content);

  // replace image with real url
  const imageUrlRegex =
    /!\[(?<alt>[^\]]*)\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
  const post = body.replaceAll(
    imageUrlRegex,
    `![$<alt>](https://whatwegonnadotoday-backend.vercel.app/images/$<filename>)`,
  );

  res.send({
    content: post,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
