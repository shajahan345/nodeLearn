import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Shajahan";
const yourPassword = "12304";
const yourAPIKey = "54940673-9a21-4353-9600-8f5bed0b38e6";
const yourBearerToken = "54e3d5a1-f1da-420f-90f3-e82a508f6dd2";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    res.render('index.ejs', { content: JSON.stringify(response.data) });
  } catch (err) {
    res.status(404).send(err.message)
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'all?page=2', {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
    });
    res.render('index.ejs', { content: JSON.stringify(response.data) })
  } catch (err) {
    res.status(404).send(err.message)
  }

});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "filter?score=6&apiKey=" + yourAPIKey);
    console.log(API_URL + "filter?score=6&apiKey" + yourAPIKey);
    res.render('index.ejs', { content: JSON.stringify(response.data) })
  } catch (err) {
    res.status(404).send(err.message)
  }

});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    })
    res.render('index.ejs', { content: JSON.stringify(response.data) })

  } catch (err) {
    res.status(404).send(err.message)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
