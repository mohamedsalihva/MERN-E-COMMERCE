const userModel = require("../../models/userModel");

async function DeleteUser(req, res) {
    const { userId } = req.body;
    const requestorId = req.userId;
    console.log("Requestor ID:", requestorId);

    try {
   
        let requestor = await userModel.findById(requestorId);
        if (!requestor || requestor.role !== 'ADMIN') {
            return res.status(403).json({
                message: "You do not have permission to delete users",
                error: true,
                success: false
            });
        }

      
        let deletedUser = await userModel.deleteOne({ _id: userId });
        console.log("Deleted User:", deletedUser);

        if (deletedUser.deletedCount > 0) {
            return res.status(200).json({
                message: "User deleted",
                error: false,
                success: true,
            });
        } else {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
            success: false
        });
    }
}

module.exports = DeleteUser;


