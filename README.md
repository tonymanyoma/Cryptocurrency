![Image text](https://www.semana.com/resizer/V3PfnzpOb2pBVYf8IQtRdFLmcN4=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/FRSZT6UL5NHI3CYKXVH2O6FMWE.jpg)

# App que integra api de criptomonedas 
> App construida en Node js y vue js que lista las criptomonedas de el api de coin base
> https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/api-currencies 

## Configuración y requisitos

## Frontend
  - Node js v14.16.0
  - npm  v 6.14.11

## Backend
  - mysql
  - Node js v14.16.0
  - npm  v 6.14.11

## Instalación

## Frontend
  - Ejecutar npm install
  - Lanzar aplicacion con npm run serve

## Backend
  - Crear archivo .env con la configuración de las variables de entorno para la base de datos, autenticación y url del api de coin base 
    ```
        DB_DATABASE=cryptocurrency
        DB_USER=
        DB_PASSWORD=
        COIN_BASE_URL=https://api.coinbase.com/v2/

        JWT_SECRET=Ku0dN5PcndTjRgnLx3kKTA==
        JWT_REFRESH_SECRET=xe/bBnxXfgj27g0VELF6ow==
        JWT_EXPIRES=6d
        JWT_REFRESH_EXPIRATION=10d
    ```
  - Importar el archivo sql ubicado en la carpeta sql
  - Ejecutar npm install
  - Lanzar aplicacion con node app.js o npm run watch(esta se ejecutará con nodemom)


# Endpoints disponibles

1. Registrar usuario

  - url http://localhost:4001/api/auth/register
  - Method POST
  - Params
  ```
    {
      "name": "chester manyoma",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      "email": "chester@email.com",
      "password": "123456"
    }
  ```
  - Response 

  ```
  {
    "message": "Usuario registrado con éxito",
    "data": {
        "id": 13,
        "name": "chester manyoma",
        "email": "chester@email.com",
        "image": "avatar.png",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
        "password": "$2b$10$6Zwm2UpQtVfM9SueSRo55../SVaj5Ga2W1RcaLomP6eQgZoMHeYt6",
        "updatedAt": "2023-03-29T13:51:30.855Z",
        "createdAt": "2023-03-29T13:51:30.855Z"
    }
  }
  ```

  2. Iniciar sesión

  - url http://localhost:4001/api/auth/login
  - Method POST
  - Params
  ```
    {
      "email": "chester@email.com",
      "password": "123456"
    }
  ```
  - Response 

  ```
  {
    "message": "Sesión iniciada con éxito",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMywibmFtZSI6ImNoZXN0ZXIgbWFueW9tYSIsImVtYWlsIjoiY2hlc3RlckBlbWFpbC5jb20iLCJpbWFnZSI6ImF2YXRhci5wbmciLCJkZXNjcmlwdGlvbiI6ImVzIGJvbml0byIsInBhc3N3b3JkIjoiJDJiJDEwJDZad20yVXBRdFZmTTlTdWVTUm81NS4uL1NWYWo1R2EyVzFSY2FMb21QNmVRZ1pvTUhlWXQ2IiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0yOVQxMzo1MTozMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0yOVQxMzo1MTozMC4wMDBaIn0sImlhdCI6MTY4MDA5Nzk2OCwiZXhwIjoxNjgwNjE2MzY4fQ.4KPQShyFSii8S601t3eOz-XdBB34CAB1dc9uWqlNLh0",
    "userId": 13
  }
  ```

  3. Obtener criptomonedas

  - url http://localhost:4001/api/crypto/getCryptoCurrency
  - Method GET
  - Headers
  ```
    "Authorization": "Bearer eyJhbGciOiJIUzI1..."
    
  ```
  - Response 

  ```
  {
    "message": "Criptomonedas consultadas",
    "data": [
        {
            "code": "BTC",
            "name": "Bitcoin",
            "color": "#F7931A",
            "sort_index": 100,
            "exponent": 8,
            "type": "crypto",
            "address_regex": "^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^(bc1[qzry9x8gf2tvdw0s3jn54khce6mua7l]([qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}|[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}))$",
            "asset_id": "5b71fc48-3dd3-540c-809b-f8c94d0e68b5"
        },
    ]
  }
  ```

  4. Obtener valor de una criptomoneda

  - url http://localhost:4001/api/crypto/priceCryptoCurrency
  - Method POST
  - Params
  ```
    {
      "id": "BTC"
    }
    
  ```
  - Headers
  ```
    "Authorization": "Bearer eyJhbGciOiJIUzI1..."
    
  ```
  - Response 

  ```
  {
    "message": "Precio consultado",
    "data": {
        "data": {
            "base": "BTC",
            "currency": "USD",
            "amount": "28692.54"
        }
    }
  }
  ```

   5. Obtener información de un usuario

  - url http://localhost:4001/api/user/getUser
  - Method POST
  - Params
  ```
    {
      "id": 13
    }
    
  ```
  - Headers
  ```
    "Authorization": "Bearer eyJhbGciOiJIUzI1..."
    
  ```
  - Response 

  ```
  {
    "message": "Usuario consultado",
    "data": {
        "id": 13,
        "name": "chester manyoma",
        "email": "chester@email.com",
        "image": "avatar.png",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
        "createdAt": "2023-03-29T13:51:30.000Z",
        "updatedAt": "2023-03-29T13:51:30.000Z"
    }
  }
  ```

   6. Actualizar información de un usuario

  - url http://localhost:4001/api/user/updateUser
  - Method POST
  - Params
  ```
    {
      "id": 13,
      "name": "chester manyomaa",
      "description": " Lorem Ipsum"
    }
    
  ```
  - Headers
  ```
    "Authorization": "Bearer eyJhbGciOiJIUzI1..."
    
  ```
  - Response 

  ```
  {
    "message": "Usuario actualizado"
  }
  ```


# Pruebas unitarias

## Frontend
  - Ejecutar npm run test:unit (este es un test para verificar el cambio de una variable booleana para mostrar u ocultar los cards en donde se visualizan las criptomonedas)

## Backend
 - npm test (este es un test para el método login de el servicio de autenticación el cual se encarga de realizar el login)
