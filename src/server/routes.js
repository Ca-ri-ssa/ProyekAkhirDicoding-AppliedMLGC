const { postPredictHandler, getHistoriesPredictHandler } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        /*Mengizinkan data berupa gambar*/
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000, //max 1 MB
        parse: true,
        output: 'data',
      }
    }
  },

  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoriesPredictHandler
  }
]
 
module.exports = routes;