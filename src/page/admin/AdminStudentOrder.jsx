import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/NavbarStaff';
import MenuCard from '../../component/MenuCard';
// import '../../style/AdminDashboard.css';

const AdminStudentOrder = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [nisn, setNisn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
      }

      try {
        const menusResponse = await fetch('https://nourishify-api.vercel.app/api/students/menus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const menusData = await menusResponse.json();
        setMenus(menusData);
      } catch (err) {
        console.error('Failed to fetch menus:', err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleClaimMenu = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('https://nourishify-api.vercel.app/api/staff/claim-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuId: selectedMenu, nisn }),
      });

      if (response.ok) {
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (err) {
      console.error('Failed to claim menu:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Admin Student Order</h1>
        <div className="menu-list">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <MenuCard
                key={menu._id}
                imageUrl={menu.imageUrl}
                nama={menu.name}
                detail={menu.description}
                stok={`Stok: ${menu.stock} Porsi`}
                isSelected={selectedMenu === menu._id}
                onClick={() => setSelectedMenu(menu._id)}
              />
            ))
          ) : (
            <p>Loading menus...</p>
          )}
        </div>
        {selectedMenu && (
          <div className="menu-actions">
            <input
              type="text"
              placeholder="Masukkan NISN siswa"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
            />
            <button
              style={{
                fontFamily: 'DM Sans, sans-serif',
                margin: '1rem',
                backgroundColor: '#ad343e',
                color: 'white',
              }}
              onClick={handleClaimMenu}
            >
              Klaim
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminStudentOrder;
