import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// 1. IMPORTAMOS EL KEYFILTER
import { KeyFilterModule } from 'primeng/keyfilter';
import { PatientUseCase } from '../../../../../core/patient/application/patient.use-case';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, 
    ButtonModule, InputTextModule, DialogModule, 
    ToastModule, KeyFilterModule // 2. LO AGREGAMOS AQUÍ
  ],
  providers: [MessageService],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss' // Asegúrate de tener esta línea para los estilos
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  displayEditModal: boolean = false;
  pacienteEditando: any = {};

  // 3. AGREGAMOS TU EXPRESIÓN REGULAR PARA NOMBRES
  regexLetras: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  constructor(
    private messageService: MessageService,
    private patientUseCase: PatientUseCase
  ) {}

  ngOnInit() {
    this.patients = [
      {
        id: 20,
        name: 'Sarah Jenkins Smith',
        // Campos reales de tu BD para el modal
        first_name: 'Sarah',
        last_name_p: 'Jenkins',
        last_name_m: "Smith",
        email: 'sarah.jenkins@example.com',
        birth_year: 1990,
        height: 1.65,
        weight: 62,
        // Datos visuales de tu tarjeta
        phone: '+1 (555) 019-2834',
        tag: 'POST-OPERATORIO',
        tagClass: 'bg-orange-100 text-orange-500',
        dateIcon: 'pi pi-calendar',
        dateText: 'Próxima: Hoy, 2:00 PM',
        motivo: 'Dolor de Hombro',
        motivoColor: 'text-red-500',
        diagnostico: 'Manguito Rotador',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'Paciente reporta dolor reducido (3/10) durante movimientos por encima de l...',
        avatar: 'https://i.pravatar.cc/150?img=47',
        statusDot: 'bg-green-500'
      },
      {
        id: 22,
        name: 'Michael Chen Smith',
        first_name: 'Michael',
        last_name_p: 'Chen',
        last_name_m: "Smith",
        email: 'michael.chen@example.com',
        birth_year: 1985,
        height: 1.80,
        weight: 85,
        phone: '+1 (555) 987-6543',
        tag: 'CRÓNICO',
        tagClass: 'bg-teal-100 text-teal-600',
        dateIcon: 'pi pi-calendar-times',
        dateText: 'Visto por última vez: hace 2 días',
        motivo: 'Inestabilidad...',
        motivoColor: 'text-color',
        diagnostico: 'Rehabilitació...',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'La hinchazón ha disminuido significativamente. Comenzó ejercici...',
        avatar: 'https://i.pravatar.cc/150?img=11',
        statusDot: 'bg-gray-400'
      },
      {
        id: 33,
        name: 'Emma Thomas Smith',
        first_name: 'Emma',
        last_name_p: 'Thomas',
        last_name_m: "Smith",
        email: 'emma.t@example.com',
        birth_year: 1995,
        height: 1.70,
        weight: 68,
        phone: '+1 (555) 246-8101',
        tag: 'NUEVA',
        tagClass: 'bg-green-100 text-green-600',
        dateIcon: 'pi pi-calendar',
        dateText: 'Próxima: Mañana, 10:00 AM',
        motivo: 'Espalda Baja',
        motivoColor: 'text-color',
        diagnostico: 'Distensión L...',
        diagnosticoColor: 'text-activa-primary',
        notaSOAP: 'Dolor agudo después de levantar objeto pesado. Flexión hacia adelant...',
        avatar: 'https://i.pravatar.cc/150?img=5',
        statusDot: 'bg-green-500'
      }
    ];
  }

  // Funciones del Modal
  abrirModalEditar(paciente: any) {
    this.pacienteEditando = { ...paciente }; // Clonamos los datos para no afectar la tarjeta original hasta guardar
    this.displayEditModal = true;
  }

  cerrarModal() {
    this.displayEditModal = false;
  }

 guardarCambios() {
    // Limpiamos alertas previas para no hacer spam
    this.messageService.clear();

    const p = this.pacienteEditando;

    // 1. Validación de campos vacíos
    if (!p.first_name || !p.last_name_p || !p.email || !p.birth_year || !p.height || !p.weight) {
      this.messageService.add({ severity: 'warn', summary: 'Campos incompletos', detail: 'Por favor, llena todos los campos obligatorios.' });
      return; // Detiene la ejecución aquí
    }

    // 2. Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(p.email)) {
      this.messageService.add({ severity: 'warn', summary: 'Correo inválido', detail: 'Por favor, proporciona un correo electrónico válido.' });
      return;
    }

    // 3. Validación estricta del Año de Nacimiento (Ni del futuro, ni vampiros de 1800)
    const currentYear = new Date().getFullYear();
    const birthYearNum = Number(p.birth_year);
    if (birthYearNum < 1900 || birthYearNum > currentYear) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Año incorrecto', 
        detail: `El año de nacimiento debe estar entre 1900 y ${currentYear}.` 
      });
      return;
    }

    // 4. Validación lógica de Estatura (El punto decimal)
    const alturaNum = Number(p.height);
    if (alturaNum < 0.40 || alturaNum > 2.50) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Revisa la estatura', 
        detail: 'La estatura debe estar en metros (ej. 1.75). Asegúrate de usar el punto decimal.' 
      });
      return;
    }

    // 5. Validación lógica de Peso (Aceptamos pacientes bariátricos, solo evitamos errores de teclado catastróficos)
    const pesoNum = Number(p.weight);
    if (pesoNum <= 0 || pesoNum > 700) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Revisa el peso', 
        detail: 'El peso debe ser mayor a 0 y menor a 700 Kg. Asegúrate de usar el punto decimal correctamente.' 
      });
      return;
    }

    // Si todo está perfecto, preparamos el paquete para el backend
    const payloadParaBackend = {
      firstName: p.first_name,
      lastNameP: p.last_name_p,
      lastNameM: p.last_name_m ? p.last_name_m : undefined, 
      email: p.email,
      birthYear: birthYearNum,
      height: alturaNum,
      weight: pesoNum
    };

    console.log(`📦 Enviando PUT al backend:`, payloadParaBackend);

    this.patientUseCase.executeUpdate(p.id, payloadParaBackend as any).subscribe({
      next: (respuesta: any) => {
        this.messageService.add({ severity: 'success', summary: '¡Actualizado!', detail: 'Paciente modificado correctamente.' });
        
        // Reconstruimos el nombre visualmente
        const apellidoM = p.last_name_m ? ` ${p.last_name_m}` : '';
        this.pacienteEditando.name = `${p.first_name} ${p.last_name_p}${apellidoM}`;
        
        // Actualizamos la tarjeta falsa
        const index = this.patients.findIndex(paciente => paciente.id === p.id);
        if (index !== -1) {
          this.patients[index] = { ...this.patients[index], ...this.pacienteEditando };
        }
        
        this.displayEditModal = false;
      },
      error: (err: any) => {
        console.error('❌ Error al editar:', err);
        // Si el backend sigue enojado por algo que no vimos, intentamos mostrar su mensaje exacto
        const mensajeBackend = err.error?.message || err.error?.error || 'Ocurrió un problema al guardar en el servidor.';
        this.messageService.add({ severity: 'error', summary: 'Error del Servidor', detail: mensajeBackend });
      }
    });
  }
  verDetallePaciente(id: number) {
    console.log('Navegando al expediente del paciente con ID:', id);
    // Nota para el futuro: Aquí usaremos el Router para ir a la pantalla del expediente
    // ej. this.router.navigate(['/dashboard/expediente', id]);
  }
}