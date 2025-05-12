google.charts.load("current", { packages: ["corechart"] });

function leer() {
	const correctas = {
		p1: "1994",
		p2: "1977",
		p3: "2008",
		p4: "1999",
		p5: "1993"
	};

	let puntos = 0;
	let correctasTotales = 0;
	let resultado = "";

	for (let i = 1; i <= 5; i++) {
		let opciones = document.getElementsByName("p" + i);
		let seleccion = "";
		for (let j = 0; j < opciones.length; j++) {
			if (opciones[j].checked) {
				seleccion = opciones[j].value;
				break;
			}
		}

		if (seleccion === "") {
			resultado += `<br>Pregunta ${i}: No respondida`;
		} else if (seleccion === correctas["p" + i]) {
			resultado += `<br>Pregunta ${i}: Correcta`;
			puntos += 20;
			correctasTotales++;
		} else {
			resultado += `<br>Pregunta ${i}: Incorrecta`;
			puntos -= 20;
		}
	}

	if (puntos < 0) puntos = 0;
	const porcentaje = correctasTotales * 20;

	resultado += `<br><br><strong>Puntaje total: ${puntos} puntos</strong>`;
	resultado += `<br><strong>Porcentaje: ${porcentaje}%</strong>`;

	document.getElementById("resultado").innerHTML = resultado;

	google.charts.setOnLoadCallback(function drawChart() {
		const data = google.visualization.arrayToDataTable([
			['Resultado', 'Puntos'],
			['Correctos', correctasTotales * 20],
			['Incorrectos', (5 - correctasTotales) * 20]
		]);

		const options = {
			title: 'Resultados del diagnóstico',
			is3D: true,
			slices: {
				0: { color: '#4CAF50' },
				1: { color: '#F44336' }
			}
		};

		const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
		chart.draw(data, options);
	});
}

function generarPDF() {
	const doc = new jsPDF();
	doc.setFontSize(16);
	doc.setTextColor(9, 7, 121);
	const lineas = [
		"Resultados del Diagnóstico de Películas",
		"",
		"1. ¿Año de estreno de Pulp Fiction? Respuesta correcta: 1994",
		"2. ¿Año de estreno de Star Wars: Episodio IV? Respuesta correcta: 1977",
		"3. ¿Año de estreno de Iron Man? Respuesta correcta: 2008",
		"4. ¿Año de estreno de Matrix? Respuesta correcta: 1999",
		"5. ¿Año de estreno de Jurassic Park? Respuesta correcta: 1993"
	];
	let y = 20;

	lineas.forEach(linea => {
		doc.text(20, y, linea);
		y += 10;
	});
	const string = doc.output('datauristring');
	$('iframe').attr('src', string);
}