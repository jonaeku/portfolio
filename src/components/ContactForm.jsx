import React, { useState } from "react";
import styles from "../styles/ContactForm.module.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({});
    const [isActive, setIsActive] = useState(false);

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (!formData.email) {
            alert("Bitte geben Sie beim Senden einer Anfrage Ihre Email an!");
            return;
        } else {
            await fetch("/Mail", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            setFormData({
                name: "",
                email: "",
                message: "",
            });
            setIsActive((current) => !current);
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <title>Kontakt</title>
                <meta name="description" content="Termin anfragen!" />
                <link rel="icon" href="/favicon.ico" />
            </div>

            <div className={styles.main}>
                <h1 className="text-3xl mb-3">Kontakt</h1>
                <p className="text-md lg:text-xl">
                    Gerne können wir gemeinsam Ihr geplantes Projekt umsetzen 😃
                </p>
                <br />
                <div className="h-[250px] flex items-center justify-center">
                    {!isActive ?
                        <form onSubmit={handleOnSubmit} className="w-full">
                            <div className={styles.grid}>
                                <div className="flex gap-3">
                                    <p className="w-1/2">
                                        <label htmlFor="name">Name</label>
                                        <br />
                                        <input
                                            className={styles.input}
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    </p>
                                    <p className="w-1/2">
                                        <label htmlFor="email">Email</label>
                                        <br />
                                        <input
                                            className={styles.input}
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </p>
                                </div>
                                <p className="mt-3">
                                    <label htmlFor="message">Sonstiges</label>
                                    <br />
                                    <input
                                        className={styles.inputText}
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                    />
                                </p>
                                <button
                                    className={isActive ? styles.submitActive : styles.submit}
                                >
                                    {isActive ? "Gesendet" : "Senden"}
                                </button>
                            </div>
                        </form>
                        : <p className={styles.sendInfo}>Anfrage erfolgreich versendet!</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;