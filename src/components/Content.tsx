import React from "react";
import { GifViewer } from "../components";
import { Gif } from "../types";

interface Props {}

interface State {
  gifs: Gif[];
}

class Content extends React.Component<Props, State> {
  state = {
    gifs: []
  };

  async componentDidMount() {
    fetch(
      "http://api.giphy.com/v1/gifs/trending?api_key=osVl8xeSb13OvfguXaI0pUrbRzph61v9"
    )
      .then(response => response.json())
      .then(json => {
        const gifs = json.data.map((gif: Gif) => gif);
        this.setState({
          gifs
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="Search for GIFs" />
        </div>
        <GifViewer gifs={this.state.gifs} />
      </div>
    );
  }
}

export { Content };
