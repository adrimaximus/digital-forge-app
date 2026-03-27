import {
  Headphones, MessageCircle, Users, ShoppingCart, Mail,
  LayoutDashboard, Calendar, Bell, Database, Code2, Cloud, Table,
} from 'lucide-react';
import type { ElementType } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceDef {
  label: string;
  desc: string;
  icon: ElementType;
  color: string;
  bg: string;
}

export interface ToolDef {
  label: string;
  icon: ElementType;
  color: string;
  bg: string;
}

export interface Recommendation {
  tools: string[];
  primaryFocus: string[];
  supportFocus: string[];
  expectedOutputs: string[];
  summary: string;
}

// ─── Catalogs ─────────────────────────────────────────────────────────────────

export const SERVICE_CATALOG: Record<string, ServiceDef> = {
  'customer-service':    { label: 'Customer Service',    desc: '24/7 inbound chat & FAQ handling',        icon: Headphones,      color: 'text-blue-600',   bg: 'bg-blue-100' },
  'whatsapp-automation': { label: 'WhatsApp Automation', desc: 'Blast, reply & reminder flows',           icon: MessageCircle,   color: 'text-green-600',  bg: 'bg-green-100' },
  'lead-qualification':  { label: 'Lead Qualification',  desc: 'Auto-screen incoming prospects',          icon: Users,           color: 'text-purple-600', bg: 'bg-purple-100' },
  'order-handling':      { label: 'Order Handling',      desc: 'Track and process requests automatically', icon: ShoppingCart,   color: 'text-pink-600',   bg: 'bg-pink-100' },
  'email-followup':      { label: 'Email Follow-up',     desc: 'Auto nurture sequences & reminders',      icon: Mail,            color: 'text-red-500',    bg: 'bg-red-100' },
  'dashboard-reporting': { label: 'Dashboard Reporting', desc: 'Live summaries & performance views',      icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  'calendar-scheduling': { label: 'Calendar Scheduling', desc: 'Booking & task cadence automation',       icon: Calendar,        color: 'text-sky-600',    bg: 'bg-sky-100' },
  'auto-reminder':       { label: 'Auto Reminder',       desc: 'Context-aware scheduled reminders',       icon: Bell,            color: 'text-orange-500', bg: 'bg-orange-100' },
  'data-entry':          { label: 'Data Entry',          desc: 'Auto-capture from comm channels',         icon: Database,        color: 'text-cyan-600',   bg: 'bg-cyan-100' },
};

export const TOOL_CATALOG: Record<string, ToolDef> = {
  WhatsApp:          { label: 'WhatsApp',  icon: MessageCircle, color: 'text-green-600',  bg: 'bg-green-100' },
  Gmail:             { label: 'Gmail',     icon: Mail,          color: 'text-red-500',    bg: 'bg-red-100' },
  CRM:               { label: 'CRM',       icon: Users,         color: 'text-indigo-600', bg: 'bg-indigo-100' },
  'Google Sheets':   { label: 'Sheets',    icon: Table,         color: 'text-green-600',  bg: 'bg-green-100' },
  'Google Calendar': { label: 'Calendar',  icon: Calendar,      color: 'text-blue-500',   bg: 'bg-blue-100' },
  APIs:              { label: 'APIs',       icon: Code2,         color: 'text-purple-600', bg: 'bg-purple-100' },
  'Google Drive':    { label: 'Drive',      icon: Cloud,         color: 'text-yellow-600', bg: 'bg-yellow-100' },
};

// ─── Business types ───────────────────────────────────────────────────────────

export const BUSINESS_TYPES = [
  'E-Commerce / Online Shop',
  'F&B / Restaurant / Cafe',
  'Property / Real Estate',
  'Retail / Toko Fisik',
  'Jasa Konsultasi / Consulting',
  'Healthcare / Klinik / Apotek',
  'Education / Kursus / Training Center',
  'Travel & Hospitality',
  'Logistics / Ekspedisi / Kurir',
  'Finance / Fintech / Asuransi',
  'Manufacturing / Produksi',
  'Marketing & Creative Agency',
  'Legal / Law Firm',
  'Construction / Kontraktor / Developer',
  'Beauty / Salon / Spa / Kecantikan',
  'Fitness / Gym / Health & Wellness',
  'Media / Content Creator / Publisher',
  'Technology / SaaS / Startup',
  'Events & Wedding Organizer',
  'Recruitment / HR Services',
  'Import / Export / Trading',
  'Automotive / Bengkel / Dealer',
  'Agriculture / Pertanian / Agribusiness',
  'Non-profit / Yayasan / Organisasi',
  'Other / Lainnya',
];

export const PAIN_EXAMPLES = [
  'Customer follow-ups are frequently missed and inconsistent',
  'Too many incoming WhatsApp messages go unresponded in time',
  'Data is scattered across platforms and hard to consolidate accurately',
  'Order processing is manual, slow, and prone to human error',
  'Difficult to monitor team performance and progress in real-time',
  'Schedules and appointments often clash or go unreminded',
  'Leads from multiple platforms are not followed up automatically',
  'Email campaigns and broadcasts are sent one-by-one manually',
];

// ─── Recommendation engine ────────────────────────────────────────────────────

type BizConfig = { tools: string[]; primary: string[]; support: string[] };

const BIZ_MAP: Record<string, BizConfig> = {
  'E-Commerce / Online Shop':               { tools: ['WhatsApp','CRM','Google Sheets','Gmail'],                primary: ['order-handling','customer-service'],     support: ['email-followup','dashboard-reporting'] },
  'F&B / Restaurant / Cafe':                { tools: ['WhatsApp','Google Calendar','CRM'],                     primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','calendar-scheduling'] },
  'Property / Real Estate':                 { tools: ['WhatsApp','CRM','Gmail','Google Calendar'],              primary: ['lead-qualification','whatsapp-automation'], support: ['email-followup','calendar-scheduling'] },
  'Retail / Toko Fisik':                    { tools: ['WhatsApp','Google Sheets','CRM'],                       primary: ['order-handling','customer-service'],     support: ['dashboard-reporting','data-entry'] },
  'Jasa Konsultasi / Consulting':           { tools: ['Gmail','Google Calendar','CRM','Google Sheets'],         primary: ['lead-qualification','customer-service'],  support: ['calendar-scheduling','email-followup'] },
  'Healthcare / Klinik / Apotek':           { tools: ['WhatsApp','Google Calendar','CRM'],                     primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','calendar-scheduling'] },
  'Education / Kursus / Training Center':   { tools: ['WhatsApp','Gmail','Google Calendar','Google Sheets'],   primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','email-followup'] },
  'Travel & Hospitality':                   { tools: ['WhatsApp','Google Calendar','Gmail','CRM'],              primary: ['customer-service','whatsapp-automation'],  support: ['calendar-scheduling','email-followup'] },
  'Logistics / Ekspedisi / Kurir':          { tools: ['WhatsApp','Google Sheets','APIs','CRM'],                primary: ['customer-service','order-handling'],     support: ['dashboard-reporting','data-entry'] },
  'Finance / Fintech / Asuransi':           { tools: ['Gmail','CRM','Google Sheets','APIs'],                  primary: ['lead-qualification','customer-service'],  support: ['email-followup','dashboard-reporting'] },
  'Manufacturing / Produksi':               { tools: ['Google Sheets','APIs','Gmail','CRM'],                  primary: ['order-handling','customer-service'],     support: ['dashboard-reporting','data-entry'] },
  'Marketing & Creative Agency':            { tools: ['Gmail','CRM','Google Sheets','APIs'],                  primary: ['lead-qualification','customer-service'],  support: ['email-followup','dashboard-reporting'] },
  'Legal / Law Firm':                       { tools: ['Gmail','Google Calendar','CRM'],                       primary: ['lead-qualification','customer-service'],  support: ['calendar-scheduling','email-followup'] },
  'Construction / Kontraktor / Developer':  { tools: ['WhatsApp','Google Sheets','CRM','Gmail'],              primary: ['lead-qualification','customer-service'],  support: ['dashboard-reporting','email-followup'] },
  'Beauty / Salon / Spa / Kecantikan':      { tools: ['WhatsApp','Google Calendar','CRM'],                    primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','calendar-scheduling'] },
  'Fitness / Gym / Health & Wellness':      { tools: ['WhatsApp','Google Calendar','CRM','Gmail'],             primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','calendar-scheduling'] },
  'Media / Content Creator / Publisher':    { tools: ['Gmail','Google Sheets','APIs','CRM'],                  primary: ['customer-service','lead-qualification'],  support: ['email-followup','dashboard-reporting'] },
  'Technology / SaaS / Startup':            { tools: ['APIs','Gmail','CRM','Google Sheets'],                  primary: ['customer-service','lead-qualification'],  support: ['email-followup','dashboard-reporting'] },
  'Events & Wedding Organizer':             { tools: ['WhatsApp','Google Calendar','Gmail','CRM'],              primary: ['customer-service','whatsapp-automation'],  support: ['calendar-scheduling','email-followup'] },
  'Recruitment / HR Services':              { tools: ['Gmail','CRM','Google Sheets','Google Calendar'],         primary: ['lead-qualification','customer-service'],  support: ['email-followup','calendar-scheduling'] },
  'Import / Export / Trading':              { tools: ['WhatsApp','Google Sheets','Gmail','APIs'],               primary: ['customer-service','order-handling'],     support: ['dashboard-reporting','data-entry'] },
  'Automotive / Bengkel / Dealer':          { tools: ['WhatsApp','CRM','Google Calendar'],                    primary: ['customer-service','whatsapp-automation'],  support: ['auto-reminder','dashboard-reporting'] },
  'Agriculture / Pertanian / Agribusiness': { tools: ['WhatsApp','Google Sheets','CRM'],                      primary: ['order-handling','customer-service'],     support: ['dashboard-reporting','data-entry'] },
  'Non-profit / Yayasan / Organisasi':      { tools: ['Gmail','Google Sheets','WhatsApp','CRM'],              primary: ['customer-service','whatsapp-automation'],  support: ['email-followup','dashboard-reporting'] },
};

const PAIN_MAPPINGS = [
  { keywords: ['follow up','follow-up','lupa','telat','lambat','tidak balas'], boostPrimary: ['whatsapp-automation'], boostSupport: ['auto-reminder','email-followup'], boostTools: ['WhatsApp'] },
  { keywords: ['customer','pelanggan','klien','complaint','komplain','layanan'],  boostPrimary: ['customer-service'],    boostSupport: ['email-followup'],                 boostTools: ['CRM','WhatsApp'] },
  { keywords: ['data','laporan','report','rekap','spreadsheet','excel'],         boostPrimary: [],                      boostSupport: ['dashboard-reporting','data-entry'], boostTools: ['Google Sheets'] },
  { keywords: ['order','pesanan','transaksi','invoice','payment'],               boostPrimary: ['order-handling'],      boostSupport: ['dashboard-reporting'],             boostTools: ['Google Sheets','CRM'] },
  { keywords: ['lead','prospect','sales','closing','konversi','penjualan'],      boostPrimary: ['lead-qualification'],  boostSupport: ['email-followup'],                 boostTools: ['CRM','Gmail'] },
  { keywords: ['jadwal','schedule','booking','appointment','kalender'],          boostPrimary: [],                      boostSupport: ['calendar-scheduling','auto-reminder'], boostTools: ['Google Calendar'] },
  { keywords: ['email','broadcast','blast','notifikasi'],                        boostPrimary: ['whatsapp-automation'], boostSupport: ['email-followup'],                 boostTools: ['Gmail','WhatsApp'] },
  { keywords: ['manual','repetitif','berulang','overwhelm','sibuk','kelelahan'], boostPrimary: ['customer-service'],    boostSupport: ['data-entry','auto-reminder'],      boostTools: [] },
  { keywords: ['api','integrasi','connect','sistem'],                            boostPrimary: [],                      boostSupport: ['dashboard-reporting'],             boostTools: ['APIs'] },
];

const OUTPUT_MAP: Record<string, string> = {
  'customer-service':    'AI agent handles all inbound support & FAQs 24/7 — zero missed conversations',
  'whatsapp-automation': 'Automated replies, reminders, and blasts via WhatsApp at scale',
  'lead-qualification':  'Prospects screened and qualified automatically before reaching your team',
  'order-handling':      'Orders tracked, confirmed, and updated in real-time without manual input',
  'email-followup':      'Consistent nurture sequences running automatically after every interaction',
  'dashboard-reporting': 'Live summaries and operational reports generated from your data streams',
  'calendar-scheduling': 'Appointments booked, confirmed, and reminded — no back-and-forth needed',
  'auto-reminder':       'Zero missed follow-ups with context-aware, scheduled reminders',
  'data-entry':          'Data captured and structured automatically from your communication channels',
};

function dedupe<T>(arr: T[], limit: number): T[] {
  return [...new Set(arr)].slice(0, limit);
}

export function buildRecommendation(params: {
  businessType: string;
  businessName: string;
  planInterest: string;
  businessPains: string;
}): Recommendation {
  const { businessType, businessName, planInterest, businessPains } = params;
  const base: BizConfig = BIZ_MAP[businessType] ?? {
    tools: ['WhatsApp','CRM','Gmail','Google Sheets'],
    primary: ['customer-service','whatsapp-automation'],
    support: ['email-followup','dashboard-reporting'],
  };

  let tools   = [...base.tools];
  let primary = [...base.primary];
  let support = [...base.support];

  const painLower = businessPains.toLowerCase();
  for (const m of PAIN_MAPPINGS) {
    if (m.keywords.some((kw) => painLower.includes(kw))) {
      primary = [...m.boostPrimary, ...primary];
      support = [...m.boostSupport, ...support];
      tools   = [...m.boostTools,   ...tools];
    }
  }

  const finalPrimary = dedupe(primary, 2);
  const finalSupport = dedupe(support, 2);
  const finalTools   = dedupe(tools,   4);
  const expectedOutputs = dedupe([...finalPrimary, ...finalSupport], 4)
    .map((f) => OUTPUT_MAP[f]).filter(Boolean).slice(0, 3);

  const entity     = businessName.trim() ? businessName.trim() : `your ${businessType} business`;
  const planText   = planInterest === 'Enterprise' ? 'an enterprise-scale' : planInterest === 'Professional' ? 'a growing-team' : 'a lean starter';
  const primLabels = finalPrimary.map((id) => SERVICE_CATALOG[id]?.label ?? id).join(' and ');
  const toolsList  = finalTools.join(', ');
  const summary    = `For ${entity}, we recommend configuring EliteVA as ${planText} AI operator centered on ${primLabels}. The agent will integrate with ${toolsList}, automating the operational friction points you described. With this setup, your team can handle more volume, respond faster, and keep workflows running — without adding headcount.`;

  return { tools: finalTools, primaryFocus: finalPrimary, supportFocus: finalSupport, expectedOutputs, summary };
}
