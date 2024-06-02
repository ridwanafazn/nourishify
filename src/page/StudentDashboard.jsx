import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarStudent from "../component/NavbarStudent";
import MenuCard from "../component/MenuCard";
import "../style/StudentDashboard.css";

const StudentDashboard = () => {
  const [menus, setMenus] = useState([]);
  const [claimedStatus, setClaimedStatus] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("studentToken");
      if (!token) {
        navigate("/login");
      }

      try {
        const [
          profileResponse,
          menusResponse,
          statusResponse,
          historyResponse,
        ] = await Promise.all([
          fetch("https://nourishify-api.vercel.app/api/students/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("https://nourishify-api.vercel.app/api/students/menus", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(
            "https://nourishify-api.vercel.app/api/students/check-claim-status",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            "https://nourishify-api.vercel.app/api/students/order-history",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        const profileData = await profileResponse.json();
        const menusData = await menusResponse.json();
        const statusData = await statusResponse.json();
        const historyData = await historyResponse.json();

        setMenus(menusData);
        setClaimedStatus(statusData.claimedToday);
        setOrderHistory(historyData);
        setUserName(profileData.name);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleClaimMenu = async (menuId) => {
    const token = localStorage.getItem("studentToken");
    try {
      const response = await fetch(
        "https://nourishify-api.vercel.app/api/students/claim-menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ menuId }),
        }
      );

      if (response.ok) {
        setClaimedStatus(true);
        const updatedMenus = menus.map((menu) =>
          menu._id === menuId ? { ...menu, stock: menu.stock - 1 } : menu
        );
        setMenus(updatedMenus);
      } else {
        const errorData = await response.json();
        console.error("Failed to claim menu:", errorData);
      }
    } catch (err) {
      console.error("Failed to claim menu:", err);
    }
  };

  return (
    <>
      <NavbarStudent />
      <div className="dashboard">
        <h1>Welcome to Student Dashboard</h1>
        <p>
          Hi {userName.split(" ").slice(0, 2).join(" ")} silahkan pilih menu
          yang anda inginkan
        </p>
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
        {!claimedStatus && selectedMenu && (
          <div className="menu-actions">
            <button
              style={{
                fontFamily: "DM Sans, sans-serif",
                margin: "1rem",
                backgroundColor: "#ad343e",
                color: "white",
                padding: "0.5rem 2rem",
              }}
              onClick={() => handleClaimMenu(selectedMenu)}
            >
              Klaim
            </button>
            <button
              style={{
                fontFamily: "DM Sans, sans-serif",
                margin: "1rem",
                padding: "0.5rem 2rem",
              }}
              onClick={() => setSelectedMenu(null)}
            >
              Batal
            </button>
          </div>
        )}

        <div className="claim-status">
          {claimedStatus ? (
            <p>
              Hi {userName.split(" ").slice(0, 2).join(" ")}. Kamu <b>telah</b>{" "}
              melakukan klaim makan bergizi hari ini
            </p>
          ) : (
            <p>
              Hi {userName.split(" ").slice(0, 2).join(" ")}. Kamu <b>belum</b>{" "}
              klaim makan bergizi hari ini
            </p>
          )}
        </div>
        <div className="order-history">
          <h2>Order History</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Menu</th>
                <th>Waktu</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => {
                const orderDate = new Date(order.orderDate);
                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.menu.name}</td>
                    <td>
                      {orderDate.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {orderDate.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
