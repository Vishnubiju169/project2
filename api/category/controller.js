const Category = require("../../db/models/category");
const axios = require('axios');
const cheerio = require('cheerio');
exports.getUrl = async (req, res) => {

	res.render('index');

};
/*
1.using cheerio packge for fetching url details
*/
exports.postUrl = (req, resp) => {
	// const url = 'https://en.wikipedia.org/wiki/Wikipedia';
	const url = req.body.urlField;
	axios.get(url)
		.then(res => {
			const $ = cheerio.load(res.data);

			const words = $.text().split(' ').length;
			const links = $('a').map((i, el) => $(el).attr('href')).get();
			const images = $('img').map((i, el) => $(el).attr('src')).get();
			console.log({ words, links, images });
			

			const newUser = Category.create({

				words: words,
				links: links,
				images: images,
				urlField: req.body.urlField,
			})

				// return resp.redirect('/postUrl')
				.then(data => {
					console.log(data);
					// resp.status(201);
					// return resp.json(
					// 	errorFunction(false, " Successfully ", data)
					// );
					resp.render('list', { data: data });

				}).catch(err => {
					resp.status(400);
					console.log(err);
					return resp.json((true, "Error update student"));
				});

		})



};
exports.getUpdate = async (req, res) => {

	try {
		const data = await Category.findOne({ _id: req.params.id })
		console.log(data._id);
		if (!data) {
			res.render('list')
		}
		// console.log(data)
		res.render('update', { data: data })

	} catch (error) {
		console.log(error)
	}

};

exports.updated = async (req, res) => {
	try {
		if (!req.body) {
			return res.json({
				status: false,
				statusCode: 400,
				message: "Please enter profile details",
				data: ""
			});
		}


		else {

			Category.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
				.then(data => {
					// console.log("dhcuydcuj",data);
					// res.status(201);
					// return res.json(
					// 	(false, " Successfully Updated", data)
					// );
					res.render('list', { data: data })

				}).catch(err => {
					res.status(400);
					console.log(err);
					return res.json(errorFunction(true, "Error update student"));
				});

		}


	} catch (error) {
		res.status(400);
		console.log(error);
		return res.json(errorFunction(true, "Error update student"));
	}

};


exports.delete = async (req, res) => {
	try {
		let _id = req.params.id
		Category.findByIdAndRemove(_id, (err, cat) => {

			if (err) {
				res.json({ message: err.message })

			} else {


				res.render('list', { data: cat })


			}
		})
	}
	catch (error) {
		next(error)
	}
};








