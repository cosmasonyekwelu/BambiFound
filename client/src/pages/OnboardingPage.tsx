import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [step, setStep] = useState<number>(user?.onboardingStep || 1);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSkipModal, setShowSkipModal] = useState<boolean>(false);

  // Form Data across the 4 steps
  const [selectedIntents, setSelectedIntents] = useState<string[]>(
    user?.onboardingData?.intents || ['building-venture', 'looking-cofounder']
  );

  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    user?.onboardingData?.skills || [
      'Software Engineering',
      'Distributed Systems',
      'AI & LLM Architecture',
      'Product Strategy',
      'UI/UX Craft',
      'Founder Operations',
    ]
  );
  const [leverageFocus, setLeverageFocus] = useState<string>(
    user?.onboardingData?.leverageFocus || 'catalyst'
  );
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [customSkillInput, setCustomSkillInput] = useState<string>('');

  const [experienceTiers, setExperienceTiers] = useState<string[]>(
    user?.onboardingData?.experienceTiers || ['seasoned-operator', 'prior-founder']
  );
  const [concreteIntents, setConcreteIntents] = useState<string[]>(
    user?.onboardingData?.concreteIntents || [
      'Technical Co-founder with Rust/AI expertise',
      'Early-Stage Equity Stake',
    ]
  );
  const [founderPitch, setFounderPitch] = useState<string>(
    user?.onboardingData?.founderPitch ||
      'Building at the intersection of climate telemetry and autonomous systems. Looking for an engineer who cares deeply about offline-first resilience.'
  );
  const [workCadence, setWorkCadence] = useState<string>(
    user?.onboardingData?.workCadence || 'Remote First'
  );
  const [preferredHubs, setPreferredHubs] = useState<string[]>(
    user?.onboardingData?.preferredHubs || ['San Francisco / US Pacific (UTC-8)', 'Global Async']
  );

  // Fetch initial onboarding state from server on mount
  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const res = await api.get('/v1/onboarding');
        const data = res.data;
        if (data.onboardingStep) setStep(data.onboardingStep);
        if (data.onboardingData) {
          const d = data.onboardingData;
          if (d.intents) setSelectedIntents(d.intents);
          if (d.skills) setSelectedSkills(d.skills);
          if (d.leverageFocus) setLeverageFocus(d.leverageFocus);
          if (d.experienceTiers) setExperienceTiers(d.experienceTiers);
          if (d.concreteIntents) setConcreteIntents(d.concreteIntents);
          if (d.founderPitch !== undefined) setFounderPitch(d.founderPitch);
          if (d.workCadence) setWorkCadence(d.workCadence);
          if (d.preferredHubs) setPreferredHubs(d.preferredHubs);
        }
      } catch {
        // Fallback to auth context
      }
    };
    fetchOnboarding();
  }, []);

  const savePartial = async (nextStep: number, extraData: Record<string, any> = {}) => {
    setIsSaving(true);
    const updatedData = {
      intents: selectedIntents,
      skills: selectedSkills,
      leverageFocus,
      experienceTiers,
      concreteIntents,
      founderPitch,
      workCadence,
      preferredHubs,
      ...extraData,
    };
    try {
      const res = await api.patch('/v1/onboarding', {
        onboardingStep: nextStep,
        onboardingData: updatedData,
      });
      updateUser(res.data);
    } catch {
      // Continue locally even if network fails
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStep = async () => {
    if (step < 4) {
      const next = step + 1;
      await savePartial(next);
      setStep(next);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = async () => {
    setIsSaving(true);
    try {
      const res = await api.post('/v1/onboarding/skip');
      updateUser(res.data);
    } catch {
      updateUser({ onboardingSkipped: true });
    } finally {
      setIsSaving(false);
      navigate('/dashboard');
    }
  };

  const handleComplete = async () => {
    setIsSaving(true);
    const finalData = {
      intents: selectedIntents,
      skills: selectedSkills,
      leverageFocus,
      experienceTiers,
      concreteIntents,
      founderPitch,
      workCadence,
      preferredHubs,
    };
    try {
      const res = await api.post('/v1/onboarding/complete', { onboardingData: finalData });
      updateUser(res.data);
    } catch {
      updateUser({ onboardingCompleted: true });
    } finally {
      setIsSaving(false);
      navigate('/dashboard');
    }
  };

  // Helper toggles
  const toggleIntent = (id: string) => {
    setSelectedIntents((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleExperienceTier = (tier: string) => {
    setExperienceTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const toggleConcreteIntent = (pill: string) => {
    setConcreteIntents((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  };

  const addCustomSkill = () => {
    const val = customSkillInput.trim();
    if (val && !selectedSkills.includes(val)) {
      setSelectedSkills((prev) => [...prev, val]);
      setCustomSkillInput('');
    }
  };

  const isSkillVisible = (name: string) => {
    if (!skillSearch.trim()) return true;
    return name.toLowerCase().includes(skillSearch.toLowerCase());
  };

  const progressPercentage = Math.round((step / 4) * 100);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="w-full pt-20 bg-surface flex-grow flex flex-col justify-center">
        <div className="w-full max-w-4xl mx-auto px-gutter py-space-xl">
          <div className="flex flex-col w-full">

            {/* PROGRESS & NAVIGATION HEADER */}
            <div className="w-full mb-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="px-space-md py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm tracking-widest uppercase">
                    Step 0{step} of 04
                  </span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {step === 1 && 'Multi-Intent Discovery'}
                    {step === 2 && 'Capability Graph'}
                    {step === 3 && 'Background & Desired Alignment'}
                    {step === 4 && 'Intelligent Synergy Profile'}
                  </span>
                </div>

                <div className="flex items-center gap-space-md">
                  <span className="font-label-md text-label-md text-secondary">
                    {progressPercentage}% completed
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSkipModal(true)}
                    className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4"
                  >
                    Skip for now
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* STEP 1: INTENT DISCOVERY */}
            {step === 1 && (
              <div className="space-y-space-xl">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                    Builder Manifesto
                  </span>
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    What brings you to BambiFound?
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
                    Choose all that reflect your current focus. Real builders wear multiple hats—select as many as apply to mirror your fluid journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {[
                    {
                      id: 'building-venture',
                      icon: 'rocket_launch',
                      title: 'I’m building a venture or project',
                      desc: 'Leading or co-founding an early-stage venture, looking for core partners or first hires.',
                      tags: 'Founder Mode • Lead Architect',
                    },
                    {
                      id: 'looking-cofounder',
                      icon: 'handshake',
                      title: 'I’m looking for a co-founder',
                      desc: 'Seeking a technical, product, or go-to-market partner with high conviction to build together.',
                      tags: 'Equity Partner • Shared Vision',
                    },
                    {
                      id: 'looking-talent',
                      icon: 'group_add',
                      title: 'I’m looking for talent & collaborators',
                      desc: 'Need experienced engineers, designers, or operators for specific project sprints or advisory.',
                      tags: 'Specialist Sprints • Advisory',
                    },
                    {
                      id: 'join-startup',
                      icon: 'explore',
                      title: 'I’m looking for a startup to join',
                      desc: 'Want to jump into an early-stage team with meaningful equity and direct operational impact.',
                      tags: 'Founding Hire • High Equity',
                    },
                    {
                      id: 'side-projects',
                      icon: 'hub',
                      title: 'I want to collaborate on side projects',
                      desc: 'Exploring innovative ideas with other high-energy builders on weekends or fractional tempo.',
                      tags: 'Fractional • Exploratory Labs',
                    },
                    {
                      id: 'early-roles',
                      icon: 'school',
                      title: 'I\'m exploring internships & early roles',
                      desc: 'Looking for practical startup mentorship, apprenticeships, and high learning velocity.',
                      tags: 'Apprenticeship • Mentorship',
                    },
                  ].map((card) => {
                    const isSelected = selectedIntents.includes(card.id);
                    return (
                      <div
                        key={card.id}
                        onClick={() => toggleIntent(card.id)}
                        className={`group relative p-space-lg rounded-xl cursor-pointer transition-all duration-200 select-none transform hover:-translate-y-0.5 ${
                          isSelected
                            ? 'bg-primary-container text-on-primary shadow-md'
                            : 'bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-space-md">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-surface-container-lowest/15 text-secondary-fixed' : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isSelected ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container-highest text-surface-container-lowest'
                            }`}
                          >
                            <span className={`material-symbols-outlined text-[16px] ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                              check
                            </span>
                          </div>
                        </div>
                        <div className="mt-space-md">
                          <h3 className={`font-headline-sm text-headline-sm ${isSelected ? 'text-surface-container-lowest' : 'text-primary'}`}>
                            {card.title}
                          </h3>
                          <p className={`font-body-md text-body-md mt-space-xs leading-relaxed ${isSelected ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                            {card.desc}
                          </p>
                        </div>
                        <div className={`mt-space-md pt-space-xs flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider ${isSelected ? 'text-secondary-fixed-dim' : 'text-on-surface-variant opacity-70'}`}>
                          <span>{card.tags}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-space-md pt-space-md bg-surface">
                  <div className="flex items-center gap-space-md w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      type="button"
                      onClick={() => setShowSkipModal(true)}
                      className="px-space-md py-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Skip for now
                    </button>
                    <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                      <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      <span className="font-semibold text-primary">
                        {selectedIntents.length} {selectedIntents.length === 1 ? 'intent' : 'intents'} selected
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={selectedIntents.length === 0 || isSaving}
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-space-xl py-space-md rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-all duration-200 shadow-md flex items-center justify-center gap-space-sm disabled:opacity-50"
                  >
                    <span>Continue to Skills & Strengths</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CAPABILITY GRAPH */}
            {step === 2 && (
              <div className="space-y-space-lg">
                {/* Hero Header */}
                <div className="relative bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-sm overflow-hidden">
                  <div className="relative z-10 max-w-2xl">
                    <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-space-xs">
                      What are your core builder strengths?
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">
                      Highlight the craft areas where you create the most leverage. Search or pick from key vectors to calibrate our co-founder alignment engine.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-md relative">
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">
                        search
                      </span>
                      <input
                        type="text"
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                        placeholder="Search skills (e.g. Distributed Systems, Product Strategy, Brand Design...)"
                        className="w-full pl-12 pr-space-md py-space-sm bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                  {/* Left Column: Skill Groups */}
                  <div className="lg:col-span-8 flex flex-col gap-space-lg">
                    {/* Engineering */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                      <div className="flex items-center justify-between pb-space-sm mb-space-md">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-[20px]">terminal</span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">Engineering & Architecture</h2>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-space-sm">
                        {[
                          'Software Engineering',
                          'Distributed Systems',
                          'AI & LLM Architecture',
                          'Fullstack',
                          'Mobile (iOS/Android)',
                          'DevOps / Cloud Infra',
                        ].map((skill) => {
                          if (!isSkillVisible(skill)) return null;
                          const isSel = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`group inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
                                isSel
                                  ? 'bg-primary-container text-on-primary shadow-sm'
                                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                              }`}
                            >
                              <span>{skill}</span>
                              <span className="material-symbols-outlined text-[16px]">
                                {isSel ? 'check' : 'add'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Product & Design */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                      <div className="flex items-center justify-between pb-space-sm mb-space-md">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-[20px]">draw</span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">Product & Design</h2>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-space-sm">
                        {[
                          'Product Strategy',
                          'System Architecture',
                          'UI/UX Craft',
                          'Interaction Design',
                          'User Research & Synthesis',
                        ].map((skill) => {
                          if (!isSkillVisible(skill)) return null;
                          const isSel = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`group inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
                                isSel
                                  ? 'bg-primary-container text-on-primary shadow-sm'
                                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                              }`}
                            >
                              <span>{skill}</span>
                              <span className="material-symbols-outlined text-[16px]">
                                {isSel ? 'check' : 'add'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Growth & Operations */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                      <div className="flex items-center justify-between pb-space-sm mb-space-md">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-[20px]">rocket_launch</span>
                          <h2 className="font-headline-sm text-headline-sm text-primary">Growth & Operations</h2>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-space-sm">
                        {[
                          'Founder Operations',
                          'Go-To-Market (GTM)',
                          'Technical Sales',
                          'Community & DevRel',
                          'Venture Finance',
                        ].map((skill) => {
                          if (!isSkillVisible(skill)) return null;
                          const isSel = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkill(skill)}
                              className={`group inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all ${
                                isSel
                                  ? 'bg-primary-container text-on-primary shadow-sm'
                                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                              }`}
                            >
                              <span>{skill}</span>
                              <span className="material-symbols-outlined text-[16px]">
                                {isSel ? 'check' : 'add'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Custom Skill Input */}
                    <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm shadow-sm">
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md shrink-0">
                        <span className="material-symbols-outlined text-[18px] text-secondary">add_circle</span>
                        <span>Missing a vector?</span>
                      </div>
                      <div className="flex-grow flex items-center bg-surface-container-lowest rounded-full px-space-md py-1.5 shadow-sm">
                        <input
                          type="text"
                          value={customSkillInput}
                          onChange={(e) => setCustomSkillInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                          placeholder="Add custom capability (press Enter)..."
                          className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addCustomSkill}
                          className="text-secondary hover:text-primary transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">subdirectory_arrow_left</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Leverage Focus */}
                  <aside className="lg:col-span-4 flex flex-col gap-space-lg">
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Leverage Vector
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs">
                        Primary Leverage Focus
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                        How do you apply your energy in early stage phases?
                      </p>

                      <div className="flex flex-col gap-space-xs">
                        {[
                          { id: 'specialist', title: 'Specialist', desc: 'Deep technical craftsmanship and domain authority' },
                          { id: 'generalist', title: 'Generalist Operator', desc: 'End-to-end multi-disciplinary builder across stacks' },
                          { id: 'catalyst', title: '0-to-1 Catalyst', desc: 'Rapid prototyping, ideation speed, and customer zero pull' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            onClick={() => setLeverageFocus(item.id)}
                            className={`relative flex items-start gap-space-sm p-space-sm rounded-lg cursor-pointer transition-all ${
                              leverageFocus === item.id
                                ? 'bg-primary-container text-on-primary shadow-sm'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                            }`}
                          >
                            <input
                              type="radio"
                              name="leverage_focus"
                              checked={leverageFocus === item.id}
                              onChange={() => setLeverageFocus(item.id)}
                              className="mt-1 accent-primary-container"
                            />
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md font-semibold">{item.title}</span>
                              <span className={`font-body-sm text-body-sm ${leverageFocus === item.id ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                                {item.desc}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-space-xl p-space-md bg-surface-container-lowest rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md w-full sm:w-auto justify-between sm:justify-start">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span>Back to Intent</span>
                    </button>
                    <div className="flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      <span>{selectedSkills.length} core strengths selected</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setShowSkipModal(true)}
                      className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors mr-2"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      disabled={selectedSkills.length === 0 || isSaving}
                      onClick={handleNextStep}
                      className="w-full sm:w-auto px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-md flex items-center justify-center gap-space-xs disabled:opacity-50"
                    >
                      <span>Continue to Experience</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: BUILDER EXPERIENCE */}
            {step === 3 && (
              <div className="space-y-space-xl">
                {/* Header */}
                <header className="flex flex-col">
                  <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-xs rounded-full bg-surface-container-high text-primary-container font-label-sm text-label-sm shadow-sm mb-space-md">
                    <span className="material-symbols-outlined text-[15px] text-secondary">explore</span>
                    <span>Step 03 · Background & Desired Alignment</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    Where have you built, and what's next?
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs">
                    Help other builders understand your operating context and the exact shape of opportunity you're seeking.
                  </p>
                </header>

                <div className="flex flex-col gap-space-xl">
                  {/* Section 1: Operating Background */}
                  <section className="flex flex-col gap-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block">
                        01 / Pedigree & Tenacity
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary">Operating Background & Experience Tier</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {[
                        { id: 'early-career', icon: 'bolt', title: 'Early Career / Emerging', sub: 'High trajectory & slope', desc: 'Fast learner, steep growth curve, seeking deep technical mentorship and meaningful zero-to-one ownership.' },
                        { id: 'seasoned-operator', icon: 'layers', title: 'Seasoned Operator', sub: '5+ Years Deep Execution', desc: '5+ years shipping complex, fault-tolerant software architectures or driving rapid product-led scale.' },
                        { id: 'prior-founder', icon: 'local_fire_department', title: 'Current / Prior Founder', sub: 'Venture Tested', desc: 'Has founded, pitched capital, or navigated high-ambiguity initial discovery cycles and cap-table design.' },
                        { id: 'fractional-specialist', icon: 'hub', title: 'Fractional Specialist', sub: 'Autonomous & Modular', desc: 'Flexible high-impact collaborator, deeply specialized in niche technical, regulatory, or infrastructure domains.' },
                      ].map((tier) => {
                        const isSel = experienceTiers.includes(tier.id);
                        return (
                          <div
                            key={tier.id}
                            onClick={() => toggleExperienceTier(tier.id)}
                            className={`group relative p-space-lg rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[148px] ${
                              isSel ? 'bg-surface-container-low' : 'bg-surface-container-lowest hover:bg-surface-container-low'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-space-md">
                              <div className="flex items-center gap-space-sm">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                  isSel ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'
                                }`}>
                                  <span className="material-symbols-outlined text-[20px]">{tier.icon}</span>
                                </div>
                                <div>
                                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{tier.title}</h3>
                                  <span className="font-label-sm text-label-sm text-secondary font-medium">{tier.sub}</span>
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                                isSel ? 'bg-primary-container' : 'bg-surface-container-high'
                              }`}>
                                <span className={`material-symbols-outlined text-on-primary text-[15px] ${isSel ? 'opacity-100' : 'opacity-0'}`}>
                                  check
                                </span>
                              </div>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">{tier.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Section 2: Concrete Intent */}
                  <section className="flex flex-col gap-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block">
                        02 / Mutual Alignment
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary">What are you looking for right now?</h2>
                    </div>

                    <div className="flex flex-wrap gap-space-sm">
                      {[
                        'Technical Co-founder with Rust/AI expertise',
                        'First Founding Engineer',
                        'Early-Stage Equity Stake',
                        'Fractional Advisory',
                      ].map((pill) => {
                        const isSel = concreteIntents.includes(pill);
                        return (
                          <button
                            key={pill}
                            type="button"
                            onClick={() => toggleConcreteIntent(pill)}
                            className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-space-xs ${
                              isSel ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {isSel ? 'check_circle' : 'add'}
                            </span>
                            <span>{pill}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Founder Note Note Card */}
                    <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm mt-space-xs">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-primary flex items-center gap-space-xs" htmlFor="founder-pitch">
                          <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">edit_note</span>
                          What makes a collaboration an instant “yes”?
                        </label>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                          {founderPitch.length} / 280
                        </span>
                      </div>
                      <textarea
                        id="founder-pitch"
                        maxLength={280}
                        rows={3}
                        value={founderPitch}
                        onChange={(e) => setFounderPitch(e.target.value)}
                        placeholder="e.g. Building at the intersection of climate telemetry and autonomous systems. Looking for an engineer who cares deeply about offline-first resilience."
                        className="w-full bg-surface-container-low rounded-lg p-space-md font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all resize-none placeholder:text-outline"
                      />
                    </div>
                  </section>

                  {/* Section 3: Work Posture */}
                  <section className="flex flex-col gap-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block">
                        03 / Operating Cadence
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary">Work & Location Posture</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Work Cadence */}
                      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">
                        <div>
                          <div className="font-label-md text-label-md text-primary mb-space-xs">Primary Working Cadence</div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">How do you execute daily synchronous communication?</p>
                        </div>
                        <div className="flex flex-wrap gap-space-xs">
                          {['Remote First', 'Hybrid', 'In-person Hub'].map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setWorkCadence(mode)}
                              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors ${
                                workCadence === mode ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Hubs */}
                      <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">
                        <div>
                          <div className="font-label-md text-label-md text-primary mb-space-xs">Preferred Hubs & Geographies</div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">Co-locating timezones simplifies early product iterations.</p>
                        </div>
                        <div className="flex flex-wrap gap-space-xs">
                          {[
                            'San Francisco / US Pacific (UTC-8)',
                            'Global Async',
                            'New York / US Eastern (UTC-5)',
                            'Europe (UTC+0..+2)',
                          ].map((hub) => {
                            const isSel = preferredHubs.includes(hub);
                            return (
                              <button
                                key={hub}
                                type="button"
                                onClick={() =>
                                  setPreferredHubs((prev) =>
                                    prev.includes(hub) ? prev.filter((h) => h !== hub) : [...prev, hub]
                                  )
                                }
                                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors flex items-center gap-1 ${
                                  isSel ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[15px]">location_on</span>
                                <span>{hub}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Bottom Navigation */}
                <nav className="flex items-center justify-between mt-space-xl pt-space-lg border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Back to Skills</span>
                  </button>

                  <div className="flex items-center gap-space-sm">
                    <button
                      type="button"
                      onClick={() => setShowSkipModal(true)}
                      className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors mr-2"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-space-xs px-space-xl py-space-xs rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-md transition-all"
                    >
                      <span>Continue to Profile Summary</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </nav>
              </div>
            )}

            {/* STEP 4: MATCHING MATRIX / SUMMARY */}
            {step === 4 && (
              <div className="space-y-space-xl">
                {/* Header */}
                <div className="flex flex-col gap-space-sm">
                  <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-xs rounded-full bg-surface-container-low text-secondary font-label-md text-label-md shadow-sm">
                    <span className="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
                    <span>Step 04 · Intelligent Synergy Profile</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    Here’s what BambiFound understood about you.
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                    Review your multi-intent builder profile before entering the ecosystem. You can edit any parameter or conviction filter at any time.
                  </p>
                </div>

                {/* Main Intelligence Dossier */}
                <div className="flex flex-col gap-space-xl">
                  {/* User Identity Card */}
                  <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg sm:p-space-xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-lg relative z-10">
                      <div className="flex items-center gap-space-lg">
                        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md shrink-0">
                          {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'B'}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs flex-wrap">
                            <span className="font-headline-md text-headline-md text-primary tracking-tight">
                              {user?.fullName || 'Builder'}
                            </span>
                            <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Active Builder
                            </span>
                          </div>
                          <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal mt-0.5">
                            {user?.email}
                          </p>
                          <div className="flex items-center gap-space-xs mt-0.5 text-outline font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            <span>{preferredHubs.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="self-start md:self-center inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">tune</span>
                        <span>Edit Parameters</span>
                      </button>
                    </div>
                  </div>

                  {/* Multi-Intent Vectors */}
                  <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg sm:p-space-xl flex flex-col gap-space-lg">
                    <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30">
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-primary">Multi-Intent Vectors</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Calibrated parameters mapping your operational objectives and strengths.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                      {/* Active Intents */}
                      <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-space-md">
                            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
                              <span className="material-symbols-outlined text-secondary text-[18px]">rocket_launch</span>
                              <span>Active Intents</span>
                            </div>
                            <button type="button" onClick={() => setStep(1)} className="text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-space-xs">
                            {selectedIntents.map((i) => (
                              <span key={i} className="px-space-md py-space-xs rounded-full bg-primary-container text-on-primary font-label-md text-label-md">
                                {i}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Core Strengths */}
                      <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-space-md">
                            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
                              <span className="material-symbols-outlined text-secondary text-[18px]">hub</span>
                              <span>Core Strengths</span>
                            </div>
                            <button type="button" onClick={() => setStep(2)} className="text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-space-xs">
                            {selectedSkills.slice(0, 6).map((s) => (
                              <span key={s} className="px-space-md py-space-xs rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Working Style */}
                      <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-space-md">
                            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md">
                              <span className="material-symbols-outlined text-secondary text-[18px]">handshake</span>
                              <span>Working Style</span>
                            </div>
                            <button type="button" onClick={() => setStep(3)} className="text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-space-xs">
                            <span className="px-space-md py-space-xs rounded-full bg-surface-container-highest text-on-surface font-label-md text-label-md">
                              {workCadence}
                            </span>
                            <span className="px-space-md py-space-xs rounded-full bg-primary-container text-on-primary font-label-md text-label-md">
                              Leverage: {leverageFocus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curated Alignment Signals */}
                  <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg sm:p-space-xl flex flex-col gap-space-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[22px]">radar</span>
                        <h2 className="font-headline-sm text-headline-sm text-primary">Curated Alignment Signals</h2>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/50 px-space-md py-space-xs rounded-full">
                        Match Engine Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-headline-sm text-headline-sm text-primary">Elena V.</span>
                          <span className="font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded-full text-label-sm">94% Match</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Climate Intelligence & Carbon Accounting</p>
                      </div>

                      <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-headline-sm text-headline-sm text-primary">KiteFlow Systems</span>
                          <span className="font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded-full text-label-sm">91% Match</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Microgrid Orchestration Engine</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="mt-space-sm flex flex-col md:flex-row items-center justify-between gap-space-md pt-space-md border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Back to Experience</span>
                  </button>

                  <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowSkipModal(true)}
                      className="w-full sm:w-auto px-space-lg py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md border border-outline-variant/40"
                    >
                      Skip for now
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleComplete}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md shadow-md transition-all disabled:opacity-50"
                    >
                      <span>Enter BambiFound Ecosystem</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Persistent Skip Confirm Modal */}
      {showSkipModal && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-gutter">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-xl shadow-xl space-y-space-md border border-outline-variant/40">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">exit_to_app</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Skip onboarding for now?</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              You can complete your builder profile later at any time from your dashboard or profile settings.
            </p>
            <div className="flex items-center justify-end gap-space-sm pt-space-sm">
              <button
                type="button"
                onClick={() => setShowSkipModal(false)}
                className="px-space-md py-2 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low"
              >
                Continue Onboarding
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="px-space-lg py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow-sm"
              >
                Skip to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
