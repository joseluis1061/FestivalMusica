//src:source, dest: destination, watch
const{src, dest, watch, parallel} = require('gulp');
//Requiere el puente entre gulp-sass y la libreria de sass
const sass = require('gulp-sass')(require('sass'));
//Instanciar plumber evita el cierre de ejecución por errores
const plumber = require('gulp-plumber');
//Para optimizar imagenes 
const cache = require('gulp-cache'); //JPG
const imagemin = require('gulp-imagemin');

const webp = require('gulp-webp'); //Salida Webp

const avif = require('gulp-avif');//Salida gulp-avif



//Función para compilar scss a salida css
function css(done){
    //Identificar la cartpeta de orignen de estilos
    src("src/scss/**/*.scss")
    // Evitar el cierre por errores
        .pipe(plumber())
    //Compilarla.. pipe para una tarea secuencial
        .pipe(sass())
    //Almacenar la salida en estilos con extensión css 
        .pipe(dest("build/css"))
   
    done();
}

//Optimizar Calidad de imagenes
//Salida jpg
function imagenes(done){
    const opciones={
        optimizationLevel: 3
    }
    src('img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))//Transforma
        .pipe(dest('build/img'))//Guarda
    done();
}
//Salida WEBp
function versionWebp(done){
    //Opciones de transformación
    const opciones={
        //Nueva calidad
        quality:50
    }
    //Buscar todas las imagenes png y jpg
    src('img/**/*.{png,jpg}')
        .pipe(webp(opciones)) //transforma
        .pipe(dest('build/img'))//Guarda
    done()
}
//Salida Avif
function versionAvif(done){
    //Opciones de transformación
    const opciones={
        //Nueva calidad
        quality:50
    }
    //Buscar todas las imagenes png y jpg
    src('img/**/*.{png,jpg}')
        .pipe(avif(opciones)) //transforma
        .pipe(dest('build/img'))//Guarda
    done()
}

//Función para agregar cambios automaticos
function dev(done){
    //Requiere un archivo a estar atento a cambios y la función
    //que se ejecuta. Similar a un evento.
    watch("src/scss/**/*.scss",css);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes =imagenes;
exports.dev = parallel(versionAvif,imagenes,versionWebp,dev);