import axios from "axios";
import qs from "qs";

// const ig_appId = "203598447717737";
const ig_appSecret = "74decd2c6da194b879232332924f3507";
// const redirectUrl = "https://localhost:3000/profile/";

export const getAccessToken = code => {
  const data = {
    client_id: "203598447717737",
    client_secret: "74decd2c6da194b879232332924f3507",
    grant_type: "authorization_code",
    redirect_uri: "https://localhost:3000/profile/",
    code: code
  };

  const payload = qs.stringify(data);

  return axios.post("https://api.instagram.com/oauth/access_token", payload, {
    crossdomain: true
  });
};

export const getUserIg = accessToken => {
  return axios.get(
    `https://graph.instagram.com/me?fields=account_type,id,media_count,username&access_token=${accessToken}`
  );
};

export const getLongLiveToken = shortlivetoken => {
  return axios.get(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${ig_appSecret}&access_token=${shortlivetoken}`
  );
};
