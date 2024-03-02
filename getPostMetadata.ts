import fs from "fs";
import { Locale } from "./i18n-config";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";

const getPostMetaData = (
  lang: Locale,
  related: boolean,
  actual?: any
): PostMetadata[] => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  
  let posts = files.map((filename) => {
    const fileContents = fs.readFileSync(
      `posts/${filename}/${lang}/${filename}.md`,
      "utf8"
    );
    const matterResult = matter(fileContents);
    if (related && filename == actual) { 
      return {
        title: '',
        subtitle:  '',
        description:  '',
        slug:  '',
        date: "",
        image: '',
        likes: 0
      };
    }
    else {
     
      return {
        title: matterResult.data.title,
        subtitle: matterResult.data.subtitle,
        description: matterResult.data.title,
        slug: filename,
        date: matterResult.data.date,
        image: matterResult.data.image == './css1.png' ? './css.png': matterResult.data.image,
        likes: matterResult.data.likes,
      };
    }
  });

  return posts;
};

export default getPostMetaData;
