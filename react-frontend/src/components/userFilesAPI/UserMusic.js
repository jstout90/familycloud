import React from "react";
import { Link } from "react-router-dom";
import * as extenstion from "./extenstions";

const UserMusic = (props) => {
  const userfiles = props.userfiles;
  const selectedUser = props.selectedUser;
  const selectedFolder = props.selectedFolder;
  return userfiles
    .filter(
      (user) => user.user === selectedUser && user.folder === selectedFolder
    )
    .map((userFile) => {
      const userMusic = [userFile];
      const myFile = userFile.file.split(".")[4];
      if (extenstion.musicEXT.includes(myFile)) {
        return userMusic.map((music) => {
          return (
            <div className="ui list" key={music.id}>
              <div className="item">
                <i className="ui music icon" />
                <div className="content">
                  <Link to={`/MyFiles/${music.id}`} className="header">
                    Title: {music.title}
                  </Link>
                  <div className="description">
                    Uploaded: {music.uploaded_at}
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
export default UserMusic;
