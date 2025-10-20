// Funcion que retorna una palabra y la retorna con la primera letra en mayuscula y el resto en minuscula
export const camelCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

