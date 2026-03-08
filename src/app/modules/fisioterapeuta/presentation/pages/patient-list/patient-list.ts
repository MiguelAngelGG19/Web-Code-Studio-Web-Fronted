import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageService } from 'primeng/api';

// Arquitectura Core (Asegúrate de que estas rutas coincidan con tu proyecto)
import { PatientHttpRepository } from '../../../../../core/patient/infraestructure/patient-http.repository';
import { PatientUseCase } from '../../../../../core/patient/application/patient.use-case';
import { Patient } from '../../../../../core/patient/domain/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ButtonModule, 
    InputTextModule, 
    DialogModule,
    ToastModule, 
    KeyFilterModule
  ],
  providers: [MessageService],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss'
})
export class PatientListComponent implements OnInit {
  // Variables principales conectadas al HTML
  patients: any[] = [];
  displayEditModal: boolean = false;
  pacienteEditando: any = {};

  // Expresión regular para validar nombres (solo letras y espacios)
  regexLetras: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  // Inyección de dependencias clásica
  constructor(
    private messageService: MessageService,
    private patientUseCase: PatientUseCase
  ) { }

  // Inyección de dependencias moderna (Angular 14+)
  private patientRepo = inject(PatientHttpRepository);

  ngOnInit() {
    this.cargarPacientesReales();
  }

  cargarPacientesReales() {
    this.patientRepo.getAllPatients().subscribe({
      next: (datosReales: Patient[]) => {
        // Transformamos los datos del backend para la vista
        this.patients = datosReales.map((dbPatient, index) => {
          const avatares = [
            'https://i.pravatar.cc/150?img=47',
            'https://i.pravatar.cc/150?img=11',
            'https://i.pravatar.cc/150?img=5'
          ];
          const coloresEstado = ['bg-green-500', 'bg-gray-400', 'bg-orange-500'];

          return {
            id: dbPatient.idPaciente,
            name: `${dbPatient.first_name} ${dbPatient.last_name_p} ${dbPatient.last_name_m || ''}`.trim(),
            phone: dbPatient.email || 'Sin información de contacto',
            
            // Datos originales para el modal de edición
            first_name: dbPatient.first_name,
            last_name_p: dbPatient.last_name_p,
            last_name_m: dbPatient.last_name_m,
            email: dbPatient.email,
            birth_year: dbPatient.birth_year,
            height: dbPatient.height,
            weight: dbPatient.weight,

            // Datos de diseño (Mockeados por ahora para mantener la UI)
            tag: 'NUEVA',
            tagClass: 'bg-green-100 text-green-600',
            dateIcon: 'pi pi-calendar',
            dateText: 'Consulta de valoración',
            motivo: 'Evaluación general',
            motivoColor: 'text-color',
            diagnostico: 'Pendiente',
            diagnosticoColor: 'text-activa-primary',
            notaSOAP: 'Paciente ingresado desde el sistema central...',
            avatar: avatares[index % 3],
            statusDot: coloresEstado[index % 3]
          };
        });
      },
      error: (err: any) => {
        console.error('Hubo un error al conectar con la base de datos, cargando datos de prueba:', err);
        // MOCK DATA: Respaldo visual si el backend falla
        this.patients = [
          {
            id: 20,
            name: 'Sarah Jenkins Smith',
            first_name: 'Sarah',
            last_name_p: 'Jenkins',
            last_name_m: "Smith",
            email: 'sarah.jenkins@example.com',
            birth_year: 1990,
            height: 1.65,
            weight: 62,
            phone: '+1 (555) 019-2834',
            tag: 'POST-OPERATORIO',
            tagClass: 'bg-orange-100 text-orange-500',
            dateIcon: 'pi pi-calendar',
            dateText: 'Próxima: Hoy, 2:00 PM',
            motivo: 'Dolor de Hombro',
            motivoColor: 'text-red-500',
            diagnostico: 'Manguito Rotador',
            diagnosticoColor: 'text-activa-primary',
            notaSOAP: 'Paciente reporta dolor reducido (3/10) durante movimientos...',
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
            diagnostico: 'Rehabilitación',
            diagnosticoColor: 'text-activa-primary',
            notaSOAP: 'La hinchazón ha disminuido significativamente...',
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
            notaSOAP: 'Dolor agudo después de levantar objeto pesado...',
            avatar: 'https://i.pravatar.cc/150?img=5',
            statusDot: 'bg-green-500'
          }
        ];
      }
    });
  }

