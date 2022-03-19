export interface UserLdap {
  id: number;
  login: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  motDePasse: string;
  mail: string;
  role: string;
  employeNumero: number;
  employeNiveau: number;
  dateEmbauche: string;
  publishereId: number;
  active: boolean;
}
