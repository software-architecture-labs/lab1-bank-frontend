import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const CustomerList = () => {
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
                setError('No se pudo conectar con el servidor. Revisa el CORS y que el Backend esté corriendo.');
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr><td colSpan="4">No hay clientes en la base de datos.</td></tr>
                    ) : (
                        customers.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                {/* Concatenamos firstName y lastName del DTO */}
                                <td>{`${c.firstName} ${c.lastName}`}</td>
                                <td>{c.accountNumber}</td>
                                <td style={{ fontWeight: 'bold', color: '#27ae60' }}>
                                    ${c.balance.toLocaleString()}
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