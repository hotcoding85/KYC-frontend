import { useState } from "react";
import * as z from "zod";

const schema = z.object({
  full_name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be under 50 characters"),
  accountNumber: z
    .string()
    .regex(/^\d+$/, "Account number must be numeric")
    .min(8, "Account number must be at least 8 digits")
    .max(12, "Account number must be at most 12 digits"),
  email: z.string().email("Invalid email address").optional(),
});

export default function LocalBeneficiary({ onChange }) {
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    accountNumber: "",
    sortCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedValues = { ...formValues, [id]: value };
    setFormValues(updatedValues);

    // Validate input fields
    try {
      schema.parse({ ...updatedValues, [id]: value });
      setErrors((prev) => ({ ...prev, [id]: undefined }));
      
    } catch (validationError) {
      setErrors((prev) => ({
        ...prev,
        [id]: validationError.errors.find((err) => err.path[0] === id)?.message,
      }));
    }
    
    if (onChange) {
      onChange(updatedValues);
    }
    // Trigger the onChange callback with updated values
    
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="sortCode" className="block text-xs text-primary">
          Sort code
        </label>
        <input
          type="text"
          id="sortCode"
          placeholder="##-##-##"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
          value={formValues.sortCode}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="accountNumber" className="block text-xs text-primary">
          Account number
        </label>
        <input
          type="text"
          id="accountNumber"
          placeholder="########"
          className={`block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
            errors.accountNumber ? "border-red-500" : ""
          }`}
          value={formValues.accountNumber}
          onChange={handleInputChange}
        />
        {errors.accountNumber && (
          <p className="text-alert text-xs mt-1">{errors.accountNumber}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="name" className="block text-xs text-primary">
          Account Holder Name
        </label>
        <input
          type="text"
          id="full_name"
          placeholder="Enter the name of the holder"
          className={`block w-full h-9 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
            errors.name ? "border-red-500" : ""
          }`}
          value={formValues.full_name}
          onChange={handleInputChange}
        />
        {errors.name && (
          <p className="text-alert text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="email" className="block text-xs text-primary">
          Email (optional)
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email address"
          className={`block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
            errors.iban ? "border-red-500" : ""
          }`}
          value={formValues.email}
          onChange={handleInputChange}
        />
        {errors.email && (
          <p className="text-alert text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
    </>
  );
}
