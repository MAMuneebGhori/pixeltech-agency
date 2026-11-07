import { useState, useEffect, useCallback } from 'react';
import { Inbox, CheckCircle, Trash2, MessageSquare, Mail, Link as LinkIcon, RefreshCw, Eye, EyeOff } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'pixeltech_admin_token';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const isAuthenticated = Boolean(token);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = useCallback(() => {
    setToken(null);
    sessionStorage.removeItem(TOKEN_KEY);
  }, []);

  // Every admin call carries the server-issued token. A 401 throws an `unauthorized` error and the catch handlers log out.
  // authFetch itself never sets state, so the load effect stays free of synchronous setState.
  const authFetch = useCallback(async (path, options = {}) => {
    const response = await fetch(`${apiUrl}${path}`, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` }
    });
    if (response.status === 401) throw Object.assign(new Error('Session expired'), { unauthorized: true });
    return response;
  }, [token]);

  const fail = (label) => (error) => (error.unauthorized ? handleLogout() : console.error(label, error));

  const fetchLeads = useCallback(() =>
    authFetch('/api/leads')
      .then((response) => response.json())
      .then((data) => data.sort((a, b) => new Date(b.date) - new Date(a.date))),
  [authFetch]);

  const loadLeads = () => {
    setIsLoading(true);
    fetchLeads().then(setLeads).catch(fail('Failed to load leads from backend:')).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!token) return;
    fetchLeads()
      .then(setLeads)
      .catch((error) => (error.unauthorized ? handleLogout() : console.error('Failed to load leads from backend:', error)))
      .finally(() => setIsLoading(false));
  }, [token, fetchLeads, handleLogout]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await authFetch(`/api/leads/${id}`, { method: 'DELETE' });
        if (response.ok) setLeads(prev => prev.filter(lead => lead.id !== id));
      } catch (error) {
        fail('Failed to delete lead:')(error);
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const leadToToggle = leads.find(lead => lead.id === id);
    if (!leadToToggle) return;
    
    const newStatus = leadToToggle.status === 'new' ? 'contacted' : 'new';
    
    try {
      const response = await authFetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
      }
    } catch (error) {
      fail('Failed to update status:')(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        setLoginError(response.status === 401 ? 'Invalid credentials' : 'Login unavailable, try again later');
        return;
      }
      const { token: newToken } = await response.json();
      sessionStorage.setItem(TOKEN_KEY, newToken);
      setIsLoading(true);
      setToken(newToken);
      setPassword('');
      setLoginError('');
    } catch {
      setLoginError('Could not reach the server');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-bg pt-3xl pb-3xl px-lg relative flex items-center justify-center">
        <div className="relative z-10 w-full max-w-112 bg-bg2 rounded-card p-xl">
          <h1 className="text-2xl text-center mb-lg">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-md">
            <div>
              <label className="block text-xs font-semibold text-mut mb-xs">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-bg2 border border-field rounded-inner min-h-12 px-md py-sm text-sm transition-colors text-ink"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-mut mb-xs">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-bg2 border border-field rounded-inner min-h-12 pl-md pr-xl py-sm text-sm transition-colors text-ink"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mut hover:text-ink transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {loginError && <p className="text-bad text-sm text-center">{loginError}</p>}
            <button 
              type="submit" 
              className="w-full bg-ink text-bg font-semibold py-sm rounded-lg hover:bg-accent/90 transition-colors mt-xs"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-3xl pb-3xl px-lg relative">
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-xl gap-lg">
          <div>
            <h1 className="text-3xl md:text-4xl tracking-tight">Admin Dashboard</h1>
          </div>
          
          <div className="flex gap-md">
            <div className="bg-bg2 border border-line rounded-lg px-lg py-sm flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-mut text-xs font-semibold">Total Leads</p>
                <p className="text-2xl font-semibold">{leads.length}</p>
              </div>
            </div>
            <button 
              onClick={loadLeads}
              className="bg-bg2 border border-line rounded-lg px-md flex items-center justify-center hover:bg-ink/5 transition-colors"
              title="Refresh Leads"
            >
              <RefreshCw className="w-5 h-5 text-mut" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-bad/10 border border-bad/20 text-bad rounded-lg px-md py-xs flex items-center justify-center hover:bg-bad/20 transition-colors text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border border-line rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line bg-bg2/50">
                  <th className="px-lg py-md text-[0.7rem] font-semibold text-mut">Status</th>
                  <th className="px-lg py-md text-[0.7rem] font-semibold text-mut">Client</th>
                  <th className="px-lg py-md text-[0.7rem] font-semibold text-mut">Service & Goal</th>
                  <th className="px-lg py-md text-[0.7rem] font-semibold text-mut">Date</th>
                  <th className="px-lg py-md text-[0.7rem] font-semibold text-mut text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/50">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-lg py-xl text-center text-mut">Loading leads…</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-lg py-2xl text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/5 mb-md">
                        <Inbox className="w-8 h-8 text-accent/50" />
                      </div>
                      <h3 className="text-lg mb-2xs">No leads yet</h3>
                      <p className="text-mut text-sm">When users submit the booking form, they will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr 
                      key={lead.id}
                      className={`hover:bg-ink/[0.02] transition-colors ${lead.status === 'contacted' ? 'opacity-60' : ''}`}
                    >
                      <td className="px-lg py-lg whitespace-nowrap">
                        <button 
                          onClick={() => handleToggleStatus(lead.id)}
                          className={`inline-flex items-center gap-xs px-sm py-2xs rounded-full text-xs font-semibold transition-colors ${
                            lead.status === 'new' 
                              ? 'bg-bad/10 text-bad border border-bad/20 hover:bg-bad/20' 
                              : 'bg-good/10 text-good border border-good/20 hover:bg-good/20'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          {lead.status === 'new' ? 'NEW' : 'CONTACTED'}
                        </button>
                      </td>
                      <td className="px-lg py-lg">
                        <div className="font-semibold text-ink text-base">{lead.firstName} {lead.lastName}</div>
                        {lead.company && <div className="text-xs text-accent/80 font-semibold mt-3xs">{lead.company}</div>}
                        
                        <div className="flex flex-col gap-xs mt-sm">
                          <a href={`mailto:${lead.email}`} className="text-mut hover:text-accent transition-colors flex items-center gap-xs text-[0.8rem]">
                            <Mail className="w-3.5 h-3.5" /> {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-mut hover:text-good transition-colors flex items-center gap-xs text-[0.8rem]">
                              <MessageSquare className="w-3.5 h-3.5" /> {lead.phone}
                            </a>
                          )}
                          {/* The website field is free text from the public form: only an http(s) URL becomes a link
                              (no javascript:, data: or other schemes); anything else, like "@yourclinic", stays plain text. */}
                          {lead.website && (/^https?:\/\//i.test(lead.website) ? (
                            <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-mut hover:text-accent transition-colors flex items-center gap-xs text-[0.8rem]">
                              <LinkIcon className="w-3.5 h-3.5" /> {lead.website}
                            </a>
                          ) : (
                            <span className="text-mut flex items-center gap-xs text-[0.8rem]">
                              <LinkIcon className="w-3.5 h-3.5" /> {lead.website}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-lg py-lg max-w-[300px]">
                        <div className="flex items-center gap-xs mb-xs">
                          <span className="inline-block px-2.5 py-3xs rounded bg-accent/10 text-accent text-xs font-semibold">
                            {lead.service}
                          </span>
                          {lead.callsPerWeek && (
                            <span className="inline-block px-2.5 py-3xs rounded border border-line text-mut text-xs font-semibold">
                              Calls/wk: {lead.callsPerWeek}
                            </span>
                          )}
                          {lead.bookingSoftware && (
                            <span className="inline-block px-2.5 py-3xs rounded border border-line text-mut text-xs font-semibold">
                              {lead.bookingSoftware}
                            </span>
                          )}
                        </div>
                        <p className="text-[0.85rem] text-mut truncate hover:text-clip hover:whitespace-normal transition-colors" title={lead.goal}>
                          {lead.goal}
                        </p>
                        
                        {lead.chatSummary && (
                          <div className="mt-sm p-sm bg-bg border border-line rounded-lg">
                            <p className="text-xs text-accent font-semibold mb-2xs">AI Chat Summary:</p>
                            <p className="text-xs text-mut leading-relaxed">{lead.chatSummary}</p>
                            
                            {lead.chatHistory && lead.chatHistory.length > 0 && (
                              <details className="mt-xs">
                                <summary className="text-[0.7rem] font-semibold text-mut hover:text-ink cursor-pointer transition-colors">
                                  View Full Transcript
                                </summary>
                                <div className="mt-xs space-y-xs max-h-[200px] overflow-y-auto custom-scrollbar pr-xs">
                                  {lead.chatHistory.map((msg, i) => (
                                    <div key={i} className={`p-xs rounded text-xs ${msg.role === 'user' ? 'bg-ink/5 border border-ink/10' : 'bg-accent/5 border border-accent/10'}`}>
                                      <span className="font-semibold opacity-50 block mb-3xs">{msg.role === 'user' ? 'User' : 'AI'}</span>
                                      {msg.content || msg.text}
                                    </div>
                                  ))}
                                </div>
                              </details>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-lg py-lg whitespace-nowrap text-sm text-mut">
                        {new Date(lead.date || lead.timestamp).toLocaleDateString()}<br/>
                        <span className="text-xs opacity-70">{new Date(lead.date || lead.timestamp).toLocaleTimeString()}</span>
                      </td>
                      <td className="px-lg py-lg whitespace-nowrap text-right">
                        <div className="flex justify-end gap-xs">
                          <a 
                            href={`mailto:${lead.email}?subject=Regarding your Pixeltech Agency inquiry`}
                            className="p-xs rounded-lg bg-bg border border-line text-mut hover:text-accent hover:border-accent/50 transition-colors"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => handleDelete(lead.id)}
                            className="p-xs rounded-lg bg-bg border border-line text-mut hover:text-bad hover:border-bad/50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-xl bg-bg2 border border-line p-lg rounded-2xl">
          <h3 className="text-lg mb-md flex items-center gap-xs">
            <MessageSquare className="w-5 h-5 text-accent" /> Automation Status
          </h3>
          <div className="grid md:grid-cols-2 gap-md">
            <div className="p-md bg-bg border border-line rounded-lg">
              <div className="flex items-center justify-between mb-xs">
                <span className="font-semibold text-sm">Email Notifications</span>
                <span className="text-xs bg-good/10 text-good px-xs py-3xs rounded font-semibold">Set on the server</span>
              </div>
              <p className="text-xs text-mut">Sends lead details to info@pixeltech.agency upon form submission.</p>
            </div>
            <div className="p-md bg-bg border border-line rounded-lg">
              <div className="flex items-center justify-between mb-xs">
                <span className="font-semibold text-sm">WhatsApp Alerts</span>
                <span className="text-xs bg-good/10 text-good px-xs py-3xs rounded font-semibold">Set on the server</span>
              </div>
              <p className="text-xs text-mut">Simulates sending alerts to your WhatsApp numbers upon form submission.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
