export type RejectionFormProps = {
    id: string;
    closePopup: () => void;
    getData : () => Promise<void>;
    toastNotification: (message: string) => void;
}