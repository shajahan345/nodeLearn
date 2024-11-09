import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
let yourBearerToken = "";
let config = null;
const getToken = async () => {
  try {
    const response = await axios.post(API_URL + "/get-auth-token", {
      "username": "Shajahan",
      "password": "12304"
    })
    yourBearerToken = response.data.token;
    config = {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    }
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) });
  }
}
getToken()

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const { secret, score } = req.body
  const data = {
    "secret": secret,
    "score": score
  }
  console.log(data.score && data.secret);
  try {
    if (data.score && data.secret) {
      const response = await axios.post(API_URL + "/secrets", data, config);
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    } else {
      throw new Error("Please Enter the required details");
    }

  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.message) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const { secret, score } = req.body
  const data = {
    "secret": secret,
    "score": score
  }
  try {
    if (data.score && data.secret) {
      const response = await axios.put(`${API_URL}/secrets/${searchId}`, data, config);
      res.render("index.ejs", { content: JSON.stringify(response.data) });

    } else {
      throw new Error("Please Enter the required details");
    }

  } catch (error) {
    console.log(error.message);
    res.render("index.ejs", { content: JSON.stringify(error.message) });
  }
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