  // --- MÉTODOS DEL MODAL ---

  abrirModalEditar(paciente: any) {
    this.pacienteEditando = { ...paciente }; 
    this.displayEditModal = true;
  }

  cerrarModal() {
    this.displayEditModal = false;
  }

  guardarCambios() {
    this.messageService.clear();
    const p = this.pacienteEditando;

    // 1. Validaciones
    if (!p.first_name || !p.last_name_p || !p.email || !p.birth_year || !p.height || !p.weight) {
      this.messageService.add({ severity: 'warn', summary: 'Campos incompletos', detail: 'Por favor, llena todos los campos obligatorios.' });
      return; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(p.email)) {
      this.messageService.add({ severity: 'warn', summary: 'Correo inválido', detail: 'Por favor, proporciona un correo electrónico válido.' });
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYearNum = Number(p.birth_year);
    if (birthYearNum < 1900 || birthYearNum > currentYear) {
      this.messageService.add({ severity: 'warn', summary: 'Año incorrecto', detail: `El año de nacimiento debe estar entre 1900 y ${currentYear}.` });
      return;
    }

    const alturaNum = Number(p.height);
    if (alturaNum < 0.40 || alturaNum > 2.50) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa la estatura', detail: 'La estatura debe estar en metros (ej. 1.75). Asegúrate de usar el punto decimal.' });
      return;
    }

    const pesoNum = Number(p.weight);
    if (pesoNum <= 0 || pesoNum > 700) {
      this.messageService.add({ severity: 'warn', summary: 'Revisa el peso', detail: 'El peso debe ser mayor a 0 y menor a 700 Kg.' });
      return;
    }

    // 2. Preparar Payload para Backend
    const payloadParaBackend = {
      firstName: p.first_name,
      lastNameP: p.last_name_p,
      lastNameM: p.last_name_m ? p.last_name_m : undefined,
      email: p.email,
      birthYear: birthYearNum,
      height: alturaNum,
      weight: pesoNum
    };

    console.log(`Enviando PUT al backend:`, payloadParaBackend);

    // 3. Ejecutar Caso de Uso
    this.patientUseCase.executeUpdate(p.id, payloadParaBackend as any).subscribe({
      next: (respuesta: any) => {
        this.messageService.add({ severity: 'success', summary: '¡Actualizado!', detail: 'Paciente modificado correctamente.' });

        // Actualizar visualmente la tarjeta
        const apellidoM = p.last_name_m ? ` ${p.last_name_m}` : '';
        this.pacienteEditando.name = `${p.first_name} ${p.last_name_p}${apellidoM}`;

        const index = this.patients.findIndex(paciente => paciente.id === p.id);
        if (index !== -1) {
          this.patients[index] = { ...this.patients[index], ...this.pacienteEditando };
        }

        this.displayEditModal = false;
      },
      error: (err: any) => {
        console.error('Error al editar:', err);
        const mensajeBackend = err.error?.message || err.error?.error || 'Ocurrió un problema al guardar en el servidor.';
        this.messageService.add({ severity: 'error', summary: 'Error del Servidor', detail: mensajeBackend });
      }
    });
  }

  verDetallePaciente(id: number) {
    console.log('Navegando al expediente del paciente con ID:', id);
    // this.router.navigate(['/dashboard/expediente', id]);
  }
}