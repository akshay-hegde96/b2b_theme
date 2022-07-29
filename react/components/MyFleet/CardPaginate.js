import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Card } from "vtex.styleguide";
import styles from "./MyFleet.css";

export default function CardPaginate(props) {
  const { data } = props;
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
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {currentItems.length > 0 ? (
          currentItems.map((data) => (
            <div>
              <Card>
                <div className={styles.eachCards}>
                <div>
                <p> Job# : {data.Job}</p>
                <p> Work Order : {data.WorkOrder}</p>
                <p> Unit : {data.Unit}</p>
                </div>
                <div>
                <p> Sales Man Name : {data.SalesmanName}</p>
                <p> Dealer Number : {data.DealerNumber}</p>
                <p> Dealer Name : {data.DealerName}</p>
                </div>
                <div>
                <p> Contract Admin Name : {data.ContractAdministratorName}</p>
                <p>
                  Address : {data.Address1} - {data.Address4}
                </p>
                <p> City : {data.City}</p>
                </div>
                <div>
                <p> State : {data.State}</p>
                <p> Zip : {data.Zip}</p>
                <p> Country : {data.Country}</p>
                </div>

                </div>
              </Card>

            </div>


          ))
        ) : (

          <Card>
            <div className={styles.noDataMsg}>
            No Data Found! Search Again...
            </div>
          </Card>

        )}
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
      </div>


    </>
  );
}
