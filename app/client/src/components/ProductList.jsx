import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.product.name}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.product.price}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.product.quantity}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.product._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteProduct(props.product._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // This method fetches the products from the database.
  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:3000/products/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const products = await response.json();
      setProducts(products.data);
    }
    getProducts();
    return;
  }, [products.length]);

  // This method will delete a product
  async function deleteProduct(id) {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    const newProducts = products.filter((el) => el._id !== id);
    setProducts(newProducts);
  }

  // This method will map out the products on the table
  function productList() {
    return products.map((product) => {
      return (
        <Product
          product={product}
          deleteProduct={() => deleteProduct(product._id)}
          key={product._id}
        />
      );
    });
  }

  // This following section will display the table with the products of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Products</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Price
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Quantity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {productList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}