import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaToggleOn,
  FaToggleOff,
  FaCode,
} from "react-icons/fa";

import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
  toggleTag,
} from "@/services/tagService";

interface Tag {
  id: number;
  tag_name: string;
  tag_code: string;
  location: "head" | "body";
  is_active: boolean;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagCode, setTagCode] = useState("");
  const [location, setLocation] = useState<"head" | "body">("head");
  const [editingId, setEditingId] = useState<number | null>(null);

  /* ================= LOAD TAGS ================= */

  const loadTags = async () => {
    const data = await getTags();
    setTags(data);
  };

  useEffect(() => {
    loadTags();
  }, []);

  /* ================= ADD TAG ================= */

  const addTag = async () => {
    if (!tagName || !tagCode) {
      alert("Please fill all fields");
      return;
    }

    await createTag({
      tag_name: tagName,
      tag_code: tagCode,
      location,
    });

    setTagName("");
    setTagCode("");
    setLocation("head");

    loadTags();
  };

  /* ================= EDIT TAG ================= */

  const startEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setTagName(tag.tag_name);
    setTagCode(tag.tag_code);
    setLocation(tag.location);
  };

  const saveEdit = async () => {
    if (!editingId) return;

    await updateTag(editingId, {
      tag_name: tagName,
      tag_code: tagCode,
      location,
    });

    setEditingId(null);
    setTagName("");
    setTagCode("");
    setLocation("head");

    loadTags();
  };

  /* ================= DELETE ================= */

  const removeTag = async (id: number) => {
    if (!confirm("Delete this tag?")) return;

    await deleteTag(id);

    loadTags();
  };

  /* ================= TOGGLE ================= */

  const toggleStatus = async (id: number) => {
    await toggleTag(id);
    loadTags();
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}

      <div className="flex items-center gap-3 mb-6">
        <FaCode className="text-blue-600 text-2xl" />
        <h1 className="text-2xl font-bold text-gray-800">
          Tracking Tags Manager
        </h1>
      </div>

      {/* ================= ADD FORM ================= */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Tag" : "Add New Tag"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tag Name (Google Analytics, Meta Pixel)"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="border rounded-lg p-2"
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value as "head" | "body")}
            className="border rounded-lg p-2"
          >
            <option value="head">Head</option>
            <option value="body">Body</option>
          </select>
        </div>

        <textarea
          placeholder="Paste full tracking script here..."
          value={tagCode}
          onChange={(e) => setTagCode(e.target.value)}
          className="border rounded-lg p-3 w-full mt-4 h-40 font-mono text-sm"
        />

        <button
          onClick={editingId ? saveEdit : addTag}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg mt-4"
        >
          {editingId ? <FaSave /> : <FaPlus />}
          {editingId ? "Save Changes" : "Add Tag"}
        </button>
      </div>

      {/* ================= TAG TABLE ================= */}

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Tag Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tags.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No Tags Added Yet
                </td>
              </tr>
            )}

            {tags.map((tag) => (
              <tr
                key={tag.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{tag.tag_name}</td>

                <td className="p-4 capitalize">{tag.location}</td>

                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(tag.id)}
                    className="text-xl"
                  >
                    {tag.is_active ? (
                      <FaToggleOn className="text-green-500" />
                    ) : (
                      <FaToggleOff className="text-gray-400" />
                    )}
                  </button>
                </td>

                <td className="p-4 flex gap-4 text-gray-600">
                  <button
                    onClick={() => startEdit(tag)}
                    className="hover:text-blue-600 transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => removeTag(tag.id)}
                    className="hover:text-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}