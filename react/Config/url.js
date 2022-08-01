//Update your store URL here.

export const storeURL = "https://echidna.myvtex.com";

// category tree API
export const deparmentURL = "/api/catalog_system/pub/category/tree/10";

// contact Us form data API
export const contactUsURL =
  "api/dataentities/client/search?_fields=_all&_schema=person";

// export const categoryURL ="api/dataentities/CA/search?_schema=category&_fields=category_id,banner_link,sub_category";
export const categoryURL =
  "/api/dataentities/BC/search?_fields=_all&_schema=categorybb";

export const blogAPI =
  "/api/dataentities/CB/search?_fields=_all&_schema=CustomBlog";

export const OrderConfigAPI = "/api/checkout/pvt/configuration/orderForm";

export const questionAPI =
  "/api/dataentities/qna/search?_fields=_all&_schema=v0.9";

export const blogSEOAPI =
  "/api/dataentities/CS/search?_fields=_all&_schema=CustomSeo";

//Save Attachment API ,
//Note: The DOC id used here is same to upload all files

export const saveFileAPI =
  "/api/dataentities/EA/documents/9315a89d-73a0-11ec-82ac-0e267c8c99af/attachments/attachments";

  export const allOrders = "api/oms/pvt/orders?orderBy=creationDate,desc"
