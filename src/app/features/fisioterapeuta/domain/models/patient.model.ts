export interface Patient {
  id?: string | number;
  name: string;
  phone?: string;
  condition?: string;
  status?: string;
  avatar?: string;
  // Agrega aquí los demás campos que requiera tu base de datos
}