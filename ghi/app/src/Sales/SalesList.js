import { useEffect, useState } from 'react';

function SalesList() {
  const [sales, setSales] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>SalesPerson</th>
          <th>Client</th>
          <th>Car</th>
          <th>Final Price</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => {
          return (
            <tr key={sale.id}>
              <td>{sale.employee.name}</td>
              <td>{sale.customer.name}</td>
              <td>{sale.automobile.name}</td>
              <td>{sale.price}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}


export default SalesList;
