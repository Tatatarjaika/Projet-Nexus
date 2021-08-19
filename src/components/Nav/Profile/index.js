import React from 'react';
import { Button, Image } from 'semantic-ui-react';

import './profile.scss';

const Profile = () => (
  <div className="profile-popup">
    <Image className="avatar" src="#" avatar />
    <a href="#">Editer le profil</a>
    <Button>Se Déconnecter</Button>
  </div>

);

export default Profile;