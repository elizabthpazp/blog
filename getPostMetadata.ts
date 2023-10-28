import fs from "fs"; 
import { Locale } from "./i18n-config";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";

const getPostMetaData=(lang: Locale): PostMetadata[]=>{ 
    const folder = 'posts/'  
    const files = fs.readdirSync(folder); 
  
    const posts = files.map((filename)=>{ 
      const fileContents = fs.readFileSync(`posts/${filename}/${lang}/${filename}.md`, 'utf8'); 
      const matterResult = matter(fileContents);
      return{
        title: matterResult.data.title,
        description: matterResult.data.title,
        slug: filename 
      }
    })  
    return posts;
  }

  export default getPostMetaData;