import { useState } from 'react';
import api from '../api/axiosConfig';

const CreateAccountForm = ({ onCustomerCreated }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        accountNumber: '',
        balance: 0
    });

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
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h4>Registrar Nuevo Cliente</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                <input type="text" placeholder="Apellido" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                <input type="text" placeholder="Nro de Cuenta" value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} required />
                <input type="number" placeholder="Saldo Inicial" value={formData.balance} onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value)})} required />
                <button type="submit">Guardar Cliente</button>
            </form>
        </div>
    );
};

export default CreateAccountForm;