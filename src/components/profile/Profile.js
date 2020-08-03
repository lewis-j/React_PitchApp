import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Profile = (props) => {
  const [userProfile, setUserProfile] = useState({
    profile: null,
    error: "",
  });

  useEffect(() => {
    loadUserProfile();
  }, [userProfile]);

  const loadUserProfile = () => {
    console.log("loading profile");
    props.auth.getProfile((profile, error) => {
      setUserProfile(
        Object.assign({}, userProfile, {
          profile,
          error,
        })
      );
    });
  };

  const { profile } = userProfile;

  console.log("profile", profile);

  if (!profile) return null;

  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile picture"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Profile;
