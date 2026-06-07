import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle, Trash2, MessageSquare, Mail, Link as LinkIcon, RefreshCw } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pixeltech_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load leads from localStorage
  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/leads`);
      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setLeads(data);
    } catch (error) {
      console.error("Failed to load leads from backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        await fetch(`${apiUrl}/api/leads/${id}`, { method: 'DELETE' });
        setLeads(prev => prev.filter(lead => lead.id !== id));
      } catch (error) {
        console.error("Failed to delete lead:", error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const leadToToggle = leads.find(lead => lead.id === id);
    if (!leadToToggle) return;
    
    const newStatus = leadToToggle.status === 'new' ? 'contacted' : 'new';
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'does234' && password === '@gga Miash 09') {
      setIsAuthenticated(true);
      localStorage.setItem('pixeltech_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pixeltech_admin_auth');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-bg pt-[90px] pb-20 px-6 relative flex items-center justify-center">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 w-full max-w-md bg-bg2 border border-line rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-mut uppercase tracking-wider mb-1.5">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent/60 transition-colors text-ink"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-mut uppercase tracking-wider mb-1.5">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent/60 transition-colors text-ink"
                required
              />
            </div>
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button 
              type="submit" 
              className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent/90 transition-colors mt-2"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-[90px] pb-20 px-6 relative">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase border-l-2 border-accent pl-4 inline-block mb-3">
              Internal Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-bg2 border border-line rounded-lg px-6 py-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-mut text-xs uppercase font-bold tracking-wider">Total Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </div>
            </div>
            <button 
              onClick={loadLeads}
              className="bg-bg2 border border-line rounded-lg px-4 flex items-center justify-center hover:bg-white/5 transition-colors"
              title="Refresh Leads"
            >
              <RefreshCw className="w-5 h-5 text-mut" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg px-4 py-2 flex items-center justify-center hover:bg-red-500/20 transition-colors text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#05050A]/80 backdrop-blur-xl border border-line rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line bg-bg2/50">
                  <th className="px-6 py-4 text-[0.7rem] font-semibold text-mut uppercase tracking-[0.1em]">Status</th>
                  <th className="px-6 py-4 text-[0.7rem] font-semibold text-mut uppercase tracking-[0.1em]">Client</th>
                  <th className="px-6 py-4 text-[0.7rem] font-semibold text-mut uppercase tracking-[0.1em]">Service & Goal</th>
                  <th className="px-6 py-4 text-[0.7rem] font-semibold text-mut uppercase tracking-[0.1em]">Date</th>
                  <th className="px-6 py-4 text-[0.7rem] font-semibold text-mut uppercase tracking-[0.1em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/50">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-mut">Loading leads...</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/5 mb-4">
                        <Inbox className="w-8 h-8 text-accent/50" />
                      </div>
                      <h3 className="text-lg font-bold mb-1">No leads yet</h3>
                      <p className="text-mut text-sm">When users submit the booking form, they will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`hover:bg-white/[0.02] transition-colors ${lead.status === 'contacted' ? 'opacity-60' : ''}`}
                    >
                      <td className="px-6 py-5 whitespace-nowrap">
                        <button 
                          onClick={() => handleToggleStatus(lead.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-colors ${
                            lead.status === 'new' 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                              : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {lead.status === 'new' ? 'NEW' : 'CONTACTED'}
                        </button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-ink text-base">{lead.firstName} {lead.lastName}</div>
                        {lead.company && <div className="text-xs text-accent/80 font-semibold mt-0.5 tracking-wide uppercase">{lead.company}</div>}
                        
                        <div className="flex flex-col gap-1.5 mt-2.5">
                          <a href={`mailto:${lead.email}`} className="text-mut hover:text-accent transition-colors flex items-center gap-1.5 text-[0.8rem]">
                            <Mail className="w-3.5 h-3.5" /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-mut hover:text-[#25D366] transition-colors flex items-center gap-1.5 text-[0.8rem]">
                              <MessageSquare className="w-3.5 h-3.5" /> {lead.phone}
                            </a>
                          )}
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noreferrer" className="text-mut hover:text-accent transition-colors flex items-center gap-1.5 text-[0.8rem]">
                              <LinkIcon className="w-3.5 h-3.5" /> {lead.website}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-[300px]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-accent/10 text-accent text-xs font-bold tracking-wide">
                            {lead.service}
                          </span>
                          {lead.budget && (
                            <span className="inline-block px-2.5 py-0.5 rounded border border-line text-mut text-xs font-semibold">
                              Budget: {lead.budget}
                            </span>
                          )}
                        </div>
                        <p className="text-[0.85rem] text-mut truncate hover:text-clip hover:whitespace-normal transition-all" title={lead.goal}>
                          {lead.goal}
                        </p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-mut">
                        {new Date(lead.date || lead.timestamp).toLocaleDateString()}<br/>
                        <span className="text-xs opacity-70">{new Date(lead.date || lead.timestamp).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <a 
                            href={`mailto:${lead.email}?subject=Regarding your Pixeltech Agency inquiry`}
                            className="p-2 rounded-lg bg-bg border border-line text-mut hover:text-accent hover:border-accent/50 transition-all"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 rounded-lg bg-bg border border-line text-mut hover:text-red-400 hover:border-red-500/50 transition-all"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8 bg-bg2 border border-line p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" /> Automation Status
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-bg border border-line rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">Email Notifications</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold">ACTIVE (MOCK)</span>
              </div>
              <p className="text-xs text-mut">Sends lead details to info@pixeltech.agency upon form submission.</p>
            </div>
            <div className="p-4 bg-bg border border-line rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">WhatsApp Alerts</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold">ACTIVE (MOCK)</span>
              </div>
              <p className="text-xs text-mut">Simulates sending alerts to your WhatsApp numbers upon form submission.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
