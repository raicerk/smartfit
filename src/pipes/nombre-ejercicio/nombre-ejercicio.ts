import { Pipe, PipeTransform } from '@angular/core';
import { EjerciciosProvider } from '../../providers/ejercicios/ejercicios';

/**
 * Generated class for the NombreEjercicioPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
	name: 'nombreEjercicio',
})
export class NombreEjercicioPipe implements PipeTransform {

	ejerc = new EjerciciosProvider();

	transform(value: string, ...args) {
		let ejercicios = this.ejerc.get().find(ejer => ejer.tipo == args[0]).ejercicio;
		return ejercicios.find(ejerc => ejerc.numero == args[1]).nombre;
	}
}
