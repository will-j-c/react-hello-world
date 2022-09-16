import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    axios
      .get(`${props.baseUrl}/api/v1/users/${params.username}`)
      .then((response) => {
        setProfile(response.data);
      });
  }, []);
  console.log(profile);
  return <>{/* {profile ? "hehe" : ""} */}</>;
}

export default ProfilePage;
