'use client';

import React from 'react';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, submit the form data here
  };

  return (
    <form
      id="contact-form"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-white/50 text-xs uppercase tracking-widest mb-2">
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            className="w-full bg-transparent border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fd1b3d] transition-colors placeholder-white/20"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-white/50 text-xs uppercase tracking-widest mb-2">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            className="w-full bg-transparent border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fd1b3d] transition-colors placeholder-white/20"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-white/50 text-xs uppercase tracking-widest mb-2">
          Subject
        </label>
        <select
          id="contact-subject"
          className="w-full bg-[#172b66] border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fd1b3d] transition-colors"
        >
          <option value="">Select a subject…</option>
          <option value="admissions">Admissions</option>
          <option value="academics">Academic Enquiry</option>
          <option value="general">General Information</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-white/50 text-xs uppercase tracking-widest mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          className="w-full bg-transparent border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#fd1b3d] transition-colors placeholder-white/20 resize-none"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        id="contact-submit"
        className="btn-primary w-full justify-center cursor-pointer"
      >
        Send Message
      </button>
    </form>
  );
}
