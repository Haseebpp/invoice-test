import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const customer = {
  name: 'John',
  phone: '123',
  place: 'saudi arabia',
};

export default function App() {
  const inputReference = useRef(null);

  const [tab, setTab] = useState('invoice');

  const [product, setProduct] = useState({
    item: '',
    itemcode: '',
    quantity: '',
    price: '',
  });
  const { item, itemcode, quantity, price } = product;

  const [products, setProducts] = useState([]);
  const [total, settotal] = useState();

  const addProductHandler = (e) => {
    e.preventDefault();
    setProducts([...products, product]);

    let total = 0;
    products.forEach((product) => {
      total += product.quantity * product.price;
    });
    settotal(total);

    setProduct({
      item: '',
      itemcode: '',
      quantity: '',
      price: '',
    });
    inputReference.current.focus();
  };

  const onChangeHandler = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeProductHandler = (e, itemcode) => {
    const updatedProducts = products.map((product) => {
      if (product.itemcode === itemcode) {
        return {
          ...product,
          [e.target.name]: e.target.value,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // todays date
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  const today = mm + '/' + dd + '/' + yyyy;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Print Page',
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex gap-3 p-3">
          <button
            className="bg-slate-200 hover:bg-slate-300 p-2 rounded"
            onClick={() => setTab('invoice')}
          >
            invoice
          </button>
          <button
            className="bg-slate-200 hover:bg-slate-300 p-2 rounded"
            onClick={() => setTab('preview')}
          >
            preview
          </button>
        </div>
      </div>
      {tab === 'invoice' ? (
        <div class="flex w-full flex-col items-center gap-10 container mx-auto my-12 md:rounded-lg bg-white p-12 shadow-2xl shadow-gray-300">
          <div class="text-xl font-semibold text-gray-500 ">Add Invoice</div>
          <div class="flex w-full flex-col gap-5">
            <div class="w-full mx-auto">
              <div class="p-0">
                <table class="table-auto w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-left text-gray-700 font-bold">
                        Sl No.
                      </th>
                      <th class="px-4 py-2 text-left text-gray-700 font-bold">
                        Item
                      </th>
                      <th class="px-4 py-2 text-left text-gray-700 font-bold">
                        Item Code
                      </th>
                      <th class="px-4 py-2 text-left text-gray-700 font-bold">
                        Quantity
                      </th>
                      <th class="px-4 py-2 text-left text-gray-700 font-bold">
                        Unit Price
                      </th>
                      <th class="px-4 py-2 text-right text-gray-700 font-bold">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product, index) => (
                        <tr key={index}>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            {index + 1}
                          </td>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            <input
                              type="text"
                              name="item"
                              value={product.item}
                              onChange={(e) =>
                                changeProductHandler(e, product.itemcode)
                              }
                              placeholder="Item"
                              class="w-full border-2 border-white hover:border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                            />
                          </td>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            <input
                              type="textcode"
                              name="itemcode"
                              value={product.itemcode}
                              onChange={(e) =>
                                changeProductHandler(e, product.itemcode)
                              }
                              placeholder="Item Code"
                              class="w-full border-2 border-white hover:border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                            />
                          </td>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            <input
                              type="text"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) =>
                                changeProductHandler(e, product.itemcode)
                              }
                              placeholder="Item"
                              class="w-full border-2 border-white hover:border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                            />
                          </td>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            <input
                              type="text"
                              name="price"
                              value={product.price}
                              onChange={(e) =>
                                changeProductHandler(e, product.itemcode)
                              }
                              placeholder="Item"
                              class="w-full border-2 border-white hover:border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                            />
                          </td>
                          <td class="border-b px-4 py-2 text-right text-gray-800">
                            ${product.quantity * product.price}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <form
                  onSubmit={addProductHandler}
                  className="flex flex-row justify-between items-center gap-5"
                >
                  <table class="table-auto w-full">
                    <tbody>
                      <tr>
                        <td class="border-b px-4 py-2 text-left text-gray-800">
                          {Object.keys(products).length + 1}
                        </td>
                        <td class="border-b px-1 py-2 text-left text-gray-800">
                          <input
                            type="text"
                            name="item"
                            value={item}
                            onChange={onChangeHandler}
                            placeholder="Item"
                            class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                            ref={inputReference}
                          />
                        </td>
                        <td class="border-b px-1 py-2 text-left text-gray-800">
                          <input
                            type="text"
                            name="itemcode"
                            value={itemcode}
                            onChange={onChangeHandler}
                            placeholder="Item Code"
                            class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                          />
                        </td>
                        <td class="border-b px-1 py-2 text-left text-gray-800">
                          <input
                            type="text"
                            name="quantity"
                            value={quantity}
                            onChange={onChangeHandler}
                            placeholder="Quantity"
                            class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                          />
                        </td>
                        <td class="border-b px-1 py-2 text-left text-gray-800">
                          <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={onChangeHandler}
                            placeholder="Price"
                            class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-700"
                          />
                        </td>
                        <td class=" px-4 py-2 text-right text-gray-800">
                          ${price * quantity}
                          <button type="submit"></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
                <div class="flex justify-end mt-6">
                  <div class="font-bold text-gray-700">Total:</div>
                  <div class="text-gray-800 px-4">{total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : tab === 'preview' ? (
        <div>
          <div class="w-[500px] mx-auto text-base">
            <div ref={componentRef} class="p-8 bg-white shadow-md rounded-lg">
              <h1 class="text-3xl font-bold mb-6">Invoice</h1>
              <div class="flex items-center mb-4">
                <div class="w-1/4 font-bold text-gray-700">Date:</div>
                <div class="w-3/4 text-gray-800">{today}</div>
              </div>
              <div class="flex items-center mb-4">
                <div class="w-1/4 font-bold text-gray-700">To:</div>
                <div class="w-3/4 text-gray-800">{customer.name}</div>
              </div>
              <table class="table-auto w-full">
                <thead>
                  <tr>
                    <th class="border-b px-4 py-2 text-left text-gray-700 font-bold">
                      Item
                    </th>
                    <th class="border-b px-4 py-2 text-left text-gray-700 font-bold">
                      Quantity
                    </th>
                    <th class="border-b px-4 py-2 text-right text-gray-700 font-bold">
                      Price
                    </th>
                    <th class="border-b px-4 py-2 text-right text-gray-700 font-bold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // map invoice products
                    products.map((product) => {
                      return (
                        <tr>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            {product.item}
                          </td>
                          <td class="border-b px-4 py-2 text-left text-gray-800">
                            {product.quantity}
                          </td>
                          <td class="border-b px-4 py-2 text-right text-gray-800">
                            {product.price}
                          </td>
                          <td class="border-b px-4 py-2 text-right text-gray-800">
                            {product.price * product.quantity}
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <div class="flex items-center mt-6">
                <div class="w-1/4 font-bold text-gray-700">Total:</div>
                <div class="w-3/4 text-gray-800 text-right">{total}</div>
              </div>
            </div>
          </div>
          <div class="w-full flex p-5">
            <button
              class="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrint}
            >
              Print this out!
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
