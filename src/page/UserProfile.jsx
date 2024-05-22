import { useState } from "react";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nisn: "123456",
    nama: "John Doe",
    jenisKelamin: "Laki-laki",
    tempatLahir: "Jakarta",
    tanggalLahir: "01-01-2000",
    rombel: "A",
    kelas: "12",
    password: "********",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Simpan perubahan ke server atau state management
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset data ke nilai semula jika diperlukan
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      
      <section>
        <h2>Data Siswa</h2>
        <div>
          <p>NISN: {isEditing ? <input name="nisn" value={profile.nisn} onChange={handleChange} /> : profile.nisn}</p>
          <p>Nama: {isEditing ? <input name="nama" value={profile.nama} onChange={handleChange} /> : profile.nama}</p>
          <p>Jenis Kelamin: {isEditing ? <input name="jenisKelamin" value={profile.jenisKelamin} onChange={handleChange} /> : profile.jenisKelamin}</p>
          <p>Tempat Lahir: {isEditing ? <input name="tempatLahir" value={profile.tempatLahir} onChange={handleChange} /> : profile.tempatLahir}</p>
          <p>Tanggal Lahir: {isEditing ? <input name="tanggalLahir" value={profile.tanggalLahir} onChange={handleChange} /> : profile.tanggalLahir}</p>
          <p>Rombel: {isEditing ? <input name="rombel" value={profile.rombel} onChange={handleChange} /> : profile.rombel}</p>
          <p>Kelas: {isEditing ? <input name="kelas" value={profile.kelas} onChange={handleChange} /> : profile.kelas}</p>
          <p>Password: {isEditing ? <input type="password" name="password" value={profile.password} onChange={handleChange} /> : profile.password}</p>
        </div>
        <div>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      </section>
      
      <section>
        <h2>Kuota</h2>
        <p>Kuota: Tersedia</p>
      </section>
      
      <section>
        <h2>History</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Menu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>01-01-2023</td>
              <td>12:00</td>
              <td>Nasi Goreng</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserProfile;
