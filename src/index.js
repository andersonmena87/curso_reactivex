import { Observable, Subject, from, of, asyncScheduler, interval, timer } from 'rxjs';
import { map, reduce, filter } from 'rxjs/operators';

const lineaSepardora = "-".repeat(5);

const observableAlfa$ = new Observable( subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next('Texto');
    //Si se pone el complete en esta linea hasta aquí se ejecuta el next
    //subscriber.complete();
    subscriber.next({text: true});
    subscriber.complete();
})

const observador = {
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('Termino');
    },
    error: (error) => {
        console.error(error);
    }
}

observableAlfa$.subscribe(observador);


//Ejemplo subject

console.log('-'.repeat(10) + 'SubJect' + '-'.repeat(10));

const numbers$ = new Observable( subscribe => {
    subscribe.next(Math.round(Math.random() * 100));
})

const numbersSubject$ = new Subject();

const observador1 = {
    next: (value) => {
        console.log(value)
    }
}

const observador2 = {
    next: (value) => {
        console.log(value)
    }
}

numbersSubject$.subscribe(observador1);
numbersSubject$.subscribe(observador2);

//Suscibiendo el subject(sujeto - sujeta) al observable
// Se deben suscribir los observadores primero para que el subject la emita los valores
//En este caso el random emitira el mismo valor  a los boservadores
numbers$.subscribe(numbersSubject$);

//nota se pueden seguir emitendo valores a los observadores
numbersSubject$.next(80);


//From
const fruits$ = from(['Manzana', 'Banano', 'Pera']);

fruits$.subscribe(console.log);


//of
const fruits2$ = of(['Manzana', 'Banano', 'Pera']);

fruits2$.subscribe(console.log);

//asyncScheduler
const fruits3$ = from(['Manzana', 'Banano', 'Pera'], asyncScheduler);

fruits$.subscribe(console.log);


//Interval
//parame en milisegundos
const secuenceNumbers$ = interval(2000);
//secuenceNumbers$.subscribe(console.log);

//Timer
//Parametro en milisegundos, ese el tiempo que esperará para ejecutarse
const delayedTimer$ = timer(5000);
delayedTimer$.subscribe(console.log)

console.log(lineaSepardora + "Operadores pipeables" + lineaSepardora);
console.log(lineaSepardora + "Map - Filter" + lineaSepardora);
//Map
//Muta los itmes dentro del arreglo -> devuelve un nuevo arreglo
//Filter
//Reduce el arreglo segun la condición que se le ponga
const numbers2$ = from([1 , 2, 3, 4 , 5, 6, 7 ,8]).pipe(
    map(number => number * 2),
    filter(number => number > 10)
);
numbers2$.subscribe(console.log);

console.log(lineaSepardora + "Reduce" + lineaSepardora);
//Reduce
//Acumula y ddevuleve la suma de los items (la variable acc: es el acumulador empieza en 0 por defecto)
const numbers3$ = from([1 , 2, 3, 4 , 5, 6, 7 ,8]).pipe(
    reduce((acc, number) => acc + number)
);
numbers3$.subscribe(console.log);




