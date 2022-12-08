const serviceSales = require('../services/serviceSales');

const getSaleById = async (request, response) => {
  try {
    const { id } = request.params;
    const sale = await serviceSales.getSaleById(id);
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

module.exports = { getSaleById, getAllSales, salesCreate };