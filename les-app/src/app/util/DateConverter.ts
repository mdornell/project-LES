export class DateConverter {

    /**
     * Converte um objeto Date para uma string ISO 8601
     * usada por APIs em Java (Spring Boot).
     */
    static toSpringDate(date: Date): string {
        return date.toISOString();
    }

    /**
     * Converte uma string ISO (do Spring) para objeto Date.
     */
    static fromSpringDate(isoString: string): Date {
        return new Date(isoString);
    }

    /**
     * Converte uma string "yyyy-MM-dd" para objeto Date (hora local).
     */
    static fromDateString(dateStr: string): Date {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    /**
     * Converte um objeto Date para string "yyyy-MM-dd"
     * usada em inputs do tipo date.
     */
    static toDateInputString(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    /**
     * Converte um objeto Date para string no padrão brasileiro: "dd/MM/yyyy"
     */
    static toBRDateString(date: Date): string {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    /**
     * Converte string ISO (ex: do Spring) para string formatada "dd/MM/yyyy"
     */
    static isoToBRDate(isoString: string): string {
        const date = new Date(isoString);
        return this.toBRDateString(date);
    }
}
