const serviceSales = require('../services/serviceSales');
const serviceUser = require('../services/serviceUser');

const getSaleById = async (request, response) => {
  try {
    const { id } = request.params;
    const sale = await serviceSales.getSaleBySeller(id);
    return response.status(200).json(sale);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const getAllSales = async (_request, response) => {
  try {
    const sales = await serviceSales.getAllSales();
    return response.status(200).json(sales);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const salesCreate = async (request, response) => {
  try {
      const { userId, 
        sellerId, 
        totalPrice, 
        deliveryAddress, 
        deliveryNumber, 
        saleDate, 
        status } = request.body;
      const saleCreateController = await serviceSales.saleCreate({ 
        userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status });
      return response.status(201).json(saleCreateController);
  } catch (error) {
      return response.status(400).json({ message: error.message });
  }
};

const getAllSalesByUserId = async (request, response) => {
  try {
    const { email } = request.user;
    const idUser = await serviceUser.getUserIdByEmail(email);
    console.log(idUser);
    const salesByUserId = await serviceSales.getAllSalesByUserId(idUser);
    return response.status(200).json(salesByUserId);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const getAllSalesBySellerId = async (request, response) => {
  try {
    const { email } = request.user;
    const idUser = await serviceUser.getUserIdByEmail(email);
    console.log(idUser);
    const salesByUserId = await serviceSales.getAllSalesBySellerId(idUser);
    return response.status(200).json(salesByUserId);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const updateSaleToPreparing = async (request, response) => {
  try {
    const { id } = request.params;
    const status = serviceSales.verifySaleStatus(id);
    const updateSaleStatus = await serviceSales.updateSaleToPreparing(id, status);
    return response.status(200).json(updateSaleStatus);
  } catch (error) {
      return response.status(404).json({ message: error.message });
  }
};

const updtSale = async (request, response) => {
  try {
    const { body } = request;
    const { id } = request.params;
    const updt = await serviceSales.updtSale(id, body);

    return response.status(200).json(updt);
  } catch (error) {
    return response.status(404).json({ message: error.message });
  }
};

module.exports = { 
  getSaleById, 
  getAllSales, 
  salesCreate, 
  getAllSalesByUserId,
  getAllSalesBySellerId,
  updateSaleToPreparing,
  updtSale,
};