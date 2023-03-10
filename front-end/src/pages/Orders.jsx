import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { getOrdersUserById } from '../services/requests';
import { getUserLogged } from '../services/localStorage';

const moment = require('moment');

function Orders() {
  const [orders, setOrders] = useState([]);
  const forMagicNumber = 4;

  const getOrdersUserId = async (token) => {
    const data = await getOrdersUserById(token);
    setOrders(data.data);
  };

  useEffect(() => {
    const { token } = getUserLogged();
    getOrdersUserId(token);
    console.log(orders);
  }, []);

  return (
    <main>
      <NavBar />
      <h1>PEDIDOS</h1>
      <div>
        {
          orders?.map((o) => (
            <section key={ o.id }>
              <Link to={ `/customer/orders/${o.id}` }>
                <div
                  data-testid={ `customer_orders__element-order-id-${o.id}` }
                >
                  <p>
                    PEDIDO
                  </p>
                  <p>
                    {String(o.id).padStart(forMagicNumber, 0)}
                  </p>
                </div>
                <div
                  data-testid={ `customer_orders__element-delivery-status-${o.id}` }
                >
                  <p>{o.status}</p>
                </div>
                <div>
                  <div
                    data-testid={ `customer_orders__element-order-date-${o.id}` }
                  >
                    { moment(o.saleDate).format('DD/MM/YYYY') }
                  </div>
                  <div
                    data-testid={ `customer_orders__element-card-price-${o.id}` }
                  >
                    R$
                    {o.totalPrice.replace('.', ',')}
                  </div>
                </div>
              </Link>
            </section>
          ))
        }
      </div>
    </main>
  );
}

export default Orders;
