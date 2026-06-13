import { useState } from 'react'
import {
  LayoutDashboard, Users, Flag, ShieldAlert, BarChart3, Settings,
  Search, Bell, LogOut, Eye, EyeOff, CheckCircle,
  XCircle, AlertTriangle, Clock, TrendingUp, TrendingDown,
  UserCheck, Ban, MessageSquareWarning, Filter,
  ChevronLeft, ChevronRight, MoreVertical, Download, RefreshCw,
  Lock, Smartphone, Mail, Star, Zap, Activity,
  CreditCard, DollarSign, ArrowUpRight, ArrowDownRight,
  RefreshCcw, ExternalLink, Wifi, WifiOff, Receipt,
} from 'lucide-react'

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: 1,  initials: 'AH', name: 'Ahmed Al-Hassan',   email: 'ahmed.h@mail.com',    country: 'Saudi Arabia', flag: '🇸🇦', gender: 'Brother', status: 'active',    plan: 'premium', joined: 'Jun 1, 2025',  verified: true,  reports: 0 },
  { id: 2,  initials: 'FN', name: 'Fatima Noor',       email: 'fatima.n@mail.com',   country: 'UK',           flag: '🇬🇧', gender: 'Sister',  status: 'active',    plan: 'free',    joined: 'Jun 3, 2025',  verified: true,  reports: 0 },
  { id: 3,  initials: 'YK', name: 'Yusuf Karim',       email: 'yusuf.k@mail.com',    country: 'Canada',       flag: '🇨🇦', gender: 'Brother', status: 'suspended', plan: 'free',    joined: 'May 28, 2025', verified: false, reports: 3 },
  { id: 4,  initials: 'ZM', name: 'Zaynab Malik',      email: 'zaynab.m@mail.com',   country: 'Pakistan',     flag: '🇵🇰', gender: 'Sister',  status: 'active',    plan: 'family',  joined: 'May 20, 2025', verified: true,  reports: 0 },
  { id: 5,  initials: 'IA', name: 'Ibrahim Aslan',     email: 'ibrahim.a@mail.com',  country: 'Turkey',       flag: '🇹🇷', gender: 'Brother', status: 'banned',    plan: 'free',    joined: 'May 15, 2025', verified: false, reports: 7 },
  { id: 6,  initials: 'MM', name: 'Maryam Mansouri',   email: 'maryam.m@mail.com',   country: 'France',       flag: '🇫🇷', gender: 'Sister',  status: 'active',    plan: 'premium', joined: 'May 10, 2025', verified: true,  reports: 0 },
  { id: 7,  initials: 'OS', name: 'Omar Siddiqui',     email: 'omar.s@mail.com',     country: 'USA',          flag: '🇺🇸', gender: 'Brother', status: 'active',    plan: 'premium', joined: 'May 8, 2025',  verified: true,  reports: 0 },
  { id: 8,  initials: 'KA', name: 'Khadijah Abdullahi',email: 'khadijah.a@mail.com', country: 'UAE',          flag: '🇦🇪', gender: 'Sister',  status: 'active',    plan: 'free',    joined: 'May 5, 2025',  verified: false, reports: 1 },
  { id: 9,  initials: 'HR', name: 'Hassan Rafiq',      email: 'hassan.r@mail.com',   country: 'Germany',      flag: '🇩🇪', gender: 'Brother', status: 'suspended', plan: 'free',    joined: 'Apr 30, 2025', verified: false, reports: 2 },
  { id: 10, initials: 'NI', name: 'Nour Ibrahim',      email: 'nour.i@mail.com',     country: 'Egypt',        flag: '🇪🇬', gender: 'Sister',  status: 'active',    plan: 'premium', joined: 'Apr 22, 2025', verified: true,  reports: 0 },
  { id: 11, initials: 'RH', name: 'Rahma Hassan',      email: 'rahma.h@mail.com',    country: 'Somalia',      flag: '🇸🇴', gender: 'Sister',  status: 'active',    plan: 'free',    joined: 'Apr 18, 2025', verified: false, reports: 0 },
  { id: 12, initials: 'SB', name: 'Suleiman Bakr',     email: 'suleiman.b@mail.com', country: 'Indonesia',    flag: '🇮🇩', gender: 'Brother', status: 'active',    plan: 'premium', joined: 'Apr 10, 2025', verified: true,  reports: 0 },
]

const MOCK_REPORTS = [
  { id: 1,  reporter: 'Fatima N.',    reportedName: 'YK_user_003', reason: 'Fake profile / impersonation',      date: 'Jun 10, 2025', status: 'pending',       priority: 'high',   category: 'Fraud'      },
  { id: 2,  reporter: 'Omar S.',      reportedName: 'IA_user_005', reason: 'Requesting money from matches',     date: 'Jun 9, 2025',  status: 'investigating', priority: 'high',   category: 'Scam'       },
  { id: 3,  reporter: 'Zaynab M.',    reportedName: 'HR_user_009', reason: 'Inappropriate messages',           date: 'Jun 8, 2025',  status: 'pending',       priority: 'medium', category: 'Harassment' },
  { id: 4,  reporter: 'Khadijah A.',  reportedName: 'anon_user_X', reason: 'Profile photos appear stolen',     date: 'Jun 7, 2025',  status: 'resolved',      priority: 'medium', category: 'Fraud'      },
  { id: 5,  reporter: 'Nour I.',      reportedName: 'IA_user_005', reason: 'Sectarian hate speech in bio',     date: 'Jun 6, 2025',  status: 'resolved',      priority: 'high',   category: 'Hate'       },
  { id: 6,  reporter: 'Ibrahim A.',   reportedName: 'SB_user_012', reason: 'Spam messages to multiple users',  date: 'Jun 5, 2025',  status: 'dismissed',     priority: 'low',    category: 'Spam'       },
  { id: 7,  reporter: 'Maryam M.',    reportedName: 'YK_user_003', reason: 'Misrepresentation of intentions',  date: 'Jun 4, 2025',  status: 'pending',       priority: 'medium', category: 'Conduct'    },
  { id: 8,  reporter: 'Hassan R.',    reportedName: 'anon_user_Y', reason: 'Underage user suspected',          date: 'Jun 3, 2025',  status: 'investigating', priority: 'high',   category: 'Safety'     },
]

const ACTIVITY_LOG = [
  { id: 1,  time: '2 min ago',  actor: 'System',       action: 'Auto-flagged profile',         detail: 'IA_user_005 — reverse image match detected',   type: 'alert'   },
  { id: 2,  time: '14 min ago', actor: 'Admin Noor',  action: 'Banned user',                  detail: 'Ibrahim Aslan (IA_user_005) — scam confirmed',  type: 'ban'     },
  { id: 3,  time: '28 min ago', actor: 'System',       action: 'New report received',           detail: 'Report #8 — Underage user suspected',           type: 'report'  },
  { id: 4,  time: '45 min ago', actor: 'Admin Noor',  action: 'Suspended user',               detail: 'Hassan Rafiq (HR_user_009) — pending review',   type: 'suspend' },
  { id: 5,  time: '1 hr ago',   actor: 'Admin Noor',   action: 'Resolved report #4',           detail: 'Stolen photos confirmed — profile removed',      type: 'resolve' },
  { id: 6,  time: '2 hr ago',   actor: 'System',       action: '147 new registrations today',  detail: 'Peak: 10:00–11:00 UTC',                         type: 'info'    },
  { id: 7,  time: '3 hr ago',   actor: 'Admin Noor',   action: 'Verified 12 profiles',         detail: 'ID verification batch processed',               type: 'verify'  },
  { id: 8,  time: '5 hr ago',   actor: 'System',       action: 'Daily safety digest sent',     detail: '3 high-priority, 5 medium, 12 low',             type: 'info'    },
]

