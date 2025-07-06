import Swal from 'sweetalert2';

export const showToast = ({
    type = 'success',     // 'success', 'error', 'info', 'warning'
    title = '',
    text = '',
    position = 'top',
    timer = 3000,
}) => {
    Swal.fire({
        toast: true,
        position,
        icon: type,
        title,
        text,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        customClass: {
            popup: 'swal2-toast-custom',
            title: 'swal2-toast-title',
            htmlContainer: 'swal2-toast-text',
        },
    });
};
export const showConfirmDialog = async ({
    title = 'Are you sure?',
    text = '',
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel',
    confirmButtonColor = '#d33',
    cancelButtonColor = '#3085d6',
    icon = 'warning',
}) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
    });

    return result.isConfirmed;
};
