import React, { useState } from 'react'; 
import './Calculadora.css'; // Importa los estilos de la calculadora

function Calculadora() {
  // Inicializa los estados usando el hook useState
  const [pantalla, setPantalla] = useState('0'); // Estado para mostrar el número actual en la pantalla
  const [operacionActual, setOperacionActual] = useState(''); // Estado para mostrar la operación en curso
  const [valorActual, setValorActual] = useState(''); // Estado para el valor actual ingresado
  const [valorAnterior, setValorAnterior] = useState(''); // Estado para el valor anterior ingresado
  const [operacion, setOperacion] = useState(''); // Estado para la operación seleccionada
  const [historial, setHistorial] = useState([]); // Estado para almacenar el historial de operaciones
  const [error, setError] = useState(null); // Estado para manejar el error

  // Función para manejar el clic en un número
  const manejarClicNumero = (num) => {
    if (pantalla === '0' || operacion) {
      // Si la pantalla es '0' o se está ingresando una operación, reemplaza el valor
      setPantalla(num);
      setValorActual(num);
    } else {
      // Agrega el número al valor actual y a la pantalla
      setPantalla(pantalla + num);
      setValorActual(valorActual + num);
    }
    // Actualiza la operación actual en la pantalla
    setOperacionActual(operacionActual + num);
  };

  // Función para manejar el clic en una operación
  const manejarClicOperacion = (op) => {
    if (valorActual) {
      // Si hay un valor actual
      if (valorAnterior) {
        // Si ya hay un valor anterior, calcula el resultado
        const resultado = calcular();
        setValorAnterior(resultado); // Actualiza el valor anterior con el resultado
        setHistorial([...historial, `${operacionActual} = ${resultado}`]); // Agrega al historial
        setOperacionActual(`${resultado} ${op} `); // Actualiza la operación actual
      } else {
        setValorAnterior(valorActual); // Si no hay valor anterior, lo establece
        setOperacionActual(`${valorActual} ${op} `); // Actualiza la operación actual
      }
      setOperacion(op); // Establece la operación seleccionada
      setValorActual(''); // Reinicia el valor actual
    } else if (valorAnterior) {
      // Si no hay valor actual pero sí anterior, solo cambia la operación
      setOperacion(op);
      setOperacionActual(`${valorAnterior} ${op} `);
    }
  };

  // Función para realizar el cálculo basado en la operación seleccionada
  const calcular = () => {
    const anterior = parseFloat(valorAnterior); // Convierte el valor anterior a número
    const actual = parseFloat(valorActual); // Convierte el valor actual a número
    let resultado = 0; // Inicializa el resultado

    // Realiza la operación correspondiente
    switch (operacion) {
      case '+':
        resultado = anterior + actual;
        break;
      case '-':
        resultado = anterior - actual;
        break;
      case 'x':
        resultado = anterior * actual;
        break;
      case '/':
        if (actual === 0) {
          setError('Error'); // Mensaje de error
          return; // Sale de la función
        } else {
          resultado = anterior / actual;
        }
        break;
      default:
        return; 
    }
    
    setError(null); // Limpia el error si el cálculo es exitoso
    setPantalla(resultado.toString()); // Muestra el resultado en la pantalla
    return resultado.toString(); // Retorna el resultado como string
  };

  // Función para manejar el clic en el botón de igual
  const manejarIguales = () => {
    if (valorActual && valorAnterior) {
      const resultado = calcular(); // Calcula el resultado
      if (error) {
        setHistorial([...historial, error]); // Agrega el error al historial
      } else {
        setHistorial([...historial, `${operacionActual} = ${resultado}`]); // Agrega al historial
      }
      setValorAnterior(''); // Reinicia el valor anterior
      setValorActual(resultado); // Establece el resultado como nuevo valor actual
      setOperacion(''); // Reinicia la operación
      setOperacionActual(''); // Reinicia la operación actual
    }
  };
  // Función para limpiar la calculadora
  const manejarLimpiar = () => {
    setPantalla('0'); // Resetea la pantalla a 0
    setValorActual(''); // Limpia el valor actual
    setValorAnterior(''); // Limpia el valor anterior
    setOperacion(''); // Limpia la operación
    setOperacionActual(''); // Limpia la operación actual
  };

  // Función para limpiar el historial
  const manejarLimpiarHistorial = () => {
    setHistorial([]); // Reinicia el historial a un array vacío
  };

  // Función para eliminar el último carácter ingresado
  const manejarEliminar = () => {
    if (valorActual) {
      const nuevoValorActual = valorActual.slice(0, -1); // Elimina el último carácter
      setValorActual(nuevoValorActual); // Actualiza el valor actual
      setPantalla(nuevoValorActual || '0'); // Actualiza la pantalla, si está vacío muestra 0
    }

    // Si `operacionActual` no está vacío, elimina el último carácter de la operación actual
    if (operacionActual) {
      const nuevaOperacionActual = operacionActual.slice(0, -1);
      setOperacionActual(nuevaOperacionActual); // Actualiza la operación actual
    }
  };


  // Renderiza la interfaz de la calculadora
  return (
    <div className="Calculadora">
      <h2>CALCULADORA</h2>
      <div className="content">
        <div className="card">
          <div className="display">
            <div>{operacionActual || '\u00A0'}</div> {/* Muestra la operación actual */}
            <div>{error || pantalla}</div> {/* Muestra el error si existe, de lo contrario muestra el valor actual */}
          </div>
          <div className="grid">
            {/* Botones numéricos y de operación */}
            <button className="button" onClick={() => manejarClicNumero('7')}>7</button>
            <button className="button" onClick={() => manejarClicNumero('8')}>8</button>
            <button className="button" onClick={() => manejarClicNumero('9')}>9</button>
            <button className="button button-delete" onClick={manejarEliminar}>←</button>

            <button className="button" onClick={() => manejarClicNumero('4')}>4</button>
            <button className="button" onClick={() => manejarClicNumero('5')}>5</button>
            <button className="button" onClick={() => manejarClicNumero('6')}>6</button>
            <button className="button" onClick={() => manejarClicOperacion('/')}>/</button>

            <button className="button" onClick={() => manejarClicNumero('1')}>1</button>
            <button className="button" onClick={() => manejarClicNumero('2')}>2</button>
            <button className="button" onClick={() => manejarClicNumero('3')}>3</button>
            <button className="button" onClick={() => manejarClicOperacion('x')}>x</button>

            <button className="button" onClick={() => manejarClicNumero('.')}>.</button>
            <button className="button" onClick={() => manejarClicNumero('0')}>0</button>
            <button className="button" onClick={() => manejarClicOperacion('-')}>-</button>
            <button className="button" onClick={() => manejarClicOperacion('+')}>+</button>
            
            <button className="button button-equal" onClick={manejarIguales}>=</button>
            <button className="button button-clear" onClick={manejarLimpiar}>C</button>
          </div>
        </div>
        <div className="history">
          <div className="content-a">
            <h3>Historial</h3>
            <div className="history-list">
              {historial.map((item, index) => (
                <p key={index}>{item}</p> // Muestra cada operación en el historial
              ))}
            </div>
            <button onClick={manejarLimpiarHistorial} className="button">Borrar Historial</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculadora; // Exporta el componente Calculadora para su uso en otros archivos
