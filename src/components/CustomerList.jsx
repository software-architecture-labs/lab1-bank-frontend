import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const CustomerList = ({ onDeleteSuccess }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Cargando clientes...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Lista de Clientes Registrados</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Número de Cuenta</th>
                        <th>Saldo Actual</th>
                        <th style={{ textAlign: 'center' }}>Acción</th> {/* Nueva columna */}
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr><td colSpan="5">No hay clientes en la base de datos.</td></tr>
                    ) : (
                        customers.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{`${c.firstName} ${c.lastName}`}</td>
                                <td>{c.accountNumber}</td>
                                <td style={{ fontWeight: 'bold', color: '#27ae60' }}>
                                    ${c.balance.toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button 
                                        onClick={() => handleDelete(c.id)}
                                        style={{ 
                                            backgroundColor: '#e74c3c', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '5px 10px', 
                                            borderRadius: '4px', 
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
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
    );
};

export default CustomerList;