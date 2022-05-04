// function nuevaTarea(done){
//     console.log("Ejecutando nueva tarea");
//     //Como es un callback requiere una función que indique que termino
//     done();
// }
// exports.nuevaTarea=nuevaTarea;

//162?
//src:source, dest: destination, watch
const{src, dest, watch} = require('gulp');
//Requiere el puente entre gulp-sass y la libreria de sass
const sass = require('gulp-sass')(require('sass'));

//Función para compilar scss a salida css
function css(done){
    //Identificar la cartpeta de orignen de estilos
    src("src/scss/app.scss")
    //Compilarla.. pipe para una tarea secuencial
        .pipe(sass())
    //Almacenar la salida en estilos con extensión css 
        .pipe(dest("build/css"))
    
    done();
}

//Función para agregar cambios automaticos
function dev(done){
    //Requiere un destino a estar atento y la función
    //que se ejecuta similar a un evento
    watch('src/scss/app.scss',css);
    done();
}

exports.css = css;
exports.dev = dev;