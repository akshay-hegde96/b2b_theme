import React, { useState, useEffect } from "react";
import { Button, ModalDialog, Dropzone } from "vtex.styleguide";
import { makeAPICall } from "../../Utils/httpCall";
import { saveFileAPI } from "../../Config/url";
import styles from "./FileUpload.css";
const FileUpload = () => {
  const [data, setData] = useState(null);
  const [file, setfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFilesAPICall = async () => {
    const getFilesAPI =
      "/api/dataentities/EA/documents/9315a89d-73a0-11ec-82ac-0e267c8c99af?_fields=attachments";
    const response = await makeAPICall(getFilesAPI, "GET");
    console.log("Files", response);
    setData(response);
  };
  useEffect(() => {
    getFilesAPICall();
  }, []);

  console.log("data", data?.attachments);

  const handleUpload = (uploadedfile) => {
    setfile(uploadedfile);
  };

  const handleReset = (file) => {
    console.log(file);
  };

  const handleConfirmation = async () => {
    setLoading(true);
    file && console.log("File", file[0].name);
    const formData = new FormData();
    formData.append("File", file[0]);
    const response = await makeAPICall(saveFileAPI, "UPLOADFILE", "", formData);
    setData(response);
    setLoading(false);
    setIsModalOpen(false);
    getFilesAPICall();
    console.log(response);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <Button onClick={() => setIsModalOpen(true)}>Upload Notes</Button>

        <ModalDialog
          centered
          loading={loading}
          confirmation={{
            onClick: () => handleConfirmation(),
            label: "Upload File",
            isDangerous: true,
          }}
          cancelation={{
            onClick: () => setIsModalOpen(false),
            label: "Cancel",
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div style={{ marginTop: "30px" }}>
            <Dropzone onDropAccepted={handleUpload} onFileReset={handleReset}>
              <div className="pt7">
                <div>
                  <span className="f4">Drop your file here or </span>
                  <span className="f4 c-link" style={{ cursor: "pointer" }}>
                    choose a file
                  </span>
                  <p className="f6 c-muted-2 tc">Maximum file size of 1 MB.</p>
                </div>
              </div>
            </Dropzone>
          </div>
        </ModalDialog>
      </div>

      <div className={styles.filesContainer}>
        {data?.attachments?.split(",").map((fileName) => {
          return (
            <div className={styles.linkContainer}>
              <a
                href={`https://echidna.vtexcommercestable.com.br/api/dataentities/EA/documents/9315a89d-73a0-11ec-82ac-0e267c8c99af/attachments/attachments/${fileName}`}
              >
                <div className={styles.fileContainer}>
                  <img
                    src="https://img.icons8.com/avantgarde/100/undefined/experimental-file-avantgarde.png"
                    width="100px"
                  />
                  <span>{fileName}</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;
