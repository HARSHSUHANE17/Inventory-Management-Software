import React, { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductContext";


const NavBar = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useContext(ProductContext) || [{ data: [] }, () => {}];

    const updateSearch = (e) => setSearch(e.target.value);

    const filterProduct = (e) => {
        e.preventDefault();
        if (products?.data) {
            const filtered = products.data.filter(product =>
                product.name.toLowerCase() === search.toLowerCase()
            );
            setProducts({ data: [...filtered] });
        }
    };

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Badge className="mt-2" bg="primary">
                        Products In Stock: {products?.data?.length || 0}
                    </Badge>
                </Nav>
                <Form className="d-flex" onSubmit={filterProduct}>
                    <Link to="/addproduct" className="btn btn-primary btn-sm me-3">
                        Add Product
                    </Link>
                    <FormControl
                        value={search}
                        onChange={updateSearch}
                        type="text"
                        placeholder="Search"
                        className="me-2"
                    />
                    <Button type="submit" variant="outline-primary">
                        Search
                    </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
