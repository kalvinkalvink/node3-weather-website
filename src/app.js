const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

const app = express();

const publucDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publucDirPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "kalvin",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "kalvin",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text",
		title: "help",
		name: "kalvin",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address!",
		});
	}
	const requestedAddress = req.query.address;
	const weatherApiUrl = `http://api.weatherstack.com/current?access_key=9d7fa105cac26d452746f8c9ebe36d4d&query=$${requestedAddress}&units=m`;
	request({ url: weatherApiUrl, json: true }, (error, response) => {
		const temperature = response.body.current.temperature;
		const feelsLike = response.body.current.feelslike;
		res.send({
			temperature,
			feelsLike,
		});
	});
});
app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "kalvin",
		errorMsg: "Help article not found",
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "kalvin",
		errorMsg: "Page not found",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
