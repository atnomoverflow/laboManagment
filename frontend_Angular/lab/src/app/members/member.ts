import { Evenement } from "../evenments/evenement";
import { Outil } from "../outils/outils";
import { Publication } from "../publications/publication";

export interface Member {
    id: number;
    cin: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    cv: string;
    photo: string | null;
    email: string;
    password: string;
    pubs: Publication | null;
    events: Evenement | null;
    tools: Outil | null;
    etablissement?: string;
    grade?: string;
    dateInscription?: Date;
    sujet?: string;
    diplome?: string;
    encadrant?: Member | null;
}