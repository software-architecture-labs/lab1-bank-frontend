import { useState } from 'react';
import api from '../api/axiosConfig';

const CreateAccountForm = ({ onCustomerCreated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        accountNumber: '',
        balance: 0
    });

    const inputStyle = {
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        padding: '10px',
        fontSize: '0.95rem',
        width: '100%',
        boxSizing: 'border-box'
    };
    const primaryButton = {
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: 'white',
        fontWeight: '700',
        padding: '10px',
        cursor: 'pointer',
        transition: '0.2s ease'
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviamos el objeto al POST de tu CustomerController
            await api.post('/customers', formData);
            alert('¡Cliente creado con éxito!');
            setFormData({ firstName: '', lastName: '', accountNumber: '', balance: 0 });
            onCustomerCreated(); // Refresca la tabla automáticamente
        } catch (err) {
            alert('Error al crear el cliente');
        }
    };

    return (
        <div style={{ backgroundColor: '#f6f8ff', padding: '18px', borderRadius: '14px', marginBottom: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(15,23,42,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ margin: 0, color: '#1f2937' }}>Registrar Nuevo Cliente</h4>
              <span style={{ color: '#2563eb', fontWeight: 700 }}>✨ Fácil y rápido</span>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                <input style={inputStyle} type="text" placeholder="Nombre" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                <input style={inputStyle} type="text" placeholder="Apellido" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                <input style={inputStyle} type="text" placeholder="Nro de Cuenta" value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} required />
                <input style={inputStyle} type="number" placeholder="Saldo Inicial" value={formData.balance} onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value)})} required />
                <button type="submit" style={primaryButton}>Guardar Cliente</button>
            </form>
        </div>
    );
};

export default CreateAccountForm;