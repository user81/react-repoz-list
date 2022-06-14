import './App.css';
import React, { Component } from 'react';
import HtmlElementRender from './include/HtmlElementRender';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isPage: {
        repos: [],
        userDetal: [],
        page: 'Home',
        reposExist: false,
      },
      defaultValues: {
        search: 'gaearon',
      }
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      defaultValues: { ...this.state.defaultValues, [name]: value }
    });
  }

  setStateObj = (objKeyName, val) => {
    this.setState({
      isLoaded: true,
      [objKeyName]: val
    });
  }

  enterPress = (e) => {
    if (e.key === 'Enter') {
      this.getUserInfo();
    }
  }

  async getUserInfo() {
    if (this.state.defaultValues.search !== "") {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      fetch(`https://api.github.com/users/${this.state.defaultValues.search}`)
        .then(res => res.json())
        .then(
          (result) => this.setStateObj("isPage", { ...this.state.isPage, userDetal: result }),
          (error) => this.setStateObj("error", [...this.state.error, error]));
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.defaultValues.search !== this.state.search) {
      if (prevState.isPage.userDetal !== this.state.isPage.userDetal) {
        this.setStateObj("isPage", { ...this.state.isPage, repos: [] , page: "User", reposExist: false});
        if (this.state.isPage.userDetal.message || this.state.isPage.userDetal.length === 0) {
          this.setStateObj("isPage", { ...this.state.isPage, repos: [] , page: "NotFound", reposExist: false });
        } else if(this.state.isPage.userDetal.public_repos !== 0) {
          this.setStateObj("isPage", { ...this.state.isPage, repos: [] , page: "User", reposExist: true});
          this.getRepos();
        }
      }
    }
  };

  async getRepos() {
    let countPages =Math.ceil(this.state.isPage.userDetal.public_repos / 100);
    let reposListArr =[];
    for (let index = 0; index < countPages; index++) {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      fetch(`https://api.github.com/users/${this.state.defaultValues.search}/repos?page=${index+1}&per_page=100`)
        .then(res => res.json())
        .then(
          (reposList) => {
            if (!reposList.message || reposList.length !== 0) {
              reposListArr = [...reposListArr, ...reposList];
            }
          },
          (error) => this.setStateObj("error", [...this.state.error, error]));
    }
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    if (reposListArr.length > 0) {
      this.setStateObj("isPage", { ...this.state.isPage, page: "User", reposExist: true, repos: reposListArr });
    }
  }

  render() {
    return (

      <>
        <div className="nav_color_blue">
          <div className="card">
            <nav className="nav nav_color_blue">
              <a className="logo-git"></a>
              <div className="search nav__search search_stule_white">
                <div className="search__icon-text nav__search__icon-text_position">
                  <span type="submit" className="search__button" onClick={() => { { this.getUserInfo() } }}></span>
                  
                  <input type="text" className="search__input" name="search" onChange={this.handleChange}  onKeyPress={this.enterPress}/>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <HtmlElementRender
          isPageDetals={this.state.isPage}
        />
      </>
    );
  }
}

export default App;
