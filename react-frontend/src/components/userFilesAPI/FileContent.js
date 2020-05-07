import React from "react";
import * as extenstion from "./extenstions";
import { Howl } from "howler";

class FileContent extends React.Component {
  constructor(props) {
    super(props);
    this.documentViewer = React.createRef();
  }
  renderImage() {
    return (
      <img
        className="ui large rounded image"
        src={this.props.userFileDetail.file}
        alt={this.props.userFileDetail.title}
      />
    );
  }
  renderMusic() {
    const sound = new Howl({
      src: [this.props.userFileDetail.file],
    });
    return (
      <div>
        <h4>Unable to play WMA audio files</h4>
        <button onClick={() => sound.play()}>Play</button>
        <button onClick={() => sound.pause()}>Pause</button>
        <button onClick={() => sound.stop()}>Stop</button>
      </div>
    );
  }
  renderVideo() {
    return (
      <video width="100%" controls>
        <source src={this.props.userFileDetail.file} />
        Your browser doesn't support this kind of video
      </video>
    );
  }
  renderDocument() {
    return <h4>Download File to View Contents</h4>;
  }
  renderContent() {
    const selectedFile = this.props.userFileDetail.file;
    if (selectedFile !== undefined) {
      if (extenstion.imageEXT.includes(selectedFile.split(".")[4])) {
        return this.renderImage();
      } else if (extenstion.videoEXT.includes(selectedFile.split(".")[4])) {
        return this.renderVideo();
      } else if (extenstion.musicEXT.includes(selectedFile.split(".")[4])) {
        return this.renderMusic();
      } else if (!extenstion.documentEXT.includes(selectedFile.split(".")[4])) {
        return this.renderDocument();
      }
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
export default FileContent;
