export interface ILabeledInput {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export interface ISignupData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface ILoginData{
    username: string;
    password: string;
}