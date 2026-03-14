import { useState } from 'react';
import api from '../api/axiosConfig';

const TransferMoney = () => {
    const [formData, setFormData] = useState({
        senderAccountNumber: '',
        receiverAccountNumber: '',
        amount: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: 'Procesando transferencia...', type: 'info' });

        try {
            const payload = {
                senderAccountNumber: formData.senderAccountNumber,
                receiverAccountNumber: formData.receiverAccountNumber,
                amount: parseFloat(formData.amount)
            };

            await api.post('/transactions', payload);
            
            setMessage({ text: '¡Transferencia realizada con éxito! 💸', type: 'success' });
            
            setFormData({
                senderAccountNumber: '',
                receiverAccountNumber: '',
                amount: ''
            });

        } catch (err) {
            console.error("Error en la transferencia:", err);
            const errorMessage = err.response?.data || 'Ocurrió un error al intentar la transferencia. Verifica los datos.';
            setMessage({ text: errorMessage, type: 'error' });
        }
    };

    // Estilo común para las etiquetas para no repetir código
    const labelStyle = { 
        fontWeight: 'bold', 
        color: '#2c3e50', // Color oscuro para que se vea sobre el fondo blanco
        display: 'block',
        marginBottom: '5px'
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#fdfefe', border: '1px solid #bdc3c7', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Realizar Transferencia</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={labelStyle}>Cuenta de Origen:</label>
                    <input 
                        type="text" 
                        placeholder="Ej. 123456" 
                        value={formData.senderAccountNumber} 
                        onChange={(e) => setFormData({...formData, senderAccountNumber: e.target.value})} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Cuenta de Destino:</label>
                    <input 
                        type="text" 
                        placeholder="Ej. 654321" 
                        value={formData.receiverAccountNumber} 
                        onChange={(e) => setFormData({...formData, receiverAccountNumber: e.target.value})} 
                        required 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Monto a Transferir ($):</label>
                    <input 
                        type="number" 
                        placeholder="Ej. 50000" 
                        value={formData.amount} 
                        onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                        required 
                        min="1"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
                    />
                </div>

                <button type="submit" style={{ padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Transferir Fondos
                </button>
            </form>

            {message.text && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    borderRadius: '5px',
                    backgroundColor: message.type === 'success' ? '#d5f5e3' : message.type === 'error' ? '#f2d7d5' : '#ebf5fb',
                    color: message.type === 'success' ? '#27ae60' : message.type === 'error' ? '#c0392b' : '#2980b9',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default TransferMoney;