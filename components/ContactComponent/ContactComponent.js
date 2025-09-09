import React, { useState } from "react";
import { useAppContext } from "@/context/Context";

const Efficiency = () => {
    const { isLightTheme } = useAppContext();

    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setFormStatus("Please fill in all required fields.");
            return;
        }

        // Check if the user accepted the terms
        if (!acceptedTerms) {
            setFormStatus("You must accept the terms before submitting.");
            return;
        }

        setIsSubmitting(true);
        setFormStatus("");

        const response = await fetch("/api/sendmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
            }),
        });

        if (response.ok) {
            setFormStatus("Thank you! Your message has been sent.");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            setFormStatus("There was an error. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div
            className="container"
            style={{
                backgroundImage: 'url("/images/bg/contact-bg.svg")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                padding: "80px",
                width: "100%",
                height: "auto",
            }}
            id="contact"
        >
            <div className="row" style={{ textAlign: "center", justifyContent: "center" }}>
                <div className="col-lg-12">
                    <div className="section-title text-left">
                        <h4 className="subtitle">
                            <span className="theme-gradient-new">CONNECT</span>
                        </h4>
                        <h2 className="title theme-heading-text" style={{ marginBottom: "0px" }}>
                            Get In Touch
                        </h2>
                        <p className="theme-mini-text">We're here to answer any questions you may have. Feel free to reach out to us.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-6" style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", flex: "1 0 0", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                            <p style={{ color: "#D4D4D4", fontSize: "14px", fontWeight: "400", marginBottom: "0px" }}>Name</p>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid rgba(167, 169, 255, 0.24)",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    height: "40px",
                                    padding: "8px 12px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6" style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", flex: "1 0 0", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                            <p style={{ color: "#D4D4D4", fontSize: "14px", fontWeight: "400", marginBottom: "0px" }}>Email</p>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid rgba(167, 169, 255, 0.24)",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    height: "40px",
                                    padding: "8px 12px",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", flex: "1 0 0", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                            <p style={{ color: "#D4D4D4", fontSize: "14px", fontWeight: "400", marginBottom: "0px" }}>Message</p>
                            <textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    border: "1px solid rgba(167, 169, 255, 0.24)",
                                    background: "rgba(255, 255, 255, 0.04)",
                                    padding: "8px 12px",
                                    height: "128px",
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="checkbox" style={{ marginBottom: "24px" }}>
                    <input
                        type="checkbox"
                        id="terms-checkbox"
                        className="checkbox-input"
                        aria-label="Accept terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <label htmlFor="terms-checkbox" className="checkbox-label">I accept the Terms</label>
                </div>

                <button className="button outline" type="submit" disabled={isSubmitting}>
                    <span className="buttonText">{isSubmitting ? "Submitting..." : "Submit"}</span>
                    <img
                        loading="lazy"
                        src="/images/icons/circle.svg"
                        alt=""
                        className="buttonIcon"
                    />
                </button>

                {formStatus && (
                    <div style={{ marginTop: "20px", color: formStatus.includes("error") ? "red" : "green" }}>
                        {formStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Efficiency;
