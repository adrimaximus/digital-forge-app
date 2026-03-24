
export type ContactFormData = {
  fullName: string;
  email: string;
  informationType: string;
  message: string;
};

export type InformationTypeOption = 
  | 'harga-layanan'
  | 'konsultasi'
  | 'brief-project'
  | 'feedback'
  | 'lainnya';
