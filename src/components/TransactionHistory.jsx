import { useState } from 'react';
import api from '../api/axiosConfig';

const TransactionHistory = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!accountNumber) return;

        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            // Hacemos el GET al endpoint de tu TransactionController
            const response = await api.get(`/transactions/account/${accountNumber}`);
            setTransactions(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error al buscar historial:", err);
            setError('Error al conectar con el servidor o buscar la cuenta.');
            setLoading(false);
        }
    };

    // Función para formatear la fecha (ej: "11/3/2026, 18:30:00")
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Fecha desconocida';
        const date = new Date(timestamp);
        return date.toLocaleString(); 
    };

    return (
        <div style={{ marginTop: '8px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f9fbff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <div>
                <h2 style={{ margin: 0, color: '#1f2937', fontSize: '1rem' }}>Historial de movimientos</h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#4b5563' }}>Busca por cuenta para ver entradas y salidas.</p>
              </div>
            </div>
            
            <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Ingrese número de cuenta..." 
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)} 
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Buscar Movimientos
                </button>
            </form>

            {loading && <p style={{ textAlign: 'center', color: '#2563eb' }}>Buscando...</p>}
            {error && <p style={{ textAlign: 'center', color: '#ef4444' }}>{error}</p>}

            {/* Tabla de Resultados */}
            {!loading && !error && hasSearched && (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '650px' }}>
                    <thead style={{ backgroundColor: '#1d4ed8', color: 'white' }}>
                        <tr>
                            <th>ID Transacción</th>
                            <th>Fecha y Hora</th>
                            <th>Cuenta Origen</th>
                            <th>Cuenta Destino</th>
                            <th>Monto</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="6">No se encontraron transacciones para esta cuenta.</td>
                            </tr>
                        ) : (
                            transactions.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{formatDate(t.timestamp)}</td>
                                    <td>{t.senderAccountNumber}</td>
                                    <td>{t.receiverAccountNumber}</td>
                                    <td style={{ fontWeight: 'bold' }}>${t.amount.toLocaleString()}</td>
                                    {/* Pequeña lógica visual para saber si el dinero entró o salió */}
                                    <td style={{ 
                                        color: t.senderAccountNumber === accountNumber ? 'red' : 'green',
                                        fontWeight: 'bold'
                                    }}>
                                        {t.senderAccountNumber === accountNumber ? 'SALIDA 🔴' : 'INGRESO 🟢'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
              </div>
            )}
        </div>
    );
};

export default TransactionHistory;