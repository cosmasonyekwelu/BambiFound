import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activePartner, setActivePartner] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/messages/conversations');
      const convs = res.data || [];
      setConversations(convs);
      if (convs.length > 0 && !activePartner) {
        setActivePartner(convs[0].partner);
      }
    } catch {
      // Handle missing conversations
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!activePartner?.id) return;
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${activePartner.id}`);
        setMessages(res.data?.messages || []);
      } catch {
        // Handle error
      }
    };
    fetchMessages();
  }, [activePartner]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activePartner?.id) return;

    try {
      const res = await api.post('/messages', {
        receiverId: activePartner.id,
        content: messageInput.trim(),
      });
      setMessages((prev) => [...prev, res.data]);
      setMessageInput('');
      fetchConversations();
    } catch {
      // Handle error
    }
  };

  const partnerName = activePartner?.fullName || activePartner?.email || 'Elena Vance';
  const partnerRole = activePartner?.profile?.headline || 'AI Systems Architect';
  const partnerAvatar = partnerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || 'EV';

  return (
    <div className="min-h-screen bg-[#0c1511] text-[#e1e3df] font-sans flex flex-col">
      {/* Top Header Navigation */}
      <header className="border-b border-[#23352b] bg-[#0c1511]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="font-newsreader text-2xl font-semibold text-[#82dbac] tracking-tight">
              BambiFound
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Overview
              </Link>
              <Link to="/discover" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Discover Builders
              </Link>
              <Link to="/ventures" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Venture Listings
              </Link>
              <Link to="/messages" className="text-sm font-medium text-[#82dbac] border-b-2 border-[#82dbac] pb-1">
                Intros & Messages
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/settings/membership" className="text-xs font-semibold text-[#82dbac] bg-[#1d2b24] px-3 py-1.5 rounded-full border border-[#2e4338] hover:bg-[#25392f] transition-colors">
              {user?.membershipTier || 'FREE'} TIER
            </Link>
            <Link to="/profile/edit" className="w-8 h-8 rounded-full bg-[#1e2e26] border border-[#2e4338] flex items-center justify-center text-[#82dbac]">
              <span className="material-symbols-outlined text-sm">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-8 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
            Intros & Dialogue
          </h1>
          <p className="text-sm text-[#a1aca4]">
            Direct double-opt-in communications with your top matched builders.
          </p>
        </div>

        {/* Messaging Layout Container */}
        <div className="flex-1 bg-[#121c17] border border-[#23352b] rounded-2xl grid grid-cols-1 md:grid-cols-3 min-h-[560px] overflow-hidden">
          {/* Left Column: Threads list */}
          <div className="border-r border-[#23352b] flex flex-col bg-[#0f1813]">
            <div className="p-4 border-b border-[#23352b]">
              <h2 className="text-xs font-bold text-[#82dbac] uppercase tracking-wider">
                Active Conversations ({conversations.length})
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#1b2b21]">
              {isLoading ? (
                <div className="p-6 text-xs text-[#a1aca4] text-center">
                  Loading conversations...
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-6 text-xs text-[#a1aca4] text-center">
                  No connected conversations yet. Request intros on the Discover page to start chatting!
                </div>
              ) : (
                conversations.map((c) => {
                  const partner = c.partner;
                  const isSelected = activePartner?.id === partner.id;
                  const name = partner.fullName || partner.email;
                  const avatar = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
                  return (
                    <button
                      key={partner.id}
                      onClick={() => setActivePartner(partner)}
                      className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                        isSelected ? 'bg-[#18271f]' : 'hover:bg-[#142019]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#1e3025] border border-[#2e4338] flex items-center justify-center font-bold text-[#82dbac] text-xs shrink-0">
                        {avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold text-[#f0f2ee] truncate">{name}</span>
                        </div>
                        <p className="text-[11px] text-[#a1aca4] truncate mb-1">{partner.profile?.headline || 'Builder'}</p>
                        <p className="text-[11px] text-[#718076] truncate">
                          {c.lastMessage?.content || 'Started conversation'}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Chat View */}
          <div className="md:col-span-2 flex flex-col justify-between bg-[#121c17]">
            {!activePartner ? (
              <div className="flex-1 flex items-center justify-center p-8 text-xs text-[#a1aca4]">
                Select a builder conversation from the sidebar to open dialogue.
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-4 border-b border-[#23352b] flex items-center justify-between bg-[#15221c]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1e3025] border border-[#2e4338] flex items-center justify-center font-bold text-[#82dbac] text-xs">
                      {partnerAvatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#f0f2ee]">{partnerName}</h3>
                      <p className="text-xs text-[#a1aca4]">{partnerRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/profile/${activePartner.id}`}
                      className="text-xs text-[#c1c8c2] hover:text-[#82dbac] border border-[#2b3e32] px-3 py-1.5 rounded-lg bg-[#18241e]"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>

                {/* Message Stream */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-xs text-[#a1aca4]">
                      No messages in this dialogue yet. Send a note below to start building together!
                    </div>
                  ) : (
                    messages.map((m) => {
                      const isMe = m.senderId === user?.id;
                      const timeStr = new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold text-[#a1aca4]">{isMe ? 'You' : partnerName}</span>
                            <span className="text-[10px] text-[#718076]">{timeStr}</span>
                          </div>
                          <div
                            className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                              isMe
                                ? 'bg-[#82dbac] text-[#0c1511] font-medium rounded-tr-none'
                                : 'bg-[#18261e] text-[#e1e3df] border border-[#25392e] rounded-tl-none'
                            }`}
                          >
                            {m.content}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#23352b] bg-[#15221c] flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Message ${partnerName}...`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-[#0d1612] border border-[#25392e] rounded-xl px-4 py-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
                  >
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
