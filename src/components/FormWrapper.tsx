import React from "react";

interface FormWrapperProps {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  onSubmit,
  children,
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onSubmit} className="p-8 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-6">{title}</h1>
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;
