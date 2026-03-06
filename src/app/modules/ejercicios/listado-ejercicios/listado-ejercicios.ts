export class ListadoEjercicios implements OnInit {
  exercises: Exercise[] = [];         // Datos originales del Back
  filteredExercises: Exercise[] = []; // Datos que se muestran en pantalla
  searchTerm: string = '';            // Término de búsqueda
  
  loading = false;
  // ... (tus variables de paginación)

  constructor(private exerciseUseCase: ExerciseUseCase) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    // ... (tu lógica de offset actual)

    this.exerciseUseCase.listExercises(this.pageSize, offset).subscribe({
      next: (result: any) => {
        this.exercises = result.rows; 
        this.filteredExercises = result.rows; // Al cargar, ambos son iguales
        this.totalCount = result.count;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.loading = false;
        
        // Si hay un término de búsqueda previo, aplicarlo a los nuevos datos
        if (this.searchTerm) this.onSearch();
      },
      // ... (error handling)
    });
  }

  // FUNCIÓN DE FILTRADO
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredExercises = [...this.exercises];
      return;
    }

    this.filteredExercises = this.exercises.filter(ex => 
      (ex.name?.toLowerCase().includes(term)) || 
      (ex.bodyZone?.toLowerCase().includes(term)) ||
      (ex.description?.toLowerCase().includes(term))
    );
  }
}