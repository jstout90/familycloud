import React from "react";
import { Link } from "react-router-dom";
import * as extenstion from "./extenstions";

const UserVideo = (props) => {
  const userfiles = props.userfiles;
  const selectedUser = props.selectedUser;
  const selectedFolder = props.selectedFolder;
  return userfiles
    .filter(
      (user) => user.user === selectedUser && user.folder === selectedFolder
    )
    .map((userFile) => {
      const userVideos = [userFile];
      const myFile = userFile.file.split(".")[4];
      if (extenstion.videoEXT.includes(myFile)) {
        return userVideos.map((video) => {
          return (
            <div className="ui list" key={video.id}>
              <div className="item">
                <i className="ui video icon" />
                <div className="content">
                  <Link to={`/MyFiles/${video.id}`} className="header">
                    Title: {video.title}
                  </Link>
                  <div className="description">
                    Uploaded: {video.uploaded_at}
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
export default UserVideo;
