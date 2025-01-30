import { useState } from "react";
import * as z from "zod";

const schema = z.object({
  full_name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be under 50 characters"),
  iban: z.string().regex(/^[A-Z0-9]{15,34}$/, "Invalid IBAN format"),
  email: z.string().email("Invalid email address").optional(),
});

export default function InternationalBeneficiary({ onChange }) {
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    iban: "",
    swift: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedValues = { ...formValues, [id]: value };
    setFormValues(updatedValues);

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
  };

  return (
    <>
      <div className="mb-2 flex flex-col gap-1">
        <label htmlFor="iban" className="block text-xs text-primary">
          IBAN
        </label>
        <input
          type="text"
          id="iban"
          placeholder="##-##-##"
          className={`block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300 ${
            errors.iban ? "border-red-500" : ""
          }`}
          value={formValues.iban}
          onChange={handleInputChange}
        />
        {errors.iban && (
          <p className="text-alert text-xs mt-1">{errors.iban}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-1">
        <label htmlFor="name" className="block text-xs text-primary">
          Company name
        </label>
        <input
          type="text"
          id="full_name"
          placeholder="Enter company name"
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
      <div className="mb-2 flex flex-col gap-1">
        <label htmlFor="swift" className="block text-xs text-primary">
          SWIFT/BIC (optional)
        </label>
        <input
          type="text"
          id="swift"
          placeholder="#### ####"
          className="block w-full h-8 py-1 px-2 mt-1 border rounded-[10px] border-primary50 text-xs placeholder:text-xs placeholder:text-primary300 text-primary300"
          value={formValues.swift}
          onChange={handleInputChange}
        />
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
