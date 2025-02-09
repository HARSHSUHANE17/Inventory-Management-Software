from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from models import (supplier_pydantic, supplier_pydanticIn, Supplier, product_pydanticIn, product_pydantic, Product, SupplierCreate)

# email
from fastapi import FastAPI, BackgroundTasks, UploadFile, File, Form
from starlette.responses import JSONResponse
from starlette.requests import Request
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from pydantic import BaseModel, EmailStr
from typing import ContextManager, List


# dotenv
from dotenv import dotenv_values

# credentials
credentials = dotenv_values(".env")

# adding cors headers
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# adding cors urls

origins = [
    'http://localhost:3000'
]

# add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


@app.get('/')
def index():
    return {"Msg": "go to /docs for the API documentation"}


@app.post('/supplier')
async def add_supplier(supplier_info: SupplierCreate):
    try:
        print(f"Received data: {supplier_info.dict()}")  # Debug log
        
        # Create new supplier
        supplier_obj = await Supplier.create(
            name=supplier_info.name,
            company=supplier_info.company,
            email=supplier_info.email,
            phone=supplier_info.phone
        )
        
        response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
        return {"status": "ok", "data": response}
    except Exception as e:
        print(f"Error creating supplier: {str(e)}")  # Debug log
        return {"status": "error", "message": str(e)}
    
@app.get('/supplier')
async def get_all_suppliers():
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"status": "ok", "data": response}
    
@app.get('/supplier/{id}')
async def get_specific_supplier(id: int):
    product = await Product.get(id = id)
    supplier = await product.supplied_by
    supplier_id = supplier.id
    response = await supplier_pydantic.from_queryset_single(Supplier.get(id=supplier_id))
    return {"status": "ok", "data": response}

@app.put('/supplier/{supplier_id}')
async def update_supplier(supplier_id: int, update_info: supplier_pydanticIn):
    try:
        # Find the supplier
        supplier = await Supplier.get(id=supplier_id)
        
        # Update only the fields we want to allow updating
        supplier.name = update_info.name
        supplier.company = update_info.company
        supplier.email = update_info.email
        supplier.phone = update_info.phone
        
        # Save the changes
        await supplier.save()
        
        # Return the updated supplier
        response = await supplier_pydantic.from_tortoise_orm(supplier)
        return {"status": "ok", "data": response}
    except DoesNotExist:
        return {"status": "error", "message": "Supplier not found"}
    except Exception as e:
        print(f"Error updating supplier: {str(e)}")
        return {"status": "error", "message": str(e)}


@app.delete('/supplier/{supplier_id}')
async def delete_supplier(supplier_id: int):
    await Supplier.get(id=supplier_id).delete()
    return {"status": "ok"}

@app.post('/product/{supplier_id}')
async def add_product(supplier_id: int, products_details: product_pydanticIn):
    supplier = await Supplier.get(id = supplier_id)
    products_details = products_details.dict(exclude_unset = True)
    products_details['revenue'] += products_details['quantity_sold'] * products_details['unit_price']
    product_obj  = await Product.create(**products_details, supplied_by = supplier)
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "ok", "data": response}


@app.get('/product')
async def all_producsts():
    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok", "data": response}

@app.get('/product/{id}')
async def specific_product(id: int):
    response = await product_pydantic.from_queryset_single(Product.get(id  = id))
    return {"status": "ok", "data": response}


@app.put('/product/{id}')
async def update_product(id: int, update_info: product_pydanticIn):
    product = await Product.get(id = id)
    update_info = update_info.dict(exclude_unset = True)
    product.name = update_info['name']
    product.quantity_in_stock = update_info['quantity_in_stock']
    product.revenue += (update_info['quantity_sold'] * update_info['unit_price']) + update_info['revenue']
    product.quantity_sold += update_info['quantity_sold']
    product.unit_price = update_info['unit_price']
    await product.save()
    response = await product_pydantic.from_tortoise_orm(product)
    return {"status": "ok", "data": response}

@app.delete('/product/{id}')
async def delete_product(id: int):
    await Product.filter(id = id).delete()
    return {"status": "ok"}





register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)