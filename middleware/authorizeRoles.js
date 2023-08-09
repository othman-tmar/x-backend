const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const roleArray = [...roles]
        console.log(roleArray)
        console.log(req.admin)
        if (!roles.includes(req.admin.role)) {
            return res.status(401).send({ success: false, message: 'non autorisé' });
        }
        next()
    }
}
module.exports = { authorizeRoles }