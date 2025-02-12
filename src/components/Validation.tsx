import React, { useState } from 'react';
import Error from './Error';

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  pass?: string[];
  passConfirm?: string[];
}

interface Fields {
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  passConfirm: string;
}

function ValidationForm() {
  // Field states
  const [fields, setFields] = useState<Fields>({
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    passConfirm: '',
  });

  // Error states
  const [errors, setErrors] = useState<FieldErrors>({});

  /* ------------------------------------------------------------------
   *  SPECIFIC VALIDATIONS
   * ------------------------------------------------------------------ */

  // 1. Validate first name
  function validateFirstName(value: string): string[] {
    const errorMessages: string[] = [];

    if (/\s/.test(value)) {
      errorMessages.push("Only one word (no spaces).");
    }

    if (value.length > 0 && !/^[A-Z]/.test(value)) {
      errorMessages.push("Must begin with a capital letter.");
    }

    if (value.length > 0 && value.length < 3) {
      errorMessages.push("Minimum 3 characters.");
    } else if (value.length > 10) {
      errorMessages.push("Maximum 10 characters.");
    }

    return errorMessages;
  }

  // 2. Validate last names
  function validateLastName(value: string): string[] {
    const errorMessages: string[] = [];

    // Split by spaces
    const parts = value.trim().split(/\s+/);

    // Check there are exactly 2 "words"
    if (parts.length !== 2) {
      errorMessages.push("Enter two last names separated by a space.");
    } else {
      // Check each part
      parts.forEach((lastName, index) => {
        if (!/^[A-Z]/.test(lastName)) {
          errorMessages.push(`Last name ${index + 1} must start with a capital letter.`);
        }

        if (lastName.length < 3 || lastName.length > 10) {
          errorMessages.push(`Last name ${index + 1} must have between 3 and 10 characters.`);
        }
      });
    }

    return errorMessages;
  }

  // 3. Validate email
  function validateEmail(value: string): string[] {
    const errorMessages: string[] = [];
    if (value.length === 0) return errorMessages; // No need to validate empty email

    if (!/^[A-Za-z0-9._%+-]+@gmail\.(com|es)$/.test(value)) {
      errorMessages.push("Gmail address with .com or .es domain.");
    }
    return errorMessages;
  }

  // 4. Validate password
  function validatePassword(value: string): string[] {
    const errorMessages: string[] = [];

    if (value.length === 0) return errorMessages;

    if (!/^(?=.*[A-Z])/.test(value)) {
      errorMessages.push("Must contain at least one uppercase letter.");
    }
    if (!/^(?=.*[a-z])/.test(value)) {
      errorMessages.push("Must contain at least one lowercase letter.");
    }
    if (!/^(?=.*\d)/.test(value)) {
      errorMessages.push("Must contain at least one number.");
    }
    if (!/^(?=.*[^a-zA-Z0-9])/.test(value)) {
      errorMessages.push("Must contain at least one symbol.");
    }
    if (value.length < 4) {
      errorMessages.push("Minimum 4 characters long.");
    }
    return errorMessages;
  }

  // 5. Validate password confirmation
  function validatePasswordConfirm(pass: string, passConfirm: string): string[] {
    if (passConfirm.length === 0) return [];
    if (pass !== passConfirm) {
      return ["Passwords do not match."];
    }
    return [];
  }

  /* ------------------------------------------------------------------
   *  Handle changes
   * ------------------------------------------------------------------ */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update fields state
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation
    let fieldErrors: string[] = [];

    if (name === "firstName") {
      fieldErrors = validateFirstName(value);
    } else if (name === "lastName") {
      fieldErrors = validateLastName(value);
    } else if (name === "email") {
      fieldErrors = validateEmail(value);
    } else if (name === "pass") {
      fieldErrors = validatePassword(value);
      // Also re-validate passConfirm if it's already written
      const confirmErrors = validatePasswordConfirm(value, fields.passConfirm);
      setErrors((prev) => ({ ...prev, passConfirm: confirmErrors }));
    } else if (name === "passConfirm") {
      fieldErrors = validatePasswordConfirm(fields.pass, value);
    }

    // Update errors
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors,
    }));
  };

  /* ------------------------------------------------------------------
   *  Final Submit
   * ------------------------------------------------------------------ */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    const firstNameErrors = validateFirstName(fields.firstName);
    const lastNameErrors = validateLastName(fields.lastName);
    const emailErrors = validateEmail(fields.email);
    const passErrors = validatePassword(fields.pass);
    const passConfirmErrors = validatePasswordConfirm(fields.pass, fields.passConfirm);

    // Update all errors
    const newErrors: FieldErrors = {
      firstName: firstNameErrors,
      lastName: lastNameErrors,
      email: emailErrors,
      pass: passErrors,
      passConfirm: passConfirmErrors,
    };
    setErrors(newErrors);

    // Check for errors
    const hasErrors = Object.values(newErrors).some(
      (errorArr) => errorArr && errorArr.length > 0
    );
    if (hasErrors) {
      console.log("There are errors in the form.");
      return;
    }

    // If no errors, log the form data
    console.log("Form data:", fields);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 bg-slate-200 rounded shadow-2xl">

      <label className="font-bold">First Name:</label>
      <input
        type="text"
        name="firstName"
        value={fields.firstName}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <Error message={errors.firstName || []} />

      <label className="font-bold">Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={fields.lastName}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <Error message={errors.lastName || []} />

      <label className="font-bold">Email (@gmail.com/.es):</label>
      <input
        type="email"
        name="email"
        value={fields.email}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <Error message={errors.email || []} />

      <label className="font-bold">Password:</label>
      <input
        type="password"
        name="pass"
        value={fields.pass}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <Error message={errors.pass || []} />

      <label className="font-bold">Confirm Password:</label>
      <input
        type="password"
        name="passConfirm"
        value={fields.passConfirm}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
      <Error message={errors.passConfirm || []} />

      <button
        type="submit"
        className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded hover:bg-cyan-800"
      >
        Submit
      </button>
    </form>
  );
}

export default ValidationForm;


   