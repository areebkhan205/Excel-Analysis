import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FileText, Shield, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  // ✅ Check login & admin, then fetch everything
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        navigate("/");
        return;
      }

      await fetchData();
    });

    return unsubscribe;
  }, [navigate]);

  const fetchData = async () => {
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      setUsers(usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const uploadsSnap = await getDocs(collection(db, "uploads"));
      setUploads(uploadsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleChangeRole = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    if (date.toDate) return date.toDate().toLocaleString();
    if (date instanceof Date) return date.toLocaleString();
    return "N/A";
  };

  return (
    <div className="p-6 text-white min-h-screen relative bottom-[90px] ">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        🚀 Admin Control Center
      </h1>

      {/* Stats */}
      <div className=" flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-cyan-500/50 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Users size={36} className="text-cyan-400" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Total Users</h2>
              <p className="text-3xl font-bold text-white">{users.length.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 h-[100px] rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-purple-500/50 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <Shield size={36} className="text-purple-400" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Admins</h2>
              <p className="text-3xl font-bold text-white">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-green-500/50 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-4">
            <FileText size={26} className="text-green-400" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">Uploads</h2>
              <p className="text-3xl font-bold text-white">{uploads.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Registered Users</h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-white/10 backdrop-blur-lg">
        <table className="min-w-full bg-white/5 text-white">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-700/50 to-purple-700/50 text-left">
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleChangeRole(u.id, e.target.value)}
                    className="bg-gray-800/70 border border-white/20 p-1 rounded-lg focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">{formatDate(u.createdAt)}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow-md"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
