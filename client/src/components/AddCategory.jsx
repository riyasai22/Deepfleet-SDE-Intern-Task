// import React, { useState } from "react";

// const AddCategory = () => {
//   const [categoryName, setCategoryName] = useState(""); // State to store the category name

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a POST request to create the category
//       const response = await fetch(
//         "http://localhost:5000/api/productCategories",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name: categoryName }),
//         }
//       );

//       if (response.ok) {
//         // Category created successfully
//         console.log("Category created");
//       } else {
//         // Handle error, e.g., show an error message to the user
//         console.error("Failed to create category");
//       }
//     } catch (error) {
//       console.error("Failed to create category", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Category</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Category Name:</label>
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Add Category</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;
