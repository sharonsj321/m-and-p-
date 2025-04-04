const express = require("express");
const router = express.Router();
const { auth, adminOnly, verifyToken, verifyRole } = require("../middlewares/authMiddleware");

const {
  addUser,
  viewUser,
  listUser,
  updateUser,
  deleteUser,
  createService,getAllUsers,getAllBookings
} = require("../controllers/adminController");
router.get("/users", verifyToken, verifyRole(["admin"]), getAllUsers);


// Admin routes
router.post("/adduser", verifyToken, adminOnly, addUser);
router.get("/listusers", verifyToken, adminOnly, listUser);
router.get("/viewuser/:id", verifyToken, adminOnly, viewUser);
router.put("/updateuser/:id", verifyToken, adminOnly, updateUser);
router.delete("/deleteuser/:id", verifyToken, adminOnly, deleteUser);

// Create service with role-based access
router.post(
  "/create-service",
  verifyToken,
  verifyRole(["admin", "seller", "customer"]), // ✅ Add 'customer' role
  createService
);
router.get("/bookings", verifyToken, verifyRole(["admin"]), getAllBookings);
router.get("/users", verifyToken, verifyRole(["admin"]), getAllUsers);



module.exports = router;
