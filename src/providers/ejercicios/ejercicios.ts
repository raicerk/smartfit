import { Injectable } from '@angular/core';

/*
  Generated class for the EjerciciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EjerciciosProvider {

	TipoEjercicio: any = [
		{
			id: 0,
			tipo: "Piernas",
			ejercicio: [
				{
					numero: 1,
					nombre: "LEG PRESS"
				},
				{
					numero: 2,
					nombre: "LEG EXTENSION"
				},
				{
					numero: 3,
					nombre: "LEG CURL"
				},
				{
					numero: 4,
					nombre: "ABDUCTOR"
				},
				{
					numero: 5,
					nombre: "ADDUCTOR"
				},
				{
					numero: 6,
					nombre: "GLUTE"
				},
				{
					numero: 7,
					nombre: "ROTARY CALF"
				},
				{
					numero: 9,
					nombre: "LEG PRESS 450"
				}
			]
		},
		{
			id: 1,
			tipo: "Brazos",
			ejercicio: [
				{
					numero: 50,
					nombre: "SHOULDER PRESS"
				},
				{
					numero: 52,
					nombre: "ARM EXTENSION"
				},
				{
					numero: 53,
					nombre: "ARM CURL"
				},
				{
					numero: 54,
					nombre: "BANCO SCOTT"
				}
			]
		},
		{
			id: 2,
			tipo: "Tronco",
			ejercicio: [
				{
					numero: 20,
					nombre: "CHEST PRESS"
				},
				{
					numero: 22,
					nombre: "CHEST INCLINE"
				},
				{
					numero: 25,
					nombre: "PECTORAL"
				},
				{
					numero: 30,
					nombre: "LOW ROW"
				},
				{
					numero: 32,
					nombre: "PULLEY/PULL DOWN"
				},
				{
					numero: 34,
					nombre: "LAT MACHINE"
				}
			]
		},
		{
			id: 3,
			tipo: "Abdominal/Lumbar",
			ejercicio: [
				{
					numero: 40,
					nombre: "ABD. CRUNCH"
				},
				{
					numero: 43,
					nombre: "LOWER BACK"
				},
				{
					numero: 54,
					nombre: "LOWER BACK BENCH"
				}
			]
		}
	]

  constructor() {
    console.log('Hello EjerciciosProvider Provider');
  }

  get(){
  	return this.TipoEjercicio;
  }

}
