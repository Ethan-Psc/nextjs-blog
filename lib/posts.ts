import fs from "fs";
import path from "path";
import matter from "gray-matter";
import html from "remark-html";
import { remark } from "remark";
interface PostData {
  id: string;
  date: string;
  contentHtml: string;
  title: string;
}
const postsDir = path.join(process.cwd(), "posts");
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDir, fileName);
    const fullContents = fs.readFileSync(fullPath);
    const matterResult = matter(fullContents);
    const fileStatus = fs.statSync(fullPath);
    if (typeof matterResult.data.title === "undefined") {
      matterResult.data.title = id;
    }
    if (typeof matterResult.data.date === "undefined") {
      matterResult.data.date = fileStatus.mtime.toISOString();
    }
    return {
      id,
      ...matterResult.data,
    } as PostData;
  });
  return allPostsData.sort((a: PostData, b: PostData) => {
    if (a.date < b.date) return 1;
    else if (a.date === b.date) return 0;
    else return -1;
  });
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostsData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fullContents = fs.readFileSync(fullPath);
  const matterResult = matter(fullContents);
  const processContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
