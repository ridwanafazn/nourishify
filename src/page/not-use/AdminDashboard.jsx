import React, { useState } from "react";
import Logo from "../../component/Logo";

function AdminDashboard() {
  const [menus, setMenus] = useState([]);
  const [claims, setClaims] = useState([]);
  const [form, setForm] = useState({ name: "", stock: "", claim: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddMenu = () => {
    setMenus([...menus, { name: form.name, stock: form.stock }]);
    setForm({ ...form, name: "", stock: "" });
  };

  const handleAddClaim = () => {
    setClaims([...claims, { claim: form.claim }]);
    setForm({ ...form, claim: "" });
  };

  return (
    <div className="admin-dashboard">
      <Logo />
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Add Menu Item</h2>
          <input
            type="text"
            name="name"
            placeholder="Menu Name"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleInputChange}
          />
          <button onClick={handleAddMenu}>Add Menu</button>
        </section>
        <section>
          <h2>Menu List</h2>
          <table>
            <thead>
              <tr>
                <th>Menu Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={index}>
                  <td>{menu.name}</td>
                  <td>{menu.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>User Claims</h2>
          <input
            type="text"
            name="claim"
            placeholder="User Claim"
            value={form.claim}
            onChange={handleInputChange}
          />
          <button onClick={handleAddClaim}>Add Claim</button>
          <table>
            <thead>
              <tr>
                <th>Claim</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr key={index}>
                  <td>{claim.claim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
