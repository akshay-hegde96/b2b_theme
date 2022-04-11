import React, { useState, useEffect } from "react";
import styles from './BlogListing.css'
import { blogAPI } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
import { useProduct } from "vtex.product-context";
import {
  useSearchPageState,
  useSearchPage,
  useSearchPageStateDispatch,
} from 'vtex.search-page-context/SearchPageContext'


const BlogsListing = (props) => {
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const productContextValue = useProduct();
  console.log(productContextValue);
  useEffect(() => {
    //BlogURL = "api/dataentities/CB/search?_fields=_all&_schema=CustomBlog"
    const getBlogs = async () => {
      const response = await makeAPICall(blogAPI, "GET");
      console.log(response)
      setBlogs([...response])
    }
    getBlogs();
  }, [])

  const showMore = () => {
    window.location = '/blogs'
  }

  useEffect(() => {
    const getPLPPage = () => {
      var Data = window.location.pathname;
      console.log(Data);
      const categoryData = Data.split('/')[1];
      console.log(categoryData);
      setCategory(categoryData);
    };
    getPLPPage();
  }, []);

  const { pagination, searchQuery } = useSearchPage();
  const categoryName = searchQuery?.data?.searchMetadata?.titleTag;
  console.log("Category :");
  console.log(categoryName);

  return (
    <>
      <div className={styles.blogHeader}>
        <h1>Blogs</h1>
        <div className={styles.showmoreBtn}><button onClick={showMore} className={styles.button} >show More &#62;</button></div>
      </div>

      <div className={styles.blogContainer}>
        {blogs.filter((blogs) => blogs.category === categoryName).map((blogs) => {
          return (
            <div className={styles.blog} key={blogs.id}>
              <div className={styles.imageWrapper}>
                <img src={blogs.mainImage} alt={blogs.displayName + " Banner Image"} className={styles.blogImage} />
              </div>
              <div className={styles.contentWrappper} >
                <p className={styles.date}>{blogs.createdIn}</p>
                <p className={styles.author}> {"by " + blogs.author}</p>
                <p>{"# "}<span className={styles.category}>{blogs.category}</span></p>
                <h3 className={styles.blogTitle}>
                  {blogs.displayName}
                </h3>
                <p className={styles.shortDescription}>
                  {blogs.shortDescription}
                </p>
                {blogs.documentLink &&
                  <a href={blogs.documentLink} title="Document Link" target={"_blank"} className="primary">Document Link</a>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BlogsListing