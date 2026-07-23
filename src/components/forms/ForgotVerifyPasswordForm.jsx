"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

import { forgotPasswordValidation } from "@/validation/loginValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function ForgotVerifyPasswordForm({
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = forgotPasswordValidation.safeParse(formData);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Password */}

      <div className="relative">
        <InputField
          label="New Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-muted-foreground"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}

      <div className="relative">
        <InputField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-muted-foreground"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading ? "Updating Password..." : "Verify Password"}
      </Button>
    </form>
  );
}
