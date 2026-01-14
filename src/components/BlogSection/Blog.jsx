/* Styles */
import styles from "./blog.module.css";
/* Components */
import BlogLink from "./BlogLink.jsx";
import Footer from "../ui/Footer.jsx";
/* Libraries */
import matter from "gray-matter";

const Blog = () => {
  // Imports all .md files as raw text strings (including frontmatter).
  // Result: { filePath: "entire markdown file as a string", ... }
  const rawPostFiles = import.meta.glob("../../_posts/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  })

  // Gets list of paths
  const postPaths = Object.keys(rawPostFiles)
  // Create array of postObjs to feed to gray-matter library
  // Use gray-matter library to convert md with front-matter to object
  const postObjs = postPaths.map((path) => {
    // Get raw string from the object using the path
    const rawString = rawPostFiles[path]
    const resultObject = matter(rawString)
    // file name acts as id without '.md' extension
    resultObject.id = path.split("/").at(-1).replace(".md", "")
    // resultobject contains three members
    // data (frontmatter (title, date, etc.)), content (blog text), & id
    return resultObject
  })

  return (
    <div className={`${styles.content} wrapper`}>
      {/* For every object in postObjs array, create a BlogLink Component */}
      {postObjs.map((postObj) => {
        /* Curly braces {} in arrow function =? must use keyword return */
        return (
          <BlogLink
            key={postObj.id}
            id={postObj.id}
            title={postObj.data.title}
            date={postObj.data.date}
            cover={postObj.data.cover}
          />
        )
      })}
      <Footer />
    </div>
  );
};

export default Blog;
