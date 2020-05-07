import React from "react";
import { Link } from "react-router-dom";
import * as extenstion from "./extenstions";

const UserImages = (props) => {
  const userfiles = props.userfiles;
  const selectedUser = props.selectedUser;
  const selectedFolder = props.selectedFolder;
  return userfiles
    .filter(
      (user) => user.user === selectedUser && user.folder === selectedFolder
    )
    .map((userFile) => {
      const userImages = [userFile];
      const myFile = userFile.file.split(".")[4];
      if (extenstion.imageEXT.includes(myFile)) {
        return userImages.map((image) => {
          return (
            <div className="ui list" key={image.id}>
              <div className="item">
                <img
                  className="ui mini image"
                  src={image.file}
                  alt={image.title}
                />
                <div className="content">
                  <Link to={`/MyFiles/${image.id}`} className="header">
                    Title: {image.title}
                  </Link>
                  <div className="description">
                    Uploaded: {image.uploaded_at}
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
export default UserImages;
