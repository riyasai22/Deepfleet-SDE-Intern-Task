import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);

  const [showTable, setShowTable] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [displayBill, setDisplayBill] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [bill, setBill] = useState([]);

  const [gstRate, setGSTRate] = useState();
  const [product, setProduct] = useState("");
  const [productPrice, setProductPrice] = useState();

  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);
  const [saleDetails, setSaleDetails] = useState([]); // Array to store sale details

  // Calculate tax based on the formula
  const calculateTax = () => {
    if (selectedProductInfo && selectedCategoryInfo) {
      const { gstRates } = selectedCategoryInfo;
      const { price } = selectedProductInfo;

      const tax = (gstRates * price) / 100;
      return tax;
    }

    return 0; // Default to 0 tax if no selection or data found
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create the category
      const response = await fetch(
        "http://localhost:5000/api/productCategories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName, gstRates: 0 }),
        }
      );

      if (response.status === 200) {
        console.log("Category created");
        toast.success("New Category Added");
        setShowPopup(false);
        setCategoryName("");
        fetchCategories();
      } else {
        // Handle error, e.g., show an error message to the user
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the GST rate
      const response = await fetch(
        `http://localhost:5000/api/productCategories/${selectedCategory}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gstRate }),
        }
      );

      if (response.status === 200) {
        console.log("GST rate updated");
        toast.success("GST Rate Updated");
        setGSTRate(); // Reset the GST rate input
        setSelectedCategory(""); // Reset the selected category
        setShowPopup2(false);
        fetchCategories();
      } else {
        console.error("Failed to update GST rate");
      }
    } catch (error) {
      console.error("Failed to update GST rate", error);
    }
  };
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create the product
      const response = await axios.post("http://localhost:5000/api/product", {
        name: product,
        categoryId: selectedCategory,
        price: productPrice,
      });

      if (response.status === 200) {
        console.log("Product created");
        toast.success("New Product Added");
        setShowPopup3(false);
        setProduct("");
        setSelectedCategory("");
        setProductPrice();
      } else {
        // Handle error, e.g., show an error message to the user
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };
  const handleSubmit4 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ saleDetails }),
      });

      if (response.status === 200) {
        toast.success("Bill Created");
        console.log("Bill created");
        setShowTable(false);
        setShowBill(true);
        // Handle success as needed
      } else {
        console.error("Failed to create bill");
        // Handle error as needed
      }
    } catch (error) {
      console.error("Failed to create bill", error);
      // Handle error as needed
    }
  };

  const addProductToSale = async () => {
    console.log(selectedProduct + " " + currentCategory);
    const productInfo = products.find(
      (product) => product._id === selectedProduct
    );
    const categoryInfo = categories.find(
      (category) => category._id === currentCategory
    );

    if (productInfo && categoryInfo) {
      setSelectedProductInfo(productInfo);
      setSelectedCategoryInfo(categoryInfo);

      // Create a new sale detail object
      const newSaleDetail = {
        product: productInfo.name,
        category: categoryInfo.name,
        gstRate: categoryInfo.gstRates,
        price: productInfo.price,
        tax: (productInfo.price * categoryInfo.gstRates) / 100,
      };

      // Append the new sale detail to the array
      setSaleDetails([...saleDetails, newSaleDetail]);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/productCategories"
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("GET request error:", error);
    }
  };
  const fetchBill = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bill");
      console.log(response.data);
      const bills = response.data; // Assuming response.data is an array of bills

      if (bills && bills.length > 0) {
        const lastBill = bills[bills.length - 1]; // Get the last bill in the array

        setBill(lastBill.saleDetails);
        console.log(lastBill.saleDetails);
        let total = 0;
        lastBill.saleDetails.forEach((detail) => {
          total += detail.price + detail.tax;
        });

        setTotalPrice(total);
      }
    } catch (error) {
      console.error("GET request error:", error);
    }
  };
  const fetchProducts = async (item) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product?category=${item}`
      );
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchBill();
  }, []);

  return (
    <div className="dashboard_container">
      <ToastContainer />

      <h2>Purchase Order</h2>
      <div className="options">
        <p className="box" onClick={() => setShowPopup(true)}>
          Add Product Category
        </p>
        <p className="box" onClick={() => setShowPopup2(true)}>
          Add GST Rate
        </p>
        <p className="box" onClick={() => setShowPopup3(true)}>
          Add Products
        </p>
      </div>

      {showPopup && (
        <div className="popup_container">
          <div className="popup" style={{ padding: "20px 40px" }}>
            <FaTimes className="i" onClick={() => setShowPopup(false)} />
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="popup-text">Add Category</p>
              <div
                className="text_field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  placeholder="Enter Category Name"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPopup2 && (
        <div className="popup_container">
          <div className="popup" style={{ padding: "20px 40px" }}>
            <FaTimes className="i" onClick={() => setShowPopup2(false)} />
            <form
              onSubmit={handleSubmit2}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="popup-text">Set GST Rate</p>
              <div
                className="select-field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div
                className="text_field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  placeholder="Enter GST Rate"
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGSTRate(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPopup3 && (
        <div className="popup_container">
          <div className="popup" style={{ padding: "20px 40px" }}>
            <FaTimes className="i" onClick={() => setShowPopup3(false)} />
            <form
              onSubmit={handleSubmit3}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="popup-text">Add Products</p>
              <div
                className="select-field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>

                  {categories.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div
                className="text_field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  placeholder="Enter Product Title"
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  required
                />
              </div>
              <div
                className="text_field"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  placeholder="Enter Product Price (in Rs.)"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit4}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #333",
          background: "white",
        }}
      >
        <h3 className="popup-text">Create Sale</h3>
        <div className="select-field">
          <select
            value={currentCategory}
            onChange={(e) => {
              setCurrentCategory(e.target.value);
              fetchProducts(e.target.value);
            }}
            required
          >
            <option value="">Select Category</option>

            {categories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="select-field">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select Product</option>

            {products?.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowTable(true);
            addProductToSale(e);
          }}
          type="button"
          className="add"
        >
          <FaPlus /> Add
        </button>
        {showTable && (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>GST Rate</th>
                <th>Price</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.product}</td>
                  <td>{detail.category}</td>
                  <td>{detail.gstRate}%</td>
                  <td>Rs. {detail.price}</td>
                  <td>Rs. {detail.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button type="submit">Submit</button>
      </form>
      {showBill && (
        <p
          style={{ background: "white" }}
          onClick={() => {
            fetchBill();
            setDisplayBill(true);
          }}
        >
          Show Bill
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>GST Rate</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bill.map((item) => (
            <tr key={item._id}>
              <td>{item.product}</td>
              <td>{item.category}</td>
              <td>{item.gstRate}%</td>
              <td>Rs. {item.price}</td>
              <td>Rs. {item.tax}</td>
              <td>Rs. {item.price + item.tax}</td>
            </tr>
          ))}
        </tbody>
        <p className="final-price">
          Final Price: Rs. {totalPrice !== 0 && totalPrice.toFixed(2)}
        </p>
      </table>
    </div>
  );
};

export default Dashboard;
