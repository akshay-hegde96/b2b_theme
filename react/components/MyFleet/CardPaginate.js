import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'
import { Card } from "vtex.styleguide";
import styles from "./MyFleet.css";

export default function CardPaginate(props){
  const {data} = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className={styles.cardsContainer}>
          {currentItems?.map((data) => (
            <div style={{ padding: "10px", width: "500px" }}>
              <Card>
                <p> Job# : {data.Job}</p>
                <p> Work Order : {data.WorkOrder}</p>
                <p> Unit : {data.Unit}</p>
                <p> Sales Man Name : {data.SalesmanName}</p>
                <p> Dealer Number : {data.DealerNumber}</p>
                <p> Dealer Name : {data.DealerName}</p>
                <p> Contract Admin Name : {data.ContractAdministratorName}</p>
                <p>
                  Address : {data.Address1} - {data.Address4}
                </p>
                <p> City : {data.City}</p>
                <p> State : {data.State}</p>
                <p> Zip : {data.Zip}</p>
                <p> Country : {data.Country}</p>
              </Card>
            </div>
          ))}
        </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pageNum}
        previousLinkClassName={styles.pageNum}
        nextLinkClassName={styles.pageNum}
        activeLinkClassName={styles.active}
      />
    </>
  );

}
