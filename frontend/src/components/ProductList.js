import React from 'react';
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './ProductList.css';

const ProductList = () => {
    const [products, setProduct] = useState([]);
    const [productsP, setProductsP] = useState(products.slice(0,50));
    const [pageNumber, setPageNumber] = useState(0);

    const productsPerPage = 5;
    const pagesVisited = pageNumber*productsPerPage;
    const displayProducts = productsP.slice(pagesVisited,pagesVisited+productsPerPage).map((product,index)=>{
 (<tr key={ product.id }>
                        <td>{ index + 1 }</td>
                        <td>{ product.title }</td>
                        <td>{ product.price }</td>
                        <td>
                            <Link to={`/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                            <button onClick={ () => deleteProduct(product.id) } className="button is-small is-danger">Delete</button>
                        </td>
                    </tr>)
    })

    const pageCount = Math.ceil(products.length/productsPerPage);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProduct(response.data);
    }

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts();
    }

    const ChangePageHandler =({selected})=>{
setPageNumber(selected);
    }
    return (
        <div>
        <Link to="/add" className="button is-primary mt-2">Add New</Link>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* {displayProducts} */}
                { products.slice(pagesVisited,pagesVisited+productsPerPage).map((product, index) => (
                    <tr key={ product.id }>
                        <td>{ index + 1 }</td>
                        <td>{ product.title }</td>
                        <td>{ product.price }</td>
                        <td>
                            <Link to={`/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                            <button onClick={ () => deleteProduct(product.id) } className="button is-small is-danger">Delete</button>
                        </td>
                    </tr>
                )) }
                 
            </tbody>
        </table>
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={ChangePageHandler}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />
    </div>
    )
}

export default ProductList