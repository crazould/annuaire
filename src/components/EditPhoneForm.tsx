import React, { useEffect, useState } from "react";
import useAddNumberToContact from "../hooks/useAddNumberToContact";
import EditPhoneInput from "./EditPhoneInput";

interface EditPhoneFormProps {
  id: string | undefined;
  numbers: string[];
  setNumbers: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditPhoneForm = ({ id, numbers, setNumbers }: EditPhoneFormProps) => {
  const [addMode, setAddMode] = useState(false);
  const [newNumber, setNewNumber] = useState("");

  const [addNumber, addNumberResult] = useAddNumberToContact(id, newNumber);

  useEffect(() => {
    if (addNumberResult.data) {
      alert("Add number to contact success");
    }
  }, [addNumberResult.data]);

  const changePhones = (e: React.ChangeEvent, idx: number) => {
    let newNumbers = [...numbers];
    newNumbers[idx] = (e.target as HTMLInputElement).value;
    setNumbers(newNumbers);
  };

  const handleAddMode = () => {
    if (addMode) addNumber();
    setAddMode(!addMode);
  };

  const changeNewNumber = (e: React.ChangeEvent) => {
    setNewNumber((e.target as HTMLInputElement).value);
  };

  const phonesInput = numbers.map((number, idx) => {
    const props = { changePhones, idx, number };
    return <EditPhoneInput key={idx} {...props} />;
  });

  return (
    <div>
      <div>
        <div>
          {addMode ? (
            <input type="text" value={newNumber} onChange={changeNewNumber} />
          ) : (
            ""
          )}
        </div>
        <button onClick={handleAddMode}>
          {addMode ? "save" : `add new number`}
        </button>
      </div>
      {phonesInput}
    </div>
  );
};

export default EditPhoneForm;
