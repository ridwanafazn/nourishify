import Nav from "../../component/Nav3";

function AdminManage() {
  return (
    <div>
      <Nav/>
      <h1>Manage Menu</h1>
      <table>
        <thead>
          <tr>
            <th>Image URL</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th>Is Available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="Image URL" /></td>
            <td><input type="text" placeholder="Nama" /></td>
            <td><input type="text" placeholder="Deskripsi" /></td>
            <td><input type="number" placeholder="Stok" /></td>
            <td><input type="checkbox" /></td>
            <td><button>Save</button></td>
            <td><button>Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminManage;