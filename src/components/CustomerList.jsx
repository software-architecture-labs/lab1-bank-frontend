import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const CustomerList = ({ onDeleteSuccess }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const thStyle = { padding: '10px 12px', textAlign: 'left', letterSpacing: '0.01em', fontWeight: 600 };
    const tdStyle = { borderBottom: '1px solid #e2e8f0', padding: '10px 12px', color: '#1f2937' };
    const deleteButtonStyle = {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        fontWeight: '600'
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await api.get('/customers');
                setCustomers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener clientes:", err);
                setError('No se pudo conectar con el servidor.');
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    // funcion para borrar cliente
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Seguro que quieres borrar este cliente?");
        
        if (confirmDelete) {
            try {
                await api.delete(`/customers/${id}`);
                alert("Cliente eliminado exitosamente");
                
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                }
            } catch (err) {
                console.error("Error al borrar:", err);
                alert("No se pudo eliminar el cliente. Verifica que no tenga transacciones.");
            }
        }
    };

    if (loading) return <p style={{ textAlign: 'center', color: '#3b82f6', marginTop: '18px' }}>Cargando clientes...</p>;
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                <h3 style={{ margin: 0 }}>Lista de Clientes Registrados</h3>
                <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>{customers.length} clientes</span>
            </div>

            <div style={{ overflowX: 'auto', marginTop: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px', fontSize: '0.95rem' }}>
                    <thead style={{ backgroundColor: '#1d4ed8', color: 'white' }}>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Nombre Completo</th>
                            <th style={thStyle}>Nro de Cuenta</th>
                            <th style={thStyle}>Saldo Actual</th>
                            <th style={thStyle}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>No hay clientes en la base de datos.</td></tr>
                        ) : (
                            customers.map((c) => (
                                <tr key={c.id} style={{ backgroundColor: '#ffffff' }}>
                                    <td style={tdStyle}>{c.id}</td>
                                    <td style={tdStyle}>{`${c.firstName} ${c.lastName}`}</td>
                                    <td style={tdStyle}>{c.accountNumber}</td>
                                    <td style={{ ...tdStyle, fontWeight: 'bold', color: '#16a34a' }}>${c.balance.toLocaleString()}</td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        <button 
                                            onClick={() => handleDelete(c.id)}
                                            style={deleteButtonStyle}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;