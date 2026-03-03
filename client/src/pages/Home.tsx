import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingDown, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Cpu,
  BarChart3,
  TerminalSquare,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import heroDashboard from "@assets/modernes-dashboard_1772541254918.png";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const datenschutzCheckbox = form.querySelector<HTMLButtonElement>("#datenschutz");
    const datenschutzChecked = datenschutzCheckbox?.getAttribute("data-state") === "checked";

    const payload = {
      vorname: formData.get("vorname") as string,
      nachname: formData.get("nachname") as string,
      unternehmen: formData.get("unternehmen") as string,
      email: formData.get("email") as string,
      telefon: formData.get("telefon") as string || "",
      beschreibung: formData.get("beschreibung") as string || "",
      datenschutz: datenschutzChecked,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        setErrorMessage(data.message || "Ein Fehler ist aufgetreten.");
      }
    } catch {
      setFormStatus("error");
      setErrorMessage("Verbindungsfehler. Bitte versuche es später erneut.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-heading font-bold text-xl tracking-tight text-slate-900">
            J. Hummel <span className="text-primary font-medium">Consulting</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-primary transition-colors">Herausforderungen</a>
            <a href="#vorteile" className="hover:text-primary transition-colors">Vorteile</a>
            <a href="#angebot" className="hover:text-primary transition-colors">Angebot</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <Button onClick={scrollToContact} className="font-medium">
            Potentialanalyse buchen
          </Button>
        </div>
      </nav>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-50 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <TerminalSquare className="w-4 h-4 mr-2" />
                Für IT-Consultants & Mittelstand
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Strukturierte Prozesse. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Weniger manueller Aufwand.</span> <br/>
                Volle Datenkontrolle.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Ich unterstütze selbstständige IT-Profis und mittelständische Unternehmen dabei, wiederkehrende Aufgaben konsequent zu automatisieren und KI wirtschaftlich einzusetzen – ohne unnötige Tools, ohne Cloud-Abhängigkeit, ohne Hype.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={scrollToContact} className="h-14 px-8 text-base shadow-lg shadow-primary/20">
                  Jetzt Potentialanalyse buchen
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center text-sm text-slate-500 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  Bis zu 40% weniger Aufwand
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-20"></div>
              <img 
                src={heroDashboard} 
                alt="IT Architektur und Prozess Dashboard" 
                className="relative rounded-2xl shadow-2xl border border-slate-200/50 w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section id="problem" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Viele IT-Betriebe arbeiten hochprofessionell – intern laufen Prozesse oft noch manuell.
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Wer 20 oder 30 Jahre Erfahrung hat, weiß: Struktur schlägt Aktionismus. Doch ohne klare Architektur entsteht Stückwerk. Und Stückwerk skaliert nicht.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Angebote werden individuell erstellt",
                    "Dokumente werden mehrfach abgelegt",
                    "Kundenkommunikation ist nicht standardisiert",
                    "Projektinformationen liegen verteilt",
                    "KI wird punktuell genutzt, aber nicht systematisch"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <div className="min-w-6 mt-1 text-slate-300">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="ml-3 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-8 relative z-10">Das kostet:</h3>
                
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <div className="text-xl font-bold mb-1">Zeit</div>
                    <div className="text-slate-400 text-sm">Fehlende Automatisierung</div>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <BarChart3 className="w-8 h-8 text-primary mb-4" />
                    <div className="text-xl font-bold mb-1">Marge</div>
                    <div className="text-slate-400 text-sm">Ineffiziente Workflows</div>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <Cpu className="w-8 h-8 text-primary mb-4" />
                    <div className="text-xl font-bold mb-1">Fokus</div>
                    <div className="text-slate-400 text-sm">Ständige Ablenkung</div>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                    <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                    <div className="text-xl font-bold mb-1">Vorsprung</div>
                    <div className="text-slate-400 text-sm">Wettbewerbsfähigkeit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VORTEILS SECTION */}
        <section id="vorteile" className="py-24 bg-slate-50 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Drei Kernvorteile</h2>
              <p className="text-lg text-slate-600">
                Alle Maßnahmen zielen auf messbare Ergebnisse ab. Keine Spielereien, sondern handfester wirtschaftlicher Nutzen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingDown className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Bis zu 40 % weniger manueller Aufwand</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    Durch Analyse und Automatisierung wiederkehrender Tätigkeiten: Dokumentenerstellung, E-Mail-Prozesse, Datenerfassung, interne Übergaben.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 text-sm text-green-800 font-medium border border-green-100">
                    Ergebnis: Mehr Zeit für abrechenbare Leistungen.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Layers className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Standardisierte, nachvollziehbare Abläufe</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    Klare Workflows statt individueller Lösungen je Mitarbeiter. Die Prozesse sind transparent dokumentiert und wiederholbar.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 font-medium border border-blue-100">
                    Ergebnis: Vertretbarkeit, Skalierbarkeit und geringere Fehlerquote.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Database className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Datensouveräne KI-Nutzung</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    Einsatz von KI-Tools nur dort, wo es wirtschaftlich sinnvoll ist – Self-Hosted oder EU-konform, transparent und streng DSGVO-konform.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4 text-sm text-purple-800 font-medium border border-purple-100">
                    Ergebnis: Effizienzgewinn ohne Kontrollverlust.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* LÖSUNG & HAUPTANGEBOT */}
        <section id="angebot" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              <div className="lg:col-span-5">
                <div className="sticky top-32">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    Die Lösung ist <span className="underline decoration-red-400 decoration-4 underline-offset-4">kein</span> weiteres Tool.
                  </h2>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Die Lösung ist Architektur. Ich analysiere reale Prozesse, definiere klare Zielzustände und implementiere strukturiert die passenden Technologien.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-lg font-medium text-slate-800">
                      <CheckCircle2 className="text-primary w-6 h-6" />
                      Fokus auf vorhandene Systeme
                    </div>
                    <div className="flex items-center gap-3 text-lg font-medium text-slate-800">
                      <CheckCircle2 className="text-primary w-6 h-6" />
                      Keine unnötige Migration
                    </div>
                    <div className="flex items-center gap-3 text-lg font-medium text-slate-800">
                      <CheckCircle2 className="text-primary w-6 h-6" />
                      Architektur statt Schnellschuss
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                  <div className="bg-slate-900 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">KI- und Automatisierungsberatung</h3>
                    <p className="text-slate-400">Leistungsbestandteile im Detail</p>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {[
                        { title: "1. Strukturierte Prozessanalyse", desc: "Identifikation wiederkehrender Tätigkeiten und Engpässe." },
                        { title: "2. Automatisierungskonzept", desc: "Klare Definition des Zielzustands und der Workflows." },
                        { title: "3. Tool-Auswahl", desc: "Bewertung von Self-Hosted oder EU-konformen Lösungen." },
                        { title: "4. Implementierung", desc: "Sauberer Aufbau und Integration in bestehende Systeme." },
                        { title: "5. Dokumentation & Einweisung", desc: "Übergabe, die von jedem Mitarbeiter verstanden wird." }
                      ].map((step, idx) => (
                        <div key={idx} className="p-6 md:p-8 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                            <p className="text-slate-600">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* SO ARBEITEN WIR ZUSAMMEN */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-zusammenarbeit-title">So arbeiten wir zusammen</h2>
              <p className="text-lg text-slate-400">Vom Erstgespräch bis zur laufenden Lösung – in drei klaren Schritten.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Analyse & Verstehen",
                  desc: "Im kostenlosen Erstgespräch erfasse ich deine aktuelle Situation: Welche Prozesse laufen manuell? Wo geht Zeit verloren? Was sind deine Ziele? Daraus entsteht eine klare Übersicht deiner Effizienzpotenziale.",
                  icon: "search",
                },
                {
                  step: "02",
                  title: "Konzept & Architektur",
                  desc: "Auf Basis der Analyse entwickle ich ein konkretes Automatisierungskonzept – inklusive Tool-Auswahl (Self-Hosted oder EU-konform), Zielarchitektur und realistischem Umsetzungsplan. Keine Theorie, sondern ein Fahrplan.",
                  icon: "blueprint",
                },
                {
                  step: "03",
                  title: "Umsetzung & Übergabe",
                  desc: "Die Implementierung erfolgt schrittweise in deinen bestehenden Systemen. Jeder Schritt wird dokumentiert und du erhältst eine Einweisung. Am Ende stehen messbar bessere Abläufe – keine Abhängigkeit von mir.",
                  icon: "rocket",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 flex flex-col"
                  data-testid={`card-step-${item.step}`}
                >
                  <div className="text-5xl font-bold text-primary/20 mb-4 font-heading">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Häufige Fragen</h2>
              <p className="text-lg text-slate-600">Klarheit von Anfang an.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-medium">Brauche ich Vorwissen im Bereich KI?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Nein. Ein technisches Grundverständnis reicht völlig aus. Die Umsetzung und Integration erfolgt strukturiert und verständlich durch mich.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-medium">Funktioniert das für meinen Betrieb?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Wenn bei Ihnen wiederkehrende Prozesse existieren (z.B. in der Angebotserstellung, Dokumentation oder Kundenkommunikation), gibt es definitiv handfestes Automatisierungspotenzial.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-medium">Wie hoch ist der Aufwand für mein Team?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Die Einführung erfolgt schrittweise in verträglichen Iterationen. Es gibt keinen riskanten Big-Bang. Ihr Tagesgeschäft läuft ungestört weiter.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-medium">Ist das datenschutzkonform?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Ja, absolut. Eine DSGVO-konforme Architektur (z.B. durch Self-Hosting oder EU-Server) ist fester Bestandteil meines Konzepts. Datensouveränität steht an oberster Stelle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-medium">Wie schnell sehe ich Ergebnisse?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  Durch die fokussierte Analyse der größten Zeitfresser stellen sich die ersten messbaren Effekte meist schon innerhalb weniger Wochen ein.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA & FORM */}
        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden grid lg:grid-cols-5">
              
              <div className="lg:col-span-2 bg-slate-900 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900 opacity-80"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Jetzt Potentialanalyse buchen
                  </h2>
                  <p className="text-slate-300 text-lg mb-8">
                    Weniger manueller Aufwand.<br/>
                    Klare Prozesse.<br/>
                    Datensouveräne KI.
                  </p>
                  <p className="text-slate-400">
                    Jetzt ist der richtige Zeitpunkt, Strukturen zu schaffen, die auf Dauer tragen. Unverbindlich. Klar strukturiert. Ohne Risiko.
                  </p>
                </div>
                
                <div className="relative z-10 mt-12 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div className="text-sm font-medium">Kostenloses Erstgespräch</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div className="text-sm font-medium">Analyse & Potenzial</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div className="text-sm font-medium">Handlungsempfehlung</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-12">
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-4" data-testid="status-success">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Anfrage erfolgreich gesendet</h3>
                    <p className="text-slate-600 max-w-md">
                      Vielen Dank für dein Interesse. Ich melde mich zeitnah bei dir, um einen Termin für die Potentialanalyse zu vereinbaren.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setFormStatus("idle")} data-testid="button-new-request">
                      Neue Anfrage stellen
                    </Button>
                  </div>
                ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vorname">Vorname</Label>
                      <Input id="vorname" name="vorname" placeholder="Max" className="bg-slate-50 h-12" required data-testid="input-vorname" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nachname">Nachname</Label>
                      <Input id="nachname" name="nachname" placeholder="Mustermann" className="bg-slate-50 h-12" required data-testid="input-nachname" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unternehmen">Unternehmen</Label>
                    <Input id="unternehmen" name="unternehmen" placeholder="IT Consulting GmbH" className="bg-slate-50 h-12" required data-testid="input-unternehmen" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" name="email" type="email" placeholder="max@unternehmen.de" className="bg-slate-50 h-12" required data-testid="input-email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefon">Telefonnummer</Label>
                      <Input id="telefon" name="telefon" type="tel" placeholder="+49 123 456789" className="bg-slate-50 h-12" data-testid="input-telefon" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beschreibung">Kurze Beschreibung der aktuellen Herausforderung</Label>
                    <Textarea 
                      id="beschreibung" 
                      name="beschreibung"
                      placeholder="Wo verlieren Sie aktuell am meisten Zeit?" 
                      className="bg-slate-50 min-h-[120px] resize-none"
                      data-testid="input-beschreibung"
                    />
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="datenschutz" required className="mt-1" data-testid="checkbox-datenschutz" />
                    <label
                      htmlFor="datenschutz"
                      className="text-sm text-slate-600 leading-relaxed font-medium cursor-pointer"
                    >
                      Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zur Bearbeitung meiner Anfrage zu.
                    </label>
                  </div>

                  {formStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm" data-testid="status-error">
                      {errorMessage}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full h-14 text-lg mt-4" disabled={formStatus === "loading"} data-testid="button-submit">
                    {formStatus === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wird gesendet…
                      </span>
                    ) : (
                      "Potentialanalyse anfragen"
                    )}
                  </Button>
                </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          
          <div>
            <div className="font-heading font-bold text-xl tracking-tight text-white mb-6">
              J. Hummel <span className="text-primary font-medium">Consulting</span>
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              KI- und Automatisierungsberatung für IT-nahe Unternehmen. Strukturierte Prozesse, weniger manueller Aufwand, volle Datenkontrolle.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Impressum</h4>
            <div className="text-sm space-y-2 leading-relaxed">
              <p>Verantwortlicher im Sinne des § 18 Abs. 2 MStV:</p>
              <p className="text-white font-medium">Joachim Hummel</p>
              <p>Lisbergstrasse 12<br/>81249 München<br/>Deutschland</p>
              <p className="mt-4 pt-4 border-t border-slate-800">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br/>
                <span className="text-white">DE185721123</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Datenschutz & Hosting</h4>
            <div className="text-sm space-y-4 leading-relaxed">
              <p>
                Die Website wird bei einem Hosting-Anbieter innerhalb der EU betrieben. 
                Es werden nur technisch notwendige Cookies verwendet. Keine Tracking- oder Analyse-Tools ohne Einwilligung.
              </p>
              <p>
                SSL-Verschlüsselung und technische Schutzmaßnahmen sind implementiert. Daten werden nur so lange gespeichert, wie es für die Bearbeitung erforderlich ist.
              </p>
              <p className="text-xs text-slate-500 mt-6">
                © {new Date().getFullYear()} Joachim Hummel. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
