import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../styles/pages/Register.css";
import * as yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "At least 1 lowercase letter required")
        .matches(/[A-Z]/, "At least 1 uppercase letter required")
        .matches(/[0-9]/, "At least 1 number required")
        .matches(/[^a-zA-Z0-9]/, "At least 1 special character required")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        alert("Registered Successfully");
        console.log("Registration data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="form-card">
                <h1>Registration Form</h1>

                <div className="field">
                    <label>Name</label>
                    <input {...register("name")} placeholder="Enter your name" className={errors.name ? "error" : ""} />
                    {errors.name && <p className="error-text">{errors.name.message}</p>}
                </div>

                <div className="field">
                    <label>Email</label>
                    <input type="email" {...register("email")} placeholder="you@example.com" className={errors.email ? "error" : ""} />
                    {errors.email && <p className="error-text">{errors.email.message}</p>}
                </div>

                <div className="field">
                    <label>Password</label>
                    <div className="password-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            placeholder="Password"
                            className={errors.password ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="error-text">{errors.password.message}</p>}
                </div>

                <div className="field">
                    <label>Confirm Password</label>
                    <div className="password-box">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                            placeholder="Confirm password"
                            className={errors.confirmPassword ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="submit-btn">
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
