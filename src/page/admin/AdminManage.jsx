import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/NavbarStaff';
import '../../style/AdminManage.css';

const AdminManage = () => {
  const [menus, setMenus] = useState([]);
  const [editMenuId, setEditMenuId] = useState(null);
  const [editStock, setEditStock] = useState('');
  const [editIsActive, setEditIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        const response = await fetch('https://nourishify-api.vercel.app/api/staff/all-menus', {  // Gunakan endpoint baru
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setMenus(data);
      } catch (err) {
        console.error('Failed to fetch menus:', err);
      }
    };

    fetchMenus();
  }, [navigate]);

  const handleEditClick = (menu) => {
    setEditMenuId(menu._id);
    setEditStock(menu.stock);
    setEditIsActive(menu.isActive);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('https://nourishify-api.vercel.app/api/staff/manage-menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          menuId: editMenuId,
          isActive: editIsActive,
          stock: editStock,
        }),
      });

      if (response.ok) {
        const updatedMenu = await response.json();
        setMenus(menus.map(menu => menu._id === editMenuId ? updatedMenu : menu));
        setEditMenuId(null);
      } else {
        console.error('Failed to update menu:', response.statusText);
      }
    } catch (err) {
      console.error('Failed to update menu:', err);
    }
  };

  const handleCancelClick = () => {
    setEditMenuId(null);
  };

  return (
    <>
      <Navbar />
      <div className="manage-container">
        <h1>Manage Menus</h1>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Nama Menu</th>
              <th>Deskripsi</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu._id}>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>
                  {editMenuId === menu._id ? (
                    <input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                    />
                  ) : (
                    menu.stock
                  )}
                </td>
                <td>
                  {editMenuId === menu._id ? (
                    <select
                      value={editIsActive}
                      onChange={(e) => setEditIsActive(e.target.value === 'true')}
                    >
                      <option value="true">Aktif</option>
                      <option value="false">Non-Aktif</option>
                    </select>
                  ) : (
                    menu.isActive ? 'Aktif' : 'Non-Aktif'
                  )}
                </td>
                <td>
                  {editMenuId === menu._id ? (
                    <>
                      <button className="save-btn" onClick={handleSaveClick}>Save</button>
                      <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditClick(menu)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminManage;
