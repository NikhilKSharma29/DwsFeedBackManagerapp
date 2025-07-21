"use client";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "@/app/lib/zodSchema";
// import { feedbackSchema } from "@/app/lib/zodSchema";

export default function FeedbackForm({ onSubmit, editingFeedback, setEditingFeedback }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  // Set form values when editingFeedback changes
  useEffect(() => {
    if (editingFeedback) {
      Object.keys(editingFeedback).forEach(key => {
        if (key !== 'id' && key !== 'date') {
          setValue(key, editingFeedback[key]);
        }
      });
    } else {
      reset();
    }
  }, [editingFeedback, setValue, reset]);

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ success: false, message: '' });
      
      await onSubmit(data);
      
      // Reset form and editing state on success
      reset();
      if (setEditingFeedback) {
        setEditingFeedback(null);
      }
      
      setSubmitStatus({ 
        success: true, 
        message: editingFeedback ? 'Feedback updated successfully!' : 'Thank you for your feedback!' 
      });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to submit feedback. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] rounded-2xl p-10 w-full max-w-2xl">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 blur-3xl rounded-full z-0 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full z-0 animate-pulse"></div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 relative z-10">
          {editingFeedback ? '✏️ Edit Feedback' : '🖤 Leave Your Feedback'}
        </h2>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-6 relative z-10"
        >
          <div>
            <label className="block text-white/80 font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-2">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Type your message here..."
              className="w-full bg-white/10 text-white placeholder-white/50 px-5 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold py-3 rounded-lg transition hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? (editingFeedback ? "Updating..." : "Sending...") : (editingFeedback ? "Update Feedback" : "Send Feedback")}
            </button>
            
            {submitStatus.message && (
              <div className={`p-3 rounded-lg text-center ${
                submitStatus.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {submitStatus.message}
              </div>
            )}
            {editingFeedback && (
              <button
                type="button"
                onClick={() => {
                  setEditingFeedback && setEditingFeedback(null);
                  reset();
                }}
                className="w-full mt-2 text-center text-sm text-white/60 hover:text-white transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
