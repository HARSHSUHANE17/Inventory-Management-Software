import React, { useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { SupplierContext } from './SupplierContext';

const SupplierPage = () => {
  const [supplierDetail, setSupplierDetail] = useContext(SupplierContext);

  const updateForm = (e) => {
    setSupplierDetail({ ...supplierDetail, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Ensure all required fields are present
    if (!supplierDetail.name || !supplierDetail.email || !supplierDetail.phone || !supplierDetail.company) {
      alert('Please fill in all required fields');
      return;
    }

    const requestData = {
      name: supplierDetail.name,
      email: supplierDetail.email,
      phone: supplierDetail.phone,
      company: supplierDetail.company
    };

    console.log('Sending data:', requestData); // Debug log

    try {
      const url = 'http://localhost:8000/supplier';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('Response:', result);  // Debug log

      if (result.status === 'ok') {
        alert('Supplier added successfully');
        setSupplierDetail({id:'', name: '', email: '', phone: '', company: '' });
      } else {
        alert(result.message || 'Failed to add Supplier');
      }
    } catch (error) {
      console.error('Error details:', error);  // Debug log
      alert(error.message || 'Error adding supplier');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!supplierDetail.id) {
      alert('Supplier ID is required for updating');
      return;
    }

    // Ensure all required fields are present
    if (!supplierDetail.name || !supplierDetail.email || !supplierDetail.phone || !supplierDetail.company) {
      alert('Please fill in all required fields');
      return;
    }

    const requestData = {
      name: supplierDetail.name,
      email: supplierDetail.email,
      phone: supplierDetail.phone,
      company: supplierDetail.company
    };

    console.log('Sending update data:', requestData); // Debug log

    try {
      const url = `http://localhost:8000/supplier/${supplierDetail.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('Server response:', result); // Debug log

      if (result.status === 'ok') {
        alert('Supplier updated successfully');
        setSupplierDetail({id:'', name: '', email: '', phone: '', company: '' });
      } else {
        alert(result.message || 'Failed to update Supplier');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating supplier');
    }
  };

  const handleDelete = async () => {
    if (!supplierDetail.id) {
      alert('Supplier ID is required for deletion');
      return;
    }

    const url = `http://127.0.0.1:8000/supplier/${supplierDetail.id}`;

    const response = await fetch(url, { method: 'DELETE', headers: { accept: 'application/json' } });
    const result = await response.json();

    if (result.status === 'ok') {
      setSupplierDetail({ name: '', email: '', phone: '', company: '', emailTitle: '', email_msg: '', id: '' });
      alert('Supplier deleted successfully');
    } else {
      alert('Supplier deletion failed');
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!supplierDetail.id) {
      alert('Supplier ID is required for sending an email');
      return;
    }

    const url = `http://localhost:8000/email/${supplierDetail.id}`;

   
  };

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="id">
            <Form.Label>ID *</Form.Label>
            <Form.Control 
              type="number" 
              name="id" 
              value={supplierDetail.id} 
              onChange={updateForm} 
              placeholder="Enter Supplier ID" 
              required
            />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name *</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={supplierDetail.name} 
              onChange={updateForm} 
              placeholder="Enter Supplier Name" 
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              value={supplierDetail.email} 
              onChange={updateForm} 
              placeholder="Enter Email" 
              required
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" name="phone" value={supplierDetail.phone} onChange={updateForm} placeholder="Phone" />
          </Form.Group>

          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" name="company" value={supplierDetail.company} onChange={updateForm} placeholder="Company" />
          </Form.Group>

          
          <Button onClick={handleUpdate} className="btn btn-outline-info m-1">
            Update
          </Button>
          <Button onClick={handleAdd} className="btn btn-outline-primary m-1">
            Add Supplier
          </Button>
          
          <Button onClick={handleDelete} className="btn btn-outline-danger m-1">
            Delete
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SupplierPage;
