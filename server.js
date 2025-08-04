const app = require('./src/app')//Ruta del archivo ap
requiere ('dotenv').config()//Ruta del archivo dotenv

const port = process.env.PORT || 3000 //Puerto por defecto

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto',PORT )
})