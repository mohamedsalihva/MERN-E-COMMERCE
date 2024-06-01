const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

      
        const user = await userModel.findById(sessionUser);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

      
        if (role && user.role !== 'ADMIN') {
            return res.status(403).json({
                message: "You do not have permission to update the role",
                error: true,
                success: false
            });
        }

       
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User to update not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: updatedUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
