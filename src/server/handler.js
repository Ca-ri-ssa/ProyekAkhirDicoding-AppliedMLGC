const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData, fetchAllData } = require('../services/storeData');
 
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  try {
    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      suggestion: suggestion,
      createdAt: createdAt
    }

    await storeData(id, data);

    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    })
    response.code(201);
    return response;
  } catch(err) {
    return h.response({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    }).code(400);
  }
}

async function getHistoriesPredictHandler(request, h) {
  const data = await fetchAllData();

  const getHistoryResponse = data.map((predict) => ({
    id: predict.id,
      history: {
          result: predict.result,
          createdAt: predict.createdAt,
          suggestion: predict.suggestion,
          id: predict.id
    }
  }))

  return h.response({
    status: 'success',
    data: getHistoryResponse
  }).code(200);
}
 
module.exports = { postPredictHandler, getHistoriesPredictHandler };