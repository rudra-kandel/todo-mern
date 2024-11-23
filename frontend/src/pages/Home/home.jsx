import { useEffect, useState } from "react";
import axios from "axios";
import tokenService from "@services/service-token";
import { useNavigate } from "react-router-dom";
import URL from "../../constants/apiurl";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add", "edit", "view"
  const [taskToModify, setTaskToModify] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  const token = tokenService.getToken().access;
  let headers = { Authorization: "Bearer " + token };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${URL}api/tasks`, { headers });
      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleLogout = () => {
    tokenService.clear_token();
    navigate("/login");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTask.title.trim()) newErrors.title = "Title is required.";
    if (newTask.title.trim().length > 50)
      newErrors.title = "Title must be less 50 characters.";
    if (!newTask.description.trim())
      newErrors.description = "Description is required.";
    if (newTask.description.trim().length > 100)
      newErrors.description = "Description must be less 100 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (modalMode === "add") {
        const { data } = await axios.post(`${URL}api/tasks`, newTask, {
          headers,
        });
        setTasks((prev) => [...prev, data.data]);
      } else if (modalMode === "edit" && taskToModify) {
        const { data } = await axios.put(
          `${URL}api/tasks/${taskToModify.id}`,
          newTask,
          { headers },
        );
        setTasks((prev) =>
          prev.map((task) => (task.id === taskToModify.id ? data.data : task)),
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error modifying task", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${URL}api/tasks/${id}`, { headers });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTask({ title: "", description: "" });
    setTaskToModify(null);
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "all" ? true : task.status === filterStatus,
  );

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-lg font-bold">To-Do App</h1>
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-200 rounded px-2 py-1 shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => {
              setModalMode("add");
              setShowModal(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Task List */}
      <div className="p-6">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tasks found!</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold truncate">{task.title}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    {task.description}
                  </p>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                      task.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setModalMode("view");
                        setTaskToModify(task);
                        setNewTask({
                          title: task.title,
                          description: task.description,
                        });
                        setShowModal(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setModalMode("edit");
                        setTaskToModify(task);
                        setNewTask({
                          title: task.title,
                          description: task.description,
                          status: task.status,
                        });
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              modalMode === "add" || modalMode === "edit" ? "w-[32rem]" : "w-96"
            } bg-white rounded-lg shadow-lg p-6 relative`}
          >
            <h2 className="text-lg font-bold mb-4">
              {modalMode === "add"
                ? "Add New Task"
                : modalMode === "edit"
                  ? "Edit Task"
                  : "View Task"}
            </h2>
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  disabled={modalMode === "view"}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter task title"
                />
                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description}
                  disabled={modalMode === "view"}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter task description"
                  rows={3}
                ></textarea>
                <div className="text-red-500 text-sm mt-1">
                  {errors.description}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={newTask.status || "pending"}
                  disabled={modalMode !== "edit"}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {modalMode !== "view" && (
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {modalMode === "add" ? "Add Task" : "Save Changes"}
                  </button>
                </div>
              )}
              {modalMode === "view" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
