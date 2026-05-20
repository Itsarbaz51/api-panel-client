"use client";

import React, { useEffect, useState } from "react";

import Input from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

import { loginValidation } from "@/validation/loginValidation";
import { getValidationErrors } from "@/utils/validationErrors";
import Alert from "../ui/Alert";
import ConfirmDialog from "../ConfirmDialog";

export default function LoginForm({ onSubmit, onForgotPassword, loading }) {
  const [formData, setFormData] = useState({
    identify: "",
    password: "",
    latitude: null,
    longitude: null,
    accuracy: null,
  });

  const [errors, setErrors] = useState({});
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationDialog, setLocationDialog] = useState(false);

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

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationLoading(false);
      setLocationDialog(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }));

        setLocationAllowed(true);
        setLocationLoading(false);
      },
      () => {
        setLocationAllowed(false);
        setLocationLoading(false);
        setLocationDialog(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!locationAllowed) {
      setLocationDialog(true);
      return;
    }

    const result = loginValidation.safeParse(formData);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {locationError && (
        <Alert type="error" title="Location Permission Required">
          {locationError}
        </Alert>
      )}
      {locationLoading && (
        <div className="text-sm text-blue-600">Getting your location...</div>
      )}

      <ConfirmDialog
        open={locationDialog}
        onClose={() => setLocationDialog(false)}
        onConfirm={() => {
          setLocationDialog(false);
          window.location.reload();
        }}
        variant="danger"
        title="Location Permission Required"
        description="Location access is required to login. Please allow location permission and try again."
        // confirmText="Retry"
        cancelText="Close"
      />

      <Input
        type="text"
        name="identify"
        label="Email / Username / RegistrationNumber"
        placeholder="Enter email or username"
        value={formData.identify}
        onChange={handleChange}
        error={errors.identify}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex justify-end">
        <Button type="button" variant="text" onClick={onForgotPassword}>
          Forgot Password?
        </Button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading || locationLoading || !locationAllowed}
      >
        {locationLoading
          ? "Getting Location..."
          : loading
            ? "Logging..."
            : "Login"}
      </Button>
    </form>
  );
}
