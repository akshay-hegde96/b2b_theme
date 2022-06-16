import React, { useState, useEffect } from "react";
import styles from './BlogSEO.css'
import { blogSEOAPI } from "../../Config/url";
import { makeAPICall } from "../../Utils/httpCall";
import { useProduct } from "vtex.product-context";
import {
  useSearchPageState,
  useSearchPage,
  useSearchPageStateDispatch,
} from 'vtex.search-page-context/SearchPageContext'


const BlogSEO = (props) => {
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const productContextValue = useProduct();
  console.log(productContextValue);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await makeAPICall(blogSEOAPI, "GET", "0-100");
     //console.log(response)
      setBlogs([...response])
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const getPLPPage = () => {
      var Data = window.location.pathname;
      console.log(Data);
      const categoryData = Data.split('/')[1];
    //  console.log(categoryData);
      setCategory(categoryData);
    };
    getPLPPage();
  }, []);

  const { pagination, searchQuery } = useSearchPage();
  const categoryName = searchQuery?.data?.searchMetadata?.titleTag;
  // console.log("Category :");
  // console.log(categoryName);

  return (
    <>
      <div className={styles.blogContainer}>
        {blogs.filter((blogs) => blogs.category === categoryName).map((blogs) => {
          return (
            <div className={styles.blog} key={blogs.id}>
              <div className={styles.contentWrappper} >
                <p className={styles.shortDescription}>
                  {blogs.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BlogSEO
