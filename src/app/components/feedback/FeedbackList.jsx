"use client";
import { FaTrash, FaUser, FaEnvelope, FaCalendarAlt, FaSpinner, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function FeedbackList({ feedbacks = [], onDelete, onEdit }) {
  const [deletingId, setDeletingId] = useState(null);



  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        setDeletingId(id);
        await onDelete(id);
      } catch (err) {
        console.error('Error deleting feedback:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <div className="py-12 px-4 sm:px-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 tracking-tight">
        🌟 User Feedbacks
      </h2>

      {feedbacks.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          No feedback available. Try refreshing the page.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="relative group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-lg text-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-white/5 hover:border-white/20 cursor-pointer"
              onClick={() => setEditingFeedback(feedback)}
            >
              
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 blur-2xl rounded-full z-0 group-hover:scale-110 transition-transform"></div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaUser className="text-white/60" />
                  {feedback.name || 'Anonymous'}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(feedback);
                    }}
                    className="text-white/40 hover:text-blue-400 transition-colors p-1 -mt-1"
                    aria-label="Edit feedback"
                    disabled={deletingId === feedback.id}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(feedback.id, e)}
                    className="text-white/40 hover:text-red-400 transition-colors p-1 -mt-1 -mr-1 disabled:opacity-50"
                    aria-label="Delete feedback"
                    disabled={deletingId === feedback.id}
                  >
                    {deletingId === feedback.id ? (
                      <FaSpinner className="w-4 h-4 animate-spin" />
                    ) : (
                      <FaTrash className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {feedback.email && (
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <FaEnvelope className="w-3.5 h-3.5" />
                    <a href={`mailto:${feedback.email}`} className="hover:text-white transition-colors">
                      {feedback.email}
                    </a>
                  </div>
                )}

                {feedback.date && (
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <FaCalendarAlt className="w-3.5 h-3.5" />
                    <span>{formatDate(feedback.date)}</span>
                  </div>
                )}

                {feedback.tags && feedback.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {feedback.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-white/80">{feedback.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
