import { Observable, Subject } from 'rxjs';

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