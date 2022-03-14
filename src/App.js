import React from "react";
import axios from "axios";
import "./App.css";
import bg from "./images/bg.jpg";
import bg1 from "./images/hb.jpg";
import bg2 from "./images/hb1.jpg";
import bg3 from "./images/ss.jpg";

// to do :

// -change image on button click
// -set default background image
// -(optional) set background according to the author
const aa = [bg, bg1, bg2, bg3];
class App extends React.Component {
  state = {
    quote: "",
    author: "",
    backgrounds: "",
  };

  componentDidMount() {
    this.fetchAdvice();
    this.changeBg();
  }

  changeBg() {
    const background = Math.floor(Math.random() * aa.length);
    this.setState({ backgrounds: aa[background] });
  }

  fetchAdvice = () => {
    axios
      .get(`https://breaking-bad-quotes.herokuapp.com/v1/quotes`)

      .then((response) => {
        const quote = response.data[0].quote;
        const author = response.data[0].author;
        this.setState({ quote: quote });
        this.setState({ author: author });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        className="app"
        style={{ backgroundImage: `url(${this.state.backgrounds})` }}
      >
        <div className="card">
          <h1 className="heading">{this.state.quote}</h1>
          <h2 className="author">{this.state.author}</h2>
          <button
            className="button"
            onClick={() => {
              this.fetchAdvice();
              this.changeBg();
            }}
          >
            <span>QUOTE</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
