/**
 * This global variable is used for components or forms that handle the same create,
 * edit or delete modality. Those components that change their modality by external
 * agents is necessary to create a service for their purpose.
 */

export interface Action {
  value: '1' | '2' | '3' | '4';
  label: 'Crear' | 'Editar' | 'Eliminar' | 'Ver';
}

export const FORM_MODALITY: { CREATE: Action; EDIT: Action; DELETE: Action, VIEW: Action } = {
  CREATE: { label: 'Crear', value: '1' },
  EDIT: { label: 'Editar', value: '2' },
  DELETE: { label: 'Eliminar', value: '3' },
  VIEW: { label: 'Ver', value: '4' },
};

export interface BaseFormUser {
  onPatchValues: (data: any) => void;
  onSubmit: () => void;
  onResetForm: () => void;
}
