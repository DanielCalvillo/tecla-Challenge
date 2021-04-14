import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const productos = [
  { codigo: 1, nombre: "combo 1", precio: 500 },
  { codigo: 2, nombre: "combo 2", precio: 700 },
  { codigo: 3, nombre: "combo 3", precio: 900 },
  { codigo: 4, nombre: "combo 4", precio: 980 },
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
  facturaGenerada: {
    display: "flex",
    flexDirection: "column",
    border: "3px solid rgba(60,67,71,0.67)",
    borderRadius: "10px",
    marginRight: "1rem",
    marginLeft: "2rem",
    marginTop: "1rem",
  },
  rubroFactura: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 7rem 0 4rem",
  },
  rubroFacturaGenerada: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1rem 0 1rem",
  },
}));

export default function SecondChallenge() {
  const classes = useStyles();
  const [factura, setFactura] = useState({
    codigo: 0,
    cantidad: 1,
    categoria: 0,
    areaDeVenta: 0,
    precio: 0,
    iva: 0,
    total: 0,
  });
  const [nuevaFactura, setNuevaFactua] = useState({});

  const [resultados, setResultados] = useState([]);

  const [corteDeMes, setCorteDeMes] = useState({});

  const generarFactura = () => {
    let facturaConIvaIncluido = incluirIva(factura);
    console.log(facturaConIvaIncluido);
    setNuevaFactua(facturaConIvaIncluido);
    setResultados([...resultados, facturaConIvaIncluido]);
    setFactura({
      codigo: 0,
      cantidad: 1,
      categoria: 0,
      areaDeVenta: 0,
      precio: 0,
      iva: 0,
      total: 0,
    });
  };

  const incluirIva = (factura) => {
    let facturaConIvaIncluido = { ...factura };
    if (parseInt(factura.categoria) === 1) {
      let precioDeCombo = productos[factura.codigo - 1].precio;
      let numDeCombos = parseInt(factura.cantidad);

      let precio = precioDeCombo * numDeCombos;

      let iva = precio * 0.21;

      let total = precio + iva;

      facturaConIvaIncluido = {
        ...facturaConIvaIncluido,
        precio,
        iva: iva.toFixed(2),
        total,
      };

      return facturaConIvaIncluido;
    } else if (parseInt(factura.categoria) === 2) {
      let precioDeCombo = productos[factura.codigo - 1].precio;
      let numDeCombos = parseInt(factura.cantidad);

      let precio = precioDeCombo * numDeCombos;

      let iva = precio * 0.315;

      let total = precio + iva;

      facturaConIvaIncluido = {
        ...facturaConIvaIncluido,
        precio,
        iva: iva.toFixed(2),
        total,
      };

      return facturaConIvaIncluido;
    }
  };

  const productosVendidos = () => {
    var cantidadVendidaPrimerCombo = resultados.reduce((sum, value) => {
      return parseInt(value.codigo) === 1
        ? sum + parseInt(value.cantidad)
        : sum;
    }, 0);
    console.log(`Combos 1 vendidos: ${cantidadVendidaPrimerCombo}`);

    var cantidadVendidaSegundoCombo = resultados.reduce((sum, value) => {
      return parseInt(value.codigo) === 2
        ? sum + parseInt(value.cantidad)
        : sum;
    }, 0);
    console.log(`Combos 2 vendidos: ${cantidadVendidaSegundoCombo}`);

    var cantidadVendidaTercerCombo = resultados.reduce((sum, value) => {
      return parseInt(value.codigo) === 3
        ? sum + parseInt(value.cantidad)
        : sum;
    }, 0);
    console.log(`Combos 3 vendidos: ${cantidadVendidaTercerCombo}`);

    var cantidadVendidaCuartoCombo = resultados.reduce((sum, value) => {
      return parseInt(value.codigo) === 4
        ? sum + parseInt(value.cantidad)
        : sum;
    }, 0);
    console.log(`Combos 4 vendidos: ${cantidadVendidaCuartoCombo}`);

    return [
      { combo: 1, cantidad: cantidadVendidaPrimerCombo },
      { combo: 2, cantidad: cantidadVendidaSegundoCombo },
      { combo: 3, cantidad: cantidadVendidaTercerCombo },
      { combo: 4, cantidad: cantidadVendidaCuartoCombo },
    ];
  };

  const ivaRecaudado = () => {
    var ivaTotal = resultados.reduce((sum, value) => {
      return parseInt(value.iva) ? sum + parseInt(value.iva) : sum;
    }, 0);
    return ivaTotal;
  };

  const procesarFacturas = () => {
    let ventasTotales = productosVendidos();
    ventasTotales.sort((a, b) => b.cantidad - a.cantidad);

    let totalDeIvaRecaudado = ivaRecaudado();

    console.log(ventasTotales);
    console.log(totalDeIvaRecaudado);
    setCorteDeMes({ ventasTotales, ivaTotal: totalDeIvaRecaudado });
  };

  return (
    <div className={classes.container}>
      <div>
        <h2>Lista de Productos</h2>
        <ol>
          <li className={classes.listItem}>
            <span className={classes.producto}>1.- Combo 1</span>
            <span className={classes.precio}>Precio: 500</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>2.- Combo 2</span>
            <span className={classes.precio}>Precio: 700</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>3.- Combo 3</span>
            <span className={classes.precio}>Precio: 900</span>
          </li>
          <li className={classes.listItem}>
            <span className={classes.producto}>4.- Combo 4</span>
            <span className={classes.precio}>Precio: 980</span>
          </li>
        </ol>
      </div>
      <form className={classes.form}>
        <h2>Factura Tu Combo</h2>
        <TextField
          id="margin-none"
          type="number"
          className={classes.textField}
          helperText="código de tu combo"
          value={factura.codigo}
          onChange={(event) =>
            setFactura({ ...factura, codigo: event.target.value })
          }
        />
        <TextField
          id="margin-dense"
          type="number"
          className={classes.textField}
          helperText="Cantidad de combos"
          value={factura.cantidad}
          onChange={(event) =>
            setFactura({ ...factura, cantidad: event.target.value })
          }
        />
        <TextField
          id="margin-dense"
          type="number"
          className={classes.textField}
          helperText="Tu categoría"
          value={factura.categoria}
          onChange={(event) =>
            setFactura({ ...factura, categoria: event.target.value })
          }
        />
        <TextField
          id="margin-dense"
          type="number"
          className={classes.textField}
          helperText="Área de ventas"
          value={factura.areaDeVenta}
          onChange={(event) =>
            setFactura({ ...factura, areaDeVenta: event.target.value })
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
      </form>
      {nuevaFactura ? (
        <ul>
          <li className={classes.rubroFactura}>
            <span>Código de Combo:</span>
            <span>{nuevaFactura.codigo}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>Cantidad de Combos:</span>
            <span>{nuevaFactura.cantidad}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>Categoría del cliente:</span>
            <span>{nuevaFactura.categoria}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>Área de venta:</span>
            <span>{nuevaFactura.areaDeVenta}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>Precio: </span>
            <span>$ {nuevaFactura.precio}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>IVA: </span>
            <span>$ {nuevaFactura.iva}</span>
          </li>
          <li className={classes.rubroFactura}>
            <span>Total: </span>
            <span>$ {nuevaFactura.total}</span>
          </li>
        </ul>
      ) : (
        ""
      )}
      <div>
        <h2>FACTURAS GENERADAS</h2>
        <ul style={{ margin: "0 !important", padding: "0" }}>
          {resultados.map((factura, index) => {
            return (
              <li className={classes.facturaGenerada}>
                <div className={classes.rubroFacturaGenerada}>
                  <span>Factura: {index + 1}</span>
                  <span>Combo: {factura.codigo}</span>
                  <span>NumCombos: {factura.cantidad}</span>
                </div>
                <div className={classes.rubroFacturaGenerada}>
                  <span>Categoría del cliente: {factura.categoria}</span>
                  <span>Área de venta: {factura.areaDeVenta}</span>
                </div>
                <div className={classes.rubroFacturaGenerada}>
                  <span>precio: {factura.precio}</span>
                  <span>iva: {factura.iva}</span>
                  <span>total: {factura.total}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
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
      <div>
        {corteDeMes.ventasTotales ? (
          <div>
            <h3>Ventas Totales por producto</h3>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: "0 8rem 0 5rem",
              }}
            >
              {corteDeMes.ventasTotales.map((valor) => {
                return (
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Combo: {valor.combo}</span>{" "}
                    <span>total: {valor.cantidad}</span>
                  </li>
                );
              })}
            </ul>
            <h4>Total de Iva Recaudado: {corteDeMes.ivaTotal}</h4>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
