type InputFeild = ChangeEvent<HTMLInputElement>;
type FormSubmit = React.FormEvent<HTMLFormElement>;

type FormInput = {
    [key: string]: string;
}

type createOrganizationFormProps = {
    closePopup: () => void;
    toggleChange: () => void;
}