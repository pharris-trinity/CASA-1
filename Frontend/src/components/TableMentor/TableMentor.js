import React from 'react';
import "./TableStyle.css";
//import data from "./mock-data.json";
/*
const TableMentor = () => {
    const [contacts, setContacts] = useState(data);
    return <div className = "app-container">
        <table>
            <thead>
                <tr>
                    <th>Display Name</th>
                    <th>Email</th>
                    <th>Zip Code</th>
                    <th>Speciality</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact)=>                 
                    <tr>
                        <td>{contact.displayname}</td>
                        <td>{contact.email}</td>
                        <td>{contact.zipcode}</td>
                        <td>{contact.speciality}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

export default TableMentor;
*/


//import React  from 'react';

export default function TableMentor (){
    
    /*
    const products = [
        {id: 1, name: "laptop", price: 500},
        {id: 2, name: "phone", price: 200},
        {id: 3, name: "modem", price: 40},
        {id: 4, name: "tv", price: 90},
    ];

    const productList = products.map((product) => (
        <div key={product.id}>
            {product.name}: ${product.price}
        </div>
    ));
    return <div>{productList}</div>;
    */
   const fruits = ["Apple", "Mango", "Banana"];
   const fruitsList = fruits.map((fruit,index) => <h3 key={index}>{fruit}</h3>);
   return <div>{fruitsList}</div>


}

