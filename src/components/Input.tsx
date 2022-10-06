/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

interface inputProps {
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent) => void;
  disabled?: boolean;
  id?: string;
}

const Input = ({
  value,
  type,
  placeholder,
  required,
  onChange,
  disabled,
  id,
}: inputProps) => {
  const theme = useTheme();

  const inputStyle = css`
    font-family: "Futura Md BT", sans-serif;
    border-radius: 0.5rem;
    border: ${theme.border};
    padding: 0.5rem;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    display: block;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :disabled{
      background-color: #a1a1aa;
    }
  `;

  return (
    <input
      id={id}
      css={inputStyle}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
      disabled={disabled}
    />
  );
};

export default Input;
