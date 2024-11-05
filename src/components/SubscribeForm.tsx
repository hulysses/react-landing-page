import axios from 'axios';
import Button from './Button';
import "../styles/subscribeForm.css";
import React, { useState } from 'react';

export default function SubscribeForm() {
    const [formData, setFormData] = useState({
        toMail: "",
        content: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const sendEmail = async () => {
        try {
            const response = await axios.post('/function-1', formData, {
                headers: {
                    'Authorization': `Bearer  `
                }
            });
            return response.status === 200;
        } catch (err) {
            console.error("Erro ao enviar email:", err);
            throw new Error("Erro ao enviar email.");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const success = await sendEmail();
            if (success) {
                alert("Email enviado com sucesso!");
                setFormData({ toMail: "", content: "" });
            }
        } catch {
            alert("Erro ao enviar emaisl");
        };
    }
    return (
        <form onSubmit={handleSubmit} className="subscribe-form" aria-label="Formulário de Inscrição">
            <input
                type="email"
                name="toMail"
                value={formData.toMail}
                onChange={handleChange}
                placeholder="Seu melhor Email"
                required
            />
            <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Motivo do Contato"
                required
            />
            <Button text='Enviar' />
        </form>
    );
}