"use client";
import FeedbackForm from "@/app/components/feedback/FeedbackForm";
import FeedbackList from "@/app/components/feedback/FeedbackList";
import Header from "@/app/components/layouts/Header";
import { getFeedbacks, createFeedback, updateFeedback, deleteFeedback } from "@/app/lib/api";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        setError('Failed to load feedbacks');
        toast.error('Failed to load feedbacks');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle create feedback
  const handleCreateFeedback = async (feedback) => {
    try {
      const newFeedback = await createFeedback({
        ...feedback,
        date: new Date().toISOString()
      });
      setFeedbacks([newFeedback, ...feedbacks]);
      toast.success('Feedback submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit feedback');
      throw err;
    }
  };

  // Handle update feedback
  const handleUpdateFeedback = async (id, updatedFeedback) => {
    try {
      const updated = await updateFeedback(id, {
        ...updatedFeedback,
        date: new Date().toISOString()
      });
      setFeedbacks(feedbacks.map(fb => fb.id === id ? updated : fb));
      toast.success('Feedback updated successfully!');
    } catch (err) {
      toast.error('Failed to update feedback');
      throw err;
    }
  };

  // Handle delete feedback
  const handleDeleteFeedback = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedbacks(feedbacks.filter(fb => fb.id !== id));
      toast.success('Feedback deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete feedback');
      throw err;
    }
  };
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-sm border-b border-white/10">
          <Header />
        </div>

        <main className="flex-1 p-6 sm:p-10 space-y-10">
          <section>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              📋 Feedback Manager
            </h1>
            <p className="text-white/60 max-w-2xl text-base">
              Submit, review, and manage user feedbacks
            </p>
          </section>

          <div className="space-y-16">
            <FeedbackForm 
              onSubmit={editingFeedback ? 
                (data) => handleUpdateFeedback(editingFeedback.id, data) : 
                handleCreateFeedback
              }
              editingFeedback={editingFeedback}
              setEditingFeedback={setEditingFeedback}
              loading={loading}
            />
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-400">{error}</div>
            ) : (
              <FeedbackList 
                feedbacks={feedbacks} 
                onDelete={handleDeleteFeedback}
                onEdit={setEditingFeedback}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
