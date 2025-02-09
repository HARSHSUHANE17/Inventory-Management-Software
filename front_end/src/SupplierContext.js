import React, { useState, useContext, createContext } from 'react'


export const SupplierContext = createContext();

export const SupplierContextProvider = (props) => {
    const [supplierDetail, setSupplierDetail] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        id: "",
    })

    return (
        <SupplierContext.Provider value={[supplierDetail, setSupplierDetail]}>
            {props.children}
        </SupplierContext.Provider>
    )
}