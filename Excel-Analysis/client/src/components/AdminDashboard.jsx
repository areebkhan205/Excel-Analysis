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
    <div className="p-4 md:p-6 text-white min-h-screen relative bottom-[90px]">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
        🚀 Admin Control Center
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
        {/* Users */}
        <div className="p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-cyan-500/50 hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-3 md:gap-4">
            <Users size={28} className="md:w-9 md:h-9 text-cyan-400" />
            <div>
              <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-300">
                Total Users
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl font-bold text-white">
                {users.length.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-purple-500/50 hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-3 md:gap-4">
            <Shield size={28} className="md:w-9 md:h-9 text-purple-400" />
            <div>
              <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-300">
                Admins
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl font-bold text-white">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
          </div>
        </div>

        {/* Uploads */}
        <div className="p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-green-500/50 hover:scale-[1.03] transition-transform duration-300">
          <div className="flex items-center gap-3 md:gap-4">
            <FileText size={24} className="md:w-8 md:h-8 text-green-400" />
            <div>
              <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-300">
                Uploads
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl font-bold text-white">
                {uploads.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-cyan-400">
        Registered Users
      </h2>

      {/* ✅ Responsive wrapper */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-white/10 backdrop-blur-lg">
        <table className="w-full text-xs sm:text-sm md:text-base bg-white/5 text-white">
          {/* Hide header on mobile */}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gradient-to-r from-cyan-700/50 to-purple-700/50 text-left">
              <th className="p-2 sm:p-3">Email</th>
              <th className="p-2 sm:p-3">Role</th>
              <th className="p-2 sm:p-3">Created At</th>
              <th className="p-2 sm:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="block sm:table-row border sm:border-0 mb-4 sm:mb-0 rounded-lg sm:rounded-none bg-gray-900/50 sm:bg-transparent"
              >
                {/* Email */}
                <td className="block sm:table-cell p-2 sm:p-3 break-words">
                  <span className="sm:hidden font-semibold text-cyan-400">
                    Email:{" "}
                  </span>
                  <span className="block truncate" title={u.email}>
                    {u.email}
                  </span>
                </td>

                {/* Role Select */}
                <td className="block sm:table-cell p-2 sm:p-3">
                  <span className="sm:hidden font-semibold text-cyan-400">
                    Role:{" "}
                  </span>
                  <select
                    value={u.role}
                    onChange={(e) => handleChangeRole(u.id, e.target.value)}
                    className="bg-gray-800/70 border border-white/20 px-2 py-1 rounded-lg text-xs sm:text-sm focus:outline-none w-full sm:w-auto"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Date */}
                <td className="block sm:table-cell p-2 sm:p-3 whitespace-nowrap">
                  <span className="sm:hidden font-semibold text-cyan-400">
                    Created At:{" "}
                  </span>
                  {formatDate(u.createdAt)}
                </td>

                {/* Delete */}
                <td className="block sm:table-cell p-2 sm:p-3 text-center">
                  <span className="sm:hidden font-semibold text-cyan-400">
                    Actions:{" "}
                  </span>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-lg shadow-md"
                  >
                    <Trash2 size={14} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-400 text-sm"
                >
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
