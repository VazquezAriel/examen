import Swal from "sweetalert2";

export enum SWEET_TYPE_ICON {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    QUESTION = 'question',
    ERROR = 'error',
}

export enum SWEET_TYPE_BUTTON {
    INFO = '#11CDEF',
    SUCCESS = '#2DCE89',
    WARNING = '#FB6340',
    QUESTION = '#172B4D',
    ERROR = '#F5365C',
}

export enum SWEET_TYPE_TITLE {
    INFO = 'Información',
    SUCCESS = 'Éxito',
    WARNING = 'Alerta',
    QUESTION = 'Consulta',
    ERROR = 'Error',
}

export function sweetAlertNotification(icon = SWEET_TYPE_ICON.SUCCESS, title = SWEET_TYPE_TITLE.INFO, text: string, confirmButtonText: string = 'OK', confirmButtonColor = SWEET_TYPE_BUTTON.SUCCESS) {
    Swal.fire(
        {
            icon,
            title,
            text,
            confirmButtonText,
            confirmButtonColor,
            // showCancelButton: true,
            // cancelButtonColor: '#111226',
            allowOutsideClick: false,
        }

    )
}


