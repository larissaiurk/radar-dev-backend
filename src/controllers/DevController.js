const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
  async store (req, response) {
    // estou pegando a propriedade git.. de dentro do body
    const { github_username, techs, latitude, longitude } = req.body;

    const devSaved = await Dev.findOne({ github_username });

    if(!devSaved) {
      // promisses - vai aguardar isso terminar para continuar com o restante do cod
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const techsArray = techs.split().map(tech => tech.trim());

      const {name = login, avatar_url, bio} = apiResponse.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      const dev = await Dev.create({
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