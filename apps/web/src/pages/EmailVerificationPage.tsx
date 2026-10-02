import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const EmailVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (data) {
      const newOtp = [...otp];
      for (let i = 0; i < data.length; i++) {
        newOtp[i] = data[i];
      }
      setOtp(newOtp);
      const nextIdx = Math.min(data.length, 5);
      inputRefs.current[nextIdx]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <header className="w-full py-space-lg px-gutter flex items-center justify-between max-w-[1360px] mx-auto">
        <Link to="/" className="flex items-center gap-space-sm">
          <div className="h-8 w-8 rounded-md bg-primary-container flex items-center justify-center text-on-primary font-bold text-lg">
            B
          </div>
          <span className="font-title-md text-title-md text-primary font-bold tracking-tight">
            BambiFound
          </span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-gutter-sm py-space-lg w-full max-w-md mx-auto">
        <div className="w-full p-space-xl rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center mx-auto mb-space-md">
            <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
          </div>

          <h1 className="font-headline-md text-headline-md text-primary font-bold mb-space-xs">
            Verify your email address
          </h1>
          <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
            We sent a 6-digit code to your email. Enter code below to confirm account.
          </p>

          {isVerified ? (
            <div className="p-space-md rounded-lg bg-primary-fixed/30 text-primary font-body-md font-semibold mb-space-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Email verified! Redirecting to home...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-lg">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-11 h-14 sm:w-12 sm:h-16 text-center font-bold text-xl text-on-surface bg-surface-container-low rounded-lg outline-none focus:bg-surface-container-lowest focus:border-2 focus:border-primary transition-all shadow-inner"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={otp.join('').length < 6 || isVerifying}
                className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md disabled:opacity-50"
              >
                {isVerifying ? 'Verifying Code...' : 'Verify Code'}
              </button>
            </form>
          )}

          <p className="text-body-sm text-secondary mt-space-md">
            Didn't receive code?{' '}
            <button className="text-primary font-semibold hover:underline">
              Resend code
            </button>
          </p>
        </div>
      </main>

      <footer className="py-space-md text-center text-xs text-secondary">
        © 2025 BambiFound Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
