function calcularPropina() {
    var subtotal = document.getElementById("subtotal").value;
    var porcentaje = document.getElementById("porcentaje").value;

    subtotal = parseFloat(subtotal);
    porcentaje = parseFloat(porcentaje);
    // Validar datos
    if (isNaN(subtotal) || isNaN(porcentaje) || subtotal <= 0 || porcentaje < 0) {
        document.getElementById("resultado").innerHTML = "Por favor, ingresa valores los datos requeridos.";
        return;
    }
    var propina = subtotal * (porcentaje / 100);
    var totalConPropina = subtotal + propina;

    document.getElementById("resultado").innerHTML = "<br>Propina (" + porcentaje + "%): $" + propina.toFixed(2) +
        "<br>Total a pagar: $" + totalConPropina.toFixed(2);
}