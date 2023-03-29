

describe("Test de autenticación", () => {

    const authService = require('../Services/authService')

    test('datos para test de inicio de sesión', async () => {
        var auth = new authService();
        var data = {
            "email": "antony@email.com",
            "password": "123456"
        }
        expect(auth.login(data));
    });


})