import React, { useState } from "react";
import useCartStore from "../store/cartStore";

const CartComponent = () => {
  const { items, addItem, removeItem } = useCartStore();
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem({
        id: Date.now(),
        name: newItemName,
      });
      setNewItemName("");
    }
  };

  return (
    <div className="cart-container">
      <h2>购物车</h2>
      <div className="add-item">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="输入商品名称"
        />
        <button onClick={handleAddItem}>添加商品</button>
      </div>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)}>删除</button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p>购物车是空的</p>}
    </div>
  );
};

export default CartComponent;
