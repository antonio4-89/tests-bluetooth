import { Component } from '@angular/core';
import { PrinterService } from '../core/print.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

   dispositivos: any[] = [];
  constructor(
    public printer: PrinterService, 
    private toast: ToastController
  ) {}

  async cargar() {
    try { this.dispositivos = await this.printer.listar(); }
    catch { this.msg('Activa el Bluetooth y parea la impresora primero'); }
  }
  async conectar(d: any) {
    try { await this.printer.connect(d.address); this.msg('Impresora conectada'); }
    catch { this.msg('No se pudo conectar'); }
  }
  async prueba() {
    await this.printer.imprimir('     MI TICKET\n--------------\n1x Café   $30\n--------------\nGracias!\n');
  }
  private async msg(m: string) {
    (await this.toast.create({ message: m, duration: 2000 })).present();
  }

}
