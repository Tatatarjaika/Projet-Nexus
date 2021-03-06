import axios from 'axios';
import {
  SEARCH_FRIEND_PROFILE,
  displayResults,
  FRIEND_REQUEST,
  CHECK_NOTIFICATION,
  updateSenderId,
  hasNotification,
  ACCEPT_FRIEND_REQUEST,
  DENY_FRIEND_REQUEST,
  numberOfNotifications,
  emptySearchbar,
} from 'src/actions/nav';

import { getUserData } from '../actions/login';

const navMiddleware = (store) => (next) => (action) => {
  // je peux réagir au cas par cas suivant l'action,
  // un switch fonctionne bien
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SEARCH_FRIEND_PROFILE: {
      const {
        inputSearch,
      } = store.getState().navReducer;

      const {
        token,
      } = store.getState().homepage;

      axios.get(
        `http://localhost:8000/api/users/pseudo/${inputSearch}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          // console.log(Object.keys(response.data).length);
          // si l'objet de réponse est = à 0 c'est qu'il n'y a pas de résultat
          // donc si > 0 on envoie la réponse sinon tableau vide (cela n'affiche rien)
          if (Object.keys(response.data).length > 0) {
            store.dispatch(displayResults(response.data));
          }
          else {
            store.dispatch(displayResults([]));
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // console.log(error);
        });
      break;
    }
    case FRIEND_REQUEST: {
      const {
        token,
        id,
      } = store.getState().homepage;

      const {
        friendToRequest,
      } = store.getState().navReducer;

      axios.post(
        'http://localhost:8000/api/request',
        // données
        {
          sender: id,
          target: friendToRequest,
          type: 'friend',
        },
        // options (tokens)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          // console.log(response);
          store.dispatch(emptySearchbar());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case CHECK_NOTIFICATION: {
      const {
        token,
        steamId,
      } = store.getState().homepage;

      axios.get(
        `http://localhost:8000/api/users/${steamId}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data);
          store.dispatch(updateSenderId(response.data));
          // store.dispatch(numberOfNotifications(response.data.length));

          // eslint-disable-next-line array-callback-return
          const requests = response.data.map((item, index) => {
            if (item.declinedAt === null && item.acceptedAt === null) {
              store.dispatch(hasNotification());
              store.dispatch(numberOfNotifications(index + 1));
            }
          });
          return requests;
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case ACCEPT_FRIEND_REQUEST: {
      const {
        token,
      } = store.getState().homepage;

      const {
        requestId,
      } = store.getState().navReducer;

      axios.patch(
        `http://localhost:8000/api/request/${requestId}`,
        // données
        {
          acceptedAt: (new Date()).toJSON(),
        },
        // options (tokens)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          store.dispatch(getUserData());
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case DENY_FRIEND_REQUEST: {
      const {
        token,
      } = store.getState().homepage;

      const {
        requestId,
      } = store.getState().navReducer;

      axios.patch(
        `http://localhost:8000/api/request/${requestId}`,
        // données
        {
          declinedAt: (new Date()).toJSON(),
        },
        // options (tokens)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
  }
  next(action);
};

export default navMiddleware;
