export const REQUEST_STATUS = {
    PENDING: {
        CODE: '1',
        VALUE: 'Pendiente'
    },
    ACCEPTED: {
        CODE: '2',
        VALUE: 'Aceptada'
    },
    REJECTED: {
        CODE: '3',
        VALUE: 'Rechazada'
    },
    CANCELLED: {
        CODE: '4',
        VALUE: 'Cancelado'
    }
};

export const TYPE_REQUEST = {
    SPONSOR: {
        ORIGINAL: 'sponsor',
        CONVERTION: 'Padrino',
        CODE: '2'

    },
    COORDINATOR: {
        ORIGINAL: 'coordinator',
        CONVERTION: 'Coordinador',
        CODE: '1'
    },
    SCHOOL: {
        ORIGINAL: 'school',
        CONVERTION: 'Escuela',
        CODE: '3'
    },
};
