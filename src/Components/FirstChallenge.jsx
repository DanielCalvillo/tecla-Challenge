import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const productos = [
  { nombre: "detergente", precio: 1.7 },
  { nombre: "lavandia", precio: 2.1 },
  { nombre: "desinfectante", precio: 1.9 },
  { nombre: "blanqueador", precio: 3.2 },
];

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  listItem: {
    textAlign: "left",
    width: "15rem",
    display: "flex",
    justifyContent: "space-between",
  },
  precio: {},
  textField: {
    margin: "0 auto",
    width: "25ch",
  },
  button: {
    margin: "2rem auto",
    width: "25ch",
  },
  productoGanancias: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function FirstChallenge() {
  const classes = useStyles();
  const [factura, setFactura] = useState({ producto: 0, litros: 1 });
  const [facturas, setFacturas] = useState([{ producto: 0, litros: 0 }]);

  const [resultados, setResultados] = useState([]);

  let contadorDetergente = 0;
  let litrosDetergente = 0;

  let contadorLavandia = 0;
  let litrosLavandia = 0;

  let contadorDesinfectante = 0;
  let litrosDesinfectante = 0;

  let contadorBlanqueador = 0;
  let litrosBlanqueador = 0;

  const generarFactura = (ev) => {
    ev.preventDefault();
    setFacturas([...facturas, factura]);
    setFactura({ producto: 0, litros: 1 });
  };

  const procesarFacturas = () => {
    contadorDetergente = 0;
    contadorLavandia = 0;
    contadorDesinfectante = 0;
    contadorBlanqueador = 0;

    for (let theFactura in facturas) {
      const facturaSeleccionada = facturas[theFactura];
      const productoDeFactura = productos[facturaSeleccionada.producto - 1];
      const litrosDelProducto = facturaSeleccionada.litros;
      if (productoDeFactura) {
        switch (productoDeFactura.nombre) {
          case "detergente":
            litrosDetergente = litrosDelProducto;
            contadorDetergente += productoDeFactura.precio * litrosDelProducto;
            break;
          case "lavandia":
            litrosLavandia = litrosDelProducto;
            contadorLavandia += productoDeFactura.precio * litrosDelProducto;
            break;
          case "desinfectante":
            litrosDesinfectante = litrosDelProducto;
            contadorDesinfectante +=
              productoDeFactura.precio * litrosDelProducto;
            break;
          case "blanqueador":
            litrosBlanqueador = litrosDelProducto;
            contadorBlanqueador += productoDeFactura.precio * litrosDelProducto;
            break;
          default:
            break;
        }
      }
    }

    let arrayInicial = [
      {
        producto: "detergente",
        ganancia: contadorDetergente.toFixed(2),
        litros: litrosDetergente,
      },
      {
        producto: "lavanda",
        ganancia: contadorLavandia.toFixed(2),
        litros: litrosLavandia,
      },
      {
        producto: "desinfectante",
        ganancia: contadorDesinfectante.toFixed(2),
        litros: litrosDesinfectante,
      },
      {
        producto: "blanqueador",
        ganancia: contadorBlanqueador.toFixed(2),
        litros: litrosBlanqueador,
      },
    ];
    arrayInicial.sort((a, b) => a.litros - b.litros);
    setResultados(arrayInicial);
  };

  return (
    <div className={classes.container}>
      <div>
        <h2>Lista de Productos</h2>
        <ol>
          <li className={classes.listItem}>
            <span className={classes.producto}>1.- Detergente</span>
            <span className={classes.precio}>Precio: 1.7</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>2.- Lavandina</span>
            <span className={classes.precio}>Precio: 2.1</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>3.- Desinfectante</span>
            <span className={classes.precio}>Precio: 1.9</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>4.- Detergente</span>
            <span className={classes.precio}>Precio: 3.2</span>
          </li>
        </ol>
      </div>
      <div className={classes.form}>
        <h2>Factura Tu Producto</h2>
        <TextField
          id="margin-none"
          type="number"
          className={classes.textField}
          helperText="Número de Producto"
          value={factura.producto}
          onChange={(event) =>
            setFactura({ ...factura, producto: event.target.value })
          }
        />
        <TextField
          id="margin-dense"
          type="number"
          className={classes.textField}
          helperText="Cantidad de Litros"
          value={factura.litros}
          onChange={(event) =>
            setFactura({ ...factura, litros: event.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={generarFactura}
        >
          Generar Factura
        </Button>
      </div>
      <ul>
        {resultados.map((resultado) => {
          return (
            <li className={classes.productoGanancias}>
              <span>Producto: {resultado.producto}</span>
              <span style={{ marginLeft: "auto" }}>
                Ganancia: ${resultado.ganancia}
              </span>
              <span style={{ marginLeft: "1rem" }}>
                Litros: {resultado.litros}
              </span>
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          type="button"
          onClick={procesarFacturas}
        >
          Procesar Facturas
        </Button>
      </div>
    </div>
  );
}
