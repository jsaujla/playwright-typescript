module.exports = {
    valid: {
        username: "Admin",
        password: "admin123"
    },
    invalid: [
        {
            username: "invaliduser",
            password: "invalidpass",
            errorMessage: "Required"
        },
        {
            username: "invaliduser2",
            password: "invalidpass2",
            errorMessage: "Invalid credentials"
        }
    ]
}
