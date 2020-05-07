import React from "react";
import { Link } from "react-router-dom";
import * as extenstion from "./extenstions";

const UserDocuments = (props) => {
  const userfiles = props.userfiles;
  const selectedUser = props.selectedUser;
  const selectedFolder = props.selectedFolder;
  return userfiles
    .filter(
      (user) => user.user === selectedUser && user.folder === selectedFolder
    )
    .map((userFile) => {
      const userDocuments = [userFile];
      const myFile = userFile.file.split(".")[4];
      if (!extenstion.documentEXT.includes(myFile)) {
        return userDocuments.map((document) => {
          return (
            <div className="ui list" key={document.id}>
              <div className="item">
                <i className="ui file icon" />
                <div className="content">
                  <Link to={`/MyFiles/${document.id}`} className="header">
                    Title: {document.title}
                  </Link>
                  <div className="description">
                    Uploaded: {document.uploaded_at}
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
      return null;
    });
};
export default UserDocuments;
