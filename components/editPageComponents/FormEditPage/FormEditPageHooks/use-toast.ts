import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
    title?: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

function toast(options: ToastOptions | string) {
    if (typeof options === 'string') {
        return sonnerToast(options);
    }

    const { title, description, action } = options;

    if (title && description) {
        return sonnerToast(title, {
            description,
            action: action ? {
                label: action.label,
                onClick: action.onClick,
            } : undefined,
        });
    } else if (title) {
        return sonnerToast(title, {
            action: action ? {
                label: action.label,
                onClick: action.onClick,
            } : undefined,
        });
    } else if (description) {
        return sonnerToast(description);
    }

    return sonnerToast('Toast');
}

// Add convenience methods
toast.success = (message: string, options?: { description?: string }) => {
    return sonnerToast.success(message, options);
};

toast.error = (message: string, options?: { description?: string }) => {
    return sonnerToast.error(message, options);
};

toast.info = (message: string, options?: { description?: string }) => {
    return sonnerToast.info(message, options);
};

toast.warning = (message: string, options?: { description?: string }) => {
    return sonnerToast.warning(message, options);
};

toast.loading = (message: string, options?: { description?: string }) => {
    return sonnerToast.loading(message, options);
};

toast.dismiss = (id?: string | number) => {
    return sonnerToast.dismiss(id);
};

function useToast() {
    return {
        toast,
        dismiss: toast.dismiss,
    };
}

export { useToast, toast };
