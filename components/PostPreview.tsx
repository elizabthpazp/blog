import Link from "next/link";
import getPostMetaData from "../getPostMetadata";
import { PostMetadata } from "../PostMetadata";

const Postpreview = (props: PostMetadata) =>{
    return(
        <div> 
      <Link href={`/${props.slug}`}> 
      <h2>{props.title}</h2>
      </Link>
     </div>
    )
}

export default Postpreview;