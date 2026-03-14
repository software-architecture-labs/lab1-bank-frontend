import { useState } from 'react';
import CustomerList from './components/CustomerList';
import CreateAccountForm from './components/CreateAccountForm';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #eef2ff, #f8fbff 55%, #ffffff 100%)', padding: '10px 8px 18px' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#111827' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 14px', background: 'white', borderRadius: '999px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '999px', backgroundColor: '#4f46e5', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 'bold' }}>B</div>
            <span style={{ fontWeight: 700, color: '#111827' }}>Banquito</span>
          </a>

          <nav style={{ display: 'flex', gap: '20zpx', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('home')} style={compactTabStyle(activeTab === 'home')}>Inicio</button>
            <button onClick={() => setActiveTab('customers')} style={compactTabStyle(activeTab === 'customers')}>Clientes</button>
            <button onClick={() => setActiveTab('transfer')} style={compactTabStyle(activeTab === 'transfer')}>Transferir</button>
            <button onClick={() => setActiveTab('history')} style={compactTabStyle(activeTab === 'history')}>Historial</button>
          </nav>

        </header>

        <section style={{ background: 'white', borderRadius: '14px', padding: '14px', boxShadow: '0 8px 18px rgba(0,0,0,0.06)', marginBottom: '10px' }}>
          {activeTab === 'home' && (
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px', alignItems: 'stretch', minHeight: '170px' }}>
                <div style={{ borderRadius: '12px', background: 'linear-gradient(120deg, #4f46e5 0%, #6366f1 100%)', color: 'white', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>Banco Amigable</p>
                    <h2 style={{ margin: '8px 0 8px', fontSize: '1.6rem' }}>Bienvenido a tu banca digital</h2>
                    <p style={{ margin: 0, color: '#e2e8f0' }}>Donec sit amet volutpat mauris. Donec dui leo, suscipit vitae ante a, ultrices aliquam leo. 
                      Nunc hendrerit dignissim justo a sollicitudin. Nunc ultricies sem malesuada, venenatis sapien non, pulvinar nibh. Duis rutrum, libero et auctor cursus,
                       sem ligula vehicula neque, quis pellentesque orci lacus vitae libero.</p>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px' }}>
                    <p style={{ margin: 0 }}>✅ 500+ clientes activos</p>
                    <p style={{ margin: 0 }}>✅ 4.9/5 calificación</p>
                  </div>
                </div>
                <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', padding: '12px', display: 'grid', gap: '8px' }}>
                  <h3 style={{ margin: '0', fontSize: '1rem' }}>Novedades</h3>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>Nuevo: Transferencias programadas</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569' }}>Sed luctus, ex id dapibus malesuada, tortor nunc tincidunt nunc, ac elementum orci sapien a elit</p>
                  </div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px', background: '#fff7ed' }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>Promoción</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#844f00' }}>Proin quis arcu quam. Sed ultricies erat ac nulla aliquet, id tincidunt ipsum facilisis.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '12px', background: 'white' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>Datos curiosos</h3>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#334155', fontSize: '0.85rem' }}>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Vivamus volutpat fermentum justo non posuere.</li>
                    <li>Donec nulla lectus, pretium non justo at, faucibus tincidunt orci.</li>
                  </ul>
                </div>
                <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '12px', background: '#f9fafb' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>Información legal</h3>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', lineHeight: '1.4' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat fermentum justo non posuere. Donec nulla lectus, 
                    pretium non justo at, faucibus tincidunt orci. Nunc eu faucibus purus, id vehicula sapien. Donec vel odio nisi. Nullam molestie sollicitudin turpis,
                  </p>
                </div>
              </div>

              <div style={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', padding: '12px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem' }}>Publicidad</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', border: '1px dashed #cbd5e1', borderRadius: '10px', padding: '10px', background: '#f0f9ff' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#1d4ed8' }}><b>Pellentesque id fermentum tortor.</b></p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#334155' }}> Suspendisse eget erat quis libero finibus mattis</p>
                  </div>
                  <div style={{ flex: '1 1 200px', border: '1px dashed #d1fae5', borderRadius: '10px', padding: '10px', background: '#ecfdf3' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#15803d' }}><b>Aliquam vitae felis non dolor faucibus imperdiet ac vitae ipsum.</b></p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.76rem', color: '#334155' }}>Pellentesque et justo mauris. Maecenas mi nunc, dignissim ac luctus quis.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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

const compactTabStyle = (isActive) => ({
  border: '1px solid #dbeafe',
  borderRadius: '999px',
  padding: '6px 12px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '0.8rem',
  backgroundColor: isActive ? '#4f46e5' : 'white',
  color: isActive ? 'white' : '#374151',
  borderColor: isActive ? '#4f46e5' : '#d1d5db'
});

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