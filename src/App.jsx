import { useState } from 'react';
import CustomerList from './components/CustomerList';
import CreateAccountForm from './components/CreateAccountForm';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState('customers');

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f5f7ff, #eef3ff 60%, #ffffff 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#2c3e50' }}>
        <header style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ margin: '0', color: '#3d5afe', fontWeight: '700', letterSpacing: '0.15em', fontSize: '0.72rem' }}>
            🏦 BANCO AMIGABLE
          </p>
          <h1 style={{ margin: '0.2rem 0 0.2rem', fontSize: '2rem' }}>Bienvenido a tu banco simple</h1>
          <p style={{ margin: '0.3rem 0 1rem', color: '#4b5563' }}>
            Administra clientes, realiza transferencias y revisa movimientos con una interfaz más amigable.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {['customers', 'transfer', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={tabStyle(activeTab === tab)}
              >
                {tab === 'customers' ? '👥 Clientes' : tab === 'transfer' ? '💸 Transferir' : '📜 Historial'}
              </button>
            ))}
          </div>
        </header>

        <section style={{ background: 'white', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
          {activeTab === 'customers' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <CreateAccountForm onCustomerCreated={handleRefresh} />
              <CustomerList key={refresh} onDeleteSuccess={handleRefresh} />
            </div>
          )}

          {activeTab === 'transfer' && (
            <TransferMoney />
          )}

          {activeTab === 'history' && (
            <TransactionHistory />
          )}
        </section>
      </div>
    </div>
  );
}

const tabStyle = (isActive) => ({
  border: 'none',
  borderRadius: '999px',
  padding: '10px 16px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.9rem',
  backgroundColor: isActive ? '#3b82f6' : 'white',
  color: isActive ? 'white' : '#1f2937',
  border: isActive ? 'none' : '1px solid #d1d5db',
  boxShadow: isActive ? '0 4px 10px rgba(59,130,246,0.25)' : 'none',
  transition: 'all 0.2s ease'
});

export default App;