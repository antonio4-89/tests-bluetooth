import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx'
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx'

@Injectable({
    providedIn: 'root'
})

export class PrinterService {
    private connected = false;

    constructor( 
        private bt: BluetoothSerial,
        private perms: AndroidPermissions,
        private platform: Platform
    ){}

      // 1) Permisos (Android 12+ usa SCAN/CONNECT; antes, ubicación)
  async pedirPermisos(): Promise<boolean> {
    if (!this.platform.is('android')) return true;
    const p = this.perms.PERMISSION;
    try {
      await this.perms.requestPermissions([
        p.BLUETOOTH_SCAN, p.BLUETOOTH_CONNECT, p.ACCESS_FINE_LOCATION,
      ]);
      return true;
    } catch { return false; }
  }

    // 2) Listar dispositivos YA pareados en Ajustes de Android
  async listar(): Promise<any[]> {
    await this.pedirPermisos();
    const on = await this.bt.isEnabled().then(() => true).catch(() => false);
    if (!on) await this.bt.enable();
    return this.bt.list();
  }

    // 3) Conectar por dirección MAC
  connect(address: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.bt.connect(address).subscribe({
        next: () => { this.connected = true; resolve(); },
        error: (e) => { this.connected = false; reject(e); },
      });
    });
  }

    // 4) Imprimir texto como ESC/POS
  async imprimir(texto: string): Promise<void> {
    const ESC = '\x1B', GS = '\x1D';
    const init = ESC + '@';          // reiniciar impresora
    const corte = GS + 'V' + '\x00'; // cortar papel
    await this.bt.write(init + texto + '\n\n\n' + corte);
  }

    isConnected() { return this.connected; }
  async disconnect() { this.connected = false; await this.bt.disconnect(); }


}
