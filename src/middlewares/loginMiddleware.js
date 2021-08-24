/* eslint-disable default-case */
import axios from 'axios';

import { SUBMIT_LOGIN, getUserData, GET_USER_DATA, changePseudo, changeSteamId, changeSteamAvatar, changeSteamUsername, changeToken, changeVisibilityState, isLogged, updateLibrary } from '../actions/login';

const loginMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    //! REQUETE DU LOGIN, On transmet email + mdp pour se connecter
    case SUBMIT_LOGIN: {
      // on va piocher les informations dans le tiroir du state homepage
      const {
        email,
        password,
      } = store.getState().homepage;

      // let url = `${process.env.REACT_APP_API_URL}/api/login_check`;

      axios.post(
        'http://localhost:8000/api/login_check',
        {
          username: email,
          password: password,
        },
      )
        .then((response) => {
          console.log(response);
          // isLogged = true
          // store.dispatch(userLogged());
          // requête des récupérations de données
          store.dispatch(changeToken(response.data.token));
          store.dispatch(changeSteamId(response.data.authenticatedUserId));
          store.dispatch(getUserData());
        })

        .catch((error) => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          if (error.response.data.message == 'Invalid credentials.') {
            alert('Identifiants invalides');
          }
        });
      break;
    }
    //! REQUETE QUI RECUPERE LES DONNEES DU USER
    case GET_USER_DATA: {
      const {
        steamId,
      } = store.getState().homepage;

      // let url = `${process.env.REACT_APP_API_URL}/api/users/${steamId}`;

      axios.get(`http://localhost:8000/api/users/${steamId}`)
        .then((response)=> {
          console.log(response);
          // Maintenant il faut appeler toutes les fonctions qui modifient le state
          store.dispatch(changePseudo(response.data.pseudo));
          store.dispatch(changeSteamAvatar(response.data.steamAvatar));
          store.dispatch(changeSteamUsername(response.data.steamUsername));
          store.dispatch(changeVisibilityState(response.data.visibilityState));
          store.dispatch(updateLibrary(response.data.libraries));
          store.dispatch(isLogged());

          // TODO Redirection une fois logged in

        })
        .catch((error) =>{
          console.log(error);
        });
      break;
    }
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default loginMiddleware;