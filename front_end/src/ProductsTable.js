import React, { useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { ProductContext } from './ProductContext';
import { UpdateContext } from './UpdateProductContext';
import { SupplierContext } from './SupplierContext';
import ProductsRow from './ProductRow';
import { useNavigate } from 'react-router-dom';

const ProductsTable = () => {
    // Ensure contexts are properly initialized
    const [products, setProducts] = useContext(ProductContext) || [{ data: [] }, () => {}];
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext) || [{}, () => {}];
    const [supplierDetail, setSupplierDetail] = useContext(SupplierContext) || [{}, () => {}];

    const navigate = useNavigate();

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/product/${id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(result => {
            if (result.status === 'ok') {
                const filteredProducts = products.data.filter(product => product.id !== id);
                setProducts({ data: filteredProducts });
                alert("Product deleted");
            } else {
                alert("Product deletion failed");
            }
        })
        .catch(error => console.error("Error deleting product:", error));
    };

    const handleUpdate = (id) => {
        const product = products.data.find(product => product.id === id);
        if (product) {
            setUpdateProductInfo({
                ProductName: product.name,
                QuantityInStock: product.quantity_in_stock,
                QuantitySold: product.quantity_sold,
                UnitPrice: product.unit_price,
                Revenue: product.revenue,
                ProductId: id
            });
            navigate("/updateproduct");
        } else {
            alert("Product not found");
        }
    };

    const handleSupplier = (id) => {
        fetch(`http://127.0.0.1:8000/supplier/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(result => {
            if (result.status === 'ok') {
                setSupplierDetail({ ...result.data });
                navigate("/supplierpage");
            } else {
                alert("Error fetching supplier details");
            }
        })
        .catch(error => console.error("Error fetching supplier:", error));
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product")
            .then(resp => resp.json())
            .then(results => {
                if (results?.data) {
                    setProducts({ data: results.data });
                } else {
                    setProducts({ data: [] }); // Fallback to an empty array
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts({ data: [] });
            });
    }, [setProducts]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Quantity In Stock</th>
                        <th>Quantity Sold</th>
                        <th>Unit Price</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.length > 0 ? (
                        products.data.map((product) => (
                            <ProductsRow
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                quantity_in_stock={product.quantity_in_stock}
                                quantity_sold={product.quantity_sold}
                                unit_price={product.unit_price}
                                revenue={product.revenue}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                handleSupplier={handleSupplier}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No products available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductsTable;
