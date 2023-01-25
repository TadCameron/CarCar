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


  useEffect(()=>{
    getData()
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => {
          return (
            <tr key={sale.id}>
              <td>{ sale.model_name }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


export default SalesList;
