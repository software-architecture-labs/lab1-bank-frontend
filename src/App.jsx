import { useState } from 'react';
import CustomerList from './components/CustomerList';
import CreateAccountForm from './components/CreateAccountForm';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState('customers'); // Estado para cambiar de vista

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Un pequeño banquito, Elio sapa</h1>
        <nav>
          <button onClick={() => setActiveTab('customers')} style={tabStyle(activeTab === 'customers')}>
            Clientes
          </button>
          <button onClick={() => setActiveTab('transfer')} style={tabStyle(activeTab === 'transfer')}>
            Realizar Transferencia
          </button>
          <button onClick={() => setActiveTab('history')} style={tabStyle(activeTab === 'history')}>
            Historial
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'customers' && (
          <>
            <CreateAccountForm onCustomerCreated={handleRefresh} />
            <hr />
            <CustomerList key={refresh} />
          </>
        )}

        {activeTab === 'transfer' && (
          <div>
            <TransferMoney />
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <TransactionHistory />
          </div>
        )}
      </main>
    </div>
  );
}

// Un estilo rápido para los botones de navegación
const tabStyle = (isActive) => ({
  padding: '10px 20px',
  margin: '0 5px',
  cursor: 'pointer',
  backgroundColor: isActive ? '#2c3e50' : '#ecf0f1',
  color: isActive ? 'white' : 'black',
  border: '1px solid #bdc3c7',
  borderRadius: '5px'
});

export default App;