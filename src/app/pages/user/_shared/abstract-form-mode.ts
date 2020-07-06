/**
 * This global variable is used for components or forms that handle the same create,
 * edit or delete modality. Those components that change their modality by external
 * agents is necessary to create a service for their purpose.
 */

export interface Create {
  VALUE: '1';
  LABEL: 'Crear';
}

export interface Edit {
  VALUE: '2';
  LABEL: 'Editar';
}

export interface Delete {
  VALUE: '3';
  LABEL: 'Eliminar';
}

export const FORM_MODALITY: { CREATE: Create; EDIT: Edit; DELETE: Delete } = {
  CREATE: { LABEL: 'Crear', VALUE: '1' },
  EDIT: { LABEL: 'Editar', VALUE: '2' },
  DELETE: { LABEL: 'Eliminar', VALUE: '3' },
};


export interface BaseFormUser {
  onSubmit: () => void;
  onResetForm: () => void;
}
