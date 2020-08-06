export class LanguagesGet {
    success: boolean;
    idiomas: Array<Language>;
}
export class Language {
    id: number;
    nombre: string;
}
export class LanguageKeyWordsGet {
    success: boolean;
    palabras: Array<Words>;
}
export class Words {
    id: number;
    nombre: string;
}
