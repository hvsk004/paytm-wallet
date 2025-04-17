export interface ILabeledInput {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export interface ISignupData {
    firtsname: string;
    lastname: string;
    email: string;
    password: string;
}