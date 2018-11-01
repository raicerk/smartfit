import { NgModule } from '@angular/core';
import { NombreEjercicioPipe } from './nombre-ejercicio/nombre-ejercicio';
import { SecondtominutesPipe } from './secondtominutes/secondtominutes';
@NgModule({
	declarations: [NombreEjercicioPipe,
    SecondtominutesPipe],
	imports: [],
	exports: [NombreEjercicioPipe,
    SecondtominutesPipe]
})
export class PipesModule {}
