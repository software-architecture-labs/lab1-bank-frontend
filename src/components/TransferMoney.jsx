import { useState } from 'react';
import api from '../api/axiosConfig';

const TransferMoney = () => {
    // Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        senderAccountNumber: '',
        receiverAccountNumber: '',
        amount: ''
    });

    // Estado para mostrar mensajes de éxito o error en la pantalla
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        setMessage({ text: 'Procesando transferencia...', type: 'info' });

        try {
            // Preparamos los datos, asegurando que el monto sea un número decimal
            const payload = {
                senderAccountNumber: formData.senderAccountNumber,
                receiverAccountNumber: formData.receiverAccountNumber,
                amount: parseFloat(formData.amount)
            };

            // Hacemos el POST al controlador TransactionController
            await api.post('/transactions', payload);
            
            setMessage({ text: '¡Transferencia realizada con éxito! 💸', type: 'success' });
            
            // Limpiamos el formulario para otra nueva transferencia
            setFormData({
                senderAccountNumber: '',
                receiverAccountNumber: '',
                amount: ''
            });

        } catch (err) {
            console.error("Error en la transferencia:", err);
            // Capturamos el mensaje de error que enviaste desde tu backend (ej. "Fondos insuficientes" o "Cuenta no existe")
            const errorMessage = err.response?.data || 'Ocurrió un error al intentar la transferencia. Verifica los datos.';
            setMessage({ text: errorMessage, type: 'error' });
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#fdfefe', border: '1px solid #bdc3c7', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Realizar Transferencia</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Cuenta de Origen:</label>
                    <input 
                        type="text" 
                        placeholder="Ej. 123456" 
                        value={formData.senderAccountNumber} 
                        onChange={(e) => setFormData({...formData, senderAccountNumber: e.target.value})} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label style={{ fontWeight: 'bold' }}>Cuenta de Destino:</label>
                    <input 
                        type="text" 
                        placeholder="Ej. 654321" 
                        value={formData.receiverAccountNumber} 
                        onChange={(e) => setFormData({...formData, receiverAccountNumber: e.target.value})} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label style={{ fontWeight: 'bold' }}>Monto a Transferir ($):</label>
                    <input 
                        type="number" 
                        placeholder="Ej. 50000" 
                        value={formData.amount} 
                        onChange={(e) => setFormData({...formData, amount: e.target.value})} 
                        required 
                        min="1"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Transferir Fondos
                </button>
            </form>

            {/* Bloque para mostrar los mensajes de éxito o error */}
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