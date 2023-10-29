import Link from "next/link";
import getPostMetaData from "../getPostMetadata";
import { PostMetadata } from "../PostMetadata";

const Postpreview = (props: PostMetadata) => {
  return ( 
      <Link className="text-left card-post" href={`/${props.slug}`}>
        <img 
          className="mr-20 mt-14 absolute"
          alt={props.title}
          title={props.title}
          src={props.image}
          width={80}
          height={80}
        />
        <div className="containerCard relative ml-20 pl-4">
          <h2 className="mx-auto light:text-gray-800 mb-2 mt-14 dark:text-white max-w-4xl font-display text-2xl font-bold tracking-normal text-gray-800">
            {props.title}
          </h2>
          <p style={{opacity: '.7'}}>{props.date}</p>
        </div>
      </Link> 
  );
};

export default Postpreview;
