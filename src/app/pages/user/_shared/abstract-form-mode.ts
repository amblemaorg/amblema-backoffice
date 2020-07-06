/**
 * This global variable is used for components or forms that handle the same create,
 * edit or delete modality. Those components that change their modality by external
 * agents is necessary to create a service for their purpose.
 */

export interface Action {
  value: '1' | '2' | '3';
  label: 'Crear' | 'Editar' | 'Eliminar';
}

export const FORM_MODALITY: { CREATE: Action; EDIT: Action; DELETE: Action } = {
  CREATE: { label: 'Crear', value: '1' },
  EDIT: { label: 'Editar', value: '2' },
  DELETE: { label: 'Eliminar', value: '3' },
};


export interface BaseFormUser {
  onSubmit: () => void;
  onResetForm: () => void;
}
