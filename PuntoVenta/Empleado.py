import os
import sys
from datetime import datetime
from PyQt6 import uic
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import (
    QApplication,
    QHeaderView,
    QMainWindow,
    QMessageBox,
    QPushButton,
    QTableWidgetItem,
)


class PuntoVentaWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        ruta_ui = os.path.join(os.path.dirname(__file__), "punto_venta.ui")
        uic.loadUi(ruta_ui, self)

        self.productos = [
            {"sku": "GS-PS5-001", "nombre": "Spider-Man 2 (PS5)", "stock": 6, "precio": 1399},
            {"sku": "GS-NSW-014", "nombre": "Zelda: Tears of the Kingdom", "stock": 4, "precio": 1299},
            {"sku": "GS-PS5-031", "nombre": "Control DualSense Blanco", "stock": 9, "precio": 1499},
            {"sku": "GS-NSW-045", "nombre": "Mario Kart 8 Deluxe", "stock": 2, "precio": 1199},
            {"sku": "GS-XBX-022", "nombre": "Halo Infinite (Xbox)", "stock": 5, "precio": 999},
            {"sku": "GS-DIG-102", "nombre": "Tarjeta PlayStation $500", "stock": 25, "precio": 500},
        ]

        self.carrito = {}
        self.contador_folios = 1

        self.configurar_tablas()
        self.conectar_eventos()
        self.cargar_productos()

    def configurar_tablas(self):
        self.tblProductos.setColumnCount(5)
        self.tblProductos.setHorizontalHeaderLabels(["SKU", "Producto", "Stock", "Precio", "Acción"])
        self.tblProductos.verticalHeader().setVisible(False)
        self.tblProductos.setEditTriggers(self.tblProductos.EditTrigger.NoEditTriggers)
        header_prod = self.tblProductos.horizontalHeader()
        header_prod.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
        header_prod.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
        header_prod.setSectionResizeMode(2, QHeaderView.ResizeMode.ResizeToContents)
        header_prod.setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)
        header_prod.setSectionResizeMode(4, QHeaderView.ResizeMode.ResizeToContents)

        self.tblCarrito.setColumnCount(4)
        self.tblCarrito.setHorizontalHeaderLabels(["Producto", "Cant.", "Subtotal", ""])
        self.tblCarrito.verticalHeader().setVisible(False)
        self.tblCarrito.setEditTriggers(self.tblCarrito.EditTrigger.NoEditTriggers)
        header_cart = self.tblCarrito.horizontalHeader()
        header_cart.setSectionResizeMode(0, QHeaderView.ResizeMode.Stretch)
        header_cart.setSectionResizeMode(1, QHeaderView.ResizeMode.ResizeToContents)
        header_cart.setSectionResizeMode(2, QHeaderView.ResizeMode.ResizeToContents)
        header_cart.setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)

    def conectar_eventos(self):
        self.txtBuscar.textChanged.connect(self.cargar_productos)
        self.btnBuscar.clicked.connect(self.cargar_productos)
        self.btnGenerarTicket.clicked.connect(self.generar_ticket)
        self.btnCancelar.clicked.connect(self.cancelar_venta)

    def cargar_productos(self):
        filtro = self.txtBuscar.text().strip().lower()
        filtrados = [
            p for p in self.productos
            if filtro in p["nombre"].lower() or filtro in p["sku"].lower()
        ]

        self.tblProductos.setRowCount(len(filtrados))
        for fila, prod in enumerate(filtrados):
            self.tblProductos.setRowHeight(fila, 42)
            self.tblProductos.setItem(fila, 0, QTableWidgetItem(prod["sku"]))
            self.tblProductos.setItem(fila, 1, QTableWidgetItem(prod["nombre"]))

            item_stock = QTableWidgetItem(str(prod["stock"]))
            item_stock.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            self.tblProductos.setItem(fila, 2, item_stock)

            self.tblProductos.setItem(fila, 3, QTableWidgetItem(f"${prod['precio']:,}"))

            btn_agregar = QPushButton("+ Agregar")
            btn_agregar.setEnabled(prod["stock"] > 0)
            btn_agregar.clicked.connect(lambda checked, sku=prod["sku"]: self.agregar_al_carrito(sku))
            self.tblProductos.setCellWidget(fila, 4, btn_agregar)

    def buscar_producto_por_sku(self, sku):
        for prod in self.productos:
            if prod["sku"] == sku:
                return prod
        return None

    def agregar_al_carrito(self, sku):
        prod = self.buscar_producto_por_sku(sku)
        if not prod or prod["stock"] <= 0:
            QMessageBox.warning(self, "Sin stock", "Este producto ya no tiene existencias disponibles.")
            return

        prod["stock"] -= 1
        if sku in self.carrito:
            self.carrito[sku]["cantidad"] += 1
        else:
            self.carrito[sku] = {
                "nombre": prod["nombre"],
                "precio": prod["precio"],
                "cantidad": 1,
            }

        self.cargar_productos()
        self.actualizar_carrito()

    def quitar_del_carrito(self, sku):
        if sku not in self.carrito:
            return

        prod = self.buscar_producto_por_sku(sku)
        if prod:
            prod["stock"] += 1

        self.carrito[sku]["cantidad"] -= 1
        if self.carrito[sku]["cantidad"] <= 0:
            del self.carrito[sku]

        self.cargar_productos()
        self.actualizar_carrito()

    def actualizar_carrito(self):
        self.tblCarrito.setRowCount(len(self.carrito))
        total = 0

        for fila, (sku, item) in enumerate(self.carrito.items()):
            self.tblCarrito.setRowHeight(fila, 38)
            subtotal = item["precio"] * item["cantidad"]
            total += subtotal

            self.tblCarrito.setItem(fila, 0, QTableWidgetItem(item["nombre"]))
            item_cant = QTableWidgetItem(str(item["cantidad"]))
            item_cant.setTextAlignment(Qt.AlignmentFlag.AlignCenter)
            self.tblCarrito.setItem(fila, 1, item_cant)
            self.tblCarrito.setItem(fila, 2, QTableWidgetItem(f"${subtotal:,}"))

            btn_quitar = QPushButton("×")
            btn_quitar.setMaximumWidth(32)
            btn_quitar.clicked.connect(lambda checked, s=sku: self.quitar_del_carrito(s))
            self.tblCarrito.setCellWidget(fila, 3, btn_quitar)

        self.lblTotal.setText(f"${total:,} MXN")

    def generar_ticket(self):
        if not self.carrito:
            QMessageBox.information(self, "Venta vacía", "Agrega al menos un producto antes de generar el ticket.")
            return

        metodo = "Efectivo" if self.rbEfectivo.isChecked() else "Tarjeta"
        folio = f"POS-{self.contador_folios:04d}"
        fecha = datetime.now().strftime("%d/%m/%Y %H:%M")

        lineas = [
            "======== GAMESSTORM ========",
            "Sucursal Centro · Caja #01",
            f"Folio: {folio}",
            f"Fecha: {fecha}",
            f"Pago: {metodo}",
            "----------------------------",
        ]

        total = 0
        for sku, item in self.carrito.items():
            subtotal = item["precio"] * item["cantidad"]
            total += subtotal
            lineas.append(f"{item['cantidad']}x {item['nombre']} ({sku}) - ${subtotal:,}")

        lineas.extend([
            "----------------------------",
            f"TOTAL: ${total:,} MXN",
            "¡Gracias por tu compra!",
        ])

        QMessageBox.information(self, f"Ticket {folio}", "\n".join(lineas))

        self.contador_folios += 1
        self.carrito.clear()
        self.actualizar_carrito()

    def cancelar_venta(self):
        if not self.carrito:
            return

        for sku, item in self.carrito.items():
            prod = self.buscar_producto_por_sku(sku)
            if prod:
                prod["stock"] += item["cantidad"]

        self.carrito.clear()
        self.cargar_productos()
        self.actualizar_carrito()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.styleHints().setColorScheme(Qt.ColorScheme.Light)
    ventana = PuntoVentaWindow()
    ventana.show()
    sys.exit(app.exec())