const MONTHLY_SIGNUPS = [
  { month: 'Jan', count: 1240 }, { month: 'Feb', count: 1580 }, { month: 'Mar', count: 2100 },
  { month: 'Apr', count: 2860 }, { month: 'May', count: 3420 }, { month: 'Jun', count: 4180 },
]

const COUNTRY_STATS = [
  { country: 'United Kingdom',  flag: '🇬🇧', users: 842,  pct: 20 },
  { country: 'United States',   flag: '🇺🇸', users: 761,  pct: 18 },
  { country: 'Pakistan',        flag: '🇵🇰', users: 634,  pct: 15 },
  { country: 'Saudi Arabia',    flag: '🇸🇦', users: 512,  pct: 12 },
  { country: 'Indonesia',       flag: '🇮🇩', users: 423,  pct: 10 },
  { country: 'France',          flag: '🇫🇷', users: 318,  pct: 8  },
  { country: 'Other',           flag: '🌍', users: 710,  pct: 17 },
]

// ─── Payment Mock Data ────────────────────────────────────────────────────────

const STRIPE_COLOR = '#635BFF'

const MOCK_TRANSACTIONS = [
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA001', customer: 'Fatima Noor',       cid: 'cus_QxA7mB3kL9pR', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'Jun 10, 2025', method: 'Visa •••• 4242'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA002', customer: 'Ahmed Al-Hassan',   cid: 'cus_QxB2nC4mM0qS', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'Jun 9, 2025',  method: 'Mastercard •••• 5678' },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA003', customer: 'Zaynab Malik',      cid: 'cus_QxC3oD5nN1rT', plan: 'Family',  amount: 24.99, currency: 'USD', status: 'succeeded', date: 'Jun 9, 2025',  method: 'Visa •••• 9012'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA004', customer: 'Omar Siddiqui',     cid: 'cus_QxD4pE6oO2sU', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'Jun 8, 2025',  method: 'Amex •••• 3456'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA005', customer: 'Nour Ibrahim',      cid: 'cus_QxE5qF7pP3tV', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'failed',    date: 'Jun 8, 2025',  method: 'Visa •••• 1234'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA006', customer: 'Maryam Mansouri',   cid: 'cus_QxF6rG8qQ4uW', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'Jun 7, 2025',  method: 'Mastercard •••• 8888' },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA007', customer: 'Suleiman Bakr',     cid: 'cus_QxG7sH9rR5vX', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'refunded',  date: 'Jun 7, 2025',  method: 'Visa •••• 5555'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA008', customer: 'Rahma Hassan',      cid: 'cus_QxH8tI0sS6wY', plan: 'Family',  amount: 24.99, currency: 'USD', status: 'succeeded', date: 'Jun 6, 2025',  method: 'Visa •••• 7777'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA009', customer: 'Khadijah Abdullahi',cid: 'cus_QxI9uJ1tT7xZ', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'pending',   date: 'Jun 6, 2025',  method: 'Bank transfer'    },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA010', customer: 'Yusuf Karim',       cid: 'cus_QxJ0vK2uU8yA', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'failed',    date: 'Jun 5, 2025',  method: 'Mastercard •••• 3333' },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA011', customer: 'Fatima Noor',       cid: 'cus_QxA7mB3kL9pR', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'May 10, 2025', method: 'Visa •••• 4242'   },
  { id: 'pi_3Qx9aB2eZvKYlo2C1h4mA012', customer: 'Maryam Mansouri',   cid: 'cus_QxF6rG8qQ4uW', plan: 'Premium', amount: 9.99,  currency: 'USD', status: 'succeeded', date: 'May 10, 2025', method: 'Mastercard •••• 8888' },
]

const REVENUE_MONTHLY = [
  { month: 'Jan', revenue: 3240  },
  { month: 'Feb', revenue: 4180  },
  { month: 'Mar', revenue: 5620  },
  { month: 'Apr', revenue: 7440  },
  { month: 'May', revenue: 9180  },
  { month: 'Jun', revenue: 11340 },
]

const STRIPE_WEBHOOKS = [
  { event: 'payment_intent.succeeded',          last: '2 min ago',  status: 'ok'   },
  { event: 'payment_intent.payment_failed',      last: '14 min ago', status: 'ok'   },
  { event: 'customer.subscription.created',      last: '28 min ago', status: 'ok'   },
  { event: 'customer.subscription.deleted',      last: '1 hr ago',   status: 'ok'   },
  { event: 'invoice.payment_action_required',    last: '3 hr ago',   status: 'warn' },
  { event: 'charge.refunded',                    last: '5 hr ago',   status: 'ok'   },
]

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRecord   = typeof MOCK_USERS[0]
type ReportRecord = typeof MOCK_REPORTS[0]

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastMsg { id: number; text: string; kind: 'ok' | 'warn' | 'err' }

