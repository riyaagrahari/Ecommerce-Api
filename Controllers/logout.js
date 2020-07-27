const logout = (request, response) => {
    response.clearCookie('token');
    response.send("Logged out");
}
module.exports = logout