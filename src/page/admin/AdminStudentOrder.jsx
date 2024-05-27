import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/NavbarStaff';
import MenuCard from '../../component/MenuCard';
import '../../style/AdminDashboard.css';

const AdminStudentOrder = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [nisn, setNisn] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
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
    if (!nisn) {
      setError("Harap isi data NISN siswa terlebih dahulu!");
      setSuccess("");
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      // Check claim status
      const statusResponse = await fetch(`https://nourishify-api.vercel.app/api/staff/check-claim-status/${nisn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        setError(errorData.msg || 'Terjadi kesalahan. Silakan coba lagi.');
        setSuccess("");
        return;
      }

      const statusData = await statusResponse.json();

      if (statusData.claimedToday) {
        setError("Jatah makan bergizi mahasiswa dengan NISN tersebut sudah diklaim, coba lagi besok!");
        setSuccess("");
        return;
      }

      // Claim the menu for the student
      const response = await fetch(`https://nourishify-api.vercel.app/api/staff/claim-order/${nisn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuId: selectedMenu }),
      });

      if (response.ok) {
        const updatedHistory = await response.json();
        setError("");
        setSuccess("Order claimed successfully!");

        // Reduce the stock of the selected menu
        setMenus((prevMenus) =>
          prevMenus.map((menu) =>
            menu._id === selectedMenu ? { ...menu, stock: menu.stock - 1 } : menu
          )
        );

        // Update the menu stock in backend
        const selectedMenuObj = menus.find(menu => menu._id === selectedMenu);
        if (selectedMenuObj) {
          await fetch('https://nourishify-api.vercel.app/api/staff/manage-menu', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ menuId: selectedMenu, isActive: selectedMenuObj.isActive, stock: selectedMenuObj.stock - 1 }),
          });
        }
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Terjadi kesalahan. Silakan coba lagi.');
        setSuccess("");
      }
    } catch (err) {
      console.error('Failed to claim menu:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Staff Kantin Dashboard</h1>
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
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminStudentOrder;
