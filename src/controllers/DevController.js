const axios = require('axios');
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store (req, response) {
    // estou pegando a propriedade git.. de dentro do body
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev) {
      // promisses - vai aguardar isso terminar para continuar com o restante do cod
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const techsArray = ParseStringAsArray(techs);

      const {name = login, avatar_url, bio} = apiResponse.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  }

};