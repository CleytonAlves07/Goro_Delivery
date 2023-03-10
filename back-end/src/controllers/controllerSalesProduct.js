const servicesSalesProduct = require('../services/servicesSalesProduct');

const salesCreate = async (request, response) => {
    const { body } = request;
    
    const postSaleOrder = await servicesSalesProduct.saleCreate(body);
    return response.status(201).json(postSaleOrder);
};

const getAllSaleProduct = async (request, response) => {
    const { body } = request;

    const salesProducts = await servicesSalesProduct.getAllSaleProduct(body);
    return response.status(200).json(salesProducts);
};
  
const getSaleProductWithId = async (request, response) => {
    const { id } = request.params;

    const salesProducts = await servicesSalesProduct.getSaleProductWithId(id);
    return response.status(200).json(salesProducts);
};

module.exports = {
    salesCreate,
    getAllSaleProduct,
    getSaleProductWithId,
};