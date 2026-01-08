import { Link } from "react-router-dom";
import placeholder from "../../assets/blog/blog-cover-temp.png";
import styles from "./blog.module.css";

const BlogLink = () => {
  return (
    <div>
      <Link to="/blog" className={styles.blogLink}>
        <img
          src={placeholder}
          alt="blog cover art"
          className={styles.linkImg}
        />
        <div>
          <h1 className={styles.linkTitle}>This is a blog title. A blog title it is.</h1>
          <h3 className={styles.linkDate}>2066 July</h3>
        </div>
      </Link>
    </div>
  );
};

export default BlogLink;
