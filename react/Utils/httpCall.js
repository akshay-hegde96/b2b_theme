export async function makeAPICall(appURL, method, reqRange, reqData) {
  if (method == "GET") {
    try {
      let header = new Headers();
      header.append("Content-Type", "application/json");
      if (reqRange) {
        header.append("REST-Range", `resources=${reqRange}`);
      }
      header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
      const response = await fetch(appURL, {
        mode: "cors",
        credentials: "include",
        method: method,
        headers: header,
      });
      let data = await response.json();
      //   console.log({ data });
      return data;
    } catch (e) {
      console.log(e);
    }
  } else if (method == "PUT") {
    try {
      let header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
      const response = await fetch(appURL, {
        mode: "cors",
        credentials: "include",
        method: method,
        headers: header,
        body: JSON.stringify(reqData),
      });
      const data = await response.json();
      //   console.log({ data });
      return data;
    } catch (e) {
      console.log(e);
    }
  } else if (method == "POST") {
    try {
      let header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
      const response = await fetch(appURL, {
        mode: "cors",
        credentials: "include",
        method: method,
        headers: header,
        body: JSON.stringify(reqData),
      });
      const data = await response.status;
      //   console.log({ data });
      return data;
    } catch (e) {
      console.log(e);
    }
  } else if (method == "UPLOADFILE") {
    try {
      const response = await fetch(appURL, {
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: reqData,
      });
      const data = await response.status;
      return data;
    } catch (e) {
      console.log(e);
    }
  } else {
    //do nothing
  }
}
