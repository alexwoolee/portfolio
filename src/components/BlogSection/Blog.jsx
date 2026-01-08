import styles from "./blog.module.css";
import BlogLink from "./BlogLink.jsx";
import Footer from "../ui/Footer.jsx";

const Blog = () => {
  return (
    <div className={`${styles.content} wrapper`}>
      <BlogLink />
      <BlogLink />
      <BlogLink />
      <BlogLink />
      <BlogLink />
      
      <Footer />
    </div>
  );
};

export default Blog;
