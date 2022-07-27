import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userName: '',
    artistName: '',
    artistNameValue: '',
    isButtonDisabled: true,
    loading: false,
    redirect: false,
    searchAPIresult: [],
    notFound: false,
  };

  onInputChange = ({ target: { name, value, id } }) => {
    const { length } = value;
    const textLimit = +id;
    this.setState({ [name]: value });
    this.verifyTextLength(length, textLimit);
  }

  verifyTextLength = (length, textLimit) => (length >= textLimit
    ? this.setState({ isButtonDisabled: false })
    : this.setState({ isButtonDisabled: true }));

  onLoginButtonClick = async () => {
    this.setState({ loading: true });
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({ redirect: true, isButtonDisabled: true, loading: false });
  }

  onSearchButtonClick = async () => {
    this.setState({ loading: true });
    const { artistNameValue } = this.state;
    this.searchInputVerify();
    const result = await searchAlbumsAPI(artistNameValue);
    this.searchAPIresultVerify(result);
    this.setState((previousState) => ({
      artistName: previousState.artistNameValue,
      loading: false,
      searchAPIresult: result,
      artistNameValue: '',
    }));
  }

  searchAPIresultVerify = (result) => {
    if (result.length === 0) {
      this.setState({ notFound: true });
    } else {
      this.setState({ notFound: false });
    }
  }

  searchInputVerify = () => {
    const { artistNameValue } = this.state;
    if (artistNameValue) { this.setState({ artistName: '' }); }
  }

  //

  render() {
    const {
      userName, isButtonDisabled, redirect, loading, artistNameValue,
      artistName, searchAPIresult, notFound } = this.state;
    const { onInputChange, onLoginButtonClick, onSearchButtonClick } = this;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                onInputChange={ onInputChange }
                onLoginButtonClick={ onLoginButtonClick }
                userName={ userName }
                isButtonDisabled={ isButtonDisabled }
                loading={ loading }
                redirect={ redirect }
              />) }
          />
          <Route
            exact
            path="/search"
            render={ () => (
              <Search
                artistName={ artistName }
                artistNameValue={ artistNameValue }
                loading={ loading }
                onInputChange={ onInputChange }
                isButtonDisabled={ isButtonDisabled }
                onSearchButtonClick={ onSearchButtonClick }
                searchAPIresult={ searchAPIresult }
                notFound={ notFound }
              />) }
          />
          <Route
            exact
            path="/album/:id"
            render={ ({ match: { params } }) => (
              <Album
                id={ params.id }
              />) }
          />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
