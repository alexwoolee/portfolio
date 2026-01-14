import { Link } from "react-router-dom";
import styles from "./blog.module.css";

const BlogLink = ({ id, title, date, cover }) => {
  return (
    <div>
      <Link to={`/blog/${id}`} className={styles.blogLink}>
        <img
          src={cover}
          alt="blog cover art"
          className={styles.linkImg}
        />
        <div>
          <h1 className={styles.linkTitle}>{title}</h1>
          <h3 className={styles.linkDate}>{date}</h3>
        </div>
      </Link>
    </div>
  );
};

export default BlogLink;
