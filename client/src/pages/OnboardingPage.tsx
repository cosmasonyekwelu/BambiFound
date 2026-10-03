import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface OnboardingData {
  role: string;
  fullName: string;
  headline: string;
  location: string;
  bio: string;
  naturalIntent: string;
  skills: string[];
  industries: string[];
  experienceLevel: string;
  commitmentHours: string;
  workPreference: string;
  stealthMode: boolean;
}

const ALL_SKILLS = [
  'TypeScript', 'React', 'Node.js', 'NestJS', 'Python', 'Rust', 'Go',
  'AI / LLMs', 'Vector DBs', 'PostgreSQL', 'System Architecture', 'Product Design',
  'Growth Marketing', 'Fundraising', 'B2B SaaS', 'DevOps & Cloud'
];

const ALL_INDUSTRIES = [
  'AI & Machine Learning', 'Fintech & Payments', 'Developer Tools',
  'HealthTech & Bio', 'ClimateTech & Energy', 'Cybersecurity', 'Web3 & Crypto', 'E-Commerce'
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<OnboardingData>({
    role: 'Technical Founder',
    fullName: 'Alex Rivera',
    headline: 'Full-Stack Lead & Systems Architect',
    location: 'San Francisco, CA (Open to Remote)',
    bio: 'Building scalable developer tooling and AI infrastructure.',
    naturalIntent: 'Building a zero-knowledge developer identity platform. Looking for a technical co-founder with cryptography and Rust expertise.',
    skills: ['TypeScript', 'React', 'Node.js', 'System Architecture', 'AI / LLMs'],
    industries: ['AI & Machine Learning', 'Developer Tools', 'Fintech & Payments'],
    experienceLevel: '6-10 years',
    commitmentHours: 'Full-time (40+ hrs/wk)',
    workPreference: 'Remote or Hybrid',
    stealthMode: false,
  });

  const totalSteps = 9;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final submission -> navigate to dashboard
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const toggleIndustry = (ind: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(ind)
        ? prev.industries.filter((i) => i !== ind)
        : [...prev.industries, ind],
    }));
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 px-margin">
        <div className="max-w-[720px] mx-auto flex flex-col space-y-space-lg">

          {/* PROGRESS HEADER */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm space-y-2">
            <div className="flex items-center justify-between font-label-md text-label-md">
              <span className="text-secondary uppercase tracking-wider font-semibold">Founder Onboarding Progress</span>
              <span className="text-on-surface font-bold">Step {step} of {totalSteps}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-surface-container-low overflow-hidden">
              <div
                className="h-full bg-primary-container transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* STEP CONTENT CONTAINER */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl border border-outline-variant/40 shadow-level-1 space-y-space-lg">

            {/* STEP 1: Persona / Role */}
            {step === 1 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 1 — Role Selection</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">What is your primary persona?</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    This determines how you appear in match recommendations.
                  </p>
                </div>
                <div className="space-y-space-sm">
                  {[
                    { id: 'Technical Founder', title: 'Technical Co-Founder / CTO', desc: 'Engineering, architecture, and technical product leadership.' },
                    { id: 'Commercial Co-Founder', title: 'Commercial Co-Founder / CEO', desc: 'GTM, sales, fundraising, strategy, and business development.' },
                    { id: 'Founding Engineer', title: 'Founding Engineer / Core Builder', desc: 'Looking to join an early-stage venture as employee #1-#5.' },
                    { id: 'Product & Design Lead', title: 'Founding Product & Design Lead', desc: 'UX/UI, product architecture, user research, and branding.' },
                    { id: 'Domain Advisor / Investor', title: 'Advisor / Angel Investor', desc: 'Providing domain advisory, mentorship, or seed capital.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: item.id })}
                      className={`w-full p-space-md rounded-xl border text-left transition-all flex items-start gap-space-md ${
                        formData.role === item.id
                          ? 'border-primary bg-sage-tint/80 text-primary-container shadow-sm'
                          : 'border-outline-variant/50 bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <div className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                        formData.role === item.id ? 'border-primary bg-primary text-on-primary' : 'border-outline'
                      }`}>
                        {formData.role === item.id && <span className="w-2 h-2 rounded-full bg-on-primary"></span>}
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm font-semibold">{item.title}</div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 2 — Basic Profile</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Tell us about yourself</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Provide basic professional identifiers for your public builder card.
                  </p>
                </div>
                <div className="space-y-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-11 px-3.5 bg-surface-container-low rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D]"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Professional Headline</label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className="w-full h-11 px-3.5 bg-surface-container-low rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D]"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full h-11 px-3.5 bg-surface-container-low rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D]"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Short Bio</label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-3.5 bg-surface-container-low rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Natural Intent */}
            {step === 3 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 3 — Natural Intent</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">State your goal in plain language</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Describe what you are building or looking to join. Our AI converts this into matching vectors.
                  </p>
                </div>
                <div>
                  <textarea
                    rows={5}
                    value={formData.naturalIntent}
                    onChange={(e) => setFormData({ ...formData, naturalIntent: e.target.value })}
                    placeholder="e.g. I am building an AI developer tool and need a technical co-founder with compiler experience who can work full-time..."
                    className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D] font-body-md text-body-md leading-relaxed"
                  />
                </div>
                <div className="p-space-md rounded-lg bg-sage-tint text-primary-container font-body-sm text-body-sm flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">psychology</span>
                  <span>
                    <strong>AI Tip:</strong> Mention specific technical stacks, domain preferences, or commitment levels for maximum match accuracy.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Primary & Secondary Skills */}
            {step === 4 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 4 — Core Capabilities</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Select your skills & stack</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Select your primary technical and domain strengths.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {ALL_SKILLS.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-primary-container text-on-primary shadow-sm font-semibold'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                      >
                        {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Industries & Domains */}
            {step === 5 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 5 — Industry Alignment</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">What sectors interest you?</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Select the industries you are most excited to build in.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {ALL_INDUSTRIES.map((ind) => {
                    const isSelected = formData.industries.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => toggleIndustry(ind)}
                        className={`p-space-md rounded-xl border text-left font-label-md text-label-md transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-primary bg-sage-tint text-primary-container font-semibold'
                            : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span>{ind}</span>
                        {isSelected && <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: Experience & Commitment */}
            {step === 6 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 6 — Commitment & Experience</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Experience & availability</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Specify your years of experience and weekly capacity.
                  </p>
                </div>
                <div className="space-y-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2">Years of Experience</label>
                    <div className="grid grid-cols-3 gap-space-sm">
                      {['1-3 years', '3-5 years', '6-10 years', '10+ years'].map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setFormData({ ...formData, experienceLevel: exp })}
                          className={`py-2.5 px-3 rounded-lg border font-label-md text-label-md text-center transition-all ${
                            formData.experienceLevel === exp
                              ? 'border-primary bg-primary-container text-on-primary font-semibold'
                              : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-2">Weekly Commitment</label>
                    <div className="space-y-2">
                      {['Full-time (40+ hrs/wk)', 'Part-time (15-20 hrs/wk)', 'Advisory (5-10 hrs/wk)'].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setFormData({ ...formData, commitmentHours: hrs })}
                          className={`w-full p-3 rounded-lg border text-left font-label-md text-label-md transition-all flex items-center justify-between ${
                            formData.commitmentHours === hrs
                              ? 'border-primary bg-sage-tint text-primary-container font-semibold'
                              : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          <span>{hrs}</span>
                          {formData.commitmentHours === hrs && <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Work Preference */}
            {step === 7 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 7 — Work Preference</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Collaboration style</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Select your preferred working environment.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  {[
                    { id: 'Remote Only', title: 'Remote Only', desc: 'Work from anywhere' },
                    { id: 'Remote or Hybrid', title: 'Remote / Hybrid', desc: 'Flexible arrangement' },
                    { id: 'Onsite Priority', title: 'Onsite Priority', desc: 'In-office collaboration' }
                  ].map((pref) => (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, workPreference: pref.id })}
                      className={`p-space-md rounded-xl border text-left transition-all ${
                        formData.workPreference === pref.id
                          ? 'border-primary bg-primary-container text-on-primary font-semibold'
                          : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="font-headline-sm text-headline-sm">{pref.title}</div>
                      <p className="font-body-sm text-body-sm opacity-80 mt-1">{pref.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Stealth Mode */}
            {step === 8 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 8 — Privacy & Stealth Mode</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Control your profile visibility</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Keep your activity discreet if currently employed.
                  </p>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-headline-sm text-headline-sm text-primary">Enable Stealth Mode</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Conceals name and employer from search directory until mutual connection.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, stealthMode: !formData.stealthMode })}
                      className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                        formData.stealthMode ? 'bg-primary' : 'bg-outline-variant'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-surface shadow-sm transition-transform ${
                        formData.stealthMode ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Review & Launch */}
            {step === 9 && (
              <div className="space-y-space-md">
                <div>
                  <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Step 9 — Final Review</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Review your onboarding profile</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Everything looks ready to launch your match engine.
                  </p>
                </div>

                <div className="space-y-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/30 font-body-sm text-body-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant uppercase font-semibold">Persona & Name:</span>
                    <span className="font-bold text-primary">{formData.fullName} ({formData.role})</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant uppercase font-semibold">Active Intent:</span>
                    <span className="font-medium text-on-surface truncate max-w-[300px]">{formData.naturalIntent}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant uppercase font-semibold">Selected Skills:</span>
                    <span className="font-medium text-primary">{formData.skills.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant uppercase font-semibold">Commitment:</span>
                    <span className="font-medium text-primary">{formData.commitmentHours}</span>
                  </div>
                </div>
              </div>
            )}

            {/* NAVIGATION ACTIONS FOOTER */}
            <div className="flex items-center justify-between pt-space-md border-t border-outline-variant/30">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">west</span>
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold shadow-md transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <span>{step === totalSteps ? 'Complete & Go to Dashboard' : 'Continue'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