function Toast({ messages }: { messages: ToastMsg[] }) {
  if (!messages.length) return null
  const bg = { ok: '#1a6b4a', warn: '#a16207', err: '#dc2626' }
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {messages.map(m => (
        <div
          key={m.id}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl text-white text-sm font-medium shadow-2xl"
          style={{ background: bg[m.kind] }}
        >
          {m.kind === 'ok' && <CheckCircle size={15} />}
          {m.kind === 'warn' && <AlertTriangle size={15} />}
          {m.kind === 'err' && <XCircle size={15} />}
          {m.text}
        </div>
      ))}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PRIMARY = '#1a6b4a'
const SIDEBAR_BG = '#0a2e1f'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    active:        { bg: 'rgba(26,107,74,0.12)',  color: '#1a6b4a', label: 'Active'      },
    suspended:     { bg: 'rgba(234,179,8,0.12)',  color: '#a16207', label: 'Suspended'   },
    banned:        { bg: 'rgba(239,68,68,0.12)',  color: '#dc2626', label: 'Banned'      },
    pending:       { bg: 'rgba(234,179,8,0.12)',  color: '#a16207', label: 'Pending'     },
    investigating: { bg: 'rgba(59,130,246,0.12)', color: '#1d4ed8', label: 'Investigating'},
    resolved:      { bg: 'rgba(26,107,74,0.12)',  color: '#1a6b4a', label: 'Resolved'    },
    dismissed:     { bg: 'rgba(107,114,128,0.12)',color: '#374151', label: 'Dismissed'   },
    high:          { bg: 'rgba(239,68,68,0.12)',  color: '#dc2626', label: 'High'        },
    medium:        { bg: 'rgba(234,179,8,0.12)',  color: '#a16207', label: 'Medium'      },
    low:           { bg: 'rgba(107,114,128,0.12)',color: '#374151', label: 'Low'         },
  }
  const s = map[status] ?? map.active
  return (
    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

function ActivityIcon({ type }: { type: string }) {
  const map: Record<string, { icon: React.ReactNode; bg: string }> = {
    alert:   { icon: <AlertTriangle size={13} />,      bg: 'rgba(239,68,68,0.15)'  },
    ban:     { icon: <Ban size={13} />,                bg: 'rgba(239,68,68,0.15)'  },
    report:  { icon: <Flag size={13} />,               bg: 'rgba(234,179,8,0.15)'  },
    suspend: { icon: <Clock size={13} />,              bg: 'rgba(234,179,8,0.15)'  },
    resolve: { icon: <CheckCircle size={13} />,        bg: 'rgba(26,107,74,0.15)'  },
    info:    { icon: <Activity size={13} />,           bg: 'rgba(59,130,246,0.15)' },
    verify:  { icon: <UserCheck size={13} />,          bg: 'rgba(26,107,74,0.15)'  },
  }
  const s = map[type] ?? map.info
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
      <span style={{ color: type === 'report' || type === 'suspend' ? '#a16207' : type === 'alert' || type === 'ban' ? '#dc2626' : type === 'info' ? '#1d4ed8' : '#1a6b4a' }}>
        {s.icon}
      </span>
    </div>
  )
}

// ─── Views ────────────────────────────────────────────────────────────────────

