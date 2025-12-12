/**
 * Formatea un nombre completo para mostrar solo el primer nombre
 * con la primera letra en mayúscula y el resto en minúsculas
 * @param fullName - Nombre completo (ej: "MARCOS DANIEL ROMERO")
 * @returns Primer nombre formateado (ej: "Marcos")
 */
export function formatFirstName(fullName: string): string {
  if (!fullName) return '';
  const firstName = fullName.split(' ')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

/**
 * Formatea un nombre completo con cada palabra capitalizada
 * @param fullName - Nombre completo (ej: "marcos daniel romero")
 * @returns Nombre formateado (ej: "Marcos Daniel Romero")
 */
export function formatFullName(fullName: string): string {
  if (!fullName) return '';
  return fullName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

