import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://6903a60fd0f10a340b253898.mockapi.io/api/contacts/Contacts"; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", contact: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // Email and phone validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // strictly 10 digits

    if (!formData.name.trim()) {
      setError("Name cannot be empty.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.contact)) {
      setError("Phone number must be 10 digits (numbers only).");
      return false;
    }

    setError("");
    return true;
  };

  // Add new contact
  const addContacts = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: "", email: "", contact: "" });
      setShowAddForm(false);
      fetchContacts();
    } catch (err) {
      console.error("Error adding contact:", err);
      alert("Failed to add contact. Please check the input fields.");
    }
  };

  // Save edited contact
  const saveEdit = async (id) => {
    if (!validateForm()) return;
    try {
      await axios.put(`${API_URL}/${id}`, formData);
      setEditingId(null);
      setFormData({ name: "", email: "", contact: "" });
      fetchContacts();
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filtering + pagination
  const filtered = contacts.filter((c) =>
    (c.name + c.email).toLowerCase().includes(filterName.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const avatarColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-orange-400",
    "bg-rose-400",
  ];

  return (
    <div className="min-h-screen p-6 bg-[#f5f6fa]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contact List</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#1e2b7a] text-white px-4 py-2 text-sm rounded-full hover:bg-[#141a51] transition"
        >
          {showAddForm ? "Close Form" : "Add Contact"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Search Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name or email"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full sm:w-[250px]"
          />
        </div>

        {/* Add Form */}
        {showAddForm && (
          <form
            onSubmit={addContacts}
            className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {["name", "email", "contact"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="border px-3 py-2 rounded text-sm w-full"
                required
              />
            ))}
            {error && (
              <p className="text-red-500 text-sm sm:col-span-2 md:col-span-3">{error}</p>
            )}
            <div className="sm:col-span-2 md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", email: "", contact: "" });
                  setShowAddForm(false);
                }}
                className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[900px]">
            <thead className="bg-[#f1f5ff] text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((c) =>
                editingId === c.id ? (
                  <tr key={c.id} className="border-t bg-gray-50">
                    {["name", "email", "contact"].map((field, i) => (
                      <td key={i} className="px-4 py-2">
                        <input
                          type="text"
                          value={formData[field] || ""}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                          className="border px-2 py-1 rounded w-full"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => saveEdit(c.id)}
                        className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 text-xs px-3 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
                      <span
                        className={`${avatarColors[c.id % avatarColors.length]} text-white text-xs font-semibold rounded-full w-8 h-8 flex items-center justify-center`}
                      >
                        {c.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </span>
                      <span className="text-blue-600 font-medium">{c.name}</span>
                    </td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3">{c.contact || "+91-9876543210"}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="bg-blue-100 text-blue-700 border border-blue-300 text-xs px-3 py-1 rounded hover:bg-blue-200"
                        onClick={() => {
                          setEditingId(c.id);
                          setFormData({ ...c });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-100 text-red-700 border border-red-300 text-xs px-3 py-1 rounded hover:bg-red-200"
                        onClick={() => deleteContact(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p className="text-gray-600">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-[#213072] hover:bg-gray-50"
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-[#213072] hover:bg-gray-50"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