function OverviewView() {
  const maxCount = Math.max(...MONTHLY_SIGNUPS.map(m => m.count))
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Members',      value: '4,200',  sub: '+127 today',    icon: Users,        up: true,  color: PRIMARY     },
          { label: 'Active (30 days)',   value: '3,108',  sub: '74% of total',  icon: Activity,     up: true,  color: '#2d6fa5'   },
          { label: 'Premium Members',    value: '1,340',  sub: '32% of total',  icon: Star,         up: true,  color: '#c9a84c'   },
          { label: 'Verified Profiles',  value: '2,871',  sub: '68% verified',  icon: UserCheck,    up: true,  color: '#7c4dbe'   },
          { label: 'Pending Reports',    value: '23',     sub: '5 high priority',icon: Flag,        up: false, color: '#c94a4a'   },
          { label: 'Suspended / Banned', value: '31',     sub: '0.7% of users', icon: Ban,          up: false, color: '#e67e22'   },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: card.up ? '#1a6b4a' : '#c94a4a' }}>
                  {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: card.color }}>{card.sub}</p>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Signup chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Member Growth</h3>
              <p className="text-xs text-gray-400 mt-0.5">Cumulative registrations — 2025</p>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(26,107,74,0.1)', color: PRIMARY }}>
              <TrendingUp size={11} className="inline mr-1" />+237% YTD
            </span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {MONTHLY_SIGNUPS.map(m => {
              const h = Math.round((m.count / maxCount) * 100)
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-gray-500 font-medium">{m.count.toLocaleString()}</span>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{ height: `${h}%`, background: `linear-gradient(to top, ${PRIMARY}, #2d9b6f)` }}
                  />
                  <span className="text-xs text-gray-400">{m.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity log */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={16} style={{ color: PRIMARY }} /> Live Activity
          </h3>
          <div className="space-y-3">
            {ACTIVITY_LOG.slice(0, 6).map(ev => (
              <div key={ev.id} className="flex items-start gap-2.5">
                <ActivityIcon type={ev.type} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{ev.action}</p>
                  <p className="text-xs text-gray-400 truncate">{ev.detail}</p>
                  <p className="text-xs text-gray-300 mt-0.5">{ev.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent signups */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recent Sign-ups</h3>
          <div className="space-y-2.5">
            {MOCK_USERS.slice(0, 5).map(u => (
              <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: PRIMARY }}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                    {u.verified && <UserCheck size={12} style={{ color: PRIMARY }} />}
                  </div>
                  <p className="text-xs text-gray-400">{u.flag} {u.country} · {u.joined}</p>
                </div>
                <StatusBadge status={u.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Country breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Members by Country</h3>
          <div className="space-y-3">
            {COUNTRY_STATS.map(c => (
              <div key={c.country}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{c.flag} {c.country}</span>
                  <span className="text-gray-400">{c.users.toLocaleString()} · {c.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: `linear-gradient(to right, ${PRIMARY}, #2d9b6f)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Download,   label: 'Export Users CSV',         color: PRIMARY     },
            { icon: RefreshCw,  label: 'Refresh Report Queue',     color: '#2d6fa5'   },
            { icon: UserCheck,  label: 'Run Verification Batch',   color: '#7c4dbe'   },
            { icon: MessageSquareWarning, label: 'Send Safety Digest', color: '#c9a84c' },
            { icon: BarChart3,  label: 'Generate Analytics Report',color: '#e67e22'   },
          ].map(a => {
            const Icon = a.icon
            return (
              <button
                key={a.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:shadow-sm transition-all hover:border-transparent"
                style={{ '--c': a.color } as React.CSSProperties}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${a.color}10`; (e.currentTarget as HTMLElement).style.borderColor = `${a.color}40` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb' }}
              >
                <Icon size={15} style={{ color: a.color }} />
                <span style={{ color: a.color }}>{a.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function UsersView({ users, onUpdateUser, toast }: {
  users: UserRecord[]
  onUpdateUser: (id: number, patch: Partial<UserRecord>) => void
  toast: (text: string, kind?: ToastMsg['kind']) => void
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<number | null>(null)
  const perPage = 8

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const selectedUser = users.find(u => u.id === selected)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search name or email…"
              maxLength={100}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-gray-400" />
            {['all', 'active', 'suspended', 'banned'].map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1) }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={statusFilter === s
                  ? { background: PRIMARY, color: 'white' }
                  : { background: '#f5f5f5', color: '#555' }}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} users</span>
        </div>
      </div>

      <div className={`grid gap-4 ${selectedUser ? 'lg:grid-cols-3' : ''}`}>
        {/* Table */}
        <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${selectedUser ? 'lg:col-span-2' : ''}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Country</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.map(u => (
                <tr
                  key={u.id}
                  onClick={() => setSelected(selected === u.id ? null : u.id)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  style={selected === u.id ? { background: 'rgba(26,107,74,0.04)' } : {}}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: PRIMARY }}>
                        {u.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-gray-800 text-xs">{u.name}</p>
                          {u.verified && <UserCheck size={11} style={{ color: PRIMARY }} />}
                          {u.reports > 0 && (
                            <span className="text-xs font-bold px-1.5 py-0 rounded-full" style={{ background: '#fef2f2', color: '#dc2626' }}>
                              {u.reports}⚑
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 hidden md:table-cell">{u.flag} {u.country}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs font-medium capitalize" style={{ color: u.plan === 'premium' ? '#c9a84c' : u.plan === 'family' ? '#7c4dbe' : '#6b7280' }}>
                      {u.plan === 'premium' && <Star size={10} className="inline mr-0.5" />}
                      {u.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden xl:table-cell">{u.joined}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50">
            <span className="text-xs text-gray-400">Page {page} of {Math.max(totalPages, 1)}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors text-gray-500">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors text-gray-500">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* User detail panel */}
        {selectedUser && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">Member Detail</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><XCircle size={15} /></button>
            </div>
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3" style={{ background: PRIMARY }}>
                {selectedUser.initials}
              </div>
              <p className="font-bold text-gray-900">{selectedUser.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedUser.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <StatusBadge status={selectedUser.status} />
                {selectedUser.verified && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(26,107,74,0.1)', color: PRIMARY }}>
                    <UserCheck size={10} className="inline mr-0.5" />Verified
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[
                ['Gender', selectedUser.gender],
                ['Country', `${selectedUser.flag} ${selectedUser.country}`],
                ['Plan', selectedUser.plan],
                ['Joined', selectedUser.joined],
                ['Reports against', `${selectedUser.reports}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-semibold text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <button className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90" style={{ background: PRIMARY }}>
                <Eye size={12} className="inline mr-1.5" />View Full Profile
              </button>
              {selectedUser.status === 'active' && (
                <button
                  onClick={() => { onUpdateUser(selectedUser.id, { status: 'suspended' }); toast(`${selectedUser.name} suspended`, 'warn') }}
                  className="w-full py-2 rounded-xl text-xs font-semibold border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors"
                >
                  <Clock size={12} className="inline mr-1.5" />Suspend Account
                </button>
              )}
              {selectedUser.status === 'suspended' && (
                <button
                  onClick={() => { onUpdateUser(selectedUser.id, { status: 'active' }); toast(`${selectedUser.name} restored`, 'ok') }}
                  className="w-full py-2 rounded-xl text-xs font-semibold border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <CheckCircle size={12} className="inline mr-1.5" />Restore Account
                </button>
              )}
              {selectedUser.status !== 'banned' && (
                <button
                  onClick={() => { onUpdateUser(selectedUser.id, { status: 'banned' }); setSelected(null); toast(`${selectedUser.name} banned`, 'err') }}
                  className="w-full py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Ban size={12} className="inline mr-1.5" />Ban Account
                </button>
              )}
              {!selectedUser.verified && (
                <button
                  onClick={() => { onUpdateUser(selectedUser.id, { verified: true }); toast(`${selectedUser.name} marked verified`, 'ok') }}
                  className="w-full py-2 rounded-xl text-xs font-semibold border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  <UserCheck size={12} className="inline mr-1.5" />Mark Verified
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ReportsView({ reports, onUpdateReport, onBanUserByName, toast }: {
  reports: ReportRecord[]
  onUpdateReport: (id: number, patch: Partial<ReportRecord>) => void
  onBanUserByName: (name: string) => void
  toast: (text: string, kind?: ToastMsg['kind']) => void
}) {
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = statusFilter === 'all' ? reports : reports.filter(r => r.status === statusFilter)

  const counts: Record<string, number> = {
    all: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    investigating: reports.filter(r => r.status === 'investigating').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    dismissed: reports.filter(r => r.status === 'dismissed').length,
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Reports',   value: MOCK_REPORTS.length, color: '#2d6fa5'  },
          { label: 'Pending',         value: counts.pending,       color: '#a16207'  },
          { label: 'Investigating',   value: counts.investigating, color: '#1d4ed8'  },
          { label: 'Resolved Today',  value: counts.resolved,      color: PRIMARY    },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(counts).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setStatusFilter(k)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all flex items-center gap-1.5"
              style={statusFilter === k ? { background: PRIMARY, color: 'white' } : { background: '#f5f5f5', color: '#555' }}
            >
              {k}
              <span className={`px-1.5 py-0 rounded-full text-xs font-bold ${statusFilter === k ? 'bg-white/25' : 'bg-white'}`} style={statusFilter === k ? { color: 'white' } : { color: '#555' }}>
                {v}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Report cards */}
      <div className="space-y-3">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: r.priority === 'high' ? 'rgba(239,68,68,0.1)' : r.priority === 'medium' ? 'rgba(234,179,8,0.1)' : 'rgba(107,114,128,0.1)' }}>
                  <Flag size={16} style={{ color: r.priority === 'high' ? '#dc2626' : r.priority === 'medium' ? '#a16207' : '#6b7280' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-500">Report #{r.id}</span>
                    <StatusBadge status={r.priority} />
                    <StatusBadge status={r.status} />
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{r.category}</span>
                  </div>
                  <p className="font-semibold text-gray-800 mt-1 text-sm">{r.reason}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Reported by <strong>{r.reporter}</strong> against <strong className="text-gray-600">{r.reportedName}</strong> · {r.date}
                  </p>
                </div>
              </div>
              {(r.status === 'pending' || r.status === 'investigating') && (
                <div className="flex gap-2 flex-shrink-0">
                  {r.status === 'pending' && (
                    <button
                      onClick={() => { onUpdateReport(r.id, { status: 'investigating' }); toast(`Report #${r.id} → Investigating`, 'warn') }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                    >
                      Investigate
                    </button>
                  )}
                  {r.status === 'investigating' && (
                    <button
                      onClick={() => { onUpdateReport(r.id, { status: 'resolved' }); toast(`Report #${r.id} resolved`, 'ok') }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                    >
                      <CheckCircle size={11} className="inline mr-0.5" />Resolve
                    </button>
                  )}
                  <button
                    onClick={() => { onBanUserByName(r.reportedName); onUpdateReport(r.id, { status: 'resolved' }); toast(`User ${r.reportedName} banned`, 'err') }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Ban size={11} className="inline mr-0.5" />Ban User
                  </button>
                  <button
                    onClick={() => { onUpdateReport(r.id, { status: 'dismissed' }); toast(`Report #${r.id} dismissed`, 'warn') }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              {r.status === 'resolved' && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CheckCircle size={13} /> Resolved
                </span>
              )}
              {r.status === 'dismissed' && (
                <span className="flex items-center gap-1 text-xs font-medium text-gray-400">
                  <XCircle size={13} /> Dismissed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SafetyView({ users, onUpdateUser, toast }: {
  users: UserRecord[]
  onUpdateUser: (id: number, patch: Partial<UserRecord>) => void
  toast: (text: string, kind?: ToastMsg['kind']) => void
}) {
  const [resolvedAlerts, setResolvedAlerts] = useState<number[]>([])
  const suspended = users.filter(u => u.status === 'suspended')
  const banned     = users.filter(u => u.status === 'banned')

  return (
    <div className="space-y-6">
      {/* Alerts */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><ShieldAlert size={16} style={{ color: '#c94a4a' }} /> Active Safety Alerts</h3>
        {[
          { id: 0, title: 'Scam pattern detected — IA_user_005', desc: 'Multiple users reported the same account requesting money within 48 hours. Account has been banned. Review cross-account activity.', time: '14 min ago', severity: 'critical' },
          { id: 1, title: 'Possible underage user — Report #8', desc: 'Reporter flagged a user who appears to be under 18 based on profile content and conversation behaviour. Investigating now.', time: '1 hr ago', severity: 'high' },
          { id: 2, title: 'Suspicious off-platform migration attempt', desc: '3 users received messages pushing them to Telegram within first 5 minutes of matching. Accounts logged for pattern analysis.', time: '3 hr ago', severity: 'medium' },
        ].map(a => {
          const done = resolvedAlerts.includes(a.id)
          return (
          <div key={a.id} className="flex items-start gap-4 p-4 rounded-2xl border-2 transition-all" style={{
            background: done ? 'rgba(26,107,74,0.04)' : a.severity === 'critical' ? 'rgba(220,38,38,0.04)' : a.severity === 'high' ? 'rgba(234,179,8,0.04)' : 'rgba(59,130,246,0.04)',
            borderColor: done ? 'rgba(26,107,74,0.25)' : a.severity === 'critical' ? 'rgba(220,38,38,0.25)' : a.severity === 'high' ? 'rgba(234,179,8,0.25)' : 'rgba(59,130,246,0.2)',
          }}>
            {done
              ? <CheckCircle size={18} style={{ color: '#1a6b4a' }} className="flex-shrink-0 mt-0.5" />
              : <AlertTriangle size={18} style={{ color: a.severity === 'critical' ? '#dc2626' : a.severity === 'high' ? '#a16207' : '#1d4ed8' }} className="flex-shrink-0 mt-0.5" />
            }
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-sm text-gray-800">{a.title}</p>
                {!done && (
                  <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-full" style={{
                    background: a.severity === 'critical' ? 'rgba(220,38,38,0.12)' : a.severity === 'high' ? 'rgba(234,179,8,0.12)' : 'rgba(59,130,246,0.12)',
                    color: a.severity === 'critical' ? '#dc2626' : a.severity === 'high' ? '#a16207' : '#1d4ed8',
                  }}>
                    {a.severity}
                  </span>
                )}
                {done && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(26,107,74,0.12)', color: '#1a6b4a' }}>Reviewed</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{a.desc}</p>
              <p className="text-xs text-gray-400 mt-1">{a.time}</p>
            </div>
            {!done && (
              <button
                onClick={() => { setResolvedAlerts(prev => [...prev, a.id]); toast('Alert marked as reviewed', 'ok') }}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition-colors flex-shrink-0"
              >
                Review
              </button>
            )}
          </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Suspended */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={15} style={{ color: '#a16207' }} />
            Suspended Accounts <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(234,179,8,0.15)', color: '#a16207' }}>{suspended.length}</span>
          </h3>
          <div className="space-y-3">
            {suspended.map(u => (
              <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(234,179,8,0.04)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#a16207' }}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.reports} report{u.reports !== 1 ? 's' : ''} · {u.country}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => { onUpdateUser(u.id, { status: 'active' }); toast(`${u.name} restored`, 'ok') }}
                    className="text-xs px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >Restore</button>
                  <button
                    onClick={() => { onUpdateUser(u.id, { status: 'banned' }); toast(`${u.name} banned`, 'err') }}
                    className="text-xs px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >Ban</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banned */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Ban size={15} style={{ color: '#dc2626' }} />
            Banned Accounts <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(220,38,38,0.12)', color: '#dc2626' }}>{banned.length}</span>
          </h3>
          <div className="space-y-3">
            {banned.map(u => (
              <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(220,38,38,0.04)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: '#dc2626' }}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.reports} reports · {u.country}</p>
                </div>
                <span className="text-xs text-red-400 font-medium">Permanent</span>
              </div>
            ))}
          </div>
          {banned.length === 0 && <p className="text-sm text-gray-400 text-center py-6">No banned accounts</p>}
        </div>
      </div>

      {/* Safety stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Scam Detection Rate',   value: '99.2%', icon: ShieldAlert, color: PRIMARY     },
          { label: 'Avg Report Response',   value: '< 2hr', icon: Clock,       color: '#2d6fa5'   },
          { label: 'Profiles Moderated',    value: '100%',  icon: Eye,         color: '#7c4dbe'   },
          { label: 'Safety Team Active',    value: '24/7',  icon: Zap,         color: '#c9a84c'   },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: `${s.color}12` }}>
                <Icon size={18} style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AnalyticsView() {
  const plans = [
    { label: 'Free',    count: 2860, pct: 68, color: '#6b7280' },
    { label: 'Premium', count: 1100, pct: 26, color: '#c9a84c' },
    { label: 'Family',  count: 240,  pct: 6,  color: '#7c4dbe' },
  ]
  const verif = [
    { label: 'Verified',    pct: 68, color: PRIMARY  },
    { label: 'Unverified',  pct: 32, color: '#e5e7eb' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Session Length', value: '7m 42s', change: '+0.8m', up: true },
          { label: 'Profiles Viewed / Day', value: '18,400', change: '+12%', up: true },
          { label: 'Messages Sent / Day', value: '9,210', change: '+8%', up: true },
          { label: 'Match Rate',           value: '23.4%', change: '-1.2%', up: false },
        ].map(m => (
          <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{m.label}</p>
            <p className="text-xs font-semibold mt-1.5 flex items-center gap-0.5" style={{ color: m.up ? '#1a6b4a' : '#c94a4a' }}>
              {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {m.change} vs last week
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly growth bar chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Monthly New Registrations</h3>
          <p className="text-xs text-gray-400 mb-5">First-time sign-ups per month — 2025</p>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_SIGNUPS.map((m, i) => {
              const max = Math.max(...MONTHLY_SIGNUPS.map(x => x.count))
              const h = Math.round((m.count / max) * 100)
              const isLast = i === MONTHLY_SIGNUPS.length - 1
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold" style={{ color: isLast ? PRIMARY : '#9ca3af' }}>{m.count.toLocaleString()}</span>
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${h}%`,
                      background: isLast ? `linear-gradient(to top, ${PRIMARY}, #2d9b6f)` : '#e5e7eb',
                    }}
                  />
                  <span className="text-xs" style={{ color: isLast ? PRIMARY : '#9ca3af', fontWeight: isLast ? 700 : 400 }}>{m.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Plan breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Plan Distribution</h3>
            <div className="space-y-3">
              {plans.map(p => (
                <div key={p.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{p.label}</span>
                    <span className="text-gray-400">{p.count.toLocaleString()} · {p.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-bold text-gray-900 mb-3">Verification Rate</h3>
            <div className="space-y-3">
              {verif.map(v => (
                <div key={v.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{v.label}</span>
                    <span className="text-gray-400">{v.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${v.pct}%`, background: v.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Country table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Top Countries by Member Count</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Country</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Members</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Share</th>
                <th className="py-2 pl-6" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {COUNTRY_STATS.map(c => (
                <tr key={c.country} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 text-sm font-medium text-gray-700">{c.flag} {c.country}</td>
                  <td className="py-2.5 text-sm text-right font-semibold text-gray-800">{c.users.toLocaleString()}</td>
                  <td className="py-2.5 text-sm text-right text-gray-400">{c.pct}%</td>
                  <td className="py-2.5 pl-6 w-32">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: `linear-gradient(to right, ${PRIMARY}, #2d9b6f)` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface Credentials { username: string; password: string }

function SettingsView({
  credentials,
  onChangeCredentials,
}: {
  credentials: Credentials
  onChangeCredentials: (c: Credentials) => void
}) {
  // ── Credential change form state ──
  const [curPass,   setCurPass]   = useState('')
  const [newUser,   setNewUser]   = useState('')
  const [newPass,   setNewPass]   = useState('')
  const [confPass,  setConfPass]  = useState('')
  const [showCur,   setShowCur]   = useState(false)
  const [showNew,   setShowNew]   = useState(false)
  const [credErr,   setCredErr]   = useState('')
  const [credOk,    setCredOk]    = useState(false)

  const saveCredentials = (e: React.FormEvent) => {
    e.preventDefault()
    setCredErr(''); setCredOk(false)

    if (curPass !== credentials.password) { setCredErr('Current password is incorrect.'); return }
    if (!newUser.trim() || newUser.trim().length < 3) { setCredErr('New username must be at least 3 characters.'); return }
    if (newPass.length < 8) { setCredErr('New password must be at least 8 characters.'); return }
    if (newPass !== confPass) { setCredErr('New passwords do not match.'); return }

    onChangeCredentials({ username: newUser.trim(), password: newPass })
    setCurPass(''); setNewUser(''); setNewPass(''); setConfPass('')
    setCredOk(true)
    setTimeout(() => setCredOk(false), 4000)
  }

  return (
    <div className="space-y-5">

      {/* ── Change Credentials ── */}
      <div className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: 'rgba(26,107,74,0.2)' }}>
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Lock size={15} style={{ color: PRIMARY }} />
          Admin Login Credentials
        </h3>
        <p className="text-xs text-gray-400 mb-5">
          Current username: <strong className="text-gray-700 font-mono">{credentials.username}</strong>
          {' · '}Password: <strong className="text-gray-700 font-mono">{'•'.repeat(credentials.password.length)}</strong>
        </p>

        {credOk && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-sm mb-4" style={{ background: 'rgba(26,107,74,0.08)', color: PRIMARY }}>
            <CheckCircle size={15} /> Credentials updated successfully. Use them on your next login.
          </div>
        )}
        {credErr && (
          <div className="flex items-center gap-2 p-3 rounded-xl text-sm mb-4" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
            <AlertTriangle size={15} /> {credErr}
          </div>
        )}

        <form onSubmit={saveCredentials} className="space-y-4" noValidate>
          {/* Current password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Current Password</label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCur ? 'text' : 'password'}
                value={curPass}
                onChange={e => { setCurPass(e.target.value); setCredErr('') }}
                placeholder="Enter your current password"
                maxLength={128}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 transition-colors"
              />
              <button type="button" onClick={() => setShowCur(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showCur ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 grid sm:grid-cols-2 gap-4">
            {/* New username */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">New Username</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={newUser}
                  onChange={e => { setNewUser(e.target.value); setCredErr('') }}
                  placeholder={credentials.username}
                  maxLength={50}
                  autoComplete="new-password"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Min 3 characters</p>
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">New Password</label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPass}
                  onChange={e => { setNewPass(e.target.value); setCredErr('') }}
                  placeholder="Min 8 characters"
                  maxLength={128}
                  autoComplete="new-password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 transition-colors"
                />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Min 8 characters</p>
            </div>

            {/* Confirm password */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                value={confPass}
                onChange={e => { setConfPass(e.target.value); setCredErr('') }}
                placeholder="Repeat new password"
                maxLength={128}
                autoComplete="new-password"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:ring-1 ${confPass && confPass !== newPass ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-100'}`}
              />
              {confPass && confPass !== newPass && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
            >
              Save New Credentials
            </button>
            <p className="text-xs text-gray-400">
              Changes take effect on your next login session.
            </p>
          </div>
        </form>
      </div>

      {/* ── Static config panels ── */}
      {[
        {
          title: 'Platform Configuration',
          icon: Settings,
          items: [
            { label: 'Minimum age requirement',       value: '18 years',              type: 'text'   },
            { label: 'Max bio length',                value: '300 characters',         type: 'text'   },
            { label: 'Profile review required',       value: 'On (manual review)',     type: 'badge'  },
            { label: 'Auto-flag threshold (reports)', value: '3 reports → auto-hold',  type: 'text'   },
          ],
        },
        {
          title: 'Safety Thresholds',
          icon: ShieldAlert,
          items: [
            { label: 'Reports before auto-suspend',  value: '3',                      type: 'text'   },
            { label: 'Reports before auto-ban',      value: '7',                      type: 'text'   },
            { label: 'Scam keyword detection',        value: 'Enabled',                type: 'badge'  },
            { label: 'Reverse-image scan',            value: 'On upload',              type: 'badge'  },
          ],
        },
        {
          title: 'Notifications',
          icon: Bell,
          items: [
            { label: 'High-priority report alerts',  value: 'Instant email + SMS',    type: 'text'   },
            { label: 'Daily safety digest',          value: '08:00 UTC',              type: 'text'   },
            { label: 'Weekly analytics report',      value: 'Monday 09:00 UTC',       type: 'text'   },
          ],
        },
        {
          title: 'Admin Accounts',
          icon: Users,
          items: [
            { label: 'Super Administrators',         value: '1 (Noor)',      type: 'text'   },
            { label: 'Moderators',                   value: '4 active',               type: 'text'   },
            { label: 'Two-factor authentication',    value: 'Required for all admins',type: 'badge'  },
            { label: 'Session timeout',              value: '30 minutes idle',        type: 'text'   },
          ],
        },
      ].map(section => {
        const Icon = section.icon
        return (
          <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon size={15} style={{ color: PRIMARY }} />
              {section.title}
            </h3>
            <div className="divide-y divide-gray-50">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  {item.type === 'badge'
                    ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(26,107,74,0.1)', color: PRIMARY }}>{item.value}</span>
                    : <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                  }
                </div>
              ))}
            </div>
            <button className="mt-3 text-xs font-semibold hover:underline" style={{ color: PRIMARY }}>
              Edit settings →
            </button>
          </div>
        )
      })}
    </div>
  )
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function AdminLogin({
  onLogin,
  credentials,
}: {
  onLogin: () => void
  credentials: Credentials
}) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [err, setErr] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === credentials.username && pass === credentials.password) {
      onLogin()
    } else {
      setErr(`Invalid credentials — check username and password.`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: SIDEBAR_BG }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}>
            <span className="text-white font-bold text-2xl leading-none">ن</span>
          </div>
          <h1 className="text-xl font-bold text-white">Nikah Admin</h1>
          <p className="text-white/50 text-sm mt-1">Super Administrator Portal</p>
        </div>

        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-3xl p-7 space-y-4 backdrop-blur-sm">
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Username</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setErr('') }}
                placeholder={credentials.username}
                maxLength={50}
                autoComplete="username"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-colors border border-white/10 focus:border-white/30"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={e => { setPass(e.target.value); setErr('') }}
                placeholder="••••••••"
                maxLength={128}
                autoComplete="current-password"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm text-white outline-none transition-colors border border-white/10 focus:border-white/30"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {err && (
            <div className="flex items-center gap-2 p-3 rounded-xl text-xs" style={{ background: 'rgba(220,38,38,0.15)', color: '#fca5a5' }}>
              <AlertTriangle size={12} className="flex-shrink-0" /> {err}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
          >
            Sign In to Admin Panel
          </button>

          <div className="flex items-center gap-2 p-3 rounded-xl text-xs text-white/40 border border-white/10">
            <Smartphone size={12} /> Two-factor authentication required for production
          </div>
        </form>

        <p className="text-center text-xs text-white/25 mt-6">
          🔒 Admin access only · Contact your administrator for credentials
        </p>
      </div>
    </div>
  )
}

// ─── PaymentsView ─────────────────────────────────────────────────────────────

function PaymentsView() {
  const [txFilter, setTxFilter] = useState<'all' | 'succeeded' | 'failed' | 'refunded' | 'pending'>('all')
  const [refundTarget, setRefundTarget] = useState<string | null>(null)

  const filtered = txFilter === 'all'
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter(t => t.status === txFilter)

  const totalRevenue   = MOCK_TRANSACTIONS.filter(t => t.status === 'succeeded').reduce((s, t) => s + t.amount, 0)
  const mrr            = 11340
  const arr            = mrr * 12
  const activeSubs     = 318
  const failedCount    = MOCK_TRANSACTIONS.filter(t => t.status === 'failed').length
  const refundedCount  = MOCK_TRANSACTIONS.filter(t => t.status === 'refunded').length
  const maxRev         = Math.max(...REVENUE_MONTHLY.map(r => r.revenue))

  const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
    succeeded: { bg: '#dcfce7', text: '#166534', label: 'Succeeded' },
    failed:    { bg: '#fee2e2', text: '#991b1b', label: 'Failed'    },
    refunded:  { bg: '#fef9c3', text: '#854d0e', label: 'Refunded'  },
    pending:   { bg: '#dbeafe', text: '#1e40af', label: 'Pending'   },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Payments &amp; Revenue</h2>
          <p className="text-sm text-gray-500 mt-0.5">Stripe integration · Live data simulation</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: '#ede9fe', color: STRIPE_COLOR }}>
          <Wifi size={13} />
          Stripe Connected
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: 'MRR',                icon: DollarSign,     value: `$${mrr.toLocaleString()}`,   sub: '+18% vs last month', up: true  },
          { label: 'ARR',                icon: BarChart3,      value: `$${arr.toLocaleString()}`,   sub: 'Annualised',         up: true  },
          { label: 'Total Revenue',      icon: Receipt,        value: `$${totalRevenue.toFixed(2)}`, sub: 'This sample set',   up: true  },
          { label: 'Active Subs',        icon: Users,          value: activeSubs.toString(),        sub: '+12 this week',      up: true  },
          { label: 'Failed Payments',    icon: AlertTriangle,  value: failedCount.toString(),       sub: 'Needs attention',    up: false },
          { label: 'Refunds',            icon: RefreshCcw,     value: refundedCount.toString(),     sub: 'This period',        up: false },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">{k.label}</span>
              <k.icon size={14} className="text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800">{k.value}</p>
            <p className={`text-xs mt-1 flex items-center gap-0.5 ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
              {k.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Subscription Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Revenue (USD)</h3>
          <div className="flex items-end gap-2 h-40">
            {REVENUE_MONTHLY.map(r => (
              <div key={r.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">${(r.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{ height: `${(r.revenue / maxRev) * 100}%`, background: STRIPE_COLOR, opacity: 0.85 }}
                />
                <span className="text-xs text-gray-400">{r.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Plan Distribution</h3>
          <div className="space-y-4">
            {[
              { plan: 'Premium',  count: 249, rev: 2487.51, color: STRIPE_COLOR  },
              { plan: 'Family',   count: 69,  rev: 1724.31, color: '#10b981'     },
              { plan: 'Free',     count: 892, rev: 0,       color: '#d1d5db'     },
            ].map(p => (
              <div key={p.plan}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{p.plan}</span>
                  <span className="text-gray-500">{p.count} · {p.rev > 0 ? `$${p.rev.toFixed(2)}/mo` : 'Free'}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${(p.count / 1210) * 100}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Churn rate this month</p>
            <p className="text-lg font-bold text-gray-800">2.4%</p>
            <p className="text-xs text-emerald-600 flex items-center gap-0.5 mt-0.5"><ArrowDownRight size={11} />-0.6% vs last month</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Recent Transactions</h3>
          <div className="flex gap-1">
            {(['all', 'succeeded', 'failed', 'refunded', 'pending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${txFilter === f ? 'text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                style={txFilter === f ? { background: STRIPE_COLOR } : {}}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Payment ID</th>
                <th className="text-left px-5 py-3 font-medium">Customer</th>
                <th className="text-left px-5 py-3 font-medium">Plan</th>
                <th className="text-left px-5 py-3 font-medium">Amount</th>
                <th className="text-left px-5 py-3 font-medium">Method</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => {
                const s = statusStyle[tx.status]
                return (
                  <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="font-mono text-xs text-gray-600">{tx.id.slice(0, 24)}…</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-gray-800">{tx.customer}</div>
                      <div className="text-xs text-gray-400 font-mono">{tx.cid}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{tx.plan}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800">${tx.amount.toFixed(2)}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{tx.method}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.text }}>
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{tx.date}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        {tx.status === 'failed' && (
                          <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                            Retry
                          </button>
                        )}
                        {tx.status === 'succeeded' && refundTarget !== tx.id && (
                          <button
                            onClick={() => setRefundTarget(tx.id)}
                            className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                          >
                            Refund
                          </button>
                        )}
                        {refundTarget === tx.id && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => setRefundTarget(null)}
                              className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setRefundTarget(null)}
                              className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {MOCK_TRANSACTIONS.length} transactions · Mock data only</p>
        </div>
      </div>

      {/* Stripe Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* API & Webhook Status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: STRIPE_COLOR }}>
              <CreditCard size={11} className="text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700">Stripe Configuration</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Publishable Key</span>
              <span className="font-mono text-gray-700 text-xs">pk_live_••••••••••••Noor</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Secret Key</span>
              <span className="font-mono text-gray-700 text-xs">sk_live_••••••••••••••••</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Webhook Secret</span>
              <span className="font-mono text-gray-700 text-xs">whsec_••••••••••••••••</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Mode</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Live</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">API Version</span>
              <span className="text-gray-700 text-xs">2024-11-20.acacia</span>
            </div>
          </div>
          <a
            href="https://dashboard.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: STRIPE_COLOR }}
          >
            <ExternalLink size={12} />
            Open Stripe Dashboard
          </a>
        </div>

        {/* Webhook Events */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Webhook Events</h3>
            <span className="text-xs text-gray-400">Endpoint: /api/stripe/webhook</span>
          </div>
          <div className="space-y-2">
            {STRIPE_WEBHOOKS.map(wh => (
              <div key={wh.event} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  {wh.status === 'ok'
                    ? <Wifi size={11} className="text-emerald-500" />
                    : <WifiOff size={11} className="text-yellow-500" />
                  }
                  <span className="font-mono text-gray-600">{wh.event}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{wh.last}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${wh.status === 'ok' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products & Pricing */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Stripe Products &amp; Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Nikah Free',    pid: 'prod_QxFreeNikah001',    price: '$0.00/mo',   interval: 'Monthly', status: 'active', subs: 892 },
            { name: 'Nikah Premium', pid: 'prod_QxPremiumNikah01',  price: '$9.99/mo',   interval: 'Monthly', status: 'active', subs: 249 },
            { name: 'Nikah Family',  pid: 'prod_QxFamilyNikah001',  price: '$24.99/mo',  interval: 'Monthly', status: 'active', subs: 69  },
          ].map(p => (
            <div key={p.pid} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 font-medium">{p.status}</span>
              </div>
              <p className="text-xs font-mono text-gray-400 mb-2">{p.pid}</p>
              <p className="text-xl font-bold text-gray-800">{p.price}</p>
              <p className="text-xs text-gray-400 mt-1">{p.interval} · {p.subs} active subscribers</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: 'overview',   label: 'Overview',   icon: LayoutDashboard,      badge: 0    },
  { id: 'users',      label: 'Users',      icon: Users,                badge: 0    },
  { id: 'reports',    label: 'Reports',    icon: Flag,                 badge: 23   },
  { id: 'safety',     label: 'Safety',     icon: ShieldAlert,          badge: 3    },
  { id: 'analytics',  label: 'Analytics',  icon: BarChart3,            badge: 0    },
  { id: 'payments',   label: 'Payments',   icon: CreditCard,           badge: 12   },
  { id: 'settings',   label: 'Settings',   icon: Settings,             badge: 0    },
]

function Sidebar({ view, setView, collapsed, setCollapsed, onLogout }: {
  view: string
  setView: (v: string) => void
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  onLogout: () => void
}) {
  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-200 flex-shrink-0"
      style={{ width: collapsed ? 64 : 220, background: SIDEBAR_BG }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}>
          <span className="text-white font-bold text-base leading-none">ن</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none">Nikah</p>
            <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV.map(item => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              title={collapsed ? item.label : undefined}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all relative"
              style={{
                color: active ? 'white' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderLeft: active ? `3px solid ${PRIMARY}` : '3px solid transparent',
              }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {item.badge > 0 && (
                <span
                  className="ml-auto text-xs font-bold px-1.5 py-0 rounded-full flex-shrink-0"
                  style={{ background: '#c94a4a', color: 'white', minWidth: 18, textAlign: 'center' }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Admin profile */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
            N
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Noor</p>
              <p className="text-white/40 text-xs truncate">Super Admin</p>
            </div>
          )}
          <button
            onClick={onLogout}
            title="Sign out"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors flex-shrink-0"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ view, onLogout }: { view: string; onLogout: () => void }) {
  const titles: Record<string, string> = {
    overview: 'Overview', users: 'User Management',
    reports: 'Reports & Moderation', safety: 'Safety Center',
    analytics: 'Analytics', settings: 'Settings',
  }
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 gap-4 flex-shrink-0 sticky top-0 z-20">
      <div>
        <h1 className="font-bold text-gray-900">{titles[view]}</h1>
        <p className="text-xs text-gray-400 hidden sm:block">
          Nikah Super Admin · {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search…"
            className="pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 w-44 transition-all focus:w-56"
          />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#c94a4a' }} />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: PRIMARY }}>N</div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold text-gray-800">Noor</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <button onClick={onLogout} title="Sign out" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors ml-1">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [loggedIn, setLoggedIn]       = useState(false)
  const [view, setView]               = useState('overview')
  const [collapsed, setCollapsed]     = useState(false)
  const [credentials, setCredentials] = useState<Credentials>(() => {
    try {
      const saved = localStorage.getItem('nikah_admin_creds')
      if (saved) {
        const parsed = JSON.parse(saved) as Credentials
        if (parsed.username && parsed.password) return parsed
      }
    } catch { /* ignore */ }
    return { username: 'admin', password: 'admin123' }
  })

  // ── Live mutable state for users and reports ──
  const [users,   setUsers]   = useState<UserRecord[]>(MOCK_USERS)
  const [reports, setReports] = useState<ReportRecord[]>(MOCK_REPORTS)

  // ── Toast system ──
  const [toasts, setToasts] = useState<ToastMsg[]>([])
  const showToast = (text: string, kind: ToastMsg['kind'] = 'ok') => {
    const id = Math.floor(Date.now() + Math.random() * 1000)
    setToasts(prev => [...prev, { id, text, kind }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  const updateUser = (id: number, patch: Partial<UserRecord>) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...patch } : u))

  const updateReport = (id: number, patch: Partial<ReportRecord>) =>
    setReports(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))

  // Ban user by their reported username (partial match on name or user tag)
  const banUserByName = (tag: string) => {
    setUsers(prev => prev.map(u => {
      const nameMatch = u.name.toLowerCase().includes(tag.toLowerCase().split('_')[0])
      return nameMatch ? { ...u, status: 'banned' } : u
    }))
  }

  const handleChangeCredentials = (c: Credentials) => {
    setCredentials(c)
    try { localStorage.setItem('nikah_admin_creds', JSON.stringify(c)) } catch { /* ignore */ }
  }

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} credentials={credentials} />
  }

  const viewMap: Record<string, React.ReactNode> = {
    overview:  <OverviewView />,
    users:     <UsersView users={users} onUpdateUser={updateUser} toast={showToast} />,
    reports:   <ReportsView reports={reports} onUpdateReport={updateReport} onBanUserByName={banUserByName} toast={showToast} />,
    safety:    <SafetyView users={users} onUpdateUser={updateUser} toast={showToast} />,
    analytics: <AnalyticsView />,
    payments:  <PaymentsView />,
    settings:  <SettingsView credentials={credentials} onChangeCredentials={handleChangeCredentials} />,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        view={view}
        setView={setView}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={() => setLoggedIn(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar view={view} onLogout={() => setLoggedIn(false)} />
        <main className="flex-1 overflow-y-auto p-5">
          {viewMap[view]}
        </main>
        <footer className="px-5 py-2 border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-400 text-center">
            Nikah Admin Panel · Demo only — no real data · Restricted access
          </p>
        </footer>
      </div>
      <Toast messages={toasts} />
    </div>
  )
}
