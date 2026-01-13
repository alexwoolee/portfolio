import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import matter from "gray-matter";

const BlogPage = () => {
  // Grab the ID from the URL
  const { id } = useParams();
  // Use import.meta.glob to get the files
  const rawPostFiles = import.meta.glob("../../_posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const postPaths = Object.keys(rawPostFiles);

  // Find the one file where the path matches the ID
  const matchedPath = postPaths.find((path) => path.endsWith(`${id}.md`));

  if (!matchedPath) {
    return <h1>Post not found!</h1>;
  }

  const rawString = rawPostFiles[matchedPath];
  const post = matter(rawString);

  return (
    <div>
      {/* Standard HTML for the frontmatter */}
      <h1>{post.data.title}</h1>
      {/* <p>{post.data.date}</p> */}

      <hr />

      {/* Markdown translator for the body text */}
      <Markdown>{post.content}</Markdown>
    </div>
  );
};

export default BlogPage;
